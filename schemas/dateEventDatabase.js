let mongoose=require('mongoose');


//用户信息
module.exports=new mongoose.Schema({
    //用户id
    userId:String,
    //日期事件名称
    dateTitle:{
        type:String,
        default:"事件名称"
    },
    //日期
    date:{
        type:String,
        default:""
    },
    //日期备注
    dateContent:{
        type:String,
        default:"备注"
    },
    //日期事件等级
    dateLevel:{
        type:String,
        default:"重要"
    },
    //日期事件等级描述
    dateLevelDesc:{
        type:String,
        default:"这一天发生了一件重要的事情，我很开心！！！"
    },
    //创建时间
    createTime:""
});