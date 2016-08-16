/**
 * Created by taunt on 2016/3/18.
 */



//后台接口
//注意事项：
//1.传入一个 整形数 flag ,   flag = 1 表示单选      flag = 2 表示多选；
//2.设置一个布尔类型 end ,end = false 表示还不是最后一题，为 true 表示为最后一题更改按钮背景

var flag = 1;
var end = false;



window.onload = function(){
    setCssOneOrMore(flag);
    setCssEnd(end);
    //绑定form的提交事件
    var ne = document.getElementById("next");
    var fo = document.getElementById("form");
    ne.onclick = function(){
        var isCheck = false;
        var inputs = $("#form input");

        for(var i=0;i<inputs.length;i++)
        {
            if(inputs[i].checked==true)
            {
                isCheck=true;
                fo.submit();
                break;
            }
        }
        if(isCheck==false)
        {
            alert("你还没有选哦！");
            return false;
        }

    }
}

//设置单选和多选的样式
function setCssOneOrMore(flag){
    if( flag == 1){
        $("#content form").removeClass("formMore").addClass("formOne");
        //为li添加点击事件，点击li的同时选中下一节点的checked

        $(".formOne div").click(function(){
            $(this).find("li").addClass("active")
            $(this).siblings().find("li").removeClass("active");
            //$(this).next().attr("checked","checked").siblings().attr("checked","");
            $(this).find("input").attr("checked","checked");
        });

    }else if(flag == 2){
        $("#content form").removeClass("formOne").addClass("formMore");

        //为li添加点击事件，点击li的同时选中下一节点的checked
        $(".formMore div").click(function(){
            if($(this).find("li").hasClass("active")){
                $(this).find("li").removeClass("active");
                $(this).find("li").next().attr("checked","checked");
            }else{
                $(this).find("li").addClass("active");
                $(this).find("li").next().attr("checked","");
            }
        });
    }
}
//设置最后一题的样式
function setCssEnd(end){
    var ne =document.getElementById("next");
    if(end){
        ne.setAttribute("class","end");
    }
}
