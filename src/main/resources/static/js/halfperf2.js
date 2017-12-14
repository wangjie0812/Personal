var halfperf2 = new Vue({
    el:"#content",
    data:{
        contents:[
            {id:'111',name:'张三',department:'项目部',self:4.6},
            {id:'222',name:'李四',department:'项目部',self:4.6},
            {id:'222',name:'李四',department:'项目部',self:4.6}
        ]
    },
    methods:{
        startHalfPerf:function () {
            Notification.init();
            Notification.alert("警告",'测试');

//                axios.get('halfperf/start')
//                .then(function (response) {
//                    if(response.data.code==0){
//
//                    }else{
//
//                    }
//                })
//                .catch(function (error) {
//                    console.log(error);
//                });
        }
    }
});