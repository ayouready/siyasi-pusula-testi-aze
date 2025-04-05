function initCompass() {
  const compass = document.getElementById('compass');
  
  // Ox etiketləri
  const labels = ['SOL', 'SAĞ', 'AVTORİTAR', 'LİBERTAR'];
  const positions = ['left', 'right', 'top', 'bottom'];
  
  positions.forEach((pos, i) => {
    const label = document.createElement('div');
    label.className = `compass-label ${pos}`;
    label.textContent = labels[i];
    compass.appendChild(label);
  });
}

function updateMarker(x, y) {
  const marker = document.getElementById('marker');
  marker.style.left = `${50 + x}%`;
  marker.style.top = `${50 - y}%`;
}
