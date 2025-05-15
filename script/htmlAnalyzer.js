import {Data} from "./data.js";

// 分析html并转换为课表data
export class HtmlAnalizer {
	constructor () {
		// 导入data
		const myData = new Data();
		this.config = myData.dataLoader();
	}

	// 录入数据
	analizer (text) {
		const parser = new DOMParser();
		const doc = parser.parseFromString(text, "text/html");

		// 初始化对象
		const table = doc.getElementsByClassName("el-table__body")[0];
		console.log(table);

		// 初始化课表
		const timeTable = [];
		for (let i = 0; i < 7; i++) {
			timeTable.push([]);
			for (let j = 0; j < 5; j++) {
				timeTable[i].push({});
			}
		}

		// 按行读取
		const htmlRows = table.getElementsByClassName("el-table__row");
		// 5行, 对应课节
		for (let i = 0; i < 5; i++) {
			const htmlRow = htmlRows[i];
			// el-table_1_column_10 周日, el-table_1_column_16 周六
			for (let j = 10; j <= 16; j++) {
				// 7列, 对应日期
				const htmlCell = htmlRow.getElementsByClassName(`el-table_1_column_${j}`)[0];
				const cell = htmlCell.getElementsByClassName("el-popover");

				if (cell.length === 0) {

				} else if (cell.length === 1) {
					const p = cell[0].getElementsByTagName("p");

					const className = p[0].innerHTML.replace("课程：", "");
					const classClass = p[1].innerHTML.replace("教室：", "");

					const regex = /周次：\s*([\d,\-]+)/;
					const match = p[3].innerHTML.match(regex);
					const classWeek = match[1];

					timeTable[j - 10][i] = {
						"name" : className,
						"class" : classClass,
						"week" : classWeek
					}
				}
			}
		}

		return {
			"user": "Twisuki",
			"semesterStart": "2025-2-16",
			"timeTable": timeTable
		};
	}
}