//模型类的创建，通过models控制数据库
var mongoose=require('mongoose');
var DateSchema=require('../schemas/dateEventDatabase');
//第一个参数是模型的名字
module.exports=mongoose.model('Dt',DateSchema);