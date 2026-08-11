# My Chef’s Menu 开发日志

## 最新记录

### 日期

2026-08-11

### 当前版本

My Chef’s Menu v0.3
Development in Progress

## v0.3 Multi Dish Support

### 当前状态

Development in Progress

### Phase 1 — Dynamic Input Structure

Status: Completed

已完成：

- 四个固定 Course 保持不变：
  - Starter
  - Main Course
  - Dessert
  - Drinks
- 每个 Course 支持动态添加多个 Dish。
- 实现 Add another dish。
- 实现 Remove Dish。
- 每个 Dish 包含：
  - Dish Name
  - Description
- 动态 Dish 使用唯一 DOM ID。
- Label 保留无障碍关联，但视觉上隐藏。
- Dish Editor UI 已进行 refinement：
  - 移除明显卡片边框；
  - 移除 Dish 之间的表单式 divider；
  - 使用 typography 与 whitespace 建立层级；
  - Remove Dish 降低视觉权重。
- 四个 Course 的 Dish 输入互相独立。

### Phase 2 — Data Model and Validation

Status: Completed

新增：

`src/menu-model.js`

数据模型从 v0.2 的单 Dish 扁平结构升级为：

```js
{
  title,
  courses: [
    {
      id,
      label,
      labelZh,
      dishes: [
        {
          name,
          description
        }
      ]
    }
  ]
}
```

已完成：

- 使用统一 `courseDefinitions` 管理四个 Course。
- `readMenuForm()` 支持读取多个 Dish。
- Dish 顺序与 DOM 输入顺序一致。
- 空白 Dish 可被识别并忽略。
- Description-only Dish 会触发 Validation。
- Validation Error 可以定位具体 Course 和 Dish，例如：`Starter — Dish 2`。
- 多个 Validation Error 一次性显示。
- 整个菜单至少需要一个有效 Dish Name。
- 只填写 Menu Title 仍然不能 Generate。
- Validation 失败时不会更新 Preview。

### Phase 3 — Multi Dish Preview Renderer

Status: Completed

Preview DOM 已升级为：

```text
Course
→ course-dishes
→ course-dish
→ course-name
→ course-description
```

已完成：

- 同一个 Course 可以渲染多个 Dish。
- Dish 按用户输入顺序显示。
- 空白 Dish 不进入 Preview。
- Description-only Dish 不进入 Preview。
- 没有有效 Dish 的 Course 自动隐藏。
- 保留原有：
  - `.course-name`
  - `.course-description`
  - `.menu-course`
- 新增：
  - `.course-dishes`
  - `.course-dish`
- Export clone 会自动继承全部 Multi Dish DOM。
- Theme Registry、Theme Picker、Export 架构和 Mobile Safari 流程未修改。

当前 Multi Dish spacing：

- Michelin Fine Dining：Screen 20px / Export 28px
- Modern European：Screen 22px / Export 30px
- Romantic Dinner：Screen 20px / Export 28px

### Phase 4 — Multi Dish Visual QA & Export Capacity Assessment

Status: Completed

本阶段完成只读评估，没有修改代码。

#### Visual QA

三个 Theme 的 Multi Dish 视觉结构均通过当前评估：

Michelin Fine Dining：

- 单 Dish 保持接近 v0.2。
- Multi Dish 层级清晰。
- 主要风险为纵向容量。

Modern European：

- Multi Dish 可读性最稳定。
- 左对齐 Editorial layout 适合连续多个 Dish。
- 当前 Dish spacing 合理。

Romantic Dinner：

- Multi Dish 仍保持 Dish Name / Description 层级。
- 当前没有需要立即修改的布局问题。
- Dish 数量增加会减少卡片留白，但暂未达到需要重新设计的程度。

#### Spacing Assessment

- 当前 Dish gap 保持不变。
- Course gap 均明显大于 Dish gap。
- 当前没有必要调整 Theme spacing。

#### Export Capacity

Export 继续保持 1080 × 1350 px。

现有高度保护继续使用：

```text
exportCard.scrollHeight > 1350
→ MENU_CONTENT_TOO_LONG
```

当前不设置固定 Dish hard limit。

根据现有布局得到的保守容量估计：

- 无 Description：约 8–10 Dish。
- 短 Description：
  - Michelin 约 4–6 Dish；
  - Modern European 约 6 Dish；
  - Romantic Dinner 约 4–6 Dish。
