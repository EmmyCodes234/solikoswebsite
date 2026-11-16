import fitz

doc = fitz.open("invoice.pdf")

for page_idx in range(len(doc)):
    page = doc[page_idx]
    print(f"\nPAGE {page_idx + 1} Images with rects:")
    for img_info in page.get_images(full=True):
        xref = img_info[0]
        # Find occurrences of xref on the page
        rects = []
        for item in page.get_drawings():
            pass
        # In PyMuPDF, page.get_image_rects(xref) returns the rectangles on page
        img_rects = page.get_image_rects(xref)
        print(f"  xref {xref}: size {img_info[2]}x{img_info[3]}, rects={img_rects}")
