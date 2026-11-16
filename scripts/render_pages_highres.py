import fitz
import os
from PIL import Image

doc = fitz.open("invoice.pdf")
os.makedirs("public/products", exist_ok=True)

# Let's inspect the quality of both direct extraction and 300-400 DPI page crops
zoom = 4.0 # 4x standard 72 dpi = 288 dpi (approx 300 dpi)
mat = fitz.Matrix(zoom, zoom)

for page_idx in range(len(doc)):
    page = doc[page_idx]
    pix = page.get_pixmap(matrix=mat, alpha=False)
    pix.save(f"extracted_invoice/page_{page_idx+1}_highres.png")
    print(f"Page {page_idx+1} rendered at {pix.width}x{pix.height}")

print("High res pages rendered.")
