import * as THREE from 'three';

// Cache generated textures so we never re-create them unnecessarily
const textureCache = new Map();

/**
 * Creates an authentic natural Dravidian grey granite / warm beige stone texture
 * with chiselled stone grain, quartz & feldspar mineral flecks, and natural temple patina.
 */
export function getGraniteTexture() {
  if (textureCache.has('granite')) return textureCache.get('granite');

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Base natural temple grey stone tone
  ctx.fillStyle = '#8e867c';
  ctx.fillRect(0, 0, 1024, 1024);

  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    const x = (i / 4) % 1024;
    const y = Math.floor(i / 4 / 1024);

    // Multi-frequency noise for natural stone grain
    const n1 = Math.sin(x * 0.08) * Math.cos(y * 0.08);
    const n2 = Math.sin(x * 0.25 + y * 0.18);
    const n3 = (Math.random() - 0.5) * 35;
    const grain = n1 * 12 + n2 * 8 + n3;

    // Mineral flecks (dark biotite and light quartz flecks)
    const isFleck = Math.random() < 0.04;
    const fleckVal = isFleck ? (Math.random() > 0.5 ? 30 : -35) : 0;

    // Natural warm grey granite values
    data[i] = Math.min(255, Math.max(0, 142 + grain + fleckVal));       // R
    data[i + 1] = Math.min(255, Math.max(0, 134 + grain * 0.95 + fleckVal * 0.95)); // G
    data[i + 2] = Math.min(255, Math.max(0, 124 + grain * 0.88 + fleckVal * 0.9));  // B
    data[i + 3] = 255;
  }
  ctx.putImageData(imgData, 0, 0);

  // Subtle hand-chiselled stone marks typical of Dravidian stone sthapatis
  ctx.strokeStyle = 'rgba(60, 52, 45, 0.14)';
  ctx.lineWidth = 1.2;
  for (let y = 0; y < 1024; y += 14 + Math.random() * 8) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x < 1024; x += 35) {
      ctx.lineTo(x, y + (Math.random() - 0.5) * 3);
    }
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  textureCache.set('granite', texture);
  return texture;
}

/**
 * Creates intricately carved temple pillar stone relief texture
 * with traditional Dravidian stone motifs: lotus bands, diamond friezes (Ratnapatti), and fluting.
 */
export function getCarvedPillarTexture() {
  if (textureCache.has('carvedPillar')) return textureCache.get('carvedPillar');

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Base natural beige-grey stone tone
  ctx.fillStyle = '#847c72';
  ctx.fillRect(0, 0, 512, 1024);

  // Horizontal ornamental architectural moldings (Pattika & Gala)
  const bands = [60, 180, 320, 500, 680, 840, 960];
  bands.forEach((y) => {
    // Stepped relief moldings
    ctx.fillStyle = 'rgba(50, 44, 38, 0.35)';
    ctx.fillRect(0, y - 10, 512, 20);

    ctx.fillStyle = 'rgba(175, 160, 140, 0.3)';
    ctx.fillRect(0, y - 3, 512, 6);

    // Stone diamond frieze (Ratnapatti)
    ctx.fillStyle = 'rgba(195, 182, 165, 0.5)';
    const size = 16;
    for (let x = 15; x < 512; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, y - size / 2);
      ctx.lineTo(x + size / 2, y);
      ctx.lineTo(x, y + size / 2);
      ctx.lineTo(x - size / 2, y);
      ctx.closePath();
      ctx.fill();
    }
  });

  // Vertical stone fluting and pilaster recesses
  for (let x = 64; x < 512; x += 96) {
    ctx.fillStyle = 'rgba(45, 38, 32, 0.22)';
    ctx.fillRect(x - 12, 0, 24, 1024);

    ctx.fillStyle = 'rgba(215, 202, 185, 0.22)';
    ctx.fillRect(x - 4, 0, 8, 1024);
  }

  // Central sculpted relief panel (Niche / Devakoshta)
  ctx.strokeStyle = 'rgba(70, 60, 50, 0.45)';
  ctx.lineWidth = 3.5;
  ctx.strokeRect(100, 360, 312, 280);

  // Arch inside niche
  ctx.beginPath();
  ctx.arc(256, 460, 110, Math.PI, 0, false);
  ctx.strokeStyle = 'rgba(185, 170, 150, 0.5)';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Sacred lotus medallion in center of panel
  drawLotus(ctx, 256, 500, 68, 12, 'rgba(180, 165, 145, 0.6)');

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  textureCache.set('carvedPillar', texture);
  return texture;
}

/**
 * Creates natural aged dark teakwood timber texture for temple roof beams and ceiling joists
 * with natural wood grain, growth rings, and hand-hewn surface.
 */
