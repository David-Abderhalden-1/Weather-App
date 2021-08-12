# Weather-App

## Introduction
This is a Team-Work project to learn VueJS.


## Setup

``` npm i ```


## Usefull Installations

``` vue add store ```
``` vue add router ```




## Store Stuff

### In store.js
``` export const store = createStore({
    state: {
        number: 1,
        //data: null
    },
    getters: {
        getNumber(state) {
            return state.number
        }
    },
    mutations: {
        addPayload(state, payload) {
            state.number += parseInt(payload.amount)
        }
    }  
}) ```

### In component
``` import { mapGetters } from "vuex";
export default {
  name: "App",

  data(){
    return{
      inputNumber: null
    }
  },

  computed: {
    ...mapGetters({
      number: 'getNumber'
    })
  },

  methods: {
    changeNumberOnInput() {
      this.$store.commit({
        type: 'addPayload',
        amount: this.inputNumber
      })
    }
  }

}; ```