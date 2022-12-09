import { csrfFetch } from "./csrf";

const SET_USER = "user/SET_USER";
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const REMOVE_USER = "user/REMOVE_USER";
export const removeUser = () => ({
  type: REMOVE_USER,
});

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });

  if (response.ok) {
    const responseData = await response.json();
    // console.log(responseData, ` <---------`);
    dispatch(setUser(responseData));
    return responseData;
  }
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  // console.log(data, ` <---`);
  dispatch(setUser(data));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password,
    }),
  })
    .then(async (response) => {
      const data = await response.json();
      console.log(data, ` <--- data from thunk`);
      dispatch(setUser(data));
      return data;
    })
    .catch(async (response) => {
      const data = await response.json();
      console.log(data, ` <------ data from error`);
      return data;
    });
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

const initialState = {
  user: null,
};

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER: {
      newState = { ...state };
      newState.user = action.payload;
      return newState;
    }
    case REMOVE_USER: {
      newState = { ...state };
      newState.user = null;
      return newState;
    }
    default:
      return state;
  }
};

export default sessionReducer;