- 较长 Description：
  - Michelin 约 4 Dish；
  - Modern European 约 4–6 Dish；
  - Romantic Dinner 约 4 Dish。

注意：以上容量为基于当前 typography、spacing、padding 和 layout 的估算，不是正式浏览器像素级测试结果。

#### Product Decision

当前决定：

- 不设置统一 Dish hard limit。
- 保留 Export 高度检测作为最终保护。
- 暂不限制 Add another dish。
- 后续可考虑增加非阻断容量提示：“For the best export result, keep your menu concise.”
- 是否增加软提示，应在真实 PNG 容量测试后决定。

#### Real-browser Capacity Test Preparation

计划测试三个 Theme 的真实浏览器 PNG Capacity Matrix：

- 4 Dish
- 6 Dish
- 8 Dish
- 10 Dish

需要重点测试：

- 无 Description
- 短 Description
- 长 Description
- Long Title
- 中英混合标题
- `MENU_CONTENT_TOO_LONG` 触发边界

该测试已在下方“v0.3 Multi Dish Support - Phase 4 Real Browser Capacity Test Results”中完成并记录。

### v0.3 Multi Dish Support - Phase 4 Real Browser Capacity Test Results

Status: Completed

#### 测试方法

- 使用真实 Chrome 151 浏览器和项目现有 DOM、Theme 与 `html-to-image` 导出流程。
- PNG 保持 1080 × 1350 px、4:5。
- 测试三个 Theme：
  - Michelin Fine Dining
  - Modern European
  - Romantic Dinner
- 每个 Theme 分别测试 4、6、8、10 Dish。
- 每种 Dish 数量覆盖：
  - Short Description
  - Long Description
  - Long Dish Title
  - Mixed Chinese-English Content
- Dish 尽量均衡分配到 Starter、Main Course、Dessert 与 Drinks。
- 共完成 48 个真实浏览器组合；19 个组合成功生成 PNG。
- 同时评估 `MENU_CONTENT_TOO_LONG` 技术边界与成功导出后的实际设计质量。成功导出不自动等于产品上推荐。

#### 三个 Theme 评估结果

Michelin Fine Dining：

- 4 Dish 在四类内容场景下均可导出，并保持高级餐厅菜单感。
- 6 Dish 的短描述与紧凑中英混合内容可接受；长描述和长 Dish Title 超出导出高度。
- 8 Dish 与 10 Dish 即使使用短描述也超出容量。
- 推荐最大容量：6 Dish；长内容场景以 4 Dish 为安全目标。

Modern European：

- 4 Dish 在四类内容场景下均可导出，并保持稳定的 Editorial 层级。
- 6 Dish 的短描述与紧凑中英混合内容可接受；长描述和长 Dish Title 超出导出高度。
- 8 Dish 短内容虽然可以技术性导出，但底部仅剩约 43px，植物装饰进入内容安全区，Editorial 留白明显退化。
- 10 Dish 全部超过容量。
- 推荐最大容量：6 Dish；8 Dish 不作为产品支持上限。

Romantic Dinner：

- 4 Dish 最能保持浪漫感、签名装饰和留白。
- 4 Dish 长描述可以导出，但 Description 已明显抢占视觉焦点；4 Dish 长标题已超过容量。
- 6 Dish 仅适合短描述或紧凑中英混合内容，属于可接受上边界。
- 8 Dish 与 10 Dish 全部超过容量。
- 推荐最大容量：6 个紧凑 Dish；理想视觉容量为 4 Dish。

#### 最终产品决策

- Maximum supported dishes per menu：6 Dish。
- Recommended category limit：每个 Category 最多 2 Dish。
- Ideal visual capacity：4 Dish。
- Long Description 或 Long Dish Title 场景应优先控制在 4 Dish。
- 保留 `MENU_CONTENT_TOO_LONG` 作为最终 Export 高度保护。
- 后续应提供 Description 与 Dish Title 的非阻断长度指导。
- 不通过缩小 typography、压缩 spacing、减少 Theme whitespace 或移除装饰身份来容纳 8–10 Dish。
- 不允许三个 Theme 因容量扩张退化为普通列表。

#### Next Step

