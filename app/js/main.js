import Vue from 'vue';
import ElementUI from 'element-ui';
import '../../node_modules/element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);
require('../css/index.css');


new Vue({
   el:"#app",
    data:{
       list:"1",
        isShow:false,
        value1: '',
        dialogVisible: false,
        radio:1,
    },
    methods:{
        showToggle:function(){
            this.isShow = !this.isShow;
        }
    }
})
