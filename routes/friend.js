var express = require('express');
var router = express.Router();
var User = require('../models/userModels');
var Friend = require('../models/friendModels');

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
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.end('respond with a resource');
});
//通过tel查找好友
router.get('/getFriend',function(req,res,next){
    let tel = req.query.tel;
    User.findOne({
        tel:tel
    }).then((resp)=>{
        if(resp){
            responseData.code = 1;
            responseData.message = "已查找到好友";
            responseData.data = resp;
            res.json(responseData);
        }else {
            responseData.code = -1;
            responseData.message = "查询不到好友";
            responseData.data = {};
            res.json(responseData);
        }
    })
    return;
    next();
})
//通过id查找好友
router.get('/getFriendById',function(req,res,next){
    let friendList = req.query.friendList.split("|");
    let promiseArr = [];
    for(let i = 0;i<friendList.length;i++) {
        promiseArr.push(User.findOne({
            _id: friendList[i]
        }))
    }
    Promise.all(promiseArr).then((resp) => {
        if (resp) {
            responseData.code = 1;
            responseData.data = resp;
            responseData.message ="查询成功";
            res.json(responseData);
        }
    }).catch(err => {
        responseData.code = -1;
        responseData.data = {};
        responseData.message = "轮询失败";
        res.json(responseData);
        next();
    })

    return;
    next();
})
//添加好友
router.post('/addFriend',function(req,res,next) {

    Friend.findOne({
        id:req.cookies.userId
    }).then(isExit => {
        if(isExit){
            Friend.updateOne({
                id:req.cookies.userId
            },{
                friendList: req.body.friendList
            }).then(resp => {
                if(resp){
                    responseData.code = 1;
                    responseData.message = "好友添加成功";
                    responseData.data = resp;
                }else{
                    responseData.code = -1;
                    responseData.message = "好友添加失败";
                    responseData.data = {}
                }
                res.json(responseData);
            })
        }else{
            let sendObj = new Friend({
                id: req.cookies.userId,
                friendList: req.body.friendList
            })
            sendObj.save().then(resp => {
                if (resp) {
                    responseData.code = 1;
                    responseData.message = "好友添加成功";
                    responseData.data = resp;
                } else {
                    responseData.code = -1;
                    responseData.message = "好友添加失败";
                    responseData.data = {}
                }
                res.json(responseData);
            });
        }
    })

    return;
    next();
})
//获取所有好友
router.get('/getFriends',function(req,res,next){
    let id = req.cookies.userId;
    Friend.findOne({
        id: id
    }).then(resp => {
        if(resp){
            responseData.code = 1;
            responseData.data = resp;
            responseData.message = "已查找到所有好友";
        }else{
            responseData.code = -1;
            responseData.data = {};
            responseData.message = "查找好友失败";
        }
        res.json(responseData);
    })
    return;
    next();
})
module.exports = router;