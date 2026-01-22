const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

// --- "Database" and Configuration ---
let posts = [];
const LIMITS = { content: 280, user: 15 }; // Condition: Character limits

// --- Logic & Conditions ---
const validatePost = (user, content) => {
    if (!user || user.length > LIMITS.user) return "Username too long or empty.";
    if (!content || content.length > LIMITS.content) return "Post exceeds 280 characters.";
    return null; // No error
};

// --- View Engine (Single File) ---
const renderUI = (error = null) => `
<!DOCTYPE html>
<html>
<head>
    <title>Social Platform v2.0</title>
    <style>
        body { font-family: -apple-system, sans-serif; background: #f3f4f6; margin: 0; padding: 20px; display: flex; justify-content: center; }
        .app-container { width: 100%; max-width: 500px; }
        .composer, .post { background: white; border-radius: 12px; padding: 20px; margin-bottom: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
        .error-msg { color: #dc2626; background: #fee2e2; padding: 10px; border-radius: 6px; margin-bottom: 10px; font-size: 14px; }
        textarea { width: 100%; border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px; height: 80px; resize: none; box-sizing: border-box; }
        .btn { background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 9999px; font-weight: 600; cursor: pointer; margin-top: 10px; }
        .post-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .username { font-weight: bold; color: #1f2937; }
        .timestamp { font-size: 12px; color: #6b7280; }
        .actions { display: flex; gap: 15px; border-top: 1px solid #f3f4f6; pt: 10px; margin-top: 10px; }
    </style>
</head>
<body>
    <div class="app-container">
        <h2>Feed</h2>
        
        <div class="composer">
            ${error ? `<div class="error-msg">${error}</div>` : ''}
            <form action="/submit" method="POST">
                <input type="text" name="user" placeholder="Name" required style="width:100%; margin-bottom:10px; border: 1px solid #e5e7eb; padding: 8px; border-radius: 6px;">
                <textarea name="content" placeholder="What's happening?" required></textarea>
                <button type="submit" class="btn">Post</button>
            </form>
        </div>

        ${posts.length === 0 ? '<p style="text-align:center; color:#6b7280;">No posts yet. Be the first!</p>' : ''}

        ${posts.map(post => `
            <div class="post">
                <div class="post-header">
                    <span class="username">@${post.user}</span>
                    <span class="timestamp">${post.time}</span>
                </div>
                <p>${post.content}</p>
                <div class="actions">
                    <form action="/like/${post.id}" method="POST">
                        <button type="submit" style="background:none; border:none; cursor:pointer;">❤️ ${post.likes}</button>
                    </form>
                    <form action="/delete/${post.id}" method="POST">
                        <button type="submit" style="background:none; border:none; color:#ef4444; cursor:pointer;">Delete</button>
                    </form>
                </div>
            </div>
        `).join('')}
    </div>
</body>
</html>
`;

// --- Routes ---

app.get('/', (req, res) => res.send(renderUI()));

app.post('/submit', (req, res) => {
    const { user, content } = req.body;
    
    // Applying Validation Condition
    const error = validatePost(user, content);
    if (error) return res.send(renderUI(error));

    posts.unshift({
        id: Date.now(),
        user: user.trim(),
        content: content.trim(),
        likes: 0,
        time: new Date().toLocaleTimeString()
    });
    res.redirect('/');
});

app.post('/like/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (post) post.likes++;
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Active at http://localhost:${PORT}`));