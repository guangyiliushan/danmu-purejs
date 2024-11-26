var year, month, day ,weekday , hour, minute, second;
var date= new Date();
function displayCurrentTime() {
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    weekday = date.getDay();
    hour = date.getHours();
    minute = date.getMinutes();
    second = date.getSeconds();
    switch(weekday){
        case 1:
            weekday="星期一";
            break;
        case 2:
            weekday="星期二";
            break;
        case 3:
            weekday="星期三";
            break;
        case 4:
            weekday="星期四";
            break;
        case 5:
            weekday="星期五";
            break;
        case 6:
            weekday="星期六";
            break;
        case 0:
            weekday="星期日";
            break;
        default:
            weekday="Invalid day";
            break;
    }
    formattedDateTime = '现在是' + year + '年' + month + '月' + day + '日' + weekday + '现在是' + hour + '点' + minute + '分' + second + '秒';
    document.getElementById('timeNow').innerHTML =formattedDateTime;
}
setInterval(displayCurrentTime, 1000);