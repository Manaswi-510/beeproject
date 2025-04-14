const rotor = document.getElementById('rotor');
const voltageInput = document.getElementById('voltage');
const voltageValue = document.getElementById('voltageValue');
const currentInput = document.getElementById('current');
const resistanceInput = document.getElementById('resistance');
const calculatedVoltage = document.getElementById('calculatedVoltage');

let angle = 0;
let speed = 0;

// Animate rotor
function rotateRotor() {
  angle += speed;
  rotor.style.transform = `rotate(${angle}deg)`;
  requestAnimationFrame(rotateRotor);
}

// Update speed when voltage changes
function updateMotorSpeed() {
  const voltage = voltageInput.value;
  voltageValue.textContent = voltage + "V";
  speed = voltage * 0.5;  // Adjust this factor to control speed
}

voltageInput.addEventListener('input', updateMotorSpeed);

// Calculate voltage from DC motor equation
function calculateVoltage() {
  const current = parseFloat(currentInput.value);
  const resistance = parseFloat(resistanceInput.value);
  const backEMF = 20; // example value
  const voltage = backEMF + (current * resistance);
  calculatedVoltage.textContent = `Calculated Voltage: ${voltage.toFixed(2)} V`;
}

// Start animation
updateMotorSpeed();
rotateRotor();
