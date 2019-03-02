import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    currentUser: {},
    userList: []
}




export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.CURRENT_USER:
            return ({
                ...state,
                currentUser: action.payload
            })
        case ActionTypes.USERS_LIST:
            return ({
                ...state,
                userList: action.payload
            })
        default:
            return state;
    }

}

