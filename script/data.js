export async function dataLoader () {
	try {
		const response = await fetch("../config/config.json");
		return response.json();
	} catch (error) {
		console.error("配置加载失败: ", error);
		return null;
	}
}

