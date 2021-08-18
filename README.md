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
}) 
```

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

}; 
```
## Change Config File of Apacheserver to enable reload without error
```sudo a2enmod rewrite``` This command enables rewrite

```sudo nano /etc/apache2/apache2.conf``` open Apache config file with your prefered editor

```<Directory /var/www/html/>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
</Directory>```

Insert this Block to enable reload with vue js without getting an 404 error

```sudo systemctl restart apache2``` At the end you have to restart the Apache Server to use the new configuration.


