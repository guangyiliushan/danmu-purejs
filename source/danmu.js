
function addDanmu(){
    //选择要添加弹幕的界面或div
    var Pages =document.getElementById("your_Pages")
    //添加弹幕列表
    var danmuList=["your_danmu"];


    var recommend = document.createElement("div");
    recommend.className = 'marquee-container';
    Pages.appendChild(recommend);

    let barrageList = [];
    const lineHeight = 40; // 每行的高度
    const maxLines = Math.floor(recommend.clientHeight / lineHeight); // 最大行数
    const delayBetween = 1000; // 弹幕之间的时间间隔（毫秒）
    const speed = 200; // 统一的移动速度
    const maxBarrageCount = 10; // 最大同时显示的弹幕数量    

    const createBarrage = (option) => {
        const { root, value, left, top } = option;
        const div = document.createElement('div');
        div.className = 'danmu'; // 添加类名以应用样式
        div.innerHTML = value;
        div.setAttribute('style', 'position: absolute; left: ' + left + 'px; top: ' + top + 'px;');
        root.appendChild(div);
        const currentBarrageWidth = div.getBoundingClientRect().width;
        animateBarrage(div, currentBarrageWidth);
        return div; // 返回弹幕元素
    };

    const push = (value) => {
        const root = recommend;
        let left = document.documentElement.clientWidth + 100; // 初始位置
        let top;
        let attempts = 0;
        const usedLines = new Set(); // 用于存储已经使用过的行
    
        // 获取当前已使用的行
        barrageList.forEach(div => {
            const divTop = div.offsetTop; // 使用 offsetTop 获取相对于父元素的顶部位置
            const lineIndex = Math.floor(divTop / lineHeight); // 计算行索引
            usedLines.add(lineIndex);
        });
    
        // 尝试找到合适的行
        while (attempts < 10) {
            top = Math.floor(Math.random() * maxLines) * lineHeight; // 随机选择行
            const lineIndex = Math.floor(top / lineHeight); // 计算行索引
    
            // 创建一个临时弹幕以获取其宽度
            const tempDiv = document.createElement('div');
            tempDiv.style.position = 'absolute';
            tempDiv.style.visibility = 'hidden';
            tempDiv.innerHTML = value;
            root.appendChild(tempDiv);
            const currentBarrageWidth = tempDiv.getBoundingClientRect().width; // 获取当前弹幕的宽度
            root.removeChild(tempDiv); // 移除临时弹幕
            const isTooClose = (top, left, currentBarrageWidth) => {
                return barrageList.some(div => {
                    const divTop = div.offsetTop; // 获取现有弹幕的顶部位置
                    const divLeft = div.offsetLeft; // 获取现有弹幕的左侧位置
                    const divBottom = divTop + lineHeight; // 现有弹幕的底部位置
                    const divRight = divLeft + div.getBoundingClientRect().width; // 现有弹幕的右侧位置
            
                    // 新弹幕的边界
                    const newBarrageBottom = top + lineHeight; // 新弹幕的底部位置
                    const newBarrageRight = left + currentBarrageWidth; // 新弹幕的右侧位置
            
                    // 检查上下和左右是否重叠
                    const verticalOverlap = (top < divBottom && newBarrageBottom > divTop); // 上下重叠
                    const horizontalOverlap = (left < divRight && newBarrageRight > divLeft); // 左右重叠
            
                    return verticalOverlap && horizontalOverlap; // 如果上下和左右都重叠，则返回 true
                });
            };
            // 检查新弹幕与现有弹幕之间的距离
            if (!usedLines.has(lineIndex) && !isTooClose(top, left, currentBarrageWidth)) {
                const options = {
                    root,
                    value,
                    left,
                    top,
                };
                const newBarrage = createBarrage(options); // 创建新的弹幕并获取其引用
                barrageList.push(newBarrage); // 将新弹幕添加到列表中
                return; // 成功添加弹幕后退出
            }
            attempts++;
        }
    };

    // 随机打乱推荐列表
    const getShuffledList = () => {
        return [...danmuList].sort(() => Math.random() - 0.5); // 复制并打乱推荐列表
    };
    let shuffledList = getShuffledList(); // 初始化打乱的推荐列表

    // 添加弹幕
    const addNextBarrages = () => {
        if (barrageList.length < maxBarrageCount) {
            const nextBarrage = shuffledList.pop(); // 获取下一个弹幕内容
            if (nextBarrage) {
                push(nextBarrage); // 添加弹幕
            } else {
                // 如果推荐列表用尽，重新打乱
                shuffledList = getShuffledList();
            }
        }
    };

    setInterval(addNextBarrages, delayBetween); // 定时添加弹幕

    const animateBarrage = (div, currentBarrageWidth) => {
        const dis = document.documentElement.clientWidth + currentBarrageWidth + 100; // 100px的间距
        const time = (dis / speed).toFixed(2); // 计算从右侧移出屏幕的时间

        div.style.transition = `transform ${time}s linear`;
        div.style.transform = `translateX(-${dis}px)`;

        // 动画结束后移除弹幕元素并更新弹幕列表
        div.addEventListener('transitionend', () => {
            div.remove();
            barrageList = barrageList.filter(barrage => barrage !== div); // 更新弹幕列表
        });
    };
}
