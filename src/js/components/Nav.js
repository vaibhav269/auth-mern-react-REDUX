import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component{
    render(){
        let {navRouteData,navButtonData} = this.props;        
        return(
            <div className="w-100">

                 <nav className="navbar navbar-dark navbar-expand-lg bg-dark" >

                    <Link to = '/' className="navbar-brand" style={{outline:"none"}} >Node Auth</Link>
                    
                    <button style={{outline:"none",cursor:"pointer"}} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav mr-auto">
                            {
                                navRouteData.map(navEle=>{
                                    return (
                                        <li 
                                            className="nav-item text-center" 
                                            key ={navEle.key}> 
                                            <Link 
                                                style={{outline:"none"}} 
                                                to = {navEle.to} 
                                                className="nav-link"
                                            > 
                                                    {navEle.name}
                                            </Link> 
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        
                        <ul className = "navbar-nav ml-auto">
                            {
                                navButtonData.map(navButton=>{
                                    return(
                                        <li className = "nav-item text-center" key = {navButton.key}>
                                            <button className = "btn btn-danger" onClick={navButton.onClick}>
                                                {navButton.name}
                                            </button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>

                </nav>
            </div>
        )
    }
}
export default Nav;