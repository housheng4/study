var IDNum = sessionStorage.getItem("IDNum");//得到的是字符串
console.log(IDNum);
var IDNumshu = IDNum.split("|");//拆解字符串得到数组
console.log(IDNumshu);
var x = IDNumshu.length;
var alldead = JSON.parse(sessionStorage.getItem('alldead'))
console.log(alldead);


var allpingmin = IDNumshu.filter(function(n){
return n === '平民';
}).length;
console.log(allpingmin);
var allshashou = IDNumshu.filter(function(n){
    return n === '杀手';
    }).length;
console.log(allshashou);
pingmindeadall = sessionStorage.getItem('pingmindeadall')  
shashou = sessionStorage.getItem('shashou')



$(document).ready(function () {
    var indexshu =JSON.parse(sessionStorage.getItem('indexShu')) ||[];//把下标存数组当做杀人数保存下来
    //循环添加div有几个角色加几个div
    for (let i = 0; i < IDNumshu.length; i++) {
        $(".content").append(
            "<div class='box'><div class='div1'><p class='p1'></p></div>"
            + "<div class='div2'><p class='p2'></p></div>"
            + "<div class='killsimg'><img src='../image/kill.png'></div></div>"); 
    }
    let div1 = document.getElementsByClassName('div1')//死亡的人变色
    if (alldead != null) {
        console.log(alldead);
        
        for (let i = 0; i < alldead.length; i++) {
        $(div1[alldead[i]]).css("background-color", "#83b09a");
    }
    }

    for (let i = 0; i < IDNumshu.length; i++) {
        x = document.getElementsByClassName('p1')//获取p1的DOM节点
        y = document.getElementsByClassName('p2')
        x[i].innerHTML = IDNumshu[i];
        y[i].innerHTML = i + 1 + "号";
        $(".killsimg").hide();
    }
    //通过下标来选择一个人来点击杀人。
    let index;
    $(".box").click(function () { 
        index = $(this).index()
        $(".killsimg").hide()
        $(".killsimg").eq(index).show() 
      
      
        console.log(alldead);
        
        if (alldead != null) {
                obj = alldead.indexOf(index)
                if (obj > -1) {
                    console.log(obj);
                    alert('死人') 
                }
        }
    });
    //点击确定按钮判断是不是杀手
    $("#beginBtn").click(function () {
        // console.log(index);
        if (IDNumshu[index] != "杀手") {
            indexshu.push(index);       //把杀手的下标保存下来放入数组来统计总共杀了几个人
            console.log(index)
            console.log(IDNumshu[index])
            //点击多次之后存储之后再查重得到需要的被杀的pingmin人总数
            var x = Array.from(new Set(indexshu))
            console.log(x)
            // var pinmindeadall = x.length
            sessionStorage.setItem('pingmindeadall',x.length)
            sessionStorage.setItem('pingmin',JSON.stringify(x))
            // JSON.stringify( sessionStorage.setItem('pingmin',x));
            // sessionStorage.setItem('pingmin',x)
            sessionStorage.setItem('allKill',x.length)//所有死亡的平民数
            JSON.stringify( sessionStorage.setItem('allKill',x.length));

            sessionStorage.setItem('indexShu',JSON.stringify(indexshu))//存储点击的角色


            
            if (alldead != null) {
                alldead.push(index);
                sessionStorage.setItem('alldeadss',JSON.stringify(alldead));//更新所有的死亡人数
            }else {
                alldead = [index];
                sessionStorage.setItem('alldeadss',JSON.stringify(alldead));//更新所有的死亡人数
                // var deadkiller = alldeads.length-pingmin.length;
                // if ( allpingmin - pingmin.length <=allshashou - deadkiller) {
                //     alert('游戏结束，杀手胜利')
                // }
                
            }



            
           
            
            
            
        }
        
                
        //是杀手弹出提示
        if (IDNumshu[index] == "杀手") {
            // console.log(IDNumshu[index]);
            alert('你是杀手不能杀死本职业，请选择其他玩家杀死')   
        }
        //不是杀手跳转到上一个页面，并把杀死的角色变背景，数据传递过去
        else {
            if (IDNumshu[index] == undefined) {
                alert ('不能不杀人')
            }
             
            else {
            $(div1[index]).css("background-color","#83b09a")
            sessionStorage.setItem('killNum',index);
            // console.log(IDNumshu[index]);
            sessionStorage.setItem("killWho",IDNumshu[index])
            
            window.location.href = "./tasktp.html"


            
            }
            
        }
    });

});

