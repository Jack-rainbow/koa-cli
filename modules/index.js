import {
    Sequelize
}
from 'sequelize';
import {DATA_BASE}from '../config/database';

const {
    sqlName,
    sqlUserName,
    sqlPassword,
    ...dataConfig
} = DATA_BASE
const sequelize = new Sequelize(sqlName, sqlUserName, sqlPassword, dataConfig);

sequelize.sync({
    force: false
})

module.exports = sequelize