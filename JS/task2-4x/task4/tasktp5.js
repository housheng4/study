var IDNum = sessionStorage.getItem('IDNum');
console.log("身份字符串",IDNum);
var IDArray = IDNum.split('|');
console.log("身份数组",IDArray);
var d = JSON.parse(sessionStorage.getItem('days')) || 0; //初始天数为0获取天数
sessionStorage.setItem('days',JSON.stringify(d))//储存天数
console.log("天数",d);
var day = ["一","二","三","四","五","六","七","八","九","十"]//定义汉字天数
var state = sessionStorage.state || 'one'//初始化状态
sessionStorage.getItem("state",state)
console.log(state);
tip2 = JSON.parse(sessionStorage.getItem('tip2')) ||[]
tip2s = JSON.parse(sessionStorage.getItem('tip2s')) ||[]
tip1 = JSON.parse(sessionStorage.getItem('tip1')) ||[]
tip1s = JSON.parse(sessionStorage.getItem('tip1s')) ||[]
a = sessionStorage.getItem('happena')
b = sessionStorage.getItem('happenb')
console.log(a);
console.log(b);

if (a = false) {
    tip1.push(null)
    tip1s.push(null)
}
if (b = false) {
    tip2.push(null)
    tip2s.push(null)
}
var IDBekill = JSON.parse(sessionStorage.getItem('IDBekill')) ||[]
console.log(IDBekill);//需要变暗的盒子下标
sessionStorage.setItem('IDBekill',JSON.stringify(IDBekill)) ||[]

if (state == "two") {                          //刷新页面根据状态是颜色保持灰色
    $(".killer").css("background-color", "#c0c0c0");
    $(".s1").css("border-right-color", "#c0c0c0");
}
if (state == "three") {
    $(".dead").css("background-color", "#c0c0c0");
    $(".s2").css("border-right-color", "#c0c0c0");
    $(".killer").css("background-color", "#c0c0c0");
    $(".s1").css("border-right-color", "#c0c0c0");
}
if (state == "four") {
    $(".dead").css("background-color", "#c0c0c0");
    $(".s2").css("border-right-color", "#c0c0c0");
    $(".killer").css("background-color", "#c0c0c0");
    $(".s1").css("border-right-color", "#c0c0c0");
    $(".talk").css("background-color", "#c0c0c0");
    $(".s3").css("border-right-color", "#c0c0c0");
}

for (let i = 0; i <= d; i++) {
    $(".titlea").eq(i).clone().appendTo(".main");//克隆div
    $(".line1").eq(i).clone().appendTo(".main");
    $(".titlea").eq(i).text("第" + day[i] + "天");//插入天数
    $(".titlea").eq(i).show();
    $(".result1").eq(i).show();//结果显示
    $(".result2").eq(i).show();
    $(".line1").eq(i).show();
    $(".line1").eq(i-1).hide();//上一个盒子隐藏 
    console.log(tip2[i]);
    if (tip2[i] == null) {
        $(".result2").eq(i).text("没有操作");
        
    }else {
        $(".result2").eq(i).text(tip2[i]+"号被投死了，他的身份是"+IDArray[tip2s[i]]);
    }
   
    if (tip1[i] == null) {
        $(".result1").eq(i).text("没有操作");
    }
    else  {
        console.log(tip1[i]);
        $(".result1").eq(i).text(tip1[i]+"号被杀手杀死，他的身份是"+IDArray[tip1s[i]]);
    }
}



for (let i = 0; i < d; i++) {//点过得盒子全部变暗
    $(".killer").eq(i).css("background-color", "#c0c0c0");
    $(".s1").eq(i).css("border-right-color", "#c0c0c0");
    $(".dead").eq(i).css("background-color", "#c0c0c0");
    $(".s2").eq(i).css("border-right-color", "#c0c0c0");
    $(".talk").eq(i).css("background-color", "#c0c0c0");
    $(".s3").eq(i).css("border-right-color", "#c0c0c0");
    $(".vote").eq(i).css("background-color", "#c0c0c0");
    $(".s4").eq(i).css("border-right-color", "#c0c0c0");
}

