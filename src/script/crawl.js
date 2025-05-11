import {invoke} from '@tauri-apps/api/tauri';

const config = await dataLoader();

async function login (username, password) {
	try {
		// 使用 Tauri 后端请求
		const result = await invoke('hnu_login', {
			username,
			password
		});

		if (result.success) {
			console.log("登录成功");
			return await fetchTimetable();
		} else {
			console.error("登录失败:", result.message);
			return null;
		}
	} catch (error) {
		console.error("请求出错:", error);
		throw error;
	}
}

async function fetchTimetable () {
	try {
		const timetable = await invoke('fetch_timetable');
		return timetable;
	} catch (error) {
		console.error("获取课程表失败:", error);
		throw error;
	}
}

// 使用示例
console.log(await login(config.user, config.password));