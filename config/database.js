require('dotenv').config();
const env = process.env;
const DATA_BASE = {
    sqlUserName: 'root',
    sqlPassword: '123456',
    host: 'localhost',
    sqlName:'test',
    dialect: 'mysql',
    // operatorsAliases: false, //为操作符设置别名(sql表别名)
    dialectOptions: {
        //字符集
        charset: 'utf8mb4',
        // collate: 'utf8mb4_unicode_ci',  //无效配置项
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false, //控制台不输出sql语句服务
    timezone: '+08:00' //东八时区
};

const otherConfig = {
    jwt: {
        secret: 'Chongchong', // 密钥
        // 单位： 秒
        exp: 1
    },
    emailConfig: {
        service: 'qq',
        secureConnection: true, // 使用SSL
        port: 465, // SMTP 端口
        auth: {
            user: `${env.user}`, // qq账号
            pass: `${env.pass}` // smtp 授权码
        },
        email: `${env.to}`
    }
}
module.exports = {
    DATA_BASE,
    otherConfig
};