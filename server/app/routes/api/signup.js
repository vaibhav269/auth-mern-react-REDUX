var bodyParser = require('body-parser');
const User = require('../../models/user');

module.exports = function(app){
    app.post('/api/account/signup',function(req,res,next){
        const password = req.body.password;
        let email = req.body.email;
        if(!email){
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank.'
            });
        }
        if (!password) {
            return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
            });
        }
        email = email.toLowerCase();
        email = email.trim();
        
        User.find({email:email},function(err,previousUser){
            if (err) {
                return res.send({
                success: false,
                message: 'Error: Server error'
                });
            }
            else if (previousUser.length > 0) {
                return res.send({
                success: false,
                message: 'Error: Account already exist.'
                });
            }
            
            
            const newUser = new User();
            newUser.email = email;
            newUser.password = newUser.generateHash(password);            
            
            newUser.save((err, user) => {
                if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
                }
                return res.send({
                success: true,
                message: 'Signed up'
                });
            });
            });
        
    });
}