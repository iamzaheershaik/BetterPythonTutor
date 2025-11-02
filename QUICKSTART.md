# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Build the Application
```bash
npm run build
```

### Step 3: Open the Application
Open `dist/index.html` in your web browser, or use a local server:

```bash
# Option A: Using Python
python -m http.server 8000 -d dist

# Option B: Using Node.js http-server (if installed)
npx http-server dist -p 8000

# Option C: Using PHP
php -S localhost:8000 -t dist
```

Then visit: `http://localhost:8000`

---

## 📝 Create Your First Prompt

1. **Fill in the Scene Description** (required)
   - Example: "A serene mountain landscape at sunset"

2. **Add Visual Style** (required)
   - Example: "Cinematic"

3. **Optional: Add more details**
   - Camera movement, lighting, mood, etc.

4. **View the Output**
   - See XML and Markdown formats in real-time

5. **Export**
   - Click "Copy" to copy to clipboard
   - Click "Download" to save as file

---

## 📚 Need More Help?

- **Full Documentation**: See `README.md`
- **Detailed Features**: See `FEATURES.md`
- **Usage Guide**: See `USAGE_GUIDE.md`
- **Project Summary**: See `PROJECT_SUMMARY.md`

---

## 🎯 Example Prompt

Try this example to get started:

**Scene Description:**
```
A majestic waterfall cascading down moss-covered rocks in a lush rainforest
```

**Visual Style:**
```
Photorealistic with vibrant colors
```

**Camera Movement:**
```
Slow push in towards the waterfall
```

**Lighting:**
```
Dappled sunlight filtering through trees
```

**Mood:**
```
Awe-inspiring and peaceful
```

---

## ✅ Verification

To verify the build was successful:
```bash
npm run build
```

You should see:
```
✓ built in ~3s
dist/index.html
dist/assets/index.css
dist/assets/index.js
```

---

**That's it! You're ready to create AI video prompts! 🎬✨**