- 执行 Multi Dish Desktop regression。
- 执行 Multi Dish Mobile Safari regression。
- 根据容量决策评估非阻断 Dish 数量与文字长度提示。
- 完成 v0.3 release documentation、version metadata update 与 final release testing。

### Phase 5.2 — Capacity Feedback

Status: Completed

#### 产品规则

- 每份菜单最大支持 6 个有效 Dish，作为 hard limit。
- 每个 Category 推荐最多 2 Dish，作为 soft recommendation，不阻止 Generate。
- 4 Dish 为 ideal visual capacity，仅提供提示，不限制用户继续编辑。

#### 技术实现

- 基于已填写的 Dish Name 计算有效 Dish 数量。
- 当有效 Dish 达到 6 个时：
  - 禁用所有 Add another dish 按钮；
  - 显示明确的容量上限提示；
  - Add handler 同时保留上限保护。
- 当单个 Category 达到 2 个有效 Dish 时显示轻量提示：
  - `For best menu balance, keep each category within 2 dishes.`
- 达到 4 Dish 时显示 ideal capacity 提示。
- 删除 Dish 或清空 Dish Name 后重新计算状态，并恢复 Add 按钮。
- 未修改 `courses[].dishes[]`、Renderer、Theme 或 Export 架构。

#### 测试结果

- 单 Category 2 Dish：软提示正常，不阻止继续添加。
- 4 Dish：ideal capacity 提示正常。
- 6 Dish：所有 Add 按钮正确禁用。
- 尝试添加第 7 Dish：未创建新的输入行。
- 删除 Dish 后：Add 按钮恢复，可重新添加。
- Production build 通过。

### Phase 5.3 — Validation & Content Guidance

Status: Completed

#### 产品规则

- Generate 最多接受 6 个有效 Dish。
- Dish Title 建议长度：约 60 个英文字符或 24 个中文字符。
- Description 建议长度：约 100 个英文字符或 45 个中文字符。
- 内容长度提示为非阻断提示；不截断文字，不阻止 Generate。

#### 技术实现

- 在 `menu-model.js` 中统一维护容量与文字长度常量。
- 新增有效 Dish 总数统计与内容长度 warning 生成逻辑。
- Generate 时汇总以下 blocking validation：
  - Empty Menu
  - Description-only Dish
  - 超过 6 个有效 Dish
- 多个 Validation Error 使用同一反馈区域一次性显示。
- 内容长度 warning 使用独立的非阻断反馈区域，并定位到具体 Category 与 Dish。
- Validation failure 不更新 Preview，也不会清空用户输入。
- 未修改 Renderer、Theme、Export 或 Mobile flow。

#### 测试结果

- 7 个有效 Dish：Generate 被阻止。
- 7 Dish 与 Description-only 同时出现：多个错误同时显示。
- Validation failure 后 Preview 保持不变，输入完整保留。
- 英文 Dish Title：60 字符无提示，61 字符显示提示。
- 中文 Dish Title：24 字符无提示，25 字符显示提示。
- 英文 Description：100 字符无提示，101 字符显示提示。
- 中文 Description：45 字符无提示，46 字符显示提示。
- 超长内容不截断并可正常 Generate。
- Production build 通过。

### Phase 5.4 — Regression Testing

Status: Desktop Completed / Mobile Safari System Actions Pending

#### 测试范围

- Dish 数量：0、1、4、6、7 Dish。
- Category：单 Category 2 Dish、单 Category 3 Dish、多 Category 混合 Dish。
- Content：短内容、长 Dish Title、长 Description、中文与中英混合内容。
- Theme：Michelin Fine Dining、Modern European、Romantic Dinner 的 4 Dish 与 6 Dish。
- Desktop：Generate、Theme switching、Save Menu 与实际 PNG 下载。
- Mobile Safari 分支：Generate、Save Menu、图片预览、Romantic signature 与关闭 Preview。
- Failure recovery：Validation failure、Export failure、修改内容后重新 Generate 与重新 Save。

#### 测试结果

- 数量、Category、内容、Validation 与失败恢复测试均通过。
- 三个 Theme 的 4 Dish 均通过。
- 三个 Theme 的 6 Dish 均可成功生成 Preview 和 PNG。
- Desktop 共验证 6 张真实 PNG，尺寸均为 1080 × 1350 px。
- Mobile Safari 浏览器分支成功生成 1080 × 1350 px 图片预览，Romantic signature 正常。
- Export failure 后临时 clone 正确清理，Save Menu 恢复可用；精简内容后可重新导出。
- iPhone 系统级 Long Press Save 与 Share Sheet 仍需实机最终确认。

