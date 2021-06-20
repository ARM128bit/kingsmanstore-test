<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <template v-if="isShopRoute">
        <v-btn
          v-for="(category, i) in categoriesList"
          :key="i"
          :color="isSelectedBtn(category)"
          @click="toggleCategory(category)"
          v-text="category"
        >
        </v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Get started',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Shop',
          to: '/shop',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Cart',
          to: '/cart',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'A shop',
    }
  },
  computed: {
    ...mapGetters({
      categoriesList: 'catalog/categoriesList',
      selectedCategories: 'catalog/selectedCategories',
    }),
    isShopRoute() {
      return this.$route.path === '/shop'
    },
  },
  methods: {
    ...mapMutations({ toggleCategory: 'catalog/toggleCategory' }),
    isSelectedBtn(category) {
      return this.selectedCategories.includes(category) ? 'primary' : ''
    },
  },
}
</script>
