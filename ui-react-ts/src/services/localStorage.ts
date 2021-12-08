import {LoginResponse} from "../models/Models";

const STATE_KEY = "bookmarks-app-state";

export const cleanState = () => {
    try {
        localStorage.removeItem(STATE_KEY);
    } catch {
        // ignore write errors
    }
};

export const setUserAuth = (user: LoginResponse) => {
    try {
        let existingState = localStorage.getItem(STATE_KEY);
        console.log('existingState:', existingState)
        if (existingState === null) {
            existingState = "{}"
        }
        const state = JSON.parse(existingState);
        state.user = user;
        const serializedState = JSON.stringify(state);
        localStorage.setItem(STATE_KEY, serializedState);
    } catch (err) {
        console.log(err)
    }
}
export const getAccessToken = (): (string | null) => {
    try {
        const loginUser = getLoginUser();
        if (loginUser === null) {
            return null;
        }
        return loginUser.access_token;
    } catch (err) {
        return null;
    }
};

export const getLoginUser = (): (LoginResponse | null) => {
  try {
    const serializedState = localStorage.getItem(STATE_KEY);
    if (serializedState === null) {
      return null;
    }
    const state = JSON.parse(serializedState) ;
    return (state.user || {});
  } catch (err) {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
    const token = getAccessToken();
    return token !== undefined && token !== null && token !== "";
};
