# My Chef’s Menu 产品需求文档（PRD）

Version: 0.5


# 1. 产品名称

My Chef’s Menu


# 2. 产品愿景（Product Vision）

My Chef’s Menu 是一个帮助普通人在家庭用餐场景中创造高级餐厅体验的菜单设计工具。

用户可以通过简单输入自己的菜品，快速生成具有 Fine Dining 风格的个人菜单，让家庭聚餐、朋友晚宴和特殊时刻更有仪式感。

产品希望连接：

- 美食
- 生活方式
- 创造力
- 分享体验

未来可以发展为围绕 Home Dining Experience 的个人品牌工具。

My Chef’s Menu 的核心理念：

帮助每个人成为自己家的 Chef，通过精心设计的菜单创造属于自己的餐饮体验。


# 3. 产品背景（Background）

很多人在以下场景中会精心准备料理：

- 邀请朋友到家中用餐
- 情侣晚餐
- 节日聚餐
- 周末 Dinner Party
- 特殊纪念日

除了食物本身，用户也希望创造类似高级餐厅的完整体验。

然而，目前制作菜单存在以下问题：

1. 使用 Word/PPT 制作菜单效率低；
2. Canva 等设计工具需要用户自行排版；
3. 普通菜单生成工具缺少高级餐厅氛围；
4. 用户希望快速生成适合分享的美观菜单。

因此，希望打造一个简单、高级、有仪式感的菜单设计工具。


# 4. 产品目标（Goal）

第一阶段目标：

创建一个简单网页工具，让用户：

输入菜品信息

↓

点击 Generate 生成 Chef’s Menu

↓

在预览区域调整菜单风格

↓

下载并分享


核心目标：

让用户可以在几分钟内完成一份属于自己的 Chef’s Menu。


# 5. 目标用户（Target User）


## Primary User

Home Chef / Food Lover

用户特点：

- 喜欢做饭
- 喜欢招待朋友
- 注重生活品质
- 喜欢美食摄影和分享
- 喜欢高级餐厅体验


典型场景：

“周末邀请朋友来家里吃饭，希望像餐厅一样准备一份菜单。”


---

## Secondary User

Lifestyle Content Creator

例如：

- 小红书美食博主
- 生活方式博主


使用场景：

- 制作内容素材
- 分享 Dinner Party
- 展示个人生活方式


# 6. 用户故事（User Stories）


## Story 1

作为一个 Home Chef，

我希望输入我的晚餐菜单，

这样我可以生成一份漂亮的 Chef’s Menu。


---

## Story 2

作为一个 Dinner Party 主人，

我希望选择不同菜单模板，

这样菜单可以匹配我的晚宴氛围。


---

## Story 3

作为一个内容创作者，

我希望下载菜单图片，

这样我可以分享到社交媒体。


# 7. 用户流程（User Flow）


用户进入网站：

↓

输入菜单信息

↓

点击 Generate 按钮

↓

生成并查看菜单预览

↓

在右侧预览区域切换菜单模板

↓

下载图片

↓

分享


# 8. MVP 第一版功能范围


## Feature 1：菜单信息输入

用户可以输入：

- Menu Title
- Starter
- Main Course
- Dessert
- Drink


示例：

Menu Title:

Saturday Dinner


Starter:

Burrata Salad


Main Course:

Truffle Pasta


Dessert:

Tiramisu


---

# Feature 2：生成菜单预览

用户在左侧填写菜单信息后，点击 Generate 按钮，右侧区域生成 Chef’s Menu 预览。

第一版不在用户输入过程中实时更新预览。用户修改左侧内容后，需要再次点击 Generate，右侧才会显示最新结果。

这个操作更像完成一次菜单创作：用户先组织菜单内容，再主动生成菜单作品。


---

# Feature 3：预览区域模板切换


第一版提供三个模板：

模板选项位于右侧预览区域。用户第一次生成菜单前不需要选择模板；生成预览后，可以在右侧切换不同菜单风格。

切换模板只改变菜单的视觉样式，不改变用户输入的菜单内容。


## Template 1

Michelin Fine Dining


特点：

- 黑白色调
- 极简
- 大量留白
- 高级字体


适合：

正式晚宴


---

## Template 2

Modern European


特点：

- 现代
- 艺术感
- 简洁


适合：

朋友聚餐


---

## Template 3

Romantic Dinner


特点：

- 温暖
- 精致
- 私人感


适合：

情侣晚餐


---

# Feature 4：下载菜单图片

用户可以下载 PNG 图片，用于：

- 分享
- 打印
- 社交媒体发布

### Download 功能设计原则

- 下载是菜单创作完成后的最后一步，不打断用户填写、Generate 和模板调整流程。
- 下载按钮采用隐藏式或弱提示设计：菜单尚未生成时隐藏或保持低干扰的禁用状态；菜单生成后再显示为可操作状态。
- 下载按钮在视觉上属于辅助操作，不抢占菜单作品和 Generate 按钮的注意力。
- 生成图片时提供简短的处理中状态，避免用户重复点击；失败时给出容易理解的重试提示。
- 电脑端与移动端都应容易找到和点击下载按钮。移动端按钮应有足够大的点击区域，并放在预览及视觉调整区域附近。

### PNG 导出范围

第一版只导出右侧的 `menu-preview-card`，也就是最终菜单作品本身。

导出图片不包含：

- 左侧菜单输入区域；
- Generate 按钮；
- Menu Style 控件和模板按钮；
- Download 按钮；
- 页面标题、欢迎语及其他网页元素。

### 图片比例与未来 Export Style

第一版只提供一种统一的 `4:5` 竖版图片比例，降低选择成本并优先保证导出稳定性。

MVP 的 PNG 导出尺寸统一为：

```text
1080 × 1350 px
```

其中宽度为 1080 像素，高度为 1350 像素。

未来可以增加多个 Export Style，让用户根据使用场景选择其他尺寸或比例，例如社交媒体竖版、Story、横版和打印版等。多个 Export Style 不属于第一版 MVP。


# 9. 第一版暂不开发功能


为了保持 MVP 简洁，第一版不包含：

- 用户注册
- 登录
- 数据库存储
- 用户账户
- 在线保存历史菜单
- 支付功能
- AI 自动生成菜品
- AI 翻译
- 社区功能
- 手机 App
- Live Preview（输入时实时预览）


# 10. AI 功能未来规划


## Future：Live Preview

未来版本可以考虑提供 Live Preview。开启后，用户输入或修改菜单内容时，预览可以立即同步变化。

Live Preview 不属于第一版 MVP，不影响第一版“填写内容 → 点击 Generate → 生成预览”的核心流程。


## Version 2：AI Translation


支持：

中文输入 → 英文 Fine Dining 菜单


例如：


输入：

松露奶油意面


输出：


Handcrafted Tagliolini

with Black Truffle Cream Sauce


支持：

英文 → 中文


---

## Version 3：AI Menu Enhancement


AI 可以帮助：

- 优化菜品描述
- 调整菜单语言风格
- 推荐菜单排序
- 提供 Wine Pairing 建议


# 11. 产品设计原则（Product Principles）


## Principle 1

高级感优先。

宁愿功能少，也保持 Fine Dining 氛围。


---

## Principle 2

简单易用。

用户应该可以在几分钟内完成菜单制作。


---

## Principle 3

结果需要具有分享价值。

生成结果应该适合：

- 微信
- Instagram
- 小红书


---

## Principle 4

AI 是增强体验，而不是替代用户创造。

用户仍然是菜单创造者。


---
