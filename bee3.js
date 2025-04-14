// Tab switcher
function showTab(id) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

// Motor Animation Start/Stop
let motorInterval;
function startMotor() {
  const rotor = document.getElementById("rotor");
  let angle = 0;
  stopMotor(); // Clear any existing
  motorInterval = setInterval(() => {
    angle += 5;
    rotor.style.transform = `rotate(${angle}deg) translateX(50px) rotate(-${angle}deg)`;
  }, 30);
}

function stopMotor() {
  clearInterval(motorInterval);
}

// DC Motor Canvas Animation
const canvas = document.getElementById("dcMotorCanvas");
const ctx = canvas.getContext("2d");
let dcAngle = 0;

function drawDCMotor() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Stator (outer)
  ctx.beginPath();
  ctx.arc(150, 150, 100, 0, 2 * Math.PI);
  ctx.strokeStyle = "#555";
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.save();
  ctx.translate(150, 150);
  ctx.rotate(dcAngle);

  // Rotor
  ctx.fillStyle = "#f94144";
  ctx.fillRect(-10, -60, 20, 120);
  ctx.fillStyle = "#f3722c";
  ctx.fillRect(-60, -10, 120, 20);

  ctx.restore();

  dcAngle += 0.03;
  requestAnimationFrame(drawDCMotor);
}

drawDCMotor();
