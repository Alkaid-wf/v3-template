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

/** element-plus 组件默认属性配置 */
// 弹窗插入至body元素（防遮挡）
ElDialog.props.appendToBody.default = true;
