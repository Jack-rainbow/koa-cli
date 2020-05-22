
import {Controller,GET} from '@/routes/lib/decoratorRouter'

//已全局定义公共前缀api故无需改动
@Controller("")
class index {
    @GET("/a")
    async index(ctx, next) {
         ctx.body = global.res.format({}, 200, 'succ')
         ctx.status = 200
    }
    @GET("/add")
    async add(ctx, next) {
        ctx.body = global.res.format({}, 200, 'succ')
        ctx.status = 200
    }
}

module.exports = index;
