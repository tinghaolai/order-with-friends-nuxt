export default ({ store, redirect }, inject) => {
  inject('logout', () => {
    store.dispatch('logout');
    redirect('/login');
  })
}
