<template>
  <v-row justify="start">
    <template v-if="mergedLists.length == 0"> Your cart is empty </template>
    <template v-else>
      <template v-for="(item, index) in mergedLists">
        <v-cart-card :key="index" :product="item"></v-cart-card>
      </template>
      <v-col cols="12">
        <v-spacer />
        Total: $ {{ totalSum }}
        <v-btn color="primary" @click="isRegistered = true">Checkout</v-btn>
      </v-col>
      <v-dialog v-model="isRegistered" max-width="300">
        <v-card>
          <v-card-title class="text-h5">
            Your order is registered
          </v-card-title>

          <v-card-text> Please wait a call for aprove your order </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" text @click="isRegistered = false">
              Ok
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import VCartCard from '../components/VCartCard.vue'

export default {
  data() {
    return {
      isRegistered: false,
    }
  },
  components: { VCartCard },
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
    totalSum() {
      return this.mergedLists.reduce((a, b) => {
        console.log(a, b)
        return a + b.price * b.count
      }, 0)
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
