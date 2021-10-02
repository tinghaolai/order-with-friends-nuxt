import { ifJWTExpired } from '~/services/jwt'

export default ({ app, $axios, store, redirect }, inject) => {
  inject('loginAxios', () => {
    return axios.create({
      headers: {
        token: store.getters.userToken,
      }
    })
  })

  $axios.onRequest(config => {
    const token = store.getters.userToken;
    if (!token) {
      redirect('/login');

      return;
    }

    if (ifJWTExpired(token)) {
      redirect('/login');

      return;
    }

    config.headers.token = token;
  })
}
