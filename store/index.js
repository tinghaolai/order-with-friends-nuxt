import { setCookie, getCookie, eraseCookie } from '~/services/cookie'
import { parseJwt } from '~/services/jwt'

export const state = () => ({
  jwtToken: null,
  refreshToken: null,
});

export const mutations = {
  updateJWTToken(state, token) {
    console.log('updateJWTToken');
    state.jwtToken = token;
    if (process.client) {
      const payload = parseJwt(token);
      setCookie('jwtToken', token, payload.exp * 1000);
    }
  },
  updateRefreshToken(state, refreshToken) {
    state.refreshToken = refreshToken;
    if (process.client) {
      setCookie('refreshToken', refreshToken);
    }
  },
  removeJWTToken(state) {
    state.jwtToken = null;
  },
  removeRefreshToken(state) {
    state.refreshToken = null;
    if (process.client) {
      eraseCookie('refreshToken');
    }
  },
};

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    console.log('nuxtServerInit');
    const jwtToken = getCookie(req.headers.cookie, 'jwtToken');
    if (jwtToken) {
      commit('updateJWTToken', jwtToken);
    }

    const refreshToken = getCookie(req.headers.cookie, 'refreshToken');
    if (refreshToken) {
      commit('updateRefreshToken', refreshToken);
    }
  },
  recordLoginInfo(context, loginData) {
    console.log('recordLoginInfo');
    console.log(loginData);
    context.commit('updateJWTToken', loginData.token);
    context.commit('updateRefreshToken', loginData.refreshToken);
  },
  logout(context) {
    context.commit('removeJWTToken');
    context.commit('removeRefreshToken');
  }
};

export const getters = {
  userToken(state) {
    return state.jwtToken;
  },
  refreshToken(state) {
    return state.refreshToken;
  },
};
