import Vue from 'vue'
import App from './App'
import CxltAutoComplete from './autocomplete'

Vue.use(CxltAutoComplete)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App)
})
