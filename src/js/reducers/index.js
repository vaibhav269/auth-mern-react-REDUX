import {SET_TOKEN} from '../constants/action-types';

const initialState = {
    token : ''
}

const rootReducer = (state = initialState,action) =>{
    switch(action.type){        
        case SET_TOKEN:
                        return{
                            ...state,
                            token : action.payload
                        }
                        break;                        
        default : return initialState;                

    }
}
export default rootReducer;