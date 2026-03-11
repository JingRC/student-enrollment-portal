# Student Enrollment Portal

一个基于 HTML、CSS、JavaScript 实现的学生注册页面，适合作为静态网站展示项目部署到 GitHub Pages。

## 项目特点

- 双栏布局，左侧展示品牌介绍、实时档案卡和校园风采轮播
- 右侧表单支持姓名、性别、学号、联系电话、邮箱、出生日期、院系、专业、班级、密码、头像上传等信息录入
- 实时档案卡支持姓名、年龄、邮箱、电话等同步预览
- 支持密码强度检测、确认密码校验、填写进度条、本地草稿保存与恢复
- 支持校园图片自动轮播与手动切换

## 本地运行

直接在浏览器中打开 [index.html](index.html) 即可。

## GitHub Pages 部署

1. 创建一个 GitHub 仓库，例如 `student-enrollment-portal`
2. 将本项目文件推送到 `main` 分支
3. 在仓库 `Settings > Pages` 中选择：
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
4. 保存后等待 GitHub Pages 构建完成

## 项目文件

- [index.html](index.html): 页面结构
- [styles.css](styles.css): 页面样式与动画效果
- [script.js](script.js): 表单交互、预览同步、轮播与本地草稿逻辑
