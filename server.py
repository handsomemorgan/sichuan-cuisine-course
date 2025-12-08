import http.server
import socketserver
import json
import os
import urllib.parse
from datetime import datetime

PORT = 8007
COMMENTS_FILE = 'comments.json'

# Initialize comments file if not exists
if not os.path.exists(COMMENTS_FILE):
    with open(COMMENTS_FILE, 'w', encoding='utf-8') as f:
        json.dump({}, f)

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urllib.parse.urlparse(self.path)
        
        # API: Get Comments
        if parsed_path.path == '/api/comments':
            query_params = urllib.parse.parse_qs(parsed_path.query)
            recipe_id = query_params.get('recipeId', [None])[0]
            
            if recipe_id:
                try:
                    with open(COMMENTS_FILE, 'r', encoding='utf-8') as f:
                        all_comments = json.load(f)
                    recipe_comments = all_comments.get(str(recipe_id), [])
                    
                    self.send_response(200)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps(recipe_comments).encode('utf-8'))
                except Exception as e:
                    self.send_error(500, str(e))
            else:
                self.send_error(400, "Missing recipeId")
            return

        # Serve static files (default behavior)
        # Map root to /web directory for convenience if requested, 
        # but the user's structure has index.html in /web/
        # Let's assume we run this from the project root and URLs are like /web/index.html
        # Or if the user opens http://localhost:8006/, we might want to redirect to /web/
        
        if self.path == '/':
            self.send_response(301)
            self.send_header('Location', '/web/')
            self.end_headers()
            return

        return super().do_GET()

    def do_POST(self):
        parsed_path = urllib.parse.urlparse(self.path)
        
        # API: Post Comment
        if parsed_path.path == '/api/comments':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                data = json.loads(post_data.decode('utf-8'))
                recipe_id = str(data.get('recipeId'))
                content = data.get('content')
                user = data.get('user', '匿名厨友')
                
                if not recipe_id or not content:
                    self.send_error(400, "Missing fields")
                    return
                
                new_comment = {
                    "user": user,
                    "content": content,
                    "time": datetime.now().strftime("%Y-%m-%d %H:%M"),
                    "avatar_color": data.get('avatar_color', '#e74c3c') # store color
                }
                
                with open(COMMENTS_FILE, 'r+', encoding='utf-8') as f:
                    all_comments = json.load(f)
                    if recipe_id not in all_comments:
                        all_comments[recipe_id] = []
                    all_comments[recipe_id].insert(0, new_comment) # Add to top
                    
                    f.seek(0)
                    json.dump(all_comments, f, ensure_ascii=False, indent=2)
                    f.truncate()
                
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "comment": new_comment}).encode('utf-8'))
                
            except Exception as e:
                self.send_error(500, str(e))
            return

        return super().do_POST()

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
        print(f"Serving at port {PORT}")
        httpd.serve_forever()
