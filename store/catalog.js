import axios from 'axios'
import { onlyUnique } from '../assets/shared'
export const state = () => ({
  productsList: [],
  selectedCategories: [],
})
export const getters = {
  productsList: (state) => {
    return state.productsList.filter(function (item) {
      return this.length === 0 || this.includes(item.category)
    }, state.selectedCategories)
  },
  categoriesList: (state) => {
    return state.productsList
      .map((item) => {
        return item.category
      })
      .filter(onlyUnique)
  },
  selectedCategories: (state) => {
    return state.selectedCategories
  },
}
export const mutations = {
  refreshProductsList: (state, payload) => {
    state.productsList = [...payload]
  },
  toggleCategory: (state, payload) => {
    const _i = state.selectedCategories.indexOf(payload)
    if (_i > -1) {
      state.selectedCategories.splice(_i, 1)
    } else {
      state.selectedCategories.push(payload)
    }
  },
}
export const actions = {
  loadProductsList: ({ rootState, commit }) => {
    return axios
      .get(rootState.productsListURL)
      .then((response) => commit('refreshProductsList', response.data))
  },
}
