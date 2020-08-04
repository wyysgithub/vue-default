<template>
    <div class="main">
        <!--        添加表单-->
        <el-form :model="thingsForm" :rules="rules" ref="thingsForm">
            <el-form-item label="事件名称" prop="name">
                <el-input v-model="thingsForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="时间" prop="time">
                <el-input v-model="thingsForm.time" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('thingsForm')">添加</el-button>
                <el-button @click="resetForm('thingsForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <!--        展示表格-->
        <el-table :data="things" border="">
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column label="事件名称" prop="name"></el-table-column>
            <el-table-column label="添加时间" prop="time"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" @click="doUpdate(scope)" circle></el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="doDelete(scope)" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--        模态框-->
        <el-dialog :title="title" :visible.sync="dialogVisible" @close="closeDialog('dialogForm')">

            <el-form :model="dialogForm" :rules="rules" ref="dialogForm">
                <el-form-item label="类别名称" prop="name">
                    <el-input v-model="dialogForm.name" clearable></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAddForm('dialogForm')">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
    import moment from 'moment'

    export default {
        name: 'home',
        data() {
            return {
                msg: "这是首页",
                isClick: true,
                thingsForm: {
                    name: '',
                    time: moment().format("YYYY-MM-DD HH:mm:ss")
                },
                rules: {
                    name: [
                        {required: true, message: "这个必须填", trigger: 'blue'},
                        {min: 2, max: 20, message: "长度在2~20之间", trigger: 'blue'}
                    ],
                    time: [
                        {required: true, message: "这个必须填", trigger: 'blue'}
                    ]
                },
                things: [],
                // 修改
                title: "事件修改",
                dialogForm: {
                    index: 0,
                    name: ''
                },
                dialogVisible: false
            }
        },
        created() {
            //检测缓存 有则赋值
            if (typeof localStorage.getItem('things') === "string") {
                this.things = JSON.parse(localStorage.getItem('things'));
            }
            //实时更新时间
            setInterval(() => {
                this.thingsForm.time = moment().format("YYYY-MM-DD HH:mm:ss");
            }, 1000)
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 执行添加 并刷新缓存
                        this.things.push(Object.assign({}, this.thingsForm));
                        this.updateStorage();
                    } else {
                        return false;
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            doUpdate(scope) {
                console.log(scope)
                this.dialogForm = {
                    index: scope.$index,
                    name: scope.row.name
                };
                this.dialogVisible = true;
            },
            doDelete(scope) {
                // console.log(scope)
                this.$confirm("是否删除该条数据？", "删除提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "error"
                }).then(() => {
                    this.things.splice(scope.$index, 1)
                    this.$message({
                        type: "success",
                        message: "删除成功！"
                    })
                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消"
                    })
                })
            },
            closeDialog(formName) {
                // 关闭选框可以执行一些东西
                console.log(formName)
                // this.$refs[formName].resetFields();
            },
            saveAddForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.things[this.dialogForm.index].name = this.dialogForm.name;
                        this.updateStorage();
                        this.dialogVisible = false;
                    } else {
                        return false;
                    }
                })
            },
            // 更新缓存
            updateStorage() {
                localStorage.setItem("things", JSON.stringify(this.things))
            }

        }
    }
</script>
<style>
    .main {
        max-width: 750px;
        margin: 0 auto;
    }
</style>