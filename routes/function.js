var express = require('express');
var router = express.Router();
var Dt = require('../models/dateModels');

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
/* GET fn listing. */
router.get('/', function(req, res, next) {
    res.end('respond with a resource');
});
//添加日子
router.post('/addDate',function(req,res,next){
    let dateTitle = req.body.dateTitle;
    let date = req.body.date;
    let dateContent = req.body.dateContent;
    let dateLevel = req.body.dateLevel;
    let dateLevelDesc = req.body.dateLevelDesc;
    let createTime = req.body.createTime;
    let dt = new Dt({
        userId:req.cookies.userId,
        dateTitle:dateTitle,
        date:date,
        dateContent:dateContent,
        dateLevel:dateLevel,
        dateLevelDesc:dateLevelDesc,
        createTime:createTime
    })
    dt.save().then((addDate) => {
        if (addDate) {
            responseData.code = 1;
            responseData.message = "日子添加成功";
            res.json(responseData);
        }else{
            responseData.code = -1;
            responseData.message = "日子添加失败";
            res.json(responseData);
        }
    })
    return;
    next()
})

//获取所有日子
router.get('/getDates',function(req,res,next){
    Dt.find({
        userId:req.cookies.userId
    }).then((data) => {
        if(data){
            responseData.code = 1;
            responseData.data = data;
            responseData.message = "日子查找成功";
            res.json(responseData);
        }else{
            responseData.code = -1;
            responseData.data = {};
            responseData.message = "日子查找失败";
            res.json(responseData);
        }
    })
    return;
    next()
})
//搜索单个日子
router.get('/getSingleDate',function(req,res,next){
    Dt.findOne({
        _id:req.query._id
    }).then((data) => {
        console.log(data)
        if(data){
            responseData.code = 1;
            responseData.data = data;
            responseData.message = "单个日子查找成功";
            res.json(responseData);
        }else{
            responseData.code = -1;
            responseData.data = {};
            responseData.message = "单个日子查找失败";
            res.json(responseData);
        }
    })
    return;
    next()
})
//删除日子记录
router.get('/deleteDates',function(req,res,next){
    Dt.remove({
        _id:req.query._id
    }).then((data) => {
        if(data){
            responseData.code = 1;
            responseData.data = data;
            responseData.message = "日子删除成功";
            res.json(responseData);
        }else{
            responseData.code = -1;
            responseData.data = {};
            responseData.message = "日子删除失败";
            res.json(responseData);
        }
    })
    return;
    next()
})
module.exports = router;
