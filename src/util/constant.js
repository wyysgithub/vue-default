export default {
    install(Vue) {
        Vue.prototype.constMap = {
            catSort: {
                'Age': '年龄最小',
                'Birthday': '出生时间',
                'LikeCount': '最多赞',
                'Price': '最贵的小猫'
            },
            catStatus:{
                '0':"初始小猫",
                '1':"在售小猫",
                '2':"求偶小猫"
            },
            basePath:"http://10.200.12.175:3000"
        }
        //post请求
        Vue.prototype.$post = function (url, params, successCallBack, errorCallBack) {
            this.$axios.post(url, params).then(res => {
                successCallBack(res.data)
            }).catch(err => {
                (errorCallBack && errorCallBack()) || this.$alert(err)
            })
        }

        //get请求
        Vue.prototype.$get = function (url, params, successCallBack, errorCallBack) {
            params = Object.assign({},params)
            console.log(params)
            this.$axios.get(url, {params:params}).then(res => {
                successCallBack(res.data)
            }).catch(err => {
                (errorCallBack && errorCallBack()) || this.$alert(err)
            })
        }
    }
}
