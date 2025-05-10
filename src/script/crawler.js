// import axios from "axios";

import {dataLoader} from "./data.js";

const config = await dataLoader();

const JWURL = "http://hdjw.hnu.edu.cn/Njw2017/index.html#/student";
const myDate = new Date();

async function getOriginTimeTable () {
	const originTimeTable = [
		[{}, {}, {}, {}, {}],
		[
			{"name": "普通物理AⅠ", "class": "综417", "week": "1-16"},
			{"name": "高等数学AⅡ", "class": "综504", "week": "1-16"},
			{"name": "体育Ⅱ", "class": "", "week": "1-16"},
			{},
			{}
		],
		[{"name": "计算与人工智能概论A", "class": "综B102", "week": "2-16"}, {}, {}, {}, {}],
		[
			{},
			{"name": "高等数学AⅡ", "class": "综504", "week": "1-16"},
			{"name": "计算与人工智能概论A", "class": "综215", "week": "10-16"},
			[
				{"name": "化学实验室安全科学", "class": "综113", "week": "3,7,11"},
				{"name": "计算与人工智能概论A", "class": "综B102", "week": "9"},
				{"name": "形势与政策Ⅱ", "class": "综101", "week": "13-14"}
			],
			{"name": "普通物理实验AⅠ", "class": "", "week": "2,4,6,8,10,12,14,16"}
		],
		[
			{},
			{"name": "普通物理AⅠ", "class": "综417", "week": "1-16"},
			{"name": "大学英语Ⅱ", "class": "研A209", "week": "1-16"},
			{"name": "中国近现代史纲要", "class": "研A403", "week": "1-16"},
			{}
		],
		[
			{"name": "高等数学AⅡ", "class": "综504", "week": "1-16"},
			[
				{"name": "人工智能导论", "class": "综115", "week": "1-7,9-16"},
				{"name": "人工智能导论", "class": "综115", "week": "8"}
			],
			{"name": "计算与人工智能概论A", "class": "综515", "week": "1-16"},
			{},
			{}
		],
		[
			{},
			{"name": "国家安全教育", "class": "综204", "week": "4,6"},
			{},
			{},
			{}
		]
	];

	return originTimeTable;
}

export async function getTimeTable () {
	const originTimeTable = await getOriginTimeTable();

	const semesterStart = new Date(config.semesterStart);
	const weekNum = (function () {
		const daysDiff = (myDate.getDate() - semesterStart) / (1000 * 60 * 60 * 24);
		return Math.abs(Math.floor(daysDiff / 7));
	})();

	console.log(weekNum);

	const timeTable = [
		[{}, {}, {}, {}, {}],
		[
			{"name": "普通物理AⅠ", "class": "综417"},
			{"name": "高等数学AⅡ", "class": "综504"},
			{"name": "体育Ⅱ", "class": ""},
			{},
			{}
		],
		[{"name": "计算与人工智能概论A", "class": "综B102"}, {}, {}, {}, {}],
		[
			{},
			{"name": "高等数学AⅡ", "class": "综504"},
			{"name": "计算与人工智能概论A", "class": "综215"},
			{},
			{"name": "普通物理实验AⅠ", "class": ""}
		],
		[
			{},
			{"name": "普通物理AⅠ", "class": "综417"},
			{"name": "大学英语Ⅱ", "class": "研A209"},
			{"name": "中国近现代史纲要", "class": "研A403"},
			{}
		],
		[
			{"name": "高等数学AⅡ", "class": "综504"},
			{"name": "人工智能导论", "class": "综115"},
			{"name": "计算与人工智能概论A", "class": "综515"},
			{},
			{}
		],
		[
			{},
			{},
			{},
			{},
			{}
		]
	];
	return timeTable;
}