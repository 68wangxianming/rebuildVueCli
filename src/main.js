import Vue from 'vue'
import App from './App.vue'

console.log("Running App version " + CONSTANTS.APP_VERSION);


new Vue({
    el: '#app',
    template: '<App/>',
    components: {
        App
    }
});