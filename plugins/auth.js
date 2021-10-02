import { removeJWT } from '~/services/jwt'

export default ({ store, redirect }, inject) => {
  inject('logout', () => {
    removeJWT();
    store.dispatch('logout');
    redirect('/login');
  })
}
