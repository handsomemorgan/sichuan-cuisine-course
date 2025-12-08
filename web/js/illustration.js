
export function initIllustration(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- AI Art Generator -->
            <div class="bg-white p-6 rounded-xl shadow-lg">
                <h3 class="text-2xl font-serif font-bold mb-4 text-chuan-dark">AI 抽象艺术生成</h3>
                <div class="mb-4 space-y-4">
                    <div>
                        <label class="block text-sm font-bold text-gray-700">色彩饱和度</label>
                        <input type="range" id="saturation" min="0" max="100" value="80" class="w-full accent-chuan-red">
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-gray-700">线条复杂度</label>
                        <input type="range" id="complexity" min="10" max="100" value="50" class="w-full accent-chuan-red">
                    </div>
                    <button id="generate-btn" class="w-full bg-chuan-red text-white py-2 rounded-lg hover:bg-chuan-red-light transition">生成画作</button>
                </div>
                <canvas id="art-canvas" width="500" height="400" class="w-full h-auto bg-gray-100 rounded border border-gray-200"></canvas>
                <p class="text-xs text-gray-400 mt-2 text-center">基于伪随机算法模拟神经网络风格迁移</p>
            </div>

            <!-- Comic Viewer -->
            <div class="bg-white p-6 rounded-xl shadow-lg flex flex-col">
                <h3 class="text-2xl font-serif font-bold mb-4 text-chuan-dark">川菜历史漫画</h3>
                <div id="comic-container" class="flex-grow bg-stone-100 rounded-lg flex items-center justify-center relative overflow-hidden min-h-[300px]">
                    <div id="comic-content" class="text-center p-8">
                        <h4 class="text-xl font-bold mb-2" id="comic-title">第一章：辣椒传入中国</h4>
                        <p class="text-gray-600 mb-4" id="comic-desc">明朝末年，辣椒随着海运传入中国东南沿海...</p>
                        <div class="text-6xl mb-4">🌶️ 🚢 🇨🇳</div>
                    </div>
                    <button id="prev-comic" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white">&larr;</button>
                    <button id="next-comic" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white">&rarr;</button>
                </div>
                <div class="mt-4 flex justify-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-chuan-red"></span>
                    <span class="w-2 h-2 rounded-full bg-gray-300"></span>
                    <span class="w-2 h-2 rounded-full bg-gray-300"></span>
                </div>
            </div>
        </div>
    `;

    // AI Art Logic
    const canvas = container.querySelector('#art-canvas');
    const ctx = canvas.getContext('2d');
    const btn = container.querySelector('#generate-btn');
    const satInput = container.querySelector('#saturation');
    const compInput = container.querySelector('#complexity');

    function generateArt() {
        const saturation = satInput.value;
        const complexity = compInput.value;
        
        // Clear
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Background wash
        for (let i = 0; i < 5; i++) {
            ctx.fillStyle = `hsla(${Math.random() * 360}, ${saturation}%, 80%, 0.2)`;
            ctx.beginPath();
            ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 200 + 50, 0, Math.PI * 2);
            ctx.fill();
        }

        // Lines
        const count = complexity * 2;
        for (let i = 0; i < count; i++) {
            ctx.strokeStyle = `hsla(${Math.random() * 60}, ${saturation}%, 50%, 0.6)`; // Warm colors
            ctx.lineWidth = Math.random() * 3;
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.bezierCurveTo(
                Math.random() * canvas.width, Math.random() * canvas.height,
                Math.random() * canvas.width, Math.random() * canvas.height,
                Math.random() * canvas.width, Math.random() * canvas.height
            );
            ctx.stroke();
        }
    }

    btn.addEventListener('click', generateArt);
    generateArt(); // Initial run

    // Comic Logic
    const comicData = [
        { title: "第一章：辣椒传入", desc: "明朝末年，辣椒随着海运传入中国东南沿海，初作观赏植物。", icon: "🌶️ 🚢" },
        { title: "第二章：入川", desc: "清初'湖广填四川'移民大迁徙，将辣椒带入四川盆地。", icon: "🚶‍♂️ ⛰️" },
        { title: "第三章：融合", desc: "四川潮湿气候与辣椒驱寒特性一拍即合，麻辣味型诞生。", icon: "🔥 🍲" }
    ];
    let currentComic = 0;
    const titleEl = container.querySelector('#comic-title');
    const descEl = container.querySelector('#comic-desc');
    const contentEl = container.querySelector('#comic-content div');

    function updateComic() {
        const data = comicData[currentComic];
        titleEl.textContent = data.title;
        descEl.textContent = data.desc;
        contentEl.textContent = data.icon;
    }

    container.querySelector('#prev-comic').addEventListener('click', () => {
        if (currentComic > 0) {
            currentComic--;
            updateComic();
        }
    });

    container.querySelector('#next-comic').addEventListener('click', () => {
        if (currentComic < comicData.length - 1) {
            currentComic++;
            updateComic();
        }
    });
}
