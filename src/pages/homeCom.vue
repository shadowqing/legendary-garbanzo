<template>
    <fieldset>
        <legend>主页</legend>
    </fieldset>
     <div class="list">
        <header>
            <div class="details">详情</div>
            <div class="img_name">
                <div class="headimg">
                    <img alt="" width="50px">
                </div>
                <div class="nickname"></div>
            </div>
            <button>退出</button>
        </header>

        <main>
            <table>
                <tr>
                    <th>姓名</th>
                    <th>头像</th>
                    <th>班级</th>
                    <th>城市</th>
                    <th>操作</th>
                </tr>

                <tr>
                    <td></td>
                    <td>
                        <img alt="" width="50px">
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                        <button >查看</button>
                        <button >编辑</button>
                        <button >增加</button>
                        <button >删除</button>
                    </td>
                </tr>
            </table>
        </main>
    </div>
</template>

<style scoped>
header{
    height: 60px;
    background-color: #3c3b3f;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
header .details{
    margin-left: 40px;
}
header .img_name{
    display: flex;
    align-items: center;
}
header .img_name .nickname{
    margin: 0 30px;
}
header img{
    display: block;
}
main table{
    border: 1px solid #e6e6e6;
    width: 100%;
    margin-top: 10px;
    border-collapse: collapse;
}
main td,main th{
    border: 1px solid #e6e6e6;
    text-align: center;
    height: 40px;
}
main table button{
    border: 0;
    border-radius: 4px;
    cursor:pointer;
    color: #fff;
}
main table button:hover{
    box-shadow: 1px 1px 6px rgb(151, 151, 151);
}
main table button[type="read"]{
    background-color: #409eff;
}
main table button[type="edit"]{
    background-color: #e6a23c;
}
main table button[type="add"]{
    background-color: #67c23a;
}
main table button[type="delete"]{
    background-color: rgb(205, 68, 68);
}

main table button[disabled]{
    background-color: #ccc;
}
main table button[disabled]:hover{
    box-shadow: none;
    cursor:not-allowed;
}
</style>