<template>
    <div>
        <div  class="limit" v-if="type == 'text'">
            <el-input type="text" :maxlength="maxlength" @input="input" :value='value' v-model="content" :placeholder="placeholder"></el-input>
            <span class="number">{{currentLength+'/'+maxlength}}</span>
        </div>

        <div  class="limit" v-else>
            <el-input type="textarea" :placeholder="placeholder" :rows="rows" :value='value' :maxlength="maxlength" @input="input" v-model="content"></el-input>
            <span class="textnumber">{{currentLength+'/'+maxlength}}</span>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        placeholder:{
            type:String,
            default:'请填写'
        },
        maxlength: {
            type: Number,
            default: 0
        },
        type:{
            type:String,
            default:'text'
        },
        rows: {
            type:Number,
            default:6
        },
        value:{
            type:String,
            default:''
        }
    },
    data() {
        return {
            currentLength: 0,
            content:''
        }
    },
    created() {

    },
    methods: {
        input() {
            this.currentLength = this.content.length
            this.$emit('input',this.content)
        }
    }
}
</script>

<style lang="scss" scoped>
.limit {
    position: relative;
    .number{
        position: absolute;
        top:50%;
        right: 15px;
        transform: translate(0,-50%);
        font-size: 14px;
    }
    .textnumber {
        position: absolute;
        bottom:10px;
        right: 10px;
        font-size: 14px;
    }
}
</style>
