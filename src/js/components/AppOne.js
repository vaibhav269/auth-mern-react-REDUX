import React,{Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';

import In from '../components/In';
import Out from '../components/Out';

class AppOne extends Component{
    constructor(){
        super();
    }
    
    componentDidMount(){        
        document.getElementById('preloader').style.display = "none";            
    }

    render(){        
        return(            
            <div className="container-fluid">
                <Switch>                            
                    <Route path='/Out' component = {Out} />
                    <Route path='/In' component = {In} />
                    <Route path='/' component = {Out} />
                </Switch>
            </div>            
        )
    }
}

export default AppOne;