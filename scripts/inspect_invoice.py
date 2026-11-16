import fitz
import json

doc = fitz.open("invoice.pdf")
print("Total pages:", len(doc))

all_data = []

for i, page in enumerate(doc):
    page_data = {
        "page_num": i + 1,
        "text": page.get_text(),
        "images": []
    }
    for j, img in enumerate(page.get_images(full=True)):
        xref = img[0]
        base_img = doc.extract_image(xref)
        page_data["images"].append({
            "index": j,
            "xref": xref,
            "ext": base_img["ext"],
            "width": base_img["width"],
            "height": base_img["height"]
        })
    all_data.append(page_data)

print(json.dumps(all_data, indent=2))
