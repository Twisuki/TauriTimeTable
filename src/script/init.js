import { dataLoader } from "./data.js";
const config = await dataLoader();

const WEEKNAME = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
const TIMERANGE = ["08:00 - 09:40", "10:00 - 11:40", "14:30 - 16:00", "16:10 - 17:40", "19:00 - 21:30"];
const today = new Date();

window.addEventListener("load", () => {
	initGreat();
	initTable();
	timeUpdate();
	setInterval(timeUpdate, 30000);
});

// 初始化问候语
function initGreat () {
	// 初始化问候语
	const p = document.getElementById("p-great");
	p.innerHTML =
		`<span id="p-user">${config.user}</span><span id="p-time">中午</span>好, 今天是<span id="p-date">2025.05.05 Mon.</span><br />当前课程: <span id="p-class">物理</span><span id="p-location">@综417</span>`;

	// 时间段
	const time = document.getElementById("p-time");
	const hour = today.getHours();
	if (hour < 3) {
		time.innerHTML = "晚上";
	} else if (hour < 10) {
		time.innerHTML = "上午";
	} else if (hour < 15) {
		time.innerHTML = "中午";
	} else if (hour < 18) {
		time.innerHTML = "下午";
	} else {
		time.innerHTML = "晚上";
	}

	// 日期
	const date = document.getElementById("p-date");
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const day = String(today.getDate()).padStart(2, '0');
	const weekday = WEEKNAME[today.getDay()];
	date.innerHTML = `${year}.${month}.${day} ${weekday}`;
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
	const sunday = new Date(today);
	sunday.setDate(today.getDate() - today.getDay());
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
			td.innerHTML = "物理<br />综417";
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}

// 更新时间
function timeUpdate () {
	// 更新表头第一格
	const timeDiv = document.getElementById("table-first");
	const hours = String(today.getHours()).padStart(2, '0');
	const minutes = String(today.getMinutes()).padStart(2, '0');
	timeDiv.innerHTML = `${hours}:${minutes}`;

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
		const cellIndex = getTimeRangeIndex() * 7 + today.getDay();
		document.getElementsByClassName("table-cell")[cellIndex].classList.add("cell-active");
	}
}

function getTimeRangeIndex () {
	const currentTime = today.getHours() * 60 + today.getMinutes();
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
