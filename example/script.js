var bookList = [];
var recommendList = [
    '《养蜂人之死》 拉斯•古斯塔夫松',
    '《地球星人》 村田沙耶香',
    '《海边的卡夫卡》 村上春树',
    '《人间便利店》 村田沙耶香',
    '《我的奋斗》 阿道夫·希特勒',
    '《龙族》 江南',
    '《我的26岁女房客》 超级大坦克科比',
    '《金阁寺》 三岛由纪夫',
    '《罗生门》 芥川龙之介',
    '《百年孤独》 加西亚·马尔克斯',
    '《海风中失落的血色馈赠》 阿利斯泰尔·麦克劳德',
    '《雪国》 川端康成',
    '《悉达多》 黑塞',
    '《查拉图斯特拉如是说》 尼采',
    '《局外人》 阿尔贝·加缪',
    '《生命式》 村田沙耶香',
    '《蛊真人》 蛊真人',
    '《道诡异仙》 狐尾的笔',
    '《窄门》 安德烈·纪德',
    '《面纱》 毛姆',
    '《双重螺旋》 上官云吞',
    '《一九八四》 乔治·奥威尔',
    '《美丽新世界》 阿道司·赫胥黎',
    '《挪威的森林》 村上春树',
    '《偶像失格》 宇佐见铃',
    '《追忆似水年华》 马塞尔·普鲁斯特'
];
var mainBox = document.getElementById("main");

