Vue.component('pagination',{
    template:
    '<div id="pagination" class="row-fluid">' +
    '    <div class="span6">' +
    '        <i v-show="paging.pages<1">没有符合条件的数据</i>' +
    '    </div>' +
    '    <div class="span6">' +
    '        <div class="pagination pull-right">' +
    '            <ul>' +
    '                <li v-if="hasPrev"><a href="#" @click="changePage(0)">首页</a></li>' +
    '                <li v-if="hasPrev"><a href="#" @click="changePage(paging.page-1)">上页</a></li>' +
    '                <li v-if="!hasPrev" class="disabled"><a href="#">首页</a></li>' +
    '                <li v-if="!hasPrev" class="disabled"><a href="#">上页</a></li>' +
    '                <li v-for="i in limit" :class="{ active: offset+i-1==paging.page }"><a href="#" @click="changePage(offset-1+i)">{{offset+i}}</a></li>' +
    '                <li v-if="hasNext"><a href="#" @click="changePage(paging.page+1)">下页</a></li>' +
    '                <li v-if="hasNext"><a href="#" @click="changePage(paging.pages-1)">尾页</a></li>' +
    '                <li v-if="!hasNext" class="disabled"><a href="#">下页</a></li>' +
    '                <li v-if="!hasNext" class="disabled"><a href="#">尾页</a></li>' +
    '            </ul>' +
    '        </div>' +
    '    </div>' +
    '</div>',
    props: {
        paging: {
            type: Object,
            default: function () {
                return { size:10,page:0,total:0,pages:0 }
            }
        }
    },
    data:function () {
        return {
            limit: 0,
            maxPages: 10,
            offset: 0,
            hasPrev: false,
            hasNext: false,
            canFirst: false,
            canLast: false
        }
    },
    watch:{
        paging:function(val){
            this.dataChanged(val);
        }
    },
    methods:{
        changePage:function (to) {
            this.$emit('changepage',to);
        },
        dataChanged:function (data) {
            //计算总页数
            if(data.size<=0){
                this.paging.pages = 0;
                this.limit = 0;
            }
            else{
                this.limit = this._min(this.paging.pages,this.maxPages);

                if(this.paging.pages<=this.maxPages || this.paging.page<=5){
                    this.offset=0;
                }else{
                    var subLen = this.paging.pages-1-this.paging.page;
                    var up = this.paging.page+this._min(subLen,4);
                    this.offset = up-this.maxPages+1;
                }
            }
            //修改按钮状态
            this.hasPrev = this.paging.pages>1&&this.paging.page>0;
            this.hasNext = this.paging.page<this.paging.pages-1;
        },
        _max:function(n1,n2){
            return n1>n2?n1:n2;
        },
        _min:function(n1,n2){
            return n1<n2?n1:n2;
        }
    }
})