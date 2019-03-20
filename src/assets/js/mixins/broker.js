export let  broker =  {
    data () {
        return {
            broker:[]
        }
    },
    methods: {
        // 获取经纪人列表
        getBroker(keyword) {
            brokerList({
                keyWords: keyword
            }).then(res => {
                if(res) {
                    this.broker = res
                    this.loading = false
                }
            })
        },
        // 搜索逻辑
        remoteMethod(query) {
        
            if (query !== '') { 
                this.loading = true
                this.getBroker(query)
            }else {
                this.broker = []
            }
        },
    }
    
}