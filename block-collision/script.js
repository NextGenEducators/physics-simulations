// Get the canvas and its context
const canvas = document.getElementById('collisionCanvas');
const ctx = canvas.getContext('2d');

// Block properties
const blockA = {
    x: 50,
    y: canvas.height / 2,
    radius: 20,
    mass: 6,  // kg
    velocity: 2,  // m/s (initial velocity)
    color: 'blue'
};

const blockB = {
    x: 300,
    y: canvas.height / 2,
    radius: 20,
    mass: 2,  // kg
    velocity: 0,  // m/s (initial velocity)
    color: 'green'
};

// Elastic collision formula to calculate velocities after collision
function elasticCollision(blockA, blockB) {
    const u1 = blockA.velocity;
    const u2 = blockB.velocity;
    const m1 = blockA.mass;
    const m2 = blockB.mass;

    // New velocities after elastic collision
    const v1 = ((m1 - m2) * u1 + 2 * m2 * u2) / (m1 + m2);
    const v2 = ((m2 - m1) * u2 + 2 * m1 * u1) / (m1 + m2);

    // Update velocities
    blockA.velocity = v1;
    blockB.velocity = v2;

    return v2;  // return the velocity of block B after collision
}

// Function to update the positions of the blocks
function updatePositions() {
    // Update Block A position
    blockA.x += blockA.velocity;

    // If Block A hits Block B, trigger collision
    if (blockA.x + blockA.radius >= blockB.x - blockB.radius && blockA.velocity > 0) {
        // Apply the elastic collision formula
        blockB.velocity = elasticCollision(blockA, blockB);

        // Prevent Block A from passing through Block B
        blockA.x = blockB.x - blockA.radius - 1;
    }
}

// Function to update the solution (velocity of Block B)
function updateSolution() {
    const speedBElement = document.getElementById('speedB');
    speedBElement.textContent = blockB.velocity.toFixed(2);  // Display the velocity of Block B
}

// Animation function
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas

    // Update block positions
    updatePositions();

    // Draw Block A and Block B
    ctx.beginPath();
    ctx.arc(blockA.x, blockA.y, blockA.radius, 0, Math.PI * 2);
    ctx.fillStyle = blockA.color || 'blue';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(blockB.x, blockB.y, blockB.radius, 0, Math.PI * 2);
    ctx.fillStyle = blockB.color || 'green';
    ctx.fill();

    // Update the solution for Block B's speed
    updateSolution();

    // Continue animation
    requestAnimationFrame(animate);
}

// Start the animation loop
animate();
