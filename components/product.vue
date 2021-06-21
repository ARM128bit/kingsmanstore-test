<template>
  <v-col cols="4">
    <v-card>
      <v-card-title
        style="height: 120px"
        class="justify-center text-md-body-1"
        >{{ product.title }}</v-card-title
      >
      <v-img
        contain
        max-height="150"
        max-wigth="150"
        :src="product.image"
      ></v-img>
      <v-card-text v-text="'$ ' + product.price"></v-card-text>
      <v-card-actions>
        <v-spacer />
        <template v-if="isAddedToACart(product.id)">
          <v-btn color="grey" plain @click="removeFromACart(product.id)">
            Remove from a cart
          </v-btn>
          <v-btn color="primary" @click="excludePieceFromACart(product.id)">
            -
          </v-btn>
          <v-spacer />
          {{ countProductsInACart(product.id) }}
          <v-btn color="primary" @click="addToCart(product.id)"> + </v-btn>
        </template>
        <template v-else>
          <v-btn color="primary" @click="addToCart(product.id)">
            Add to a cart
          </v-btn>
        </template>
      </v-card-actions>
    </v-card>
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
    ...mapGetters({ selectedProductsList: 'cart/selectedProductsList' }),
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
