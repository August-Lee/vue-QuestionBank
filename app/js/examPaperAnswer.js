import Vue from 'vue';
import ElementUI from 'element-ui';
import axios from 'axios'
import '../../node_modules/element-ui/lib/theme-chalk/index.css';
import $ from "jquery";


Vue.use(ElementUI);


new Vue({
    el:"#app",
    data:{
        shijuan:'',
        kemu:'',
        time:'',
        point_id:'',
        answer:[],
        isShow:false,
        dialogVisible1: false,
    },
    mounted() {
        this.shijuan = this.GetQueryString("shijuan");
        this.time = this.GetQueryString("time");
        this.kemu = this.GetQueryString("kemu");
        this.point_id = this.GetQueryString("point_id");
        this.getOne();
    },
    methods:{
        handleChange:function() {
            this.isShow="true"
        },
        getOne:function(){
            if(this.shijuan!=null){
                axios.get('http://bl.mxmba.com/index.php?c=question_ctrl&m=answer_sheet_no_hand&shijuan='+this.shijuan)
                    .then(response=>{
                        console.log(response.data);
                        this.answer=response.data;
                    }).catch(response=> {
                    console.log(response);
                });
            }else if(this.kemu!=null){
                axios.get('http://bl.mxmba.com/index.php?c=tiku_exam_point_ctrl&m=answer_card&id='+this.kemu)
                    .then(response=>{
                        console.log(response.data.data);
                        this.answer=response.data.data;
                    }).catch(response=> {
                    console.log(response);
                });
            }
            else if(this.point_id!=null){
                axios.get('http://bl.mxmba.com/index.php?c=tiku_exam_point_ctrl&m=answer_card&point_id='+this.point_id)
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
        sendPaper:function () {
            axios.get('http://bl.mxmba.com/index.php?c=question_ctrl&m=answer_sheet_to_hand&shijuan='+this.shijuan+'&time='+this.time)
                .then(response=>{
                    this.dialogVisible1 = false;
                    location.href="examPaperScore.html?shijuan="+this.shijuan+"&time="+this.time;
                }).catch(response=> {
                console.log(response);
            });
        },
        handleClose(done) {
            // this.$confirm('确认关闭？')
            //     .then(_ => {
            //         done();
            //     })
            //     .catch(_ => {});
            this.dialogVisible1 = false;
        },
    }
})