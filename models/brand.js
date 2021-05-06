const Sequelize = require('sequelize');

module.exports = ((sequelize,DataTypes)=>{
    return sequelize.define('user',{
        brand_name:{
            type: Sequelize.STRING(100),
            allowNull: true,
        },
        brand_img:{
            type: Sequelize.STRING(),
            allowNull: false,
        }
    },{
        timestamps:true,
        paranoid : true, // 삭제일 (복구용)
    })
})