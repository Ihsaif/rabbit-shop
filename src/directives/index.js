import { useIntersectionObserver } from "@vueuse/core";

//定义懒加载插件
useIntersectionObserver;
export const lazyPlugin = {
  install(app) {
    app.directive("img-lazy", {
      mounted(el, binding) {
        // el: 指令绑定的那个元素 例：img
        // binding: binding.value  指令等于号后面绑定的表达式的值  例：图片url
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            //进入视口区域
            el.src = binding.value;
            stop();
          }
        });
      },
    });
  },
};
