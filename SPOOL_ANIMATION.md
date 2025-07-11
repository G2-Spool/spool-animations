# Spool Logo Animation

A beautiful animated logo for Spool built with Remotion, featuring a thread that grows, loops, and spirals into a spool shape.

## ✨ Features

- **Three-phase animation**: Thread growth → Loops & squiggles → Spiral into spool
- **Brand color palette**: Uses official Spool colors
- **Smooth transitions**: Spring-based animations with easing
- **Customizable**: Thread and spool colors can be adjusted
- **High quality**: Renders at 1920x1080 resolution

## 🎨 Color Palette

The animation uses Spool's official brand colors:

- **Light tints**: `#E6FFFA`, `#B2F5EA`, `#81E6D9`
- **Main/Brand**: `#319795` (primary thread color)
- **Dark shades**: `#2C7A7B`, `#285E61` (spool colors)

## 🚀 Quick Start

### Preview the Animation

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:3000`

3. Select "SpoolAnimation" from the sidebar

### Render the Animation

Use the provided render script:

```bash
./render-spool.js
```

Or use Remotion CLI directly:

```bash
npx remotion render src/index.ts SpoolAnimation out/spool-logo-animation.mp4
```

## 📐 Animation Timeline

- **Frames 0-50**: Thread grows horizontally from left to right
- **Frames 50-120**: Thread forms loops and squiggles
- **Frames 100-130**: Spool base fades in
- **Frames 120-210**: Thread spirals down into the spool
- **Frames 180-210**: Thread wraps around the spool
- **Frame 200+**: Final thread end point appears

**Total Duration**: 210 frames (7 seconds at 30fps)

## 🎛️ Customization

### Colors

You can customize the thread and spool colors by passing props:

```jsx
<SpoolAnimation 
  threadColor="#319795"  // Main thread color
  spoolColor="#2C7A7B"   // Spool body color
/>
```

### Composition Settings

The animation composition can be customized in `src/Root.tsx`:

```jsx
<Composition
  id="SpoolAnimation"
  component={SpoolAnimation}
  durationInFrames={210}  // Adjust duration
  fps={30}                // Adjust frame rate
  width={1920}            // Adjust width
  height={1080}           // Adjust height
  // ... other props
/>
```

## 🔧 Technical Details

- **Framework**: Remotion 4.0
- **Animation**: Spring-based interpolations
- **Graphics**: SVG paths and shapes
- **Effects**: Gradients, glows, and opacity transitions
- **Performance**: Optimized for smooth playback

## 📁 Project Structure

```
src/
├── SpoolAnimation.tsx    # Main animation component
├── Root.tsx             # Composition definitions
└── index.ts            # Entry point

render-spool.js          # Render script
```

## 🎬 Export Options

The animation can be exported in various formats:

### MP4 Video
```bash
npx remotion render src/index.ts SpoolAnimation out/video.mp4
```

### GIF
```bash
npx remotion render src/index.ts SpoolAnimation out/animation.gif
```

### PNG Sequence
```bash
npx remotion render src/index.ts SpoolAnimation out/frames --sequence
```

### WebM
```bash
npx remotion render src/index.ts SpoolAnimation out/video.webm
```

## 🤝 Contributing

To modify the animation:

1. Edit `src/SpoolAnimation.tsx`
2. Preview changes with `npm run dev`
3. Test the final render with `./render-spool.js`

## 📜 License

This animation is part of the Spool project and follows the same licensing terms. 