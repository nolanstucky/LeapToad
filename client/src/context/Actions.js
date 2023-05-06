export const LoginStart = (userCredentials) =>({
    type: "LOGIN_START"
})

// after starting, will just wait for success/fail
export const LoginSuccessful = (user)=>({
    type: "LOGIN_SUCCESS",
    payload: user
});

export const LoginFailure = ()=>({
    type: "LOGIN_FAILURE"
});

export const UpdateStart = (userCredentials) =>({
    type: "UPDATE_START"
})

// after starting to update user, will just wait for success/fail
export const UpdateSuccessful = (user)=>({
    type: "UPDATE_SUCCESS",
    payload: user
});

export const UpdateFailure = ()=>({
    type: "UPDATE_FAILURE"
});
export const Logout = ()=>({
    type: "LOGOUT"
});