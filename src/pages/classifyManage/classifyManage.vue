<template>
    <div class="page-container">
        <el-row>
            <el-button type="primary" v-if="type == 'course'">
                <router-link class="white" :to="{path:`/createType/curriculum/0/new`}">新建课程分类</router-link>
            </el-button>
            <el-button type="primary" v-else>
                <router-link class="white" :to="{path:`/createType/activity/0/new`}">新建活动分类</router-link>
            </el-button>
        </el-row>

        <div class="table">
            <el-table :data="typeList" style="width: 100%">
                <el-table-column label="分类编号" prop="dictCode"></el-table-column>
                <el-table-column label="分类名称" prop="dictName"></el-table-column>
                <!-- <el-table-column label="关联课程数量" prop="dictCode"></el-table-column> -->
                <!-- <el-table-column label="创建时间"></el-table-column> -->
                <el-table-column
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <router-link class="click-btn none" :to="{path:`/createType/curriculum/${scope.row.dictCode}/edit`}"  v-if="type == 'course'">编辑</router-link>
                        <router-link class="click-btn none" :to="{path:`/createType/activity/${scope.row.dictCode}/edit`}"  v-else>编辑</router-link>
                    </template>
                </el-table-column>
             </el-table>
        </div>
        
    </div>
</template>

<script>
import { getActivityTypeList, getCourseTypeList } from '../../http/api.js'
export default {
    data () {
        return {
            typeList:[],
            pageSize: 10,
            currentPage: 1,
            total: 0
        }
    },
    created () {
        let type = this.type = this.$route.params.type

        this.switchPath(type)
    },
    methods: {
        getActType() {
            getActivityTypeList().then(res => {
                this.typeList = res
            }) 
        },
        getCourseType() {
            getCourseTypeList().then(res => {
                this.typeList = res
            })
        },
        switchPath(type) {
            if(type == 'course') {
                this.getCourseType()
            }else {
                this.getActType()
            }
        }
    },
    watch: {
        '$route'(newPath,oldPath) {
            if(newPath) {
                let type = this.type = newPath.params.type
                this.switchPath(type)
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.page-container{
    // bottom:0;
    .table{
        padding-top:30px;
    }
}
</style>