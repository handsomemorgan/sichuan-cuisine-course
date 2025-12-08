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
                content: "50克干辣椒，去根，辣椒籽要留着；12克花椒粒，越香越好；微油、开小火，慢慢煸出香味。千万不能炒糊炒黑，要不然会发苦；放凉一点，用刀切碎，不用太细。",
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
            { name: "豆腐", amount: "一块 (400g)" },
            { name: "牛肉末", amount: "50g" },
            { name: "豆瓣酱", amount: "30g" },
            { name: "豆豉", amount: "20g" },
            { name: "盐", amount: "2g" },
            { name: "鸡粉", amount: "2g" },
            { name: "酱油", amount: "15g" },
            { name: "黄酒", amount: "10g" },
            { name: "大蒜末", amount: "20g" },
            { name: "肉汤", amount: "300ml" },
            { name: "水淀粉", amount: "适量" },
            { name: "花生油", amount: "30g" },
            { name: "青蒜末", amount: "30g" },
            { name: "花椒面", amount: "1g" },
            { name: "香菜末", amount: "5g" }
        ],
        steps: [
            {
                title: "备料",
                content: "主料；豆腐一块400克、牛肉末50克；调料：豆瓣酱30克、豆豉20克、盐2克、鸡粉2克、酱油15克、黄酒10克、大蒜末20克、肉汤300ml、水淀粉适量、花生油30克；配料：青蒜末30克、花椒面1克、香菜末5克。",
                image: "./assets/images/mapo-real-step-1.jpg"
            },
            {
                title: "改刀",
                content: "先把豆腐切成2厘米见方的丁。",
                image: "./assets/images/mapo-real-step-2.jpg"
            },
            {
                title: "加盐",
                content: "在清水里放少许盐。",
                image: "./assets/images/mapo-real-step-3.jpg"
            },
            {
                title: "焯水准备",
                content: "把切好的豆腐在水中。",
                image: "./assets/images/mapo-real-step-4.jpg"
            },
            {
                title: "浸泡",
                content: "浸泡15分钟。",
                image: "./assets/images/mapo-real-step-5.jpg"
            },
            {
                title: "沥水",
                content: "然后捞出备用。",
                image: "./assets/images/mapo-real-step-6.jpg"
            },
            {
                title: "炒肉末",
                content: "炒勺上火烧热，注入适量花生油便炒肉末。",
                image: "./assets/images/mapo-real-step-7.jpg"
            },
            {
                title: "下豆瓣酱",
                content: "肉末变色后下入郫县豆瓣酱煸炒",
                image: "./assets/images/mapo-real-step-8.jpg"
            },
            {
                title: "下豆豉",
                content: "煸炒出香味后下入豆豉煸炒",
                image: "./assets/images/mapo-real-step-9.jpg"
            },
            {
                title: "下蒜末",
                content: "把豆豉煸炒出香味后，下入蒜末煸炒。",
                image: "./assets/images/mapo-real-step-10.jpg"
            },
            {
                title: "烹酒",
                content: "然后烹入黄酒炒匀。",
                image: "./assets/images/mapo-real-step-11.jpg"
            },
            {
                title: "加汤",
                content: "炒香以上材料后倒入肉汤煮开。",
                image: "./assets/images/mapo-real-step-12.jpg"
            },
            {
                title: "调味",
                content: "然后放入适量的酱油。",
                image: "./assets/images/mapo-real-step-13.jpg"
            },
            {
                title: "加盐",
                content: "用盐调味。",
                image: "./assets/images/mapo-real-step-14.jpg"
            },
            {
                title: "下豆腐",
                content: "然后下入豆腐煮开。",
                image: "./assets/images/mapo-real-step-15.jpg"
            },
            {
                title: "煮制",
                content: "豆腐煮大约3-5分钟。",
                image: "./assets/images/mapo-real-step-16.jpg"
            },
            {
                title: "提鲜",
                content: "然后放入少许鸡粉提鲜。",
                image: "./assets/images/mapo-real-step-17.jpg"
            },
            {
                title: "勾芡",
                content: "用水淀粉勾芡。",
                image: "./assets/images/mapo-real-step-18.jpg"
            },
            {
                title: "晃锅",
                content: "此时要边摇锅边用手勺推动锅底，使豆腐不至糊锅，当淀粉彻底糊化后便可出锅码盘。",
                image: "./assets/images/mapo-real-step-19.jpg"
            },
            {
                title: "撒花椒面",
                content: "装盘以后趁热均匀的撒上一层花椒面。",
                image: "./assets/images/mapo-real-step-20.jpg"
            },
            {
                title: "点缀",
                content: "然后，撒上青蒜末和少许香菜末，假如不喜香菜可不放。此菜至此便告全部操作完成。",
                image: "./assets/images/mapo-real-step-21.jpg"
            }
        ]
    }
];

export const creativeContent = [
    {
        id: 'illustration',
        title: "AI 创意工坊",
        type: "illustration",
        image: "./assets/images/shuizhu-main.jpg",
        desc: "生成你的专属川菜抽象画作 & 探索川菜历史漫画"
    },
    {
        id: 'game',
        title: "辣椒大冒险",
        type: "game",
        image: "./assets/images/mapo-main.jpg",
        desc: "PVE 攻防战：保卫火锅底料！"
    }
];
