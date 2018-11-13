import React,{Component} from 'react';
import { connect } from 'react-redux';
import { setToken } from "../actions/index";

const mapDispatchToProps = (dispatch) =>{
    return{
        setToken : (token) => dispatch(setToken(token))
    }
}

class ConnectedLocalLogin extends Component{    
     constructor(){
         super();
         this.state = {      
            signinError:''            
        }
        this.localLogin = this.localLogin.bind(this);
     }
     
     localLogin(event){
        event.preventDefault();
        this.props.setIsLoading(true);
        const formData = new FormData(event.target);
        let jsonObject = {};

        for (const [key, value]  of formData.entries()) {
            jsonObject[key] = value;
        }

        var data = new Blob([JSON.stringify(jsonObject,null,2)],{type:'application/json'});
        const options = {
            method : 'POST',
            body : data,
            mode : 'cors',
            cache : 'default'
        }

        fetch('/api/account/signin',options)            
            .then(res=>res.json())
            .then(json=>{
                this.props.setIsLoading(false);
                    if(json.success == false){
                    this.setState({signinError:json.message});
                }
                else if(json.success == true){
                    try{
                        localStorage.token=json.token;                            
                        this.props.setToken(json.token);
                    }catch(err){
                        console.log("Error : can't stablish session",err);
                    }                                            
                }
            })
            .catch(err=>alert("some error occured"))
    }

    render(){
        let {signinError} = this.state;
        return(
            <div className="row justify-content-center pr-3 pl-3">
                
                <div className = "col-12">
                    <p className = "bg-danger text-white w-100 text-center"> {signinError} </p>
                </div>

                <form className="w-100" onSubmit = {this.localLogin}>
                    <div className = "form-group" >
                        <label >Enter Email</label>
                        <input type = "text" className="form-control" name="email" />
                    </div>

                    <div className = "form-group" >
                        <label >Enter password</label>
                        <input type = "password" className="form-control" name="password" />                        
                    </div>

                    <div className="form-group text-center">
                        <button type= "submit" className="btn btn-dark">Login</button>
                    </div>
                </form>
            </div>
        )
    }
 }

const LocalLogin = connect(null,mapDispatchToProps)(ConnectedLocalLogin);
export default LocalLogin;