// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a character (a simple rectangle)
const characterGeometry = new THREE.PlaneGeometry(50, 50);
const characterMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const character = new THREE.Mesh(characterGeometry, characterMaterial);
scene.add(character);


// Function to set character position
function setCharacterPosition(x, y) {
    character.position.set(x, y, 0);
}

// Platform creation function
const platformMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const platforms = [];

function addPlatform(x, y, width = 200) {
    const platformGeometry = new THREE.PlaneGeometry(width, 50);
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.set(x, y, 0);
    scene.add(platform);
    platforms.push({ x, y, width });
}

// Set initial character position (e.g., bottom-left of the screen)
setCharacterPosition(-window.innerWidth / 2 + 50, -window.innerHeight / 2 + 75);


// Add platforms
addPlatform(0, -window.innerHeight / 2 + 25, window.innerWidth); // Ground
addPlatform(-300, -150);
addPlatform(0, 0);
addPlatform(300, 50);
addPlatform(0, 150);
addPlatform(-300, 250);

// Set up camera
camera.position.z = 5;

// Character properties
const characterSpeed = 5;
const jumpForce = 15;
let yVelocity = 0;
const gravity = -0.8;

// Input handling
const keys = {};
document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

// Game loop
function animate() {
    requestAnimationFrame(animate);

    // Horizontal movement
    if (keys['ArrowLeft']) character.position.x -= characterSpeed;
    if (keys['ArrowRight']) character.position.x += characterSpeed;

    // Vertical movement
    if (keys['ArrowUp']) character.position.y += characterSpeed;

    // Jumping
    if (keys['Space'] && isOnPlatform()) {
        yVelocity = jumpForce;
    }

    // Apply gravity and update position
    yVelocity += gravity;
    character.position.y += yVelocity;

    // Platform collision
    const platformCollision = checkPlatformCollision();
    if (platformCollision) {
        character.position.y = platformCollision.y + 50;
        yVelocity = 0;
    }

    renderer.render(scene, camera);
}

function isOnPlatform() {
    return platforms.some(platform => 
        character.position.x >= platform.x - platform.width / 2 &&
        character.position.x <= platform.x + platform.width / 2 &&
        Math.abs(character.position.y - (platform.y + 50)) < 1
    );
}

function checkPlatformCollision() {
    return platforms.find(platform => 
        character.position.x >= platform.x - platform.width / 2 &&
        character.position.x <= platform.x + platform.width / 2 &&
        character.position.y >= platform.y &&
        character.position.y <= platform.y + 50
    );
}

animate();

// Handle window resizing
window.addEventListener('resize', () => {
    camera.left = window.innerWidth / -2;
    camera.right = window.innerWidth / 2;
    camera.top = window.innerHeight / 2;
    camera.bottom = window.innerHeight / -2;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Update ground platform
    platforms[0].y = -window.innerHeight / 2 + 25;
    platforms[0].width = window.innerWidth;
    scene.children.find(child => child.position.y === platforms[0].y).scale.x = window.innerWidth / 200;
});