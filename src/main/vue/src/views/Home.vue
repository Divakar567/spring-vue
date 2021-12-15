<template>
  <v-container fluid>
    <v-row>
      <v-app-bar color="blue" height="68">
        <v-app-bar-title align="left">Ascent</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn @click="logout" v-if="user">Logout</v-btn>
      </v-app-bar>
    </v-row>
    <v-row>
      <v-navigation-drawer app dark permanent width="200">
        <v-list-item c>
          <v-list-item-content>
            <v-list-item-title class="text-h6"> Ascent </v-list-item-title>
            <v-list-item-subtitle> Garmin Web Platform </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list nav dense>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Overview</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-server</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Compute</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-network</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Network</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-database</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Storage</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-file-table-box-multiple-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Catalog</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-currency-usd</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Costing</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-breadcrumbs :items="items">
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>

        <!-- <pre v-if="user">{{ JSON.stringify(user, null, 4) }}</pre> -->

        <v-btn elevation="2" @click="callAPI" v-if="user">
          GET {{ user.name }} DETAILS
        </v-btn>

        <v-btn elevation="2" @click="getInstances" v-if="user">
          GET INSTANCES
        </v-btn>

        <pre v-if="userInfo">{{ JSON.stringify(userInfo, null, 4) }}</pre>

        <pre v-if="instances">{{ JSON.stringify(instances[0], null, 4) }}</pre>
        <router-view />
      </v-main>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import authService from "../services/auth.service";
import graphService from "../services/graph.service";
import gwpService from "../services/gwp.service";

export default {
  data() {
    return {
      userInfo: null,
      instances: null,
      items: [
        {
          text: "Dashboard",
          disabled: false,
          href: "breadcrumbs_dashboard",
        },
        {
          text: "Link 1",
          disabled: false,
          href: "breadcrumbs_link_1",
        },
        {
          text: "Link 2",
          disabled: true,
          href: "breadcrumbs_link_2",
        },
      ],
    };
  },
  computed: mapState({
    user: (state) => state.user.account,
  }),
  methods: {
    callAPI() {
      authService.getToken().then(
        (token) => {
          graphService.getUserInfo(token).then(
            (data) => {
              this.userInfo = data;
            },
            (error) => {
              console.error(error);
            }
          );
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getInstances() {
      authService.getToken().then(
        (token) => {
          gwpService.getInstances(token).then((data) => {
            this.instances = data;
          });
        },
        (error) => {
          console.error(error);
        }
      );
    },
    logout() {
      authService.logout().then(() => {
        this.$store.commit("setUserAccount", null);
      });
    },
  },
};
</script>
