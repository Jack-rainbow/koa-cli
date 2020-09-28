
import Router from 'koa-router';
import UserInfoModel from '@mo/models/userInfo';
import jsonwebtoken from 'jsonwebtoken';
import md5 from 'md5';
const router = new Router(
//     {
//     prefix: '/api/v1'
// }
)
router.get('/user', async (ctx) => {
    ctx.body = global.res.format({}, 200, '服务启动成功')
    ctx.status = 200
})
// router.post('/userInfo/create',auth, async ctx => {
//     let req = ctx.request.body;
//     if (!!req.email && !!req.password) {
//         try {
//             const email = await UserInfoModel.getUserEmail(req.email);
//             if (email) {
//                 ctx.response.status = 400;
//                 ctx.body = {
//                     code: 400,
//                     msg: '邮箱存在',
//                     data: null
//                 }
                
//             } else {
//                 await UserInfoModel.register(req);
//                 ctx.response.status = 200;
//                 ctx.body = {
//                     code: 200,
//                     msg: '注册成功',
//                     data: true
//                 }
//             }


//         } catch (err) {
//             ctx.response.status = 500;
//             ctx.body = {
//                 code: 500,
//                 msg: '注册失败',
//                 data: err
//             }
//         }
//     } else {
//         ctx.response.status = 400;
//         ctx.body = {
//             code: 400,
//             msg: '参数不齐全'
//         }
//     }
// })

// router.post('/userInfo/:email',auth,  async ctx => {
//     let {
//         email,
//         password
//     } = ctx.request.body;
//     if (!!email  && !!password) {
//         try {
//             const res = await UserInfoModel.getUserEmail(email);
//             if (res) {
//                 await UserInfoModel.updatePass(email, password);
//                 ctx.response.status = 200;
//                 ctx.body = {
//                     code: 200,
//                     msg: '密码修改成功',
//                     data: true
//                 }
//             } else {
//                 ctx.response.status = 400;
//                 ctx.body = {
//                     code: 400,
//                     msg: '密码修改失败',
//                     data: false
//                 }
//             }

//         } catch (err) {
//             ctx.response.status = 500;
//             ctx.body = {
//                 code: 500,
//                 msg: '失败',
//                 data: err
//             }
//         }
//     } else {
//         ctx.response.status = 400;
//         ctx.body = {
//             code: 400,
//             msg: '参数不齐全'
//         }
//     }
// })

// router.post('/login', async ctx => {
//     let {
//         email,
//         password
//     } = ctx.request.body;
//     ctx.verifyParams({
//         email: {type: 'string', required: true},
//         password: {type: 'string', required: true}
//     });
//     if (!!email && !!password) {
//         try {
//             const dataValues = await UserInfoModel.usreLogin({
//                 email,
//                 password
//             });
//             const verifyEmail  = await UserInfoModel.getUserEmail(email);
//             if (md5(dataValues.password)  === md5(password)) {
//                 ctx.response.status = 200;
//                 ctx.body = {
//                     code: 200,
//                     msg: '登陆成功',
//                     data: {
//                         email,
//                         status: true,
//                         password:md5(password),
//                         token: jsonwebtoken.sign({
//                             data: {
//                                 email,
//                                 password
//                             },
//                             exp: Math.floor(Date.now() / 1000) + (60 * 60), // 设置 token 过期时间
//                         }, 'yehocher'),
//                     }
//                 }
//             } else if (!verifyEmail) {
//                 ctx.response.status = 400;
//                 ctx.body = {
//                     code: 500,
//                     msg: '邮箱未注册',
//                     data: ''
//                 }
//             } else {
//                 throw new CustomError(constants.CUSTOM_CODE.SOME_CUSTOM_ERROR)
//             }

//         } catch (err) {
//             throw new CustomError(constants.CUSTOM_CODE.SOME_CUSTOM_ERROR)
//         }
//     } else {
//         ctx.response.status = 400;
//         ctx.body = {
//             code: 400,
//             msg: '参数不齐全'
//         }
//     }
// })
module.exports = router;
