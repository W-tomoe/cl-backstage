import { baseUrl } from "../http/config";
import axios from '@/http/http.js'
import Cookies from 'js-cookie'


const setCookie = (key, value, time) => {
    Cookies.set(key, value, time)
}


const getCookie = (key) => {

    let val = Cookies.get(key)

    return new Promise((resolve, reject) => {
        if(val) {
            resolve(val)
        }else {
            reject()
        }
    })
}


const clearCookie =  (key) => {
    Cookies.remove(key)
}

const formatDateTime = function (time, format) {
    var t = new Date(time);
    var tf = function (i) {
        return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
}


const download = function (url) {

    /* if (/\?/.test(url)) {
        url += '&adminToken=' + Cookies.get('adminToken');
    } else {
        url += '?adminToken=' + Cookies.get('adminToken');
    } */

    var elemIF = document.createElement("iframe")
    elemIF.src = baseUrl + url
    elemIF.style.display = "none"
    document.body.appendChild(elemIF)
}


// 获得指定时间 @type day:当天 week:当周 moth:当月

//补齐0
function formatNumber(n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}

// 获得本月天数
function getCountDays() {
    var curDate = new Date();
    var curMonth = curDate.getMonth();
    curDate.setMonth(curMonth + 1);
    curDate.setDate(0);
    return curDate.getDate();
}

// 获得上个月天数
function getPreDays() {
    var curDate = new Date();
    var curMonth = curDate.getMonth() - 1;
    curDate.setMonth(curMonth + 1);
    curDate.setDate(0);
    return curDate.getDate();
}



export function formatDateType(type) {

    let newTime = new Date()
    let year = newTime.getFullYear()
    let month = newTime.getMonth() + 1
    let day = newTime.getDate()
    let nowDayOfWeek = newTime.getDay()

    let startDay =  day  - nowDayOfWeek
    let endDay = day + (6 - nowDayOfWeek)

    let startMoth = month
    let endMoth = month

    let startYear = year
    let endYear = year


    let transfromTime

    switch(type) {
        case 'day': 
            transfromTime = {
                'beginDateStr':[year, month, day].map(formatNumber).join('-'),
                'endDateStr':[year, month, day].map(formatNumber).join('-')
            }
            break;
        case 'week': 
            if(endDay > getCountDays() ) {
                endDay = endDay - getCountDays()
                endMoth = startMoth + 1
            }

            if(startDay < 0) {
                startDay = getPreDays() - Math.abs(day  - nowDayOfWeek)
                startMoth = month - 1
                if(month == 1) {
                    startYear = year - 1
                    startMoth = '12'
                }
            }

            transfromTime = {
                'beginDateStr':[startYear, startMoth, startDay + 1].map(formatNumber).join('-'),
                'endDateStr':[endYear, endMoth, endDay + 1].map(formatNumber).join('-')
            }
            break;
        case 'moth': 
            startDay = '1'
            endDay = getCountDays()
            transfromTime = {
                'beginDateStr':[year, month, startDay].map(formatNumber).join('-'),
                'endDateStr':[year, month, endDay].map(formatNumber).join('-')
            }
            break;
    }

    return transfromTime
}



export default {
    formatDateType,
    download,
    setCookie,
    getCookie,
    clearCookie
}
