"""Derivatives for the September 2026 content update.

Sources are the photographs embedded in the client's `Website changes.docx`,
extracted to build/_incoming/. Run from the project root:  python3 build/media-2026-09.py
"""
import os
from PIL import Image, ImageOps

SRC = os.path.join(os.path.dirname(__file__), "_incoming")

# wide/hero + triptych frames -> assets/gallery, same naming as build/media.py
GALLERY = [
    ("image1.jpeg", "ionian-catamaran-anchorage"),
    ("image4.jpeg", "marina-line-up"),
    ("image6.jpeg", "service-chartering"),
    ("image7.jpeg", "service-management"),
    ("image8.jpeg", "service-maintenance"),
]

# portraits -> assets/team, cropped square-ish, never upscaled
TEAM = [
    ("image2.png", "afroditi-kazakou", (196, 8, 477, 384)),
    ("image3.png", "ilias-tzannetoulakos", None),
]


def save_pair(im, path_base, width):
    w, h = im.size
    r = im if w <= width else im.resize((width, round(h * width / w)), Image.LANCZOS)
    r.save(path_base + ".jpg", "JPEG", quality=82, optimize=True, progressive=True)
    r.save(path_base + ".webp", "WEBP", quality=80, method=6)
    return r.size


def main():
    os.makedirs("assets/gallery", exist_ok=True)
    os.makedirs("assets/team", exist_ok=True)

    for fname, slug in GALLERY:
        im = ImageOps.exif_transpose(Image.open(os.path.join(SRC, fname))).convert("RGB")
        for width in (1600, 800):
            size = save_pair(im, f"assets/gallery/{slug}-{width}", width)
        print(f"gallery  {slug:28} {im.size[0]}x{im.size[1]}")

    for fname, slug, box in TEAM:
        im = ImageOps.exif_transpose(Image.open(os.path.join(SRC, fname))).convert("RGB")
        if box:
            im = im.crop(box)
        for width in (800, 400):
            save_pair(im, f"assets/team/{slug}-{width}", width)
        print(f"team     {slug:28} {im.size[0]}x{im.size[1]}")


if __name__ == "__main__":
    main()
