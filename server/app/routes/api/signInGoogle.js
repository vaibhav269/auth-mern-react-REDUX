const User = require('../../models/user');
const UserSession = require('../../models/userSession');
const bodyParser = require('body-parser');
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '745747889746-u2rk5tn1b86veevlih319uv0iiuin4a0.apps.googleusercontent.com';
const CLIENT_SECRET = 'S2QzHZ5hvn0rOppDGwxMJE_d';
const REDIRECT_URI = 'http://localhost:3000';
const setSession = require('../../utils/setSession');

//to verify and get data from id_token 
async function verifyGoogle(token) {
    const client = new OAuth2Client(CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    return payload;  
}

module.exports = function(app){
    app.post('/api/account/signInGoogle',function(req,res,next){
        const oauth2Client = new OAuth2Client(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
        var code = req.body.code; // the query param code
        oauth2Client.getToken(code, function(err, tokens) {           
          // Now tokens contains an access_token and an optional refresh_token. Save them.
            if(!err) {

                verifyGoogle(tokens.id_token).then(payload=>{
                    const id = payload['sub'];
                    User.find({
                        'googleProvider.id':id
                    },function(err,previousUsers){
                        if(err){
                            return res.send({
                                success:false,
                                message:'Error1 : serve error'
                            });
                        }
                        else if(previousUsers.length > 0 ){
                            const user = previousUsers[0];                                
                            setSession(previousUsers[0]._id,res);
                        }
                        
                        else{
                            const newUser = new User();
                            newUser.email = payload['email'];
                            newUser.googleProvider.id = payload['sub'];
                            newUser.googleProvider.token = tokens.refresh_token;
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
                }).catch((err)=>{
                    return res.send({
                        success:false,
                        message:'Error : Some error occured'
                    })
                })
            }
            else{
                res.send({
                    success:false,
                    message:'Error: Token invalid'
                });
            }
        });
    });
}