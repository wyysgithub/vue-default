<template>
    <div>
        <el-form :model="numInfo" ref="feedbackForm">
            <el-form-item label="十进制">
                <el-input v-model="numInfo.num10" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="transform(1)">10进制转62进制</el-button>
                <el-button type="primary" @click="transform(2)">62进制转10进制</el-button>
            </el-form-item>
            <el-form-item label="六十二进制">
                <el-input v-model="numInfo.num62"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="transform(3)">10进制转2进制</el-button>
                <el-button type="primary" @click="transform(4)">62进制转2进制</el-button>
                <el-button type="primary" @click="transform(5)">2进制转10进制</el-button>
            </el-form-item>
            <el-form-item label="二进制">
                <el-input type="textarea" v-model="numInfo.num2"></el-input>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    export default {
        name: "NumTransform",
        data() {
            return {
                numArr: [],
                numInfo: {
                    num10: 0,
                    num62: 0,
                    num2: 0
                }
            }
        },
        created() {
            //生成字符数组
            for (let i = 0; i < 10; i++) {
                this.numArr.push(i.toString());
            }
            for (let i = 0; i < 26; i++) {
                this.numArr.push(String.fromCharCode(97 + i));
            }
            for (let i = 0; i < 26; i++) {
                this.numArr.push(String.fromCharCode(65 + i));
            }
            // console.log(this.multiply('62', '1'))
            console.log(this.pow('2', 4))
        },
        methods: {
            transform(type) {
                let startTime = new Date().getTime();
                switch (type) {
                    case 1:
                        //10进制转62进制
                        var _result_str = '';
                        var _num = this.numInfo.num10;
                        while (_num > 0) {
                            // 除模获取余数，拿到对应字符，从末尾拼起
                            _result_str = this.numArr[_num % 62] + _result_str;
                            // 计算新数字，进行下个循环
                            _num = ~~(_num / 62);
                        }
                        console.log(_result_str);
                        this.numInfo.num62 = _result_str;
                        console.log(`耗时：${new Date().getTime() - startTime}ms`);
                        break;
                    case 2:
                        //62进制转10进制
                        var _str = this.numInfo.num62;
                        var _result_num = this.c62To10(_str);
                        this.numInfo.num10 = _result_num;
                        console.log(`耗时：${new Date().getTime() - startTime}ms`);
                        break;
                    case 3:
                        //10进制转换2进制
                        var _num10 = this.numInfo.num10;
                        // this.numInfo.num2 = parseInt(_num10).toString(2);

                        // var _result_num2 = 0;
                        // while (_num10<2){
                        //     _result_num2 = (_num10 % 2) + _result_num2;
                        //     _num10 = Math.round(_num10 / 2)
                        // }
                        // console.log(this.c10To2(_num10.toString()));
                        this.numInfo.num2 = this.c10To2(_num10.toString())
                        break;
                    case 4:
                        //62进制转换2进制
                        var _num62 = this.numInfo.num62;
                        //转成10进制
                        var _result_num10 = this.c62To10(_num62);
                        // 转成2进制
                        this.numInfo.num2 = this.c10To2(_result_num10);
                        console.log(`耗时：${new Date().getTime() - startTime}ms`);
                        break;
                    case 5:
                        //2进制转换10进制
                        // this.numInfo.num10 = parseInt(this.numInfo.num2 + '', 2);
                        this.numInfo.num10 = this.c2To10(this.numInfo.num2);
                        console.log(`耗时：${new Date().getTime() - startTime}ms`);
                        break;
                }
            },
            multiply(num1, num2) {
                //判断输入是不是数字
                if (isNaN(num1) || isNaN(num2)) return ''
                let len1 = num1.length,
                    len2 = num2.length
                let ans = []

                //这里倒过来遍历很妙,不需要处理进位了
                for (let i = len1 - 1; i >= 0; i--) {
                    for (let j = len2 - 1; j >= 0; j--) {
                        let index1 = i + j,
                            index2 = i + j + 1
                        let mul = num1[i] * num2[j] + (ans[index2] || 0)
                        ans[index1] = Math.floor(mul / 10) + (ans[index1] || 0)
                        ans[index2] = mul % 10
                    }
                }

                //去掉前置0
                let result = ans.join('').replace(/^0+/, '')

                //不要转成数字判断，否则可能会超精度
                return !result ? '0' : result
            },
            pow(num,mi){
                let _math_pow = Math.pow(Number(num),mi);
                if(isFinite(_math_pow)){
                    return _math_pow.toString();
                }else {
                    let _result = '1';
                    for(let i=0;i<mi;i++){
                        _result = this.multiply(num,_result)
                    }
                    return _result;
                }
            },
            add(str1, str2) {
                str1 = str1.toString().split("");
                str2 = str2.toString().split("");
                let result = "";//结果
                let flag = 0;
                while (str1.length || str2.length || flag) {
                    // 使用 ~~ 代替 Math.floor()
                    flag += ~~str1.pop() + ~~str2.pop();
                    result = flag % 10 + result;
                    flag = flag > 9;
                }
                return result.replace(/^0+/, '');
            },
            c10To2(str) {
                //十进制转二进制
                let arr = [];
                let remainder,str2, num, char;
                while (str.length > 0) {
                    str2 = "";
                    remainder = 0;
                    for (let i = 0; i < str.length; i++) { // str2 = str组成的十进制数 / 2
                        num = str.charCodeAt(i) - 0x30; // num to String
                        num = remainder * 10 + num;
                        // 使用 ~~ 代替Math.floor()
                        char = (~~(num / 2)).toString();
                        // 忽略最高为的0 ， 即最高为如果是 0 则不放入 str2
                        if (!(char === "0" && str2 === "")) {
                            str2 += char;
                        }
                        remainder = num % 2;
                    }
                    str = str2;
                    arr.push(remainder); // 保存余数
                }
                return arr.reverse().join('');
            },
            c62To10(str){
                let _result_str='';
                let _arr = str.split('');
                _arr.map((value) => {
                    _result_str = this.add(this.multiply('62', _result_str.toString()), this.numArr.indexOf(value).toString())
                    // console.log(`第${index}位${value}除模得到的值${this.numArr.indexOf(value)},总值${_result_num}`)
                });
                return _result_str;
            },
            c2To10(str){
                let _result_str = 0;
                let _arr = str.toString().split('').reverse();
                _arr.map((value, index)=>{
                    if(value!=0){
                        _result_str  = this.add(_result_str,this.pow('2',index));
                        // _result_str  = _result_str + Math.pow(2,index);
                    }
                });
                return _result_str;
            }
        }
    }
</script>

<style scoped>

</style>