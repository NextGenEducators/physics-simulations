const canvas = document.getElementById('collisionCanvas');
const ctx = canvas.getContext('2d');

// Block A properties (mass = 6 kg, initial velocity = 3 m/s)
let blockA = {
    x: 50,  // initial position
    y: 100,
    radius: 20,
    mass: 6,  // kg
    velocity: 3  // m/s
};

// Block B properties (mass = 2 kg, initially at rest)
let blockB = {
    x: 400,  // initial position
    y: 100,
    radius: 20,
    mass: 2,  // kg
    velocity: 0  // m/s
};

const gravity = 0;  // No gravity for horizontal motion
