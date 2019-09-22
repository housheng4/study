var IDNum =sessionStorage.getItem("IDNum");//得到字符串
console.log(IDNum);
var IDNumshu = IDNum.split("|");//拆解字符串得到数组
console.log(IDNumshu);
function history() {
    window.location.href = "../task2/taskpb1.html";
}
var clickNum = 0;
$(document).ready(function() {
    $("#ckBtn").click(function () { 
        $("#idImga").toggle();
        $("#idImgb").toggle();
        clickNum = clickNum +1;
        let i = Math.floor(clickNum/2);
        console.log(i);
        //为奇数
        if (clickNum % 2 == 1) {
            if (i < IDNumshu.length - 1) {
                $("#ckBtn").text("隐藏并传递给" + Number(i + 2) + '号');
            }else {
                $("#ckBtn").text("法官查看");
            }
            if (IDNumshu[i] == ("平民")) {
                $("#identity").text("平民");
            }else {
                $("#identity").text("杀手");
            }
        }
        //为偶数
        else {
            if(i < IDNumshu.length) {
                $("#ckBtn").text("查看"+Number(i + 1) + "号身份");
                $("#orderNum").text(Number(i+1));
            }else {
                location = "./taskfg.html";
            }
        }
    });
    
});