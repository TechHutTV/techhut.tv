#!/usr/bin/env python3
"""Record source metadata for the TechHut Seafile migration guide."""

from json import dumps
from os import umask, walk
from pathlib import Path
from tempfile import TemporaryDirectory


def stop_on_error(error):
    raise error


def inventory(source, work):
    """Read a mounted source; publish local inventory files after a full scan."""
    if not source.is_mount():
        raise ValueError("Source is not mounted; stop and fix the mount.")
    if work.resolve().is_relative_to(source.resolve()):
        raise ValueError("Keep the inventory output outside the source folder.")

    totals = {"files": 0, "directories": 0, "bytes": 0}
    with TemporaryDirectory(prefix=".source-inventory-", dir=work) as temporary:
        staging = Path(temporary)
        manifest_path = staging / "source-manifest.jsonl"
        summary_path = staging / "source-inventory.json"
        with manifest_path.open("w") as manifest:
            for parent, directories, files in walk(source, onerror=stop_on_error):
                for name in directories + files:
                    path = Path(parent) / name
                    if path.is_symlink():
                        raise ValueError(f"Review symbolic link before migration: {path}")
                    info = path.stat()
                    kind = "dir" if path.is_dir() else "file"
                    if kind == "file" and not path.is_file():
                        raise ValueError(f"Review non-regular file: {path}")
                    row = {
                        "path": str(path.relative_to(source)),
                        "type": kind,
                        "size": info.st_size if kind == "file" else 0,
                        "mtime_ns": info.st_mtime_ns,
                    }
                    manifest.write(dumps(row) + "\n")
                    totals["directories" if kind == "dir" else "files"] += 1
                    if kind == "file":
                        totals["bytes"] += info.st_size
        summary_path.write_text(dumps(totals, indent=2) + "\n")
        manifest_path.replace(work / manifest_path.name)
        summary_path.replace(work / summary_path.name)
    return totals


if __name__ == "__main__":
    umask(0o077)
    try:
        totals = inventory(Path("/mnt/archive-source"), Path("/srv/seafile/migration"))
    except (OSError, ValueError) as error:
        raise SystemExit(str(error))
    print(dumps(totals, indent=2))
