// Get canvas element and context
const canvas = document.getElementById("simulationCanvas");
const ctx = canvas.getContext("2d");

// Variables to represent the atomic system
const nucleus = {
    x: canvas.width / 2, // Center of the canvas
    y: canvas.height / 2, // Center of the canvas
    radius: 50, // Radius of the nucleus (representing the center)
    color: "#FFCC00", // Nucleus color (yellow)
};

const electron = {
    radius: 5, // Radius of the electron (small circle)
    angle: 0, // Angle of electron's orbit
    orbitRadius: 150, // Distance from nucleus (orbit radius)
    speed: 0.02, // Speed of electron in radians per frame
    color: "#00FFCC", // Electron color (cyan)
};

// Function to draw the nucleus
function drawNucleus() {
    ctx.beginPath();
    ctx.arc(nucleus.x, nucleus.y, nucleus.radius, 0, 2 * Math.PI);
    ctx.fillStyle = nucleus.color;
    ctx.fill();
    ctx.closePath();
}

// Function to draw the electron orbit path (optional, just for visualization)
function drawElectronOrbit() {
    ctx.beginPath();
    ctx.arc(nucleus.x, nucleus.y, electron.orbitRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.stroke();
    ctx.closePath();
}

// Function to draw the electron
function drawElectron() {
    const electronX = nucleus.x + electron.orbitRadius * Math.cos(electron.angle);
    const electronY = nucleus.y + electron.orbitRadius * Math.sin(electron.angle);

    ctx.beginPath();
    ctx.arc(electronX, electronY, electron.radius, 0, 2 * Math.PI);
    ctx.fillStyle = electron.color;
    ctx.fill();
    ctx.closePath();
}

// Function to update the electron's position
function updateElectronPosition() {
    electron.angle += electron.speed; // Update angle for orbital motion

    if (electron.angle >= 2 * Math.PI) {
        electron.angle = 0; // Reset angle when a full revolution is completed
    }
}

// Function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Animation loop to create the simulation effect
function animate() {
    clearCanvas();
    drawNucleus();
    drawElectronOrbit();
    drawElectron();
    updateElectronPosition();
    requestAnimationFrame(animate); // Recursively call animate for continuous animation
}

// Start the animation
animate();
