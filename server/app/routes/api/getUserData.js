const UserSession = require('../../models/userSession');
const User = require('../../models/user');

module.exports=function(app){
    app.get('/api/account/getUserData',function(req,res,next){
        const {token} = req.query;
        UserSession.find({
            _id:token,
            isDeleted:false
        },function(err,userSessions){
            if(err){
                console.log(err);
                return res.send({
                    success:false,
                    message:'Error:serve error'
                });
            }
            if(userSessions.length != 1){                
                return res.send({
                    success:false,
                    message:'Error:Invalid'
                });
            }
            
            const userSession = userSessions[0];

            User.find({
                _id:userSession.userId,
                isDeleted:false
            },function(err,users){
                if(err){
                    return res.send({
                       success:false,
                       message:'Error:No user found' 
                    });
                }
                if(users.length != 1){                    
                    return res.send({
                        success:false,
                        message:'Error:Invalid'
                    });
                }
                
                let user = {
                    email:users[0].email,
                    signUpDate:users[0].signUpDate
                }
                return res.send({
                    success:true,
                    message:user
                });
            });
        });

    });
}