export function getTeakwoodTexture() {
  if (textureCache.has('teakwood')) return textureCache.get('teakwood');

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Deep warm natural teakwood base
  ctx.fillStyle = '#422f20';
  ctx.fillRect(0, 0, 1024, 1024);

  // Longitudinal wood grain lines
  for (let i = 0; i < 280; i++) {
    const y = Math.random() * 1024;
    const alpha = 0.08 + Math.random() * 0.14;
    const isDark = Math.random() > 0.4;
    ctx.strokeStyle = isDark ? `rgba(28, 18, 10, ${alpha})` : `rgba(105, 78, 52, ${alpha})`;
    ctx.lineWidth = 1 + Math.random() * 2.5;

    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(
      300, y + (Math.random() - 0.5) * 12,
      700, y + (Math.random() - 0.5) * 16,
      1024, y + (Math.random() - 0.5) * 12
    );
    ctx.stroke();
  }

  // Wood knots and growth rings
  const knots = [
    [240, 320, 28],
    [760, 580, 32],
    [480, 840, 24]
  ];
  knots.forEach(([kx, ky, kr]) => {
    for (let r = 4; r < kr; r += 4) {
      ctx.strokeStyle = 'rgba(25, 15, 8, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(kx, ky, r * 1.5, r, 0.2, 0, Math.PI * 2);
      ctx.stroke();
    }
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  textureCache.set('teakwood', texture);
  return texture;
}

/**
 * Creates traditional hand-carved teakwood ceiling panel texture
 * with wooden coffers, lotus medallions, and geometric joist joinery.
 */
export function getLotusCeilingTexture() {
  if (textureCache.has('ceilingLotus')) return textureCache.get('ceilingLotus');

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Rich warm teakwood base
  ctx.fillStyle = '#3a291b';
  ctx.fillRect(0, 0, 1024, 1024);

  // Wooden coffer stepped frame moldings
  const frames = [24, 56, 96, 136];
  frames.forEach((margin, i) => {
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(22, 14, 8, 0.7)' : 'rgba(92, 68, 45, 0.55)';
    ctx.lineWidth = 16;
    ctx.strokeRect(margin, margin, 1024 - margin * 2, 1024 - margin * 2);
  });

  // Corner carved wooden floral rosettes
  const corners = [
    [136, 136],
    [1024 - 136, 136],
    [136, 1024 - 136],
    [1024 - 136, 1024 - 136]
  ];
  corners.forEach(([cx, cy]) => {
    drawLotus(ctx, cx, cy, 48, 8, 'rgba(135, 100, 68, 0.65)');
  });

  // Concentric wooden lotus medallion in center
  const center = 512;
  // Outer wooden petal ring: 24 petals
  drawLotus(ctx, center, center, 320, 24, 'rgba(85, 62, 40, 0.7)');
  // Middle petal ring: 16 petals
  drawLotus(ctx, center, center, 220, 16, 'rgba(120, 88, 58, 0.75)');
  // Inner petal ring: 8 petals
  drawLotus(ctx, center, center, 130, 8, 'rgba(150, 112, 75, 0.85)');

  // Central carved wooden boss
  ctx.fillStyle = '#2d1e12';
  ctx.beginPath();
  ctx.arc(center, center, 65, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#5a4029';
  ctx.lineWidth = 3;
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('ceilingLotus', texture);
  return texture;
}

/**
 * Creates antique temple teakwood door texture with brass studs
 */
export function getTempleDoorTexture() {
  if (textureCache.has('templeDoor')) return textureCache.get('templeDoor');

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Seasoned dark teakwood
  ctx.fillStyle = '#322316';
  ctx.fillRect(0, 0, 1024, 1024);

  // Vertical wood planks
  const plankWidth = 1024 / 6;
  for (let p = 0; p < 6; p++) {
    const px = p * plankWidth;
    ctx.fillStyle = 'rgba(16, 10, 5, 0.65)';
    ctx.fillRect(px, 0, 5, 1024);

    ctx.strokeStyle = 'rgba(75, 52, 34, 0.4)';
    ctx.lineWidth = 1.2;
    for (let i = 0; i < 16; i++) {
      ctx.beginPath();
      const gx = px + 8 + Math.random() * (plankWidth - 16);
      ctx.moveTo(gx, 0);
      ctx.bezierCurveTo(
        gx + (Math.random() - 0.5) * 15, 300,
        gx + (Math.random() - 0.5) * 15, 700,
        gx + (Math.random() - 0.5) * 10, 1024
      );
      ctx.stroke();
    }
  }

  // Heavy horizontal antique brass reinforcing bands
  const bandY = [140, 380, 620, 860];
  bandY.forEach((by) => {
    ctx.fillStyle = '#6e5630';
    ctx.fillRect(0, by - 22, 1024, 44);
    ctx.strokeStyle = '#9c804b';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, by - 22, 1024, 44);

    for (let x = 45; x < 1024; x += 85) {
      drawBrassStud(ctx, x, by, 15);
    }
  });

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('templeDoor', texture);
  return texture;
}

/**
 * Creates traditional polished natural grey/charcoal temple granite floor flagstone texture
 * with realistic natural stone mottling, subtle joints, and soft authentic stone specular.
 */
export function getTempleFloorTexture() {
  if (textureCache.has('templeFloor')) return textureCache.get('templeFloor');

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Deep neutral grey/charcoal temple granite base
  ctx.fillStyle = '#4c453d';
  ctx.fillRect(0, 0, 1024, 1024);

  // Large stone flagstone grid (256x256 tiles)
  const tileW = 256;
  const tileH = 256;

  for (let y = 0; y < 1024; y += tileH) {
    const rowOffset = (y / tileH) % 2 === 0 ? 0 : tileW / 2;
    for (let x = -tileW; x < 1024 + tileW; x += tileW) {
      const tx = x + rowOffset;
      const shade = (Math.random() - 0.5) * 14;
      ctx.fillStyle = `rgb(${76 + shade}, ${70 + shade}, ${63 + shade})`;
      ctx.fillRect(tx + 2, y + 2, tileW - 4, tileH - 4);

      // Natural stone grain mottling
      const sheen = ctx.createLinearGradient(tx, y, tx + tileW, y + tileH);
      sheen.addColorStop(0, 'rgba(160, 148, 134, 0.08)');
      sheen.addColorStop(0.5, 'rgba(0, 0, 0, 0.08)');
      sheen.addColorStop(1, 'rgba(140, 130, 118, 0.06)');
      ctx.fillStyle = sheen;
      ctx.fillRect(tx + 2, y + 2, tileW - 4, tileH - 4);
    }
  }

  // Traditional mortar joints between flagstones
  ctx.strokeStyle = '#2d2722';
  ctx.lineWidth = 3.5;
  for (let y = 0; y <= 1024; y += tileH) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }
  for (let y = 0; y < 1024; y += tileH) {
    const rowOffset = (y / tileH) % 2 === 0 ? 0 : tileW / 2;
    for (let x = 0; x <= 1024; x += tileW) {
      const tx = x + rowOffset;
      ctx.beginPath();
      ctx.moveTo(tx, y);
      ctx.lineTo(tx, y + tileH);
      ctx.stroke();
    }
  }

  // Scattered auspicious fresh marigold & jasmine flower petals on stone floor
  for (let p = 0; p < 50; p++) {
    const px = Math.random() * 1024;
    const py = Math.random() * 1024;
    const isJasmine = Math.random() > 0.45;
    ctx.fillStyle = isJasmine ? 'rgba(248, 246, 240, 0.85)' : 'rgba(235, 115, 20, 0.85)';
    ctx.beginPath();
    ctx.ellipse(px, py, 4 + Math.random() * 2.5, 2.5 + Math.random() * 1.5, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  textureCache.set('templeFloor', texture);
  return texture;
}

/**
 * Creates natural glowing oil flame sprite texture for traditional brass lamps
 */
export function getFlameTexture() {
  if (textureCache.has('flame')) return textureCache.get('flame');

  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(64, 76, 3, 64, 64, 52);
  grad.addColorStop(0, 'rgba(255, 250, 220, 1.0)');
  grad.addColorStop(0.25, 'rgba(255, 205, 90, 0.85)');
  grad.addColorStop(0.65, 'rgba(235, 120, 30, 0.35)');
  grad.addColorStop(1, 'rgba(180, 60, 10, 0)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(64, 64, 60, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('flame', texture);
  return texture;
}

export function getSmokeTexture() {
  if (textureCache.has('smoke')) return textureCache.get('smoke');

  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 56);
  grad.addColorStop(0, 'rgba(220, 210, 195, 0.35)');
  grad.addColorStop(0.4, 'rgba(200, 190, 175, 0.18)');
  grad.addColorStop(1, 'rgba(180, 170, 160, 0)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(64, 64, 56, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  textureCache.set('smoke', texture);
  return texture;
}

// Helpers
function drawLotus(ctx, cx, cy, radius, petals, fillStyle) {
  ctx.fillStyle = fillStyle;
  const angleStep = (Math.PI * 2) / petals;

  for (let i = 0; i < petals; i++) {
    const angle = i * angleStep;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(radius * 0.28, radius * 0.5, 0, radius);
    ctx.quadraticCurveTo(-radius * 0.28, radius * 0.5, 0, 0);
    ctx.fill();

    ctx.restore();
  }
}

function drawBrassStud(ctx, x, y, radius) {
  const grad = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, 1, x, y, radius);
  grad.addColorStop(0, '#d8ba6d');
  grad.addColorStop(0.5, '#9e7f3d');
  grad.addColorStop(1, '#4e3b1c');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}
