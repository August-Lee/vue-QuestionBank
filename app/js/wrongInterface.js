import Vue from 'vue'
import axios from 'axios'
import $ from 'jquery'
import ElementUI from 'element-ui'
import '../../node_modules/element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
var VueTouch = require('vue-touch');
Vue.use(VueTouch, {name: 'v-touch'});
import {store,More} from '../../com/more';
new Vue({
    el:"#app",
    data:{
        all:'',
        remark:"答案",
        radio1: '1',
        radio: '',
        isShow:false,
        dialogVisible: false,
        dialogVisible1: false,
        dialogImageUrl: '',
        dialogVisible2: false,
        timu:'',
        timuId:'',
        point_id:'',
        kemu:'',
        allData:'',
        htm:[],
        shijuan:'',
        subject_id:'',
        is_wrong:'',
        is_wrongId:'',
        checkList:[],
        typeId:'',
        textarea:'',
        cue:'',
        start:'',
        end:'',
        answer_type:'1',
        answerId:'',
        question_type:'1',
        fileList2: [],
        timu_title:''
    },
    computed: {
        changeDia() {
            return store.state.count;
        }
    },
    watch: {
        changeDia:function(a,b){
            console.log(a);
            this.dialogVisible1=a;
        }
    },
    mounted() {
        this.getList();
        this.kemu = this.GetQueryString("kemu");
        this.point_id = this.GetQueryString("pointId");
        this.timuId = this.GetQueryString("timu");
        // if(a==null){
        //     this.timuId=0;
        // }else{
        //     this.timuId=a;
        // }
        this.getOne();
    },
    methods:{
        onSwipeLeft:function(){
            if(this.timuId>=(this.cue.whole-1)){
            }else{
                this.timuId++;
                this.getOne();
                $(".main").scrollTop(0)
            }
        },
        onSwipeRight:function(){
            if(this.timuId<=0){
            }else{
                this.timuId--;
                this.getOne();
                $(".main").scrollTop(0)
            }
        },
        onSwipeTop:function(){
            if(this.timuId<=0){
                this.timuId=0;
                this.getOne();
                $(".main").scrollTop(0)

            }else{
                this.timuId--;
                this.getOne();
                $(".main").scrollTop(0)
            }
        },
        getList:function(){
            var that=this;
            axios.get('http://bl.mxmba.com/index.php?c=tiku_exam_point_ctrl&m=get_error_correction_type')
                .then(function (response) {
                    that.checkList=response.data.data;
                })
                .catch(function (response) {
                    console.log(response);
                });
        },
        radioChange:function(val) {
            this.radio1=val;
            this.isShow=true;
            this.remark="取消查看";
            if(this.kemu!=null){
                axios.get('http://bl.mxmba.com/index.php?c=tiku_exam_point_ctrl&m=set_answer&id='+this.kemu+'&user_answer='+this.radio1+'&right_answer='+this.all.right_answer+'&question_id='+this.shijuan+'&sub_id='+this.subject_id)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            }else{
                axios.get('http://bl.mxmba.com/index.php?c=tiku_exam_point_ctrl&m=set_answer&point_id='+this.point_id+'&user_answer='+this.radio1+'&right_answer='+this.all.right_answer+'&question_id='+this.shijuan+'&sub_id='+this.subject_id)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            }
        },
        checkChange:function(val){
            this.typeId=val;
        },
        GetQueryString:function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
            var r = window.location.search.substr(1).match(reg);
            if (r!=null) return (r[2]); return null;
        },
        setImg:function(){
            var params={img_answer:{imgList:this.fileList2}}
            console.log(params);
            if(this.fileList2.length==0){
                console.log('kong1')
            }else {
                axios.get('http://bl.mxmba.com/index.php?c=tiku_exam_point_ctrl&m=set_answer&id=' + this.answerId + '&question_id=' + this.shijuan + '&sub_id=' + this.subject_id + '&question_type=' + this.question_type,
                    {params}
                )
                    .then(function (response) {
                        // console.log(response);
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            }
        },
        setText:function(){
            var params={text_answer:this.radio1}
            console.log(params);
            if(this.radio1==null){
                console.log('kong')
            }else {
                axios.get('http://bl.mxmba.com/index.php?c=tiku_exam_point_ctrl&m=set_answer&id=' + this.answerId + '&question_id=' + this.shijuan + '&sub_id=' + this.subject_id + '&question_type=' + this.question_type,
                    {params}
                ).then(function (response) {
                    // console.log(response);
                })
                    .catch(function (response) {
                        console.log(response);
                    });
            }
        },
        onSubmit:function() {
            var that=this;
            axios.get('http://bl.mxmba.com/index.php?c=tiku_exam_point_ctrl&m=input_error_correction&question_id='+this.shijuan+'&type='+this.typeId+'&content='+this.textarea)
                .then(function (response) {
                    console.log(response);
                    store.state.count=false;
                    that.textarea='';
                })
                .catch(function (response) {
                    console.log(response);
                });
        },
        getOne:function(){
            $(".MathJax").remove();
            if(this.point_id==null){
                axios.get('http://bl.mxmba.com/index.php?c=tiku_wrong_question_ctrl&m=get_wrong_question_msg&id='+this.kemu+'&complete='+this.timuId)
                    .then(response=>{
                        this.isShow=false;
                        this.remark="答案"
                        if(response.data.msg=="没有更多信息"){
                        }else{
                            this.radio1=response.data.user_answer;
                            if(this.radio1==""){
                                this.isShow=false;
                                this.remark="答案"
                            }else{
                                this.isShow=true;
                                this.remark="取消查看"
                            }
                            this.shijuan=response.data.data[0].global_id;
                            this.answerId=response.data.data[0].point_id;
                            this.subject_id=response.data.data[0].subject_id;
                            this.timu_title=response.data.data[0].title;
                            this.cue = response.data.cue;
                            this.question_type = response.data.question_type;
                            this.answer_type=response.data.answer_type;
                            this.timuId = response.data.complete;
                            if(response.data.answer_type==2){
                                this.radio1='';
                                this.fileList2=response.data.user_answer.imgList;
                            }else if(response.data.answer_type==1){
                                console.log(response.data.user_answer);
                                this.radio1=response.data.user_answer;
                                this.fileList2=[];
                            }
                            if(response.data.is_wrong==""){
                                this.is_wrong="加入错题"
                                this.is_wrongId=response.data.is_wrong
                            }else{
                                this.is_wrong="移出错题"
                                this.is_wrongId=response.data.is_wrong
                            }

                            this.all=response.data.answer;
                            this.timu=response.data.stem;

                            this.htm=response.data.switch;
                            setInterval(function() {
                                MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                            }, 100)

                        }
                    })
                    .catch(response=> {
                        console.log(response);
                    });
            }else{
                axios.get('http://bl.mxmba.com/index.php?c=tiku_wrong_question_ctrl&m=get_wrong_question_msg&point_id='+this.point_id+'&complete='+this.timuId)
                    .then(response=>{
                        this.isShow=false;
                        this.remark="答案"
                        if(response.data.msg=="没有更多信息"){
                        }else{
                            this.radio1=response.data.user_answer;
                            if(this.radio1==""){
                                this.isShow=false;
                                this.remark="答案"
                            }else{
                                this.isShow=true;
                                this.remark="取消查看"
                                console.log(111);
                            }
                            this.shijuan=response.data.data[0].global_id;
                            this.answerId=response.data.data[0].point_id;
                            this.subject_id=response.data.data[0].subject_id;
                            this.timu_title=response.data.data[0].title;
                            this.cue = response.data.cue;
                            this.question_type = response.data.question_type;
                            this.timuId = response.data.complete;
                            if(response.data.answer_type==2){
                                this.radio1='';
                                this.fileList2=response.data.user_answer.imgList;
                            }else if(response.data.answer_type==1){
                                this.radio1=response.data.user_answer;
                                this.fileList2=[];
                            }
                            this.answer_type=response.data.answer_type;
                            console.log(response.data.is_wrong)
                            if(response.data.is_wrong==""){
                                this.is_wrong="加入错题"
                                this.is_wrongId=response.data.is_wrong
                            }else{
                                this.is_wrong="移出错题"
                                this.is_wrongId=response.data.is_wrong
                            }
                            this.all=response.data.answer;
                            this.timu=response.data.stem;

                            this.htm=response.data.switch;
                            setInterval(function() {
                                MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                            }, 100)
                        }
                    })
                    .catch(response=> {
                        console.log(response);
                    });
            }
        },
        nextFun:function () {
        },
        handleChange:function() {
            this.isShow=!this.isShow
            if(this.isShow==false){
                this.remark="答案"
            }else{
                this.remark="取消查看"
            }
        },
        handleClose(done) {
            store.state.count=false;
        },
        yichu:function(){
            var that=this;
            if(this.is_wrong=="加入错题"){
                axios.get('http://bl.mxmba.com/index.php?c=tiku_exam_point_ctrl&m=join_mistake&question_id='+this.shijuan)
                    .then(function (response) {
                        that.dialogVisible = false;
                        that.is_wrong="移出错题";
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            }else{
                axios.get('http://bl.mxmba.com/index.php?c=tiku_exam_point_ctrl&m=remove_mistake&wrong='+this.is_wrongId)
                    .then(function (response) {
                        console.log(that.dialogVisible);
                        that.dialogVisible = false;
                        that.onSwipeTop();
                        that.is_wrong="加入错题";
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
                }
        },
        handleCommand(command) {
            if(command=="a"){
                this.dialogVisible1=true
            }
        },
        handleRemove(file, fileList) {
            // console.log(file);
            console.log(fileList);
            this.fileList2=fileList;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            console.log(file.url);
            this.dialogVisible2 = true;
        },
        sendSuccess(response, fileList){
            console.log(response);
            console.log(fileList);
        },
        sendChange(file,fileList){
            this.fileList2=fileList;

        }

    }
})