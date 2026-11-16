import os
from PIL import Image

for f in sorted(os.listdir("extracted_invoice")):
    if f.endswith((".jpeg", ".jpg", ".png")) and "page_" in f and "highres" not in f:
        fp = os.path.join("extracted_invoice", f)
        im = Image.open(fp)
        print(f"{f}: size={im.size}, mode={im.mode}")
