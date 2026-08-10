# My Chef’s Menu v0.1 Release Checklist

## 使用说明

- 测试日期：___2026-08-07_____________
- 测试人员：______Sui__________
- 测试版本：v0.1
- 测试地址：_____http://localhost:5173/___________

完成一项后，将 `[ ]` 改成 `[x]`。如果测试失败，请保持未勾选，并在“问题记录”中写下现象和复现步骤。

## 1. 功能测试

- [x] 页面可以正常打开，没有空白页或加载失败。
- [x] Menu Title、Starter、Main Course、Dessert 和 Drinks 可以正常输入、修改和清空。
- [x] 四个 Dish Description 输入框可以正常输入多行内容、滚动和调整高度。
- [x] 输入过程中右侧不会实时变化，符合 v0.1 产品流程。
- [x] 点击 Generate 后，右侧显示最新的菜单标题、菜名和描述。
- [x] 修改左侧内容后，必须再次点击 Generate，右侧才会更新。
- [x] 生成菜单后，Michelin Fine Dining 选项变为可用。
- [x] 点击 Michelin Fine Dining 后，菜单内容不变，只有视觉样式发生变化。
- [x] 菜单生成前，Save Menu 保持低干扰的禁用状态。
- [x] 菜单生成后，Save Menu 可以点击并成功下载图片。
- [x] 保存过程中显示 `Saving...`，完成后恢复为 `Save Menu`。
- [x] 连续生成、切换样式和保存时，页面仍然正常工作。

## 2. 内容测试

### 语言

- [x] 纯英文菜单可以正确生成和保存。
- [x] 纯中文菜单可以正确生成和保存，没有乱码。
- [x] 中英文混合菜单可以正确生成和保存，没有乱码。

### 长内容

- [x] 长菜单标题可以合理换行，不超出菜单卡片。
- [x] 长菜名可以合理换行，不与其他内容重叠。
- [x] 长菜品描述可以合理换行，菜单仍然清晰可读。
- [x] 内容超过固定导出画布时，页面显示容易理解的精简提示，而不是下载损坏图片。

### 空字段

- [x] 菜名和描述都为空时，对应分类自动隐藏。
- [x] 只有菜名时，只显示菜名，不显示空描述。
- [x] 只有描述、没有菜名时，不生成该分类，并在 Generate 下方显示页面内错误提示。
- [x] 多个分类只有描述、没有菜名时，一次提示所有对应分类。
- [x] Menu Title 为空但其他内容存在时，使用默认标题 `Chef’s Menu`。
- [x] 所有字段都为空时，Generate 提示用户先填写内容。

### Empty Menu Validation

- [x] Empty menu validation
  - Only menu title filled
  - Starter、Main Course、Dessert、Drinks 均为空
  - 点击 Generate
  - Generate should not create menu
  - 右侧菜单不生成
  - Generate 按钮下方显示页面内错误提示
  - 提示用户至少添加一道菜

## 3. PNG 导出测试

- [x] 下载的 PNG 可以正常打开，不是空白图片或损坏文件。
- [x] PNG 只包含 `menu-preview-card`。
- [x] PNG 不包含左侧输入区域。
- [x] PNG 不包含 Generate 按钮。
- [x] PNG 不包含 Menu Style 控件和 Michelin Fine Dining 按钮。
- [x] PNG 不包含 Save Menu 按钮或保存状态提示。
- [x] PNG 包含正确的菜单标题、菜名和描述。
- [x] PNG 保留正确字体、颜色、留白和 Michelin Fine Dining 样式。
- [x] PNG 尺寸为宽 1080 px、高 1350 px。
- [x] PNG 比例为 4:5 竖版。
- [x] PNG 文字边缘清楚，没有明显模糊、截断或重叠。
- [x] 电脑和手机导出的 PNG 尺寸及布局一致。
- [x] 下载文件名合理，可以正常保存和再次打开。

## 4. 设备测试

### 桌面浏览器

- [x] 在桌面浏览器中完成“输入 → Generate → Michelin → Save Menu”完整流程。
- [x] 左右区域布局正常，主要面板高度和间距协调。
- [x] 所有按钮、输入框和多行描述框均可使用。
- [x] 记录浏览器名称及版本：____Chrome 150.0.7871.187____________

### 手机浏览器

