let angle = 0;
let animationRunning = false;
let speed = 0;
let rotorSpeed = 0;

const canvas = document.getElementById("rmfCanvas");
const ctx = canvas.getContext("2d");

const voltageSlider = document.getElementById("voltage");
const frequencySlider = document.getElementById("frequency");
const polesSlider = document.getElementById("poles");
const slipSlider = document.getElementById("slip");

const voltageValue = document.getElementById("voltageValue");
const frequencyValue = document.getElementById("frequencyValue");
const polesValue = document.getElementById("polesValue");
const slipValue = document.getElementById("slipValue");

voltageSlider.addEventListener("input", updateMotor);
frequencySlider.addEventListener("input", updateMotor);
polesSlider.addEventListener("input", updateMotor);
slipSlider.addEventListener("input", updateMotor);

function updateMotor() {
  voltageValue.textContent = voltageSlider.value + "V";
  frequencyValue.textContent = frequencySlider.value + "Hz";
  polesValue.textContent = polesSlider.value + " Poles";
  slipValue.textContent = slipSlider.value + "%";

  const frequency = frequencySlider.value;
  const poles = polesSlider.value;
  const slip = slipSlider.value / 100;

  // Calculate Synchronous speed (RPM)
  const synchronousSpeed = (120 * frequency) / poles;
  rotorSpeed = synchronousSpeed * (1 - slip);
  speed = rotorSpeed;
}

function drawField() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 100;

  const colors = ["red", "green", "blue"];
  const phaseOffset = [0, 120, 240];

  // Draw the stator (3-phase field)
  for (let i = 0; i < 3; i++) {
    let theta = (angle + phaseOffset[i]) * (Math.PI / 180);
    let x = centerX + radius * Math.cos(theta);
    let y = centerY + radius * Math.sin(theta);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = colors[i];
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  // Draw the rotor (inner rotating part)
  const rotorRadius = 40;
  ctx.beginPath();
  ctx.arc(centerX, centerY, rotorRadius, 0, 2 * Math.PI);
  ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  ctx.fill();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Make the rotor rotate based on speed
  angle = (angle + (speed / 60) * 2) % 360;
}

function animate() {
  if (animationRunning) {
    drawField();
  }
  requestAnimationFrame(animate);
}

function startMotor() {
  animationRunning = true;
}

function stopMotor() {
  animationRunning = false;
}

function resetMotor() {
  animationRunning = false;
  angle = 0;
}
function showPartInfo(part) {
    let partTitle = "";
    let partDescription = "";
  
    // Determine part info based on the clicked part
    switch (part) {
      case "stator":
        partTitle = "Stator";
        partDescription = "The stator generates the rotating magnetic field when fed with three-phase AC. It is stationary and surrounds the rotor.";
        break;
      case "rotor":
        partTitle = "Rotor";
        partDescription = "The rotor follows the rotating magnetic field and turns due to the induced current. It is inside the stator.";
        break;
      case "shaft":
        partTitle = "Shaft";
        partDescription = "The shaft transfers the rotational motion from the rotor to the load, such as a fan or pump.";
        break;
      case "bearingLeft":
      case "bearingRight":
        partTitle = "Bearings";
        partDescription = "Bearings support the rotor shaft and reduce friction, allowing the rotor to spin freely.";
        break;
    }
  
    // Display the popup with the part info
    document.getElementById("partTitle").textContent = partTitle;
    document.getElementById("partDescription").textContent = partDescription;
    document.getElementById("partInfoPopup").style.display = "block";
  }
  
  function closePopup() {
    document.getElementById("partInfoPopup").style.display = "none";
  }
  
  // Add event listeners for clickable parts
  document.getElementById("stator").addEventListener("click", () => showPartInfo("stator"));
  document.getElementById("rotor").addEventListener("click", () => showPartInfo("rotor"));
  document.getElementById("shaft").addEventListener("click", () => showPartInfo("shaft"));
  document.getElementById("bearingLeft").addEventListener("click", () => showPartInfo("bearingLeft"));
  document.getElementById("bearingRight").addEventListener("click", () => showPartInfo("bearingRight"));
  
animate();

  