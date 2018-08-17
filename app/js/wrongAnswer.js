import Vue from 'vue';
import ElementUI from 'element-ui';
import axios from 'axios'
import '../../node_modules/element-ui/lib/theme-chalk/index.css';
import $ from "jquery";


Vue.use(ElementUI);


new Vue({
    el:"#app",
    data:{
        id:'',
        question_id:'',
        point_id:'',
        answer:[],
    },
    mounted() {
        this.id = this.GetQueryString("id");
        this.question_id = this.GetQueryString("question_id");
        this.point_id = this.GetQueryString("point_id");
        this.getOne();
    },
    methods:{
        getOne:function(){
            console.log(this.point_id);
            console.log(this.id);
            if(this.id!=null){
                axios.get('http://bl.mxmba.com/index.php?c=tiku_wrong_question_ctrl&m=get_all_wrong_title&id='+this.id+'&question_id='+this.question_id)
                    .then(response=>{
                        console.log(response.data.data);
                        this.answer=response.data.data;
                    }).catch(response=> {
                    console.log(response);
                });
            }else if(this.point_id!=null){
                axios.get('http://bl.mxmba.com/index.php?c=tiku_wrong_question_ctrl&m=get_all_wrong_title&point_id='+this.point_id+'&question_id='+this.question_id)
                    .then(response=>{
                        console.log(response.data.data);
                        this.answer=response.data.data;
                    }).catch(response=> {
                    console.log(response);
                });
            }
        },
        GetQueryString:function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
            var r = window.location.search.substr(1).match(reg);
            if (r!=null) return (r[2]); return null;
        },

    }
})