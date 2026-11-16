import os
import fitz
from PIL import Image, ImageEnhance, ImageFilter

doc = fitz.open("invoice.pdf")
os.makedirs("public/products", exist_ok=True)

# Let's inspect the exact bounding boxes of pictures in the PDF
# Page 1:
# Row 1 (24V 4KW Inverter): Rect(105, 219, 169, 300)
# Row 2 (24V 250Ah Battery): Rect(102, 306, 182, 394)
# Row 3 (24V 300Ah Battery): Rect(105, 398, 171, 479)
# Row 4 (48V 6.5KW Inverter): Rect(115, 485, 164, 558)
# Row 5 (51.2V 100Ah Battery): Rect(103, 570, 175, 630)
# Row 6 (48V 200Ah Battery): Rect(121, 638, 159, 717)

# Page 2:
# Row 7 (48V 300Ah Battery): Rect(121, 47, 158, 123)
# Row 8 (All-in-one 12kW/30kWh): xref 54 (107, 138, 133, 224) and xref 55 (140, 138, 174, 224) -> Full Rect: (105, 136, 176, 226)
# Row 9 (All-in-one 6kW/15kWh): xref 56 (105, 259, 134, 344) and xref 57 (141, 259, 168, 342) -> Full Rect: (103, 257, 170, 345)

zoom = 6.0 # 6x supersampling = 432 DPI for crisp vector-level details
mat = fitz.Matrix(zoom, zoom)
p1 = doc[0].get_pixmap(matrix=mat, alpha=False)
p2 = doc[1].get_pixmap(matrix=mat, alpha=False)

im_p1 = Image.frombytes("RGB", [p1.width, p1.height], p1.samples)
im_p2 = Image.frombytes("RGB", [p2.width, p2.height], p2.samples)

products = [
    {
        "id": "24v-4kw-hybrid-inverter",
        "page": 1,
        "rect": (103, 218, 171, 301)
    },
    {
        "id": "24v-250ah-lifepo4-battery",
        "page": 1,
        "rect": (101, 305, 183, 395)
    },
    {
        "id": "24v-300ah-lifepo4-battery",
        "page": 1,
        "rect": (103, 397, 173, 480)
    },
    {
        "id": "48v-6-5kw-hybrid-inverter",
        "page": 1,
        "rect": (113, 484, 166, 559)
    },
    {
        "id": "51-2v-100ah-lifepo4-battery",
        "page": 1,
        "rect": (101, 569, 177, 631)
    },
    {
        "id": "48v-200ah-lifepo4-battery",
        "page": 1,
        "rect": (119, 637, 161, 718)
    },
    {
        "id": "48v-300ah-lifepo4-battery",
        "page": 2,
        "rect": (119, 46, 160, 124)
    },
    {
        "id": "all-in-one-12kw-30kwh-ess",
        "page": 2,
        "rect": (105, 136, 176, 226)
    },
    {
        "id": "all-in-one-6kw-15kwh-ess",
        "page": 2,
        "rect": (103, 257, 170, 345)
    }
]

for p in products:
    im_src = im_p1 if p["page"] == 1 else im_p2
    r = p["rect"]
    box = (int(r[0] * zoom), int(r[1] * zoom), int(r[2] * zoom), int(r[3] * zoom))
    cropped = im_src.crop(box)
    
    # Auto-crop pure white borders with a small margin
    # Find bounding box of non-white content
    bg = Image.new(cropped.mode, cropped.size, (255, 255, 255))
    diff = Image.frombytes("L", cropped.size, bytes(abs(a - b) for a, b in zip(cropped.tobytes(), bg.tobytes())))
    # Threshold diff
    threshold = 15
    mask = diff.point(lambda x: 255 if x > threshold else 0)
    bbox = mask.getbbox()
    if bbox:
        # Add slight padding
        pad = int(8 * zoom / 4.0)
        bbox = (
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(cropped.width, bbox[2] + pad),
            min(cropped.height, bbox[3] + pad)
        )
        cropped = cropped.crop(bbox)
    
    # Fit into a standardized square studio canvas (800x800) with pure white background
    target_size = (800, 800)
    canvas = Image.new("RGB", target_size, (255, 255, 255))
    
    # Resize preserving aspect ratio
    max_inner = 720
    ratio = min(max_inner / cropped.width, max_inner / cropped.height)
    new_w = int(cropped.width * ratio)
    new_h = int(cropped.height * ratio)
    resized = cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Enhance sharpness slightly for ultra-crisp display
    enhancer = ImageEnhance.Sharpness(resized)
    resized = enhancer.enhance(1.25)
    
    offset = ((target_size[0] - new_w) // 2, (target_size[1] - new_h) // 2)
    canvas.paste(resized, offset)
    
    # Save as WebP (optimized) and PNG
    out_webp = f"public/products/{p['id']}.webp"
    out_png = f"public/products/{p['id']}.png"
    canvas.save(out_webp, "WEBP", quality=92, method=6)
    canvas.save(out_png, "PNG", optimize=True)
    print(f"Generated {out_webp} & {out_png}")

print("All product images processed successfully.")
