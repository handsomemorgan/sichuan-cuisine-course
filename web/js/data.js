export const recipes = [
    {
        id: 1,
        title: "地道川菜 · 水煮肉片",
        description: "麻辣鲜香，肉片滑嫩，川菜中的经典之作。",
        difficulty: "专业",
        time: "45分钟",
        calories: "500 kcal",
        image: "./assets/images/shuizhu-main.jpg",
        tags: ["麻辣", "肉类", "经典"],
        ingredients: [
            { name: "猪里脊 (牛里脊)", amount: "半斤切片" },
            { name: "莴笋", amount: "一根去皮切片" },
            { name: "豆芽", amount: "适量 (5角钱左右)" },
            { name: "大蒜", amount: "1个，切成蒜末" },
            { name: "大葱", amount: "小把，切斜片" },
            { name: "小葱", amount: "一小把，切葱花" },
            { name: "生姜", amount: "一个" },
            { name: "鸡蛋", amount: "一个" },
            { name: "干辣椒", amount: "适量" },
            { name: "花椒", amount: "适量" },
            { name: "淀粉", amount: "适量" },
            { name: "郫县豆瓣酱", amount: "适量" },
            { name: "火锅底料", amount: "可选" },
            { name: "食用油", amount: "优选菜籽油" },
            { name: "生抽", amount: "适量" }
        ],
        steps: [
            {
                title: "备料",
                content: "将所有食材清洗干净，改刀备用。肉片切薄片，蔬菜切段。",
                image: "./assets/images/shuizhu-step-1-prep.jpg"
            },
            {
                title: "腌肉",
                content: "配方：一个蛋清，葱姜水，生抽一勺，淀粉三勺。\n做法：加生抽，加葱姜水，少量多次，码转，用手抓至上劲有粘性，做出来才嫩滑。加一个鸡蛋清，滑上加滑，嫩上加嫩。再加两勺红薯粉（和成粉浆更好，湿粉更好吸收），码匀，发粘就对了。",
                image: "./assets/images/custom-5-step-2.jpg"
            },
            {
                title: "灵魂制作——刀口辣椒",
                content: "50克干辣椒，去根，辣椒籽要留着；12克花椒粒，越想越好；微油、开小火，慢慢煸出香味。千万不能炒糊炒黑，要不然会发苦；放凉一点，用刀切碎，不用太细。",
                image: "./assets/images/custom-2-step-3.jpg"
            },
            {
                title: "炒制底菜",
                content: "起锅加菜籽油，花椒，干辣椒，蒜末，下莴笋等配菜，加点盐，味精（选），翻炒几下至断生，装盘垫底。",
                image: "./assets/images/custom-1-step-4.jpg"
            },
            {
                title: "烹煮肉片",
                content: "另起锅加菜籽油，下青红花椒，豆瓣酱，姜蒜末爆香，加入刀口辣椒面，炒出红油，加水，加入少许胡椒粉（选），一小勺白糖提鲜，大火烧开。打去浮沫，关小火下入腌好的肉片，分散地下肉，先不要搅，等肉片锁粉，防止脱浆；开大火煮30秒即可，装盘。如果想勾个芡，可以先把肉盛出来，然后在煮沸汤汁中加入少许淀粉浆，成自然芡即可，淋入碗中。",
                image: "./assets/images/custom-4-step-5.jpg"
            },
            {
                title: "泼油成菜",
                content: "在表面依次放刀口辣椒、蒜末、少量葱花（增加美观，但不要加多了抢位）。起锅烧油，六七成热，微微冒烟就可以，三泼热油：一泼出麻，二泼出辣，三泼水煮肉片大功告成！",
                image: "./assets/images/custom-3-step-6.jpg"
            }
        ]
    },
    {
        id: 2,
        title: "麻婆豆腐",
        description: "麻、辣、烫、香、酥、嫩、鲜、活，八字箴言。",
        difficulty: "家常",
        time: "30分钟",
        calories: "300 kcal",
        image: "./assets/images/mapo-main.jpg",
        tags: ["麻辣", "豆腐", "下饭"],
        ingredients: [],
        steps: [
            {
                title: "炒制底料",
                content: "锅中放油，下入牛肉末炒酥，加入豆瓣酱炒出红油。",
                image: "./assets/images/step-fry.jpg"
            },
            {
                title: "炖煮豆腐",
                content: "加入高汤或水，放入豆腐块，中小火慢炖入味。",
                image: "./assets/images/step-tofu.jpg"
            }
        ]
    }
];

export const creativeContent = [
    {
        id: 1,
        title: "如果川菜是超级英雄",
        type: "illustration",
        image: "./assets/images/shuizhu-main.jpg",
        desc: "火锅侠 vs 串串怪"
    },
    {
        id: 2,
        title: "辣椒大冒险",
        type: "game",
        image: "./assets/images/mapo-main.jpg",
        desc: "帮助小辣椒躲避牛奶的追击！"
    }
];