function showMainPage() {
    mainBox.innerHTML = '';
    var mainPage = document.createElement("div");
    mainPage.id = 'mainPage';
    mainPage.innerHTML = "首页荐书";
    mainBox.appendChild(mainPage);
    
    var recommend = document.createElement("div");
    recommend.className = 'marquee-container';
    mainPage.appendChild(recommend);

    let barrageList = [];
    const lineHeight = 40; // 每行的高度
    const maxLines = Math.floor(recommend.clientHeight / lineHeight); // 最大行数
    const minDistance = 200; // 弹幕之间的最小水平距离（px）已弃用
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
    const getShuffledRecommendList = () => {
        return [...recommendList].sort(() => Math.random() - 0.5); // 复制并打乱推荐列表
    };
    let shuffledRecommendList = getShuffledRecommendList(); // 初始化打乱的推荐列表

    // 添加弹幕
    const addNextBarrages = () => {
        if (barrageList.length < maxBarrageCount) {
            const nextBarrage = shuffledRecommendList.pop(); // 获取下一个弹幕内容
            if (nextBarrage) {
                push(nextBarrage); // 添加弹幕
            } else {
                // 如果推荐列表用尽，重新打乱
                shuffledRecommendList = getShuffledRecommendList();
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

function updateActiveClass(activeElement) {
    var buttons = document.querySelectorAll("#showBookMode p");
    buttons.forEach(function (button) {
        button.classList.remove("active");
    });
    activeElement.classList.add("active");
}

function addBookBox(i) {
    var defaultBtn = document.getElementById("default");
    var bookListBox = document.getElementById("bookListBox");
    var book = bookList[i];
    var bookBox = document.createElement("div");
    bookBox.className = "bookCard";
    var changeStateButton = document.createElement("button");
    changeStateButton.innerHTML = book.state ? "已读" : "未读";
    changeStateButton.addEventListener("click", (function (book, index) {
        return function () {
            book.state = !book.state;
            updateActiveClass(defaultBtn);
            showBooks();
        };
    })(book, i));
    var bookDeleteButton = document.createElement("button");
    bookDeleteButton.innerHTML = "删除";
    bookDeleteButton.addEventListener("click", (function (book, index) {
        return function () {
            bookList.splice(index, 1);
            updateActiveClass(defaultBtn);
            showBooks();
        };
    })(book, i));

    bookListBox.appendChild(bookBox);

    var nameDiv = document.createElement("div");
    nameDiv.className = 'nameDiv';
    nameDiv.innerHTML = book.name;
    bookBox.appendChild(nameDiv);

    var authorDiv = document.createElement("div");
    authorDiv.className = 'authorDiv';
    authorDiv.innerHTML = book.author;
    bookBox.appendChild(authorDiv);

    var yearDiv = document.createElement("div");
    yearDiv.className = 'yearDiv';
    yearDiv.innerHTML = book.year + "年出版";
    bookBox.appendChild(yearDiv);

    var buttonDiv = document.createElement("div");
    buttonDiv.className = 'buttonDiv';
    buttonDiv.appendChild(changeStateButton);
    buttonDiv.appendChild(bookDeleteButton);
    bookBox.appendChild(buttonDiv);
}

function showBooks(showMode = 0) {
    var showBookList = document.getElementById("showBookList");
    showBookList.innerHTML = "";
    var bookListBox = document.createElement("div");
    bookListBox.id = "bookListBox";
    showBookList.appendChild(bookListBox);
    switch (showMode) {
        case 0:
            // bookListBox.innerHTML = "所有书籍";
            for (var i = 0; i < bookList.length; i++) {
                addBookBox(i);
            }
            break;
        case 1:
            // bookListBox.innerHTML = "已读书籍";
            for (var i = 0; i < bookList.length; i++) {
                if (bookList[i].state) {
                    addBookBox(i);
                }
            }
            break;
        case 2:
            // bookListBox.innerHTML = "未读书籍";
            for (var i = 0; i < bookList.length; i++) {
                if (!bookList[i].state) {
                    addBookBox(i);
                }
            }
            break;
    }
}

function addBook(bookName, bookAuthor, bookYear, bookState = false) {
    var book = {
        name: bookName,
        author: bookAuthor,
        year: bookYear,
        state: bookState
    };
    bookList.push(book);
    alert("添加成功!");
}

function openAddBookPage() {
    mainBox.innerHTML = "";
    var addBookPage = document.createElement("div");
    addBookPage.id = "addBookPage";
    mainBox.appendChild(addBookPage);

    var bookNameBox = document.createElement("div");
    bookNameBox.id = "bookNameBox";
    addBookPage.appendChild(bookNameBox);
    var bookNameLabel = document.createElement("label");
    bookNameLabel.for = "name";
    bookNameLabel.innerHTML = "书名:";
    bookNameBox.appendChild(bookNameLabel);
    var bookNameInput = document.createElement("input");
    bookNameInput.type = 'text';
    bookNameInput.id = 'name';
    bookNameInput.name = 'bookName';
    bookNameInput.required = true;
    bookNameBox.appendChild(bookNameInput);

    var bookAuthorBox = document.createElement("div");
    bookAuthorBox.id = "bookAuthorBox";
    addBookPage.appendChild(bookAuthorBox);
    var bookAuthorLabel = document.createElement("label");
    bookAuthorLabel.for = 'author';
    bookAuthorLabel.innerHTML = "作者:";
    bookAuthorBox.appendChild(bookAuthorLabel);
    var bookAuthorInput = document.createElement("input");
    bookAuthorInput.type = 'text';
    bookAuthorInput.id = 'author';
    bookAuthorInput.name = 'bookAuthor';
    bookAuthorInput.required = true;
    bookAuthorBox.appendChild(bookAuthorInput);

    var bookYearBox = document.createElement("div");
    bookYearBox.id = "bookYearBox";
    addBookPage.appendChild(bookYearBox);
    var bookYearLabel = document.createElement("label");
    bookYearLabel.for = 'year';
    bookYearLabel.innerHTML = "出版年份:";
    bookYearBox.appendChild(bookYearLabel);
    var bookYearInput = document.createElement("input");
    bookYearInput.type = 'number';
    bookYearInput.id = 'year';
    bookYearInput.name = 'bookYear';
    bookYearInput.required = true;
    bookYearBox.appendChild(bookYearInput);

    var bookStateBox = document.createElement("div");
    bookStateBox.id = "bookStateBox";
    addBookPage.appendChild(bookStateBox);
    var bookStateLabel = document.createElement("label");
    bookStateLabel.for = 'state';
    bookStateLabel.innerHTML = "是否已读:";
    bookStateBox.appendChild(bookStateLabel);
    var bookStateInput = document.createElement("input");
    bookStateInput.type = 'checkbox';
    bookStateInput.id = 'state';
    bookStateInput.name = 'bookState';
    bookStateBox.appendChild(bookStateInput);

    var btnBox = document.createElement("div")
    btnBox.id = "btnBox";
    addBookPage.appendChild(btnBox);
    var btn = document.createElement("button");
    btn.innerHTML = "提交";
    btnBox.appendChild(btn);

    btn.addEventListener("click", function () {
        var name = bookNameInput.value.trim();
        var author = bookAuthorInput.value.trim();
        var year = bookYearInput.value.trim();
        var state = bookStateInput.checked;
        if (!name || !author || !year) {
            alert("请填写所有必填字段！");
            return;
        }
        addBook(name, author, year, state);
        bookNameInput.value = '';
        bookAuthorInput.value = '';
        bookYearInput.value = '';
        bookStateInput.checked = false;
    });
}

function showMyBooks() {
    mainBox.innerHTML = "";

    var showBookMode = document.createElement("div");
    showBookMode.id = "showBookMode";
    mainBox.appendChild(showBookMode);

    var showBookList = document.createElement("div");
    showBookList.id = "showBookList";
    mainBox.appendChild(showBookList);

    var textbtn = document.createElement("p");
    textbtn.id = "default";
    textbtn.innerHTML = "全部";
    textbtn.classList.add("active");
    textbtn.addEventListener("click", function () {
        showBooks(0);
        updateActiveClass(textbtn);
    });
    showBookMode.appendChild(textbtn);

    var textbtn1 = document.createElement("p");
    textbtn1.innerHTML = "未读";
    textbtn1.addEventListener("click", function () {
        showBooks(2);
        updateActiveClass(textbtn1);
    });
    showBookMode.appendChild(textbtn1);

    var textbtn2 = document.createElement("p");
    textbtn2.innerHTML = "已读";
    textbtn2.addEventListener("click", function () {
        showBooks(1);
        updateActiveClass(textbtn2);
    });
    showBookMode.appendChild(textbtn2);

    showBooks();
}