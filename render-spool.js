#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

// Configuration
const COMPOSITION_ID = 'SpoolAnimation';
const OUTPUT_DIR = 'out';
const OUTPUT_FILE = 'spool-logo-animation.mp4';

// Colors (you can customize these)
const THREAD_COLOR = '#319795'; // Spool brand color
const SPOOL_COLOR = '#2C7A7B';  // Dark shade

console.log('🧵 Rendering Spool Logo Animation...');
console.log(`📁 Output: ${OUTPUT_DIR}/${OUTPUT_FILE}`);

try {
  // Create output directory if it doesn't exist
  execSync(`mkdir -p ${OUTPUT_DIR}`, { stdio: 'inherit' });
  
  // Render the animation
  const renderCommand = `npx remotion render src/index.ts ${COMPOSITION_ID} ${OUTPUT_DIR}/${OUTPUT_FILE} --props='{"threadColor":"${THREAD_COLOR}","spoolColor":"${SPOOL_COLOR}"}'`;
  
  console.log('🎬 Starting render...');
  execSync(renderCommand, { stdio: 'inherit' });
  
  console.log('✅ Animation rendered successfully!');
  console.log(`📄 File saved to: ${path.resolve(OUTPUT_DIR, OUTPUT_FILE)}`);
  
} catch (error) {
  console.error('❌ Error rendering animation:', error.message);
  process.exit(1);
} 