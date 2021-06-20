import { onlyUnique } from '../assets/shared'
export const state = () => ({
  selectedProductsList: [],
})
export const getters = {
  selectedProductsList: (state) => {
    return state.selectedProductsList
  },
  sumPrices: (state) => {
    return state.productsList
      .map((item) => {
        return item.category
      })
      .filter(onlyUnique)
  },
}
export const mutations = {
  refreshProductsList: (state, payload) => {
    state.productsList = [...payload]
  },
  addToCart: (state, payload) => {
    const _i = state.selectedProductsList.indexOf(({ id }) => {
      return id === payload
    })
    if (_i > -1) {
      state.selectedProductsList[_i].count += 1
    } else {
      state.selectedProductsList.push({ id: payload, count: 1 })
    }
  },
  excludePieceFromACart: (state, payload) => {
    const _i = state.selectedProductsList.indexOf(({ id }) => {
      return id === payload
    })
    if (_i > -1) {
      if (state.selectedProductsList[_i].count === 1) {
        state.selectedProductsList.splice(_i, 1)
      } else {
        state.selectedProductsList[_i].count -= 1
      }
    }
  },
  removeFromACart: (state, payload) => {
    const _i = state.selectedProductsList.indexOf(({ id }) => {
      return id === payload
    })
    if (_i > -1) {
      state.selectedProductsList.splice(_i, 1)
    }
  },
}
export const actions = {}
