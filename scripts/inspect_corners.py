import os
from PIL import Image
import numpy as np

for f in sorted(os.listdir("public/products")):
    if f.endswith("-crop.png"):
        im = Image.open(os.path.join("public/products", f))
        arr = np.array(im)
        # Check corner pixel colors
        corners = [arr[0,0], arr[0,-1], arr[-1,0], arr[-1,-1]]
        print(f"{f}: size={im.size}, corners={corners[0]}")
