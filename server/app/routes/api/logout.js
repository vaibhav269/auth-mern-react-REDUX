const UserSession = require('../../models/userSession');

module.exports=function(app){
    app.get('/api/account/logout',function(req,res,next){
        const {token} = req.query;
        UserSession.findOneAndUpdate({
            _id:token,
            isDeleted:false
        },{
            $set:{
                isDeleted:true
            }
        },null,function(err,sessions){
            if(err){
                console.log(err);
                return res.send({
                    success:false,
                    message:'Error:Serve error'
                });
            }
            return res.send({
                success:true,
                message:'Logged Out Successfully'
            });
        });
    });
}