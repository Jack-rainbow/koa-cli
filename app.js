import Koa from 'koa';
import json from 'koa-json';
import koaBody from 'koa-body';
import cors from 'koa-cors';
import accessLogger from './middleware/logs'; // 日志输出
import signale from './config/signale'; // shell输出美化
import InitManager from './routes';
import Parameter from 'koa-parameter';
import {
  CustomError,
  HttpError
} from './middleware/error/customError'
import {
  format
} from './middleware/error/response'
import catchError from './middleware/exception'
import constants from './middleware/error/constants'

const app = new Koa()
Parameter(app)

app
  .use(accessLogger()) // !  日志服务
  .use(catchError)
  .use(cors()) // ! 跨域服务
  .use(json())
  .use(koaBody())
  .use((ctx, next) => {
    return next().catch((err) => {
      let code = 500
      let msg = 'unknown error'
      if (err instanceof CustomError || err instanceof HttpError) {
        const res = err.getCodeMsg()
        ctx.status = err instanceof HttpError ? res.code : 200
        code = res.code
        msg = res.msg
      } else {
        ctx.status = code
        console.error('err', err)
      }
      ctx.body = format({}, code, msg)
    })
  })
// 路由监听事件之后先注册body，再注册router.routes()，最后监听3000端口
InitManager.initCore(app); // ! 自动注入接口路由

app.use(async () => { // 404
    throw new HttpError(constants.HTTP_CODE.NOT_FOUND)
  })
  .on('error', (err, ctx) => {
    // ! shell 启动失败
    signale.fatal('server error', err, ctx)
  })
  .listen(() => {
    signale.success('服务启动完成，访问 http://localhost:8888')
  })


module.exports = app