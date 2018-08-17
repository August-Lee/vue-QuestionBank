import Vue from 'vue';
import ElementUI from 'element-ui';
import '../../node_modules/element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex'
Vue.use(Vuex)

Vue.use(ElementUI);
require('../css/app.css');


const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment (state) {
            state.count++
        }
    }
})
store.commit('increment')
console.log(store.state.count)

new Vue({
    el:"#app",
    data:{
        options: [{
            value: '选项1',
            label: 'MBA'
        }, {
            value: '选项2',
            label: 'MPACC'
        }],
        value:'MPACC',
        dialogVisible: false
    },
    methods:{
        handleClose:function() {
            this.dialogVisible=false
        }
    }
})