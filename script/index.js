const config = dataLoader();
const timeTable = getTimeTable();

const WEEKNAME = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
const TIMERANGE = ["08:00 - 09:40", "10:00 - 11:40", "14:30 - 16:00", "16:10 - 17:40", "19:00 - 21:30"];
const myDate = new Date();

let isInitialized = false;

// 检测 + 侦听, 防止await占用过长时间
if (document.readyState === "complete" || document.readyState === "interactive") {
	init();
} else {
	window.addEventListener("load", init);
}

// 初始化函数
function init () {
	if (!isInitialized) {
		isInitialized = true;

		initGreat();
		initTable();
		timeUpdate();
		setInterval(timeUpdate, 30000);
	}
}

// 初始化问候语
function initGreat () {
	// 初始化问候语
	var pTime, pDate, pClass, pLocation;

	// 时间段
	const hour = myDate.getHours();
	if (hour < 3) {
		pTime = "晚上";
	} else if (hour < 10) {
		pTime = "上午";
	} else if (hour < 15) {
		pTime = "中午";
	} else if (hour < 18) {
		pTime = "下午";
	} else {
		pTime = "晚上";
	}

	// 日期
	const year = myDate.getFullYear();
	const month = String(myDate.getMonth() + 1).padStart(2, '0');
	const day = String(myDate.getDate()).padStart(2, '0');
	const weekday = WEEKNAME[myDate.getDay()];
	pDate = `${year}.${month}.${day} ${weekday}`;

	// 课程
	if (getTimeRangeIndex() !== -1) {
		const obj = timeTable[myDate.getDay()][getTimeRangeIndex()];
		if (JSON.stringify(obj) !== "{}") {
			pClass = obj.name;
			pLocation = obj.class;
		} else {
			pClass = "现在无课";
			pLocation = ""
		}
	} else {
		pClass = "现在无课";
		pLocation = ""
	}


	// 写入
	const p = document.getElementById("p-great");
	p.innerHTML = `${config.user}${pTime}好, 今天是${pDate}<br />当前课程: ${pClass}<span>${pLocation}</span>`;
}

// 初始化表格
function initTable () {
	// 初始化表格
	const table = document.getElementById("table");
	table.innerHTML = "";

	// 创建表头
	const thead = document.createElement("tr");
	thead.id = "table-th";

	// 表头第一格
	const tableFirst = document.createElement("th");
	tableFirst.id = "table-first";
	thead.appendChild(tableFirst);

	// 一周日期
	const days = [];
	const sunday = new Date(myDate);
	sunday.setDate(myDate.getDate() - myDate.getDay());
	for (let i = 0; i < 7; i++) {
		const date = new Date(sunday);
		date.setDate(sunday.getDate() + i);

		const th = document.createElement("th");
		th.classList.add("table-day");
		th.innerHTML = `${date.getDate()} <br /> ${WEEKNAME[i]}`;
		thead.appendChild(th);
	}

	table.appendChild(thead);

	// 创建表体
	for (let i = 0; i < 5; i++) {
		const tr = document.createElement("tr");
		tr.classList.add("table-tr");

		// 表体第一栏
		const tableTime = document.createElement("td");
		tableTime.classList.add("table-time");
		tableTime.innerHTML = `${TIMERANGE[i]}`;
		tr.appendChild(tableTime);

		// 主表格
		for (let j = 0; j < 7; j++) {
			const td = document.createElement("td");
			td.classList.add("table-cell");
			// td.innerHTML = "物理<br />综417";
			const obj = timeTable[j][i];
			if (JSON.stringify(obj) !== "{}") {
				td.innerHTML = `${obj.name}<br /><span>${obj.class}</span>`;
			}
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}

// 更新时间
function timeUpdate () {
	// 更新表头第一格
	const timeDiv = document.getElementById("table-first");
	const hours = String(myDate.getHours()).padStart(2, '0');
	const minutes = String(myDate.getMinutes()).padStart(2, '0');

	const semesterStart = new Date(config.semesterStart);
	const weekNum = (function () {
		const timeDiff = myDate.getTime() - semesterStart;
		const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
		return Math.abs(Math.floor(daysDiff / 7)) + 1;
	})();

	timeDiv.innerHTML = `${hours}:${minutes}<br/>第${weekNum}周`;

	// 暴力更新问候语
	initGreat();

	// 更新标记位置
	onClass();
}

// 表格标记
function onClass () {
	// 清空已有时间段
	for (const td of document.getElementsByClassName("table-cell")) {
		td.classList.remove("cell-active");
	}

	// 时间段划分
	if (getTimeRangeIndex() !== -1) {
		const cellIndex = getTimeRangeIndex() * 7 + myDate.getDay();
		document.getElementsByClassName("table-cell")[cellIndex].classList.add("cell-active");
	}
}

// 获取时间段
function getTimeRangeIndex () {
	const currentTime = myDate.getHours() * 60 + myDate.getMinutes();
	for (let i = 0; i < TIMERANGE.length; i++) {
		const [start, end] = TIMERANGE[i].split(" - ");
		const [startHour, startMinute] = start.split(":").map(Number);
		const [endHour, endMinute] = end.split(":").map(Number);

		const startTime = startHour * 60 + startMinute;
		const endTime = endHour * 60 + endMinute;

		if (currentTime >= startTime && currentTime <= endTime) {
			return i;
		}
	}
	return -1;
}


// 编辑
document.getElementById("data-edit").addEventListener("click", () => {
	console.log("编辑");
	// 展示修改框
	document.getElementById("p-great").classList.add("hide");
	document.getElementById("table").classList.add("hide");
	document.getElementById("data-control").classList.add("hide");
	document.getElementById("data-input").classList.remove("hide");

	// 确认
	document.getElementById("data-input-confirm").addEventListener("click", () => {
		// 读取textarea
		const textarea = document.getElementById("data-area");
		const text = textarea.value;

		// 编辑
		try {
			dataEditor(JSON.parse(text));
		} catch (e) {
			console.error(e);
		}

		location.reload();
	});

	// 取消
	document.getElementById("data-input-cancel").addEventListener("click", () => {
		document.getElementById("p-great").classList.remove("hide");
		document.getElementById("table").classList.remove("hide");
		document.getElementById("data-control").classList.remove("hide");
		document.getElementById("data-input").classList.add("hide");
	});
});

// 重置
document.getElementById("data-reset").addEventListener("click", () => {
	console.log("重置");
	dataEditor();
	location.reload();
});