// 使用LocalStorage保存数据
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

var data = {};
if (localStorage.getItem("LocalData") !== null) {
	data = JSON.parse(localStorage.getItem("LocalData"));
} else {
	console.log("LocalData不存在, 初始化");
	localStorage.setItem("LocalData", JSON.stringify(defaultData));
}

function dataLoader () {
	return data;
}

function dataEditor (newData) {
	if (newData !== undefined) {
		localStorage.setItem("LocalData", JSON.stringify(newData));
		console.log(`LocalData已设为{newData}`);
	} else {
		localStorage.setItem("LocalData", JSON.stringify(defaultData));
		console.log("LocalData已重置");
	}
	// 更新data
	data = JSON.parse(localStorage.getItem("LocalData"));
}
