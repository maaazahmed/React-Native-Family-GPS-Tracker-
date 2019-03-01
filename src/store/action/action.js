import ActionTypes from "../constant/constant"


export const crrentUserAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.CURRENT_USER,
            payload: data
        })
    }
}
