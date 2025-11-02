# AI Video Prompt Creator - Usage Guide

## Quick Start

### 1. Running the Application

```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## Step-by-Step Guide

### Creating Your First Prompt

#### Step 1: Scene Description (Required)
Enter a detailed description of your video scene. Be specific and descriptive.

**Example:**
```
A serene mountain landscape at sunset with golden light reflecting off a crystal-clear lake. 
Snow-capped peaks in the background, pine trees in the foreground, and a small wooden dock 
extending into the water.
```

**Tips:**
- Include specific details about objects, colors, and composition
- Describe the environment and atmosphere
- Mention any subjects or focal points

#### Step 2: Visual Style (Required)
Specify the artistic or visual style for your video.

**Popular Styles:**
- Cinematic
- Photorealistic
- Anime/Manga
- Oil Painting
- Watercolor
- Cyberpunk
- Retro/Vintage
- Minimalist
- Abstract
- 3D Rendered

**Example:** `Cinematic with dramatic color grading`

#### Step 3: Camera Movement (Optional)
Describe how the camera should move during the video.

**Common Movements:**
- Static wide shot
- Slow pan left to right
- Slow pan right to left
- Zoom in
- Zoom out
- Drone shot ascending
- Drone shot descending
- Tracking shot following subject
- Dolly in
- Dolly out
- Crane shot
- Handheld/Shaky cam
- Orbital rotation

**Example:** `Slow drone shot ascending from ground level to reveal the full landscape`

#### Step 4: Lighting (Optional)
Specify the lighting conditions and setup.

**Lighting Types:**
- Golden hour (sunrise/sunset)
- Blue hour (twilight)
- Harsh midday sun
- Soft diffused light
- Dramatic side lighting
- Backlit/Silhouette
- Studio lighting
- Natural window light
- Neon/Artificial lights
- Candlelight
- Moonlight
- Overcast/Cloudy

**Example:** `Golden hour with warm, soft light and long shadows`

#### Step 5: Mood & Atmosphere (Optional)
Describe the emotional tone and feeling of the video.

**Mood Options:**
- Peaceful/Serene
- Mysterious/Enigmatic
- Energetic/Dynamic
- Melancholic/Sad
- Joyful/Happy
- Tense/Suspenseful
- Romantic
- Epic/Grand
- Intimate
- Chaotic
- Calm
- Dramatic

**Example:** `Peaceful and contemplative with a sense of tranquility`

#### Step 6: Technical Specifications

##### Duration
How long should the video be?

**Examples:**
- `5 seconds`
- `10s`
- `30 seconds`
- `1 minute`

##### Aspect Ratio
Choose the video dimensions:
- **16:9** - Standard widescreen (YouTube, TV)
- **9:16** - Vertical (TikTok, Instagram Stories)
- **1:1** - Square (Instagram Feed)
- **4:3** - Classic TV format
- **21:9** - Ultrawide cinematic

##### FPS (Frames Per Second)
Select the frame rate:
- **24 fps** - Cinematic (film look)
- **30 fps** - Standard video
- **60 fps** - Smooth motion
- **120 fps** - High-speed/slow-motion

##### Resolution
Choose the video quality:
- **1280x720** - HD (720p)
- **1920x1080** - Full HD (1080p)
- **2560x1440** - 2K (1440p)
- **3840x2160** - 4K (2160p)

#### Step 7: Additional Parameters (Optional)
Add any extra notes, parameters, or special instructions.

**Examples:**
```
- Add subtle film grain for vintage feel
- Include lens flare when sun is visible
- Color palette: warm oranges and cool blues
- Depth of field: shallow focus on foreground
```

## Exporting Your Prompts

### Copy to Clipboard
1. Click the **"Copy"** button on either the XML or Markdown panel
2. Wait for the "✓ Copied!" confirmation
3. Paste into your AI video tool or document

### Download as File
1. Click the **"Download"** button on either panel
2. File will be saved with a timestamp (e.g., `ai-video-prompt-1730563200000.xml`)
3. Use the file in your video generation pipeline

## Example Prompts

### Example 1: Nature Scene

**Scene Description:**
```
A majestic waterfall cascading down moss-covered rocks in a lush rainforest. 
Mist rises from the pool below, sunbeams pierce through the dense canopy, 
and exotic birds fly across the frame.
```

**Visual Style:** `Photorealistic with vibrant colors`

**Camera Movement:** `Slow push in towards the waterfall`

**Lighting:** `Dappled sunlight filtering through trees`

**Mood:** `Awe-inspiring and peaceful`

**Technical Specs:** 10 seconds, 16:9, 24fps, 4K

### Example 2: Urban Scene

**Scene Description:**
```
A bustling Tokyo street at night with neon signs reflecting on wet pavement. 
People with umbrellas walk past, cars drive by with light trails, 
and steam rises from street food vendors.
```

**Visual Style:** `Cyberpunk with enhanced neon colors`

**Camera Movement:** `Slow tracking shot following a pedestrian`

**Lighting:** `Neon lights and artificial street lighting`

**Mood:** `Energetic and mysterious`

**Technical Specs:** 15 seconds, 16:9, 30fps, 1080p

### Example 3: Abstract Scene

**Scene Description:**
```
Colorful liquid paint swirling and mixing in slow motion. 
Blues, purples, and golds create mesmerizing patterns as they blend together.
```

**Visual Style:** `Abstract fluid art`

**Camera Movement:** `Macro close-up, static`

**Lighting:** `Soft, even studio lighting`

**Mood:** `Hypnotic and calming`

**Technical Specs:** 8 seconds, 1:1, 60fps, 4K

## Best Practices

### Writing Effective Prompts

1. **Be Specific**: Include concrete details rather than vague descriptions
2. **Use Descriptive Language**: Paint a picture with words
3. **Consider Composition**: Think about foreground, midground, and background
4. **Specify Colors**: Mention color palettes when relevant
5. **Include Context**: Provide environmental and atmospheric details
6. **Think Cinematically**: Consider how a cinematographer would frame the shot

### Common Mistakes to Avoid

❌ **Too Vague**: "A nice landscape"
✅ **Better**: "A snow-covered mountain range at dawn with pink and orange sky"

❌ **Conflicting Styles**: "Photorealistic anime"
✅ **Better**: "Anime-inspired with realistic lighting"

❌ **Impossible Movements**: "Camera zooms in and out simultaneously"
✅ **Better**: "Camera slowly zooms in on the subject"

❌ **Missing Key Details**: "A person walking"
✅ **Better**: "A silhouetted figure walking along a beach at sunset"

## Keyboard Shortcuts

- **Tab** - Navigate between form fields
- **Ctrl/Cmd + A** - Select all text in current field
- **Ctrl/Cmd + C** - Copy selected text
- **Enter** - Move to next field (in single-line inputs)

## Mobile Usage

On mobile devices:
1. Use the **Form** / **Preview** tabs to switch between input and output
2. Tap the **Copy** button to copy prompts to clipboard
3. Tap **Download** to save files to your device
4. Scroll within preview panels to see full content

## Troubleshooting

### Prompts Not Generating
- Ensure you've filled in at least the Scene Description field
- Check that you're not using special characters that might cause issues

### Copy Not Working
- Ensure your browser has clipboard permissions enabled
- Try using the Download option instead

### Download Not Working
- Check your browser's download settings
- Ensure pop-ups are not blocked

## Integration with AI Video Tools

### Using XML Format
XML format is ideal for:
- Automated processing pipelines
- API integrations
- Structured data parsing
- Database storage

### Using Markdown Format
Markdown format is ideal for:
- Documentation
- Sharing with team members
- Version control (Git)
- Human-readable archives

## Tips for Different Video Types

### Product Videos
- Focus on product features and benefits
- Use clean, professional lighting
- Consider 360° rotation or close-up details
- Keep movements smooth and controlled

### Storytelling Videos
- Establish setting and mood clearly
- Use camera movements to guide narrative
- Consider emotional arc in mood description
- Think about pacing and timing

### Abstract/Artistic Videos
- Emphasize visual style and aesthetics
- Experiment with unusual camera angles
- Focus on colors, patterns, and textures
- Consider rhythm and flow

### Educational Videos
- Keep visuals clear and focused
- Use static or slow movements
- Ensure good lighting for clarity
- Consider text overlay space

## Support

For issues, questions, or feature requests, please refer to the project repository or documentation.

---

**Happy Prompt Creating! 🎬✨**
