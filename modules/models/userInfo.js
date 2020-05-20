import Sequelize from '../index'
import md5 from 'md5';
// const Sequelize = db.sequelize;
// 引入数据表模型
const UserInfo = Sequelize.import('../../schema/userInfo');


class UserInfoModel {
    // /**
    //  * 获取邮箱
    //  * @param email 邮箱
    //  * @returns {Promise<Model>}
    //  */
    // static async getUserEmail(email) {
    //     return await UserInfo.findOne({
    //         where: {
    //             email
    //         }
    //     });
    // }
    
    // /**
    //  * @description: 注册
    //  */
    // static async register(ctx) {
    //     return await UserInfo.create({
    //         userName: ctx.userName || '',
    //         email: ctx.email || '',
    //         password: md5(ctx.password) || ''
    //     });
    // }


    //  /**
    //   * @description: 登录
    //   */
    // static async usreLogin(ctx) {
    //      return await UserInfo.findOne({
    //          where: {
    //             email: ctx.email || '',
    //          }
    //      });
    // }


    // /**
    //  * @description: 更改用户密码
    //  */
    // static async updatePass(email, password) {
    //     return await UserInfo.update(
    //         {
    //             password
    //         },
    //         {
    //             where: {
    //                 email
    //             }
    //         }
    //     );
    // }
}

module.exports = UserInfoModel;
