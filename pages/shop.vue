<template>
  <v-row justify="start">
    <template v-for="(item, index) in productsList">
      <Product :key="index" :product="item" />
    </template>
  </v-row>
</template>

<script>
import Product from '@/components/product.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    Product,
  },
  computed: {
    ...mapGetters({
      productsList: 'catalog/productsList',
      selectedProductsList: 'cart/selectedProductsList',
    }),
  },
  mounted() {
    this.loadProductsList()
  },
  methods: {
    ...mapActions({
      loadProductsList: 'catalog/loadProductsList',
    }),
  },
}
</script>
