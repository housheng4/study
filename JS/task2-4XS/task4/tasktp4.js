var IDNum =sessionStorage.getItem("IDNum");//得到的是字符串
console.log("所有的角色:",IDNum);
var IDNumshu = IDNum.split("|");//拆解字符串得到数组
console.log("所有的角色:",IDNumshu);

var day = ["零","一","二","三","四","五","六","七","八","九"]
var allKill = sessionStorage.getItem('allKills')

var state = sessionStorage.state || 'one'//定一个变量存初始状态

var d = allKill;//天数，第d+1天
console.log("天数-1",d);

if (d == null) {
    d = 0;
}
console.log(d);

for (let i = 0; i <= d; i++) {
    var myday = day[i+1];
    $(".titlea").eq(i).clone().appendTo(".main");//克隆div
    $(".line1").eq(i).clone().appendTo(".main");
    $(".titlea").eq(i).text("第" + myday + "天");//插入天数
    $(".titlea").eq(i).show();
    $(".line1").eq(i).show();
    $(".line1").eq(i-1).hide();
}

for (let i = 0; i < d; i++) {
    console.log(i);
    $(".killer").eq(i).css("background-color", "#c0c0c0");
    $(".s1").eq(i).css("border-right-color", "#c0c0c0");
    $(".dead").eq(i).css("background-color", "#c0c0c0");
    $(".s2").eq(i).css("border-right-color", "#c0c0c0");
    $(".talk").eq(i).css("background-color", "#c0c0c0");
    $(".s3").eq(i).css("border-right-color", "#c0c0c0");
    $(".vote").eq(i).css("background-color", "#c0c0c0");
    $(".s4").eq(i).css("border-right-color", "#c0c0c0");
    
}


var fsm = new StateMachine({
    init: state,
    transitions: [
      { name: 'first',     from: 'one',  to: 'two' },
      { name: 'second',   from: 'two', to: 'three'  },
      { name: 'third', from: 'three', to: 'four'    },
      { name: 'fourth', from: 'four',    to: 'one' }
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
        onFirst:     function() {
            //进入状态
            console.log("状态1",fsm.state);
            sessionStorage.setItem('state',fsm.state)
            window.location.href = "./killer.html"  
        },
        onSecond:     function() {
            console.log("状态2",fsm.state);
            alert('请死者发言')
            sessionStorage.setItem('state',fsm.state)
        
        },
        onThird:     function() {
            alert('请讨论投票结果')
            console.log("状态3",fsm.state);
            sessionStorage.setItem('state',fsm.state)
        
        },
        onFourth:     function() {
            console.log("状态4",fsm.state);
            sessionStorage.setItem('state',fsm.state)
            window.location.href = "./vote.html"  
        },
        
    }
});
console.log('状态',fsm.state);

for (let i = 0; i <= d; i++) {
    $(".titlea").eq(i).click(function (e) { 
        $(".line1").eq(i).toggle();
    });
    $(".killer").eq(i).click(function (e) { 
        if (i == d) {
            fsm.first();
            $(".killer").eq(i).css("background-color", "#c0c0c0");
            $(".s1").eq(i).css("border-right-color", "#c0c0c0");
        }else {
            alert('请按顺序')
        }
      
    });
    $(".dead").eq(i).click(function (e) { 
        if (i == d) {
            fsm.second();
            $(".dead").eq(i).css("background-color", "#c0c0c0");
            $(".s2").eq(i).css("border-right-color", "#c0c0c0");
        }else {
            alert('请按顺序')
        }
    });
    $(".talk").eq(i).click(function (e) { 
        if (i == d) {
            $(".talk").eq(i).css("background-color", "#c0c0c0");
            $(".s3").eq(i).css("border-right-color", "#c0c0c0");
            fsm.third();
        }else {
            alert('请按顺序')
        }
    });
    $(".vote").eq(i).click(function (e) { 
        if (i == d) {
           
            $(".vote").eq(i).css("background-color", "#c0c0c0");
            $(".s4").eq(i).css("border-right-color", "#c0c0c0");
            fsm.fourth();
        }else {
            alert('请按顺序')
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
