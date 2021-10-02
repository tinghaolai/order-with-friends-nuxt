import { setCookie, getCookie } from '~/services/cookie'

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
};

export const getters = {
  userToken(state) {
    return state.jwtToken;
  },
};

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
