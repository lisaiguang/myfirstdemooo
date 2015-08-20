/**
 * Created by lenovo on 2014/11/27.
 */
define(function(){
    function Card(point, type){
        this.point = point;
        this.type = type;
    }
    Card.prototype.value = function(){
        var val = this.point;
        if(val < 2){
            val += 11;
        }else if(val < 13){
            val -= 2;
        }
        return val;
    }
    var types = ['♦','♣','♥','♠'];
    var points = ['A','2','3','4','5','6','7','8','9','10','J','Q','K', '小王', '大王']
    Card.prototype.getString = function(){
        return (this.point < 13? types[this.type] : '') + points[this.point]
    }
    return Card;
})