<template>
  <v-col cols="12">
    <div class="v-cart-card">
      <div class="item">
        {{ product.title }}
      </div>
      <div>
        $ {{ product.price * product.count }} = $ {{ product.price }} * pcs.
        {{ product.count }}
      </div>
      <div>
        <v-btn color="grey" plain @click="removeFromACart(product.id)">
          Remove from a cart
        </v-btn>
        <v-btn color="primary" @click="excludePieceFromACart(product.id)">
          -
        </v-btn>
        {{ countProductsInACart(product.id) }}
        <v-btn color="primary" @click="addToCart(product.id)"> + </v-btn>
      </div>
    </div>
  </v-col>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    product: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    ...mapGetters({
      selectedProductsList: 'cart/selectedProductsList',
      allProducts: 'catalog/allProducts',
    }),
    mergedLists() {
      const merged = []

      for (let i = 0; i < this.selectedProductsList.length; i++) {
        merged.push({
          ...this.selectedProductsList[i],
          ...this.allProducts.find(
            (itmInner) => itmInner.id === this.selectedProductsList[i].id
          ),
        })
      }
      return merged
    },
    isAddedToACart() {
      const _self = this
      return function (id) {
        return _self.countProductsInACart(id) > 0
      }
    },
    countProductsInACart() {
      const _self = this
      return function (_id) {
        return _self.selectedProductsList
          .filter(({ id }) => {
            return _id === id
          })
          .map(({ count }) => {
            return count
          })[0]
      }
    },
  },
  methods: {
    ...mapMutations({
      removeFromACart: 'cart/removeFromACart',
      excludePieceFromACart: 'cart/excludePieceFromACart',
      addToCart: 'cart/addToCart',
    }),
  },
}
</script>
<style lang="scss" scoped>
@import '../assets/variables';
</style>
