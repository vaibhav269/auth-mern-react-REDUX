const UserSession = require('../models/userSession');

module.exports =  function( userid,res ){
    const userSession = new UserSession();    
    userSession.userId = userid;
    userSession.save(function(err,doc){
        if(err){
            console.log(err);
            return res.send({
                success:false,
                message:'Error:server error'
            });
        }
        else{  
             return res.send({
                success:true,
                message:'Valid sign in',
                token:doc._id
            });
        }
    });    
}