import urllib.request
import re
import json

url = "https://home.meishichina.com/recipe-7533.html"
headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
}

try:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as response:
        content = response.read().decode('utf-8')

    # Extract Ingredients
    # Looking for <b>食材明细</b> ... 
    # Usually in <li class="recipe_cat_li"> <span class="category_s1">...</span><span class="category_s2">...</span>
    
    ingredients = []
    ing_pattern = r'<span class="category_s1">\s*<a[^>]*>(.*?)</a>\s*</span>\s*<span class="category_s2">(.*?)</span>'
    ings = re.findall(ing_pattern, content)
    for name, amount in ings:
        ingredients.append({"name": name.strip(), "amount": amount.strip()})

    # Extract Steps
    steps = []
    # Pattern for images: <div class="recipeStep_img"><img src="http://..." /></div> or data-src
    # Pattern for text: <div class="recipeStep_word"><div class="recipeStep_num">1</div>text...</div>
    
    # Let's use the logic from parse_steps.py but robust
    # Find blocks of steps
    # Image pattern: <div class="recipeStep_img">...data-src="..."...</div>
    step_imgs = re.findall(r'<div class="recipeStep_img">.*?data-src="([^"]+)".*?</div>', content, re.DOTALL)
    
    # Text pattern: <div class="recipeStep_word"...><div class="grey">1</div>text...</div>
    step_texts = re.findall(r'<div class="recipeStep_word"[^>]*>.*?<div class="grey">\d+</div>(.*?)</div>', content, re.DOTALL)

    # Clean texts
    clean_texts = []
    for t in step_texts:
        t = re.sub(r'<[^>]+>', '', t).strip()
        clean_texts.append(t)

    for i in range(min(len(step_imgs), len(clean_texts))):
        steps.append({
            "step": i + 1,
            "content": clean_texts[i],
            "image_url": step_imgs[i]
        })

    result = {
        "ingredients": ingredients,
        "steps": steps
    }
    
    print(json.dumps(result, ensure_ascii=False, indent=2))

except Exception as e:
    print(f"Error: {e}")
