Vue.component('datepicker',{
    template:'<input v-model="date"/>',
    props: ['date'],
    mounted:function () {
        var thiz = this;
        $(this.$el).datepicker({
            format: "yyyy-MM-dd",
            todayBtn: true,
            autoclose: true,
            language:'cn'
        }).on('changeDate',function(){
            thiz.date = this.value;
            thiz.$emit('update:date', this.value)
        });
    }
});