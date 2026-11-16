import fitz
from PIL import Image

doc = fitz.open("invoice.pdf")

# Page 1 bboxes in pt
# Col Picture x roughly: 95 to 185
# Row 1: y 219 to 300
# Row 2: y 306 to 394
# Row 3: y 398 to 480
# Row 4: y 485 to 558
# Row 5: y 570 to 630
# Row 6: y 638 to 717

# Page 2 bboxes in pt
# Row 7: y 47 to 123
# Row 8: y 138 to 225 (x: 105 to 176)
# Row 9: y 259 to 345 (x: 104 to 170)

# Let's crop from the 4x high-res page render or upscale the images with PIL Lanczos + unsharp mask / contrast
print("Ready to process products")
