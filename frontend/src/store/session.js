import { csrfFetch } from "./csrf";

const SET_USER = "user/SET_USER";
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const REMOVE_USER = "user/REMOVE_USER";
export const loggedOut = () => ({
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
    console.log(responseData, ` <---------`);
    dispatch(setUser(responseData));
    return responseData;
  }
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data));
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
