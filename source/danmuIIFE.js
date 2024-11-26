(function() {
    const DANMU_CONTAINER_ID = "your_Pages";
    const DANMU_LIST = ["your_danmu"];
    const LINE_HEIGHT = 40; // 每行的高度
    const DELAY_BETWEEN = 1000; // 弹幕之间的时间间隔（毫秒）
    const SPEED = 200; // 统一的移动速度
    const MAX_BARRAGE_COUNT = 10; // 最大同时显示的弹幕数量

    // 主函数
    function addDanmu() {
        const container = document.getElementById(DANMU_CONTAINER_ID);
        const barrageContainer = createBarrageContainer(container);
        let barrageList = [];
        let shuffledList = getShuffledList(DANMU_LIST);

        setInterval(() => {
            addNextBarrages(barrageContainer, barrageList, shuffledList);
        }, DELAY_BETWEEN);
    }

    // 创建弹幕容器
    function createBarrageContainer(container) {
        const barrageContainer = document.createElement("div");
        barrageContainer.className = 'marquee-container';
        container.appendChild(barrageContainer);
        return barrageContainer;
    }

    // 获取打乱的弹幕列表
    function getShuffledList(danmuList) {
        return [...danmuList].sort(() => Math.random() - 0.5);
    }

    // 添加下一个弹幕
    function addNextBarrages(container, barrageList, shuffledList) {
        if (barrageList.length < MAX_BARRAGE_COUNT) {
            const nextBarrage = shuffledList.pop();
            if (nextBarrage) {
                pushBarrage(container, nextBarrage, barrageList);
            } else {
                shuffledList = getShuffledList(DANMU_LIST); // 重新打乱列表
            }
        }
    }

    // 推送弹幕
    function pushBarrage(container, value, barrageList) {
        let left = window.innerWidth + 100; // 初始位置
        let top;
        const usedLines = new Set();

        // 获取已使用的行
        barrageList.forEach(div => {
            const lineIndex = Math.floor(div.offsetTop / LINE_HEIGHT);
            usedLines.add(lineIndex);
        });

        for (let attempts = 0; attempts < 10; attempts++) {
            top = Math.floor(Math.random() * Math.floor(container.clientHeight / LINE_HEIGHT)) * LINE_HEIGHT;
            const lineIndex = Math.floor(top / LINE_HEIGHT);

            // 创建一个临时弹幕以获取其宽度
            const tempDiv = createTempBarrage(container, value);
            const currentBarrageWidth = tempDiv.getBoundingClientRect().width;
            container.removeChild(tempDiv); // 移除临时弹幕

            if (!usedLines.has(lineIndex) && !isTooClose(barrageList, top, left, currentBarrageWidth)) {
                const options = { root: container, value, left, top };
                const newBarrage = createBarrage(options, barrageList);
                barrageList.push(newBarrage);
                return; // 成功添加弹幕后退出
            }
        }
    }

    // 创建临时弹幕以获取宽度
    function createTempBarrage(container, value) {
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.visibility = 'hidden';
        tempDiv.innerHTML = value;
        container.appendChild(tempDiv);
        return tempDiv;
    }

    // 检查是否太接近
    function isTooClose(barrageList, top, left, currentBarrageWidth) {
        return barrageList.some(div => {
            const divTop = div.offsetTop;
            const divLeft = div.offsetLeft;
            const divBottom = divTop + LINE_HEIGHT;
            const divRight = divLeft + div.getBoundingClientRect().width;

            const newBarrageBottom = top + LINE_HEIGHT;
            const newBarrageRight = left + currentBarrageWidth;

            return (top < divBottom && newBarrageBottom > divTop) &&
                   (left < divRight && newBarrageRight > divLeft);
        });
    }

    // 创建弹幕
    function createBarrage({ root, value, left, top }, barrageList) {
        const div = document.createElement('div');
        div.className = 'danmu';
        div.innerHTML = value;
        div.style.cssText = `position: absolute; left: ${left}px; top: ${top}px;`;
        root.appendChild(div);
        animateBarrage(div, div.getBoundingClientRect().width, barrageList);
        return div;
    }

    // 动画弹幕
    function animateBarrage(div, currentBarrageWidth, barrageList) {
        const dis = window.innerWidth + currentBarrageWidth + 100; // 100px的间距
        const time = (dis / SPEED).toFixed(2); // 计算从右侧移出屏幕的时间

        div.style.transition = `transform ${time}s linear`;
        div.style.transform = `translateX(-${dis}px)`;

        // 动画结束后移除弹幕元素并更新弹幕列表
        div.addEventListener('transitionend', () => {
            div.remove();
            barrageList = barrageList.filter(barrage => barrage !== div); // 更新弹幕列表
        });
    }

    // 启动弹幕功能
    addDanmu();
})();