// 使用LocalStorage保存数据
// const defaultData = {
//	"user": "Default0",
//	"semesterStart": "2025-2-16",
//	"timeTable": [[{}, {}, {}, {}, {}], [{}, {}, {}, {}, {}], [{}, {}, {}, {}, {}], [{}, {}, {}, {}, {}], [{}, {}, {}, {}, {}], [{}, {}, {}, {}, {}], [{}, {}, {}, {}, {}]]
//};

const defaultData = {
	"user": "Twisuki",
	"semesterStart": "2025-2-16",
	"timeTable": [
		[
			{},
			{},
			{},
			{},
			{}
		],
		[
			{
				"name": "普通物理AⅠ",
				"class": "综417",
				"week": "1-16"
			},
			{
				"name": "高等数学AⅡ",
				"class": "综504",
				"week": "1-16"
			},
			{
				"name": "体育Ⅱ",
				"class": "",
				"week": "1-16"
			},
			{},
			{}
		],
		[
			{
				"name": "计算与人工智能概论A",
				"class": "综B102",
				"week": "2-16"
			},
			{},
			{},
			{},
			{}
		],
		[
			{},
			{
				"name": "高等数学AⅡ",
				"class": "综504",
				"week": "1-16"
			},
			{
				"name": "计算与人工智能概论A",
				"class": "综215",
				"week": "10-16"
			},
			[
				{
					"name": "化学实验室安全科学",
					"class": "综113",
					"week": "3,7,11"
				},
				{
					"name": "计算与人工智能概论A",
					"class": "综B102",
					"week": "9"
				},
				{
					"name": "形势与政策Ⅱ",
					"class": "综101",
					"week": "13-14"
				}
			],
			{
				"name": "普通物理实验AⅠ",
				"class": "",
				"week": "2,4,6,8,10,12,14,16"
			}
		],
		[
			{},
			{
				"name": "普通物理AⅠ",
				"class": "综417",
				"week": "1-16"
			},
			{
				"name": "大学英语Ⅱ",
				"class": "研A209",
				"week": "1-16"
			},
			{
				"name": "中国近现代史纲要",
				"class": "研A403",
				"week": "1-16"
			},
			{}
		],
		[
			{
				"name": "高等数学AⅡ",
				"class": "综504",
				"week": "1-16"
			},
			[
				{
					"name": "人工智能导论",
					"class": "综115",
					"week": "1-7,9-16"
				},
				{
					"name": "人工智能导论",
					"class": "综115",
					"week": "8"
				}
			],
			{
				"name": "计算与人工智能概论A",
				"class": "综515",
				"week": "1-16"
			},
			{},
			{}
		],
		[
			{},
			{
				"name": "国家安全教育",
				"class": "综204",
				"week": "4,6"
			},
			{},
			{},
			{}
		]
	]
};

// 导出类
export class Data {
	constructor () {
		if (localStorage.getItem("LocalData") === null) {
			console.log("LocalData不存在, 初始化");
			localStorage.setItem("LocalData", JSON.stringify(defaultData));
		}
		this.data = JSON.parse(localStorage.getItem("LocalData"));
	}


	dataLoader () {
		return this.data;
	}

	dataEditor (newData) {
		if (newData !== undefined) {
			localStorage.setItem("LocalData", JSON.stringify(newData));
			console.log(`LocalData已设为${newData}`);
		} else {
			localStorage.setItem("LocalData", JSON.stringify(defaultData));
			console.log("LocalData已重置");
		}
		// 更新data
		this.data = JSON.parse(localStorage.getItem("LocalData"));
	}
};
