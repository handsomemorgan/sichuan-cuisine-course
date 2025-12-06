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
        title: "非遗经典 · 麻婆豆腐",
        description: "麻、辣、烫、香、酥、嫩、鲜、活，八字箴言的完美演绎。",
        difficulty: "大师",
        time: "30分钟",
        calories: "350 kcal",
        image: "./assets/images/mapo-main.jpg",
        tags: ["麻辣", "豆腐", "非遗"],
        ingredients: [
            { name: "嫩豆腐", amount: "一块 (约400g)" },
            { name: "牛肉末", amount: "100g (酥香关键)" },
            { name: "青蒜苗", amount: "2根 (切马耳朵段)" },
            { name: "郫县豆瓣酱", amount: "一大勺 (剁细)" },
            { name: "豆豉", amount: "一小撮 (切碎)" },
            { name: "辣椒面", amount: "适量 (出色)" },
            { name: "花椒面", amount: "适量 (出锅撒)" },
            { name: "姜末/蒜末", amount: "各一勺" },
            { name: "水淀粉", amount: "分三次勾芡" },
            { name: "高汤/水", amount: "一碗" },
            { name: "生抽/老抽", amount: "少许" },
            { name: "白糖", amount: "少许" }
        ],
        steps: [
            {
                title: "豆腐预处理",
                content: "豆腐切成2厘米见方的方块。锅中烧水，加少许盐（去豆腥，紧致豆腐），水开后下豆腐焯水1分钟，捞出浸泡在温水中备用（防止粘连）。",
                image: "./assets/images/mapo-step-1.jpg"
            },
            {
                title: "炒制肉臊与底料",
                content: "起锅烧油（菜籽油+猪油混合更香），下牛肉末中小火煸炒，直至肉末酥香吐油（这是'酥'的关键）。下入豆瓣酱、豆豉、姜蒜末、辣椒面，炒出红油和香味。",
                image: "./assets/images/mapo-step-2.jpg"
            },
            {
                title: "烧烩入味",
                content: "加入高汤或清水，煮沸后调入生抽、少许白糖（提鲜）。轻轻滑入豆腐，转中小火烧制3-5分钟，让豆腐吸饱汤汁。注意全程只能用锅铲背推，或者晃动锅子，不可乱搅。",
                image: "./assets/images/mapo-step-3.jpg"
            },
            {
                title: "三次勾芡与成菜",
                content: "最为关键的'三芡'：第一次勾稀芡，让汤汁初步浓稠；第二次勾芡，收束水分；第三次勾芡，让芡汁紧紧包裹豆腐（亮油亮芡）。撒上一半蒜苗，推匀关火。装盘后撒上剩下的蒜苗和灵魂花椒面。",
                image: "./assets/images/mapo-step-4.jpg"
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
