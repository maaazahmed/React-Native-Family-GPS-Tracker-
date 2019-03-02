import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    currentUser: {},
    userList: [],
    circleList: []
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
        case ActionTypes.CIRCLE_LIST:
            return ({
                ...state,
                circleList: action.payload
            })
        default:
            return state;
    }

}

