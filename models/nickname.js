const { Sequelize, DataTypes }= require('sequelize');


module.exports = ((sequelize,DataTypes)=>{
    return sequelize.createTable('user',{
        nickname:{
            type: Sequelize.STRING(100),
            allowNull: true,
        },
    },{
        timestamps:true,
        paranoid : true, // 삭제일 (복구용)
    })
})