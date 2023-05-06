// can be LoginReducer as well
const Reducer = (state, action) => {
    // same "type" in actions.js
    switch(action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false
            };
        case "LOGIN_SUCCESS":
            // in this case, we are being returned a user payload, can use it
            return {
                user: action.payload,
                isFetching: false,
                error: false
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true
            };
        case "UPDATE_START":
            return {
                ...state,
                isFetching: true
            };
        case "UPDATE_SUCCESS":
            // in this case, we are being returned a user payload, can use it
            return {
                user: action.payload,
                isFetching: false,
                error: false
            };
        case "LOGIN_FAILURE":
            return {
                user: state.user,
                isFetching: false,
                error: true
            };
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false
            };
        default: 
            return state;
    }
}

export default Reducer;