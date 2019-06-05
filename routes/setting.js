var express = require('express');
var router = express.Router();
const User = require('../models/userModels');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('setting', { title: 'Setting' });
});
//统一返回的格式
let responseData;
router.use(function(req,res,next){
    responseData = {
        code:0,
        data:{},
        message:''
    }
    next();
})
//设置模块所有接口
router.get('/getsettingdata',function(req,res,next){
    User.findOne({
        _id:req.cookies.userId
    }).then((setdata) => {
        if(setdata){
            responseData.code = 1;
            responseData.data = setdata;
            responseData.message = "个人信息查找成功";
            res.json(responseData);
        }else{
            responseData.code = -1;
            responseData.data = {};
            responseData.message = "个人信息查找失败";
            res.json(responseData);
        }

    })

    return;
    next();
})
//修改昵称
router.get('/updateuserName',function(req,res,next){
    User.updateOne({
        _id:req.cookies.userId
    },{
        userName:req.query.userName
    }).then((up) => {
        if(up.ok == 1){
            responseData.code = 1;
            responseData.message = "昵称更新成功";
            res.json(responseData);
        }else{
            responseData.code = -1;
            responseData.message = "昵称更新失败";
            res.json(responseData);
        }
    })
    return;
    next();
})
//修改性别
router.get('/updateSex',function(req,res,next){
    User.updateOne({
        _id:req.cookies.userId
    },{
        sex:req.query.sex
    }).then((up) => {
        if(up.ok == 1){
            responseData.code = 1;
            responseData.message = "性别更新成功";
            res.json(responseData);
        }else{
            responseData.code = -1;
            responseData.message = "性别更新失败";
            res.json(responseData);
        }
    })
    return;
    next();
})
//修改手机
router.get('/updateTel',function(req,res,next){
    User.updateOne({
        _id:req.cookies.userId
    },{
        tel:req.query.tel
    }).then((up) => {
        if(up.ok == 1){
            responseData.code = 1;
            responseData.message = "手机更新成功";
            res.json(responseData);
        }else{
            responseData.code = -1;
            responseData.message = "手机更新失败";
            res.json(responseData);
        }
    })
    return;
    next();
})
//修改地址
router.get('/updateAddress',function(req,res,next){
    User.updateOne({
        _id:req.cookies.userId
    },{
        address:req.query.address
    }).then((up) => {
        if(up.ok == 1){
            responseData.code = 1;
            responseData.message = "地址更新成功";
            res.json(responseData);
        }else{
            responseData.code = -1;
            responseData.message = "地址更新失败";
            res.json(responseData);
        }
    })
    return;
    next();
})
module.exports = router;