- [x] 在手机浏览器中完成“输入 → Generate → Michelin → Save Menu”完整流程。
- [x] 页面自动变为上下排列，没有横向溢出。
- [x] 输入框、模板按钮和 Save Menu 按钮容易点击。
- [x] 手机软键盘打开时，表单仍可正常填写。
- [x] 记录设备、系统、浏览器及版本：_iPhone 14 Plus iOS 26.6 Safari 2026-08-07_______________

## 5. 代码检查

- [x] 打开浏览器开发者工具后，没有明显的红色 console error。
- [x] Generate、模板切换和 Save Menu 过程中没有新增 console error。
- [x] 执行 `npm run build` 可以成功完成正式构建。
- [x] 项目中没有意外加入未使用的功能文件。
- [x] 没有明显未使用的代码、重复样式或失效选择器。
- [x] 没有把 AI 密钥、密码或其他敏感信息写入项目。
- [x] `node_modules` 和 `dist` 被视为依赖/构建产物，不作为手写功能代码检查。

## 6. 问题记录

| 编号 | 测试项目 | 问题现象 | 复现步骤 | 严重程度 | 状态 |
| --- | --- | --- | --- | --- | --- |
| 1 |  |  |  |  |  |
| 2 |  |  |  |  |  |
| 3 |  |  |  |  |  |

严重程度建议：

- 阻断：无法完成核心流程，必须在上线前修复。
- 重要：功能可以完成，但结果明显错误或体验较差。
- 一般：不影响核心流程的小问题。

## 7. 发布结论

- [x] 所有“阻断”和“重要”问题已经修复并重新测试。
- [x] 核心流程在桌面和手机浏览器均通过。
- [x] PNG 导出内容、样式和尺寸均通过。
- [x] v0.1 可以发布。

最终结论：____OK____________

确认人：_____Sui___________

确认日期：___2026-08-07_____________

---

# My Chef’s Menu v0.2.0 Final Release Checklist

## 最终验收状态

- 当前版本：v0.2.0
- 当前阶段：Final Release Approval
- 状态：最终验收通过，可以进入正式发布流程

## 已完成功能

- [x] Theme Picker
- [x] Michelin Fine Dining Theme
- [x] Modern European Theme
- [x] Romantic Dinner Theme
- [x] 三个 Theme 共用统一 Theme Registry 与切换机制
- [x] Export PNG（1080 × 1350 px、4:5）
- [x] Mobile Safari 图片预览、保存与分享流程
- [x] Mobile Safari SVG resource loading fix
- [x] 纯英文、纯中文及中英混合 Long Title Handling

## iPhone Safari Export Compatibility

- [x] Romantic signature decoration 已从 CSS pseudo-element 调整为真实 `img` DOM。
- [x] Preview 与 Export clone 共用 `romantic-dinner-signature.svg`。
- [x] 修复 iPhone Safari 导出 PNG 时 signature decoration 可能丢失的问题。
- [x] Export 调用 `html-to-image` 前会遍历 clone 内的图片资源。
- [x] 导出前等待图片完成加载，并在支持时执行 `image.decode()`。
- [x] 图片具有有效 `naturalWidth` 后才进入 PNG 转换。

### 问题记录

Romantic signature decoration 在 iPhone Safari 导出时曾出现资源加载问题。问题发生于 DOM 和 SVG 资源存在、Preview 正常，但移动端 `html-to-image` 转换阶段未稳定等待图片资源完成加载。当前已通过 export 前 image resource readiness check 修复。

## Desktop 三主题 PNG 最终测试

- [x] Michelin Fine Dining Preview 与 PNG 导出测试通过。
- [x] Modern European Preview、植物 SVG 与 PNG 导出测试通过。
- [x] Romantic Dinner Preview、handwritten title、signature decoration 与 PNG 导出测试通过。
- [x] 三个 Theme 导出尺寸均为 1080 × 1350 px、4:5。

## Mobile Safari 实机最终测试

- [x] Generate 正常。
- [x] Theme switching 正常。
- [x] Romantic signature PNG export 正常。
- [x] Image preview 正常。
- [x] Long press save 正常。
- [x] Share Sheet 正常。

## 最终发布结论

My Chef’s Menu v0.2.0 已完成多 Theme 功能、Desktop PNG 与 Mobile Safari 实机最终验收。

**Approved for Release**

最终确认日期：2026-08-10

说明：当前尚未标记为 `Released`。正式状态将在 release commit、push 与部署完成后更新。
