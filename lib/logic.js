define(function(){
    var pList = [
        [4, []],
        [1, []],
        [2, []],
        [3, []],
        [3, [1]],
        [3, [2]],
        [4, [2]],
        [4, [1, 1]],
        [4, [2, 2]],
        [3, 3, [1, 1]],
        [3, 3, [2]],
        [3, 3, [2, 2]],
        [3, 3, 3, [1, 2]],
        [3, 3, 3, [1, 1, 1]],
        [3, 3, 3, [2, 2, 2]],
        [3, 3, 3, 3, [1, 1, 1, 1]],
        [1, 1, 1, 1, 1, []],
        [1, 1, 1, 1, 1, 1, []],
        [1, 1, 1, 1, 1, 1, 1, []],
        [1, 1, 1, 1, 1, 1, 1, 1, []],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, []],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, []],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, []],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, []],
        [2, 2, 2, []],
        [2, 2, 2, 2, []],
        [2, 2, 2, 2, 2, []],
        [2, 2, 2, 2, 2, 2, []],
        [2, 2, 2, 2, 2, 2, 2, []],
        [2, 2, 2, 2, 2, 2, 2, 2, []],
        [3, 3, []],
        [3, 3, 3, []],
        [3, 3, 3, 3, []],
        [3, 3, 3, 3, 3, []]
    ];
    var l2ps = function () {
        var l2ps = [];
        for (var i = 0; i < pList.length; i++) {
            var l = 0, p = pList[i], o = p[p.length - 1];
            for (var j = 0; j < p.length - 1; j++) {
                l += p[j];
            }
            for (var j = 0; j < o.length; j++) {
                l += o[j];
            }
            if (l2ps[l]) {
                l2ps[l].push(p);
            } else {
                l2ps[l] = [p];
            }
        }
        return l2ps;
    }();
    var Pai = {
        Name: ['zd', 'fj', 'sz', '42', '32', '31', 'sz2', 'sz3', '3z', 'dui', 'dan'],
        getName: function (px) {
            if (px == 0)return 0;
            var p = pList[px], o = p[p.length - 1];
            if (o.length >= 2 && p[0] == 3)return 1;
            if (o.length == 0 && p.length > 2)return p[0] == 1 ? 2 : p[0] == 2 ? 6 : 7;
            if (o.length == 2 && p[0] == 4)return 3;
            return -1;
        },
        getNameC: function (cards) {
            var ln = cards.length, f = hasCounts, dc = statistic(cards);
            if (ln == 1) {
                return 10;
            } else if (ln == 2) {
                if (f(cards, [2], dc))return 9;
                if (cards[0].value() > 13 && cards[1].value() > 13)return 0;
            } else if (ln == 3) {
                if (f(cards, [3], dc).length == 1)return 8;
            } else if (ln == 4) {
                if (f(cards, [3, 1], dc).length == 2)return 4;
                if (f(cards, [4], dc).length == 0)return 0;
            } else if (ln == 5) {
                if (f(cards, [3, 2], dc).length == 2)return 5;
                if (f(cards, [1, 1, 1, 1, 1], dc).length == 5)return 2;
            } else if (ln > 5) {
                if (f(cards, [1, 1, 1, 1, 1, 1], dc).length == 6)return 2;
                if (f(cards, [2, 2, 2], dc).length == 3)return 6;
                if (f(cards, [3, 3, 2], dc).length == 4)return 1;
                if (f(cards, [3, 3, 2, 2], dc).length == 4)return 1;
                if (f(cards, [3, 3, 1, 1], dc).length == 4)return 1;
                if (f(cards, [3, 3], dc).length == 2)return 7;
                if (f(cards, [4, 1, 1], dc).length == 3)return 3;
                if (f(cards, [4, 2, 2], dc).length == 3)return 3;
            }
            return -1;
        },
        getScore: function (cards) {
            var n = this.getNameC(cards);
            switch (n) {
                case 2:
                case 6:
                    return Math.ceil(cards.length * 1.33);
                case 1:
                case 7:
                    return Math.ceil(cards.length * 1.33);
                case 4:
                case 5:
                case 8:
                    return 3 + 2;
                case 9:
                    return 2.5;
                case 10:
                    return 1;
                case 0:
                case 3:
                    return 4 + 3;
            }
        }
    };
    function getPs(l) {
        var ln = l.length;
        if (!l || ln == 0)return null;
        if (ln == 1) {
            return [1, l[0].value()];
        } else if (ln == 2) {
            var p1 = l[0].value(), p2 = l[1].value();
            return p1 == p2 ? [2, p1] : (((p1 == 13 && p2 == 14) || (p1 == 14 && p2 == 13)) ? [0, 13] : null);
        }
        var ps = l2ps[ln] || [], dic = statistic(l);
        for (var i = 0; i < ps.length; i++) {
            var p = ps[i].concat(), repeat = p.length - 1, c = p.concat(p.pop());
            var hc = hasCounts(l, c, dic);
            if (hc.length == c.length) {
                for (var j = 0; j < repeat - 1; j++) {
                    if (hc[j] + 1 != hc[j + 1] || hc[j + 1] >= 12)return null;
                }
                return [pList.indexOf(ps[i]), hc[0]];
            }
        }
        return null;
    }
    function hasCounts(cards, counts, dc) {
        var dic = dc ? dc : statistic(cards), flags = [];
        for (var i = 0; i < counts.length; i++) {
            for (var k = 0; k < dic.length; k++) {
                if (dic[k] == counts[i] && flags.indexOf(k) == -1) {
                    flags.push(k);
                    break;
                }
            }
        }
        return flags;
    }
    function statistic(cards, isPush) {
        var l = [];
        for (var i = 0; i < cards.length; i++) {
            var v = cards[i].value();
            if (isPush) {
                if (l[v]) {
                    l[v].push(cards[i])
                } else {
                    l[v] = [cards[i]]
                }
            } else {
                l[v] = l[v] + 1 || 1;
            }
        }
        return l;
    }
    function except(l0, l1) {
        var sl = [];
        for (var j = 0; j < l0.length; j++) {
            if (l1.indexOf(l0[j]) == -1)sl.push(l0[j]);
        }
        return sl;
    }
    function getTs(cards, tcards, gl, total, pure, cen, startCen) {
        if (tcards) {
            var tps = getPs(tcards);
            if (tps && tps[0] == 0 && tps[1] >= 13)return [];
        }
        var list = statistic(cards, true), result = [];
        if (tps) {
            result = process(list, pList[tps[0]], tps[1] + 1, gl, total, pure);
            if (tps[0] != 0) {
                for (var i = 0; i < 13; i++) {
                    if (list[i] && list[i].length == 4) {
                        result.push([list[i]]);
                    }
                }
            }
        } else {
            cen = cen ? cen : 1;
            startCen = startCen ? startCen : cards.length;
            for (var j = startCen; j >= cen; j--) {
                var pl = l2ps[j];
                if (pl) {
                    for (var i = pl.length - 1; i >= 0; i--) {
                        var px = pl[i];
                        if (pure && px[px.length - 1].length > 0)continue;
                        result = result.concat(process(list, px, 0, gl, total, pure));
                    }
                }
            }
        }

        if (list[13] && list[14]) {
            result.push([list[13], list[14]]);
        }
        for (var i = 0; i < result.length; i++) {
            var r = result[i], rt = [];
            for (var j = 0; j < r.length; j++) {
                rt = rt.concat(r[j]);
            }
            result[i] = rt;
        }
        return result;
    }
    function process(list, px, val, tgl, ttotal, pure) {
        var repeat = px.length - 1, result = [], result1 = [];
        for (var i = val; i < list.length; i++) {
            var r = [], f = false;
            for (var j = 0; j < repeat; j++) {
                if (((j == 0) || (i + j < 12)) && list[i + j] && list[i + j].length >= px[j]) {
                    f = f || list[i + j].length > px[j];
                    r.push(list[i + j]);
                }
            }
            if (r.length == repeat) {
                (f ? result1 : result).push(r);
            }
        }
        result = result.concat(result1);
        if (result.length >= 1) {
            var tResult = [];
            for (var i = 0; i < result.length; i++) {
                var r = result[i], o = [], other = pure ? [] : px[repeat];
                for (var j = 0; j < other.length; j++) {
                    var tFlag = false;
                    for (var k = list.length - 1; k >= 0; k--) {
                        if (list[k] && r.indexOf(list[k]) == -1 && o.indexOf(list[k]) == -1 && list[k].length >= other[j]) {
                            var flag = false;
                            if (tgl) {
                                for (var m = 0; m < tgl.length; m++) {
                                    var ind = list[k].indexOf(tgl[m]);
                                    if (ind != -1) {
                                        tFlag = flag = true;
                                        break;
                                    }
                                }
                            }
                            if (flag == tFlag) {
                                if (list[k].length == other[j]) {
                                    o[j] = list[k];
                                } else if (!o[j]) {
                                    o[j] = list[k];
                                }
                            }
                        }
                    }
                    if (!o[j])break;
                }
                if (o.length == px[repeat].length) {
                    var ro = r.concat(o), add = !tgl, pLen, ever = !ttotal, usedTgl = [];
                    for (var j = 0; j < ro.length; j++) {
                        pLen = (j < repeat ? px[j] : other[j - repeat]);
                        var rojC = ro[j].concat();
                        var roJ = ro[j] = rojC.splice(0, pLen);
                        if (tgl) {
                            var forbids = [];
                            for (var k = 0; k < roJ.length; k++) {
                                if (tgl.indexOf(roJ[k]) == -1)forbids.push(k);
                            }
                            for (var k = 0; k < tgl.length; k++) {
                                if (forbids.length == 0)break;
                                var tglK = tgl[k], ind = rojC.indexOf(tglK);
                                if (ind != -1) {
                                    roJ[forbids.pop()] = tglK;
                                }
                            }
                            for (var k = 0; k < tgl.length; k++) {
                                if (roJ.indexOf(tgl[k]) != -1) {
                                    usedTgl[k] = true;
                                }
                            }
                            if (forbids.length < roJ.length)add = true;
                        }
                    }
                    if (ttotal) {
                        ever = true;
                        for (var k = 0; k < tgl.length; k++) {
                            if (!usedTgl[k]) {
                                ever = false;
                                break;
                            }
                        }
                    }
                    if (add && ever)tResult.push(ro);
                }
            }
            result = tResult;
        }
        return result;
    }
    function ntl(l, count, startCount) {
        if (l.length == 0)return l;
        var tl = getTs(l, null, null, null, true, count, startCount);
        if (tl.length > 0) {
            var cl = ctl(tl.shift(), tl), max = 0, maxCli, maxNl;
            for (var i = 0; i < cl.length; i++) {
                var cli = cl[i], nl = ntl(except(l, cli), 2);
                nl.unshift(cli);
                var nlScore = tlScore(nl);
                if (nlScore > max) {
                    max = nlScore;
                    maxCli = cli;
                    maxNl = nl;
                }
            }
            return maxNl;
        } else {
            return count == 3 ? ntl(l, 2, 2) : [];
        }
    }
    function ctl(t, tl) {
        var ct = [t], ln = tl.length;
        for (var i = 0; i < ln; i++) {
            var tli = tl[i], f = false;
            for (var j = 0; j < tli.length; j++) {
                if (t.indexOf(tli[j] != -1)) {
                    f = true;
                    break;
                }
            }
            if (f) {
                if (tli.length > 4) {
                    if (tli[0].point == t[0].point)ct.push(tli);
                } else {
                    ct.push(tli);
                }
            }
        }
        return ct;
    }
    function tlScore(tl) {
        var s = 0;
        for (var i = 0; i < tl.length; i++) {
            s += Pai.getScore(tl[i]);
        }
        return s;
    }
    return {
        getHand:function(l){
            return ntl(l,3);
        }
    }
})