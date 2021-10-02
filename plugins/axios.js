export default ({ app, $axios, store }, inject) => {
  inject('loginAxios', () => {
    return axios.create({
      headers: {
        token: store.getters.userToken,
      }
    })
  })

  $axios.onRequest(config => {
    config.headers.token = store.getters.userToken;
  })
}