#### 发现问题

- Modern European 在 6 Dish、两行 Menu Title 场景下，左下植物装饰与 Dessert / Drinks 内容区域发生视觉重叠。
- 该问题不影响 PNG 文件生成，但破坏 Editorial safe area，留作 Phase 5.5 处理。

### Phase 5.5 — Visual Polish

Status: Completed

#### 调整原则

- 仅调整 spacing 与 Modern European 装饰 safe area。
- 不缩小字体，不压缩主题核心留白。
- 不修改数据结构、Validation、Renderer、Export、Mobile flow、Canvas size 或 Theme architecture。

#### 技术实现

Michelin Fine Dining：

- Screen：Dish gap 20px → 18px；Description gap 6px → 5px。
- Export：Dish gap 28px → 25px；Description gap 9px → 7px；Category gap 52px → 50px。

Modern European：

- Screen：Dish gap 22px → 19px；Description gap 5px → 4px；Category gap 38px → 36px。
- Export：Dish gap 30px → 24px；Description gap 8px → 6px；Category gap 50px → 48px。
- 左下 wheat 装饰向左、向下移动并缩小，建立内容 safe area。
- 右上 olive 装饰保持不变。

Romantic Dinner：

- Screen：Dish gap 20px → 18px。
- Export：Dish gap 28px → 25px；Description gap 8px → 6px。
- Category gap 保持 50px。

#### 测试结果

- 三个 Theme 的 4 Dish 与 6 Dish PNG 均成功导出。
- Modern European 6 Dish + 两行 Menu Title 专项测试通过。
- 共验证 7 张真实 PNG，尺寸均为 1080 × 1350 px。
- 无文字截断或重叠。
- 三个 Theme 的 Category 层级与原有设计语言保持。
- 4 Dish 没有因间距调整变得过密。
- Production build 通过。

#### 已解决问题

- Modern European 左下植物装饰不再进入 Dessert / Drinks 正文区域。
- 6 Dish 的 Dish Name、Description 与 Category spacing 已重新平衡。
- 在不缩小字体或破坏主题留白的前提下，降低了多 Dish 菜单的无效纵向延伸。

## v0.3.0 Release Candidate

### 当前状态

**Release Candidate**

My Chef’s Menu v0.3.0 已完成 Multi Dish Support 核心开发、容量规则、Validation、视觉优化、Desktop Export 回归与 iPhone Safari 实机测试，当前进入 Release Candidate 阶段。

### Multi Dish Support

- Starter、Main Course、Dessert 与 Drinks 均支持多个 Dish。
- 支持动态 Add another dish 与 Remove Dish。
- 数据结构统一为 `courses[].dishes[]`。
- Preview、Theme switching 与 Export clone 均支持 Multi Dish DOM。

### Capacity Rules

- 每份菜单最大支持 6 个有效 Dish。
- 每个 Category 推荐最多 2 Dish，使用非阻断 soft recommendation。
- 4 Dish 为 ideal visual capacity。
- Long Dish Title 或 Long Description 场景优先建议 4 Dish。
- 保留 `MENU_CONTENT_TOO_LONG` 作为最终 Export 高度保护。

### Validation

- Empty Menu、Description-only Dish 与超过 6 Dish 均会阻止 Generate。
- 多个 Validation Error 一次性汇总显示。
- Validation failure 不更新 Preview，也不清空输入。
- Dish Title 与 Description 长度使用非阻断 guidance，不截断用户内容。

### Three Themes

- Michelin Fine Dining：Multi Dish 层级与 fine-dining 气质保持。
- Modern European：Editorial layout、植物装饰与内容 safe area 已完成回归。
- Romantic Dinner：Multi Dish typography、signature decoration 与浪漫留白保持。

### Visual Polish

- 三个 Theme 的 Dish gap、Description gap 与 Category gap 已完成小幅重新平衡。
- 未缩小字体，未改变 Canvas size 或 Theme architecture。
- Modern European 左下 wheat 装饰已调整 position 与 size，不再进入 Dessert / Drinks 正文区域。

