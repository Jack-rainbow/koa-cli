import requireDirectory from 'require-directory';
import Router from 'koa-router';


class InitManager {
    static initCore(app) {
        //把app.js中的koa实例传进来
        InitManager.app = app;
        InitManager.initLoadRouters();
        InitManager.loadHttpException();
        InitManager.loadResponse();
        InitManager.loadConfig()
    }
    //全局注册路由
    static initLoadRouters() {
        //注意这里的路径是依赖于当前文件所在位置的
        //最好写成绝对路径 ${process.cwd()}
        const apiDirectory = `../controllers`
        requireDirectory(module, apiDirectory, {
            visit: whenLoadModule //visit将添加到module.exports的每个模块调用的选项
        });
        
        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes(), obj.allowedMethods())
            } 
        }
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