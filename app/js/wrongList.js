import Vue from 'vue';
import axios from 'axios';
import $ from 'jquery';
import ElementUI from 'element-ui';
import '../../node_modules/element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);
require('../css/list.css');


new Vue({
    el:"#app",
    data:{
        activeIndex: '1',
        list:'',
        subject:''
    },
    mounted() {
        this.getList();
    },
    methods:{
        handleChange(val) {
            console.log(val);
        },
        getList:function(){
            var that=this;
            axios.get('http://bl.mxmba.com/index.php?c=tiku_exam_point_ctrl&m=show_subjects')
                .then(function (response) {
                    that.list=response.data.data;
                })
                .catch(function (response) {
                    console.log(response);
                });
            axios.get('http://bl.mxmba.com/index.php?c=tiku_wrong_question_ctrl&m=get_wrong_exam_point_msg')
                .then(function (response) {
                    console.log(response.data.data);
                    that.subject=response.data.data;
                })
                .catch(function (response) {
                    console.log(response);
                });
        },
        clickList:function(event){
            var that=this;
            console.log(event.$attrs.cid);
            var url=event.$attrs.cid;

            axios.get('http://bl.mxmba.com/index.php?c=tiku_wrong_question_ctrl&m=get_wrong_exam_point_msg',
                {
                    params: { 'sub_id': url }
                })
                .then(function (response) {
                    console.log(response.data.data);
                    that.subject=response.data.data;
                })
                .catch(function (response) {
                    console.log(response);
                });
        },
        open6:function(pid,cp,type) {
            console.log(pid,cp,type);
            this.$confirm('', '本考点下题已答完', {
                confirmButtonText: '删除答案重做',
                cancelButtonText: '继续看旧答案',
                type: 'warning',
                center: true
            }).then(() => {
                if(type==1){
                    var that=this;
                    axios.get('http://bl.mxmba.com/index.php?c=tiku_exam_point_ctrl&m=del_answer&id='+pid+'&sub_id='+cp)
                        .then(function (response) {
                            console.log(response);
                            if(response.data.status==0){
                                that.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                location.href="PracticeInterface.html?kemu="+pid+"&timu="+0;
                            }else{
                                that.$message({
                                    type: 'success',
                                    message: '删除失败!'
                                });
                            }
                        })
                        .catch(function (response) {
                            console.log(response);
                        });


                }else{
                    var that=this;
                    axios.get('http://bl.mxmba.com/index.php?c=tiku_exam_point_ctrl&m=del_answer&point_id='+pid+'&sub_id='+cp)
                        .then(function (response) {
                            if(response.data.status==0){
                                that.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                location.href="PracticeInterface.html?pointId="+pid+"&timu="+0;
                            }else{
                                that.$message({
                                    type: 'success',
                                    message: '删除失败!'
                                });
                            }
                        })
                        .catch(function (response) {
                            console.log(response);
                        });


                }


            }).catch(() => {
                console.log(pid,cp,type);
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
                if(type==1){
                    location.href="PracticeInterface.html?kemu="+pid+"&timu="+0;
                }else{
                    location.href="PracticeInterface.html?pointId="+pid+"&timu="+0;
                }
                // location.href="PracticeInterface.html?kemu="+pid+"&timu="+0;
            });
        }
    }
})