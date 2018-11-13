const User = require('../../models/user');
const UserSession = require('../../models/userSession');
var bodyParser = require('body-parser');

const setSession = require('../../utils/setSession');

module.exports = function(app){  
    app.post('/api/account/signin',function(req,res,next){
        const password = req.body.password;
        let email = req.body.email;
        if(!email){
            return res.send({
                success:false,
                message:'Error:Email connot be blank'
            });
        }
        if(!password){
            return res.send({
                success:false,
                message:'Error:Password cannot be blank'
            });
        }

        email = email.toLowerCase();
        email = email.trim();

        User.find({
            email:email
        },function(err,users){
            if(err){
                console.log('err 2:',error);
                return res.send({
                    success:false,
                    message:'Error:server error'
                });
            }
            if(users.length != 1 ){
                return res.send({
                    success:false,
                    message:'Error:Invalid'
                });
            }

            const user = users[0];
            if(!user.validatePassword(password)){
                return res.send({
                    success:false,
                    message:'Error:Invalid credentials'
                });
            }else{
                setSession(user._id,res);                    
            }
        });
    });    
}