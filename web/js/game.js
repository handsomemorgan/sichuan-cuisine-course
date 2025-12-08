import { Player, Enemy, Projectile, Particle, FloatingText } from './game-classes.js?v=4';

export function initGame(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // --- Setup Container ---
    container.innerHTML = '';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.backgroundColor = '#2c3e50';
    container.style.borderRadius = '12px';
    container.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';

    // --- Canvas ---
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // --- UI Overlay ---
    const uiLayer = document.createElement('div');
    uiLayer.style.position = 'absolute';
    uiLayer.style.top = '0';
    uiLayer.style.left = '0';
    uiLayer.style.width = '100%';
    uiLayer.style.height = '100%';
    uiLayer.style.pointerEvents = 'none'; // Let clicks pass through to canvas when playing
    uiLayer.style.display = 'flex';
    uiLayer.style.flexDirection = 'column';
    uiLayer.style.justifyContent = 'center';
    uiLayer.style.alignItems = 'center';
    uiLayer.style.color = 'white';
    uiLayer.style.fontFamily = '"Noto Sans SC", sans-serif';
    container.appendChild(uiLayer);

    // --- Game State ---
    let state = {
        status: 'MENU', // MENU, PLAYING, GAMEOVER
        lastTime: 0,
        running: true,
        score: 0,
        wave: 1,
        difficultyMultiplier: 1,
        spawnTimer: 0,
        keys: {},
        mouse: { x: 0, y: 0, down: false },
        shake: 0
    };

    let entities = {
        player: null,
        enemies: [],
        projectiles: [],
        particles: [],
        texts: []
    };

    let animationFrameId;

    // --- Input Handling ---
    const onKeyDown = (e) => state.keys[e.key] = true;
    const onKeyUp = (e) => state.keys[e.key] = false;
    const onMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        state.mouse.x = (e.clientX - rect.left) * (canvas.width / rect.width);
        state.mouse.y = (e.clientY - rect.top) * (canvas.height / rect.height);
    };
    const onMouseDown = () => {
        state.mouse.down = true;
        if (state.status === 'PLAYING' && entities.player) {
            shoot();
        }
    };
    const onMouseUp = () => state.mouse.down = false;

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    // Canvas events need to be handled carefully with cleanup
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', onMouseUp);

    // --- Game Logic ---
    function initLevel() {
        entities.player = new Player(canvas.width / 2, canvas.height / 2);
        entities.enemies = [];
        entities.projectiles = [];
        entities.particles = [];
        entities.texts = [];
        state.score = 0;
        state.wave = 1;
        state.difficultyMultiplier = 1;
        state.spawnTimer = 0;
    }

    function shoot() {
        const angle = Math.atan2(state.mouse.y - entities.player.y, state.mouse.x - entities.player.x);
        const speed = 600;
        entities.projectiles.push(new Projectile(
            entities.player.x, 
            entities.player.y, 
            Math.cos(angle) * speed, 
            Math.sin(angle) * speed
        ));
        
        // Recoil
        entities.player.x -= Math.cos(angle) * 5;
        entities.player.y -= Math.sin(angle) * 5;
    }

    function spawnEnemy() {
        const edge = Math.floor(Math.random() * 4);
        let ex, ey;
        const pad = 30;
        if (edge === 0) { ex = Math.random() * canvas.width; ey = -pad; }
        else if (edge === 1) { ex = canvas.width + pad; ey = Math.random() * canvas.height; }
        else if (edge === 2) { ex = Math.random() * canvas.width; ey = canvas.height + pad; }
        else { ex = -pad; ey = Math.random() * canvas.height; }

        // Determine type based on wave
        let type = 0;
        if (state.wave > 2 && Math.random() < 0.3) type = 1; // Yogurt
        if (state.wave > 4 && Math.random() < 0.1) type = 2; // Ice Cream

        entities.enemies.push(new Enemy(ex, ey, type));
    }

    function update(dt) {
        if (state.status !== 'PLAYING') return;

        // Player
        entities.player.update(dt, { keys: state.keys }, { width: canvas.width, height: canvas.height });

        // Spawning
        state.spawnTimer += dt;
        let spawnRate = Math.max(0.5, 2.0 - (state.wave * 0.1));
        if (state.spawnTimer > spawnRate) {
            state.spawnTimer = 0;
            spawnEnemy();
        }

        // Difficulty / Wave
        if (state.score > state.wave * 100) {
            state.wave++;
            entities.texts.push(new FloatingText(canvas.width / 2, canvas.height / 3, `WAVE ${state.wave}!`, '#f1c40f'));
        }

        // Projectiles
        entities.projectiles.forEach(p => p.update(dt));
        entities.projectiles = entities.projectiles.filter(p => 
            p.x >= 0 && p.x <= canvas.width && p.y >= 0 && p.y <= canvas.height && !p.markedForDeletion
        );

        // Enemies
        entities.enemies.forEach(e => e.update(dt, entities.player));
        
        // Collisions
        entities.enemies.forEach(enemy => {
            // Player vs Enemy
            const dist = Math.hypot(entities.player.x - enemy.x, entities.player.y - enemy.y);
            if (dist < entities.player.radius + enemy.radius) {
                entities.player.health -= 10;
                enemy.markedForDeletion = true;
                state.shake = 10;
                createExplosion(enemy.x, enemy.y, enemy.color);
                entities.texts.push(new FloatingText(entities.player.x, entities.player.y - 30, "-10 HP", "red"));
            }

            // Projectile vs Enemy
            entities.projectiles.forEach(p => {
                if (p.markedForDeletion) return;
                const pDist = Math.hypot(p.x - enemy.x, p.y - enemy.y);
                if (pDist < p.radius + enemy.radius) {
                    enemy.health -= 25; // Damage
                    p.markedForDeletion = true;
                    createExplosion(p.x, p.y, '#fff', 3);
                    
                    if (enemy.health <= 0) {
                        enemy.markedForDeletion = true;
                        state.score += enemy.scoreValue;
                        createExplosion(enemy.x, enemy.y, enemy.color, 10);
                        entities.texts.push(new FloatingText(enemy.x, enemy.y, `+${enemy.scoreValue}`, "gold"));
                    } else {
                        // Hit flash/knockback
                        enemy.x += p.vx * 0.05;
                        enemy.y += p.vy * 0.05;
                    }
                }
            });
        });

        entities.enemies = entities.enemies.filter(e => !e.markedForDeletion);

        // Particles
        entities.particles.forEach(p => p.update(dt));
        entities.particles = entities.particles.filter(p => !p.markedForDeletion);

        // Texts
        entities.texts.forEach(t => t.update(dt));
        entities.texts = entities.texts.filter(t => t.life > 0);

        // Screen Shake decay
        if (state.shake > 0) state.shake *= 0.9;
        if (state.shake < 0.5) state.shake = 0;

        // Game Over
        if (entities.player.health <= 0) {
            state.status = 'GAMEOVER';
            showGameOverMenu();
        }
    }

    function createExplosion(x, y, color, count = 5) {
        for (let i = 0; i < count; i++) {
            entities.particles.push(new Particle(x, y, color));
        }
    }

    function draw() {
        // Clear & Background
        ctx.save();
        if (state.shake > 0) {
            ctx.translate((Math.random() - 0.5) * state.shake, (Math.random() - 0.5) * state.shake);
        }
        
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 40) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 40) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }

        if (state.status === 'PLAYING' || state.status === 'GAMEOVER') {
            entities.particles.forEach(p => p.draw(ctx));
            entities.enemies.forEach(e => e.draw(ctx));
            entities.projectiles.forEach(p => p.draw(ctx));
            if (entities.player) entities.player.draw(ctx);
            entities.texts.forEach(t => t.draw(ctx));
        }

        ctx.restore();

        // HUD
        if (state.status === 'PLAYING') {
            ctx.fillStyle = 'white';
            ctx.font = 'bold 20px "Noto Sans SC"';
            ctx.fillText(`Score: ${state.score}`, 20, 30);
            ctx.fillText(`Wave: ${state.wave}`, 20, 60);
            
            // Health Bar
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(20, canvas.height - 30, 200, 20);
            ctx.fillStyle = '#e74c3c';
            ctx.fillRect(20, canvas.height - 30, 200 * (entities.player.health / 100), 20);
        }
    }

    function loop(timestamp) {
        if (!state.running) return;
        if (!state.lastTime) state.lastTime = timestamp;
        let dt = (timestamp - state.lastTime) / 1000;
        state.lastTime = timestamp;
        if (dt > 0.1) dt = 0.1; // Cap dt

        update(dt);
        draw();

        animationFrameId = requestAnimationFrame(loop);
    }

    // --- Menus ---
    function showMenu() {
        uiLayer.innerHTML = `
            <h1 class="text-4xl font-bold mb-4 text-chuan-gold" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.5)">保卫川菜</h1>
            <p class="mb-8 text-gray-300">抵御牛奶和冰淇淋的进攻！</p>
            <button id="start-btn" class="bg-chuan-red hover:bg-chuan-red-light text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105">开始游戏</button>
        `;
        uiLayer.style.pointerEvents = 'auto';
        document.getElementById('start-btn').addEventListener('click', () => {
            uiLayer.innerHTML = '';
            uiLayer.style.pointerEvents = 'none';
            initLevel();
            state.status = 'PLAYING';
        });
    }

    function showGameOverMenu() {
        uiLayer.innerHTML = `
            <h1 class="text-4xl font-bold mb-4 text-red-500">游戏结束</h1>
            <p class="text-2xl mb-2">得分: ${state.score}</p>
            <p class="mb-8 text-gray-300">坚持了 ${state.wave} 波进攻</p>
            <button id="restart-btn" class="bg-chuan-red hover:bg-chuan-red-light text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105">重新开始</button>
        `;
        uiLayer.style.pointerEvents = 'auto';
        document.getElementById('restart-btn').addEventListener('click', () => {
            uiLayer.innerHTML = '';
            uiLayer.style.pointerEvents = 'none';
            initLevel();
            state.status = 'PLAYING';
        });
    }

    // --- Start ---
    showMenu();
    animationFrameId = requestAnimationFrame(loop);

    return {
        stop: () => {
            state.running = false;
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
            // Canvas elements are removed when container.innerHTML is cleared in next init, 
            // but manual cleanup is good practice if we were reusing container.
        }
    };
}
