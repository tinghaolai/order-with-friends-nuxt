<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col bg-white mt-5 p-3">
          <div class="h4">Login</div>
          <form @submit.prevent="login">
            <div class="form-group">
              <label>Account</label>
              <input v-model="form.account" class="form-control" placeholder="Enter account" required>
            </div>
            <div class="form-group">
              <label>Password</label>
              <input v-model="form.password" type="password" class="form-control" placeholder="Password" required>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
            <button type="button" class="btn btn-primary" @click="check">Check login info</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        form: {
          account: '111111',
          password: '111111',
        }
      }
    },
    computed: {
      ...mapGetters([
        'userToken',
      ])
    },
    methods: {
      login() {
        axios.post('http://127.0.0.1:8000/v1/login', this.form).then(response => {
          if (response.data.status === 0) {
            this.$router.push('/');
            this.$store.dispatch('recordLoginInfo', response.data.data);
          } else {
            toastr.error('failing login');
          }
        }).catch(error => {
          toastr.error(error);
        })
      },
      check() {
        console.log('check');
        console.log(this.userToken);
      }
    },
    beforeCreate() {
      if (this.$ifUserLogin()) {
        this.$router.push('/');
      }
    },
  }
</script>

<style scoped>
</style>
