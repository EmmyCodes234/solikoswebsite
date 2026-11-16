import fitz
import os
from PIL import Image
import io

doc = fitz.open("invoice.pdf")
os.makedirs("extracted_invoice", exist_ok=True)

print("Page count:", len(doc))

for i, page in enumerate(doc):
    print(f"\n================ PAGE {i+1} ================")
    # Extract text with layout blocks
    blocks = page.get_text("blocks")
    for b in blocks:
        text = b[4].strip()
        if text:
            print(f"[{b[0]:.1f}, {b[1]:.1f}, {b[2]:.1f}, {b[3]:.1f}] -> {text.replace(chr(10), ' ')}")

    # Extract images
    image_list = page.get_images(full=True)
    for j, img_info in enumerate(image_list):
        xref = img_info[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        filename = f"extracted_invoice/page_{i+1}_img_{j+1}_xref_{xref}.{image_ext}"
        with open(filename, "wb") as f:
            f.write(image_bytes)
        im = Image.open(io.BytesIO(image_bytes))
        print(f"Saved {filename}: {im.size}, mode {im.mode}")
