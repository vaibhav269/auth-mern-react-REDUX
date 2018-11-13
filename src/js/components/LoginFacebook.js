import React,{Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import config from '../../JSON/config.json';

import { connect } from 'react-redux';
import { setToken } from "../actions/index";

const mapDispatchToProps = (dispatch) =>{
    return{
        setToken : (token) => dispatch(setToken(token))
    }
}

class ConnectedLoginFacebook extends Component{
    constructor(){
        super();
        this.state = {
            isLoading:false,
            signinError:''            
        }
        this.facebookResponse = this.facebookResponse.bind(this);
    }

    facebookResponse(response){
        this.setState({isLoading:true});
        const tokenBlob = new Blob([
            JSON.stringify(
                {
                    access_token:
                    response.accessToken
                },
                null,
                2
            )],
            {
                type:'application/json'
            }
        );
        const options = {
            method: 'POST',
            body :tokenBlob,
            mode:'cors',
            cache : 'default'
        };
        fetch('/api/account/signInFacebook',options)
            .then(r=>r.json())
            .then( (text) => {
                this.setState({isLoading:false});        
                    if(text.success == false){
                        this.setState({signinError:text.message});
                    }
                    else if(text.success == true){                        
                        try{
                            localStorage.token=text.token;                            
                            this.props.setToken(text.token);
                        }catch(err){
                            alert("Error : can't stablish session",err);
                        }                                            
                    }
            })
            .catch((err)=>{alert("Some error ocurred")})
        
    }
    render(){
        return(
            <FacebookLogin 
                appId = {config.FACEBOOK_APP_ID}
                autoLoad={false}
                fields = "name,email,picture"
                callback = {this.facebookResponse}
                cssClass = "facebook-login-button p-2"
                textButton = "Facebook"
            /> 
        )
    }
}

const LoginFacebook = connect(null,mapDispatchToProps)(ConnectedLoginFacebook);
export default LoginFacebook;