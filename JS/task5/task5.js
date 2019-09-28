
// var btn = document.getElementById("load");
// btn.onclick=function () {
//     var name = document.getElementById('accent').value
//     var pwd = document.getElementById('password').value
//     console.log(name);
//     console.log(pwd);
//     var xhr =new XMLHttpRequest(); //创建XHR对象
//     //发送请求
//     // xhr.open("GET", 'http://dev.admin.carrots.ptteng.com',true);
//     xhr.open("post", '/carrots-admin-ajax/a/login',true);
//     xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");//请求头
//     xhr.send('name='+name+'&pwd='+pwd);//发送数据
//     xhr.onreadystatechange = function () {//接受处理数据
//         if (xhr.readyState === 4){
//             if (xhr.status === 200){
//             console.log("成功发送请求");
//             var jsons = JSON.parse(xhr.responseText);
//             console.log(jsons);
//                 if (jsons.code === 0) {
//                     window.location.href = "http://dev.admin.carrots.ptteng.com"
//                 }else {
//                     alert('用户名密码错误')
//                 }
//             // window.location.href = "http://dev.admin.carrots.ptteng.com"
//             } else {
//             console.log("失败了");
//             alert('失败')
//             }
//         }
//     }
// }






var xhr = new XMLHttpRequest();
$("button").click(function () {
    name = $("#accent").val();
    pwd = $("#password").val();
    $.ajax({
        //请求方式
        type: 'post',
        //发送请求的地址
        url: '/carrots-admin-ajax/a/login/',
        //服务器返回的数据类型
        dataType: 'json',
        //发送到服务器的数据
        data: {
            name:name,
            pwd:pwd
        },
        //请求成功执行
        success: function (res) {
           console.log('成功发送请求')
           //使用JQ这里没有必要进行对数据进行解析
           if (res.code === 0) {
               window.location.href = "http://dev.admin.carrots.ptteng.com"
           }else {
                alert('用户名密码错误')
           }
        },
        //请求失败执行
        error: function () {
            console.log('请求失败')
        }
    });
});