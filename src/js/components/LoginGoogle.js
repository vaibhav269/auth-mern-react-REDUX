import React,{Component} from 'react';
import { GoogleLogin } from 'react-google-login';
import config from '../../JSON/config.json';

import { connect } from 'react-redux';
import { setToken } from "../actions/index";

const mapDispatchToProps = (dispatch) =>{
    return{
        setToken : (token) => dispatch(setToken(token))
    }
}

class ConnectedLoginGoogle extends Component{
    constructor(){
        super();
        this.state = {
            isLoading:false,
            signinError:''            
        }
        this.googleResponse = this.googleResponse.bind(this);
    }

    googleResponse(response){
        this.setState({isLoading:true});
        const tokenBlob = new Blob([JSON.stringify({code:
        response.code},null,2)],{type:'application/json'});
        const options = {
            method: 'POST',
            body :tokenBlob,
            mode:'cors',
            cache : 'default'
        };
        fetch('/api/account/signInGoogle',options)
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
                            console.log("Error : can't stablish session",err);
                        }                                            
                    }
            })
        
    }
    render(){
        return(
            <GoogleLogin
                clientId={config.GOOGLE_CLIENT_ID}
                buttonText="Google"
                onSuccess={this.googleResponse}
                onFailure={this.googleResponse}
                responseType = 'code'
                accessType = 'offline'
                className="google-login-button p-3"               
            />
        )
    }
}

const LoginGoogle = connect(null,mapDispatchToProps)(ConnectedLoginGoogle);
export default LoginGoogle;