if (state == "one") {//在状态一的时候杀人页面的结果隐藏
    $(".result1").eq(d).hide();
}if (state !== 'one') {
    $(".result1").eq(d).show();
}
$(".result2").eq(d).hide();//当天的结果而隐藏


var fsm = new StateMachine({//使用函数库注意字母不要写错
    init:state,
    transitions: [
        {name:'first', from:"one", to:"two"},
        {name:'second', from:"two", to:"three"},
        {name:'third', from:"three", to:"four"},
        {name:'fourth', from:"four", to:"one"}
    ],
    methods: {
        onInvalidTransition: function (transition, from, to) { //执行错误处理
            switch (from) {
                case "one":
                    
                    alert("请按照游戏顺序，杀手杀人！");
                    break;
                case "two":
                    alert("请按照游戏顺序，亡灵发言！");
                    break;
                case "three":
                    alert("请按照游戏顺序，玩家发言！");
                    break;
                case "four":
                    alert("请按照游戏顺序，全民投票！");
                    break;
            }
        },
        onFirst:    function () {
            $(".killer").eq(d).css("background-color", "#c0c0c0");
            $(".s1").eq(d).css("border-right-color", "#c0c0c0");
            alert('现在进入杀手页面')
            console.log("状态一",fsm.state);
            sessionStorage.setItem('state',fsm.state)
            window.location.href = "./killer.html"
        },
        onSecond:    function () {
            $(".dead").eq(d).css("background-color", "#c0c0c0");
            $(".s2").eq(d).css("border-right-color", "#c0c0c0");
            alert('请挂了的发言')
            console.log("状态二",fsm.state);
            sessionStorage.setItem('state',fsm.state)
        },
        onThird:    function () {
            $(".talk").eq(d).css("background-color", "#c0c0c0");
            $(".s3").eq(d).css("border-right-color", "#c0c0c0");
            alert('请讨论投死谁')
            console.log("状态三",fsm.state);
            sessionStorage.setItem('state',fsm.state)
        },
        onFourth:    function () {
            $(".vote").eq(d).css("background-color", "#c0c0c0");
            $(".s4").eq(d).css("border-right-color", "#c0c0c0");
            console.log("状态四",fsm.state);
            sessionStorage.setItem('state',fsm.state)
            window.location.href = './vote.html'
        },
    }
});
for (let i = 0; i <= d; i++) {//循环点击事件
    $(".titlea").eq(i).click(function (e) { 
        $(".line1").eq(i).toggle();
    });
    $('.killer').eq(i).click(function () {
        if (i == d) {
            
            fsm.first();
            // $(".killer").eq(i).css("background-color", "#c0c0c0");
            // $(".s1").eq(i).css("border-right-color", "#c0c0c0");
        }
        else {
            alert('请按顺序点击')
        }
    });
    $('.dead').eq(i).click(function () {
        if (i == d) {
            fsm.second();
            // $(".dead").eq(i).css("background-color", "#c0c0c0");
            // $(".s2").eq(i).css("border-right-color", "#c0c0c0");
        }
        else {
            alert('请按顺序点击')
        }
    });
    $('.talk').eq(i).click(function () {
        if (i == d) {
            fsm.third();
            // $(".talk").eq(i).css("background-color", "#c0c0c0");
            // $(".s3").eq(i).css("border-right-color", "#c0c0c0");
        }
        else {
            alert('请按顺序点击')
        }
    });
    $('.vote').eq(i).click(function () {
        if (i == d) {
            fsm.fourth();
            // $(".vote").eq(i).css("background-color", "#c0c0c0");
            // $(".s4").eq(i).css("border-right-color", "#c0c0c0");
        }
        else {
            alert('请按顺序点击')
        }
    });
}
$(".over").click(function () { //结束游戏  
    var o = confirm("确立离开游戏吗？");
    if (o == true) {
        sessionStorage.clear(); //删除所有数据
        window.location.href = "../task2/taskpb1.html";
    }
});
$(".closeimg").click(function () {  
        sessionStorage.clear(); //删除所有数据
        window.location.href = "../task2/taskpb1.html";
});

