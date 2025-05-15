import {Data} from "./data.js";

// 分析html并转换为课表data
export class HtmlAnalizer {
	constructor () {
		// 导入data
		const myData = new Data();
		this.config = myData.dataLoader();
	}
}