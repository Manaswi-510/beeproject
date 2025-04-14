function calculatePower() {
    const R = parseFloat(document.getElementById("resistance").value);
    const X = parseFloat(document.getElementById("reactance").value);
    const VL = parseFloat(document.getElementById("lineVoltage").value);
  
    const Z = Math.sqrt(R * R + X * X); // Magnitude of impedance
    const phi = Math.atan(X / R); // Phase angle in radians
    const phiDeg = phi * (180 / Math.PI); // In degrees
  
    const Vph = VL / Math.sqrt(3);
    const Iph = Vph / Z;
    const IL = Iph;
  
    const P = Math.sqrt(3) * VL * IL * Math.cos(phi) / 1000; // kW
    const Q = Math.sqrt(3) * VL * IL * Math.sin(phi) / 1000; // kVAR
    const S = Math.sqrt(3) * VL * IL / 1000; // kVA
  
    document.getElementById("result").innerHTML = `
      <strong>Results:</strong><br>
      Impedance Z = ${Z.toFixed(2)} Ω ∠ ${phiDeg.toFixed(2)}°<br>
      (a) Phase Voltage = ${Vph.toFixed(2)} V<br>
      (b) Line Current = ${IL.toFixed(3)} A<br>
      (c) Active Power (P) = ${P.toFixed(3)} kW<br>
      Reactive Power (Q) = ${Q.toFixed(3)} kVAR<br>
      Apparent Power (S) = ${S.toFixed(3)} kVA
    `;
  }
  