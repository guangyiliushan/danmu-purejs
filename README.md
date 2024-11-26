# 使用JavaScript来实现弹幕滚动效果

这是一个简单的网页弹幕功能实现，允许用户在网页上动态显示弹幕消息。

---

## 功能描述

- 创建弹幕容器
- 打乱弹幕消息列表
- 定时添加弹幕
- 弹幕动画效果
- 自动移除屏幕外的弹幕

## 代码结构

- addDanmu：主函数，负责初始化弹幕容器和定时添加弹幕。
- createBarrageContainer：创建弹幕容器的函数。
- getShuffledList：打乱弹幕列表的函数。
- addNextBarrages：添加下一个弹幕的函数。
- getBarrageList：获取当前弹幕列表的函数。
- pushBarrage：推送弹幕到容器的函数。
- isTooClose：检查弹幕是否太接近的函数。
- createBarrage：创建单个弹幕元素的函数。
- animateBarrage：给弹幕添加动画效果的函数。

## 注意事项

- 确保弹幕容器的CSS样式正确设置，以便弹幕可以正确显示。
- 根据需要调整弹幕的速度和间隔，以获得最佳效果。
- 本弹幕功能依赖于现代浏览器的JavaScript和CSS功能。

## 维护和自定义

- 弹幕消息列表：修改danmuList数组来自定义弹幕消息，或者通过在其他函数中获取。
- 弹幕行为：调整LINE_HEIGHT、DELAY_BETWEEN、SPEED和MAX_BARRAGE_COUNT等常量来改变弹幕的行为。
- 使用IIFE文件可能可以解决代码冲突问题。

