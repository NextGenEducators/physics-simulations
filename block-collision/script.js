// Variables for the blocks
const canvas = document.getElementById('collisionCanvas');
const ctx = canvas.getContext('2d');

let blockA = {
    x: 50, 
    y: 100,
    radius: 20,
    mass: 6,  
    velocity: 3  
};

let blockB = {
    x: 400, 
    y: 100,
    radius: 20,
    mass: 2,  
    velocity: 0  
};

// Elastic collision physics
function elasticCollision(blockA, blockB) {
    const vA = blockA.velocity;
    const vB = blockB.velocity;

    const vA_new = ((blockA.mass - blockB.mass) * vA + 2 * blockB.mass * vB) / (blockA.mass + blockB.mass);
    const vB_new = ((blockB.mass - blockA.mass) * vB + 2 * blockA.mass * vA) / (blockA.mass + blockB.mass);

    return { vA_new, vB_new };
}

// Update block positions
function updatePositions() {
    blockA.x += blockA.velocity;
    blockB.x += blockB.velocity;

    if (blockA.x + blockA.radius >= blockB.x - blockB.radius) {
        const velocities = elasticCollision(blockA, blockB);
        blockA.velocity = velocities.vA_new;
        blockB.velocity = velocities.vB_new;

        blockA.color = 'red';
        blockB.color = 'yellow';
    }
}

// Animate the blocks and show them
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updatePositions();

    ctx.beginPath();
    ctx.arc(blockA.x, blockA.y, blockA.radius, 0, Math.PI * 2);
    ctx.fillStyle = blockA.color || 'blue';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(blockB.x, blockB.y, blockB.radius, 0, Math.PI * 2);
    ctx.fillStyle = blockB.color || 'green';
    ctx.fill();

    updateSolution();
    requestAnimationFrame(animate);
}

function updateSolution() {
    const speedBElement = document.getElementById('speedB');
    speedBElement.textContent = blockB.velocity.toFixed(2);
}

// Start the animation
animate();
