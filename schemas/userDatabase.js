let mongoose=require('mongoose');


//用户信息
module.exports=new mongoose.Schema({
    //用户昵称
    userName:{
        type:String,
        default:"未设置"
    },
    //密码
    password:String,
    //用户头像
    avatarUrl:{
        type:String,
        default:""
    },
    //用户性别
    sex:{
        type:String,
        default:"未设置"
    },
    //用户联系方式
    tel:String,
    //用户地址
    address:{
        type:String,
        default:"未设置"
    }
});