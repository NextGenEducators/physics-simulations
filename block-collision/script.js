const canvas = document.getElementById('collisionCanvas');
const ctx = canvas.getContext('2d');

// Initial conditions
let blockA = { x: 50, y: 150, width: 50, height: 30, color: 'blue', velocity: 2, mass: 6 }; // Block A (moving)
let blockB = { x: 300, y: 150, width: 50, height: 30, color: 'yellow', velocity: 0, mass: 2 }; // Block B (stationary)
let time = 0;  // Time in seconds
let collisionOccurred = false; // Flag to indicate if collision happened
let vB = 0; // Store final velocity of Block B

// Function to draw text (time and block labels)
function drawText() {
    // Draw time text
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText(`t = ${time.toFixed(2)} s`, 10, 20);  // Display time at the top left

    // Draw labels for Block A and Block B
    ctx.fillText(`Block A (${blockA.mass} kg)`, blockA.x + blockA.width / 2 - 40, blockA.y + blockA.height + 20);
    ctx.fillText(`Block B (${blockB.mass} kg)`, blockB.x + blockB.width / 2 - 40, blockB.y + blockB.height + 20);
}

// Simulate the collision (elastic collision formula)
function elasticCollision() {
    const m1 = blockA.mass;  // Mass of Block A (kg)
    const m2 = blockB.mass;  // Mass of Block B (kg)
    const u1 = blockA.velocity;  // Initial velocity of Block A (m/s)
    const u2 = blockB.velocity;  // Initial velocity of Block B (m/s)

    // Apply the elastic collision formula to calculate the final velocity of Block B
    const v1 = ((m1 - m2) * u1 + 2 * m2 * u2) / (m1 + m2);  // Final velocity of Block A
    vB = ((m2 - m1) * u2 + 2 * m1 * u1) / (m1 + m2);  // Final velocity of Block B
    
    // Set the final velocities after the collision
    blockA.velocity = v1;
    blockB.velocity = vB;

    // Update the solution text dynamically
    document.getElementById('calcSteps').innerText = `Now calculate the final velocities using the formula:`;
    document.getElementById('vB').innerText = vB.toFixed(2);
    document.getElementById('finalAnswer').style.display = 'block';
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

    // Draw text (time and block labels)
    drawText();

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

    // Increment time
    if (blockA.x < canvas.width) {
        time += 0.01;  // Increment time for every frame
        requestAnimationFrame(draw);
    }
}

// Start the simulation
requestAnimationFrame(draw);
