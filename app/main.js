define(function (require) {
    var Card = require('Card');
    var list = [];
    for (var i = 0; i < 54; i++) {
        list.push(new Card(i < 52 ? i % 13 : i - 39, Math.floor(i / 13)));
    }
    var cards = [];
    for (var i = 0; i < 17; i++) {
        var index = Math.floor(Math.random() * list.length);
        var card = list[index];
        list.splice(index, 1);
        cards.push(card);
    }
    sort(cards);
    var str = '您获得：<br>'
    for(var i = 0; i < cards.length; i++){
        str += cards[i].getString()+',';
    }
    str+='<br>拆牌结果如下：<br>';
    var logic = require('logic');
    var hands = logic.getHand(cards);
    for(var i = 0; i < hands.length; i++){
        var hand = hands[i];
        for(var j = 0; j < hand.length; j++){
            var card = hand[j];
            str += card.getString()+',';
        }
        str+='<br>';
    }
    document.write(str);

    function sort(l) {
        for (var i = 0; i < l.length - 1; i++) {
            var f = true;
            for (var j = l.length - 1; j > i; j--) {
                var jv = l[j].value(), j1v = l[j - 1].value();
                if (jv < j1v || (jv == j1v && l[j - 1].type > l[j].type)) {
                    var t = l[j];
                    l[j] = l[j - 1];
                    l[j - 1] = t;
                    f = false;
                }
            }
            if (f)break;
        }
    }
});
