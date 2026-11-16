import fitz
from PIL import Image, ImageEnhance, ImageFilter
import os

doc = fitz.open("invoice.pdf")
os.makedirs("public/products", exist_ok=True)

# 1. High-res page renders
zoom = 4.0
mat = fitz.Matrix(zoom, zoom)
p1 = doc[0].get_pixmap(matrix=mat, alpha=False)
p2 = doc[1].get_pixmap(matrix=mat, alpha=False)

im_p1 = Image.frombytes("RGB", [p1.width, p1.height], p1.samples)
im_p2 = Image.frombytes("RGB", [p2.width, p2.height], p2.samples)

# In PDF coordinates:
# Product 1: Rect(105, 218, 172, 302)
# Product 2: Rect(102, 305, 183, 395)
# Product 3: Rect(104, 396, 174, 481)
# Product 4: Rect(114, 483, 166, 560)
# Product 5: Rect(102, 568, 176, 632)
# Product 6: Rect(120, 636, 162, 718)
# Product 7: Rect(120, 45, 160, 125) (page 2)
# Product 8: Rect(104, 136, 178, 226) (page 2, combines xref 54 & 55)
# Product 9: Rect(103, 257, 170, 345) (page 2, combines xref 56 & 57)

products_meta = [
    {
        "id": "24v-4kw-inverter",
        "name": "24V 4KW Single Phase Hybrid Inverter",
        "page": 1,
        "rect": (102, 218, 174, 302),
        "raw_img": "page_1_img_2_xref_45.jpeg"
    },
    {
        "id": "24v-250ah-battery",
        "name": "24V 250Ah LiFePO4 Battery (6.4kWh)",
        "page": 1,
        "rect": (100, 305, 184, 395),
        "raw_img": "page_1_img_3_xref_46.jpeg"
    },
    {
        "id": "24v-300ah-battery",
        "name": "24V 300Ah LiFePO4 Battery (7.68kWh)",
        "page": 1,
        "rect": (102, 396, 176, 481),
        "raw_img": "page_1_img_4_xref_47.jpeg"
    },
    {
        "id": "48v-6-5kw-inverter",
        "name": "48V 6.5KW Single Phase Hybrid Inverter",
        "page": 1,
        "rect": (112, 483, 168, 560),
        "raw_img": "page_1_img_5_xref_48.jpeg"
    },
    {
        "id": "51-2v-100ah-battery",
        "name": "51.2V 100Ah LiFePO4 Battery (5.12kWh)",
        "page": 1,
        "rect": (100, 568, 178, 632),
        "raw_img": "page_1_img_6_xref_49.jpeg"
    },
    {
        "id": "48v-200ah-battery",
        "name": "48V 200Ah LiFePO4 Battery (10.24kWh)",
        "page": 1,
        "rect": (118, 636, 164, 718),
        "raw_img": "page_1_img_7_xref_50.jpeg"
    },
    {
        "id": "48v-300ah-battery",
        "name": "48V 300Ah LiFePO4 Battery (15.36kWh)",
        "page": 2,
        "rect": (118, 45, 162, 125),
        "raw_img": "page_2_img_1_xref_50.jpeg"
    },
    {
        "id": "all-in-one-12kw-30kwh",
        "name": "All-in-One 12KW / 30KWh 220V Solar ESS",
        "page": 2,
        "rect": (104, 136, 178, 226),
        "raw_img": None
    },
    {
        "id": "all-in-one-6kw-15kwh",
        "name": "All-in-One 6KW / 15KWh 220V Solar ESS",
        "page": 2,
        "rect": (103, 257, 170, 345),
        "raw_img": None
    }
]

for p in products_meta:
    im_source = im_p1 if p["page"] == 1 else im_p2
    # convert rect to pixels
    r = p["rect"]
    crop_box = (int(r[0] * zoom), int(r[1] * zoom), int(r[2] * zoom), int(r[3] * zoom))
    cropped = im_source.crop(crop_box)
    
    # Let's save the high-res crop
    cropped.save(f"public/products/{p['id']}-crop.png")
    print(f"Saved public/products/{p['id']}-crop.png ({cropped.size})")

print("All products cropped.")
