import React,{Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';

import Profile from './Profile';
import Nav from './Nav';
import {connect} from 'react-redux';
import { setToken } from "../actions/index";

const mapDispatchToProps = (dispatch) =>{
    return{
        setToken : (token) => dispatch(setToken(token))
    }
}
const mapStateToProps = (state) =>{
    return{
        token:state.token
    }
}

class ConnectedIn extends Component{    
    constructor(){
        super();        

        this.state = {            
            navSessionButtonData :[],
            navSessionRouteData:[],
            isLoading:false            
        }
        this.isLoading = this.isLoading.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout(){
        const tokenVar = localStorage.getItem('token');
        localStorage.setItem('token','');
         fetch('/api/account/logout?token='+tokenVar)
            .then(res=>res.json())
            .then(json=>{
                if(json.success){
                    this.props.setToken('')
                }else{
                   alert('logout error');
                }
            });        
    }

    componentWillMount(){
        let {match} = this.props;
        this.setState({
            navSessionRouteData : [                
                {to:`${match.url}`,name:'Profile',key:'r3'}
            ],
            navSessionButtonData : [{onClick:this.logout,name:'Logout',key:'b1'}],
            isLoading:true
        }) 

        const tokenVar = localStorage.getItem('token');
        if(tokenVar == null){
            this.props.setToken('');
            this.setState({
                isLoading:false
            });
        }else{            
            fetch('/api/account/verify?token='+tokenVar)
            .then(res=>res.json())
            .then(json=>{
                if(json.success){
                    this.props.setToken(tokenVar);
                    this.setState({                        
                        isLoading:false
                    });                    
                }else{
                    this.props.setToken('');
                    this.setState({                          
                        isLoading:false,
                    });
                }
            });
        }
    }
    
    isLoading(){
        let {isLoading,navSessionButtonData,navSessionRouteData} = this.state;
        let {token} = this.props;
        if(isLoading === true){
            return (
                <p>Loading...</p>
            );
        }
        else{
            let {match} = this.props
            return(
                <div>
                    {
                        (token)?(null):<Redirect to={{pathname: '/' }} />
                    }
                    <div className = "row">
                        <Nav navRouteData = {navSessionRouteData}  navButtonData = {navSessionButtonData}/>
                    </div>
                        <div className="row justify-content-center">
                            <Switch>
                                <Route exact = {true} path={`${match.path}`} render={(props) => <Profile setToken={this.setToken} {...props} getToken = {this.getToken} /> } />
                            </Switch>
                        </div>
                </div>
            )
        }
    }


    render(){    
        return(
            <div>
                {this.isLoading()}
            </div>
        )
    }
}

const In = connect(mapStateToProps,mapDispatchToProps)(ConnectedIn);
export default In;