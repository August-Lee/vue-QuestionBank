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
        subject:'',
        tableData: [{
            rank: '1',
            name: '3306',
            eng: '80',
            zong: '80',
            num:'160'
        }, {
            rank: '2',
            name: '3306',
            eng: '80',
            zong: '80',
            num:'160'
        }, {
            rank: '3',
            name: '3306',
            eng: '80',
            zong: '80',
            num:'160'
        }, {
            rank: '4',
            name: '3306',
            eng: '80',
            zong: '80',
            num:'160'
        }],
        currentRow: null
    },
    mounted() {
        this.getList();
        this.setCurrent(this.tableData[0]);
    },
    methods:{
        setCurrent(row) {
            this.$refs.singleTable.setCurrentRow(row);
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
        }
    }
})