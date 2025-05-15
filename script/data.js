// 使用LocalStorage保存数据
const defaultData = {
	"user": "Default0",
	"semesterStart": "2025-2-16",
	"timeTable": [[{}, {}, {}, {}, {}], [{}, {}, {}, {}, {}], [{}, {}, {}, {}, {}], [{}, {}, {}, {}, {}], [{}, {}, {}, {}, {}], [{}, {}, {}, {}, {}], [{}, {}, {}, {}, {}]]
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
			console.log(`LocalData已设为${JSON.stringify(newData)}`);
		} else {
			localStorage.setItem("LocalData", JSON.stringify(defaultData));
			console.log("LocalData已重置");
		}
		// 更新data
		this.data = JSON.parse(localStorage.getItem("LocalData"));
	}

	getDefaultData () {
		return defaultData;
	}
}
