// 1. Create a 3D stage container over your background image
const stage = document.createElement('div');
Object.assign(stage.style, {
  position: 'relative',
  width: '100vw',
  height: '100vh',
  backgroundImage: 'url("your-pulsemessenger-bg.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  perspective: '1200px', // Essential: creates the 3D depth effect
  overflow: 'hidden',
  fontFamily: 'system-ui, sans-serif'
});

// 2. Outer wrapper for the glowing angled border
const leftPanelBorder = document.createElement('div');
const panelClip = 'polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)';

Object.assign(leftPanelBorder.style, {
  position: 'absolute',
  left: '3.5%',
  top: '16%',
  width: '24%',
  height: '67%',
  padding: '2px', // Border thickness
  background: 'linear-gradient(180deg, #00f0ff, #0066ff)', // Glowing cyan border
  clipPath: panelClip,
  // Match the 3D perspective angle of the left frame
  transform: 'rotateY(18deg) rotateZ(-1deg)',
  transformOrigin: 'left center',
  boxShadow: '0 0 25px rgba(0, 240, 255, 0.4)'
});

// 3. Inner dark translucent container
const leftPanelInner = document.createElement('div');
Object.assign(leftPanelInner.style, {
  width: '100%',
  height: '100%',
  background: 'rgba(8, 20, 42, 0.85)', // Semi-transparent dark blue
  backdropFilter: 'blur(8px)',
  clipPath: panelClip,
  padding: '16px',
  boxSizing: 'border-box',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
});

// 4. Populate the interactive list items
const friends = [
  { name: 'Alex Rivera', status: 'Online', color: '#2ecc71' },
  { name: 'NovaStar', status: 'In a Call', color: '#e74c3c' },
  { name: 'CryptoKai', status: 'Online', color: '#2ecc71' },
  { name: 'LunaByte', status: 'Away', color: '#f1c40f' }
];

friends.forEach(friend => {
  const row = document.createElement('div');
  Object.assign(row.style, {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 14px',
    background: 'rgba(0, 180, 255, 0.08)',
    borderBottom: '1px solid rgba(0, 240, 255, 0.25)',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  });

  row.innerHTML = `
    <div>
      <div style="font-weight: 600; font-size: 14px;">${friend.name}</div>
      <div style="font-size: 11px; color: #8ab4f8;">
        <span style="color: ${friend.color};">●</span> ${friend.status}
      </div>
    </div>
    <span style="color: #00f0ff; font-size: 14px;">💬 ★</span>
  `;

  // Realistic hover glow
  row.onmouseenter = () => {
    row.style.background = 'rgba(0, 240, 255, 0.22)';
    row.style.transform = 'translateX(4px)';
  };
  row.onmouseleave = () => {
    row.style.background = 'rgba(0, 180, 255, 0.08)';
    row.style.transform = 'translateX(0)';
  };

  leftPanelInner.appendChild(row);
});

leftPanelBorder.appendChild(leftPanelInner);
stage.appendChild(leftPanelBorder);
document.body.appendChild(stage);
