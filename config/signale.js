// 日志输出美化
// https://github.com/klaussinani/signale/blob/master/docs/readme.zh_CN.md
import {
    Signale
}
from 'signale'
const options = {
    disabled: false,
    interactive: false,
    logLevel: 'info',
    secrets: [],
    stream: process.stdout,
    types: {
        remind: {
            badge: '**',
            color: 'yellow',
            label: 'reminder',
            logLevel: 'info'
        },
        santa: {
            badge: '🎅',
            color: 'red',
            label: 'santa',
            logLevel: 'info'
        },
        error: {
            badge: '🔥',
            label: 'error'
        },
        success: {
            badge: '☘',
            label: 'success'
        }
    }
}
module.exports =  new Signale(options);
