export default ({ app, $axios, store }, inject) => {
  inject('loginAxios', () => {
    return axios.create({
      headers: {
        token: store.getters.userToken,
      }
    })
  })
}
