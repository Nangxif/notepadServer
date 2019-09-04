var express = require('express');
var router = express.Router();
var User = require('../models/userModels');

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
//注册
router.post('/register',function(req,res,next){
    let tel = req.body.tel;
    let password = req.body.password;
    User.findOne({
        tel:tel
    }).then((isregister)=>{
        if(isregister){
            responseData.code = -1;
            responseData.message = "该手机号已注册";
            res.json(responseData);
        }else{
            let user = new User({
                tel:tel,
                password:password
            })
            user.save().then((register) =>{
                if(register){
                    responseData.code = 1;
                    responseData.message = "注册成功";
                    res.json(responseData);
                }else{
                    responseData.code = -1;
                    responseData.message = "注册失败";
                    res.json(responseData);
                }
            })
        }
    })
    return;
    next()
})
//登录
router.get('/login',function(req,res,next){
    console.log(req.query);
    User.findOne({
        tel:req.query.tel,
        password:req.query.password
    }).then((login) => {
        console.log(login);
        if(login){
            res.cookie("userId",login._id,{//往响应里面去写，所以用res
                path:'/',//放到根目录里面去，而不是子目录
                maxAge:1000*60*180//单位是毫秒*60
            })
            responseData.code = 1;
            responseData.message = "登陆成功";
            responseData.data = login;
            res.json(responseData);
        }else{
            responseData.code = -1;
            responseData.message = "登陆失败";
            responseData.data = login;
            res.json(responseData);
        }
    })
    return;
    next();
})
//注销
router.get('/loginout',function(req,res,next){
    res.cookie("userId","",{
        path:"/",
        maxAge:-1
    });
    responseData.code = 1;
    responseData.message = "注销成功";
    res.json(responseData);
})
module.exports = router;
