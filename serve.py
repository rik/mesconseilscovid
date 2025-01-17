"""
Start local development server
"""
import argparse
import logging
import shlex
import subprocess
import webbrowser
from contextlib import suppress
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from ssl import wrap_socket
from tempfile import NamedTemporaryFile
from threading import Thread

from livereload.server import LogFormatter, Server
from watchdog.observers import Observer
from watchdog.tricks import ShellCommandTrick

import build

PARCEL_CLI = "./node_modules/.bin/parcel"
BUNDLER_COMMAND = f"{PARCEL_CLI} watch --no-hmr src/*.html"

LIVERELOAD_DELAY = 0.1

ROOT_DIR = "dist/"

PATHS_TO_WATCH_FOR_THEMATIQUES = (
    "build.py",
    "mistune_toc.py",
    "contenus/meta/*.md",
    "contenus/thematiques/*.md",
    "templates/thematique.html",
)
PATHS_TO_WATCH_FOR_INDEX = (
    "build.py",
    "contenus/conseils/*.md",
    "contenus/meta/*.md",
    "contenus/questions/*.md",
    "contenus/réponses/*.md",
    "contenus/statuts/*.md",
    "contenus/suivi/*.md",
    "templates/index.html",
)


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--address", default="0.0.0.0")
    parser.add_argument("--port", type=int, default=None)
    parser.add_argument("--ssl", action="store_true")
    parser.add_argument("--ssl-cert", default="cert.pem")
    parser.add_argument("--ssl-key", default="key.pem")
    parser.add_argument("--open", action="store_true")
    parser.add_argument("--watch", action="store_true")
    return parser.parse_args()


def serve(address, port, open_, watch, ssl, ssl_cert, ssl_key, bundler_watch_filename):
    if ssl:
        return serve_https(
            address=args.address,
            port=args.port or 8443,
            open_=args.open,
            watch=args.watch,
            ssl_cert=args.ssl_cert,
            ssl_key=args.ssl_key,
        )
    else:
        return serve_http(
            address=args.address,
            port=args.port or 5500,
            open_=args.open,
            watch=args.watch,
            bundler_watch_filename=bundler_watch_filename,
        )


class CustomServer(Server):
    """
    Custom server with logger that decodes bytes in logs
    """

    def _setup_logging(self):
        super()._setup_logging()
        logger = logging.getLogger("livereload")
        formatter = self.BytesFormatter()
        for handler in logger.handlers:
            handler.setFormatter(formatter)

    class BytesFormatter(LogFormatter):
        def format(self, record):
            if isinstance(record.msg, bytes):
                with suppress(UnicodeDecodeError):
                    record.msg = record.msg.decode("utf-8")
            return super().format(record)


def serve_http(address, port, open_, watch, bundler_watch_filename):
    server = CustomServer()
    if watch:
        for path in PATHS_TO_WATCH_FOR_THEMATIQUES:
            server.watch(path, build.thematiques, delay="forever")
        for path in PATHS_TO_WATCH_FOR_INDEX:
            server.watch(path, build.index, delay="forever")
    server.watch(bundler_watch_filename, delay=LIVERELOAD_DELAY)
    server.serve(
        host=address,
        port=port,
        root=ROOT_DIR,
        open_url_delay=0.1 if open_ else None,
    )


def serve_https(address, port, open_, watch, ssl_cert, ssl_key):
    class MyHTTPRequestHandler(SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=ROOT_DIR, **kwargs)

        def log_request(self, *args, **kwargs):
            pass

    class BuildThematiquesEventHandler(ShellCommandTrick):
        def __init__(self):
            super().__init__(
                shell_command="python3 build.py thematiques",
                wait_for_process=True,
                drop_during_process=True,
            )

        def on_any_event(self, event):
            if event.event_type == "modified" and not event.is_directory:
                super().on_any_event(event)

    class BuildIndexEventHandler(ShellCommandTrick):
        def __init__(self):
            super().__init__(
                shell_command="python3 build.py index",
                wait_for_process=True,
                drop_during_process=True,
            )

        def on_any_event(self, event):
            if event.event_type == "modified" and not event.is_directory:
                super().on_any_event(event)

    if watch:
        observer = Observer()

        thematiques_handler = BuildThematiquesEventHandler()
        for pattern in PATHS_TO_WATCH_FOR_THEMATIQUES:
            directory = Path(pattern).parts[0]
            observer.schedule(thematiques_handler, directory, recursive=True)

        index_handler = BuildIndexEventHandler()
        for pattern in PATHS_TO_WATCH_FOR_THEMATIQUES:
            directory = Path(pattern).parts[0]
            observer.schedule(index_handler, directory, recursive=True)

        observer.start()

    url = f"https://{address}:{port}/"
    print(f"Listening on {url}")

    if open_:
        webbrowser.open(url)

    logging.getLogger()
    httpd = HTTPServer((address, port), MyHTTPRequestHandler)
    httpd.socket = wrap_socket(
        httpd.socket, certfile=ssl_cert, keyfile=ssl_key, server_side=True
    )
    httpd.serve_forever()


class BundlerThread(Thread):
    def __init__(self, watch_file):
        super().__init__()
        self.watch_file = watch_file
        self.daemon = True

    def run(self):
        proc = subprocess.Popen(shlex.split(BUNDLER_COMMAND), stdout=subprocess.PIPE)
        while True:
            for line_bytes in proc.stdout:
                line = line_bytes.decode("utf-8")
                print(line)
                if line.startswith("✨  Built in"):
                    self.trigger_livereload()

    def trigger_livereload(self):
        self.watch_file.truncate(0)


if __name__ == "__main__":
    args = parse_args()

    with NamedTemporaryFile(delete=True) as bundler_watch_file:

        bundler_thread = BundlerThread(watch_file=bundler_watch_file)
        bundler_thread.start()

        serve(
            address=args.address,
            port=args.port,
            open_=args.open,
            watch=args.watch,
            ssl=args.ssl,
            ssl_cert=args.ssl_cert,
            ssl_key=args.ssl_key,
            bundler_watch_filename=bundler_watch_file.name,
        )
