import urllib.request
import os

images = [
    "https://i3r.meishichina.com/atta/step/201007/201007291725191.jpg?x-oss-process=style/p320",
    "https://i3r.meishichina.com/atta/step/201007/201007291725411.jpg?x-oss-process=style/p320",
    "https://i3r.meishichina.com/atta/step/201007/201007291725536.jpg?x-oss-process=style/p320",
    "https://i3r.meishichina.com/atta/step/201007/201007291726014.jpg?x-oss-process=style/p320",
    "https://i3r.meishichina.com/atta/step/201007/201007291726081.jpg?x-oss-process=style/p320",
    "https://i3r.meishichina.com/atta/step/201007/201007291727228.jpg?x-oss-process=style/p320",
    "https://i3r.meishichina.com/atta/step/201007/201007291727419.jpg?x-oss-process=style/p320",
    "https://i3r.meishichina.com/atta/step/201007/201007291727524.jpg?x-oss-process=style/p320",
    "https://i3r.meishichina.com/atta/step/201007/201007291727583.jpg?x-oss-process=style/p320",
    "https://i3r.meishichina.com/atta/step/201007/201007291728158.jpg?x-oss-process=style/p320",
    "https://i3r.meishichina.com/atta/step/201007/201007291728226.jpg?x-oss-process=style/p320",
    "https://i3r.meishichina.com/atta/step/201007/201007291728360.jpg?x-oss-process=style/p320",
    "https://i3r.meishichina.com/atta/step/201007/201007291728431.jpg?x-oss-process=style/p320",
    "https://i3r.meishichina.com/atta/step/201007/201007291728564.jpg?x-oss-process=style/p320",
    "https://i3r.meishichina.com/atta/step/201007/201007291729044.jpg?x-oss-process=style/p320",
    "https://i3r.meishichina.com/atta/step/201007/201007291729186.jpg?x-oss-process=style/p320",
    "https://i3r.meishichina.com/atta/step/201007/201007291729289.jpg?x-oss-process=style/p320",
    "https://i3r.meishichina.com/atta/step/201007/201007291729511.jpg?x-oss-process=style/p320",
    "https://i3r.meishichina.com/atta/step/201007/201007291729585.jpg?x-oss-process=style/p320",
    "https://i3r.meishichina.com/atta/step/201007/201007291730222.jpg?x-oss-process=style/p320",
    "https://i3r.meishichina.com/atta/step/201007/201007291730294.jpg?x-oss-process=style/p320"
]

output_dir = "web/assets/images"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
    "Referer": "https://home.meishichina.com/"
}

for i, url in enumerate(images):
    try:
        filename = f"mapo-real-step-{i+1}.jpg"
        filepath = os.path.join(output_dir, filename)
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Downloaded {filename}")
    except Exception as e:
        print(f"Failed to download {url}: {e}")
