import requests
import re
import json

url = "https://m.xiachufang.com/recipe/107043657/"
headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

try:
    response = requests.get(url, headers=headers)
    content = response.text
    
    # Find all step images
    # Pattern looks like: <img src="http://..." alt="Step X"> inside <div class="steps"> or similar
    # In mobile view, it might be different. Let's just find all images followed by step text.
    
    # Xiachufang mobile often uses: <div class="step"> ... <img src="..."> ... <p>text</p> ... </div>
    # Let's try to find images with typical xiachufang image pattern: http://i2.chuimg.com/...
    
    # Better: Find the JSON LD or specific structure
    
    # Let's just dump typical image links
    imgs = re.findall(r'src="(https://i[0-9]\.chuimg\.com/\w+\.jpg[^"]*)"', content)
    
    # Remove duplicates and print
    seen = set()
    unique_imgs = []
    for img in imgs:
        if img not in seen:
            unique_imgs.append(img)
            seen.add(img)
            
    print(json.dumps(unique_imgs, indent=2))
    
except Exception as e:
    print(e)
