import {dataLoader} from "./data.js";

const config = await dataLoader();

// 登录个人门户
// async function login () {
// 	try {
// 		const portalResponse = await fetch('https://portal.hnu.edu.cn/', {
// 			method: "GET",
// 			credentials: "include",
// 			redirect: "follow"
// 		});
// 	} catch (error) {
// 		console.error("爬取过程中出错:", error);
// 		throw error;
// 	}
// }

console.log(await login(config.user, config.password));

async function login (username, password) {
	// 1. 获取登录页面，提取execution值
	const loginPage = await fetch('https://portal.hnu.edu.cn/');
	const html = await loginPage.text();
	const execution = extractExecution(html); // 需要实现提取函数

	// 2. 准备表单数据
	const formData = new URLSearchParams();
	formData.append('username', username);
	formData.append('password', password);
	formData.append('execution', execution);
	formData.append('_eventId', 'submit');

	// 3. 提交登录请求
	const response = await fetch('https://portal.hnu.edu.cn/cas/login?service=https%3A%2F%2Fpt.hnu.edu.cn%2F', {
		method: 'POST',
		body: formData,
		redirect: 'manual', // 手动处理重定向
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});

	// 4. 处理重定向
	if (response.status === 302) {
		const redirectUrl = response.headers.get('Location');
		await fetch(redirectUrl); // 跟随重定向
		return true; // 登录成功
	}

	return false; // 登录失败
}

// 辅助函数：从HTML中提取execution值
function extractExecution (html) {
	const doc = new DOMParser().parseFromString(html, 'text/html');
	const executionInput = doc.querySelector('input[name="execution"]');
	return executionInput ? executionInput.value : '';
}