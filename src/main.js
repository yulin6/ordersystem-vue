// main.ts

import {createApp} from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './vuex/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import whiteBoard from './views/WhiteBoard.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'


const app = createApp(whiteBoard)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(VueAxios,axios);
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')