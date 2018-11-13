const fetch = require('node-fetch');
var bodyParser = require('body-parser');
const User = require('../../models/user');
const setSession = require('../../utils/setSession');

module.exports = function(app){
    app.post('/api/account/signInFacebook',function(req,res){
        let access_token = req.body.access_token;
        let app_id = '271317300381133';
        let app_secret = 'a799c00dea6f43950078f51f7e67d385';
        var long_access_token = '';
        fetch(`https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${app_id}&client_secret=${app_secret}&fb_exchange_token=${access_token}`)
            .then(resp=>resp.json())
            .then((json)=>{
                long_access_token = json.access_token;            
                return fetch(`https://graph.facebook.com/me?access_token=${long_access_token}&fields=email`)
            })
            .then((resp)=>resp.json())
            .then((json)=>{
                User.find({
                    'facebookProvider.id':json.id
                },function(err,previousUsers){
                    if(err){
                        console.log(err);
                    }
                    else if(previousUsers.length > 0){
                        const user = previousUsers[0];
                        setSession(previousUsers[0]._id,res);
                    }
                    else{
                        const newUser = new User();
                        newUser.email = json['email'];

                        newUser.facebookProvider.id = json['id'];
                        newUser.facebookProvider.token = long_access_token;
                        newUser.save((err,user) =>{
                            if(err){
                                return res.send({
                                    success:false,
                                    message:'Error2:serve error'
                                });
                            }
                            else{
                                setSession(user._id,res);
                            }
                        });
                    }
                });                
            })
            .catch(
                (err)=>{console.log(err)}
            )
    });
}