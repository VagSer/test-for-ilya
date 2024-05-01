import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import UI from './components/UI'

const app = createApp(App)

UI.forEach(component => app.component(component.__name, component))

app.mount('#app')
