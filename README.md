<br/>
<div style="text-align: center;">

「 无差别同人站（ALLCPP）增强脚本 」

[![Build](https://github.com/STEA-TEAM/allcpp-evolved/actions/workflows/main.yaml/badge.svg?event=push)](https://github.com/STEA-TEAM/allcpp-evolved/actions/workflows/main.yaml) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/STEA-TEAM/allcpp-evolved) ![GitHub all releases](https://img.shields.io/github/downloads/STEA-TEAM/allcpp-evolved/total)

</div>

[📦 安装](#安装)

[📚 功能](#功能)

[👻 兼容性](#兼容性)

[📝 开发](#开发)

# 安装

需要浏览器装有 [Tampermonkey](https://tampermonkey.net/) 或 [Violentmonkey](https://violentmonkey.github.io/) 插件,
下方表格中挑一个链接安装.

**注意事项**

- **⚠ 使用正式版 (GitHub 源) 须翻墙.**
- 对性能有影响.
- 默认不对未登录的状态做适配.
- 新版本一旦正式发布, 就不再对旧版本做任何技术支持.
- 使用外部网站的链接时 (如将下载任务发送到自己的服务器 / 使用链接安装组件等) 可能会提示"脚本试图访问跨域资源", 请选择"
  始终允许".
- 需要在至少 1400 x 800 以上的逻辑分辨率下使用.

| 正式版 (GhProxy 加速)                                                                                            | 正式版 (GitHub 源)                                                                          |
|-------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| [安装](https://ghproxy.com/https://github.com/STEA-TEAM/allcpp-evolved/releases/latest/download/main.user.js) | [安装](https://github.com/STEA-TEAM/allcpp-evolved/releases/latest/download/main.user.js) |

# 功能

脚本启用后, 在【活动购票】网页左侧会有功能面板。

![side_panel](.github/assets/images/side_panel.jpg)

# 兼容性

## 脚本管理器

### [Tampermonkey](https://tampermonkey.net/) / [Violentmonkey](https://violentmonkey.github.io/)

兼容, 但在较旧的浏览器中 Violentmonkey 可能无法运行此脚本.

### [Greasemonkey](https://www.greasespot.net/)

不兼容.

### [AdGuard](https://adguard.com/zh_cn/adguard-windows/overview.html)

未测试.

# 开发

### 克隆并安装依赖

```bash
git clone https://github.com/STEA-TEAM/allcpp-evolved.git
cd allcpp-evolved
pnpm install
```

### Dev（热更新）

```bash
pnpm run dev
# 在tampermonkey面板中新建一个脚本，将控制台输出的内容或`./dist/main.user.dev.js`的内容复制进去保存
# 代码热更新后刷新浏览器页面即可看到更改
```

### Build

```bash
pnpm run build
# 将`./dist/main.user.js`的内容发布即可
```
