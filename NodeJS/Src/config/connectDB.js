const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('quanlybenhnhan', 'root', 'nguyenpro20311', {
   host: 'localhost',
   dialect: 'mysql',
   port: 3307,
   logging: false
});
let connectDB = async () => {
   try {
      await sequelize.authenticate();
      console.log('Kết nối với cơ sở dữ liệu thành công.');
   } catch (error) {
      console.error('Không thể kết nối với cơ sở dữ liêu:', error);
   }
}

module.exports = connectDB;