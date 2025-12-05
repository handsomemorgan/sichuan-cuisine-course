import re

with open('meishichina_recipe.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all step blocks
# Pattern: <div class="recipeStep_img">...<img ... data-src="(...)" ...>...<div class="recipeStep_word"...>...</div>
# This is a bit complex for regex, let's try to find image and text pairs.

# Extract all images with data-src
imgs = re.findall(r'<div class="recipeStep_img"><img[^>]*data-src="([^"]+)"[^>]*></div>', content)
# Extract all texts
texts = re.findall(r'<div class="recipeStep_word"[^>]*>(.*?)</div>', content, re.DOTALL)

# Clean texts
clean_texts = []
for t in texts:
    # Remove html tags
    t = re.sub(r'<[^>]+>', '', t).strip()
    clean_texts.append(t)

for i in range(min(len(imgs), len(clean_texts))):
    print(f"Step {i+1}: {clean_texts[i]} | Image: {imgs[i]}")
