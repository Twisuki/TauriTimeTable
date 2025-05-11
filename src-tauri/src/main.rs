// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use reqwest::Client;
use tauri::command;
use std::fs;
use scraper::{Html, Selector};

// 数据结构定义
#[derive(Debug, Serialize, Deserialize)]
struct LoginResult {
    success: bool,
    message: Option<String>,
}

#[derive(Debug, Deserialize)]
struct LoginParams {
    username: String,
    password: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Config {
    user: String,
    password: String,
}

// 命令：加载配置文件
#[command]
fn data_loader() -> Result<Config, String> {
    let config_path = std::path::Path::new("config.json");

    let contents = fs::read_to_string(config_path)
        .map_err(|e| format!("文件读取错误: {}", e))?;

    serde_json::from_str(&contents)
        .map_err(|e| format!("JSON 解析错误: {}", e))
}

// 命令：湖南大学登录
#[command]
async fn hnu_login(params: LoginParams) -> Result<LoginResult, String> {
    let client = Client::builder()
        .cookie_store(true)
        .redirect(reqwest::redirect::Policy::none())
        .build()
        .map_err(|e| e.to_string())?;

    // 1. 获取登录页面
    let login_page = client.get("https://portal.hnu.edu.cn/")
        .send()
        .await
        .map_err(|e| format!("请求登录页失败: {}", e))?;

    let html = login_page.text()
        .await
        .map_err(|e| format!("读取响应内容失败: {}", e))?;

    let execution = extract_execution(&html)
        .ok_or("无法提取execution参数".to_string())?;

    // 2. 提交登录表单
    let login_response = client.post("https://portal.hnu.edu.cn/cas/login?service=https%3A%2F%2Fpt.hnu.edu.cn%2F")
        .form(&[
            ("username", params.username),
            ("password", params.password),
            ("execution", execution),
            ("_eventId", "submit".to_string()),
        ])
        .send()
        .await
        .map_err(|e| format!("提交登录表单失败: {}", e))?;

    // 3. 检查登录结果
    if login_response.status().is_redirection() {
        if let Some(location) = login_response.headers().get("Location") {
            let location = location.to_str().map_err(|e| e.to_string())?;
            let _ = client.get(location).send().await.map_err(|e| e.to_string())?;
            return Ok(LoginResult {
                success: true,
                message: None,
            });
        }
    }

    Ok(LoginResult {
        success: false,
        message: Some("登录失败，请检查用户名和密码".to_string()),
    })
}

// 命令：获取课程表
#[command]
async fn fetch_timetable() -> Result<String, String> {
    let client = Client::builder()
        .cookie_store(true)
        .build()
        .map_err(|e| e.to_string())?;

    // 这里替换为实际的课程表URL
    let response = client.get("https://portal.hnu.edu.cn/timetable-url")
        .send()
        .await
        .map_err(|e| format!("请求课程表失败: {}", e))?;

    let html = response.text()
        .await
        .map_err(|e| format!("读取课程表内容失败: {}", e))?;

    // 这里应该添加HTML解析逻辑，提取课程表信息
    // 暂时返回原始HTML作为示例
    Ok(html)
}

// 辅助函数：从HTML提取execution参数
fn extract_execution(html: &str) -> Option<String> {
    let document = Html::parse_document(html);
    let selector = Selector::parse("input[name='execution']").ok()?;
    document.select(&selector).next()?.value().attr("value").map(|s| s.to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            data_loader,
            hnu_login,
            fetch_timetable
        ])
        .run(tauri::generate_context!())
        .expect("运行Tauri应用时出错");
}