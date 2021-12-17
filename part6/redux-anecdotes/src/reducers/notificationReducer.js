const initialState = 'Message'

const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'NOTIFICATION':
            return action.data
        case 'CREATENOTIFICATION': 
            let cMessage = 'You created \'' + action.data.content + '\''
            return cMessage
        case 'HIDE':
            return initialState;
        default:
            return state
        }

}

export const showLikeNotification = (content) => {
    return {
        type: 'LIKENOTIFICATION',
        data: { content }
    }
}

export const showCreatedNotification = (content) => {
    return {
        type: 'CREATENOTIFICATION',
        data: { content }
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE'

    }
}

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch({
            type: 'NOTIFICATION',
            data: message
        })
        setTimeout(() => {
            dispatch(hideNotification())
        }, time);
    }
}

export default notificationReducer