
import Vue from 'vue';
import ElementUI from 'element-ui';
import '../../node_modules/element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);
require('../css/list2.css');


new Vue({
    el:"#app",
    data:{
        dialogVisible: false
    },
    methods:{
        handleClose(done) {
            this.dialogVisible=false

        }
    }
})