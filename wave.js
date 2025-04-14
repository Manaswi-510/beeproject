const waveCanvas = document.getElementById("waveCanvas");
const waveCtx = waveCanvas.getContext("2d");
const rotorCanvas = document.getElementById("rotorCanvas");
const rotorCtx = rotorCanvas.getContext("2d");

let animationFrame;
let time = 0;
let angle = 0;

function drawWaveform(frequency, slip, poles, time) {
  waveCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
  const width = waveCanvas.width;
  const height = waveCanvas.height;
  const centerY = height / 2;

  const omega = 2 * Math.PI * frequency;
  const tScale = 0.005;

  const colors = ["#B22222", "#FFD700", "#1E90FF"];
  const phaseShifts = [0, 2 * Math.PI / 3, 4 * Math.PI / 3];

  for (let i = 0; i < 3; i++) {
    waveCtx.beginPath();
    waveCtx.strokeStyle = colors[i];

    for (let x = 0; x < width; x++) {
      const t = x * tScale + time;
      const y = centerY - Math.sin(omega * t + phaseShifts[i]) * 80;
      x === 0 ? waveCtx.moveTo(x, y) : waveCtx.lineTo(x, y);
    }

    waveCtx.lineWidth = 2;
    waveCtx.stroke();

    waveCtx.fillStyle = colors[i];
    waveCtx.font = "14px Arial";
    waveCtx.fillText(i === 0 ? "R" : i === 1 ? "Y" : "B", 10, centerY - Math.sin(omega * time + phaseShifts[i]) * 80 - 10);
  }
}

function drawRotor(angle) {
    rotorCtx.clearRect(0, 0, rotorCanvas.width, rotorCanvas.height);
    const centerX = rotorCanvas.width / 2;
    const centerY = rotorCanvas.height / 2;
    const radius = 100;
  
    // Draw outer stator circle
    rotorCtx.beginPath();
    rotorCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    rotorCtx.strokeStyle = "#333";
    rotorCtx.lineWidth = 4;
    rotorCtx.stroke();
  
    const colors = ["red", "gold", "blue"];
    const phaseOffsets = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];
  
    for (let i = 0; i < 3; i++) {
      const rotorX = centerX + radius * 0.8 * Math.cos(angle + phaseOffsets[i]);
      const rotorY = centerY + radius * 0.8 * Math.sin(angle + phaseOffsets[i]);
  
      rotorCtx.beginPath();
      rotorCtx.moveTo(centerX, centerY);
      rotorCtx.lineTo(rotorX, rotorY);
      rotorCtx.strokeStyle = colors[i];
      rotorCtx.lineWidth = 4;
      rotorCtx.stroke();
    }
  }
  
function animate() {
  const freq = parseFloat(document.getElementById("freq").value);
  const slip = parseFloat(document.getElementById("slip").value);
  const poles = parseFloat(document.getElementById("poles").value);

  time += 0.02;
  const rpm = (120 * freq * (1 - slip / 100)) / poles;
  angle += (2 * Math.PI * rpm / 60) * 0.02;

  drawWaveform(freq, slip, poles, time);
  drawRotor(angle);

  animationFrame = requestAnimationFrame(animate);
}

function startSimulation() {
  if (!animationFrame) animate();
}

function stopSimulation() {
  cancelAnimationFrame(animationFrame);
  animationFrame = null;
}
