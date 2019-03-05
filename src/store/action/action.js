import ActionTypes from "../constant/constant"


export const crrentUserAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.CURRENT_USER,
            payload: data
        })
    }
}

export const UserListAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.USERS_LIST,
            payload: data
        })
    }
}



export const circleListAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.CIRCLE_LIST,
            payload: data
        })
    }
}


export const addedUserAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.ADD_USERS,
            payload: data
        })
    }
}



export const showUsersAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.SHOW_USER,
            payload: data
        })
    }
}




