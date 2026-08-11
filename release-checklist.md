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

---

# My Chef’s Menu v0.3 Release Candidate Final Checklist

## 验收信息

- 检查日期：2026-08-11
- 目标版本：v0.3 Multi Dish Support
- 当前阶段：Release Candidate Final Checklist
- Desktop Browser：Chrome 151.0.7922.76
- PNG 规格：1080 × 1350 px、4:5

状态定义：

- **Pass**：已完成并具有本轮或当前 v0.3 的验证证据。
- **Not Applicable**：不适用于 v0.3 Release Candidate。
- **Pending**：尚缺少最终验证证据，或检查结果仍存在未关闭项。

## Final Checklist

| 检查项 | 状态 | 验证结果 |
| --- | --- | --- |
| Multi Dish Support | **Pass** | 四个固定 Course 支持动态添加与删除 Dish；`courses[].dishes[]`、Preview 顺序、空 Dish 过滤与 Category 隐藏行为均已验证。 |
| Capacity Rules | **Pass** | 6 个有效 Dish hard limit、每 Category 2 Dish soft recommendation、4 Dish ideal capacity 提示均已通过浏览器测试；第 7 Dish 被阻止。 |
| Validation | **Pass** | Empty Menu、Description-only、超过 6 Dish、多错误汇总、内容长度软提示均通过；Validation failure 不更新 Preview、不清空输入。 |
| Three Themes | **Pass** | Michelin Fine Dining、Modern European、Romantic Dinner 的 4 Dish 与 6 Dish Preview / PNG 均已验证；Modern European 装饰 safe area 修复后复测通过。 |
| PNG Export | **Pass** | 三 Theme 的 4 / 6 Dish 及 Modern European 6 Dish + 两行标题共 7 张回归 PNG 均成功导出，尺寸均为 1080 × 1350 px，无文字截断或重叠。 |
| Desktop Testing | **Pass** | Generate、Theme switching、Save Menu、实际 PNG 下载、Validation recovery 与 Export recovery 均通过。 |
| iPhone Safari Testing | **Pass** | v0.3 Multi Dish 已完成 iPhone Safari 实机最终回归；Generate、Theme switching、PNG Preview 与 Romantic signature 均正常。 |
| Mobile Save Flow | **Pass** | v0.3 Mobile Save Flow 实机验证通过；图片预览、Long Press Save 与系统 Share Sheet 均正常。 |
| Build Check | **Pass** | `npm.cmd run build` 成功；Vite 7.3.6 完成 production build，无构建错误。 |
| Console Check | **Pending** | 核心流程未发现项目 JavaScript exception；受限测试环境无法访问 Google Fonts，Console 出现 `ERR_NETWORK_ACCESS_DENIED` 与 remote CSS fetch error，尚不能标记为全绿。 |

## 本轮 Desktop Console 流程

已执行：

- 生成 6 Dish 菜单；
- 依次切换 Michelin Fine Dining、Modern European、Romantic Dinner；
- 执行 Save Menu；
- 成功下载 `v0.3-Release-Candidate.png`；
- 页面未产生 JavaScript runtime exception。

Console 未关闭项：

- Google Fonts remote CSS 在当前受限网络环境中加载失败；
- 需要在具有正常外网访问的 Release 浏览器或 Production 环境重新检查 Console；
- 重新检查时应确认页面加载、Generate、三个 Theme 切换和 Save Menu 全流程无红色 Console error。

## Additional Release Readiness

| 项目 | 状态 | 说明 |
| --- | --- | --- |
| v0.3 version metadata | **Pass** | `package.json` 与 `package-lock.json` 已同步为 `0.3.0`。 |
| v0.3 release documentation | **Pass** | development log 已新增 v0.3.0 Release Candidate 记录。 |

## 最终发布判断

当前 **不满足 v0.3 正式 Release 条件**。

Release blockers：

1. 在正常网络或 Production 环境完成无红色错误的 Console 检查；
2. 完成 v0.3 final release validation。

当前结论：**Release Pending**。

在以上 Pending 项全部转为 Pass 后，才能标记为 **Approved for Release**。

---

# My Chef’s Menu v0.3 Final Release Status

本节为 Font Localization 与 Final Copy Polish 完成后的最终发布判断，并取代上方 Release Candidate 阶段的 Pending 结论。历史检查记录保留不变。

## Final Checklist

| 检查项 | 状态 | 最终确认 |
| --- | --- | --- |
| Multi Dish Support | **Pass** | `courses[].dishes[]`、动态添加/删除、Preview 与多 Category 场景已通过回归。 |
| Capacity Rules | **Pass** | 6 Dish hard limit、每 Category 2 Dish soft recommendation 与 4 Dish ideal capacity 已验证。 |
| Validation | **Pass** | 总 Dish 数、空菜单、Description-only、多错误汇总与内容长度软提示均正常。 |
| Three Themes | **Pass** | Classic Fine Dining、Modern 与 Romantic Dinner 的 4 Dish / 6 Dish Preview 和 PNG 均通过。 |
| PNG Export | **Pass** | 1080 × 1350 px 输出、字体渲染、文字完整性与装饰 safe area 均通过。 |
| Desktop Testing | **Pass** | Chrome Production Preview 的 Generate、Theme switching 与 Save Menu 全流程通过。 |
| iPhone Safari Testing | **Pass** | iPhone Safari 实机回归与最终 smoke test 已通过。 |
| Mobile Save Flow | **Pass** | PNG Preview、Long Press Save 与 Share 流程已验证。 |
| Build Check | **Pass** | v0.3.0 production build 成功，无构建错误。 |
| Console Check | **Pass** | Chrome 正常网络 Production Preview 无项目 JavaScript error；字体迁移后无远程字体加载错误。 |
| Font Localization | **Pass** | Google Fonts runtime dependency 已移除，本地 WOFF2 英文字体正常加载，无字体 Console error。 |
| Final Copy Polish | **Pass** | Classic Fine Dining、Modern、Romantic Dinner 名称及 Modern 的 Seasonal Menu 文案已同步。 |

## Final Release Conclusion

所有 v0.3 Release 条件均已满足，无未关闭的 Release blocker。

**v0.3 Release Ready**
