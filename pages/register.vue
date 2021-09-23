<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col bg-white mt-5 p-3">
          <div class="h4">Sign up</div>
          <form @submit.prevent="register">
            <div class="form-group">
              <label>Account</label>
              <input v-model="form.account" class="form-control" placeholder="Enter account" required>
            </div>
            <div class="form-group">
              <label>Password</label>
              <input v-model="form.password" type="password" class="form-control" placeholder="Password" required>
            </div>
            <div class="form-group">
              <label>Name</label>
              <input v-model="form.name" class="form-control" placeholder="Enter Name" required>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
  export default {
    data() {
      return {
        form: {
          account: null,
          password: null,
          name: null,
        }
      }
    },
    computed: {
    },
    methods: {
      register() {
        axios.post('http://127.0.0.1:8000/v1/register', this.form).then(response => {
          console.log('response');
          console.log(response.data);
        }).catch(error => {
          console.log('error');
          console.log(error);
        })
      },
    },
  }
</script>

<style scoped>
</style>