### Desktop Export

- 三个 Theme 的 4 Dish 与 6 Dish PNG 均已通过真实浏览器导出测试。
- Modern European 6 Dish + 两行 Menu Title 专项测试通过。
- PNG 尺寸保持 1080 × 1350 px、4:5。
- Validation recovery 与 Export failure retry 流程通过。

### iPhone Safari 实机测试

- Multi Dish Generate：Pass。
- Theme switching：Pass。
- Save Menu 与图片预览：Pass。
- Long Press Save：Pass。
- Share Sheet：Pass。
- Romantic signature 与 Multi Dish PNG：Pass。

### Release Candidate 结论

- Multi Dish Support：Completed。
- Capacity Rules：Completed。
- Validation & Content Guidance：Completed。
- Three Themes Visual QA：Completed。
- Desktop PNG Export：Completed。
- iPhone Safari Save / Share Flow：Completed。
- Version metadata：已同步为 v0.3.0。

当前版本定位：**v0.3.0 Release Candidate**。

### Current v0.3 Status

Completed：

- Phase 1 — Dynamic Input Structure
- Phase 2 — Data Model and Validation
- Phase 3 — Multi Dish Preview Renderer
- Phase 4 — Multi Dish Visual QA assessment
- Phase 4 — Real-browser PNG capacity matrix
- Phase 5.2 — Capacity Feedback
- Phase 5.3 — Validation & Content Guidance
- Phase 5.4 — Desktop Regression Testing
- Phase 5.5 — Visual Polish
- iPhone Safari real-device Multi Dish regression
- v0.3.0 version metadata update
- v0.3 Release Candidate documentation

Pending：

- v0.3 final release testing
- Production Console recheck

Next Step：

Complete the Production Console recheck and v0.3 final release validation before marking v0.3.0 as Released.

## v0.2.0 Release Candidate

### 当前状态

My Chef’s Menu v0.2.0 已完成核心开发，当前进入 Release Candidate 阶段。

### 已完成

- Theme Picker；
- Michelin Fine Dining Theme；
- Modern European Theme；
- Romantic Dinner Theme；
- 三 Theme 共用统一 Theme Registry 与切换机制；
- Export PNG（1080 × 1350 px、4:5）；
- Mobile Safari 图片预览、保存与分享流程；
- Mobile Safari SVG resource loading fix；
- 纯英文、纯中文及中英混合 Long Title Handling。

### Romantic Signature — iPhone Safari Export Fix

Romantic signature decoration 在 iPhone Safari 导出 PNG 时曾出现资源加载问题：

- Preview 中 signature 正常显示；
- signature DOM 与 SVG 资源正常存在；
- Mobile Safari 的 `html-to-image` 转换阶段未稳定等待图片资源完成加载；
- 导出的 PNG 中可能缺少 signature decoration。

修复内容：

- signature decoration 已使用真实 `img` DOM；
- Preview 与 Export clone 共用 `romantic-dinner-signature.svg`；
- Export 前遍历 clone 内所有图片资源；
- 等待图片 `complete` / `load`；
- 浏览器支持时执行 `await image.decode()`；
- 确认图片具有有效 `naturalWidth` 后再执行 PNG 转换。

当前状态：已通过 export 前 image resource readiness check 修复。

### Release Candidate 定位

- 当前版本：v0.2.0；
- 当前阶段：Release Candidate；
- 当前重点：最终多 Theme PNG、Mobile Safari 与发布回归验证。

## v0.2 Visual Identity Update #1 — Hero Section

### 已完成

- 首页品牌标题字体已从原方案调整为 Playfair Display；
- 修复原字体导致 My Chef’s Menu 中 s 与 apostrophe（’）视觉粘连的问题；
- Hero Section 文案优化完成；
- 首页品牌语言与 Fine Dining 定位进一步统一；
- 当前标题视觉方向确定为：
  - Elegant
  - Fine Dining
  - Editorial Luxury

### 设计决策

- 保留 “YOUR TABLE, YOUR STORY” 作为品牌 tagline；
- 保留英文品牌标题作为主要视觉元素；
- Playfair Display 作为当前 Hero Title 推荐字体方案；
- 当前首页视觉方向更接近高级餐厅菜单 / 生活方式品牌，而非普通工具页面。

### 后续可优化

