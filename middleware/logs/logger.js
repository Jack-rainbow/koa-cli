
import log4js from 'log4js';
import access from './access.js';
import {baseInfo} from "@/config/log.js";

const methods = ["trace", "debug", "info", "warn", "error", "fatal", "mark"]


module.exports = (options) => {
    const contextLogger = {};
    const appenders = {};
    const opts = Object.assign({}, baseInfo, options || {});
    const {
         env,
         appLogLevel,
         dir,
         serverIp,
         projectName
    } = opts;
    const commonInfo = {
        projectName,
        serverIp
    }
    if (env === "dev" || env === "local" || env === "development") {
        appenders.out = {
            type: "console"
        }
    } else {
         appenders.cheese = {
             type: 'dateFile',
             filename: `${dir}`,
             pattern: '-yyyy-MM-dd.log',
             alwaysIncludePattern: true
         }
    }
    let config = {
         appenders,
         categories: {
             default: {
                 appenders: Object.keys(appenders),
                 level: appLogLevel
             }
         }
    }
    const logger = log4js.getLogger('cheese');
    return async (ctx, next) => {
        const start = Date.now();
        log4js.configure(config)
        methods.forEach((method, i) => {
            contextLogger[method] = (message) => {
                logger[method](message)
            }
        })
        ctx.log = contextLogger;
        await next();
        const responseTime = Date.now() - start;
        logger.info(access(ctx, {
            responseTime: `响应时间为${responseTime/1000}s`
        }, commonInfo))
    }
}