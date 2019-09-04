let mongoose=require('mongoose');


//好友列表数据库模型
module.exports=new mongoose.Schema({
    id:String,
    friendList: String
});