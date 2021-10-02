import { setCookie, getCookie } from '~/services/cookie'
import { parseJwt } from '~/services/jwt'

export const state = () => ({
  jwtToken: null,
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
  removeJWTToken(state) {
    state.jwtToken = null;
  }
};

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    console.log('nuxtServerInit');
    const jwtToken = getCookie(req.headers.cookie, 'jwtToken');
    if (jwtToken) {
      commit('updateJWTToken', jwtToken);
    }
  },
  recordLoginInfo(context, loginData) {
    console.log('recordLoginInfo');
    console.log(loginData);
    context.commit('updateJWTToken', loginData.token);
  },
  logout(context) {
    context.commit('removeJWTToken');
  }
};

export const getters = {
  userToken(state) {
    return state.jwtToken;
  },
};
