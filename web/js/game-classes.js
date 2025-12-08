
export class Entity {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.markedForDeletion = false;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    update(dt) {}
}

export class Player extends Entity {
    constructor(x, y) {
        super(x, y, 20, '#e74c3c'); // Chili Red
        this.speed = 300; // pixels per second
        this.maxHealth = 100;
        this.health = 100;
        this.weaponTimer = 0;
        this.weaponInterval = 0.2;
    }

    update(dt, input, bounds) {
        if (input.keys['w'] || input.keys['ArrowUp']) this.y -= this.speed * dt;
        if (input.keys['s'] || input.keys['ArrowDown']) this.y += this.speed * dt;
        if (input.keys['a'] || input.keys['ArrowLeft']) this.x -= this.speed * dt;
        if (input.keys['d'] || input.keys['ArrowRight']) this.x += this.speed * dt;

        // Clamp
        this.x = Math.max(this.radius, Math.min(bounds.width - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(bounds.height - this.radius, this.y));
    }

    draw(ctx) {
        // Draw Body
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        super.draw(ctx);
        ctx.shadowBlur = 0;

        // Draw Stem
        ctx.fillStyle = '#27ae60';
        ctx.fillRect(this.x - 4, this.y - this.radius - 8, 8, 12);
        
        // Draw Face (Cute expression)
        ctx.fillStyle = 'white';
        // Eyes
        ctx.beginPath();
        ctx.arc(this.x - 7, this.y - 2, 5, 0, Math.PI * 2);
        ctx.arc(this.x + 7, this.y - 2, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x - 7, this.y - 2, 2, 0, Math.PI * 2);
        ctx.arc(this.x + 7, this.y - 2, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

export class Projectile extends Entity {
    constructor(x, y, vx, vy) {
        super(x, y, 6, '#f1c40f');
        this.vx = vx;
        this.vy = vy;
    }

    update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
    }
    
    draw(ctx) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        super.draw(ctx);
        ctx.shadowBlur = 0;
    }
}

export class Enemy extends Entity {
    constructor(x, y, type) {
        // Type: 0 = Milk (Basic), 1 = Yogurt (Fast), 2 = IceCream (Tank)
        let color = '#ecf0f1';
        let radius = 15;
        let health = 20;
        let speed = 100;
        let score = 10;

        if (type === 1) { // Yogurt
            color = '#e67e22'; // Orange-ish
            radius = 12;
            health = 10;
            speed = 180;
            score = 20;
        } else if (type === 2) { // Ice Cream
            color = '#9b59b6'; // Purple
            radius = 25;
            health = 60;
            speed = 60;
            score = 50;
        }

        super(x, y, radius, color);
        this.type = type;
        this.health = health;
        this.speed = speed;
        this.scoreValue = score;
        this.angle = 0;
    }

    update(dt, player) {
        this.angle = Math.atan2(player.y - this.y, player.x - this.x);
        this.x += Math.cos(this.angle) * this.speed * dt;
        this.y += Math.sin(this.angle) * this.speed * dt;
    }
}

export class Particle extends Entity {
    constructor(x, y, color) {
        super(x, y, Math.random() * 3 + 2, color);
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 100 + 50;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.life = 1.0; // seconds
        this.decay = Math.random() * 0.5 + 0.5;
    }

    update(dt) {
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.life -= dt * this.decay;
        this.radius *= 0.95; // Shrink
        if (this.life <= 0) this.markedForDeletion = true;
    }

    draw(ctx) {
        ctx.globalAlpha = Math.max(0, this.life);
        super.draw(ctx);
        ctx.globalAlpha = 1.0;
    }
}

export class FloatingText {
    constructor(x, y, text, color) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.color = color;
        this.life = 1.0;
        this.vy = -30; // Move up
    }

    update(dt) {
        this.y += this.vy * dt;
        this.life -= dt;
    }

    draw(ctx) {
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillStyle = this.color;
        ctx.font = 'bold 16px Arial';
        ctx.fillText(this.text, this.x, this.y);
        ctx.globalAlpha = 1.0;
    }
}
