# AOS Modern

[English](./README.md) | [简体中文](./README.zh-CN.md)

---

# AOS - 页面滚动动画库 (Animate on Scroll)

[![AOS - Animate on scroll library](https://gabulaideu.github.io/aos/logo.svg)](https://gabulaideu.github.io/aos/)

[![NPM version](https://img.shields.io/npm/v/aos-modern.svg?style=flat)](https://www.npmjs.com/package/aos-modern)
[![NPM downloads](https://img.shields.io/npm/dm/aos-modern.svg?style=flat)](https://www.npmjs.com/package/aos-modern)

一个用于在页面滚动时为元素添加动画的超轻量库。

类似于 WOWJS，动画效果也很接近。但我有不同的思路来构建这个库，于是重写了这个由 CSS3 驱动的页面滚动动画库。

AOS 支持在向下和向上滚动时，为元素应用动画。
如果您向上滚动，元素会恢复到动画前的初始状态，当您再次向下滚动时会重新触发动画。

👉 想深入了解工作原理？请阅读我在 CSS-Tricks 上的文章：[AOS - CSS 驱动的滚动动画库](https://css-tricks.com/aos-css-driven-scroll-animation-library/)。

---

### 🚀 [在线 Demo](https://gabulaideu.github.io/aos/)

---

## ❗ 注意事项

从 `2.0.0` 版本开始，原先的 `aos` 属性已被废弃，请务必使用标准 HTML5 的 `data-aos`。

## ⚙ 安装与设置

### 安装 AOS

- 使用 `npm` 或 `yarn`

  ```bash
    npm install aos-modern --save
    # 或者
    yarn add aos-modern
  ```

- 直接下载压缩包 -> [点击下载](https://github.com/gabulaideu/aos/archive/master.zip)

### 引入样式表

- **CDN**:
  ```html
  <link rel="stylesheet" href="https://unpkg.com/aos-modern@latest/dist/aos.css" />
  ```
- **本地引入 (node_modules)**:
  ```html
  <link rel="stylesheet" href="node_modules/aos-modern/dist/aos.css" />
  ```

### 引入脚本

- **CDN**:
  ```html
  <script src="https://unpkg.com/aos-modern@latest/dist/aos.js"></script>
  ```
- **本地引入 (node_modules)**:
  ```html
  <script src="node_modules/aos-modern/dist/aos.js"></script>
  ```

AOS 兼容 UMD 模块规范，因此您可以通过 AMD、CommonJS 模块导入，或以全局变量、Node 模块以及 ES6 模块的形式进行使用。

### 初始化 AOS

```html
<script>
  AOS.init();
</script>
```

## 🤔 如何使用？

### 基础用法

只需在 HTML 元素上添加 `data-aos` 属性即可：

```html
<div data-aos="动画名称"></div>
```

当您滚动到该元素时，脚本就会自动触发该元素的“动画名称”动画。

[向下滚动](https://github.com/gabulaideu/aos#-animations) 即可查看当前所有可用的预设动画列表 :)

### 🔥 高级设置

这些属性可以单独配置在特定元素上，也可以在初始化脚本时配置在全局默认对象中（在配置项对象中不需要加上 `data-` 前缀）。

| 属性                          | 说明                                                                   | 示例值       | 默认值     |
| ----------------------------- | ---------------------------------------------------------------------- | ------------ | ---------- |
| _`data-aos-offset`_           | 更改动画触发的偏移量，单位像素 (px)                                    | 200          | 120        |
| _`data-aos-duration`_         | 动画的持续时间，单位毫秒 (ms)                                          | 600          | 400        |
| _`data-aos-easing`_           | 选择不同的 CSS3 缓动函数                                               | ease-in-sine | ease       |
| _`data-aos-delay`_            | 延迟触发动画的时间，单位毫秒 (ms)                                      | 300          | 0          |
| _`data-aos-anchor`_           | 锚点元素。指定另一个元素的偏移来触发当前元素的动画，而不是使用自身偏移 | #selector    | null       |
| _`data-aos-anchor-placement`_ | 锚点位置。指定当元素在屏幕什么位置时触发动画                           | top-center   | top-bottom |
| _`data-aos-once`_             | 动画是否仅触发一次，还是在每次滚动页面时重复触发                       | true         | false      |

\*`duration` 仅支持从 50 到 3000 的值，步长为 50ms。因为动画是由 CSS 控制的，为限制生成的 CSS 体积才做此范围约束。

如果您需要更多时间档位，可以在页面中自定义 CSS，例如：

```css
body[data-aos-duration="4000"] [data-aos],
[data-aos][data-aos][data-aos-duration="4000"] {
  transition-duration: 4000ms;
}
```

这会在全局以及单体配置上增加 4000ms 的动画时间档位。
双重写法 `[data-aos][data-aos]` 是一个 CSS 权重技巧，可确保单体设置在不使用 `!important` 的情况下能覆盖全局设置。

`data-aos-anchor-placement` - 原理非常简单，例如 `top-center` 代表：当元素的**顶部**到达窗口的**中部**时触发动画。
`bottom-top` 代表：当元素的**底部**到达窗口的**顶部**时触发动画，以此类推。

#### 示例代码：

```html
<div
  data-aos="fade-zoom-in"
  data-aos-offset="200"
  data-aos-easing="ease-in-sine"
  data-aos-duration="600"
></div>
```

```html
<div
  data-aos="flip-left"
  data-aos-delay="100"
  data-aos-anchor=".example-selector"
></div>
```

```html
<div data-aos="fade-up" data-aos-anchor-placement="top-center"></div>
```

#### API 接口

AOS 作为一个全局变量暴露在 window 下，当前提供四个方法：

- `init` - 初始化 AOS
- `refresh` - 重新计算所有元素的偏移和位置（例如在窗口大小改变时）
- `refreshHard` - 重新装载符合条件的 `data-aos` 元素并触发 `refresh`（在异步添加/移出 DOM 时调用）
- `destroy` - 清理并解绑所有的滚动观察器、DOM 监听器以及事件监听（特别适用于 SPA 应用路由/生命周期销毁）

使用方法示例：

```javascript
AOS.refresh();
```

默认情况下，AOS 会使用 `MutationObserver` 自动侦测 DOM 的变动。如果有新元素异步加载或被移除，它会自动触发 `refreshHard()`。在不支持 `MutationObserver` 的旧浏览器中，您可能需要手动调用该方法。

`refresh` 用于处理窗口大小调整（Resize）等日常事件，该方法不会扫描 DOM 查找新元素，因而运行速度极快、开销极低。

### 全局配置

如果您不想为每个元素单独设置动画属性，可以将其配置为全局默认设置：

```javascript
  <script>
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    });
  </script>
```

#### 附加选项

以下选项只能在调用 `AOS.init({...})` 时传入配置对象中：

| 选项名称       | 说明                    | 示例值      | 默认值             |
| -------------- | ----------------------- | ----------- | ------------------ |
| _`disable`_    | 禁用 AOS 的判定条件     | 'mobile'    | false              |
| _`startEvent`_ | 初始化 AOS 的文档事件名 | 'someEvent' | 'DOMContentLoaded' |

##### 禁用 AOS (disable)

如果您希望在特定设备或条件下禁用动画，可以传入 `disable` 属性：

```javascript
AOS.init({
  disable: "mobile",
});
```

AOS 支持预设的三种设备名称：`mobile`（包含手机和平板）、`phone`（仅限手机）或 `tablet`（仅限平板）。

此外，您还可以传入自定义判定式：

```javascript
disable: window.innerWidth < 1024;
```

或者传入一个返回布尔值的 `function`：

```javascript
  disable: function () {
    var maxWidth = 1024;
    return window.innerWidth < maxWidth;
  }
```

##### 启动事件 (startEvent)

如果不希望在 `DOMContentLoaded` 时执行初始化，您可以设置自定义的事件，AOS 将在 `document` 上监听该事件：

```javascript
AOS.init({
  startEvent: "someCoolEvent",
});
```

**重要提示：** 若设置 `startEvent: 'load'`，监听器会被自动附加到 `window` 对象而不是 `document` 上。

### 🖥 本地演示 (Demo)

AOS Modern 提供了针对核心库及各框架集成的本地 HTML 示例页面，演示了各种动画用法与生命周期特性。

要本地运行 Demo：

1. 克隆本项目仓库
2. 安装依赖并启动本地开发服务器：
   ```bash
   yarn install
   yarn dev
   ```
3. 在浏览器中打开以下链接：
   - **官方交互式演示门户**: [http://localhost:8080/](http://localhost:8080/)
   - **核心库静态示例**：[http://localhost:8080/simple.html](http://localhost:8080/simple.html)
   - **核心库异步 DOM 侦测**：[http://localhost:8080/async.html](http://localhost:8080/async.html)
   - **React 挂载/卸载 Hook 演示**：[http://localhost:8080/react.html](http://localhost:8080/react.html)
   - **Vue Plugin 与指令演示**：[http://localhost:8080/vue.html](http://localhost:8080/vue.html)

### 📦 框架集成支持

AOS 现原生提供对现代前端框架（React、Vue）的封装和导出支持。您可直接根据框架的子路径进行引入。

#### ⚛️ React

AOS 导出了自定义 React Hook `useAOS` 用于处理挂载初始化与卸载销毁逻辑。

```javascript
import React from "react";
import { useAOS } from "aos/react";

function MyComponent() {
  useAOS({
    duration: 1000,
    once: true,
  });

  return <div data-aos="fade-up">动画呈现！</div>;
}
```

#### 💚 Vue

我们使用统一的 Vue Plugin 提供对 Vue 2 和 Vue 3 的兼容支持，并附带自定义指令 `v-aos`。

在应用入口文件（如 `main.js`）中引入：

```javascript
import { createApp } from "vue";
import { AOSPlugin } from "aos/vue";
import App from "./App.vue";

const app = createApp(App);

// 注册插件并配置全局选项
app.use(AOSPlugin, {
  duration: 800,
  once: false,
});

app.mount("#app");
```

在组件模板中使用 `v-aos` 指令：

```html
<!-- 基础字符串传参 -->
<div v-aos="'fade-up'"></div>

<!-- 绑定修饰参数 -->
<div v-aos:fade-down></div>

<!-- 对象详细选项配置 -->
<div v-aos="{ animation: 'zoom-in', delay: 200, duration: 600 }"></div>
```

### 👻 预设动画列表

您可以使用以下内置的动画样式：

- 渐变 (Fade):
  - fade
  - fade-up
  - fade-down
  - fade-left
  - fade-right
  - fade-up-right
  - fade-up-left
  - fade-down-right
  - fade-down-left

- 翻转 (Flip):
  - flip-up
  - flip-down
  - flip-left
  - flip-right

- 滑动 (Slide):
  - slide-up
  - slide-down
  - slide-left
  - slide-right

- 缩放 (Zoom):
  - zoom-in
  - zoom-in-up
  - zoom-in-down
  - zoom-in-left
  - zoom-in-right
  - zoom-out
  - zoom-out-up
  - zoom-out-down
  - zoom-out-left
  - zoom-out-right

- 模糊渐入 (Blur):
  - blur-in
  - blur-in-up
  - blur-in-down
  - blur-in-left
  - blur-in-right

- 倾斜滑入 (Skew):
  - skew-up
  - skew-down

- 旋转滑入 (Rotate):
  - rotate-in
  - rotate-in-up-left
  - rotate-in-up-right
  - rotate-in-down-left
  - rotate-in-down-right

- 回弹缩放 (Back):
  - back-in
  - back-in-up
  - back-in-down
  - back-in-left
  - back-in-right

- 特技动效 (Specials):
  - roll-in
  - jack-in-the-box

### 锚点对齐方式 (Anchor placement)

- top-bottom
- top-center
- top-top
- center-bottom
- center-center
- center-top
- bottom-bottom
- bottom-center
- bottom-top

### 缓动函数 (Easing functions)

您可以选择不同的运动缓动曲线：

- linear
- ease
- ease-in
- ease-out
- ease-in-out
- ease-in-back
- ease-out-back
- ease-in-out-back
- ease-in-sine
- ease-out-sine
- ease-in-out-sine
- ease-in-quad
- ease-out-quad
- ease-in-out-quad
- ease-in-cubic
- ease-out-cubic
- ease-in-out-cubic
- ease-in-quart
- ease-out-quart
- ease-in-out-quart

## ✌️ [Contributing](CONTRIBUTING.md)

## 📝 [Changelog](CHANGELOG.md)

## ❔Questions

If you have any questions, ideas or whatsoever, please check [AOS contribution guide](CONTRIBUTING.md) and don't hesitate to create new issues.
