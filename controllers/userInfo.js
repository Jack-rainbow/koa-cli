import {
    request,
    summary,
    body,
    tags,
    middlewares,
    path,
    description,
    orderAll,
    query
} from 'koa-swagger-decorator'

const tag = tags(['List'])

const logTime = () => async (ctx, next) => {
    //处理请求的中间拦截
    console.log(`start: ${new Date()}`)
    await next()
    console.log(`end: ${new Date()}`)
}
const getListSchema = {
    keyword: {
        type: 'string',
        required: true
    },
    status: {
        type: 'number',
        required: true
    }
}
const listSchema = {
    user_id: {
        type: 'string',
        format: 'uuid',
        required: true
    },
    content: {
        type: 'string',
        required: true
    },
    status: {
        type: 'string',
        required: true
    }
}



export default class ListController {
    @request('get', '/list/list')
    @summary('返回一个列表')
    @description('example of api')
    @tag
    @middlewares([logTime()])
    @query(getListSchema)
    static async getTodoList(ctx) {
        const data = ctx.request.query
        if (data) {
            ctx.body = global.res.format({}, 200, '成功');
            ctx.status = 200;
        } else {
            ctx.body = global.res.format({}, -1, '参数错误');
            ctx.status = 200;
        }
      
    }

    @request('post', '/list/')
    @summary('创建列表一行数据')
    @tag
    @body(listSchema)
    static async createTodoList(ctx) {
        let todoList = ctx.request.body
        if (todoList) {
            ctx.body = global.res.format({}, 200, '服务启动成功');
            ctx.status = 200;
        } else {
            ctx.body = global.res.format({}, -1, '创建失败');
            ctx.status = 200;
        }
    }

    @request('delete', '/list/{id}')
    @summary('删除一行 by id')
    @tag
    @path({
        id: {
            type: 'string',
            format: 'uuid',
            required: true
        }
    })
    static async destroyTodoList(ctx) {
        const {
            id
        } = ctx.validatedParams
        if (id) {
            ctx.body = {
                code: 1,
                message: '成功'
            }
        } else {
            ctx.body = {
                code: -1,
                message: '失败'
            }
        }
    }

}