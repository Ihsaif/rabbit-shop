import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

//引入初始化样式文件
import "@/styles/common.scss";

//引用懒加载指令插件并注册
import { lazyPlugin } from "./directives";
//引入全局组件
import { componentPlugin } from "./components";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(lazyPlugin);
app.use(componentPlugin);
app.mount("#app");
