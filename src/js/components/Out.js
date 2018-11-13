import React,{Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';
import {connect} from 'react-redux';
import { setToken } from "../actions/index";
import Home from './Home';
import Nav from './Nav';
import Login from './Login';
import Signup from './Signup';

const mapStateToProps = (state) =>{
    return{
        token:state.token
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        setToken : (token) => dispatch(setToken(token))
    }
}

class ConnectedOut extends Component{
    constructor(){
        super();        
        
        this.state = {            
            navNoSessionButtonData :[],
            navNoSessionRouteData:[],
            isLoading:false            
        }
        this.isLoading = this.isLoading.bind(this);                
    }

    logout(){
        alert('logged out');
    }

    componentDidMount(){
        console.log(this.props);
        let {match} = this.props;
        this.setState({
            navNoSessionRouteData : [
                {to:`${match.url}login`,name:'Login',key:'r1'},
                {to:`${match.url}signup`,name:'signup',key:'r2'},
                {to:`${match.url}`,name:'Home',key:'r3'}
            ],
            navNoSessionButtonData : [],
            isLoading:true
        }) 

        const tokenVar = localStorage.getItem('token');
        if(tokenVar === null || tokenVar === ""){
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
                    this.setState({                 
                        isLoading:false,
                    });
                }
            });
        }
    }
    
    isLoading(){
        let {isLoading,navNoSessionButtonData,navNoSessionRouteData} = this.state;
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
                        (token)?<Redirect to={{pathname: '/In', state: {from: this.props.location}}} />:(null)
                    }
                    <div className = "row">
                        <Nav navRouteData = {navNoSessionRouteData}  navButtonData = {navNoSessionButtonData}/>
                    </div>
                        <div className="row justify-content-center">
                            <Switch>
                                <Route exact = {true} path={`${match.path}`} component={Home} />
                                <Route path={`${match.path}login`} render={(props) => <Login  {...props} /> } />
                                <Route path={`${match.path}signup`} render={(props) => <Signup  {...props} />} />
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
const Out = connect(mapStateToProps,mapDispatchToProps)(ConnectedOut);
export default Out;