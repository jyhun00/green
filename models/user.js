const Sequelize = require('sequelize');

module.exports = ((sequelize,DataTypes)=>{
    return sequelize.define('user',{
        email:{
            type: Sequelize.STRING(100),
            allowNull: true,
        },
        kakao_id:{
            type: Sequelize.STRING(),
            allowNull: false,
        },
        kakao_refresh:{
            type: Sequelize.STRING(),
            allowNull: false,
        },
        kakao_access:{
            type: Sequelize.DATE(),
            allowNull: false,
        },
        kakao_access_expired_time:{
            type: Sequelize.BIGI(),
            allowNull: false,
        }
    },{
        timestamps:true,
        paranoid : true, // 삭제일 (복구용)
    })
})