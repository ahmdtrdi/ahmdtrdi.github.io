const fs = require('fs');
const path = require('path');

const srcDir = '/Users/tri/.gemini/antigravity-ide/brain/eab927fe-1882-4438-9b42-800ab09befc5';
const destDir = '/Users/tri/Documents/code/showcase/public';

const files = [
  { src: 'gpa_photo_1779803721658.png', dest: 'gpa_photo.png' },
  { src: 'competition_photo_1779803773350.png', dest: 'competition_photo.png' },
  { src: 'internship_photo_1779803840242.png', dest: 'internship_photo.png' }
];

files.forEach(file => {
  const srcPath = path.join(srcDir, file.src);
  const destPath = path.join(destDir, file.dest);
  
  try {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Successfully copied ${file.src} to ${file.dest}`);
  } catch (err) {
    console.error(`Failed to copy ${file.src}:`, err.message);
  }
});
