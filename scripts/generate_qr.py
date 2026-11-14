#!/usr/bin/env python3
"""Create print-ready QR PNG and SVG from the final public HTTPS website URL.
Install: python -m pip install "qrcode[pil]"
Usage: python scripts/generate_qr.py https://your-final-site.vercel.app
"""
from __future__ import annotations
import argparse
from pathlib import Path
from urllib.parse import urlparse
import qrcode
from qrcode.constants import ERROR_CORRECT_H
from qrcode.image.svg import SvgPathImage

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("url", help="Final public HTTPS website URL")
parser.add_argument("--outdir", default="outputs/qr")
args = parser.parse_args()
parsed = urlparse(args.url)
if parsed.scheme != "https" or not parsed.netloc:
    parser.error("Use the confirmed public HTTPS URL, not localhost, a placeholder, or an IP address.")
out = Path(args.outdir)
out.mkdir(parents=True, exist_ok=True)
qr = qrcode.QRCode(version=None, error_correction=ERROR_CORRECT_H, box_size=20, border=4)
qr.add_data(args.url)
qr.make(fit=True)
qr.make_image(image_factory=SvgPathImage).save(out / "producer-card-qr.svg")
png = qr.make_image(fill_color="#000000", back_color="#ffffff").convert("RGB")
png.resize((2400, 2400), resample=0).save(out / "producer-card-qr.png", format="PNG", dpi=(600, 600), optimize=True)
print(f"Created QR files in {out.resolve()}")
