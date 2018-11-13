import React,{Component} from 'react'
import '../../css/home.css';

class Home extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div className="col-12 p-1 mt-lg-5 pt-5">
                <div className="text-center heading-custom w-100">Welcome to Node Authentication Window</div>                                           
                <blockquote className="text-center pt-5 blockquote-custom">
                    <p>
                        "Hey! I am Vaibhav the full stack web developer here I have implemented the Authentication procedure using Facebook and Google OAuth by using react in the front end 
                        and node js at the backend. The better part is that I am using the same server for rendering react js and building apis
                        for the node js."
                    </p>
                </blockquote>
            </div>
            )
    }
}
export default Home;