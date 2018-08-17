import Vue from 'vue'
import axios from 'axios'
import $ from 'jquery'
import ElementUI from 'element-ui'
import '../../node_modules/element-ui/lib/theme-chalk/index.css';
import Vuex from 'vuex'
Vue.use(Vuex)
Vue.use(ElementUI);
var VueTouch = require('vue-touch');
Vue.use(VueTouch, {name: 'v-touch'});
var time=0;
var t1;
import {store,More} from '../../com/more';
var vm=new Vue({
    el:"#app",
    data:{
        all:'',
        remark:"标记",
        radio1: '1',
        radio: '',
        isShow:false,
        dialogVisible: false,
        dialogVisible1: false,
        dialogImageUrl: '',
        dialogVisible2: false,
        dialogVisible3: false,
        timu:'',
        htm:[],
        time:0,
        timuId:"timu-5ab899aa0e2b2",
        shijuan:"shijuan-5ab8961937611",
        userId:"1234",
        is_wrong:'',
        is_wrongId:'',
        checkList:[],
        typeId:'',
        textarea:'',
        benti:'',
        nothing:'',
        type:'',
        answer_type:'1',
        answerId:'',
        question_type:'1',
        fileList2: [],
        wanxing:'',
        title:'',
        radioDis:false
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
        console.log(store.state.count);
        this.time_fun();
        this.shijuan = this.GetQueryString("shijuan");
        this.timuId = this.GetQueryString("timuId");
        this.nothing = this.GetQueryString("time");
        this.getOne();
        this.getList();
    },
    methods:{
        setImg:function(){
            window.clearInterval(t1);
            var jsonList={id:this.all.timu_seq,userID:this.userId,shijuanID:this.shijuan,option:{imgList:this.fileList2},timuID:this.benti,time:time,subject:this.all.subject,answer_stand:this.all.answer_stand}
            console.log(this.fileList2);
            if(this.fileList2.length==0){
                console.log('kong1')
            }else{
                axios.get('http://bl.mxmba.com/index.php?c=question_ctrl&m=save_timu',
                    {
                        params: {jsonList}
                    })
                    .then(function (response) {
                        console.log(response)
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
                if(this.all.msg=="last"){
                    location.href="simulationPaperAnswer.html?shijuan="+this.shijuan+"&time="+this.time;
                }else{
                    this.getOne();
                }
            }
        },
        setText:function(){
            window.clearInterval(t1);
            var jsonList={id:this.all.timu_seq,userID:this.userId,shijuanID:this.shijuan,option:{text_answer:this.radio1},timuID:this.benti,time:time,subject:this.all.subject,answer_stand:this.all.answer_stand}
            console.log(this.radio1);
            if(this.radio1==null){
                console.log('kong')
            }else{
                axios.get('http://bl.mxmba.com/index.php?c=question_ctrl&m=save_timu',
                    {
                        params: {jsonList}
                    })
                    .then(function (response) {
                        console.log(response)
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
                if(this.all.msg=="last"){
                    location.href="simulationPaperAnswer.html?shijuan="+this.shijuan+"&time="+this.time;
                }else{
                    this.getOne();
                }
            }
        },
        onSwipeLeft:function(){
            window.clearInterval(t1);
            if(this.type==3){
                this.wanxing="true"
            }else{
                this.wanxing="false"
            }
            this.getOne();
        },
        onSwipeRight:function(){
            window.clearInterval(t1);
            this.timuId=this.all.last_timu_id;
            if(this.type==3){
                this.wanxing="true"
            }else{
                this.wanxing="false"
            }
            this.getOne();

        },
        radioChange:function(val) {
              window.clearInterval(t1);
              var jsonList={id:this.all.timu_seq,userID:this.userId,shijuanID:this.shijuan,option:val,timuID:this.benti,time:time,subject:this.all.subject,answer_stand:this.all.answer_stand}
              var link=Number(this.all.timu_seq)+1;
              axios.get('http://bl.mxmba.com/index.php?c=question_ctrl&m=save_timu',
                {
                    params: {jsonList}
                })
                .then(function (response) {
                    location.href="#english"+link;
                    $("#english"+link).text('_'+val+'_');
                    $("#english"+link).css("background","#ccc");
                })
                .catch(function (response) {
                    console.log(response);
                });
                if(this.all.msg=="last"){
                    location.href="examPaperAnswer.html?shijuan="+this.shijuan+"&time="+this.time;
                }else{
                    this.getOne();
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
        checkChange:function(val){
            this.typeId=val;
        },
        GetQueryString:function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
            var r = window.location.search.substr(1).match(reg);
            if (r!=null) return (r[2]); return null;
        },
        getOne:function(){
            $(".MathJax").remove();
            time=0;
            axios.get('http://bl.mxmba.com/index.php?c=question_ctrl&m=sel&exam_paper_id='+this.shijuan+'&timu_id='+this.timuId+'&time='+this.nothing)
                .then(response=>{
                    console.log(this.all.msg);
                    if(response.data.msg==undefined){
                        location.href='test1.html';
                    } else {
                        if(response.data.is_wrong==""){
                            this.is_wrong="加入错题";
                            this.is_wrongId=response.data.is_wrong
                        }else{
                            this.is_wrong="移出错题";
                            this.is_wrongId=response.data.is_wrong
                        }
                        if(response.data.sign==1){
                            this.remark="取消标记"
                        }else {
                            this.remark="标记"
                        }
                        this.radio1=response.data.user_answer;
                        this.benti=response.data.timu_id;
                        this.timuId=response.data.next_timu_id;
                        this.type=response.data.type;
                        this.answer_type=response.data.answer_type;
                        this.title=response.data.title;
                        this.all=response.data;
                        if(response.data.answer_type==2){
                            console.log(response.data.user_answer);
                            this.radio1='';
                            this.fileList2=response.data.user_answer.imgList;
                        }else if(response.data.answer_type==1){
                            console.log(response.data.user_answer);
                            this.radio1=response.data.user_answer;
                            this.fileList2=[];
                        }
                        var arr=[], html={}, s = response.data.data, _ = /\[img_pre\]/g, llsnt = s.replace(_, '<img src="'), l = /\[img_end\]/g, llsnt = llsnt.replace(l, '">');
                        $("#none").html(llsnt);
                        var textArr= $(".wen .text_arr"),
                        page = "";
                        $.each(textArr,function() {
                            var i = $(this).find(".TEXT");
                            $.each(i, function() {
                                page += $(this).html()
                            })
                        });
                        if(this.wanxing==true){

                        }else{
                            this.timu=page;
                        }
                        MathJax.Hub.Queue(["Typeset", MathJax.Hub])

                        var p = $(".option_arr .option");
                        $.each(p,function(){
                            var t = $(this).find(".OPTION_ID").text(),s = t.replace(/[#]/g, ""),_ = $(this).find(".text_arr"),l = "";
                            $.each(_, function() {
                                var i = $(this).find(".TEXT");
                                $.each(i,
                                    function() {
                                        l += $(this).html()
                                    })
                            });
                            var html={"option":s,"list":l};
                            arr.push(html);
                        });
                        this.htm=arr;
                        t1=window.setInterval(function(){time++;},1000);
                    }
                    setInterval(function() {
                            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                            }, 500)
                })
                .catch(response=> {
                    console.log(response);
                });
        },
        onSubmit:function() {
            var that=this;
            axios.get('http://bl.mxmba.com/index.php?c=tiku_exam_point_ctrl&m=input_error_correction&question_id='+this.benti+'&type='+this.typeId+'&content='+this.textarea)
                .then(function (response) {
                    console.log(response);
                    store.state.count=false;
                    that.textarea='';
                })
                .catch(function (response) {
                    console.log(response);
                });
        },
        yichu:function(){
            var that=this;
            if(this.is_wrong=="加入错题"){
                axios.get('http://bl.mxmba.com/index.php?c=tiku_exam_point_ctrl&m=join_mistake&question_id='+this.all.timu_id)
                    .then(function (response) {
                        console.log(response);
                        that.dialogVisible = false;
                        that.is_wrong="移出错题";
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            }else{
                axios.get('http://bl.mxmba.com/index.php?c=tiku_exam_point_ctrl&m=remove_mistake&wrong='+this.is_wrongId)
                    .then(function (response) {
                        console.log(response);
                        console.log(that.dialogVisible);
                        that.dialogVisible = false;
                        that.is_wrong="加入错题";
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            }
        },
        handleChange:function() {
            this.isShow=!this.isShow
            if(this.isShow==false){
                this.remark="标记"
                var jsonList={timu_seq:this.all.timu_seq,shijuanID:this.shijuan,timuID:this.all.timu_id,subject:this.all.subject,sign:"0"}
                console.log(jsonList);
                axios.get('http://bl.mxmba.com/index.php?c=question_ctrl&m=timu_sign',
                    {
                        params: {jsonList}
                    })
                    .then(function (response) {
                        console.log(response)
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            }else{
                this.remark="取消标记"
                var jsonList={timu_seq:this.all.timu_seq,shijuanID:this.shijuan,timuID:this.all.timu_id,subject:this.all.subject,sign:"1"}
                console.log(jsonList);
                axios.get('http://bl.mxmba.com/index.php?c=question_ctrl&m=timu_sign',
                    {
                        params: {jsonList}
                    })
                    .then(function (response) {
                        console.log(response)
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            }
        },
        handleClose(done) {
            // this.$confirm('确认关闭？')
            //     .then(_ => {
            //         done();
            //     })
            //     .catch(_ => {});
            store.state.count=false;
        },
        handleClose1(done) {
          this.dialogVisible3=false;
        },

        time_fun:function() {
            var that=this;
            document.getElementById("mytime").innerText = "00:00:00";
            var sec=0;
            setInterval(function () {
                sec++;
                var date = new Date(0, 0)
                date.setSeconds(sec);
                var h = date.getHours(), m = date.getMinutes(), s = date.getSeconds();
                that.time= that.two_char(h) + ":" + that.two_char(m) + ":" + that.two_char(s);
                document.getElementById("mytime").innerText=that.time;
                if(that.time=="03:00:00"){
                    that.$message({
                        message: '答题时间已到，禁止答题',
                        type: 'warning'
                    });
                    that.radioDis=true;
                }

            }, 1000);
        },
        two_char:function(n) {
            return n >= 10 ? n : "0" + n;
        },
        handleRemove(file, fileList) {
            // console.log(file);
            console.log(fileList);
            this.fileList2=fileList;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            console.log(file.url)
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