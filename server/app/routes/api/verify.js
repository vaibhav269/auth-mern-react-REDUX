const UserSession = require('../../models/userSession');

module.exports=function(app){
    app.get('/api/account/verify',function(req,res,next){
        const {token} = req.query;        
        UserSession.find({
            _id:token,
            isDeleted:false
        },function(err,sessions){
            if(err){
                console.log(err);
                return res.send({
                    success:false,
                    message:'Error: Serve error'
                });
            }
            if(sessions.length != 1){
                return res.send({
                    success:false,
                    message:'Error : Something went wrong'
                });
            }else{
                //User is valid
                return res.send({
                    success: true,
                    message:'User is valid'
                });
            }
        });

    });
}