const canvas = document.getElementById('collisionCanvas');
const ctx = canvas.getContext('2d');

// Initial conditions
let blockA = { x: 50, y: 150, width: 50, height: 30, color: 'blue', velocity: 2 }; // Block A (moving)
let blockB = { x: 300, y: 150, width: 50, height: 30, color: 'yellow', velocity: 0 }; // Block B (stationary)
let time = 0;  // Time in seconds
let collisionOccurred = false; // Flag to indicate if collision happened
let speedB = 0;  // Speed of Block B after collision

// Simulate the collision (elastic collision formula)
function elasticCollision() {
    const m1 = 6;  // Mass of Block A (kg)
    const m2 = 2;  // Mass of Block B (kg)
    const u1 = blockA.velocity;  // Initial velocity of Block A (m/s)
    const u2 = blockB.velocity;  // Initial velocity of Block B (m/s)

    // Apply the elastic collision formula to calculate the final velocity of Block B
    speedB = ((m1 - m2) * u1 + 2 * m2 * u2) / (m1 + m2);
    
    // Update the display on the webpage
    document.getElementById('speedB').textContent = speedB.toFixed(2);  // Display the final velocity in the solution text
    blockB.velocity = speedB;  // Set the final velocity of Block B after the collision
}

// Draw the blocks and update the simulation
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Draw Block A
    ctx.fillStyle = blockA.color;
    ctx.fillRect(blockA.x, blockA.y, blockA.width, blockA.height);

    // Draw Block B
    ctx.fillStyle = blockB.color;
    ctx.fillRect(blockB.x, blockB.y, blockB.width, blockB.height);

    // Move Block A (initial velocity)
    if (!collisionOccurred) {
        blockA.x += blockA.velocity;
    }

    // Check for collision (when blocks meet)
    if (!collisionOccurred && blockA.x + blockA.width >= blockB.x) {
        collisionOccurred = true;
        elasticCollision();  // Apply collision formula
    }

    // Move Block B after the collision
    if (collisionOccurred) {
        blockB.x += blockB.velocity;
    }

    // Stop the simulation after the collision
    if (blockB.x + blockB.width > canvas.width) {
        blockB.x = canvas.width - blockB.width;
    }

    // Repeat the drawing function
    if (blockA.x < canvas.width) {
        requestAnimationFrame(draw);
    }
}

// Start the simulation
requestAnimationFrame(draw);
