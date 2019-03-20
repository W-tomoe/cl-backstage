<template>
    <div class="page-container">
        <div v-if="newsList.length > 0">
            <div v-for="(item, index) in newsList" :key="index">
                <new-list :list='item'></new-list>
            </div>
        </div>

        <div class="empty" v-else>
            <span>暂无消息</span>
        </div>


        <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10,50, 100, 150, 200, 250, 300]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
import newList from 'components/newList/newList'
import { getMessageList } from '../../http/api.js'
export default {
    data () {
        return {
            newsList: [], // 消息列表
            currentPage:1,
            total: 0,
            pageSize: 10
        }
    },
    created() {
        this.getList()
    },
    methods: {
        handleSizeChange(size) {
            this.pageSize = size
            this.getList()
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage
            this.getList()
        },
        getList() {
            getMessageList({
                pageNum: this.currentPage,
                pageSize: this.pageSize
            }).then(res => {
                console.log(res,'消息通知')
                this.total = res.total 
                this.newsList = res.list
            })
        }
    },
    components: {
        newList
    }
}
</script>


<style lang="scss" scoped>
.page-container{
    // bottom:0;
}
</style>