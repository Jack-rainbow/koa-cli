const koaRouter = require("koa-router");
const router = new koaRouter();

//公共前缀
const routerPrefix = "/api"
//声明所有接口的方式的映射，下面会用到


const RequestMethod = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete',
    ALL: "all"
}


//定义controller 的函数，这是装饰类class 的函数，接受一个参数（和路由前缀并接一起）
function Controller(prefix) {
    router.prefixed = routerPrefix + (prefix ? prefix.replace(/\/+$/g, "") : '');
    //对 类 class 进行拦截操作，返回一个函数，该函数实际接受三个参数（拦截目标targer,目标的key，key 的描述）
    return (target) => {
            //把路由router 挂载在拦截目标，作为静态属性
            target.router = router;
            //实例化该类 class
            let obj = new target; 
            // 获取该实例下的所有实例方法，进行 迭代调用，除了构造函数 和一个前置函数（后面会说得如何实现和作用）
            let actionList = Object.getOwnPropertyDescriptors(target.prototype);
        for (let key in actionList) {
            if (key !== "constructor") {
                var fn = actionList[key].value;
                if (typeof fn == "function" && fn.name != "__before") {
                    fn.call(obj, router, obj); //保证在类中能正确访问this,调用该方法是用call,还有两个参数是 router 和 obj 实例
                }

            }
        }
    }
}

//该装饰函数接受两个参数，请求url 和请求方式
function Request(option = {
    url,
    method
}) {
        //拦截该实例方法，参数三个
        return function (target, value, dec) {
                //声明fn 缓存原来的 函数体 dev.value
                let fn = dec.value; 
                //然后重写该函数，参数两个，在 controller 装饰类的时候自动调用转入的两个参数
                dec.value = (routers, targets) => {

                    //这里，才是真正调用koa-router 路由的时候
                    routers[option.method](routers.prefixed + option.url, async (ctx, next) => {
                        //这里写了一个前置函数，判断前置函数存在
                        if (target.__before && typeof target.__before == "function") {
                            // 如果class 有__before 前置函数，//再默认装饰一次
                            var beforeRes = await target.__before.call(target, ctx, next, target);
                            //前置函数如果没有返回内容，继续执行实例方法，否则直接响应 body,不执行实例方法
                            if (!beforeRes) {
                                return await fn.call(target, ctx, next, target)
                            } else {
                                return ctx.body = await beforeRes
                            }
                        } else {
                            // 没有前置函数，直接调回原来的实例函数执行，使用call ，传入的参数就有ctx,next,实例targe
                            await fn.call(target, ctx, next, target)
                        }
                    })
                }

        }
}

// post 请求
function POST(url) {
    return Request({
        url,
        method: RequestMethod.POST
    })
}
//get 请求
function GET(url) {
    return Request({
        url,
        method: RequestMethod.GET
    })
}
//PUT 请求
function PUT(url) {
    return Request({
        url,
        method: RequestMethod.PUT
    })
}
//DEL请求
function DEL(url) {
    return Request({
        url,
        method: RequestMethod.DELETE
    })
}
//ALL 请求
function ALL(url) {
    return Request({
        url,
        method: RequestMethod.ALL
    })
}

module.exports = {
    Controller,
    POST,
    GET,
    PUT,
    DEL,
    ALL
}