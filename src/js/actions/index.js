import { SET_TOKEN} from '../constants/action-types';

export const setToken = (token) =>(
    {
        type: SET_TOKEN,
        payload: token
    }
);