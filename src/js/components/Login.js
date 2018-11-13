import React,{Component} from 'react';
import LoginFacebook from './LoginFacebook';
import LoginGoogle from './LoginGoogle';
import config from '../../JSON/config.json';
import '../../css/login.css';
import LocalLogin from './LocalLogin';
import {Link} from 'react-router-dom';

var visibilityMaintainer = {
    opacity:'1'
}

class Login extends Component{
    constructor(){
        super();
        this.state = {
            isLoading :false
        }
        this.setIsLoading = this.setIsLoading.bind(this);
    }

    componentDidMount(){
        this.setState({
            isLoading:false
        });        
    }

    setIsLoading(val){
        this.setState({isLoading:val});
    }

    render(){                            
        let {isLoading} = this.state;
        if(isLoading){
            visibilityMaintainer.opacity = '0.7';
        }
        else{
            visibilityMaintainer.opacity = '1';            
        }
        return (
            <div className="col-lg-3 mt-lg-5 border border-dark" style={{...visibilityMaintainer}}>
                <div className="row bg-dark p-1" 
                    style={{color:"white",fontFamily:"Arial, Helvetica, sans-serif",fontWeight:"bolder",fontSize:"150%"}}>
                    <p className="w-100 text-center m-0">Login</p>
                </div>        
                <div className="row justify-content-around mt-3">
                    <LoginFacebook /> 
                    <LoginGoogle/>
                </div>                    
                <hr/>

                <LocalLogin  
                    setIsLoading = {this.setIsLoading}
                />
                
                <hr/>
                
                <div className="row">
                    <div className = "col-12">
                        <p>Doesn't have an account? <Link to="/signup">Signup</Link></p>
                        <p>Or go <Link to="/">Home</Link>.</p>
                    </div>
                </div>
            </div>
        );
        
    }
}
export default Login;