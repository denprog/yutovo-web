import { createApp } from 'vue'
import App from './App.vue'
import { DynamicScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const app = createApp(App)
app.component('DynamicScroller', DynamicScroller)
app.mount('#app')
