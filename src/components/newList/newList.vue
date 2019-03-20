<template>
    <div class="news">
        <div>
            <span class="type">{{list.title}}</span>
            <span class="time">{{list.createTime}}</span>
        </div>
        <div class="content">
            {{list.content}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        list:{
            type:Object,
            default: () => {}
        }
    }
}
</script>


<style lang="scss" scoped>
.news{
    font-size: 14px;
    border-bottom: 1px solid #dddddd;
    padding-top: 20px;
    ::after{
        display: block;
        content: ' ';
        clear: both;
    }
    .type{
        float: left;
        font-size: 16px;
        font-weight: bold;
    }
    .time{
        float: right;
    }
    .content{
        padding: 27px 0 19px;
    }
}
</style>
