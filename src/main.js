// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import whiteBoard from './views/WhiteBoard.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(whiteBoard)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
import router from './router'

app.use(router)
app.use(ElementPlus)
app.mount('#app')