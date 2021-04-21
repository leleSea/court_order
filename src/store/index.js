import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {
    setItem(state, options){
      for(var i in options){
        state[i] = options[i]
      }
    },
    removeItem(state, options){
      for(var i in options){
        if(state[i]){
          delete state[i]
        }
      }
    },
  },
  actions: {
    setItem(context, options){
      context.commit('setItem', options)
    },
    removeItem(context, options){
      context.commit('removeItem', options)
    },
    getItem(context, options){
      context.commit('getItem', options)
    }
  }
})
