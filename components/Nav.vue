<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
          <NuxtLink to="/addMenu">Add Menu</NuxtLink>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item v-if="userToken" @click="logout">Sign Out</b-dropdown-item>
          <template v-else>
            <b-dropdown-item>
              <NuxtLink to="/Login">Login</NuxtLink>
            </b-dropdown-item>
            <b-dropdown-item>
              <NuxtLink to="/register">Register</NuxtLink>
            </b-dropdown-item>
          </template>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    methods: {
      logout() {
        this.$logout();
      },
    },
    computed: {
      ...mapGetters([
        'userToken',
      ])
    },
  }
</script>

<style scoped>

</style>