- 中文引导文案需要进一步调整，使其与品牌调性一致；
- 首页整体留白和标题比例可以在后续视觉优化阶段继续评估。

### 当前版本保持

My Chef’s Menu v0.2
Phase 1 - Visual Identity Upgrade

## v0.2 Phase 2 Preparation - Michelin Fine Dining Upgrade

### 已完成

- 完成 Michelin Fine Dining 当前结构分析；
- 确认当前模板基于共享 DOM + theme class 的设计方式；
- 确认未来多个 Atmosphere 应共享内容结构，通过视觉主题区分；
- 确立 Michelin v2 视觉方向：

Quiet Luxury / Contemporary Tasting Menu

### 设计关键词

- 深炭黑背景；
- 温暖象牙白文字；
- 低饱和香槟金；
- Playfair Display 标题；
- 克制留白；
- 菜品层级优化。

### 当前状态

当前未修改代码。

### 下一阶段

Michelin Fine Dining v2 Design Specification

需要先确定：

- 色彩系统；
- 字体层级；
- Header 构图；
- 菜品排版；
- Export PNG 对应规则。

## v0.2 Theme System Progress

### 已完成

1. Theme switching architecture
2. Michelin Fine Dining Theme
3. Modern European Theme

### Modern European 当前状态

- Color system finalized
- Typography finalized
- Libre Baskerville Dish Name implemented
- Inner frame added
- Decorative illustration system finalized
- Export layout verified

## Modern European Theme Completed

### 状态

Completed / Design Frozen

### 已完成

- Theme architecture integration
- Theme switching compatibility
- Contemporary European Editorial direction
- Warm paper color system
- Playfair Display Menu Title
- Libre Baskerville Dish Name typography
- Terracotta category accent
- Olive branch and wheat decorative illustration system
- Subtle inner frame
- Editorial spacing refinement
- Export Canvas styling verification

### 确认

Modern European Theme 不再进行结构性调整。

后续仅允许：

- bug fix
- responsive adjustment
- export compatibility fix

### 下一阶段

Romantic Dinner Theme Design & Development

## 当前项目状态总结

### 项目

My Chef’s Menu v0.1

### 当前阶段

Released

### 已完成

- PRD 和技术方案文档建立。
- 基础网页框架完成。
- 菜单输入功能完成。
- Generate 生成功能完成。
- Michelin Fine Dining 模板完成。
- Save Menu PNG 导出完成。
- Empty Menu Validation 完成。
- Description 无菜名验证完成。
- Description validation 优先级问题已修复并验证。
- 桌面浏览器完整流程测试完成。
- `favicon.ico 404` 问题已修复。
- Console error 检查已完成。
- 已通过 Chrome 无痕模式验证，项目页面无红色 Console error。
- 普通浏览器中的异步响应错误已确认来自浏览器扩展，不属于项目代码问题。
- 正式构建检查已完成，`npm run build` 成功。
- 代码检查已完成，未发现必须修复的问题。
- iOS Safari Save Menu compatibility issue 已解决并通过测试。
- 手机浏览器测试已完成。
- Release Checklist 已全部完成。
- 最终 Release Review 已通过。
- GitHub repository 已建立。
- 项目代码已完成首次版本提交。
- Vercel deployment 已完成。
- Production 环境可访问。
- Desktop 浏览器线上测试通过。
- Mobile Safari 线上测试通过。
- Generate、Michelin、Save Menu 在线环境测试通过。
- PNG 导出功能在线环境验证通过。

### 最终确认

- 最终确认人：Sui。
- 确认日期：2026-08-07。
- 当前状态：Released。

### Console 检查结果

- `favicon.ico 404` 问题已修复。
- 已通过 Chrome 无痕模式验证，项目页面无红色 Console error。
- 普通浏览器中发现的异步响应错误来自浏览器扩展，不属于项目代码问题。

### 下一步建议顺序

1. 进入 Phase 5 - User Testing / Feedback Collection。
2. 持续观察 Production 环境运行情况并记录用户反馈。

### 已完成

