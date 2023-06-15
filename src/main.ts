import { ElDialog } from 'element-plus';
import App from './App.vue';
import router from './router';
import 'virtual:svg-icons-register';
import '@/styles/index.scss';
import './permission';
import 'uno.css';

const app = createApp(App);
const pinia = createPinia();

app.use(router).use(pinia).mount('#app');

ElDialog.props.appendToBody.default = true;
