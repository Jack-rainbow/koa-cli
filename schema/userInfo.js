module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user_info', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true
        },
        //用户名
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'userName'
        },
        //邮箱
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'email'
        },
        //密码
        password: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'password'
        },
        // 创建时间
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'createdAt'
        },
        // 更新时间
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'updatedAt'
        }
    }, {
        freezeTableName: true
    })
}