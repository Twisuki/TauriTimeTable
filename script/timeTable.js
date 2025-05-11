import {dataLoader} from "./data.js";

const config = await dataLoader();

const myDate = new Date();

// 课表处理
export async function getTimeTable () {
	// 计算周数
	const semesterStart = new Date(config.semesterStart);
	const weekNum = (function () {
		const timeDiff = myDate.getTime() - semesterStart;
		const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
		return Math.abs(Math.floor(daysDiff / 7)) + 1;
	})();

	// 处理课表
	const originTimeTable = config.timeTable;
	const timeTable = [];

	for (const originDayList of originTimeTable) {
		const dayList = [];
		for (const originCell of originDayList) {
			// 按类别分析
			if (Array.isArray(originCell)) {
				// 数组, 分析周数
				let flag = false;
				for (const obj of originCell) {
					if (isThisWeek(obj.week, weekNum)) {
						const cell = {"name": obj.name, "class": obj.class};
						dayList.push(cell);
						flag = true;
						break;
					}
				}
				// 空对象占位
				if (! flag) {
					dayList.push({});
				}
			} else if (JSON.stringify(originCell) !== "{}") {
				// 课程对象且非空, 分析周数
				if (isThisWeek(originCell.week, weekNum)) {
					const cell = {"name": originCell.name, "class": originCell.class};
					dayList.push(cell);
				} else {
					dayList.push({});
				}
			} else {
				// 空对象
				dayList.push({});
			}
		}

		if (dayList.length === 5) {
			timeTable.push(dayList);
		} else {
			console.error("课程表解析错误! 课程大小: ", dayList.length);
		}
	}

	return timeTable;
}

// 处理周
function isThisWeek (week, weekNum) {
	// 去除空格
	const normalizedWeek = week.replace(/\s/g, "");

	// 逗号分割
	const conditions = normalizedWeek.split(",");

	// 逐个检查
	for (const condition of conditions) {
		if (condition.includes("-")) {
			// 范围处理
			const [start, end] = condition.split("-").map(Number);
			if (weekNum >= start && weekNum <= end) {
				return true;
			}
		} else {
			// 数字处理
			const num = Number(condition);
			if (weekNum === num) {
				return true;
			}
		}
	}

	return false;
}