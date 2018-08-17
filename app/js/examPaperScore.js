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
        time:'',
        answer:[],
        sub:[],
        timu:'',
        isShow:false,
        dialogVisible1: false,
        tableData: [{
            date: '数学',
            name: '53:22',
            address: '53分',
            all:[{
                date: '数学',
                name: '53:22',
                address: '53分',
            },
            {
                date: '111数学',
                name: '53:22',
                address: '53分',
            }]
        }, {
            date: '逻辑',
            name: '30:20',
            address: '45分',
            all:[{
                date: '数学',
                name: '53:22',
                address: '53分',
            },
                {
                    date: '111数学',
                    name: '53:22',
                    address: '53分',
                }]

        }, {
            date: '写作',
            name: '32:02',
            address: '33分',
            all:[{
                date: '数学',
                name: '53:22',
                address: '53分',
            },
                {
                    date: '111数学',
                    name: '53:22',
                    address: '53分',
                }]
        }],
        tableData3: [{
            date: '数学',
            name: '1',
            address: '01:22',
            tru: '√'
        }, {
            date: '数学',
            name: '2',
            address: '02:15',
            tru: '√'
        }, {
            date: '数学',
            name: '3',
            address: '02:15',
            tru: '√'
        },{
            date: '数学',
            name: '4',
            address: '02:15',
            tru: '√'
        },  {
            date: '写作',
            name: '1',
            address: '00:55',
            tru: 'x'
        }]
    },
    mounted() {
        this.shijuan = this.GetQueryString("shijuan");
        this.time = this.GetQueryString("time");
        this.getOne();
    },
    methods:{
        handleChange:function() {
            this.isShow="true"
        },
        getOne:function(){
            axios.get('http://bl.mxmba.com/index.php?c=question_ctrl&m=answer_sheet&shijuan='+this.shijuan+'&time='+this.time)
                .then(response=>{
                    this.answer=response.data.score;
                    this.sub=response.data.subject;
                    this.timu=response.data.first_timu_id;
                    console.log(this.timu);
                }).catch(response=> {
                    console.log(response);
                });

        },
        GetQueryString:function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
            var r = window.location.search.substr(1).match(reg);
            if (r!=null) return (r[2]); return null;
        },
        clickRow:function (row, column, cell, event) {
            console.log(row.timu_id,row.timu_seq,this.shijuan);
            location.href="practiceParsing.html?shijuan="+this.shijuan+"&timuId="+row.timu_id;
        },
        goparse:function () {
            console.log(this.timu)
            location.href="practiceParsing.html?shijuan="+this.shijuan+"&timuId="+this.timu;
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
    }
})