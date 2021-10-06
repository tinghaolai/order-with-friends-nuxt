import { ifJWTExpired, tokenRefresh } from '~/services/jwt'

export default ({ app, $axios, store, redirect, $config: { apiUrl } }, inject) => {
  inject('loginAxios', () => {
    return axios.create({
      headers: {
        token: store.getters.userToken,
      }
    })
  });

  $axios.defaults.baseURL = apiUrl;
  $axios.onRequest(config => {
    const token = store.getters.userToken;
    const refreshToken = store.getters.refreshToken;
    if ((!token) || (ifJWTExpired(token))) {
      if (!refreshToken) {
        redirect('/login');

        return;
      }

      tokenRefresh(refreshToken).then(response => {
        store.dispatch('recordLoginInfo', response);
        config.headers.token = store.getters.userToken;
      }).catch(error => {
        store.dispatch('logout');
        redirect('/login');
      });
    } else {
      config.headers.token = token;
    }
  })
}
