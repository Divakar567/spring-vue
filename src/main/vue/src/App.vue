<template>
  <v-app id="app">
    <div v-if="!user">
      <h1>Spring Vue Demo Application</h1>
      <h3 v-if="user">Hello {{ user.name ? user.name : "User" }}</h3>
      <v-btn @click="login" v-if="!user"> Login with Azure AD </v-btn>
    </div>

    <div v-if="user">
      <router-view />
    </div>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import authService from "./services/auth.service";

export default {
  name: "app",
  data() {
    return {};
  },
  computed: mapState({
    user: (state) => state.user.account,
  }),
  methods: {
    login() {
      authService.login();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
