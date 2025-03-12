// Setup Canvas
const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 600;
canvas.height = 400;

// Block parameters
const blockA = { x: 50, y: 200, width: 60, height: 30, mass: 6, velocity: 2, color: 'blue', label: 'Block A: 6 kg' };
const blockB = { x: 500, y: 200, width: 60, height: 30, mass: 2, velocity: 0, color: 'yellow', label: 'Block B: 2 kg' };

// Draw Blocks
function drawBlocks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ctx.fillStyle = blockA.color;
    ctx.fillRect(blockA.x, blockA.y, blockA.width, blockA.height);
    ctx.fillStyle = blockB.color;
    ctx.fillRect(blockB.x, blockB.y, blockB.width, blockB.height);

    // Labels
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText(blockA.label, blockA.x + blockA.width / 2 - ctx.measureText(blockA.label).width / 2, blockA.y + blockA.height + 20);
    ctx.fillText(blockB.label, blockB.x + blockB.width / 2 - ctx.measureText(blockB.label).width / 2, blockB.y + blockB.height + 20);
}

// Update Block Positions
function updatePositions() {
    blockA.x += blockA.velocity; // Block A moves
    blockB.x += blockB.velocity; // Block B moves
}

// Elastic Collision Calculation
function applyCollision() {
    const vA1 = ((blockA.mass - blockB.mass) * blockA.velocity + 2 * blockB.mass * blockB.velocity) / (blockA.mass + blockB.mass);
    const vB1 = ((blockB.mass - blockA.mass) * blockB.velocity + 2 * blockA.mass * blockA.velocity) / (blockA.mass + blockB.mass);

    // Apply final velocities
    blockA.velocity = vA1;
    blockB.velocity = vB1;
}

// Animation Function
let isCollision = false;
let collisionTime = 100; // Time of collision in milliseconds

function animate() {
    drawBlocks();
    updatePositions();

    // Check for collision
    if (blockA.x + blockA.width >= blockB.x && !isCollision) {
        isCollision = true;
        applyCollision();
    }

    // Stop the animation after collision
    if (isCollision && blockA.x >= blockB.x) {
        cancelAnimationFrame(animate);
    } else {
        requestAnimationFrame(animate);
    }
}

// Start Animation
animate();
