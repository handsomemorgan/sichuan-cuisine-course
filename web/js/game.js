
export function initGame(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Clear container
    container.innerHTML = '';

    // Create Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    canvas.style.backgroundColor = '#2c3e50';
    canvas.style.borderRadius = '8px';
    canvas.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Game State
    const state = {
        running: true,
        player: { x: 400, y: 300, radius: 20, color: '#e74c3c', speed: 5, health: 100, maxHealth: 100 },
        enemies: [],
        projectiles: [],
        lastTime: 0,
        keys: {},
        score: 0,
        wave: 1,
        spawnTimer: 0
    };

    // Input Handling
    window.addEventListener('keydown', e => state.keys[e.key] = true);
    window.addEventListener('keyup', e => state.keys[e.key] = false);
    
    canvas.addEventListener('mousedown', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Shoot projectile
        const angle = Math.atan2(mouseY - state.player.y, mouseX - state.player.x);
        state.projectiles.push({
            x: state.player.x,
            y: state.player.y,
            vx: Math.cos(angle) * 10,
            vy: Math.sin(angle) * 10,
            radius: 5,
            color: '#f1c40f'
        });
    });

    // Game Loop
    function update(timestamp) {
        if (!state.running) return;
        const dt = (timestamp - state.lastTime) / 1000;
        state.lastTime = timestamp;

        // Player Movement
        if (state.keys['w'] || state.keys['ArrowUp']) state.player.y -= state.player.speed;
        if (state.keys['s'] || state.keys['ArrowDown']) state.player.y += state.player.speed;
        if (state.keys['a'] || state.keys['ArrowLeft']) state.player.x -= state.player.speed;
        if (state.keys['d'] || state.keys['ArrowRight']) state.player.x += state.player.speed;

        // Clamp player to screen
        state.player.x = Math.max(state.player.radius, Math.min(canvas.width - state.player.radius, state.player.x));
        state.player.y = Math.max(state.player.radius, Math.min(canvas.height - state.player.radius, state.player.y));

        // Spawn Enemies
        state.spawnTimer += dt;
        if (state.spawnTimer > 2) { // Spawn every 2 seconds
            state.spawnTimer = 0;
            const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
            let ex, ey;
            if (edge === 0) { ex = Math.random() * canvas.width; ey = -20; }
            else if (edge === 1) { ex = canvas.width + 20; ey = Math.random() * canvas.height; }
            else if (edge === 2) { ex = Math.random() * canvas.width; ey = canvas.height + 20; }
            else { ex = -20; ey = Math.random() * canvas.height; }

            state.enemies.push({
                x: ex,
                y: ey,
                radius: 15,
                color: '#ecf0f1', // Milk color
                speed: 2,
                health: 20
            });
        }

        // Update Projectiles
        state.projectiles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
                state.projectiles.splice(index, 1);
            }
        });

        // Update Enemies
        state.enemies.forEach((enemy, eIndex) => {
            const angle = Math.atan2(state.player.y - enemy.y, state.player.x - enemy.x);
            enemy.x += Math.cos(angle) * enemy.speed;
            enemy.y += Math.sin(angle) * enemy.speed;

            // Collision with Player
            const dist = Math.hypot(state.player.x - enemy.x, state.player.y - enemy.y);
            if (dist < state.player.radius + enemy.radius) {
                state.player.health -= 1;
                // Bounce back slightly
                enemy.x -= Math.cos(angle) * 10;
                enemy.y -= Math.sin(angle) * 10;
            }

            // Collision with Projectiles
            state.projectiles.forEach((p, pIndex) => {
                const pDist = Math.hypot(p.x - enemy.x, p.y - enemy.y);
                if (pDist < p.radius + enemy.radius) {
                    enemy.health -= 10;
                    state.projectiles.splice(pIndex, 1);
                    if (enemy.health <= 0) {
                        state.enemies.splice(eIndex, 1);
                        state.score += 10;
                    }
                }
            });
        });

        // Check Game Over
        if (state.player.health <= 0) {
            state.running = false;
            alert(`Game Over! Score: ${state.score}`);
            return;
        }

        draw();
        requestAnimationFrame(update);
    }

    function draw() {
        // Background
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Player (Chili)
        ctx.fillStyle = state.player.color;
        ctx.beginPath();
        ctx.arc(state.player.x, state.player.y, state.player.radius, 0, Math.PI * 2);
        ctx.fill();
        // Add stem
        ctx.fillStyle = '#27ae60';
        ctx.fillRect(state.player.x - 2, state.player.y - state.player.radius - 5, 4, 10);

        // Enemies (Milk)
        ctx.fillStyle = '#ecf0f1';
        state.enemies.forEach(enemy => {
            ctx.beginPath();
            ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        // Projectiles
        ctx.fillStyle = '#f1c40f';
        state.projectiles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        // UI
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${state.score}`, 10, 30);
        ctx.fillText(`Health: ${Math.floor(state.player.health)}`, 10, 60);
    }

    requestAnimationFrame(update);
    
    return {
        stop: () => { state.running = false; }
    };
}