1. 完成产品需求与简化技术方案。
2. 创建基础 Vite 网页项目。
3. 完成左侧菜单信息输入，包括菜名与 Dish Description。
4. 完成 Generate 按钮生成右侧菜单预览。
5. 完成空字段自动隐藏和默认菜单标题处理。
6. 完成 Michelin Fine Dining 菜单风格。
7. 完成 Save Menu，将 `menu-preview-card` 导出为 PNG。
8. PNG 固定为 4:5 竖版、1080 × 1350 px。
9. 完成基础桌面与手机响应式布局。
10. 创建 `release-checklist.md`，用于上线前测试。
11. 补充 Generate 前置验证，阻止空菜单和没有菜名的独立 Description 生成预览。

### Generate 前置验证

- 菜单必须至少包含一道菜才能生成。
- 只填写 Menu Title 或所有菜名为空时，不生成右侧预览。
- Dish Description 必须依附于对应菜名，不能独立生成。
- 多个验证错误会一次收集并显示。
- 错误显示在 Generate 按钮下方，不使用 alert 弹窗。
- 用户输入内容会保留，修正后可以再次点击 Generate。

### 当前阶段

Released

v0.1 核心功能开发、Release Testing 和正式部署已经完成，Production 环境可正常访问。

### v0.1 Release 记录

- 项目状态：Released。
- GitHub repository 已创建。
- 项目代码已完成首次版本提交。
- Vercel 部署完成。
- Production 环境已上线。
- Desktop 浏览器线上访问测试通过。
- Mobile Safari 线上访问测试通过。
- Generate、Michelin、Save Menu 在线环境测试通过。
- PNG 导出功能在线环境验证通过。
- Release Checklist 已完成。
- v0.1 达到正式发布标准。

### Release Testing 当前状态

#### 已完成

- 已完成桌面浏览器测试。
- 已验证“输入 → Generate → Michelin → Save Menu”完整流程可以正常完成。
- 已验证桌面端页面布局正常。
- 已验证菜单输入框可以正常使用。
- 已验证多行 Dish Description 输入框可以正常使用。
- 已修复 `favicon.ico 404` 问题。
- 已完成 Console error 检查，并通过 Chrome 无痕模式确认项目页面无红色 Console error。
- 已确认普通浏览器中的异步响应错误来自浏览器扩展，不属于项目代码问题。
- 已完成正式构建检查，`npm run build` 成功。
- 已完成未使用代码、重复样式和失效选择器检查，未发现必须修复的问题。
- 手机浏览器测试已完成。

#### 已完成：手机浏览器测试

- 已在 iPhone Safari 完成 Save Menu 测试。
- Mobile Safari 点击 Save Menu 后会生成完整菜单图片预览，不再触发自动下载。
- 用户可以长按图片保存或分享。
- 图片保存功能正常。
- 图片分享功能正常。

#### iOS Safari Save Menu export compatibility issue

- 测试环境：iPhone Safari。
- 原问题：点击 Save Menu 后出现 Safari Download/View 选项，但 Download 没有生成 PNG，View 也无法打开预览。
- 原因分析：当前 `html-to-image + data URL + programmatic download` 方式在 iOS Safari 下存在兼容风险。
- 修复内容：Desktop 保留自动下载 PNG；Mobile Safari 改为生成图片预览，让用户长按保存或分享。
- 测试结果：iPhone Safari Save Menu 测试通过，图片保存和分享功能均正常。
- 当前状态：已解决。

#### 已完成：代码检查

- `npm run build` 正式构建检查成功。
- 未使用代码、重复样式和失效选择器检查已完成。
- 未发现必须修复的问题。

#### 发布判断

My Chef’s Menu v0.1 最终 Release Review 已通过：

- Release Checklist 已全部完成。
- Desktop 浏览器测试通过。
- Mobile Safari 测试通过。
- Generate、Michelin、Save Menu 流程通过。
- PNG 导出内容、样式和尺寸通过。
- Build 检查通过。
- Code Review 通过。
- Console 检查通过。
- iOS Safari Save Menu 兼容问题已修复并验证。
- 最终确认人：Sui。
- 确认日期：2026-08-07。

当前状态：Released。My Chef’s Menu v0.1 已完成正式部署，Desktop、Mobile Safari 和 Save Menu 在线环境验证均已通过。

### 当前核心流程

```text
输入菜单与菜品描述
→ 点击 Generate
→ 生成右侧菜单预览
→ 应用 Michelin Fine Dining
→ 点击 Save Menu
→ Desktop 下载 1080 × 1350 px PNG
→ Mobile Safari 显示图片预览，长按保存或分享
```

