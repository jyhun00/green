common = {
    isBlank: function(value){
        let result = false;
        if(value == undefined){
            result = true;
        }
        if(!value){
            result = true;
        }
        if(value.length ==0){
            result = true;
        }

        return result;
    },
    makeExpireTime : function (expires_in) {
        var expireDate;
        if (expires_in) {
            expireDate = new Date();
            expireDate.setSeconds(expireDate.getSeconds()+expires_in);
        }
        return expireDate;
    },
}

module.exports = common;