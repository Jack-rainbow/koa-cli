class InitManager {
    static initCore(app) {
        //把app.js中的koa实例传进来
        InitManager.app = app;
        InitManager.loadHttpException();
        InitManager.loadResponse();
        InitManager.loadConfig()
    }

    //全局注册httpCode
    static loadHttpException() {
        const errors = require('../middleware/http-exception/index');
        global.errs = errors;
    }
    //全局注册res模板
    static loadResponse() {
        const response = require('../middleware/error/response');
        global.res = response
    }
    //全局注册配置
    static loadConfig(path = '') {
        const configPath = path || process.cwd() + '/config/database.js';
        const config = require(configPath);
        global.config = config;
    }

}
module.exports = InitManager;

