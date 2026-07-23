const fs = require('fs');

const path = 'e:/Sanjari production/src/pages/servicesData.js';
let content = fs.readFileSync(path, 'utf8');

const mapping = {
  '📸': '/images/icons/camera.png',
  '📷': '/images/icons/camera.png',
  '🖼️': '/images/icons/album.png',
  '🎬': '/images/icons/cinema.png',
  '🎥': '/images/icons/cinema.png',
  '✂️': '/images/icons/cinema.png',
  '🎭': '/images/icons/cinema.png',
  '✨': '/images/icons/magic.png',
  '💡': '/images/icons/magic.png',
  '🎨': '/images/icons/magic.png',
  '⚡': '/images/icons/magic.png',
  '✈️': '/images/icons/location.png',
  '🏙️': '/images/icons/location.png',
  '🏢': '/images/icons/location.png',
  '🗺️': '/images/icons/location.png',
  '💿': '/images/icons/digital.png',
  '💾': '/images/icons/digital.png',
  '☁️': '/images/icons/digital.png',
  '📖': '/images/icons/album.png',
  '📜': '/images/icons/album.png',
  '☎️': '/images/icons/chat.png',
  '💬': '/images/icons/chat.png',
  '📋': '/images/icons/chat.png',
  '🗓️': '/images/icons/chat.png',
  '👔': '/images/icons/corporate.png',
  '👗': '/images/icons/fashion.png',
  '📦': '/images/icons/digital.png',
  '📤': '/images/icons/digital.png',
  '🎁': '/images/icons/wedding.png',
  '🚁': '/images/icons/aerial.png',
  '🎵': '/images/icons/magic.png',
  '👶': '/images/icons/portrait.png',
  '💃': '/images/icons/fashion.png',
  '🛍️': '/images/icons/fashion.png',
  '🤝': '/images/icons/chat.png',
  '🌤️': '/images/icons/location.png',
  '🔄': '/images/icons/digital.png',
  '✏️': '/images/icons/magic.png',
};

// We want to replace icon: 'emoji' with icon: 'mapped-path'
Object.keys(mapping).forEach(emoji => {
  const replacement = mapping[emoji];
  const regex = new RegExp(`icon:\\s*['"]${emoji}['"]`, 'g');
  content = content.replace(regex, `icon: '${replacement}'`);
});

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated servicesData.js');
