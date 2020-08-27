<template>
    <div>
        <div>
            <table>
                <tr>
                    <td v-for="(r,i) in rewardArr1" :key="i" :class="{'check':selectIndex==i}">{{r.name}}</td>
                </tr>
                <tr>
                    <td :class="{'check':selectIndex==9}">{{rewardArr2[0].name}}</td>
                    <td colspan="2">
                        <el-button type="primary" @click="letBegin">开始({{$store.state.count}})</el-button>
                    </td>
                    <td :class="{'check':selectIndex==4}">{{rewardArr2[1].name}}</td>
                </tr>
                <tr>
                    <td v-for="(r,i) in rewardArr3" :key="i" :class="{'check':8-selectIndex==i}">{{r.name}}</td>
                </tr>
            </table>
        </div>
        <div>
            <el-table :data="historyArr" border>
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column prop="time" label="时间"></el-table-column>
                <el-table-column prop="selectItem.name" label="结果"></el-table-column>
                <el-table-column prop="probability" label="抽中概率"></el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    import moment from 'moment';
    export default {
        name:"luckDraw",
        data(){
            return{
                selectIndex:0,
                rewardArr1:[
                    {
                        name:"Java",
                        probability:0.1
                    },
                    {
                        name:"Php",
                        probability:0.1
                    },
                    {
                        name:"Python",
                        probability:0.1
                    },
                    {
                        name:"Go",
                        probability:0.1
                    }
                ],
                rewardArr2:[
                    {
                        name:"C",
                        probability:0.1
                    },
                    {
                        name:"C++",
                        probability:0.1
                    }
                ],
                rewardArr3:[
                    {
                        name:"C#",
                        probability:0.1
                    },
                    {
                        name:"Html",
                        probability:0.1
                    },
                    {
                        name:"Js",
                        probability:0.1
                    },
                    {
                        name:"Css",
                        probability:0.1
                    }
                ],
                probabilityArr:[],
                historyArr:[]
            }
        },
        created() {
            // console.log(this.$store.state.count)
            // 生成概率区间
            let _arr = [];
            let _sum = 0; //计概率总和
            this.rewardArr1.map(function (value) {
                let _p = value.probability * 1000;
                _arr.push(_sum + _p);
                _sum += _p;
            });
            this.rewardArr2.map(function (value) {
                let _p = value.probability * 1000;
                _arr.push(_sum + _p);
                _sum += _p;
            });
            this.rewardArr3.map(function (value) {
                let _p = value.probability * 1000;
                _arr.push(_sum + _p);
                _sum += _p;
            });
            this.probabilityArr = _arr;
        },
        methods:{
            letBegin() {
                if(this.$store.state.count==0){
                    this.$message("已无更多次数！");
                    return;
                }
                this.$store.commit('costCount');

                this.selectIndex = 0;
                // 生成一个1~1000的随机数
                let _num = Math.ceil(Math.random() * 1000);
                // 根据随机数所在的区间判断结果
                this.probabilityArr.some((value,index)=>{
                    if(_num<value){
                        // 这里的index就是最终要选中的那一项
                        // this.selectIndex = index;
                        this.goRotate(index);
                        // console.log(index)
                        return true;
                    }
                })
            },
            goRotate(index){
                // 转动速度 毫秒
                let _h = 50;
                let _r = setInterval(()=>{
                    this.selectIndex +=1;
                    if(this.selectIndex==10){
                        this.selectIndex=0;
                    }
                },_h);
                setTimeout(()=>{
                    clearInterval(_r);
                },_h*16);

                let _n = 0;
                let _r2 = setInterval(()=>{
                    this.selectIndex +=1;
                    if(this.selectIndex==10){
                        this.selectIndex=0;
                    }
                    _n +=1;
                    if(_n==index+14){
                        clearInterval(_r2);
                        _n = 0;
                        //转圈结束之后 弹框提示抽到了什么
                        this.showResult();
                    }
                },_h*(2 + _n*11))
            },
            showResult(){
                let _selectIndex = this.selectIndex;
                let _selectItem = null;
                if(_selectIndex<4){
                    _selectItem = this.rewardArr1[_selectIndex]
                }else if(_selectIndex>4&&_selectIndex<9){
                    _selectItem = this.rewardArr3[8-_selectIndex]
                }else {
                    _selectItem = this.rewardArr2[_selectIndex==4?1:0]
                }
                console.log(_selectItem)
                console.log(_selectIndex)
                this.$alert(`恭喜！你抽到了${_selectItem.name}!`,'中奖提示',{
                    confirmButtonText: '确定',
                    callback: action => {
                        console.log(action)
                        // this.selectIndex = -1;
                        this.historyArr.push({
                            time:moment().format("YYYY-MM-DD HH:mm:ss"),
                            probability:_selectItem.probability*100+'%',
                            selectItem:_selectItem
                        })
                    }
                })
            }
        }
    }
</script>
<style>
    td{
        width: 80px;
        height: 40px;
        border:1px solid #ffffff;
    }
    td.check{
        border:1px solid #42b983;
    }
</style>