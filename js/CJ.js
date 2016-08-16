/**
 * Created by SuperMan on 2016/3/16 0016.
 */
/**
 * Created by SuperMan on 2016/3/16 0016.
 */
var lottery = {
    index: 0, //当前转动到哪个位置，起点位置
    count: 0, //总共有多少个位置
    timer: 0, //setTimeout的ID，用clearTimeout清除
    speed: 20, //初始转动速度
    times: 0, //转动次数
    cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize: 0, //中奖位置
    init: function(id) {
        if ($("#" + id).find(".luck").length > 0) {
            $lottery = $("#" + id);
            $units = $lottery.find(".luck");
            this.obj = $lottery;
            this.count = $units.length;
            $lottery.find(".luck-" + this.index).addClass("active");
        }
    },
    roll: function() {
        var index = this.index;
        var count = this.count;
        var lottery = this.obj;
        $(lottery).find(".luck-" + index).removeClass("active");
        index += 1;
        if (index > count - 1) {
            index = 0;
        }
        $(lottery).find(".luck-" + index).addClass("active");
        this.index = index;
        return false;
    },
    stop: function(index) {
        this.prize = index;
        return false;
    }
};

function roll() {
    lottery.times += 1;
    lottery.roll();
    var prize_site = $("#CJ").attr("prize_site");
    if (lottery.times > lottery.cycle + 10 && lottery.index == prize_site) {
         //判断中奖号弹出相应的中奖框
        var nothing = document.getElementById("nothing");
        var huafei10 = document.getElementById("huafei10");
        var huafei20 = document.getElementById("huafei20");
        var huafei50 = document.getElementById("huafei50");
        var huafei100 = document.getElementById("huafei100");
        var page_op = document.getElementById("page_op");
        setTimeout(function(){
            if(prize_site == 0 || prize_site == 2 || prize_site == 4 || prize_site ==6){
                page_op.style.display = "block";
                nothing.style.display = "block";
            }
            else if( prize_site == 1){
                page_op.style.display = "block";
                huafei10.style.display = "block";
            }
            else if(prize_site == 3){
                page_op.style.display = "block";
                huafei50.style.display = "block";
            }
            else if(prize_site == 5){
                page_op.style.display = "block";
                huafei100.style.display = "block";
            }
            else if(prize_site == 7){
                page_op.style.display = "block";
                huafei20.style.display = "block";
            }else{
                alert("出错了！请重试或联系管理人员！")
            }

        },800);




        clearTimeout(lottery.timer);
        lottery.prize = -1;
        lottery.times = 0;
        click = false;
    } else {
        if (lottery.times < lottery.cycle) {
            lottery.speed -= 10;
        } else if (lottery.times == lottery.cycle) {
            var index = Math.random() * (lottery.count) | 0;
            lottery.prize = index;
        } else {
            if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
                lottery.speed += 110;
            } else {
                lottery.speed += 20;
            }
        }
        if (lottery.speed < 80) {
            lottery.speed = 80;
        }
        lottery.timer = setTimeout(roll, lottery.speed);
    }
    return false;
}

var click = false;

$(function() {
    lottery.init('CJ');
    $("#clickCJ a").click(function() {
        if (click) {
            return false;
        } else {
            lottery.speed = 100;
           // 传入数值0-7分别为
            //0---->没中奖
            //1---->10元话费
            //2---->没中奖
            //3---->50元话费
            //4---->没中奖
            //5---->100元话费
            //6---->没中奖
            //7---->20元话费
            $("#CJ").attr("prize_site", 5);

            roll();
            click = true;
            return false;
        }
    });
})