const fs = require("fs");
const {
    resolve
} = require("path")
//这里很重要，区别环境变量，确定调用是 dist/controller （编译后），还是调用 src/controller （开发）
// let entryPath = process.env.NODE_ENV === "development" ? "src" : "dist";
let controllerPath = resolve(__dirname, '../../../controllers');
//对外导出一个函数，并接收app 实例作为参数，
module.exports = (App) => {
    let loadCtroller = (rootPaths) => {
        try {
            var allfile = fs.readdirSync(rootPaths); //加载目录下的所有文件进行遍历
            allfile.forEach((file) => {
                var filePath = resolve(rootPaths, file) // 获取遍历文件的路径

                if (fs.lstatSync(filePath).isDirectory()) { //判断该文件是否是文件夹，如果是递归继续遍历读取文件
                    loadCtroller(filePath)
                } else {
                    //如果是文件就使用require 导入，（controller下文件都是对外导出的class),在使用 @controller 装饰函数的时候,将koa-router 的实例作为装饰对象class 的静态属性 　
                    let r = require(filePath);
                    if (r && r.router && r.router.routes) { //如果有koa-routr 的实例说明装饰成功，直接调用app.use()
                        try {
                            App
                                .use(r.router.routes())
                        } catch (error) {
                            console.log(filePath)
                        }
                    } else {
                        // console.log("miss routes:--filename:"+filePath)
                    }
                }
            })
        } catch (error) {
            console.log(error)
            console.log("no such file or dir :---- " + rootPaths)
        }
    }
    //调用自动加载路由
    loadCtroller(controllerPath);
}