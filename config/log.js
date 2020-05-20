import  path from "path";
const baseInfo = {
    appLogLevel: 'debug',
    dir: path.resolve('./logList/access/', 'access'),
    env: 'dev', // dev || local || development 控制台输出日志/文件输出
    projectName: 'koa2-log',
    serverIp: '0.0.0.0'
}

module.exports = {
    baseInfo
}