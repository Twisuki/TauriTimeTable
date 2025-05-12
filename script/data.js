// 使用LocalStorage保存数据
var data = {};
if (localStorage.getItem("LocalData") !== null) {
	data = JSON.parse(localStorage.getItem("LocalData"));
} else {
	const defaultData = {
		"user": "Default0",
		"semesterStart": "2025-2-16",
		"timeTable": [
			[{}, {}, {}, {}, {}],
			[{}, {}, {}, {}, {}],
			[{}, {}, {}, {}, {}],
			[{}, {}, {}, {}, {}],
			[{}, {}, {}, {}, {}],
			[{}, {}, {}, {}, {}],
			[{}, {}, {}, {}, {}]
		]
	};
	console.log("LocalData不存在, 初始化");
	localStorage.setItem("LocalData", JSON.stringify(defaultData));
}

export function dataLoader () {
	return data;
}

export function dataEdit (newData) {
	localStorage.setItem("LocalData", JSON.stringify(newData));
	console.log(`LocalData以设为{newData}`);
	data = JSON.parse(localStorage.getItem("LocalData"));
}