### 第一版暂不包含

- Live Preview
- Modern European 和 Romantic Dinner 模板
- AI 菜品描述
- AI 翻译
- 多种 Export Style
- 账号、数据库和在线保存

### 下一步

#### Phase 5 - User Testing / Feedback Collection

下一阶段重点不是开发新功能，而是通过真实使用收集：

- 用户操作体验问题。
- UI/UX 优化建议。
- 功能需求。
- 导出体验反馈。
- 移动端体验反馈。

收集到的反馈将用于评估后续版本方向，不在本阶段直接扩展新功能。

## 历史记录

### 2026-08-05

- 安装并配置 VS Code。
- 安装并登录 Codex。
- 创建项目文件夹。
- 创建 `product-requirements.md`。
- 完成第一版 PRD。
- 创建 `technical-design.md`。
- 创建 `project-context.md`。
- 完成 Phase 2 - Technical Design。

## v0.3 Release Final Polish / Release Ready

### Font Localization Lite Migration

- Font Localization Lite Migration 已完成。
- Google Fonts runtime dependency 已移除；运行时不再请求 Google Fonts 或 `fonts.gstatic.com`。
- Playfair Display、Libre Baskerville、Cormorant Garamond 与 Parisienne 已作为本地 WOFF2 英文字体资源接入。
- 保持既有 Theme 字体映射、字号、行高、间距、Renderer 与 PNG Export 逻辑不变。
- 中文字体不打包本地文件，继续使用各 Theme 定义的系统字体 fallback 顺序。

### Validation Results

- Production build：Pass。
- Chrome Production Preview font loading 与 Console 检查：Pass。
- Desktop font regression：Pass；三个 Theme 的 4 Dish / 6 Dish 英文、中文及中英混合场景未发现字体加载、换行、容量或 PNG 回归。
- PNG Export：Pass；输出保持 1080 × 1350 px，无文字截断或 Theme 装饰重叠。
- iPhone Safari smoke test：Pass；首次打开、Generate、Save Menu 与 PNG Preview 流程正常。

### Final Copy Polish

- Theme naming 已更新：
  - Michelin Fine Dining → Classic Fine Dining；
  - Modern European → Modern；
  - Romantic Dinner 保持不变。
- Modern Theme 顶部文案：Chef’s Selection → Seasonal Menu。
- Chef’s Selection 继续作为 Classic Fine Dining 的顶部文案保留。
- Phase 4 与此前版本中的旧 Theme 名称作为历史记录保留，未重写历史评估。

### Current Status

My Chef’s Menu v0.3.0 已完成 Multi Dish Support、容量规则、Validation、三 Theme、PNG Export、字体本地化与最终文案收尾。

**Release Ready**

## v0.3 Production Release Completed

### 1. Release Status

**v0.3 Released**

- v0.3 开发周期已完成。
- 当前版本已进入正式可访问状态。
- 本 Release Cycle 不再计划进行功能修改。

### 2. Production Deployment

- 部署平台：Netlify。
- 部署方式：GitHub Repository 自动部署。
- Build command：`npm run build`。
- Publish directory：`dist`。
- 项目已成功生成 production build。
- Netlify 部署成功。
- 外部用户可以通过公开 URL 访问。

### 3. Final Validation Completed

以下最终测试均已通过：

- Desktop browser testing。
- iPhone Safari smoke test。
- 真实用户访问测试：朋友成功打开网站。
- Theme switching 测试。
- Menu Generate 流程测试。
- PNG Export 流程测试。
- Local Font Loading 测试。
- Production Deployment Access 测试。

### 4. Final v0.3 Scope Summary

核心功能：

- Multi Dish Support。
- 三个 Menu Themes：
  - Classic Fine Dining；
  - Modern；
  - Romantic Dinner。

工程优化：

- Google Fonts 迁移至本地 WOFF2 字体。
- Font License 文件补充。
- Validation Logic 优化。
- PNG Menu Export。
- Mobile usability improvements。

### 5. Future Considerations (Not Part of v0.3)

- 更多 Menu Themes。
- AI-assisted menu generation。
- 更多 Export Format。
- Custom Domain 配置。
- UX/UI 持续优化。

以上内容属于未来规划，不影响当前 v0.3 Release。
