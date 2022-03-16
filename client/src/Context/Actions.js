//LOGIN
export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START", //ACTION NAME
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user, //TO UPDATE USER
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

//LOGOUT
export const Logout = () => ({
  type: "LOGOUT",
});

//UPDATE
export const updateStart = (userCredentials) => ({
  type: "UPDATE_START", //ACTION NAME
});

export const updateSuccess = (user) => ({
  type: "UPDATE_SUCCESS",
  payload: user, //TO UPDATE USER
});

export const updateFailure = () => ({
  type: "UPDATE_FAILURE",
});
