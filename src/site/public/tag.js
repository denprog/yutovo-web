(function() {
    var n;

    function aa(a) {
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    }

    function q(a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        if (b) return b.call(a);
        if ("number" == typeof a.length) return {
            next: aa(a)
        };
        throw Error(String(a) + " is not an iterable or ArrayLike");
    }

    function ba(a) {
        for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
        return c
    }

    function ca(a) {
        return a instanceof Array ? a : ba(q(a))
    }
    var da = "function" == typeof Object.create ? Object.create : function(a) {
            function b() {}
            b.prototype = a;
            return new b
        },
        ea;
    if ("function" == typeof Object.setPrototypeOf) ea = Object.setPrototypeOf;
    else {
        var fa;
        a: {
            var ha = {
                    a: !0
                },
                ia = {};
            try {
                ia.__proto__ = ha;
                fa = ia.a;
                break a
            } catch (a) {}
            fa = !1
        }
        ea = fa ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
            return a
        } : null
    }
    var ja = ea;

    function ka(a, b) {
        a.prototype = da(b.prototype);
        a.prototype.constructor = a;
        if (ja) ja(a, b);
        else
            for (var c in b)
                if ("prototype" != c)
                    if (Object.defineProperties) {
                        var d = Object.getOwnPropertyDescriptor(b, c);
                        d && Object.defineProperty(a, c, d)
                    } else a[c] = b[c];
        a.Qi = b.prototype
    }

    function la() {
        for (var a = Number(this), b = [], c = a; c < arguments.length; c++) b[c - a] = arguments[c];
        return b
    }
    var na = {
        construct: "Metrika2",
        callbackPostfix: "2",
        version: "14pwap7gbnl75r0blmvk14a0ai1n",
        host: "yutovo.ru/cors/mc.yandex.ru"
    };

    function oa(a, b) {
        return b(a)
    }

    function pa(a) {
        return function(b) {
            return function(c) {
                return a(b, c)
            }
        }
    }

    function qa(a) {
        return function(b) {
            return function(c) {
                return a(c, b)
            }
        }
    }
    var ra = pa(function(a, b) {
            return a === b
        }),
        sa = pa(function(a, b) {
            a(b);
            return b
        }),
        ta = pa(oa);

    function u() {}
    var ua = [];

    function va(a, b) {
        if (!b || "function" !== typeof b) return !1;
        try {
            var c = "" + b
        } catch (h) {
            return !1
        }
        var d = c.length;
        if (d > 35 + a.length) return !1;
        for (var e = d - 13, f = 0, g = 8; g < d; g += 1) {
            f = "[native code]" [f] === c[g] || 7 === f && "-" === c[g] ? f + 1 : 0;
            if (12 === f) return !0;
            if (!f && g > e) break
        }
        return !1
    }

    function wa(a, b) {
        var c = va(a, b);
        b && !c && ua.push([a, b]);
        return c
    }

    function xa(a, b) {
        return wa(b, a) && a
    }

    function ya(a, b) {
        for (var c = 0; c < b.length; c += 1)
            if (b[c] === a) return c;
        return -1
    }
    var za;

    function Aa(a) {
        if (za) return za;
        var b = !1;
        try {
            b = [].indexOf && 0 === [void 0].indexOf(void 0)
        } catch (d) {}
        var c = a.Array && a.Array.prototype && xa(a.Array.prototype.indexOf, "indexOf");
        return za = a = b && c ? function(d, e) {
            return c.call(e, d)
        } : ya
    }
    var Ba = Aa(window),
        Ca = qa(Ba);

    function w(a) {
        return a
    }

    function Da(a, b) {
        return b
    }

    function Ea(a) {
        return !a
    }
    var Fa = xa(Array.from, "from");

    function Ga(a) {
        for (var b = a.length, c = [], d = 0; d < b; d += 1) c.push(a[d]);
        return c
    }

    function Ha(a) {
        if (Fa) try {
            return Fa(a)
        } catch (b) {}
        return Ga(a)
    }

    function x(a, b) {
        var c = [],
            d = [];
        var e = b ? b : w;
        return function() {
            var f = Ha(arguments),
                g = e.apply(null, ca(f)),
                h = Ba(g, d);
            if (-1 !== h) return c[h];
            f = a.apply(null, ca(f));
            c.push(f);
            d.push(g);
            return f
        }
    }
    var Ia = /\./g;

    function y(a) {
        return "string" === typeof a
    }
    var Ja = xa(String.prototype.indexOf, "indexOf");

    function Ka(a, b) {
        for (var c = 0, d = a.length - b.length, e = 0; e < a.length; e += 1) {
            c = a[e] === b[c] ? c + 1 : 0;
            if (c === b.length) return e - b.length + 1;
            if (!c && e > d) break
        }
        return -1
    }
    var La = Ja ? function(a, b) {
        return Ja.call(a, b)
    } : Ka;

    function Ma(a, b) {
        return La(a, b)
    }

    function Na(a, b) {
        return !(!a || -1 === La(a, b))
    }

    function Oa(a) {
        return "" + a
    }

    function Pa(a) {
        return a.replace(/\^/g, "\\^").replace(/\$/g, "\\$").replace(Ia, "\\.").replace(/\[/g, "\\[").replace(/\]/g, "\\]").replace(/\|/g, "\\|").replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/\?/g, "\\?").replace(/\*/g, "\\*").replace(/\+/g, "\\+").replace(/\{/g, "\\{").replace(/\}/g, "\\}")
    }
    var Qa = ra(null);

    function A(a) {
        return "function" === typeof a
    }
    var B = ra(void 0);

    function C(a) {
        return B(a) || Qa(a)
    }

    function Ra(a) {
        return !Qa(a) && !B(a) && "[object Object]" === Object.prototype.toString.call(a)
    }

    function Sa(a, b, c) {
        b = void 0 === b ? [] : b;
        c = c || {};
        var d = b.length,
            e = a;
        A(e) && (e = "d", c[e] = a);
        var f;
        d ? 1 === d ? f = c[e](b[0]) : 2 === d ? f = c[e](b[0], b[1]) : 3 === d ? f = c[e](b[0], b[1], b[2]) : 4 === d && (f = c[e](b[0], b[1], b[2], b[3])) : f = c[e]();
        return f
    }
    var Ta = xa(Function.prototype.bind, "bind");

    function Ua() {
        var a = Ha(arguments);
        a = q(a);
        var b = a.next().value,
            c = a.next().value,
            d = ba(a);
        return function() {
            var e = [].concat(ca(d), ca(Ha(arguments)));
            if (Function.prototype.call) return Function.prototype.call.apply(b, [c].concat(ca(e)));
            if (c) {
                for (var f = "_b"; c[f];) f += "_" + f.length;
                c[f] = b;
                e = c[f] && Sa(f, e, c);
                delete c[f];
                return e
            }
            return Sa(b, e)
        }
    }
    var D = Ta ? function() {
        var a = Ha(arguments),
            b = q(a);
        a = b.next().value;
        var c = b.next().value;
        b = ba(b);
        return Ta.apply(a, [c].concat(b))
    } : Ua;

    function E(a, b) {
        return D.apply(null, [b, null].concat(ca(a)))
    }

    function F(a, b) {
        return D(b, null, a)
    }

    function Va(a, b) {
        return D(b[a], b)
    }

    function Wa(a) {
        return Va("test", a)
    }
    var Xa = xa(Array.prototype.reduce, "reduce");

    function Ya(a, b, c) {
        for (var d = 0, e = c.length; d < e;) b = a(b, c[d], d), d += 1;
        return b
    }
    var G = Xa ? function(a, b, c) {
        return Xa.call(c, a, b)
    } : Ya;

    function Za(a, b) {
        return E([a, b], G)
    }

    function H() {
        var a = Ha(arguments),
            b = a.shift();
        return function() {
            var c = b.apply(null, arguments);
            return G(oa, c, a)
        }
    }
    var $a = pa(E),
        ab = pa(Va),
        bb = Object.prototype.hasOwnProperty;

    function I(a, b) {
        return C(a) ? !1 : bb.call(a, b)
    }

    function J(a, b) {
        return a ? G(function(c, d) {
            if (C(c)) return c;
            try {
                return c[d]
            } catch (e) {}
            return null
        }, a, b.split(".")) : null
    }
    var cb = qa(J),
        db = cb("length");

    function eb(a) {
        var b = void 0 === b ? {} : b;
        if (!a || 1 > a.length) return b;
        G(function(c, d, e) {
            if (e === a.length - 1) return c;
            e === a.length - 2 ? c[d] = a[e + 1] : I(c, d) || (c[d] = {});
            return c[d]
        }, b, a);
        return b
    }

    function fb(a, b) {
        var c = J(b, a),
            d = J(b, "constructor.prototype." + a) || c;
        try {
            if (d && d.apply) return function() {
                return d.apply(b, arguments)
            }
        } catch (e) {
            return c
        }
        return d
    }

    function gb(a, b, c) {
        return c ? a : b
    }
    var hb = E([1, null], gb),
        ib = E([1, 0], gb),
        jb = Boolean,
        kb = xa(Array.prototype.filter, "filter");

    function lb(a, b) {
        return Ya(function(c, d, e) {
            a(d, e) && c.push(d);
            return c
        }, [], b)
    }
    var mb = kb ? function(a, b) {
            return kb.call(b, a)
        } : lb,
        nb = F(jb, mb),
        ob = pa(mb),
        pb = xa(Array.prototype.includes, "includes");

    function qb(a, b) {
        return 1 <= lb(ra(a), b).length
    }
    var K = pb ? function(a, b, c) {
            return pb.call(b, a, c)
        } : qb,
        rb = qa(K);

    function sb(a) {
        return "[object Array]" === Object.prototype.toString.call(a)
    }
    var tb = xa(Array.isArray, "isArray"),
        L = tb ? function(a) {
            return tb(a)
        } : sb;

    function ub(a) {
        return a ? L(a) ? a : Fa ? Fa(a) : "number" === typeof a.length && 0 <= a.length ? Ga(a) : [] : []
    }
    var vb = x(Aa),
        wb = cb("0");

    function xb(a) {
        return a.splice(0, a.length)
    }
    var yb = x(function(a) {
        var b = J(a, "navigator") || {};
        a = J(b, "userAgent") || "";
        b = J(b, "vendor") || "";
        return {
            df: -1 < La(b, "Apple"),
            Wf: a
        }
    });

    function zb(a, b) {
        return -1 !== (J(b, "navigator.userAgent") || "").toLowerCase().search(a)
    }
    var Ab = x(cb("navigator.userAgent")),
        Bb = /Firefox\/([0-9]+)/i,
        Cb = x(function(a) {
            var b = J(a, "document.documentElement.style"),
                c = J(a, "InstallTrigger");
            a = zb(Bb, a);
            Bb.lastIndex = 0;
            return !(!(b && "MozAppearance" in b) || C(c)) || a
        });

    function Db() {
        var a = Array.prototype.map;
        if (!Cb(window)) return !0;
        try {
            a.call({
                0: !0,
                length: -Math.pow(2, 32) + 1
            }, function() {
                throw 1;
            })
        } catch (b) {
            return !1
        }
        return !0
    }
    var Eb = xa(Array.prototype.map, "map");

    function Fb(a, b) {
        return G(function(c, d, e) {
            c.push(a(d, e));
            return c
        }, [], b)
    }
    var M = Eb && Db() ? function(a, b) {
            return b && 0 < b.length ? Eb.call(b, a) : []
        } : Fb,
        Gb = xa(Array.prototype.flatMap, "flatMap");

    function Hb(a, b) {
        return G(function(c, d, e) {
            d = a(d, e);
            return c.concat(L(d) ? d : [d])
        }, [], b)
    }
    var Ib = Gb ? function(a, b) {
            return Gb.call(b, a)
        } : Hb,
        Jb = pa(M),
        Kb = qa(M),
        Lb = xa(Array.prototype.some, "some");

    function Mb(a, b) {
        for (var c = 0; c < b.length; c += 1)
            if (c in b && a.call(b, b[c], c)) return !0;
        return !1
    }
    var Nb = Lb ? function(a, b) {
            return Lb.call(b, a)
        } : Mb,
        Ob = xa(Array.prototype.every, "every");

    function Pb(a, b) {
        return G(function(c, d, e) {
            return c ? !!a(d, e) : !1
        }, !0, b)
    }
    var Qb = Ob ? function(a, b) {
        return Ob.call(b, a)
    } : Pb;

    function Rb(a, b) {
        return a.isFinite(b) && !a.isNaN(b) && "[object Number]" === Object.prototype.toString.call(b)
    }

    function Sb(a) {
        try {
            return parseInt(a, 10)
        } catch (b) {
            return null
        }
    }
    var Tb = qa(parseInt),
        Ub = Tb(10),
        Vb = Tb(2);

    function Wb(a, b) {
        return Qa(b) || B(b) || Rb(a, b) || y(b) || !!b === b
    }
    var Xb = xa(Object.keys, "keys");

    function Yb(a) {
        var b = [],
            c;
        for (c in a) I(a, c) && b.push(c);
        return b
    }
    var Zb = xa(Object.entries, "entries");

    function $b(a) {
        return B(a) ? [] : Ya(function(b, c) {
            b.push([c, a[c]]);
            return b
        }, [], Yb(a))
    }
    var ac = Zb ? function(a) {
            return a ? Zb(a) : []
        } : $b,
        bc = Xb ? function(a) {
            return Xb(a)
        } : Yb,
        cc = xa(Object.values, "values"),
        dc = H($b, F(cb("1"), Fb)),
        ec = cc ? function(a) {
            return cc(a)
        } : dc;

    function fc() {
        var a = Ha(arguments),
            b = q(a);
        a = b.next().value;
        for (b = ba(b); b.length;) {
            var c = b.shift(),
                d;
            for (d in c) I(c, d) && (a[d] = c[d]);
            I(c, "toString") && (a.toString = c.toString)
        }
        return a
    }
    var N = Object.assign || fc,
        gc = pa(function(a, b) {
            return N({}, a, b)
        }),
        hc = x(H(cb("String.fromCharCode"), F("fromCharCode", wa), Ea)),
        ic = x(H(Ab, Wa(/ipad|iphone|ipod/i))),
        jc = x(function(a) {
            return J(a, "navigator.platform") || ""
        }),
        kc = x(function(a) {
            a = yb(a);
            var b = a.Wf;
            return a.df && !b.match("CriOS")
        }),
        lc = Wa(/Android.*Version\/[0-9][0-9.]*\sChrome\/[0-9][0-9.]|Android.*Version\/[0-9][0-9.]*\s(?:Mobile\s)?Safari\/[0-9][0-9.]*\sChrome\/[0-9][0-9.]*|; wv\).*Chrome\/[0-9][0-9.]*\sMobile/),
        mc = Wa(/; wv\)/),
        nc = x(function(a) {
            a =
                Ab(a);
            return mc(a) || lc(a)
        }),
        oc = /Chrome\/(\d+)\./,
        pc = x(function(a) {
            return (a = (J(a, "navigator.userAgent") || "").match(oc)) && a.length ? 76 <= Ub(a[1]) : !1
        }),
        qc = x(function(a) {
            a = (Ab(a) || "").toLowerCase();
            return Na(a, "android") && Na(a, "mobile")
        }),
        rc = "other none unknown wifi ethernet bluetooth cellular wimax mixed".split(" "),
        sc = x(function(a) {
            var b = J(a, "navigator.connection.type");
            if (B(b)) return null;
            a = vb(a)(b, rc);
            return -1 === a ? b : "" + a
        }),
        tc = x(H(cb("document.addEventListener"), Ea)),
        uc = x(function(a) {
            var b = J(a, "navigator") || {};
            return G(function(c, d) {
                return c || J(b, d)
            }, "", ["language", "userLanguage", "browserLanguage", "systemLanguage"])
        }),
        vc = x(function(a) {
            var b = J(a, "navigator") || {};
            a = uc(a);
            y(a) || (a = "", b = J(b, "languages.0"), y(b) && (a = b));
            return a.toLowerCase().split("-")[0]
        }),
        wc = x(function(a) {
            return (J(a, "top") || a) !== a
        }),
        xc = x(cb("top.contentWindow")),
        yc = x(function(a) {
            var b = !1;
            try {
                b = a.navigator.javaEnabled()
            } catch (c) {}
            return b
        }),
        zc = x(function(a) {
            var b = "__webdriver_evaluate __selenium_evaluate __webdriver_script_function __webdriver_script_func __webdriver_script_fn __fxdriver_evaluate __driver_unwrapped __webdriver_unwrapped __driver_evaluate __selenium_unwrapped __fxdriver_unwrapped".split(" "),
                c = J(a, "external");
            c = J(c, "toString") ? "" + c.toString() : "";
            c = -1 !== La(c, "Sequentum");
            var d = J(a, "document.documentElement"),
                e = ["selenium", "webdriver", "driver"];
            return !!(Nb(F(a, J), ["_selenium", "callSelenium", "_Selenium_IDE_Recorder"]) || Nb(F(J(a, "document"), J), b) || c || d && Nb(D(d.getAttribute, d), e))
        }),
        Ac = x(function(a) {
            return !!(Nb(F(a, J), ["_phantom", "__nightmare", "callPhantom"]) || /(PhantomJS)|(HeadlessChrome)/.test(Ab(a)) || J(a, "navigator.webdriver") || J(a, "isChrome") && !J(a, "chrome"))
        }),
        Bc = x(function(a) {
            return !(!J(a,
                "ia_document.shareURL") || !J(a, "ia_document.referrer"))
        });

    function Cc(a) {
        return K("prerender", M(F(J(a, "document"), J), ["webkitVisibilityState", "visibilityState"]))
    }
    var Ec = x(function(a) {
            var b = Ab(a) || "",
                c = b.match(/Mac OS X ([0-9]+)_([0-9]+)/);
            c = c ? [+c[1], +c[2]] : [0, 0];
            b = b.match(/iPhone OS ([1-9]+)_([0-9]+)/);
            return 14 <= (b ? +b[1] : 0) ? !0 : (ic(a) || 10 < c[0] || 10 === c[0] && 13 <= c[1]) && kc(a)
        }),
        Fc = /Edg\/(\d+)\./;

    function Gc(a) {
        return (a = Ab(a)) && (a = a.match(Fc)) && 1 < a.length ? 79 <= Ub(a[1]) : !1
    }

    function Hc(a) {
        return Cb(a) && (a = Ab(a).match(Bb)) && a.length ? 68 <= +a[1] : !1
    }
    var Ic = x(function(a) {
            return Ec(a) || Hc(a) || Gc(a)
        }),
        Jc = na.construct,
        Kc = na.host,
        Lc = tc(window),
        Mc = {
            eg: 24226447,
            Zf: 26302566,
            hg: 51533966,
            ji: 65446441,
            La: "https:",
            eb: "1640",
            ec: Jc,
            dg: Lc ? 512 : 2048,
            bg: Lc ? 512 : 2048,
            cg: Lc ? 100 : 400,
            ki: 100,
            fg: "noindex"
        },
        Nc = ra("1");

    function Oc(a, b, c, d) {
        var e = {};
        return Ra(a) ? a : (e.id = a, e.type = c, e.defer = d, e.params = b, e)
    }

    function Pc(a) {
        return G(function(b, c) {
            var d = q(c),
                e = d.next().value,
                f = d.next().value;
            d = f.Va;
            f = a[f.da];
            b[e] = d ? d(f) : f;
            return b
        }, {}, ac(Qc))
    }
    var O = x(function(a) {
        return a.id + ":" + a.ca
    });

    function Rc(a) {
        a = a.Ya = a.Ya || {};
        var b = a._metrika = a._metrika || {};
        return {
            ra: function(c, d) {
                I(b, c) || (b[c] = d);
                return this
            },
            D: function(c, d) {
                b[c] = d;
                return this
            },
            C: function(c, d) {
                var e = b[c];
                return I(b, c) || B(d) ? e : d
            }
        }
    }
    var Q = x(Rc),
        Sc = setTimeout;

    function Tc() {}

    function Uc(a, b) {
        return function() {
            a.apply(b, arguments)
        }
    }

    function Vc(a) {
        if (!(this instanceof Vc)) throw new TypeError("Promises must be constructed via new");
        if ("function" !== typeof a) throw new TypeError("not a function");
        this.Ka = 0;
        this.Fe = !1;
        this.Qa = void 0;
        this.Ab = [];
        Wc(a, this)
    }

    function Xc(a, b) {
        for (; 3 === a.Ka;) a = a.Qa;
        0 === a.Ka ? a.Ab.push(b) : (a.Fe = !0, Vc.Ge(function() {
            var c = 1 === a.Ka ? b.vh : b.Ah;
            if (null === c)(1 === a.Ka ? Yc : Zc)(b.promise, a.Qa);
            else {
                try {
                    var d = c(a.Qa)
                } catch (e) {
                    Zc(b.promise, e);
                    return
                }
                Yc(b.promise, d)
            }
        }))
    }

    function Yc(a, b) {
        try {
            if (b === a) throw new TypeError("A promise cannot be resolved with itself.");
            if (b && ("object" === typeof b || "function" === typeof b)) {
                var c = b.then;
                if (b instanceof Vc) {
                    a.Ka = 3;
                    a.Qa = b;
                    $c(a);
                    return
                }
                if ("function" === typeof c) {
                    Wc(Uc(c, b), a);
                    return
                }
            }
            a.Ka = 1;
            a.Qa = b;
            $c(a)
        } catch (d) {
            Zc(a, d)
        }
    }

    function Zc(a, b) {
        a.Ka = 2;
        a.Qa = b;
        $c(a)
    }

    function $c(a) {
        2 === a.Ka && 0 === a.Ab.length && Vc.Ge(function() {
            a.Fe || Vc.ig(a.Qa)
        });
        for (var b = 0, c = a.Ab.length; b < c; b++) Xc(a, a.Ab[b]);
        a.Ab = null
    }

    function ad(a, b, c) {
        this.vh = "function" === typeof a ? a : null;
        this.Ah = "function" === typeof b ? b : null;
        this.promise = c
    }

    function Wc(a, b) {
        var c = !1;
        try {
            a(function(d) {
                c || (c = !0, Yc(b, d))
            }, function(d) {
                c || (c = !0, Zc(b, d))
            })
        } catch (d) {
            c || (c = !0, Zc(b, d))
        }
    }
    Vc.prototype["catch"] = function(a) {
        return this.then(null, a)
    };
    Vc.prototype.then = function(a, b) {
        var c = new this.constructor(Tc);
        Xc(this, new ad(a, b, c));
        return c
    };
    Vc.prototype["finally"] = function(a) {
        var b = this.constructor;
        return this.then(function(c) {
            return b.resolve(a()).then(function() {
                return c
            })
        }, function(c) {
            return b.resolve(a()).then(function() {
                return b.reject(c)
            })
        })
    };
    Vc.all = function(a) {
        return new Vc(function(b, c) {
            function d(h, k) {
                try {
                    if (k && ("object" === typeof k || "function" === typeof k)) {
                        var l = k.then;
                        if ("function" === typeof l) {
                            l.call(k, function(m) {
                                d(h, m)
                            }, c);
                            return
                        }
                    }
                    e[h] = k;
                    0 === --f && b(e)
                } catch (m) {
                    c(m)
                }
            }
            if (!a || "undefined" === typeof a.length) return c(new TypeError("Promise.all accepts an array"));
            var e = Array.prototype.slice.call(a);
            if (0 === e.length) return b([]);
            for (var f = e.length, g = 0; g < e.length; g++) d(g, e[g])
        })
    };
    Vc.resolve = function(a) {
        return a && "object" === typeof a && a.constructor === Vc ? a : new Vc(function(b) {
            b(a)
        })
    };
    Vc.reject = function(a) {
        return new Vc(function(b, c) {
            c(a)
        })
    };
    Vc.race = function(a) {
        return new Vc(function(b, c) {
            if (!a || "undefined" === typeof a.length) return c(new TypeError("Promise.race accepts an array"));
            for (var d = 0, e = a.length; d < e; d++) Vc.resolve(a[d]).then(b, c)
        })
    };
    Vc.Ge = "function" === typeof setImmediate && function(a) {
        setImmediate(a)
    } || function(a) {
        Sc(a, 0)
    };
    Vc.ig = function(a) {
        "undefined" !== typeof console && console && console.warn("Possible Unhandled Promise Rejection:", a)
    };
    var S = window.Promise,
        bd = xa(S, "Promise"),
        cd = xa(J(S, "resolve"), "resolve"),
        dd = xa(J(S, "reject"), "reject"),
        ed = xa(J(S, "all"), "all");
    if (bd && cd && dd && ed) {
        var fd = function(a) {
            return new Promise(a)
        };
        fd.resolve = D(cd, S);
        fd.reject = D(dd, S);
        fd.all = D(ed, S);
        S = fd
    } else S = Vc;
    var gd = ["http.0.st..rt.", "network error occurred", "send beacon", "Content Security Policy", "DOM Exception 18"],
        hd;

    function id(a) {
        this.message = a
    }
    var jd = function(a) {
        return function(b, c) {
            c = void 0 === c ? !1 : c;
            if (hd) var d = new hd(b);
            else wa("Error", a.Error) ? (hd = a.Error, d = new a.Error(b)) : (hd = id, d = new hd(b));
            c && (d.unk = !0);
            return d
        }
    }(window);

    function kd(a) {
        return jd("http." + a.status + ".st." + a.statusText + ".rt." + ("" + a.responseText).substring(0, 50))
    }
    var ld = Wa(RegExp("^http."));

    function md(a) {
        throw a;
    }

    function nd(a, b) {
        for (var c = "", d = 0; d < b.length; d += 1) c += "" + (d ? a : "") + b[d];
        return c
    }
    var od = xa(Array.prototype.join, "join"),
        T = od ? function(a, b) {
            return od.call(b, a)
        } : nd,
        pd = pa(T),
        qd = x(function(a) {
            a = !(!a.addEventListener || !a.removeEventListener);
            return {
                Qh: a,
                F: a ? "addEventListener" : "attachEvent",
                ga: a ? "removeEventListener" : "detachEvent"
            }
        });

    function rd(a, b, c, d, e, f) {
        a = qd(a);
        var g = a.F,
            h = a.ga;
        f = f ? h : g;
        if (b[f])
            if (a.Qh)
                if (e) b[f](c, d, e);
                else b[f](c, d);
        else b[f]("on" + c, d)
    }
    var sd = x(function(a) {
            var b = !1;
            if (!a.addEventListener) return b;
            try {
                var c = Object.defineProperty({}, "passive", {
                    get: function() {
                        b = !0;
                        return 1
                    }
                });
                a.addEventListener("test", u, c)
            } catch (d) {}
            return b
        }),
        td = pa(function(a, b) {
            if (null !== b) return a ? N({
                capture: !0,
                passive: !0
            }, b || {}) : !!b
        }),
        ud = x(function(a) {
            var b = sd(a),
                c = td(b),
                d = {};
            return N(d, {
                F: function(e, f, g, h) {
                    M(function(k) {
                        var l = c(h);
                        rd(a, e, k, g, l, !1)
                    }, f);
                    return D(d.Wb, d, e, f, g, h)
                },
                Wb: function(e, f, g, h) {
                    M(function(k) {
                        var l = c(h);
                        rd(a, e, k, g, l, !0)
                    }, f)
                }
            })
        });

    function vd(a) {
        return J(a, "performance") || J(a, "webkitPerformance")
    }

    function wd(a) {
        a = vd(a);
        var b = J(a, "timing.navigationStart"),
            c = J(a, "now");
        c && (c = D(c, a));
        return [b, c]
    }

    function xd(a, b) {
        var c = q(b || wd(a)),
            d = c.next().value;
        c = c.next().value;
        return !isNaN(d) && A(c) ? Math.round(c() + d) : a.Date.now ? a.Date.now() : (new a.Date).getTime()
    }

    function yd(a) {
        return (10 > a ? "0" : "") + a
    }

    function zd(a) {
        var b = ud(a),
            c = wd(a),
            d = {
                l: a,
                ye: 0,
                Gc: c,
                ih: xd(a, c)
            },
            e = q(c);
        c = e.next().value;
        e = e.next().value;
        c && e || b.F(a, ["beforeunload", "unload"], function() {
            0 === d.ye && (d.ye = xd(a, d.Gc))
        });
        return ta(d)
    }

    function Ad(a) {
        var b = a.ye;
        return 0 !== b ? b : xd(a.l, a.Gc)
    }

    function Bd(a) {
        return Math.floor(Ad(a) / 1E3 / 60)
    }

    function Cd(a) {
        return Math.round(Ad(a) / 1E3)
    }

    function Dd(a) {
        var b = q(a.Gc),
            c = b.next().value;
        b = b.next().value;
        a = c && b ? b() : Ad(a) - a.ih;
        return Math.round(a)
    }
    var Ed = x(zd);

    function Fd(a) {
        a = Ed(a);
        return Math.round(a(Dd) / 50)
    }

    function Hd(a) {
        return a.qe || a.Ta.length <= a.xa
    }

    function Id(a) {
        a.xa = a.Ta.length
    }

    function Jd(a) {
        a.qe = !0
    }

    function Kd(a) {
        a.qe = !1
    }

    function Ld(a) {
        Hd(a) && md(jd("i"));
        var b = a.Md(a.Ta[a.xa]);
        a.xa += 1;
        return b
    }
    var Md = pa(function(a, b) {
        for (var c = []; !Hd(b);) {
            var d = Ld(b);
            a(d, function(e) {
                return e(b)
            });
            c.push(d)
        }
        return c
    });

    function Nd(a) {
        return function(b) {
            for (var c; b.Ta.length && !Hd(b);) c = b.Ta.pop(), c = b.Md(c, b.Ta), a(b);
            return c
        }
    }

    function Od(a, b) {
        return function(c) {
            var d = Ed(a),
                e = d(Ad);
            return Nd(function(f) {
                d(Ad) - e >= b && Jd(f)
            })(c)
        }
    }

    function Pd(a, b) {
        return function(c) {
            var d = Ed(a),
                e = d(Ad);
            return Md(function(f, g) {
                d(Ad) - e >= b && g(Jd)
            })(c)
        }
    }

    function Qd(a) {
        for (var b = !0, c = {}; !Hd(a) && b; c = {
                Ud: void 0
            }) b = !1, c.Ud = function() {
            b = !0;
            a.xa += 1
        }, a.Md(a.Ta[a.xa], function(d) {
            return function() {
                (0, d.Ud)()
            }
        }(c)), b || (a.xa += 1, c.Ud = F(a, Qd))
    }

    function Rd(a, b) {
        return ta({
            Ta: a,
            Md: b || w,
            qe: !1,
            xa: 0
        })
    }

    function Sd(a, b, c) {
        c = void 0 === c ? !1 : c;
        return new S(function(d, e) {
            function f(k, l) {
                l();
                d()
            }
            var g = a.slice();
            g.push({
                V: f,
                Ca: f
            });
            var h = Rd(g, function(k, l) {
                var m = c ? k.V : k.Ca;
                if (m) try {
                    m(b, l)
                } catch (p) {
                    h(Id), e(p)
                } else l()
            });
            h(Qd)
        })
    }

    function Td(a) {
        try {
            return encodeURIComponent(a)
        } catch (b) {}
        a = T("", mb(function(b) {
            return 55296 >= b.charCodeAt(0)
        }, a.split("")));
        return encodeURIComponent(a)
    }

    function Ud(a) {
        var b = "";
        try {
            b = decodeURIComponent(a)
        } catch (c) {}
        return b
    }

    function Vd(a) {
        return a ? H(Jb(function(b) {
            var c = q(b.split("="));
            b = c.next().value;
            c = c.next().value;
            return [b, C(c) ? void 0 : Ud(c)]
        }), Za(function(b, c) {
            var d = q(c),
                e = d.next().value;
            d = d.next().value;
            b[e] = d;
            return b
        }, {}))(a.split("&")) : {}
    }

    function Wd(a) {
        return a ? H(ac, Za(function(b, c) {
            var d = q(c),
                e = d.next().value;
            d = d.next().value;
            B(d) || C(d) || b.push(e + "=" + Td(d));
            return b
        }, []), pd("&"))(a) : ""
    }

    function Xd(a, b, c) {
        var d = B(c);
        B(b) && d ? (d = 1, b = 1073741824) : d ? d = 1 : (d = b, b = c);
        return a.Math.floor(a.Math.random() * (b - d)) + d
    }

    function Yd(a, b, c) {
        return function() {
            var d = Q(arguments[0]),
                e = c ? "global" : "m1640",
                f = d.C(e, {}),
                g = J(f, a);
            g || (g = x(b), f[a] = g, d.D(e, f));
            return g.apply(null, arguments)
        }
    }
    var Zd = rb([26812653]),
        $d = x(H(cb("id"), Zd), O),
        ae = "hash host hostname href pathname port protocol search".split(" ");

    function U(a) {
        return G(function(b, c) {
            var d = J(a, "location." + c);
            b[c] = d ? "" + d : "";
            return b
        }, {}, ae)
    }
    var be = "ru by kz az kg lv md tj tm uz ee fr lt com co.il com.ge com.am com.tr com.ru".split(" "),
        ce = /(?:^|\.)(?:(ya\.ru)|(?:yandex)\.(\w+|com?\.\w+))$/;

    function de(a) {
        if (a = a.match(ce)) {
            var b = q(a);
            b.next();
            a = b.next().value;
            if (b = b.next().value) return K(b, be) ? b : !1;
            if (a) return be[0]
        }
        return !1
    }
    var ee = x(function(a) {
            return (a ? a.replace(/^www\./, "") : "").toLowerCase()
        }),
        fe = x(function(a) {
            a = U(a).hostname;
            var b = !1;
            a && (b = -1 !== a.search(ce));
            return b
        }),
        ge = H(U, cb("protocol"), ra("https:")),
        he = x(function(a) {
            return pc(a) && ge(a) ? "SameSite=None;Secure;" : ""
        }),
        ie = /^\s+|\s+$/g,
        je = xa(String.prototype.trim, "trim");

    function ke(a, b) {
        if (a) {
            var c = je ? je.call(a) : ("" + a).replace(ie, "");
            return b && c.length > b ? c.substring(0, b) : c
        }
        return ""
    }
    var le = pa(function(a, b) {
            return b.replace(a, "")
        }),
        me = le(/\s/g),
        ne = le(/\D/g),
        oe = le(/\d/g),
        pe = ["metrika_enabled"],
        qe = [];

    function re(a, b) {
        var c = se;
        return !qe.length || K(b, pe) ? !0 : G(function(d, e) {
            return d && e(a, c, b)
        }, !0, qe)
    }

    function te(a) {
        try {
            var b = a.document.cookie;
            if (!C(b)) {
                var c = {};
                M(function(d) {
                    var e = q(d.split("="));
                    d = e.next().value;
                    e = e.next().value;
                    c[ke(d)] = ke(Ud(e))
                }, (b || "").split(";"));
                return c
            }
        } catch (d) {}
        return null
    }
    var ue = Yd("gsc", te);

    function se(a, b) {
        var c = ue(a);
        return c ? c[b] || null : null
    }
    var ve = /:\d+$/;

    function we(a, b, c, d, e, f, g) {
        g = void 0 === g ? !1 : g;
        if (re(a, b)) {
            var h = b + "=" + encodeURIComponent(c) + ";";
            h += "" + he(a);
            if (d) {
                var k = new Date;
                k.setTime(k.getTime() + 6E4 * d);
                h += "expires=" + k.toUTCString() + ";"
            }
            e && (d = e.replace(ve, ""), h += "domain=" + d + ";");
            try {
                a.document.cookie = h + ("path=" + (f || "/")), g || (ue(a)[b] = c)
            } catch (l) {}
        }
    }

    function xe(a, b) {
        we(a, "metrika_enabled", "1", 0, b, void 0, !0);
        var c = te(a);
        (c = c && c.metrika_enabled) && we(a, "metrika_enabled", "", -100, b, void 0, !0);
        return !!c
    }
    var ye = x(function(a) {
        var b = (U(a).host || "").split(".");
        return 1 === b.length ? b[0] : G(function(c, d, e) {
            e += 1;
            2 <= e && !c && (e = T(".", b.slice(-e)), xe(a, e) && (c = e));
            return c
        }, "", b)
    });

    function ze(a, b, c) {
        b = void 0 === b ? "_ym_" : b;
        c = void 0 === c ? "" : c;
        var d = ye(a),
            e = 1 === (d || "").split(".").length ? d : "." + d,
            f = c ? "_" + c : "";
        return {
            jc: function(g, h, k) {
                we(a, "" + b + g + f, "", -100, h || e, k, !1);
                return this
            },
            C: function(g) {
                return se(a, "" + b + g + f)
            },
            D: function(g, h, k, l, m) {
                we(a, "" + b + g + f, h, k, l || e, m);
                return this
            }
        }
    }
    var Ae = x(ze),
        Be = x(function(a) {
            var b = Ae(a),
                c = "1" === b.C("debug"),
                d = -1 < Ma(U(a).href, "_ym_debug=1") || -1 < Ma(U(a).href, "_ym_debug=2"),
                e = a._ym_debug;
            !e && !d || c || (a = U(a), b.D("debug", "1", void 0, a.host));
            return !!(c || e || d)
        });

    function Ce() {
        return {}
    }

    function De() {
        return []
    }
    var Ee = Yd("debuggerEvents", De, !0);

    function Fe(a, b) {
        if (Be(a)) {
            var c = b.counterKey;
            if (c) {
                var d = q(c.split(":"));
                c = d.next().value;
                d = d.next().value;
                c = Zd(Sb(c));
                if ("1" === d || c) return
            }
            c = Ee(a);
            1E3 === c.length && c.shift();
            c.push(b)
        }
    }

    function Ge(a, b, c) {
        var d = Xd(a),
            e = c.ea,
            f = c.ba,
            g = c.$a,
            h = c.ab;
        c = c.Uc;
        var k = {},
            l = {},
            m = {};
        Fe(a, (m.name = "request", m.data = (l.url = b, l.requestId = d, l.senderParams = (k.rBody = f, k.debugStack = e, k.rHeaders = g, k.rQuery = h, k.verb = c, k), l), m));
        return d
    }
    var He = xa(Array.prototype.find, "find");

    function Ie(a, b) {
        for (var c = 0; c < b.length; c += 1)
            if (a.call(b, b[c], c)) return b[c]
    }
    var Je = He ? function(a, b) {
            return He.call(b, a)
        } : Ie,
        Ke = pa(function(a, b) {
            var c = b || {};
            return {
                l: F(c, w),
                C: function(d, e) {
                    var f = c[d];
                    return B(f) && !B(e) ? e : f
                },
                D: function(d, e) {
                    c[d] = e;
                    return this
                },
                Sb: function(d, e) {
                    return "" === e || C(e) ? this : this.D(d, e)
                },
                Aa: F(c, a)
            }
        }),
        Le = Ke(function(a) {
            var b = "";
            a = G(function(c, d) {
                var e = q(d),
                    f = e.next().value;
                e = e.next().value;
                e = "" + f + ":" + e;
                "t" === f ? b = e : c.push(e);
                return c
            }, [], ac(a));
            b && a.push(b);
            return T(":", a)
        });

    function Me(a, b, c) {
        var d = N({}, b.H);
        a = Ed(a);
        b.K && (d["browser-info"] = Le(b.K.l()).D("st", a(Cd)).Aa());
        !d.t && (b = b.Ha) && (b.D("ti", c), d.t = b.Aa());
        return d
    }

    function Ne(a, b, c, d, e, f) {
        e = void 0 === e ? 0 : e;
        f = void 0 === f ? 0 : f;
        var g = N({
                ea: []
            }, d.N),
            h = q(b[f]),
            k = h.next().value;
        h = h.next().value;
        var l = c[e];
        if ((!g.$a || !g.$a["Content-Type"]) && g.ba) {
            var m = {};
            g.$a = N({}, g.$a, (m["Content-Type"] = "application/x-www-form-urlencoded", m));
            g.ba = "site-info=" + Td(g.ba)
        }
        g.Uc = g.ba ? "POST" : "GET";
        g.ab = Me(a, d, k);
        g.qa = (d.Ja || {}).qa;
        g.ea.push(k);
        N(d.N, g);
        k = "" + l + (d.Ic && d.Ic.uh ? "/1" : "");
        var p = 0;
        p = Ge(a, k, g);
        return h(k, g).then(function(r) {
            var t = p,
                v = {},
                z = {};
            Fe(a, (z.name = "requestSuccess", z.data =
                (v.body = r, v.requestId = t, v), z));
            return {
                Ga: r,
                Ae: e
            }
        })["catch"](function(r) {
            var t = p,
                v = {},
                z = {};
            Fe(a, (z.name = "requestFail", z.data = (v.error = r, v.requestId = t, v), z));
            t = f + 1 >= b.length;
            v = e + 1 >= c.length;
            t && v && md(r);
            return Ne(a, b, c, d, !v && t ? e + 1 : e, t ? 0 : f + 1)
        })
    }

    function Oe(a, b) {
        return function(c, d) {
            return Ne(a, b, d, c)
        }
    }

    function Pe(a, b) {
        M(H(w, Va("push", a)), b);
        return a
    }

    function Qe(a, b) {
        return b ? a(b) : a()
    }
    var Re = H(w, Qe),
        Se = {
            id: "id",
            Ce: "ut",
            ca: "type",
            Qd: "ldc",
            Ua: "nck",
            qc: "url",
            Tg: "referrer"
        },
        Te = /^\d+$/,
        Ue = {
            id: function(a) {
                a = "" + (a || "0");
                Te.test(a) || (a = "0");
                try {
                    var b = Ub(a)
                } catch (c) {
                    b = 0
                }
                return b
            },
            ca: function(a) {
                return "" + (a || 0 === a ? a : "0")
            },
            Ua: jb,
            Ce: jb
        };
    Se.hd = "defer";
    Ue.hd = jb;
    Se.O = "params";
    Ue.O = function(a) {
        return Ra(a) || L(a) ? a : null
    };
    Se.Be = "userParams";
    Se.Uf = "triggerEvent";
    Ue.Uf = jb;
    Se.Ff = "sendTitle";
    Ue.Ff = function(a) {
        return !!a || B(a)
    };
    Se.we = "trackHash";
    Ue.we = jb;
    Se.Tf = "trackLinks";
    Se.Hg = "enableAll";
    var Qc = G(function(a, b) {
        var c = q(b),
            d = c.next().value;
        c = c.next().value;
        a[d] = {
            da: c,
            Va: Ue[d]
        };
        return a
    }, {}, ac(Se));

    function Ve(a) {
        N(Qc, a)
    }

    function We(a) {
        return G(function(b, c) {
            var d = q(c),
                e = d.next().value;
            d = d.next().value;
            b[Qc[e].da] = d;
            return b
        }, {}, ac(a))
    }

    function Xe(a, b, c) {
        for (var d = [b, c], e = -1E4, f = 0; f < a.length; f += 1) {
            var g = q(a[f]),
                h = g.next().value;
            g = g.next().value;
            if (c === g && h === b) return;
            if (c < g && c >= e) {
                a.splice(f, 0, d);
                return
            }
            e = g
        }
        a.push(d)
    }

    function Ye(a, b, c, d) {
        a[b] || (a[b] = []);
        c && !C(d) && Xe(a[b], c, d)
    }
    var $e = {},
        af = ($e.w = [
            [function(a, b) {
                return {
                    V: function(c, d) {
                        var e = c.H,
                            f = {};
                        e = (f["page-url"] = e && e["page-url"] || "", f.charset = "utf-8", f);
                        "0" !== b.ca && (e["cnt-class"] = b.ca);
                        c.K || (c.K = Le());
                        f = c.K;
                        e = {
                            Ja: {
                                qa: "watch/" + b.id
                            },
                            N: N(void 0 === c.N ? {} : c.N, {
                                cb: !!f.C("pv") && !f.C("ar") && !f.C("wh")
                            }),
                            H: N(c.H || {}, e)
                        };
                        N(c, e);
                        d()
                    }
                }
            }, 1]
        ], $e),
        bf = F(af, Ye);

    function cf(a, b, c) {
        var d = Oe(a, b);
        return function(e) {
            return Sd(c, e, !0).then(function() {
                var f = e.Ja || {},
                    g = void 0 === f.hh ? "" : f.hh,
                    h = void 0 === f.qa ? "" : f.qa;
                f = M(function(k) {
                    return Mc.La + "//" + ("" + g + k || Kc) + "/" + h
                }, void 0 === f.$e ? [Kc] : f.$e);
                return d(e, f)
            }).then(function(f) {
                var g = f.Ga;
                f = f.Ae;
                e.Lh = g;
                e.Ji = f;
                return Sd(c, e).then(F(g, w))
            })
        }
    }

    function df(a) {
        return function(b, c, d) {
            return function(e, f) {
                var g = M(H(wb, $a([b, f]), Qe), af[a] || []);
                g = Pe(g, d);
                return cf(b, c, g)(e)
            }
        }
    }
    var ef = df("w"),
        ff = ["webkitvisibilitychange", "visibilitychange"];

    function gf(a) {
        return {
            V: function(b, c) {
                var d = a.document,
                    e = b.K;
                if (e && Cc(a)) {
                    var f = ud(a),
                        g = function(h) {
                            Cc(a) || (f.Wb(d, ff, g), c());
                            return h
                        };
                    f.F(d, ff, g);
                    e.D("pr", "1")
                } else c()
            }
        }
    }

    function hf(a) {
        var b = "";
        L(a) ? b = T(".", a) : y(a) && (b = a);
        return jd("err.kn(" + Mc.eb + ")" + b)
    }

    function jf() {
        var a = Ha(arguments);
        md(hf(a))
    }
    var kf = Wa(RegExp("^err.kn")),
        lf = [];

    function mf(a, b, c) {
        var d = "u.a.e",
            e = "";
        c && ("object" === typeof c ? (c.unk && md(c), d = c.message, e = "string" === typeof c.stack && c.stack.replace(/\n/g, "\\n") || "n.s.e.s") : d = "" + c);
        kf(d) || Nb(F(d, Na), gd) || ld(d) && .1 <= a.Math.random() || M(H(w, $a(["jserrs", d, b, e]), Qe), lf)
    }

    function V(a, b, c, d, e) {
        var f = c || md;
        return function() {
            var g = d;
            try {
                g = f.apply(e || null, arguments)
            } catch (h) {
                mf(a, b, h)
            }
            return g
        }
    }

    function W(a, b, c) {
        return function() {
            return V(arguments[0], a, b, c).apply(this, arguments)
        }
    }
    var nf = Ke(function(a) {
        a = ac(a);
        return T("", M(function(b) {
            var c = q(b);
            b = c.next().value;
            c = c.next().value;
            return Qa(c) ? "" : b + "(" + c + ")"
        }, a))
    });

    function of(a, b, c) {
        c = void 0 === c ? null : c;
        a.Ha || (a.Ha = nf());
        b && a.Ha.Sb(b, c);
        return a.Ha
    }
    var pf = "A B BIG BODY BUTTON DD DIV DL DT EM FIELDSET FORM H1 H2 H3 H4 H5 H6 HR I IMG INPUT LI OL P PRE SELECT SMALL SPAN STRONG SUB SUP TABLE TBODY TD TEXTAREA TFOOT TH THEAD TR U UL ABBR AREA BLOCKQUOTE CAPTION CENTER CITE CODE CANVAS DFN EMBED FONT INS KBD LEGEND LABEL MAP OBJECT Q S SAMP STRIKE TT ARTICLE AUDIO ASIDE FOOTER HEADER MENU METER NAV PROGRESS SECTION TIME VIDEO NOINDEX NOBR MAIN svg circle clippath ellipse defs foreignobject g glyph glyphref image line lineargradient marker mask path pattern polygon polyline radialgradient rect set text textpath title".split(" "),
        qf = [],
        rf = /^\s*(data|javascript):/i,
        sf = new RegExp(T("", ["\\.(" + T("|", "3gp 7z aac ac3 acs ai avi ape apk asf bmp bz2 cab cdr crc32 css csv cue divx dmg djvu? doc(x|m|b)? emf eps exe flac? flv iso swf gif t?gz jpe?g? js m3u8? m4a mp(3|4|e?g?) m4v md5 mkv mov msi ods og(g|m|v) psd rar rss rtf sea sfv sit sha1 svg tar tif?f torrent ts txt vob wave? wma wmv wmf webm ppt(x|m|b)? xls(x|m|b)? pdf phps png xpi g?zip".split(" ")) + ")$"]), "i"),
        tf = {},
        uf = (tf.hit = "h", tf.params = "p", tf.reachGoal = "g", tf.userParams = "up",
            tf.trackHash = "th", tf.accurateTrackBounce = "atb", tf.notBounce = "nb", tf.addFileExtension = "fe", tf.extLink = "el", tf.file = "fc", tf.trackLinks = "tl", tf.destruct = "d", tf.setUserID = "ui", tf.getClientID = "ci", tf.clickmap = "cm", tf.enableAll = "ea", tf),
        vf = H(O, x(function() {
            var a = 0;
            return function() {
                return a += 1
            }
        }), Qe),
        wf = {
            mc: function(a) {
                a = Rc(a).C("mt", {});
                a = ac(a);
                return a.length ? G(function(b, c, d) {
                    var e = q(c);
                    c = e.next().value;
                    e = e.next().value;
                    return "" + b + (d ? "-" : "") + c + "-" + e
                }, "", a) : null
            },
            clc: function(a) {
                var b = Q(a).C("cls", {
                        dc: 0,
                        x: 0,
                        y: 0
                    }),
                    c = b.dc,
                    d = b.x;
                b = b.y;
                return c ? c + "-" + a.Math.floor(d / c) + "-" + a.Math.floor(b / c) : c + "-" + d + "-" + b
            },
            rqnt: function(a, b, c) {
                a = c.H;
                return !a || a.nohit ? null : vf(b)
            }
        };

    function xf(a, b) {
        if (!b) return null;
        try {
            return a.JSON.parse(b)
        } catch (c) {
            return null
        }
    }

    function yf(a, b) {
        try {
            return a.JSON.stringify(b, null, void 0)
        } catch (c) {
            return null
        }
    }

    function zf(a) {
        try {
            return a.localStorage
        } catch (b) {}
        return null
    }

    function Af(a, b) {
        var c = zf(a);
        try {
            c.removeItem(b)
        } catch (d) {}
    }

    function Bf(a, b) {
        var c = zf(a);
        try {
            return xf(a, c.getItem(b))
        } catch (d) {}
        return null
    }

    function Cf(a, b, c) {
        var d = zf(a);
        a = yf(a, c);
        if (!Qa(a)) try {
            d.setItem(b, a)
        } catch (e) {}
    }
    var Df = x(function(a) {
        Cf(a, "_ymBRC", "1");
        var b = "1" !== Bf(a, "_ymBRC");
        b || Af(a, "_ymBRC");
        return b
    });

    function Ef(a, b, c) {
        var d = "" + (void 0 === c ? "_ym" : c) + (void 0 === b ? "" : b);
        d && (d += "_");
        return {
            Id: Df(a),
            C: function(e, f) {
                var g = Bf(a, "" + d + e);
                return Qa(g) && !B(f) ? f : g
            },
            D: function(e, f) {
                Cf(a, "" + d + e, f);
                return this
            },
            jc: function(e) {
                Af(a, "" + d + e);
                return this
            }
        }
    }
    var Ff = x(Ef),
        Gf = x(Ef, function(a, b, c) {
            return "" + b + c
        });

    function Hf(a) {
        if (C(a)) return !1;
        a = a.nodeType;
        return 3 === a || 8 === a
    }

    function If(a) {
        return a ? a.innerText || "" : ""
    }
    var Jf = x(cb("document.documentElement")),
        Kf = x(function(a) {
            a = J(a, "document") || {};
            return ("" + (a.characterSet || a.charset || "")).toLowerCase()
        }),
        Lf = x(H(cb("document"), F("createElement", fb)));

    function Mf(a) {
        var b = a && a.parentNode;
        b && b.removeChild(a)
    }

    function Nf(a) {
        var b;
        try {
            if (b = a.target || a.srcElement) !b.ownerDocument && b.documentElement ? b = b.documentElement : b.ownerDocument !== document && (b = null)
        } catch (c) {}
        return b
    }

    function Of(a, b) {
        try {
            return (new RegExp("(?:^|\\s)" + a + "(?:\\s|$)")).test(b.className)
        } catch (c) {
            return !1
        }
    }
    var Pf = x(function(a) {
        var b = J(a, "Element.prototype");
        return b ? (a = Je(function(c) {
            var d = b[c];
            return !!d && wa(c, d)
        }, ["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"])) ? b[a] : null : null
    });

    function Qf(a) {
        a = J(a, "document");
        try {
            return a.getElementsByTagName("body")[0]
        } catch (b) {
            return null
        }
    }

    function Rf(a) {
        var b = J(a, "document") || {},
            c = b.documentElement;
        return "CSS1Compat" === b.compatMode ? c : Qf(a) || c
    }

    function Sf(a) {
        var b = J(a, "visualViewport.width"),
            c = J(a, "visualViewport.height");
        a = J(a, "visualViewport.scale");
        return C(b) || C(c) ? null : [Math.floor(b), Math.floor(c), a]
    }

    function Tf(a) {
        var b = Sf(a);
        if (b) {
            var c = q(b);
            b = c.next().value;
            var d = c.next().value;
            c = c.next().value;
            return [a.Math.round(b * c), a.Math.round(d * c)]
        }
        b = Rf(a);
        return [J(b, "clientWidth") || a.innerWidth, J(b, "clientHeight") || a.innerHeight]
    }

    function Uf(a) {
        var b = Qf(a),
            c = J(a, "document");
        return {
            x: a.pageXOffset || c.documentElement && c.documentElement.scrollLeft || b && b.scrollLeft || 0,
            y: a.pageYOffset || c.documentElement && c.documentElement.scrollTop || b && b.scrollTop || 0
        }
    }

    function Vf(a) {
        try {
            return a.getBoundingClientRect && a.getBoundingClientRect()
        } catch (b) {
            return a = b, "object" === typeof a && null !== a && 16389 === (a.lf && a.lf & 65535) ? {
                top: 0,
                bottom: 0,
                left: 0,
                width: 0,
                height: 0,
                right: 0
            } : null
        }
    }

    function Wf(a, b, c) {
        c = fb("dispatchEvent", c || a.document);
        var d = null,
            e = J(a, "Event.prototype.constructor");
        if (e && (wa("(Event|Object|constructor)", e) || tc(a) && "[object Event]" === "" + e)) try {
            d = new a.Event(b)
        } catch (f) {
            if ((a = fb("createEvent", J(a, "document"))) && A(a)) {
                try {
                    d = a(b)
                } catch (g) {}
                d && d.initEvent && d.initEvent(b, !1, !1)
            }
        }
        d && c(d)
    }

    function Xf(a, b) {
        var c = a.document.getElementsByTagName("form");
        return Aa(a)(b, ub(c))
    }

    function Yf(a) {
        if (a) try {
            var b = a.nodeName;
            if (y(b)) return b;
            b = a.tagName;
            if (y(b)) return b
        } catch (c) {}
    }
    var Zf = ra("INPUT"),
        $f = H(Yf, Zf),
        ag = ra("TEXTAREA"),
        bg = H(Yf, ag),
        cg = ra("SELECT"),
        dg = H(Yf, cg),
        eg = H(cb("type"), Wa(/^(checkbox|radio)$/)),
        fg = H(Yf, Wa(/^INPUT|SELECT|TEXTAREA$/)),
        gg = H(Yf, Wa(/^INPUT|SELECT|TEXTAREA|BUTTON$/)),
        hg = "INPUT CHECKBOX RADIO TEXTAREA SELECT PROGRESS".split(" "),
        ig = ["submit", "image", "hidden"];

    function jg(a) {
        return $f(a) && !Nb(ra(a.type), ig) ? eg(a) ? !a.checked : !a.value : bg(a) ? !a.value : dg(a) ? 0 > a.selectedIndex : !0
    }
    var kg = /\/$/;

    function lg(a) {
        var b = Q(a),
            c = b.C("hitId");
        c || (c = Xd(a), b.D("hitId", c));
        return c
    }

    function mg(a, b) {
        var c = Ff(a),
            d = Ae(a),
            e = b.Qd || "uid";
        return [c.C(e), d.C(e)]
    }
    var ng = Yd("r", function(a, b) {
        var c = q(mg(a, b)),
            d = c.next().value;
        return !c.next().value && d
    });

    function og(a, b) {
        return !b.Ua && ng(a, b)
    }

    function pg(a, b) {
        var c = b.Qd,
            d = c || "uid";
        c = c ? a.location.hostname : void 0;
        var e = Ae(a),
            f = Ff(a),
            g = Ed(a)(Cd),
            h = q(mg(a, b)),
            k = h.next().value;
        h = h.next().value;
        var l = e.C("d");
        ng(a, b);
        var m = !1;
        !h && k && (h = k, m = !0);
        if (!h) h = T("", [g, Xd(a, 1E6, 999999999)]), m = !0;
        else if (!l || 15768E3 < g - Ub(l)) m = !0;
        m && !b.Ua && (e.D(d, h, 525600, c), e.D("d", "" + g, 525600, c));
        f.D(d, h);
        return h
    }

    function qg(a, b, c) {
        return fb("setTimeout", a)(b, c)
    }

    function rg(a, b) {
        return fb("clearTimeout", a)(b)
    }

    function X(a, b, c, d) {
        return qg(a, V(a, "d.err." + (d || "def"), b), c)
    }

    function sg(a, b) {
        return a.setInterval(V(a, "i.err.t.h", b), 200)
    }

    function tg(a, b) {
        return a.clearInterval(b)
    }

    function ug(a, b) {
        return function(c) {
            return c(a, b)
        }
    }
    var vg = pa(function(a, b) {
            return ta(function(c, d) {
                return b(c, function(e) {
                    try {
                        d(a(e))
                    } catch (f) {
                        c(f)
                    }
                })
            })
        }),
        wg = pa(function(a, b) {
            return ta(function(c, d) {
                return b(c, function(e) {
                    try {
                        a(e)(ug(c, d))
                    } catch (f) {
                        c(f)
                    }
                })
            })
        });

    function xg(a) {
        var b = [],
            c = !1;
        return ta(function(d, e) {
            function f(g) {
                b.push(g) === a.length && d(b)
            }
            M(function(g) {
                g(ug(f, function(h) {
                    if (!c) try {
                        e(h), c = !0
                    } catch (k) {
                        f(k)
                    }
                }))
            }, a)
        })
    }

    function yg(a) {
        var b = [],
            c = 0;
        return ta(function(d, e) {
            M(function(f, g) {
                f(ug(d, function(h) {
                    try {
                        b[g] = h, c += 1, c === a.length && e(b)
                    } catch (k) {
                        d(k)
                    }
                }))
            }, a)
        })
    }

    function zg(a) {
        return ta(function(b, c) {
            a.then(c, b)
        })
    }

    function Ag(a) {
        return ta(function(b, c) {
            c(a)
        })
    }

    function Bg(a, b) {
        function c(e) {
            J(b, d) ? e() : X(a, F(e, c), 100)
        }
        b = void 0 === b ? a : b;
        var d = (b.nodeType ? "contentWindow." : "") + "document.body";
        return ta(function(e, f) {
            c(f)
        })
    }

    function Cg(a) {
        var b = [],
            c = {
                Gi: b
            };
        c.F = H(Va("push", b), F(c, w));
        c.ga = H(qa(Aa(a))(b), qa(Va("splice", b))(1), F(c, w));
        c.$ = H(w, qa(Qe), Kb(b));
        return c
    }

    function Dg(a) {
        var b = {};
        return {
            F: function(c, d) {
                M(function(e) {
                    J(b, e) || (b[e] = Cg(a));
                    b[e].F(d)
                }, c);
                return this
            },
            ga: function(c, d) {
                M(function(e) {
                    J(b, e) && b[e].ga(d)
                }, c);
                return this
            },
            $: function(c, d) {
                return J(b, c) ? V(a, "e." + c, b[c].$, [])(d) : []
            }
        }
    }
    var Eg = x(function() {
            return {
                Fa: {},
                pending: {},
                children: {}
            }
        }),
        Fg = cb("postMessage");

    function Gg(a, b) {
        return function(c, d) {
            var e = {
                ic: Ed(a)(Ad),
                key: a.Math.random(),
                dir: 0
            };
            c.length && (e.ic = Ub(c[0]), e.key = parseFloat(c[1]), e.dir = Ub(c[2]));
            N(d, b);
            var f = {};
            f = (f.data = d, f.__yminfo = T(":", ["__yminfo", e.ic, e.key, e.dir]), f);
            return {
                meta: e,
                Mf: yf(a, f) || ""
            }
        }
    }
    var Hg = W("s.f", function(a, b, c, d, e) {
        b = b(d);
        var f = Eg(a),
            g = T(":", [b.meta.ic, b.meta.key]);
        if (Fg(c)) {
            f.pending[g] = e;
            try {
                c.postMessage(b.Mf, "*")
            } catch (h) {
                delete f.pending[g];
                return
            }
            X(a, function() {
                delete f.pending[g]
            }, 5E3, "if.s")
        }
    });

    function Ig(a) {
        if (wa("MutationObserver", a.MutationObserver)) {
            var b = Eg(a).children,
                c = new a.MutationObserver(function() {
                    M(function(d) {
                        J(b[d], "window.window") || delete b[d]
                    }, bc(b))
                });
            Bg(a)(ug(u, function() {
                c.observe(a.document.body, {
                    subtree: !0,
                    childList: !0
                })
            }))
        }
    }

    function Jg(a, b) {
        var c = Eg(a);
        b.F(["initToParent"], function(d) {
            var e = q(d);
            d = e.next().value;
            e = e.next().value;
            window.window && (c.children[e.counterId] = {
                info: e,
                window: d.source
            })
        }).F(["initToChild"], function(d) {
            var e = q(d);
            d = e.next().value;
            e = e.next().value;
            d.source === a.parent && b.$("parentConnect", [d, e])
        }).F(["parentConnect"], function(d) {
            var e = q(d);
            d = e.next().value;
            e = e.next().value;
            e.counterId && (c.Fa[e.counterId] = {
                info: e,
                window: d.source
            })
        })
    }
    var Kg = W("s.fh", function(a, b, c, d, e, f) {
            var g = null,
                h = null,
                k = Eg(a),
                l = null;
            try {
                g = xf(a, f.data), h = g.__yminfo, l = g.data
            } catch (m) {
                return
            }
            if (!C(h) && h.substring && "__yminfo" === h.substring(0, 8) && !C(l) && (a = h.split(":"), 4 === a.length))
                if (g = b.id, h = q(a), h.next(), b = h.next().value, a = h.next().value, h = h.next().value, !L(l) && l.type && "0" === h && l.counterId) {
                    if (!l.toCounter || l.toCounter == g) {
                        k = null;
                        try {
                            k = f.source
                        } catch (m) {}!Qa(k) && Fg(k) && (f = d.$(l.type, [f, l]), e = M(H(w, gc(e)), f.concat([void 0])), l = c([b, a, l.counterId], e), k.postMessage(l.Mf,
                            "*"))
                    }
                } else h === "" + g && L(l) && mb(function(m) {
                    return !(!m.hid || !m.counterId)
                }, l).length === l.length && (c = k.pending[T(":", [b, a])]) && c.apply(null, [f].concat(l))
        }),
        Lg = x(function(a, b) {
            var c = fb("getElementsByTagName", J(a, "document")),
                d = Eg(a),
                e = Fg(a),
                f = Dg(a),
                g = ud(a);
            if (!c || !e) return null;
            c = c.call(a.document, "iframe");
            e = {};
            e = (e.counterId = b.id, e.hid = "" + lg(a), e);
            Ic(a) && (e.duid = pg(a, b));
            Jg(a, f);
            Ig(a);
            var h = Gg(a, e),
                k = E([a, F([], h)], Hg);
            M(function(l) {
                var m = null;
                try {
                    m = l.contentWindow
                } catch (p) {}
                m && k(m, {
                        type: "initToChild"
                    },
                    function(p, r) {
                        f.$("initToParent", [p, r])
                    })
            }, c);
            wc(a) && k(a.parent, {
                type: "initToParent"
            }, function(l, m) {
                f.$("parentConnect", [l, m])
            });
            g.F(a, ["message"], E([a, b, h, f, e], Kg));
            return {
                Z: f,
                Fa: d.Fa,
                children: d.children,
                ke: k
            }
        }, H(Da, O)),
        Mg = x(function(a, b) {
            if (!Ic(a) || !wc(a)) return pg(a, b);
            var c = Lg(a, b);
            return c && c.Fa[b.id] ? c.Fa[b.id].info.duid || pg(a, b) : pg(a, b)
        }, function(a, b) {
            return "" + b.Qd + b.Ua
        }),
        Ng = x(H(Ed, ta(function(a) {
            return -(new a.l.Date).getTimezoneOffset()
        }))),
        Og = H(Ed, ta(function(a) {
            a = new a.l.Date;
            return T("",
                M(yd, [a.getFullYear(), a.getMonth() + 1, a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds()]))
        })),
        Pg = H(Ed, ta(Cd)),
        Qg = x(H(Ed, ta(function(a) {
            return q(a.Gc).next().value
        }))),
        Rg = x(function(a) {
            a = Q(a);
            var b = a.C("counterNum", 0) + 1;
            a.D("counterNum", b);
            return b
        }, H(Da, O)),
        Sg = {},
        Tg = (Sg.vf = F(na.version, w), Sg.nt = sc, Sg.fu = function(a, b, c) {
            var d = c.H;
            if (!d) return null;
            b = (J(a, "document.referrer") || "").replace(kg, "");
            c = (d["page-ref"] || "").replace(kg, "");
            d = d["page-url"];
            a = U(a).href !== d;
            b = b !== c;
            c = 0;
            a && b ? c = 3 : b ? c = 1 : a && (c =
                2);
            return c
        }, Sg.en = Kf, Sg.la = uc, Sg.ut = function(a, b, c) {
            var d = c.M;
            c = c.H;
            d = d && d.zc;
            c && (fe(a) || b.Ce || d) && (c.ut = Mc.fg);
            return null
        }, Sg.v = F(Mc.eb, w), Sg.cn = Rg, Sg.dp = function(a) {
            var b = Q(a),
                c = b.C("bt", {});
            if (B(b.C("bt"))) {
                var d = J(a, "navigator.getBattery");
                try {
                    c.p = d && d.call(a.navigator)
                } catch (e) {}
                b.D("bt", c);
                c.p && c.p.then && c.p.then(V(a, "bi:dp.p", function(e) {
                    c.ai = J(e, "charging") && 0 === J(e, "chargingTime")
                }))
            }
            return ib(c.ai)
        }, Sg.ls = x(function(a, b) {
            var c = Gf(a, b.id),
                d = Ed(a),
                e = c.C("lsid");
            return +e ? e : (d = Xd(a, 0, d(Ad)),
                c.D("lsid", d), d)
        }, Da), Sg.hid = lg, Sg.phid = function(a, b) {
            if (!wc(a)) return null;
            var c = Lg(a, b);
            if (!c) return null;
            var d = bc(c.Fa);
            return d.length ? c.Fa[d[0]].info.hid : null
        }, Sg.z = Ng, Sg.i = Og, Sg.et = Pg, Sg.c = H(cb("navigator.cookieEnabled"), hb), Sg.rn = H(w, Xd), Sg.rqn = function(a, b, c) {
            c = c.H;
            if (!c || c.nohit) return null;
            b = O(b);
            a = Gf(a, b);
            b = (a.C("reqNum", 0) || 0) + 1;
            a.D("reqNum", b);
            if (a.C("reqNum") === b) return b;
            a.jc("reqNum");
            return null
        }, Sg.u = Mg, Sg.w = function(a) {
            var b = q(Tf(a));
            a = b.next().value;
            b = b.next().value;
            return a + "x" +
                b
        }, Sg.s = function(a) {
            var b = J(a, "screen");
            if (b) {
                a = J(b, "width");
                var c = J(b, "height");
                b = J(b, "colorDepth") || J(b, "pixelDepth");
                return T("x", [a, c, b])
            }
            return null
        }, Sg.sk = cb("devicePixelRatio"), Sg.ifr = H(wc, hb), Sg.j = H(yc, hb), Sg.sti = function(a) {
            return wc(a) && xc(a) ? "1" : null
        }, Sg),
        Ug = x(function() {
            return Pe(bc(Tg), bc(wf))
        });

    function Vg(a) {
        return function(b, c) {
            return {
                V: function(d, e) {
                    var f = d.K,
                        g = d.H;
                    f && g && M(function(h) {
                        var k = Tg[h],
                            l = "bi",
                            m = f;
                        k || (k = wf[h], l = "tel", m = of(d));
                        k && (k = W(l + ":" + h, k, null)(b, c, d), m.Sb(h, k))
                    }, a || Ug());
                    e()
                }
            }
        }
    }

    function Wg(a, b) {
        return {
            V: function(c, d) {
                var e = c.K;
                if (e && (!b || b.Ff)) {
                    var f = a.document.title;
                    c.M && c.M.title && (f = c.M.title);
                    var g = fb("getElementsByTagName", a.document);
                    "string" !== typeof f && g && (f = g("title"), f = (f = J(f, "0.innerHtml")) ? f : "");
                    f = f.slice(0, Mc.cg);
                    e.D("t", f)
                }
                d()
            }
        }
    }
    var Xg = x(Ce, O);

    function Yg(a, b, c) {
        if (Ic(a) && wc(a)) {
            var d = Xg(b);
            if (!d.mh) {
                d.mh = !0;
                b = Lg(a, b);
                if (!b) {
                    c();
                    return
                }
                d.wa = [];
                var e = function() {
                    d.wa && (M(Qe, d.wa), d.wa = null)
                };
                X(a, e, 3E3);
                b.Z.F(["initToChild"], e)
            }
            d.wa ? d.wa.push(c) : c()
        } else c()
    }
    var Zg = x(function() {
        return {
            Te: null,
            wa: []
        }
    }, O);

    function $g(a) {
        return (a = a.K) && a.C("pv") && !a.C("ar")
    }

    function ah(a, b, c) {
        var d = a.K;
        d ? $g(a) ? (b.Te = d, c()) : b.wa ? b.wa.push(c) : c() : c()
    }

    function bh(a, b) {
        return {
            V: function(c, d) {
                var e = Zg(b);
                e = E([c, e, d], ah);
                Yg(a, b, e)
            },
            Ca: function(c, d) {
                var e = c.K,
                    f = Zg(b);
                if (e) {
                    var g = f.wa;
                    f.Te === e && g && (M(Qe, g), f.wa = null)
                }
                d()
            }
        }
    }
    var ch = /^[a-z][\w.+-]+:/i;

    function dh(a, b) {
        var c = U(a),
            d = c.href,
            e = c.host,
            f = -1;
        if (!y(b) || B(b)) return d;
        c = b.replace(ie, "");
        if (-1 !== c.search(ch)) return c;
        var g = c.charAt(0);
        if ("?" === g && (f = d.search(/\?/), -1 === f) || "#" === g && (f = d.search(/#/), -1 === f)) return d + c;
        if (-1 !== f) return d.substr(0, f) + c;
        if ("/" === g) {
            if (f = La(d, e), -1 !== f) return d.substr(0, f + e.length) + c
        } else return d = d.split("/"), d[d.length - 1] = c, T("/", d);
        return ""
    }

    function eh(a) {
        return {
            V: function(b, c) {
                var d = b.H;
                if (!b.K || !d) return c();
                var e = d["page-ref"],
                    f = d["page-url"];
                e && f !== e ? d["page-ref"] = dh(a, e) : delete d["page-ref"];
                d["page-url"] = dh(a, f).slice(0, Mc.dg);
                return c()
            }
        }
    }
    var fh = [
            [gf, 1],
            [bh, 2],
            [Vg(), 3],
            [Wg, 4]
        ],
        gh = [],
        hh = F(fh, Xe),
        ih = {},
        jh = (ih.h = fh, ih),
        kh = F(jh, Ye);
    hh(eh, -100);

    function lh(a, b, c) {
        b = L(b) ? b : jh[b] || fh;
        var d = M(wb, b);
        M(function(e) {
            return d.unshift(e)
        }, gh);
        return M(H($a([a, c]), Qe), d)
    }

    function mh(a, b, c, d) {
        return new S(function(e, f) {
            if (!J(a, "navigator.onLine")) return f();
            var g = {};
            g = N(d.ab, (g["force-urlencoded"] = 1, g));
            g = c + "?" + Wd(g) + (d.ba ? "&" + d.ba : "");
            return 2E3 < g.length ? f(hf("sb.tlq")) : b(g) ? e("") : f()
        })
    }

    function nh(a) {
        var b = J(a, "navigator.sendBeacon");
        return b && wa("sendBeacon", b) ? E([a, D(b, J(a, "navigator"))], mh) : !1
    }

    function oh(a, b) {
        var c = Lf(a);
        if (c) {
            var d = a.document,
                e = c("script");
            e.src = b.src;
            e.type = b.type || "text/javascript";
            e.charset = b.charset || "utf-8";
            e.async = b.async || !0;
            try {
                var f = d.getElementsByTagName("head")[0];
                if (!f) {
                    var g = d.getElementsByTagName("html")[0];
                    f = c("head");
                    g && g.appendChild(f)
                }
                f.insertBefore(e, f.firstChild);
                return e
            } catch (h) {}
        }
    }
    var ph = x(function(a) {
        if (a = Lf(a)) return a("a")
    });

    function qh(a, b) {
        var c = ph(a);
        return c ? (c.href = b, {
            protocol: c.protocol,
            host: c.host,
            port: c.port,
            hostname: c.hostname,
            hash: c.hash,
            search: c.search,
            query: c.search.replace(/^\?/, ""),
            pathname: c.pathname || "/",
            path: (c.pathname || "/") + c.search,
            href: c.href
        }) : {}
    }

    function rh(a) {
        return (a.split(":")[1] || "").replace(/^\/*/, "").replace(/^www\./, "").split("/")[0]
    }

    function sh(a, b) {
        if (!b || !b.length) return a;
        var c = q(a.split("#")),
            d = c.next().value;
        c = ba(c);
        c = (c = T("#", c)) ? "#" + c : "";
        return Na(a, "?") ? d + "&" + b + c : d + "?" + b + c
    }

    function th(a, b, c) {
        (c = Wd(c)) && (a = sh(a, c));
        b.ba && (a = sh(a, b.ba));
        return a
    }

    function uh(a, b) {
        try {
            delete a[b]
        } catch (c) {
            a[b] = void 0
        }
    }

    function vh(a, b, c) {
        return new S(function(d, e) {
            var f = "_ymjsp" + Xd(a),
                g = {};
            g = N((g.callback = f, g), c.ab);
            var h = E([a, f], uh);
            a[f] = function(l) {
                try {
                    h(), Mf(k), d(l)
                } catch (m) {
                    e(m)
                }
            };
            g.wmode = "5";
            f = {};
            var k = oh(a, (f.src = th(b, c, g), f));
            if (!k) return h(), e(jd("jp.s"));
            f = F(k, Mf);
            f = H(f, F(hf(c.ea), e));
            g = qg(a, f, c.Oa || 1E4);
            g = E([a, g], rg);
            k.onload = g;
            k.onerror = H(h, g, f)
        })
    }

    function wh(a, b, c, d) {
        var e = {};
        e = N(d.cb ? (e.wmode = "7", e) : {}, d.ab);
        var f = b || {
                signal: void 0,
                abort: u
            },
            g = a.fetch(sh(c, Wd(e)), {
                method: d.Uc,
                body: d.ba,
                credentials: !1 === d.Vc ? "omit" : "include",
                headers: d.$a,
                signal: f.signal
            }),
            h = F(d.ea, hf);
        return new S(function(k, l) {
            d.Oa && qg(a, function() {
                try {
                    f.abort()
                } catch (m) {}
                l(h())
            }, d.Oa);
            return g.then(function(m) {
                if (!m.ok) {
                    if (d.Mc) return md(kd(m));
                    jf(d.ea)
                }
                return d.Mc ? m.text() : d.cb ? m.json() : null
            }).then(k)["catch"](F(h(), l))
        })
    }
    var xh = /[^a-z0-9.:-]/;

    function yh(a, b, c, d, e, f, g, h) {
        if (4 === b.readyState)
            if (200 === b.status || e || g(c), e) 200 === b.status ? f(b.responseText) : g(kd(b));
            else {
                e = null;
                if (d) try {
                    (e = xf(a, b.responseText)) || g(c)
                } catch (k) {
                    g(c)
                }
                f(e)
            } return h
    }

    function zh(a, b, c) {
        var d = new a.XMLHttpRequest,
            e = c.ba,
            f = {},
            g = N(c.cb ? (f.wmode = "7", f) : {}, c.ab);
        return new S(function(h, k) {
            d.open(c.Uc || "GET", sh(b, Wd(g)), !0);
            d.withCredentials = !1 !== c.Vc;
            c.Oa && (d.timeout = c.Oa);
            H(ac, Jb(function(m) {
                var p = q(m);
                m = p.next().value;
                p = p.next().value;
                d.setRequestHeader(m, p)
            }))(c.$a);
            var l = E([a, d, hf(c.ea), c.cb, c.Mc, h, k], yh);
            d.onreadystatechange = l;
            try {
                d.send(e)
            } catch (m) {}
        })
    }

    function Ah(a, b, c, d) {
        return new S(function(e, f) {
            var g = Rf(a),
                h = b("img"),
                k = H(F(h, Mf), F(hf(d.ea), f)),
                l = qg(a, k, d.Oa || 3E3);
            h.onerror = k;
            h.onload = H(F(h, Mf), F(null, e), E([a, l], rg));
            k = N({}, d.ab);
            delete k.wmode;
            h.src = th(c, d, k);
            kc(a) && (N(h.style, {
                position: "absolute",
                visibility: "hidden",
                width: "0px",
                height: "0px"
            }), g.appendChild(h))
        })
    }
    var Bh = {},
        Ch = (Bh.x = {
            id: 2,
            check: function(a) {
                var b;
                if (b = J(a, "XMLHttpRequest"))
                    if (b = "withCredentials" in new a.XMLHttpRequest) {
                        a: {
                            if (xh.test(a.location.host) && a.opera && A(a.opera.version) && (b = a.opera.version(), "string" === typeof b && "12" === b.split(".")[0])) {
                                b = !0;
                                break a
                            }
                            b = !1
                        }
                        b = !b
                    } return b ? F(a, zh) : !1
            }
        }, Bh.i = {
            id: 4,
            check: function(a) {
                var b = Lf(a);
                return b ? E([a, b], Ah) : !1
            }
        }, Bh);
    Ch.f = {
        id: 1,
        check: function(a) {
            if (a.fetch) {
                var b = J(a, "AbortController");
                return E([a, b ? new b : void 0], wh)
            }
            return !1
        }
    };
    Ch.b = {
        id: 0,
        check: function(a) {
            return !nc(a) && nh(a)
        }
    };
    Ch.j = {
        id: 3,
        check: function(a) {
            return Lf(a) ? F(a, vh) : !1
        }
    };
    var Dh = {};

    function Eh(a) {
        if (a) return G(function(b, c) {
            var d = Ch[c];
            d && b.push(d);
            return b
        }, [], a)
    }

    function Fh(a) {
        return Dh["*"] ? Eh(Dh["*"]) : a ? Eh(Dh[a]) : void 0
    }
    var Gh = ["b", "f", "x", "j", "i"],
        Hh = ["x"];
    Hh.unshift("f");
    Hh.push("j");
    var Ih = ["i"],
        Jh = ["f", "x"],
        Kh = ["f", "i"],
        Lh = {},
        Mh = (Lh.h = Hh, Lh),
        Nh = x(function(a, b, c) {
            (c = Fh(b) || Eh(c)) || (c = Eh(b ? Mh[b] : Gh));
            b = G(function(d, e) {
                var f = e.check,
                    g = e.id;
                (f = f(a)) && d.push([g, f]);
                return d
            }, [], c || []);
            b.length || jf();
            return b
        }, Da),
        Oh = D(S.reject, S, hf()),
        Ph = {},
        Qh = (Ph.h = ef, Ph),
        Rh = W("g.sen", function(a, b, c) {
                var d = Nh(a, b);
                c = c ? lh(a, b, c) : [];
                var e = Qh[b],
                    f = e ? e(a, d, c) : ef(a, d, c);
                return function() {
                    var g = q(Ha(arguments)),
                        h = g.next().value;
                    g = ba(g);
                    h = N(h, {
                        N: N(void 0 === h.N ? {} : h.N, {
                            ea: [b]
                        })
                    });
                    return f.apply(null, [h].concat(g))
                }
            },
            Oh);

    function Sh(a, b) {
        return function(c) {
            var d = c[a];
            d ? (d.xf = !0, d.wf(b)) : c[a] = {
                promise: S.resolve(b),
                xf: !0,
                wf: u
            }
        }
    }
    var Th = pa(function(a, b) {
            if (!b[a]) {
                var c, d = new S(function(e) {
                    c = e
                });
                b[a] = {
                    wf: c,
                    promise: d,
                    xf: !1
                }
            }
            return b[a].promise
        }),
        Uh = x(H(Ce, ta));

    function Vh(a, b, c) {
        b = O(b);
        var d = zd(a);
        c = N({
            Ng: d(Ad)
        }, c);
        d = {};
        var e = {};
        Fe(a, (e.counterKey = b, e.name = "counterSettings", e.data = (d.settings = c, d), e));
        return Uh()(Sh(b, c))
    }

    function Wh(a, b) {
        var c = O(a);
        return Uh()(Th(c)).then(b)
    }

    function Xh(a, b) {
        function c(d, e, f) {
            var g = {},
                h = {};
            Fe(a, (h.name = "log", h.counterKey = b, h.data = (g.args = L(e) ? e : [e], g.type = d, g.variables = f, g), h))
        }
        return {
            log: F("log", c),
            error: F("error", c),
            warn: F("warn", c)
        }
    }
    var Yh = x(W("dc.init", function(a, b) {
        return b && Zd(Sb(b.split(":")[0])) ? {
            log: u,
            warn: u,
            error: u
        } : Xh(a, b)
    }), Da);

    function Zh(a, b, c, d) {
        Yh(a, b).log(c, d)
    }

    function $h(a, b, c, d, e) {
        return E([a, O(b), e ? [c + ".p", e] : c, d], Zh)
    }

    function ai(a, b, c) {
        c = c || "as";
        if (a.postMessage && !a.attachEvent) {
            var d = ud(a),
                e = "__ym__promise_" + Xd(a) + "_" + Xd(a),
                f = u;
            f = d.F(a, ["message"], V(a, c, function(g) {
                try {
                    var h = g.data
                } catch (k) {
                    return
                }
                h === e && (f(), g.stopPropagation && g.stopPropagation(), b())
            }));
            a.postMessage(e, "*")
        } else X(a, b, 0, c)
    }
    var bi = W("h.p", function(a, b) {
        var c = Rh(a, "h", b),
            d = b.qc || "" + U(a).href,
            e = b.Tg || a.document.referrer,
            f = {},
            g = {};
        f = {
            K: Le((f.pv = 1, f)),
            H: (g["page-url"] = d, g["page-ref"] = e, g),
            M: {}
        };
        f.M.O = b.O;
        f.M.Be = b.Be;
        b.hd && f.H && (f.H.nohit = "1");
        return c(f, b).then(function(h) {
            if (h) {
                if (!b.hd) {
                    var k = {};
                    $h(a, b, "h", (k.id = b.id, k.url = d, k.ref = e, k), b.O)()
                }
                ai(a, E([a, b, h], Vh))
            }
        })["catch"](V(a, "h.g.s"))
    });

    function ci(a, b, c) {
        try {
            if (A(b)) {
                var d = q(Ha(arguments));
                d.next();
                d.next();
                d.next();
                var e = ba(d);
                b.apply(C(c) ? null : c, e)
            }
        } catch (f) {
            qg(a, F(f, md), 0)
        }
    }
    var di = ["yandex_metrika_callback" + na.callbackPostfix, "yandex_metrika_callbacks" + na.callbackPostfix],
        ei = W("cb.i", function(a) {
            var b = q(di),
                c = b.next().value,
                d = b.next().value;
            if (A(a[c])) a[c]();
            "object" === typeof a[d] && M(function(e, f) {
                a[d][f] = null;
                ci(a, e)
            }, a[d]);
            M(function(e) {
                try {
                    delete a[e]
                } catch (f) {
                    a[e] = void 0
                }
            }, di)
        });

    function fi(a, b) {
        var c = Q(a).C("counters", {}),
            d = O(b);
        return c[d]
    }

    function gi(a, b, c, d) {
        var e = uf[c];
        return e ? function() {
            var f = Ha(arguments);
            f = d.apply(null, ca(f));
            var g = Q(a);
            g.ra("mt", {});
            g = g.C("mt");
            var h = g[e];
            g[e] = h ? h + 1 : 1;
            return f
        } : d
    }
    var hi = [],
        ii = [],
        ji = [],
        ki = [],
        li = [],
        mi = [],
        ni = /^[a-zA-Z0-9'!#$%&*+-/=?^_`{|}~]+$/;

    function oi(a) {
        var b = a.length;
        return 1 > b || 64 < b ? !1 : Qb(function(c) {
            var d = c.length;
            if (1 > d) c = !1;
            else if ('"' === c[0] && '"' === c[d - 1] && 2 < d) a: {
                for (d = 1; d + 2 < c.length; d += 1) {
                    var e = c.charCodeAt(d);
                    if (32 > e || 34 === e || 126 < e) {
                        c = !1;
                        break a
                    }
                    if (92 === e) {
                        if (d + 2 === c.length || 32 > c.charCodeAt(d + 1)) {
                            c = !1;
                            break a
                        }
                        d += 1
                    }
                }
                c = !0
            }
            else c = ni.test(c) ? !0 : !1;
            return c
        }, a.split("."))
    }

    function pi(a) {
        var b = a.length;
        return 5 > b || 100 < b ? void 0 : a
    }

    function qi(a) {
        var b = ke(a).replace(/^\++/gm, "").toLowerCase(),
            c = b.lastIndexOf("@");
        if (-1 === c) return pi(b);
        a = b.substr(0, c);
        c = b.substr(c + 1);
        if (!c || !oi(a)) return pi(b);
        c = c.replace("googlemail.com", "gmail.com");
        de(c) && (c = "yandex.ru");
        "yandex.ru" === c ? a = a.replace(Ia, "-") : "gmail.com" === c && (a = a.replace(Ia, ""));
        b = La(a, "+"); - 1 !== b && (a = a.slice(0, b));
        return pi(a + "@" + c)
    }
    var ri = le(/[^\d+()]/g),
        si = /[a-z\u0430-\u044f\u0451,.]/gi;

    function ti(a, b) {
        var c = ne(b),
            d = c.length;
        if (!(si.test(b) || b.length - d > d || 10 > d || 16 < d)) {
            d = c[0];
            var e = b[1];
            if ("+" !== b[0] || e === d) return d = ri(b), 10 > c.length || 13 < c.length || d.startsWith("+8") ? ke(b) : "8" === d[0] ? "7" + c.slice(1) : "+" === d[0] || Rb(a, +d[0]) ? c : "7" + c
        }
    }
    var ui = x(function(a) {
        return !!J(a, "crypto.subtle.digest") && !!J(a, "TextEncoder") && !!J(a, "FileReader") && !!J(a, "Blob")
    });

    function vi(a, b) {
        return new S(function(c, d) {
            var e = (new a.TextEncoder).encode(b);
            a.crypto.subtle.digest("SHA-256", e).then(function(f) {
                f = new a.Blob([f], {
                    type: "application/octet-binary"
                });
                var g = new a.FileReader;
                g.onload = function(h) {
                    h = J(h, "target.result") || "";
                    var k = La(h, ","); - 1 !== k ? c(h.substring(k + 1)) : d(jd("fpm.i"))
                };
                g.readAsDataURL(f)
            }, d)
        })
    }
    var wi = ["yandex_cid", "yandex_public_id"];

    function xi(a, b, c) {
        c = void 0 === c ? 0 : c;
        b = ac(b);
        b = G(function(d, e) {
            var f = q(e),
                g = f.next().value;
            f = f.next().value;
            var h = Ra(f);
            if (!h && (Rb(a, f) && (f = "" + f), !y(f))) return d;
            if (h) f = xi(a, f, c + 1);
            else if (!c && K(g, wi)) f = S.resolve(f);
            else {
                "phone_number" === g ? f = ti(a, f) : "email" === g && (f = qi(f));
                if (!f) return d;
                f = vi(a, f)
            }
            d.push(f.then(function(k) {
                return [g, k]
            }));
            return d
        }, [], b);
        return S.all(b)
    }
    var yi = W("fpm", function(a, b) {
        if (!ge(a)) return u;
        var c = O(b);
        if (!ui(a)) return Zh(a, c, "ns"), u;
        var d = fi(a, b);
        return d ? function(e) {
            return (new S(function(f, g) {
                return Ra(e) ? bc(e).length ? f(xi(a, e).then(function(h) {
                    if (h && h.length) {
                        var k = {},
                            l = {};
                        d.params((l.__ym = (k.fpp = h, k), l))
                    }
                }, u)) : g(hf("fpm.l")) : g(hf("fpm.o"))
            }))["catch"](V(a, "fpm.en"))
        } : u
    });

    function zi(a, b) {
        return G(function(c, d) {
            var e = q(d),
                f = e.next().value,
                g = e.next().value;
            e = g;
            g = Ra(g);
            if (!g && (Rb(a, e) && (e = "" + e), !y(e))) return c;
            e = g ? zi(a, e) : e;
            db(e) && c.push([f, e]);
            return c
        }, [], ac(b))
    }

    function Ai(a, b) {
        return function(c) {
            var d = fi(a, b);
            if (d) {
                var e = Yh(a, O(b));
                if (Ra(c))
                    if (db(bc(c))) {
                        if ((c = zi(a, c)) && db(c)) {
                            e = {};
                            var f = {};
                            d.params((f.__ym = (e.fpmh = c, e), f))
                        }
                    } else e.log("fpeo");
                else e.log("fpno")
            }
        }
    }

    function Bi(a) {
        a = Q(a);
        var b = a.C("dsjf") || ta({});
        a.ra("dsjf", b);
        return b
    }

    function Ci(a, b, c) {
        Bi(a)(function(d) {
            d[b] = N(d[b] || {}, c)
        })
    }

    function Di(a, b) {
        Bi(a)(function(c) {
            delete c[b]
        })
    }

    function Ei(a, b) {
        return function(c) {
            Ci(a, b, c)
        }
    }
    var Fi = pa(function(a, b) {
            var c = {};
            Bi(a)(function(d) {
                c = d[b] || {}
            });
            return c
        }),
        Gi = W("c.c.cc", function(a) {
            var b = Q(a),
                c = H(Fi(a), function(d) {
                    var e = {};
                    e = (e.clickmap = !!d.clickmap, e);
                    return N({}, d, e)
                });
            return V(a, "g.c.cc", H(D(b.C, b, "counters", {}), bc, Jb(c)))
        }),
        Hi = W("gt.c.rs", function(a, b) {
            var c = O(b),
                d = b.id,
                e = b.ca,
                f = b.ug,
                g = b.we,
                h = E([a, c], Di),
                k = {};
            Ci(a, c, (k.id = d, k.type = +e, k.clickmap = f, k.trackHash = !!g, k));
            return h
        }),
        Ii = {};

    function Ji(a, b) {
        var c = O(a),
            d = J(b, "__ym.turbo_page"),
            e = J(b, "__ym.turbo_page_id");
        Ii[c] || (Ii[c] = {});
        if (d || e) Ii[c].Vh = d, Ii[c].Wh = e
    }

    function Ki(a) {
        a = O(a);
        return Ii[a] && Ii[a].Vh
    }
    var Li = x(De);

    function Mi(a, b) {
        return {
            V: function(c, d) {
                var e = (c.M || {}).O,
                    f = void 0 === c.N ? {} : c.N;
                if (e && (Ji(b, e), !f.ba && c.K && c.H)) {
                    var g = yf(a, e),
                        h = Li(a),
                        k = c.K.C("pv");
                    if (g && !c.H.nohit) {
                        var l = {},
                            m = {};
                        Fe(a, (m.counterKey = O(b), m.name = "params", m.data = (l.val = e, l), m));
                        k ? encodeURIComponent(g).length > Mc.bg ? h.push([c.K, e]) : c.H["site-info"] = g : (f.ba = g, c.N = f, c.Ic || (c.Ic = {}), c.Ic.uh = !0)
                    }
                }
                d()
            },
            Ca: function(c, d) {
                var e = Li(a),
                    f = fi(a, b),
                    g = f && f.params;
                g && (f = mb(H(wb, ra(c.K)), e), M(function(h) {
                    var k = q(h);
                    k.next();
                    k = k.next().value;
                    g(k);
                    h =
                        vb(a)(h, e);
                    e.splice(h, 1)
                }, f));
                d()
            }
        }
    }

    function Ni(a, b, c, d, e) {
        var f = E([a, d, e], ci);
        return c.then(f, function(g) {
            f();
            mf(a, b, g)
        })
    }
    var Oi = x(Ce, O);

    function Pi(a) {
        var b = u,
            c = null,
            d = a.length;
        if (0 !== a.length && a[0]) {
            var e = a.slice(-1)[0];
            A(e) && (b = e, d = a.length + -1);
            var f = a.slice(-2)[0];
            A(f) && (b = f, c = e, d = a.length + -2);
            d = a.slice(0, d);
            return {
                Bg: c,
                Zb: b,
                O: 1 === d.length ? a[0] : eb(d)
            }
        }
    }
    var Qi = W("pa.int", function(a, b) {
        var c = {};
        return c.params = function() {
            var d = Ha(arguments),
                e = Pi(d);
            if (!e) return null;
            d = e.Bg;
            var f = e.O;
            e = e.Zb;
            if (!Ra(f) && !L(f)) return null;
            var g = Rh(a, "1", b),
                h = Oi(b).url,
                k = !$d(b),
                l = "pa",
                m = {};
            m = (m.id = b.id, m);
            var p = f,
                r = "";
            if (r = J(f, "__ym.user_id")) l = "pau", m.uid = r;
            K("__ymu", bc(f)) && (l = "paup");
            p.__ym && (p = N({}, f), p.__ym = G(function(t, v) {
                var z = J(f, "__ym." + v);
                z && (t[v] = z);
                return t
            }, {}, qf), bc(p.__ym).length || delete p.__ym, k = !!bc(p).length);
            p = r ? void 0 : JSON.stringify(p);
            l = $h(a, b, l, m,
                p);
            m = {};
            p = {};
            g = g({
                M: {
                    O: f
                },
                K: Le((m.pa = 1, m.ar = 1, m)),
                H: (p["page-url"] = h || U(a).href, p)
            }, b).then(k ? l : u);
            return Ni(a, "p.s", g, e, d)
        }, c
    });

    function Ri(a, b, c, d, e) {
        return (new S(function(f, g) {
            var h = bc(c),
                k = H(d.resolve || w, sa(f)),
                l = H(d.reject || w, sa(g));
            d.resolve = k;
            d.reject = l;
            M(function(m) {
                d.xe.push(+m);
                var p = c[m],
                    r = X(a, F(hf(), l), 5100, "is.m"),
                    t = {};
                b(p.window, N(e, (t.toCounter = Ub(m), t)), function(v, z) {
                    rg(a, r);
                    d.Jf.push(m);
                    d.resolve && d.resolve(z)
                })
            }, h)
        }))["catch"](V(a, "if.b"))
    }

    function Si(a, b, c) {
        b = mb(function(d) {
            return !K(c.info.counterId, d.xe)
        }, b);
        M(function(d) {
            if (c.info.counterId) {
                var e = {};
                a((e[c.info.counterId] = c, e), d, d.data)
            }
        }, b)
    }

    function Ti(a, b) {
        var c = Lg(a, b),
            d = [],
            e = [];
        if (!c) return null;
        var f = E([a, c.ke], Ri),
            g = F(f, Si);
        c.Z.F(["initToParent"], function(h) {
            h = q(h);
            h.next();
            h = h.next().value;
            g(d, c.children[h.counterId])
        }).F(["parentConnect"], function(h) {
            h = q(h);
            h.next();
            h = h.next().value;
            g(e, c.Fa[h.counterId])
        });
        return {
            Z: c.Z,
            Ki: function(h, k) {
                return new S(function(l, m) {
                    c.ke(h, k, function(p, r) {
                        l([p, r])
                    });
                    X(a, F(hf(), m), 5100, "is.o")
                })
            },
            Gf: function(h) {
                var k = {
                    Jf: [],
                    xe: [],
                    data: h
                };
                d.push(k);
                return f(c.children, k, h)
            },
            Hf: function(h) {
                var k = {
                    Jf: [],
                    xe: [],
                    data: h
                };
                e.push(k);
                return f(c.Fa, k, h)
            }
        }
    }
    var Ui = x(Ti, H(Da, O));

    function Vi(a, b) {
        if (!K(b, M(cb("ymetrikaEvent.type"), a))) {
            var c = {},
                d = {};
            a.push((d.ymetrikaEvent = (c.type = b, c), d))
        }
    }

    function Wi(a) {
        a = Q(a);
        var b = a.C("dataLayer", []);
        a.D("dataLayer", b);
        return b
    }

    function Xi(a, b, c, d) {
        c = void 0 === c ? u : c;
        d = void 0 === d ? !1 : d;
        var e = Cg(a);
        if (b && A(b.push)) {
            var f = b.push;
            b.push = function() {
                var g = Ha(arguments),
                    h = q(g).next().value;
                d && e.$(h);
                g = f.apply(b, g);
                d || e.$(h);
                return g
            };
            a = {
                oa: e,
                unsubscribe: function() {
                    b.push = f
                }
            };
            c(a);
            M(e.$, b);
            return a
        }
    }

    function Yi(a, b) {
        var c = J(b, "ymetrikaEvent");
        c && a.$(J(c, "type"), c)
    }

    function Zi(a, b, c) {
        c = void 0 === c ? w : c;
        var d = Dg(a);
        c(d);
        var e = F(d, Yi);
        Xi(a, b, function(f) {
            f.oa.F(e)
        });
        return d
    }

    function $i(a, b, c, d) {
        var e = fi(a, c);
        if (e) {
            a = d.data;
            c = "" + c.id;
            var f = d.sended || [];
            d.sended || (d.sended = f);
            K(c, f) || !e.params || d.counter && "" + d.counter !== c || (e.params(a), f.push(c), d.parent && (d = {}, b.Hf((d.type = "params", d.data = a, d))))
        }
    }
    var aj = W("y.p", function(a, b) {
        var c = Ti(a, b);
        if (c) {
            var d = Wi(a),
                e = E([a, c, b], $i);
            Zi(a, d, function(f) {
                f.F(["params"], e)
            });
            c.Z.F(["params"], H(cb("1"), e))
        }
    });

    function bj(a, b, c, d) {
        var e = U(a),
            f = e.hostname;
        e = e.href;
        if (b = Oi(b).url) a = qh(a, b), f = a.hostname, e = a.href;
        return [d + "://" + f + "/" + c, e || ""]
    }
    var cj = {
            Ci: Wa(/[/&=?#]/)
        },
        dj = W("go.in", function(a, b, c, d) {
            c = void 0 === c ? "goal" : c;
            var e = {};
            return e.reachGoal = function(f, g, h, k) {
                if (!f || cj[c] && cj[c](f)) return null;
                var l = g,
                    m = h || u;
                A(g) && (m = g, l = void 0, k = h);
                g = {};
                var p = $h(a, b, "gr", (g.id = b.id, g.goal = f, g), l),
                    r = "goal" === c;
                g = Rh(a, "g", b);
                var t = q(bj(a, b, f, c));
                h = t.next().value;
                t = t.next().value;
                var v = {},
                    z = {};
                g = g({
                    M: {
                        O: l
                    },
                    K: Le((v.ar = 1, v)),
                    H: (z["page-url"] = h, z["page-ref"] = t, z)
                }, b).then(function() {
                    r && p();
                    var P = {},
                        R = {};
                    Fe(a, (R.counterKey = O(b), R.name = "event", R.data = (P.schema =
                        c, P.name = f, P.params = l, P), R));
                    d && d()
                });
                return Ni(a, "g.s", g, m, k)
            }, e
        }),
        ej = W("guid.int", function(a, b) {
            var c = {};
            return c.getClientID = function(d) {
                var e = pg(a, b);
                d && ci(a, d, null, e);
                return e
            }, c
        }),
        fj;

    function gj(a) {
        return (a = U(a).hash.split("#")[1]) ? a.split("?")[0] : ""
    }

    function hj(a, b) {
        var c = gj(a);
        fj = sg(a, function() {
            var d = gj(a);
            d !== c && (b(), c = d)
        });
        return D(tg, null, a, fj)
    }

    function ij(a, b, c, d) {
        var e = b.ca,
            f = b.Ce,
            g = b.qc,
            h = Q(a),
            k = {};
        k = Le((k.wh = 1, k.pv = 1, k));
        var l = J(d, "isTrusted");
        d && !C(l) && k.D("ite", ib(l));
        Nc(e) && a.Ya && a.Ya.Direct && k.D("ad", "1");
        f && k.D("ut", "1");
        e = h.C("lastReferrer");
        d = U(a).href;
        f = {};
        g = {
            H: (f["page-url"] = g || d, f["page-ref"] = e, f),
            K: k
        };
        c(g, b)["catch"](V(a, "g.s"));
        h.D("lastReferrer", d)
    }
    var jj = W("th.e", function(a, b) {
        function c() {
            f || (h = I(a, "onhashchange") ? ud(a).F(a, ["hashchange"], g) : hj(a, g))
        }
        var d = Rh(a, "t", b),
            e = Ei(a, O(b)),
            f = !1,
            g = V(a, "h.h.ch", D(ij, null, a, b, d)),
            h = u;
        b.we && (c(), f = !0);
        d = {};
        return d.trackHash = V(a, "tr.hs.h", function(k) {
            k ? c() : h();
            f = !!k;
            k = {};
            e((k.trackHash = f, k))
        }), d.u = h, d
    });

    function kj(a) {
        var b = null;
        try {
            b = a.target || a.srcElement
        } catch (c) {}
        if (b) {
            3 === b.nodeType && (b = b.parentNode);
            for (a = b && b.nodeName && ("" + b.nodeName).toLowerCase(); J(b, "parentNode.nodeName") && ("a" !== a && "area" !== a || !b.href && !b.getAttribute("xlink:href"));) a = (b = b.parentNode) && b.nodeName && ("" + b.nodeName).toLowerCase();
            return b.href ? b : null
        }
        return null
    }

    function lj(a, b) {
        var c = {};
        c = (c.string = !0, c.object = !0, c["boolean"] = b, c)[typeof b] || !1;
        var d = {};
        a((d.trackLinks = c, d))
    }

    function mj(a, b, c) {
        var d = Le();
        void 0 !== c.xc && d.D("ite", ib(c.xc));
        c.vc && d.D("dl", 1);
        c.ob && d.D("ln", 1);
        var e = c.Xf || {},
            f = {};
        d = {
            K: d,
            M: {
                title: e.title || c.title,
                zc: !!c.zc,
                O: e.params
            },
            H: (f["page-url"] = c.url, f["page-ref"] = b.qc || U(a).href, f)
        };
        f = "Link";
        c.vc ? f = c.ob ? "Ext link - File" : "File" : c.ob && (f = "Ext link");
        var g = {},
            h = {};
        Fe(a, (h.counterKey = O(b), h.name = "event", h.data = (g.schema = "Link click", g.name = (c.ob ? "external" : "internal") + " url: " + c.url, g), h));
        g = {};
        b = c.sender(d, b).then($h(a, b, "lcl", (g.prefix = f, g.id = b.id,
            g.url = c.url, g), c.Xf));
        Ni(a, "cl.p.s", b, e.callback || u, e.ctx)
    }

    function nj(a, b) {
        if (a.Xh()) {
            var c = kj(b);
            if (c && !Of("ym-disable-tracklink", c)) {
                var d = a.l,
                    e = a.zg,
                    f = a.fb,
                    g = a.sender,
                    h = a.Mg,
                    k = f.qc,
                    l = c.href;
                var m = ke(c.innerHTML && c.innerHTML.replace(/<\/?[^>]+>/gi, ""));
                m || (m = (m = c.querySelector("img")) ? ke(m.getAttribute("title") || m.getAttribute("alt")) : "");
                m = l === m ? "" : m;
                var p = J(b, "isTrusted");
                if (Of("ym-external-link", c)) mj(d, f, {
                    url: l,
                    ob: !0,
                    title: m,
                    xc: p,
                    sender: g
                });
                else {
                    k = k ? qh(d, k).hostname : U(d).hostname;
                    h = RegExp("\\.(" + T("|", M(Pa, h)) + ")$", "i");
                    var r = c.protocol + "//" + c.hostname +
                        c.pathname;
                    h = sf.test(r) || sf.test(l) || h.test(l) || h.test(r);
                    c = c.hostname;
                    ee(k) === ee(c) ? h ? mj(d, f, {
                        url: l,
                        vc: !0,
                        xc: p,
                        title: m,
                        sender: g
                    }) : m && e.D("il", ke(m).slice(0, 100)) : l && rf.test(l) || mj(d, f, {
                        url: l,
                        zc: !0,
                        ob: !0,
                        vc: h,
                        xc: p,
                        title: m,
                        sender: g
                    })
                }
            }
        }
    }
    var oj = pa(function(a, b) {
            y(b) ? a.push(b) : M(H(w, Va("push", a)), b)
        }),
        pj = Yd("retryReqs", function(a) {
            var b = Ff(a),
                c = b.C("retryReqs", {}),
                d = Ed(a)(Ad);
            M(function(e) {
                var f = q(e);
                e = f.next().value;
                f = f.next().value;
                (!f || !f.time || f.time + 864E5 < d) && delete c[e]
            }, ac(c));
            b.D("retryReqs", c);
            return c
        }, !0);

    function qj(a) {
        var b = pj(a);
        Ff(a).D("retryReqs", b)
    }

    function rj(a, b) {
        var c = pj(a);
        b.K && !Qa(c) && b.M && (delete c[b.M.Pb], qj(a))
    }

    function sj(a, b) {
        return {
            V: function(c, d) {
                var e = c.K,
                    f = c.Ha,
                    g = c.H,
                    h = void 0 === c.N ? {} : c.N;
                if (e && g) {
                    var k = Ed(a);
                    e.Sb("rqnl", 1);
                    for (var l = pj(a), m = 1; l[m];) m += 1;
                    c.M || (c.M = {});
                    c.M.Pb = m;
                    var p = {};
                    l[m] = (p.protocol = Mc.La, p.host = Kc, p.resource = c.Ja.qa, p.postParams = h.ba, p.time = k(Ad), p.counterType = b.ca, p.params = g, p.browserInfo = e.l(), p.counterId = b.id, p.ghid = lg(a), p);
                    f && (l[m].telemetry = f.l());
                    qj(a)
                }
                d()
            },
            Ca: function(c, d) {
                rj(a, c);
                d()
            }
        }
    }
    var tj = H(Ma, ra(0)),
        uj = qa(tj),
        vj = [uj("watch"), uj("clmap")],
        wj = W("g.r", function(a) {
            var b = Ed(a),
                c = pj(a),
                d = b(Ad),
                e = lg(a);
            return G(function(f, g) {
                var h = q(g),
                    k = h.next().value;
                (h = h.next().value) && Nb(ta(h.resource), vj) && !h.d && h.ghid && h.ghid !== e && h.time && 500 < d - h.time && h.time + 864E5 > d && 2 >= h.browserInfo.rqnl && (h.d = 1, k = {
                    protocol: h.protocol,
                    host: h.host,
                    qa: h.resource,
                    Eh: h.postParams,
                    O: h.params,
                    og: h.browserInfo,
                    Ai: h.ghid,
                    time: h.time,
                    Pb: Ub(k),
                    yg: h.counterId,
                    ca: h.counterType
                }, h.telemetry && (k.Ha = h.telemetry), f.push(k));
                return f
            }, [], ac(c))
        });

    function xj(a, b, c) {
        function d() {
            t || (r = !0, v = !1, t = !0, f())
        }

        function e() {
            m = !0;
            k(!1);
            b()
        }

        function f() {
            rg(a, l);
            if (m) k(!1);
            else {
                var ma = Math.max(0, c - (v ? z : z + p(Ad) - P));
                ma ? l = X(a, e, ma, "u.t.d.c") : e()
            }
        }

        function g() {
            v = r = t = !0;
            z += p(Ad) - P;
            P = p(Ad);
            f()
        }

        function h() {
            r || t || (z = 0);
            P = p(Ad);
            r = t = !0;
            v = !1;
            f()
        }

        function k(ma) {
            ma = ma ? R.F : R.Wb;
            ma(a, ["blur"], g);
            ma(a, ["focus"], h);
            ma(a.document, ["click", "mousemove", "keydown", "scroll"], d)
        }
        var l = 0,
            m = !1;
        if (tc(a)) return l = X(a, b, c, "u.t.d"), E([a, l], rg);
        var p = Ed(a),
            r = !1,
            t = !1,
            v = !0,
            z = 0,
            P = p(Ad),
            R = ud(a);
        k(!0);
        f();
        return function() {
            rg(a, l);
            k(!1)
        }
    }
    var yj = W("nb.p", function(a, b) {
        function c(z) {
            h() || (z = "number" === typeof z ? z : 15E3, v = xj(a, d(!1), z), l())
        }

        function d(z) {
            return function(P) {
                var R = {};
                P = void 0 === P ? (R.ctx = {}, R.callback = u, R) : P;
                if (z || !r && !g.Id) {
                    r = !0;
                    l();
                    v && v();
                    var ma = m(Ad);
                    R = (Ub(g.C("lastHit")) || 0) < ma - 18E5;
                    var Dc = .1 > Math.random();
                    g.D("lastHit", ma);
                    ma = {};
                    ma = Le((ma.nb = 1, ma.cl = t, ma.ar = 1, ma));
                    var Gd = Oi(b),
                        Ze = {};
                    ma = {
                        H: (Ze["page-url"] = Gd.url || U(a).href, Ze),
                        K: ma,
                        M: {
                            force: z
                        }
                    };
                    Gd = Yh(a, O(b)).warn;
                    !P.callback && P.ctx && Gd("nbnc");
                    (R = z || R || Dc) || (R = a.location.href,
                        Dc = a.document.referrer, R = !(R && Dc ? rh(R) === rh(Dc) : !R && !Dc));
                    if (R) return R = e(ma, b), Ni(a, "l.o.l", R, P.callback, P.ctx)
                }
                return null
            }
        }
        var e = Rh(a, "n", b),
            f = O(b),
            g = Gf(a, b.id),
            h = F(F(f, Fi(a)), H(Qe, cb("accurateTrackBounce"))),
            k = {},
            l = F((k.accurateTrackBounce = !0, k), Ei(a, f)),
            m = Ed(a),
            p = m(Ad),
            r = !1,
            t = 0,
            v;
        Wh(b, function(z) {
            t = z.Ng - p
        });
        b.He && c(b.He);
        f = {};
        f = (f.notBounce = d(!0), f.u = v, f);
        f.accurateTrackBounce = c;
        return f
    });

    function zj(a) {
        return !(!wa("querySelectorAll", J(a, "Element.prototype.querySelectorAll")) || !a.document.querySelectorAll)
    }

    function Aj(a, b) {
        if (!b || !b.querySelectorAll) return [];
        var c = b.querySelectorAll(a);
        return c ? ub(c) : []
    }

    function Bj(a, b) {
        if (b.querySelector) return b.querySelector(a);
        var c = Aj(a, b);
        return c && c.length ? c[0] : null
    }

    function Cj(a, b) {
        var c = Pe([], a),
            d = c.shift();
        if (!d) return [];
        d = b.getElementsByTagName(d);
        return c.length ? Ib(F(c, Cj), ub(d)) : ub(d)
    }

    function Dj(a, b, c) {
        if (zj(a)) return ub(c.querySelectorAll(b));
        var d = Cj(b.split(" "), c);
        return mb(function(e, f) {
            return Aa(a)(e, d) === f
        }, d)
    }

    function Ej(a, b, c) {
        if (!(b && b.Element && b.Element.prototype && b.document && c)) return null;
        if (b.Element.prototype.closest && wa("closest", b.Element.prototype.closest) && c.closest) return c.closest(a);
        var d = Pf(b);
        if (d) {
            for (b = c; b && 1 === b.nodeType && !d.call(b, a);) b = b.parentElement || b.parentNode;
            return b && 1 === b.nodeType ? b : null
        }
        if (zj(b)) {
            for (a = ub((b.document || b.ownerDocument).querySelectorAll(a)); c && 1 === c.nodeType && -1 === Aa(b)(c, a);) c = c.parentElement || c.parentNode;
            return c && 1 === c.nodeType ? c : null
        }
        return null
    }

    function Fj(a, b) {
        return I(b, "isConnected") ? !b.isConnected : Ej("html", a, b) !== a.document.documentElement
    }

    function Gj(a, b) {
        var c = b,
            d = J(a, "document"),
            e = Yf(c);
        if (!c || !c.ownerDocument || "PARAM" === e || c === Qf(a) || c === d.documentElement) return {
            left: 0,
            top: 0
        };
        if (d = Vf(c)) return c = Uf(a), {
            left: Math.round(d.left + c.x),
            top: Math.round(d.top + c.y)
        };
        for (e = d = 0; c;) d += c.offsetLeft, e += c.offsetTop, c = c.offsetParent;
        return {
            left: d,
            top: e
        }
    }

    function Hj(a, b) {
        var c = J(a, "document");
        if (b === Qf(a) || b === c.documentElement) {
            c = Rf(a);
            var d = q(Tf(a)),
                e = d.next().value;
            d = d.next().value;
            return [Math.max(c.scrollWidth, e), Math.max(c.scrollHeight, d)]
        }
        return (c = Vf(b)) ? [c.width, c.height] : [b.offsetWidth, b.offsetHeight]
    }

    function Ij(a, b) {
        var c = Gj(a, b),
            d = c.left;
        c = c.top;
        var e = q(Hj(a, b)),
            f = e.next().value;
        e = e.next().value;
        return [d, c, f, e]
    }

    function Jj(a, b) {
        var c = J(a, "document");
        return b && b !== c.documentElement ? b === Qf(a) ? c.documentElement : J(b, "parentNode") : null
    }

    function Kj(a, b, c) {
        if (a = Jj(a, b)) {
            a = a.childNodes;
            for (var d = b && b.nodeName, e = 0, f = 0; f < a.length; f += 1)
                if (d === (a[f] && a[f].nodeName)) {
                    if (b === a[f]) return e;
                    c && a[f] === c || (e += 1)
                }
        }
        return 0
    }
    var Lj = x(function() {
        for (var a = 59, b = {}, c = 0; c < pf.length; c += 1) b[pf[c]] = String.fromCharCode(a), a += 1;
        return b
    });

    function Mj(a, b, c) {
        for (var d = "", e = Lj(), f = Yf(b) || "*"; b && b.parentNode && !K(f, ["BODY", "HTML"]);) d += e[f] || "*", d += Kj(a, b, c) || "", b = b.parentElement, f = Yf(b) || "*";
        return ke(d, 128)
    }

    function Nj(a) {
        var b = ["ym-disable-keys", "-metrika-nokeys"];
        b = L(b) ? b : [b];
        a = a || document;
        if (a.querySelectorAll) return b = T(", ", M(function(c) {
            return "." + c
        }, b)), ub(a.querySelectorAll(b));
        if (a.getElementsByClassName) return Ib(H(Va("getElementsByClassName", a), ub), b);
        a = a.getElementsByTagName("*");
        b = "(" + T("|", b) + ")";
        return mb(F(b, Of), ub(a))
    }

    function Oj(a, b) {
        var c = Rf(a),
            d = Uf(a);
        return {
            x: b.pageX || b.clientX + d.x - (c.clientLeft || 0) || 0,
            y: b.pageY || b.clientY + d.y - (c.clientTop || 0) || 0
        }
    }

    function Pj(a) {
        var b = a.which;
        a = a.button;
        return b || void 0 === a ? b : 1 === a || 3 === a ? 1 : 2 === a ? 3 : 4 === a ? 2 : 0
    }

    function Qj(a, b) {
        var c = null;
        try {
            if (c = b.target || b.srcElement) !c.ownerDocument && c.documentElement ? c = c.documentElement : c.ownerDocument !== a.document && (c = null)
        } catch (d) {}
        return c
    }
    var Rj = pa(Of)("(ym-disable-clickmap|ym-clickmap-ignore)");

    function Sj(a, b, c, d, e) {
        if (I(a, "ymDisabledClickmap") || !b || !b.element) return !1;
        a = Yf(b.element);
        if (e && !e(b.element, a) || K(b.button, [2, 3]) && "A" !== a || Nb(ra(a), d)) return !1;
        d = b.element;
        if (b && c) {
            if (50 > b.time - c.time) return !1;
            e = Math.abs(c.position.x - b.position.x);
            a = Math.abs(c.position.y - b.position.y);
            b = b.time - c.time;
            if (c.element === d && 2 > e && 2 > a && 1E3 > b) return !1
        }
        for (; d;) {
            if (Rj(d)) return !1;
            d = d.parentElement
        }
        return !0
    }

    function Tj(a, b, c, d, e) {
        var f = "clmap/" + e.id,
            g = {};
        b = (g["page-url"] = b, g["pointer-click"] = c, g);
        f = {
            K: Le(),
            H: b,
            Ja: {
                qa: f
            }
        };
        d(f, e)["catch"](V(a, "c.s.c"))
    }
    var Uj = W("clm.p", function(a, b) {
            if (hc(a)) return u;
            var c = Rh(a, "m", b),
                d = O(b),
                e = Ed(a),
                f = e(Ad),
                g = F(F(d, Fi(a)), H(Qe, cb("clickmap"))),
                h, k = null;
            d = V(a, "clm.p.c", function(l) {
                var m = g();
                if (m) {
                    var p = Q(a),
                        r = p.C("cls", {
                            dc: 0,
                            x: 0,
                            y: 0
                        });
                    p.D("cls", {
                        dc: r.dc + 1,
                        x: r.x + l.clientX,
                        y: r.y + l.clientY
                    });
                    p = "object" === typeof m ? m : {};
                    r = p.filter;
                    m = p.isTrackHash || !1;
                    var t = M(function(z) {
                        return ("" + z).toUpperCase()
                    }, p.ignoreTags || []);
                    B(h) && (h = p.quota || null);
                    var v = !!p.quota;
                    l = {
                        element: Qj(a, l),
                        position: Oj(a, l),
                        button: Pj(l),
                        time: e(Ad)
                    };
                    p =
                        U(a).href;
                    if (Sj(a, l, k, t, r)) {
                        if (v) {
                            if (!h) return;
                            --h
                        }
                        t = q(Hj(a, l.element));
                        r = t.next().value;
                        t = t.next().value;
                        v = Gj(a, l.element);
                        r = ["rn", Xd(a), "x", Math.floor(65535 * (l.position.x - v.left) / (r || 1)), "y", Math.floor(65535 * (l.position.y - v.top) / (t || 1)), "t", Math.floor((l.time - f) / 100), "p", Mj(a, l.element), "X", l.position.x, "Y", l.position.y];
                        r = T(":", r);
                        m && (r += ":wh:1");
                        Tj(a, p, r, c, b);
                        k = l
                    }
                }
            });
            return ud(a).F(J(a, "document"), ["click"], d)
        }),
        Vj = W("trigger.in", function(a, b) {
            b.Uf && ai(a, E([a, "yacounter" + b.id + "inited"], Wf), "t.i")
        });

    function Wj(a, b) {
        var c = {};
        a((c.clickmap = B(b) ? !0 : b, c))
    }
    var Xj = W("c.m.p", function(a, b) {
        var c = O(b),
            d = {};
        return d.clickmap = F(Ei(a, c), Wj), d
    });

    function Yj(a) {
        a = "" + a;
        for (var b = 2166136261, c = a.length, d = 0; d < c; d += 1) b ^= a.charCodeAt(d), b += (b << 1) + (b << 4) + (b << 7) + (b << 8) + (b << 24);
        return b >>> 0
    }
    var Zj = {},
        ak = {};
    Zj.p = 500;
    var bk = {
        i: "id",
        n: "name",
        h: "href",
        ty: "type"
    };
    ak.h = !0;
    ak.c = !0;
    var ck = {
        p: function(a, b, c) {
            if (b && Fj(a, b) && b._ymp) return b._ymp;
            a = Mj(a, b, c);
            b && (b._ymp = a);
            return a
        },
        c: function(a, b, c) {
            (a = ke(J(b, "textContent"))) && c && (c = c(b), c.length && Nb(H(cb("textContent"), ke, ra(a)), c) && (a = ""));
            $f(b) && (a = ke(b.getAttribute && b.getAttribute("value") || a));
            return a
        }
    };

    function dk(a, b, c, d) {
        return G(function(e, f) {
            var g = null;
            f in bk ? g = b.getAttribute && b.getAttribute(bk[f]) : f in ck && (g = "p" === f ? ck[f](a, b, void 0) : "c" === f ? ck[f](a, b, d) : ck[f](a, b));
            g && (g = g.slice(0, Zj[f] || 100), e[f] = ak[f] ? "" + Yj(g) : g);
            return e
        }, {}, c)
    }
    var ek = F("form", Ej),
        fk = x(H(Da, qa(Wh)(cb("settings.form_goals"))), Da);

    function gk(a, b, c, d) {
        return fk(a, b).then(H(E([$h(a, b, c, d), u], gb), Qe))
    }

    function hk(a, b, c, d, e, f) {
        var g = Aa(b)(e, d),
            h = -1 !== g;
        if (a || h) h && d.splice(g, 1), a = dk(b, e, ["i", "n", "p"]), a = "?" + Wd(a), d = {}, d = E([b, c, "fg", (d.id = c.id, d.query = a, d)], gk), C(f) ? f = void 0 : (e = {}, g = {}, f = (g.__ym = (e.ite = ib(f), e), g)), dj(b, c, "form", d).reachGoal(a, f)
    }

    function ik(a, b, c, d) {
        var e = J(d, "target");
        e && (d = J(d, "isTrusted"), (e = Ej("button,input", a, e)) && "submit" === e.type && (e = ek(a, e))) && (c.push(e), X(a, E([!1, a, b, c, e, d], hk), 300))
    }
    var jk = W("s.f.i", function(a, b) {
        var c = [],
            d = [],
            e = ud(a);
        c.push(e.F(a, ["click"], V(a, "s.f.c", E([a, b, d], ik))));
        c.push(e.F(a, ["submit"], V(a, "s.f.e", function(f) {
            var g = J(f, "target");
            f = J(f, "isTrusted");
            hk(!0, a, b, d, g, f)
        })));
        e = {};
        gk(a, b, "fgi", (e.id = b.id, e));
        return E([Re, c], M)
    });

    function kk(a, b, c, d) {
        return function() {
            if (fi(a, b)) {
                var e = Ha(arguments);
                return d.apply(null, ca(e))
            }
        }
    }
    var lk = "button," + T(",", M(function(a) {
            return 'input[type="' + a + '"]'
        }, ["button", "submit", "reset", "file"])) + ",a",
        mk = F(lk, Aj),
        nk = {},
        ok = (nk.A = "h", nk.BUTTON = "i", nk.DIV = "i", nk.INPUT = "ty", nk);

    function pk(a, b, c) {
        var d = J(c, "target");
        if (d) {
            var e = Ej(lk, a, d);
            e || (d = Ej("div", a, d)) && (Aj(lk + ",div", d).length || (e = d));
            if (e = (d = Yf(e)) && dk(a, e, nb(["p", ok[d], "c"]), mk)) {
                e = "?" + Wd(e);
                d = {};
                d = $h(a, b, "gbn", (d.id = b.id, d.query = e, d));
                c = J(c, "isTrusted");
                if (C(c)) c = void 0;
                else {
                    var f = {},
                        g = {};
                    c = (g.__ym = (f.ite = ib(c), f), g)
                }
                dj(a, b, "btn", d).reachGoal(e, c)
            }
        }
    }
    var qk = W("s.f.i", function(a, b) {
            return Wh(b, function(c) {
                if (J(c, "settings.button_goals")) {
                    c = ud(a).F(a, ["click"], V(a, "c.t.c", H(E([a, b], kk(a, b, "", pk)))));
                    var d = {};
                    $h(a, b, "gbi", (d.id = b.id, d))();
                    return c
                }
            })
        }),
        rk = {},
        sk = (rk.transaction_id = "id", rk.item_brand = "brand", rk.index = "position", rk.item_variant = "variant", rk.value = "revenue", rk.item_category = "category", rk.item_list_name = "list", rk),
        tk = {},
        uk = (tk.item_id = "id", tk.item_name = "name", tk.promotion_name = "coupon", tk),
        vk = {},
        wk = (vk.promotion_name = "name", vk),
        xk = {},
        yk = (xk.promotion_name = "name", xk.promotion_id = "id", xk.item_id = "product_id", xk.item_name = "product_name", xk),
        zk = "currencyCode add delete remove purchase checkout detail impressions click promoView promoClick".split(" "),
        Ak = {},
        Bk = (Ak.view_item = {
            event: "detail",
            ya: uk,
            Ia: "products"
        }, Ak.add_to_cart = {
            event: "add",
            ya: uk,
            Ia: "products"
        }, Ak.remove_from_cart = {
            event: "remove",
            ya: uk,
            Ia: "products"
        }, Ak.begin_checkout = {
            event: "checkout",
            ya: uk,
            Ia: "products"
        }, Ak.purchase = {
            event: "purchase",
            ya: uk,
            Ia: "products"
        }, Ak.view_item_list = {
            event: "impressions",
            ya: uk
        }, Ak.select_item = {
            event: "click",
            Ia: "products",
            ya: uk
        }, Ak.view_promotion = {
            event: "promoView",
            Ia: "promotions",
            ya: yk
        }, Ak.select_promotion = {
            event: "promoClick",
            Ia: "promotions",
            ya: yk
        }, Ak);

    function Ck(a, b) {
        var c = {};
        M(function(d) {
            var e = a[d] || sk[d] || d; - 1 !== La(d, "item_category") ? (e = sk.item_category, c[e] = c[e] ? c[e] + ("/" + b[d]) : b[d]) : c[e] = b[d]
        }, bc(b));
        return c
    }

    function Dk(a, b) {
        var c = y(a) ? Bk[a] : a;
        if (c) {
            var d = c.event,
                e = c.Ia,
                f = void 0 === c.Ze ? "items" : c.Ze,
                g = b.purchase || b,
                h = g[f];
            if (h) {
                c = M(F(c.ya, Ck), h);
                h = {};
                var k = {},
                    l = (k[d] = e ? (h[e] = c, h) : c, k);
                c = bc(g);
                e && 1 < c.length && (l[d].actionField = G(function(m, p) {
                    if (p === f) return m;
                    if ("currency" === p) return l.currencyCode = g.currency, m;
                    m[wk[p] || sk[p] || p] = g[p];
                    return m
                }, {}, c));
                return l
            }
        }
    }
    var Ek = W("dl.w", function(a, b, c) {
        function d() {
            var g = J(a, b);
            (e = L(g) && Xi(a, g, c)) || (f = X(a, d, 1E3, "ec.dl"))
        }
        var e, f = 0;
        d();
        return function() {
            return rg(a, f)
        }
    });

    function Fk(a) {
        var b = J(a, "ecommerce");
        if (Ra(b)) return a = mb(rb(zk), bc(b)), a = G(function(c, d) {
            c[d] = b[d];
            return c
        }, {}, a), 0 === bc(a).length ? void 0 : a
    }

    function Gk(a, b, c, d) {
        if (c) {
            var e = J(d, "ecommerce") || {};
            var f = J(d, "event") || "";
            e = Ra(e) && y(f) ? Dk(f, e) : void 0;
            if (!e) a: {
                e = d;!L(d) && Rb(a, db(d)) && (e = Ha(e));
                if (L(e)) {
                    var g = q(e);
                    e = g.next().value;
                    f = g.next().value;
                    g = g.next().value;
                    if (y(f) && Ra(g) && "event" === e) {
                        e = Dk(f, g);
                        break a
                    }
                }
                e = void 0
            }
            if (d = e || Fk(d)) e = {}, Fe(a, (e.counterKey = b, e.name = "ecommerce", e.data = d, e)), a = {}, b = {}, c((b.__ym = (a.ecommerce = [d], a), b))
        }
    }

    function Hk(a, b, c) {
        var d;
        a = [Ek(a, b, function(e) {
            d = e;
            e.oa.F(c)
        }), function() {
            d && d.unsubscribe()
        }];
        return E([Re, a], M)
    }
    var Ik = W("p.e", function(a, b) {
        var c = fi(a, b);
        if (c) {
            var d = Q(a);
            c = c.params;
            var e = V(a, "h.ee", E([a, O(b), c], Gk));
            return b.nd ? (d.D("ecs", 0), Hk(a, b.nd, e)) : Wh(b, function(f) {
                if ((f = J(f, "settings.ecommerce")) && y(f)) return d.D("ecs", 1), Hk(a, f, e)
            })
        }
    });

    function Jk(a, b) {
        var c = [],
            d = H(w, Va("push", c));
        if (A()) {
            var e = (void 0)(b);
            (C(e) || e === a.NodeFilter.FILTER_ACCEPT) && d(b)
        } else d(b);
        if (b.childNodes && 0 < b.childNodes.length) {
            e = b.childNodes;
            for (var f = 0, g = e.length; f < g; f += 1) {
                var h = Jk(a, e[f]);
                M(d, h)
            }
        }
        return c
    }

    function Kk(a, b, c, d, e, f) {
        function g(k) {
            return A(d) ? d(k) ? a.NodeFilter.FILTER_ACCEPT : a.NodeFilter.FILTER_REJECT : a.NodeFilter.FILTER_ACCEPT
        }
        e = void 0 === e ? -1 : e;
        f = void 0 === f ? !1 : f;
        var h = g(b);
        if (A(c) && (f || h === a.NodeFilter.FILTER_ACCEPT) && (h && c(b), !Hf(b)))
            for (b = a.document.createTreeWalker(b, e, d ? {
                    acceptNode: g
                } : null, !1); b.nextNode() && !1 !== c(b.currentNode););
    }

    function Lk(a, b, c) {
        if (b) {
            var d = [];
            b && (a.document.documentElement.contains(b) ? Kk(a, b, Va("push", d)) : Pe(d, Jk(a, b)));
            M(c, d)
        }
    }
    var Mk = x(function(a) {
            a = U(a);
            a = Vd(a.search.substring(1));
            return {
                id: Ub(a["_ym_status-check"] || ""),
                lang: a._ym_lang || "ru"
            }
        }),
        Nk = W("suid.int", function(a, b) {
            var c = {};
            return c.setUserID = function(d, e, f) {
                if (y(d) || Rb(a, d)) {
                    var g = fi(a, b);
                    d = eb(["__ym", "user_id", d]);
                    g.params(d, e || u, f)
                } else Yh(a, O(b)).error("wuid")
            }, c
        }),
        Ok = W("up.int", function(a, b) {
            var c = {};
            return c.userParams = V(a, "up.c", function(d, e, f) {
                    var g = fi(a, b),
                        h = Yh(a, O(b)).warn;
                    g ? Ra(d) ? (h = {}, d = (h.__ymu = d, h), (g = g.params) && g(d, e || u, f)) : h("wup") : h("nci")
                }),
                c
        }),
        Pk = /[\*\.\?\(\)]/g,
        Qk = x(function(a, b, c) {
            try {
                var d = c.replace("\\s", " ").replace(Pk, "");
                b = {};
                Yh(a, "").warn("nnw", (b.name = d, b))
            } catch (e) {}
        }, Da),
        Rk = W("r.nn", function(a) {
            Be(a) && Xi(a, ua, function(b) {
                b.oa.F(function(c) {
                    var d = q(c);
                    c = d.next().value;
                    d = d.next().value;
                    Qk(a, d, c);
                    ua.splice(100)
                })
            })
        }),
        Sk = W("e.a.p", function(a, b) {
            var c = fi(a, b);
            c = E([H(w, ta(!0)), nb(M(F(c, J), ["clickmap", "trackLinks", "accurateTrackBounce"]))], M);
            b.Hg && c();
            var d = {};
            return d.enableAll = c, d
        });

    function Tk(a, b) {
        return {
            V: function(c, d) {
                $g(c) ? d() : Wh(b, function(e) {
                    if (e = J(e, "settings.hittoken")) {
                        var f = {};
                        e = (f.hittoken = e, f);
                        c.H = N(c.H || {}, e)
                    }
                    d()
                })
            }
        }
    }
    var Uk = x(Ce, O),
        Vk = W("fpi", function(a) {
            var b = vd(a);
            if (b && !a.document.hidden) {
                var c = Q(a).ra;
                c("fpe", 1);
                var d = ud(a).F(a, ["visibilitychange", "webkitvisibilitychange"], function() {
                    a.document.hidden && (c("fht", b.now()), d())
                })
            }
        }),
        Wk = x(function(a) {
            a = J(a, "console");
            var b = J(a, "log");
            b = va("log", b) ? D(b, a) : u;
            var c = J(a, "warn");
            c = va("warn", c) ? D(c, a) : b;
            var d = J(a, "error");
            a = va("error", d) ? D(d, a) : b;
            return {
                log: b,
                error: a,
                warn: c
            }
        });

    function Xk(a, b, c) {
        var d = !1,
            e = "";
        if (!Ra(b)) return Zh(c, "", "ecomeo"), d;
        var f = b.goods;
        switch (a) {
            case "detail":
            case "add":
            case "remove":
                L(f) && f.length ? (d = Qb(function(g) {
                    return Ra(g) && (y(g.id) || Rb(c, g.id) || y(g.name))
                }, f)) || (e = "ecomgi") : e = "ecomgei";
                break;
            case "purchase":
                Rb(c, b.id) || y(b.id) ? d = !0 : e = "ecompi"
        }
        Zh(c, "", e);
        return d
    }

    function Yk(a, b, c) {
        return function(d) {
            var e = fi(b, c);
            if (e && Xk(a, d, b) && (e = D(e.params, e), (d = Dk({
                    event: a,
                    Ia: "products",
                    ya: uk,
                    Ze: "goods"
                }, d)) && e)) {
                var f = {},
                    g = {};
                e((g.__ym = (f.ecommerce = [d], f), g))
            }
        }
    }
    var Zk = F("add", Yk),
        $k = F("remove", Yk),
        al = F("detail", Yk),
        bl = F("purchase", Yk),
        cl = "FB_IAB FBAV OKApp GSA/ yandex yango uber EatsKit YKeyboard iOSAppUslugi YangoEats PassportSDK".split(" "),
        dl = x(function(a) {
            var b = yb(a);
            a = b.Wf;
            if (!b.df) return !1;
            b = Va("indexOf", a);
            b = Nb(H(b, ra(-1), Ea), cl);
            var c = /CFNetwork\/[0-9][0-9.]*.*Darwin\/[0-9][0-9.]*/.test(a),
                d = /YaBrowser\/[\d.]+/.test(a),
                e = /Mobile/.test(a);
            return b || c || d && e || !/Safari/.test(a) && e
        }),
        el = x(function(a) {
            var b = Ab(a);
            return b ? Na(b, "YangoEats") || nc(a) : !1
        }),
        fl = /\sYptp\/\d\.(\d+)\s/,
        gl = x(function(a) {
            var b;
            a: {
                if ((b = Ab(a)) && (b = fl.exec(b)) && 1 < b.length) {
                    b = Ub(b[1]);
                    break a
                }
                b = 0
            }
            return 50 <= b && 99 >= b || Gc(a) ? !1 : !Ec(a) || dl(a)
        });

    function hl(a, b, c, d, e, f, g, h) {
        var k = c.C(f);
        C(k) && (c.D(f, g), e(a, b, c, d), k = c.C(f, g));
        B(h) || h.Sb(f, "" + k);
        return k
    }
    var il = [],
        jl = !1,
        kl = !1;

    function ll(a) {
        if (il.length) {
            var b = il.shift();
            kl ? b() : X(a, b, 100)
        } else jl = !1
    }

    function ml(a, b, c, d) {
        c = void 0 === c ? 1 : c;
        d = void 0 === d ? Pd : d;
        kl = Infinity === c;
        return ta(function(e, f) {
            function g() {
                try {
                    var k = b(d(a, c));
                    h = h.concat(k)
                } catch (l) {
                    return e(l)
                }
                b(Kd);
                if (b(Hd)) return f(h), ll(a);
                kl ? (b(d(a, 1E4)), f(h), ll(a)) : X(a, g, 100)
            }
            var h = [];
            jl ? il.push(g) : (jl = !0, g())
        })
    }
    var nl = xa(String.prototype.repeat, "repeat");

    function ol(a, b) {
        for (var c = "", d = 0; d < b; d += 1) c += a;
        return c
    }
    var pl = nl ? function(a, b) {
            return nl.call(a, b)
        } : ol,
        ql = F(!0, function(a, b, c, d) {
            c = b.length && (c - d.length) / b.length;
            if (0 >= c) return d;
            b = pl(b, c);
            return a ? b + d : d + b
        }),
        rl = W("p.cd", function(a) {
            if (qc(a) || ic(a)) {
                var b = Ff(a);
                if (C(b.C("jn"))) {
                    b.D("jn", !1);
                    var c = a.chrome || kc(a) ? function() {} : /./;
                    a = Wk(a);
                    c.toString = function() {
                        b.D("jn", !0);
                        return "Yandex.Metrika counter is initialized"
                    };
                    a.log("%c%s", "color: inherit", c)
                }
            }
        });

    function sl(a, b) {
        return Array.prototype.sort.call(b, a)
    }
    var tl = x(function(a) {
            a = J(a, "navigator.plugins");
            return !!(a && db(a) && Nb(H(cb("name"), Wa(/Chrome PDF Viewer/)), a))
        }),
        ul = pa(function(a, b) {
            return Q(b).C(a, null)
        }),
        vl = ["bl", "mf", "ntq", "rt"],
        wl = {
            "*": "+",
            "-": "/",
            ni: "=",
            "+": "*",
            "/": "-",
            "=": "_"
        };

    function xl(a) {
        return a ? a.replace(/[+/=]/g, function(b) {
            return wl[b] || b
        }) : ""
    }

    function yl(a) {
        var b = "",
            c = 0;
        if (!a) return "";
        for (; a.length % 4;) a += "=";
        do {
            var d = Ma("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", a.charAt(c++)),
                e = Ma("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", a.charAt(c++)),
                f = Ma("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", a.charAt(c++)),
                g = Ma("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", a.charAt(c++));
            if (0 > d || 0 > e || 0 > f || 0 > g) return "";
            var h = d << 18 | e << 12 | f << 6 | g;
            d = h >> 16 & 255;
            e = h >> 8 &
                255;
            h &= 255;
            b = 64 === f ? b + String.fromCharCode(d) : 64 === g ? b + String.fromCharCode(d, e) : b + String.fromCharCode(d, e, h)
        } while (c < a.length);
        return b
    }

    function zl(a, b) {
        b = void 0 === b ? !1 : b;
        for (var c = a.length, d = c - c % 3, e = [], f = 0; f < d; f += 3) {
            var g = (a[f] << 16) + (a[f + 1] << 8) + a[f + 2];
            e.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" [g >> 18 & 63], "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" [g >> 12 & 63], "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" [g >> 6 & 63], "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" [g & 63])
        }
        switch (c - d) {
            case 1:
                c = a[d] << 4;
                e.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" [c >>
                    6 & 63
                ], "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" [c & 63], "=", "=");
                break;
            case 2:
                c = (a[d] << 10) + (a[d + 1] << 2), e.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" [c >> 12 & 63], "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" [c >> 6 & 63], "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" [c & 63], "=")
        }
        e = T("", e);
        return b ? xl(e) : e
    }

    function Al(a) {
        for (var b = "", c = 0; c < a.length;) {
            var d = a.charCodeAt(c);
            128 > d ? (b += String.fromCharCode(d), c++) : 191 < d && 224 > d ? (b += String.fromCharCode((d & 31) << 6 | a.charCodeAt(c + 1) & 63), c += 2) : (b += String.fromCharCode((d & 15) << 12 | (a.charCodeAt(c + 1) & 63) << 6 | a.charCodeAt(c + 2) & 63), c += 3)
        }
        return b
    }

    function Bl(a) {
        for (var b = [], c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c);
            128 > d ? b.push(d) : (127 < d && 2048 > d ? b.push(d >> 6 | 192) : (b.push(d >> 12 | 224), b.push(d >> 6 & 63 | 128)), b.push(d & 63 | 128))
        }
        return b
    }

    function Cl(a) {
        return a ? zl(Bl(a)) : null
    }
    var Dl = x(function(a) {
        return zb(/tizen/i, a)
    });

    function El(a) {
        if (!Dl(a)) return null;
        a = J(a, "webapis.adinfo.getTIFA");
        if (A(a)) try {
            return Cl(a())
        } catch (b) {}
        return null
    }

    function Fl(a) {
        if (!Dl(a)) return null;
        a = J(a, "tizen.systeminfo.getCapability");
        if (A(a)) try {
            return Cl(a("http://tizen.org/system/tizenid"))
        } catch (b) {}
        return null
    }

    function Gl(a) {
        if (!Dl(a)) return null;
        a = J(a, "tizen.systeminfo.getCapabilities");
        try {
            if (A(a)) return Cl(J(a(), "duid"))
        } catch (b) {}
        return null
    }
    var Hl = x(function(a) {
        return zb(/webos|web0s/i, a)
    });

    function Il(a) {
        var b = J(a, "webOS.service.request");
        return A(b) ? new S(function(c) {
            var d = {},
                e = {};
            b("luna://com.webos.service.sm", (e.method = "deviceid/getIDs", e.parameters = (d.idType = ["LGUDID"], d), e.onSuccess = function(f) {
                c(Cl(J(f, "idList.0.idValue")))
            }, e))
        }) : S.resolve(null)
    }
    var Jl = x(function(a) {
        return A(J(a, "yandex.getSiteUid")) ? a.yandex.getSiteUid() : null
    });

    function Kl(a, b) {
        try {
            var c = b.localStorage.getItem(a);
            return c && zl(Bl(c))
        } catch (d) {}
        return null
    }
    var Ll = x(F("panoramaId", Kl)),
        Ml = x(function(a) {
            return Kl("pubcid.org", a) || Kl("_pubCommonId", a)
        }),
        Nl = x(F("_sharedid", Kl)),
        Ol = x(function(a, b) {
            if (b.Ua) return null;
            var c = ze(a, "").C("_ga");
            return c && zl(Bl(c))
        }, H(Da, O)),
        Pl = [
            ["domainLookupEnd", "domainLookupStart"],
            ["connectEnd", "connectStart"],
            ["responseStart", "requestStart"],
            ["responseEnd", "responseStart"],
            ["fetchStart", "navigationStart"],
            ["redirectEnd", "redirectStart"],
            [function(a, b) {
                return J(b, "redirectCount") || J(a, "navigation.redirectCount")
            }],
            ["domInteractive",
                "domLoading"
            ],
            ["domContentLoadedEventEnd", "domContentLoadedEventStart"],
            ["domComplete", "navigationStart"],
            ["loadEventStart", "navigationStart"],
            ["loadEventEnd", "loadEventStart"],
            ["domContentLoadedEventStart", "navigationStart"]
        ],
        Ql = [
            ["domainLookupEnd", "domainLookupStart"],
            ["connectEnd", "connectStart"],
            ["responseStart", "requestStart"],
            ["responseEnd", "responseStart"],
            ["fetchStart"],
            ["redirectEnd", "redirectStart"],
            ["redirectCount"],
            ["domInteractive", "responseEnd"],
            ["domContentLoadedEventEnd", "domContentLoadedEventStart"],
            ["domComplete"],
            ["loadEventStart"],
            ["loadEventEnd", "loadEventStart"],
            ["domContentLoadedEventStart"]
        ],
        Rl = {},
        Sl = (Rl.responseEnd = 1, Rl.domInteractive = 1, Rl.domContentLoadedEventStart = 1, Rl.domContentLoadedEventEnd = 1, Rl.domComplete = 1, Rl.loadEventStart = 1, Rl.loadEventEnd = 1, Rl.unloadEventStart = 1, Rl.unloadEventEnd = 1, Rl.secureConnectionStart = 1, Rl),
        Tl = x(De);

    function Ul(a, b, c) {
        return M(function(d) {
            var e = q(d),
                f = e.next().value;
            e = e.next().value;
            if (A(f)) return f(a, b) || null;
            if (1 === d.length) return b[f] ? Math.round(b[f]) : null;
            var g;
            !(g = b[f] && b[e]) && (g = 0 === b[f] && 0 === b[e]) && (g = q(d), d = g.next().value, g = g.next().value, g = !(Sl[d] || Sl[g]));
            if (!g) return null;
            f = Math.round(b[f]) - Math.round(b[e]);
            return 0 > f || 36E5 < f ? null : f
        }, c)
    }

    function Vl(a, b) {
        var c = a.length ? M(function(d, e) {
            var f = b[e];
            return f === d ? null : f
        }, a) : b;
        a.length = 0;
        M(H(w, Va("push", a)), b);
        return mb(ra(null), c).length === a.length ? null : c
    }

    function Wl(a, b, c) {
        if ((void 0 === c.H ? {} : c.H).nohit) return null;
        a = vd(a);
        if (!a) return null;
        var d = c = null;
        J(a, "getEntriesByType") && (d = J(a.getEntriesByType("navigation"), "0")) && (c = Ql);
        if (!c) {
            var e = J(a, "timing");
            e && (c = Pl, d = e)
        }
        if (!c) return null;
        a = Ul(a, d, c);
        b = O(b);
        b = Tl(b);
        return (b = Vl(b, a)) && T(",", b)
    }
    var Xl = x(Ce),
        Yl = x(function(a) {
            var b = J(a, "webkitRequestFileSystem");
            if (A(b) && !qc(a)) return (new S(D(b, a, 0, 0))).then(function() {
                var d = J(a, "navigator.storage") || {};
                return d.estimate ? d.estimate() : {}
            }).then(function(d) {
                return (d = d.quota) && 12E7 > d ? !0 : !1
            })["catch"](F(!0, w));
            if (Cb(a)) return b = J(a, "navigator.serviceWorker"), S.resolve(B(b));
            b = J(a, "openDatabase");
            if (kc(a) && A(b)) {
                var c = !1;
                try {
                    b(null, null, null, null)
                } catch (d) {
                    c = !0
                }
                return S.resolve(c)
            }
            return S.resolve(!J(a, "indexedDB") && (J(a, "PointerEvent") || J(a, "MSPointerEvent")))
        });

    function Zl(a) {
        if (nc(a)) return null;
        var b = Xl(a),
            c = b.rf;
        B(c) && (b.rf = null, Yl(a).then(function(d) {
            b.rf = d
        }));
        return c ? 1 : null
    }
    var $l = /(\?|&)turbo_uid=([\w\d]+)($|&)/,
        am = x(function(a, b) {
            var c = Ae(a),
                d = U(a).search.match($l);
            return d && 2 <= d.length ? (d = q(d), d.next(), d.next(), d = d.next().value, b.Ua || c.D("turbo_uid", d), d) : (c = c.C("turbo_uid")) ? c : ""
        }),
        bm = [
            [
                ["'(-$&$&$'", 30102, 0],
                ["'(-$&$&$'", 29009, 0]
            ],
            [
                ["oWdZ[nc[jh_YW$Yec", 30103, 1],
                ["oWdZ[nc[jh_YW$Yec", 29010, 1]
            ]
        ],
        cm = [
            [
                ["oWdZ[nc[jh_YW$Yec", 30103, 1]
            ],
            [
                ["oWdZ[nc[jh_YW$Yec", 29010, 1]
            ]
        ],
        dm = {
            H: {
                t: 'UV|L7,!"T[rwe&D_>ZIb\\aW#98Y.PC6k'
            }
        },
        em = {
            Of: 60,
            error: 15
        },
        fm = {
            Of: 5,
            error: 1
        },
        gm = {
            id: 42822899,
            ca: "0"
        },
        hm = W("pa.plgn", function(a, b) {
            var c = Ui(a, b);
            c && c.Z.F(["pluginInfo"], V(a, "c.plgn", function() {
                var d = Q(a);
                d.D("cmc", d.C("cmc", 0) + 1);
                return We(b)
            }))
        }),
        im = {},
        jm = (im.am = "com.am", im.tr = "com.tr", im.ge = "com.ge", im.il = "co.il", im["\u0440\u0444"] = "ru", im["xn--p1ai"] = "ru", im["\u0431\u0435\u043b"] = "by", im["xn--90ais"] = "by", im),
        km = {
            "mc.edadeal.ru": /^([^/]+\.)?edadeal\.ru$/,
            "mc.yandexsport.ru": /^([^/]+\.)?yandexsport\.ru$/,
            "mc.kinopoisk.ru": /^([^/]+\.)?kinopoisk\.ru$/
        },
        lm = {},
        mm = (lm.ka = "ge", lm.ro = "md", lm.tg = "tj", lm.tk =
            "tm", lm.et = "ee", lm.hy = "com.am", lm.he = "co.li", lm.ky = "kg", lm.be = "by", lm.tr = "com.tr", lm.kk = "kz", lm);

    function nm(a, b) {
        var c = sl(function(d, e) {
            return d[1].da > e[1].da ? 1 : -1
        }, ac(Qc));
        c = M(function(d) {
            var e = q(d);
            d = e.next().value;
            var f = e.next().value.Va;
            e = I(b, d) && !C(b[d]);
            d = b[d] !== (f || w)(void 0);
            return ib(e && d)
        }, c);
        return Vb(T("", c))
    }
    var om = /^https?:\/\//,
        pm = {
            1882689622: 1,
            2318205080: 1,
            3115871109: 1,
            3604875100: 1,
            339366994: 1,
            849340123: 1,
            3735661796: 1,
            3082499531: 1,
            2343947156: 1,
            655012937: 1,
            3724710748: 1,
            3364370932: 1,
            1996539654: 1,
            2065498185: 1,
            823651274: 1,
            12282461: 1,
            1555719328: 1,
            1417229093: 1,
            138396985: 1,
            3015043526: 1
        },
        qm = x(function() {
            return G(function(a, b) {
                a[Yj(b + "/tag.js")] = 1;
                return a
            }, {}, ["mc.yandex.ru/metrika", "mc.yandex.com/metrika", "cdn.jsdelivr.net/npm/yandex-metrica-watch"])
        }),
        rm = x(function(a) {
            a = vd(a);
            if (!a || !A(a.getEntriesByType)) return null;
            a = a.getEntriesByType("resource");
            var b = qm();
            return (a = Je(function(c) {
                c = q(c.name.replace(om, "").split("?")).next().value;
                return b[Yj(c)]
            }, a)) ? ib(a.transferSize) : null
        }),
        sm = "ar:1:pv:1:v:" + Mc.eb + ":vf:" + na.version,
        tm = Mc.La + "//" + Kc + "/watch/" + Mc.Zf;

    function um(a, b) {
        try {
            var c = q(b),
                d = q(c.next().value);
            d.next();
            var e = d.next().value
        } catch (f) {
            return function() {
                return S.resolve()
            }
        }
        return function(f) {
            var g = {};
            g = (g["browser-info"] = sm, g["page-url"] = a.location && "" + a.location.href, g);
            return e && (f = yf(a, f)) ? e(tm, {
                ab: g,
                ea: [],
                ba: "site-info=" + Td(f)
            })["catch"](u) : S.resolve()
        }
    }
    var vm = {},
        wm = W("exps.int", function(a, b) {
            var c = {};
            return c.experiments = function(d, e, f) {
                if (y(d) && !(0 >= d.length)) {
                    var g = Rh(a, "e", b),
                        h = Oi(b).url,
                        k = {},
                        l = {};
                    d = g({
                        K: Le((k.ex = 1, k.ar = 1, k)),
                        H: (l["page-url"] = h || U(a).href, l.exp = d, l)
                    }, b);
                    return Ni(a, "exps.s", d, e || u, f)
                }
            }, c
        }),
        xm = [],
        zm = W("p.fh", function(a, b) {
            b = void 0 === b ? !0 : b;
            var c = Ff(a),
                d = Ed(a),
                e = c.C("wasSynced"),
                f = {
                    id: 3,
                    ca: "0"
                };
            if (b && e && e.time + 864E5 > d(Ad)) return S.resolve(e);
            e = {};
            var g = {};
            return Rh(a, "f", f)({
                K: Le((e.pv = 1, e)),
                H: (g["page-url"] = U(a).href, g["page-ref"] =
                    a.document.referrer, g)
            }, f).then(function(h) {
                var k = {};
                h = (k.time = d(Ad), k.params = J(h, "settings"), k.bkParams = J(h, "userData"), k);
                c.D("wasSynced", h);
                return h
            })["catch"](V(a, "f.h"))
        }),
        Am = pa(function(a, b) {
            0 === parseFloat(J(b, "settings.c_recp")) && (a.Rd.D("ymoo" + a.ta, a.Sf(Bd)), a.jd && a.jd.destruct && a.jd.destruct())
        }),
        Bm = H(cb("settings.pcs"), ra("1"));

    function Cm(a, b, c) {
        var d = b || {},
            e = Rh(a, "u", c),
            f = Ff(a);
        return {
            C: function(g, h) {
                return B(d[g]) ? f.C(g, h) : d[g]
            },
            D: function(g, h) {
                var k = "" + h;
                d[g] = k;
                f.D(g, k);
                var l = {};
                return e({
                    H: (l.key = g, l.value = k, l)
                }, [Mc.La + "//" + Kc + "/user_storage_set"], {})["catch"](V(a, "u.d.s.s"))
            }
        }
    }
    var Dm = x(function(a) {
            a = U(a).hostname.split(".");
            return a[a.length - 1]
        }),
        Em = x(function(a) {
            return -1 !== U(a).hostname.search(/(?:^|\.)(?:ya|yandex|beru|kinopoisk|edadeal)\.(?:\w+|com?\.\w+)$/)
        }),
        Fm = RegExp("^(.*\\.)?((yandex(-team)?)\\.(com?\\.)?[a-z]+|(auto|kinopoisk|beru|bringly)\\.ru|ya\\.(ru|cc)|yadi\\.sk|yastatic\\.net|.*\\.yandex|turbopages\\.org|turbo\\.site|diplodoc\\.(com|tech)|datalens\\.tech|white-label\\.yango-tech\\.com|al-sadhan\\.com|spar\\.sa)$"),
        Gm = x(function(a) {
            a = U(a).hostname;
            var b = !1;
            a && (b = -1 !== a.search(Fm));
            return b
        }),
        Hm = RegExp("^(.*\\.)?((yandex(-team)?)\\.(com?\\.)?[a-z]+|(auto|kinopoisk|beru|bringly)\\.ru|ya\\.(ru|cc)|yadi\\.sk|.*\\.yandex|turbopages\\.org|turbo\\.site)$"),
        Im = x(function(a) {
            a = U(a).hostname;
            var b = !1;
            a && (b = -1 !== a.search(Hm));
            return b
        }),
        Jm = {},
        Km = (Jm.s = "p", Jm["8"] = "i", Jm),
        Lm = Yd("csp", function(a, b) {
            return Rh(a, "s", b)({}, ["https://yutovo.ru/cors/ymetrica1.com/watch/3/1"])
        });

    function Mm(a, b, c) {
        var d = c.fe,
            e = c.data,
            f = Rh(a, d, c.fb);
        a = N({}, dm);
        e && N(a.H, e);
        return xg(M(function(g) {
            return zg(f(N({
                N: {
                    Vc: !1,
                    Mc: !0
                }
            }, dm), M(function(h) {
                var k = q(h),
                    l = k.next().value;
                h = k.next().value;
                k = k.next().value;
                l = T("", M(function(m) {
                    return String.fromCharCode(m.charCodeAt(0) + 10)
                }, l.split("")));
                return "http" + (k ? "s" : "") + "://" + l + ":" + h + "/" + Km[d]
            }, g)).then(function(h) {
                return N({}, h, {
                    host: g[h.Ae]
                })
            }))
        }, b))
    }

    function Nm(a, b, c, d, e, f) {
        var g = f.Pd,
            h = f.fb,
            k = f.wb;
        return new S(function(l, m) {
            var p = c.C(g, 0);
            p = parseInt("" + p, 10);
            return b(Bd) - p <= e.Of ? (k(3), m()) : Im(a) ? l(void 0) : Bm(d) ? (k(4), m()) : l(Lm(a, h)["catch"](H(sa(F(5, k)), md)))
        })
    }

    function Om(a, b, c, d, e) {
        var f = void 0 === e.Pf ? u : e.Pf,
            g = e.Pd,
            h = void 0 === e.wb ? u : e.wb,
            k = d(Ad);
        return Mm(a, b, e)(ug(function(l) {
            h(6);
            M(function(m) {
                m && mf(a, g + ".s", m)
            }, l);
            l = d(Bd);
            c.D(g, l).then(F(7, h))
        }, function(l) {
            h(8);
            c.D(g, d(Bd)).then(F(9, h));
            f(l, d, k)
        }))
    }

    function Pm(a) {
        var b = qc(a);
        a = H(jc, rb(["iPhone", "iPad"]))(a);
        return b ? bm : a ? cm : []
    }

    function Qm(a, b, c) {
        var d = c.fb,
            e = void 0 === c.wb ? u : c.wb,
            f = Ed(a),
            g = Cm(a, b.userData, d),
            h = Pm(a),
            k = H(fe, E([fm, em], gb))(a),
            l = J(b, "settings.sbp");
        c.wb = e;
        if (l) {
            var m = {};
            c.data = N({}, l, (m.c = d.id, m))
        }
        return h.length ? Nm(a, f, g, b, k, c).then(function() {
            return Om(a, h, g, f, c)
        }, u) : (e(2), S.resolve())
    }

    function Rm(a, b) {
        this.l = a;
        this.type = b
    }
    Rm.isEnabled = function(a) {
        return !!a.JSON
    };
    Rm.prototype.Aa = function(a) {
        return Ag(yf(this.l, a))
    };
    Rm.prototype.ub = function(a) {
        var b = a.data;
        return "string" === typeof b ? b : yf(this.l, a.data)
    };
    Rm.prototype.lb = function(a) {
        return encodeURIComponent(a).length
    };
    Rm.prototype.ne = function(a, b) {
        for (var c = Math.ceil(a.length / b), d = [], e = 0; e < b; e += 1) d.push(a.slice(e * c, c * (e + 1)));
        return d
    };

    function Sm(a) {
        if (!a) return [0, 0];
        var b = 0 > a;
        b && (a = -a);
        var c = a >>> 0;
        a = (a - c) / 4294967296 >>> 0;
        b && (a = ~a >>> 0, c = ~c >>> 0, 4294967295 < ++c && (c = 0, 4294967295 < ++a && (a = 0)));
        return [a, c]
    }

    function Tm(a, b, c, d) {
        b = q(b);
        a = b.next().value;
        for (b = b.next().value; a;) c[d++] = b & 127 | 128, b = (b >>> 7 | a << 25) >>> 0, a >>>= 7;
        for (; 127 < b;) c[d++] = b & 127 | 128, b >>>= 7;
        c[d++] = b
    }

    function Um(a, b, c) {
        b[c] = a & 255;
        b[c + 1] = a >>> 8 & 255;
        b[c + 2] = a >>> 16 & 255;
        b[c + 3] = a >>> 24
    }

    function Vm(a, b, c, d) {
        var e = 0 > b ? 1 : 0;
        e && (b = -b);
        if (0 === b) Um(0 < 1 / b ? 0 : 2147483648, c, d);
        else if (a.isNaN(b)) Um(2143289344, c, d);
        else if (3.4028234663852886E38 < b) Um((e << 31 | 2139095040) >>> 0, c, d);
        else if (1.1754943508222875E-38 > b) Um((e << 31 | a.Math.round(b / 1.401298464324817E-45)) >>> 0, c, d);
        else {
            var f = a.Math.floor(a.Math.log(b) / Math.LN2);
            Um((e << 31 | f + 127 << 23 | Math.round(b * a.Math.pow(2, -f) * 8388608) & 8388607) >>> 0, c, d)
        }
    }
    var Wm = x(function(a) {
        function b(f, g, h, k) {
            d[0] = g;
            h[k] = e[3];
            h[k + 1] = e[2];
            h[k + 2] = e[1];
            h[k + 3] = e[0]
        }

        function c(f, g, h, k) {
            d[0] = g;
            h[k] = e[0];
            h[k + 1] = e[1];
            h[k + 2] = e[2];
            h[k + 3] = e[3]
        }
        if ("undefined" === typeof a.Float32Array || "undefined" === typeof a.Uint8Array) return Vm;
        var d = new Float32Array([-0]),
            e = new Uint8Array(d.buffer);
        return 128 === e[3] ? c : b
    });

    function Xm(a, b, c, d) {
        return Wm(a)(a, b, c, d)
    }

    function Ym(a) {
        return function(b, c, d, e) {
            for (var f, g = 0, h = 0; h < c.length; ++h)
                if (b = c.charCodeAt(h), 128 > b) a ? g += 1 : d[e++] = b;
                else {
                    if (2048 > b) {
                        if (a) {
                            g += 2;
                            continue
                        }
                        d[e++] = b >> 6 | 192
                    } else {
                        if (55296 === (b & 64512) && 56320 === ((f = c.charCodeAt(h + 1)) & 64512)) {
                            if (a) {
                                g += 4;
                                continue
                            }
                            b = 65536 + ((b & 1023) << 10) + (f & 1023);
                            ++h;
                            d[e++] = b >> 18 | 240;
                            d[e++] = b >> 12 & 63 | 128
                        } else {
                            if (a) {
                                g += 3;
                                continue
                            }
                            d[e++] = b >> 12 | 224
                        }
                        d[e++] = b >> 6 & 63 | 128
                    }
                    d[e++] = b & 63 | 128
                } return a ? g : e
        }
    }
    var Zm = Ym(!1),
        $m = Ym(!0);

    function an(a, b, c, d) {
        for (a = 0; a < b.length; ++a) c[d + a] = b[a]
    }

    function bn(a, b, c, d) {
        c[d] = b
    }

    function cn(a, b, c, d) {
        for (a = b; 127 < a;) c[d++] = a & 127 | 128, a >>>= 7;
        c[d] = a
    }

    function dn(a) {
        return [cn, 128 > a ? 1 : 16384 > a ? 2 : 2097152 > a ? 3 : 268435456 > a ? 4 : 5, a]
    }

    function en(a) {
        return 0 > a ? [Tm, 10, Sm(a)] : dn(a)
    }

    function fn(a) {
        return [Xm, 4, a]
    }

    function gn(a) {
        a = Sm(a);
        var b = q(a),
            c = b.next().value;
        b = b.next().value;
        var d = (b >>> 28 | c << 4) >>> 0;
        c >>>= 24;
        return [Tm, 0 === c ? 0 === d ? 16384 > b ? 128 > b ? 1 : 2 : 2097152 > b ? 3 : 4 : 16384 > d ? 128 > d ? 5 : 6 : 2097152 > d ? 7 : 8 : 128 > c ? 9 : 10, a]
    }

    function hn(a) {
        return [bn, 1, a ? 1 : 0]
    }

    function jn(a) {
        return [an, a.length, a]
    }

    function kn(a) {
        var b = $m({}, a, [], 0);
        return b ? [Zm, b, a] : [bn, 0, 0]
    }

    function ln(a) {
        return [
            [513, a.hidden, hn],
            [449, a.prev, dn],
            [385, a.next, dn],
            [337, a.content, kn],
            [257, a.parent, dn],
            [210, a.attributes, 81, kn, 145, kn],
            [145, a.name, kn],
            [65, a.id, dn]
        ]
    }

    function mn(a) {
        return [
            [129, a.height, en],
            [65, a.width, en]
        ]
    }

    function nn(a) {
        return [
            [209, a.path, kn],
            [145, a.protocol, kn],
            [81, a.host, kn]
        ]
    }

    function on(a) {
        return [
            [852, a.content, ln],
            [785, a.tabId, kn],
            [705, a.recordStamp, gn],
            [656, a.location, nn],
            [592, a.viewport, mn],
            [528, a.screen, mn],
            [449, a.hasBase, hn],
            [401, a.base, kn],
            [337, a.referrer, kn],
            [273, a.ua, kn],
            [209, a.address, kn],
            [145, a.title, kn],
            [81, a.doctype, kn]
        ]
    }

    function pn(a) {
        return [
            [210, a.attributes, 81, kn, 145, kn],
            [129, a.index, dn],
            [65, a.target, dn]
        ]
    }

    function qn(a) {
        return [
            [129, a.index, dn],
            [84, a.nodes, ln]
        ]
    }

    function rn(a) {
        return [
            [129, a.index, dn],
            [69, a.nodes, en]
        ]
    }

    function sn(a) {
        return [
            [209, a.value, kn],
            [129, a.index, dn],
            [65, a.target, dn]
        ]
    }

    function tn(a) {
        return [
            [193, a.index, dn],
            [145, a.op, kn],
            [81, a.style, kn]
        ]
    }

    function un(a) {
        return [
            [148, a.changes, tn],
            [65, a.target, en]
        ]
    }

    function vn(a) {
        return [
            [193, a.target, en],
            [129, a.y, dn],
            [65, a.x, dn]
        ]
    }

    function wn(a) {
        return [
            [257, a.target, en],
            [193, a.page, hn],
            [129, a.y, en],
            [65, a.x, en]
        ]
    }

    function xn(a) {
        return [
            [133, a.xi, en],
            [65, a.Ug, en]
        ]
    }

    function yn(a) {
        return [
            [257, a.endNode, dn],
            [193, a.startNode, dn],
            [129, a.end, en],
            [65, a.start, en]
        ]
    }

    function zn(a) {
        return [
            [257, a.target, en],
            [193, a.hidden, hn],
            [129, a.checked, hn],
            [81, a.value, kn]
        ]
    }

    function An(a) {
        return [
            [297, a.force, fn],
            [233, a.y, fn],
            [169, a.x, fn],
            [81, a.id, kn]
        ]
    }

    function Bn(a) {
        return [
            [129, a.target, en],
            [84, a.touches, An]
        ]
    }

    function Cn(a) {
        return [
            [193, a.y, en],
            [129, a.x, en],
            [105, a.level, fn]
        ]
    }

    function Dn(a) {
        return [
            [257, a.pageHeight, dn],
            [193, a.pageWidth, dn],
            [129, a.height, dn],
            [65, a.width, dn]
        ]
    }

    function En(a) {
        return [
            [273, a.modifier, kn],
            [193, a.isMeta, hn],
            [145, a.key, kn],
            [65, a.id, dn]
        ]
    }

    function Fn(a) {
        return [
            [84, a.keystrokes, En]
        ]
    }

    function Gn(a) {
        return [
            [193, a.orientation, en],
            [129, a.height, dn],
            [65, a.width, dn]
        ]
    }

    function Hn(a) {
        return [
            [209, a.stack, kn],
            [145, a.Lg, kn],
            [81, a.code, kn]
        ]
    }

    function In(a) {
        return [
            [65, a.target, en]
        ]
    }

    function Jn(a) {
        return [
            [257, a.Mi, en],
            [209, a.name, kn],
            [129, a.Ug, en],
            [65, a.vi, en]
        ]
    }

    function Kn(a) {
        return [
            [129, a.involvedTime, en],
            [84, a.articleMeta, Ln]
        ]
    }

    function Ln(a) {
        return [
            [513, a.chars, en],
            [489, a.maxScrolled, fn],
            [385, a.involvedTime, en],
            [321, a.height, en],
            [257, a.width, en],
            [193, a.y, en],
            [129, a.x, en],
            [65, a.id, dn]
        ]
    }

    function Mn(a) {
        return [
            [593, a.updateDate, kn],
            [532, a.rubric, Nn],
            [449, a.chars, en],
            [401, a.publicationDate, kn],
            [340, a.topics, On],
            [276, a.authors, Pn],
            [209, a.pageTitle, kn],
            [145, a.pageUrlCanonical, kn],
            [65, a.id, dn]
        ]
    }

    function Pn(a) {
        return [
            [81, a.name, kn]
        ]
    }

    function On(a) {
        return [
            [81, a.name, kn]
        ]
    }

    function Nn(a) {
        return [
            [129, a.position, en],
            [81, a.name, kn]
        ]
    }

    function Qn(a) {
        return [
            [84, a.Ih, Rn]
        ]
    }

    function Rn(a) {
        return [
            [1857, a.partsTotal, dn],
            [2E3, a.yi, Jn],
            [1936, a.Oi, xn],
            [1793, a.activity, dn],
            [1744, a.textChangeMutation, sn],
            [1680, a.removedNodesMutation, rn],
            [1616, a.addedNodesMutation, qn],
            [1552, a.attributesChangeMutation, pn],
            [1488, a.publishersHeader, Kn],
            [1424, a.articleInfo, Mn],
            [1360, a.focusEvent, In],
            [1296, a.fatalErrorEvent, Hn],
            [1232, a.deviceRotationEvent, Gn],
            [1168, a.keystrokesEvent, Fn],
            [1104, a.resizeEvent, Dn],
            [1040, a.zoomEvent, Cn],
            [976, a.touchEvent, Bn],
            [912, a.changeEvent, zn],
            [848, a.selectionEvent,
                yn
            ],
            [784, a.scrollEvent, wn],
            [720, a.mouseEvent, vn],
            [656, a.styleChangeEvent, un],
            [592, a.page, on],
            [513, a.end, hn],
            [449, a.partNum, dn],
            [401, a.chunk, jn],
            [257, a.frameId, en],
            [193, a.event, dn],
            [129, a.type, dn],
            [65, a.stamp, dn]
        ]
    }
    var Sn = {},
        Tn = (Sn.mousemove = 0, Sn.mouseup = 1, Sn.mousedown = 2, Sn.click = 3, Sn.scroll = 4, Sn.windowblur = 5, Sn.windowfocus = 6, Sn.focus = 7, Sn.blur = 8, Sn.eof = 9, Sn.selection = 10, Sn.change = 11, Sn.input = 12, Sn.touchmove = 13, Sn.touchstart = 14, Sn.touchend = 15, Sn.touchcancel = 16, Sn.touchforcechange = 17, Sn.zoom = 18, Sn.resize = 19, Sn.keystroke = 20, Sn.deviceRotation = 21, Sn.fatalError = 22, Sn.hashchange = 23, Sn.stylechange = 24, Sn.articleInfo = 25, Sn.publishersHeader = 26, Sn.pageData = 27, Sn.mutationAdd = 28, Sn.mutationRemove = 29, Sn.mutationTextChange =
            30, Sn.mutationAttributesChange = 31, Sn.formNodeData = 32, Sn.submit = 33, Sn),
        Un = {},
        Vn = (Un.page = 0, Un.event = 1, Un.mutation = 2, Un.publishers = 3, Un.activity = 4, Un.formNode = 5, Un);

    function Wn(a, b) {
        a[0] += b[1];
        a[2][3] = b;
        a[2] = b
    }

    function Xn(a) {
        a[3] = [a[0], a[1], a[2], a[3]];
        a[1] = [u, 0, 0];
        a[2] = a[1];
        a[0] = 0
    }

    function Yn(a) {
        var b = a[1],
            c = a[0],
            d = a[2];
        a[3] ? (a[0] = a[3][0], a[1] = a[3][1], a[2] = a[3][2], a[3] = a[3][3]) : (a[0] = 0, a[1] = [u, 0, 0], a[2] = a[1]);
        Wn(a, dn(c));
        c && (a[2][3] = b[3], a[2] = d, a[0] += c)
    }

    function Zn(a, b) {
        var c = a(b),
            d = [u, 0, 0],
            e = [0, d, d, void 0];
        return Rd(c, function(f, g) {
            var h = q(f),
                k = h.next().value,
                l = h.next().value,
                m = h.next().value;
            if (0 === k) return m(e, l), e;
            if (void 0 === l || null === l) return e;
            h = k >> 3;
            if (k & 4)
                for (var p = l.length - 1; 0 <= p;) {
                    var r = l[p];
                    k & 1 ? Pe(g, [
                        [k - 4, r, m]
                    ]) : (r = m(r), r.push([0, 0, Xn]), r.push([0, dn(h), Wn]), r.unshift([0, 0, Yn]), Pe(g, r));
                    --p
                } else if (k & 1) Wn(e, dn(h)), l = m(l), h & 2 && Wn(e, dn(l[1])), Wn(e, l);
                else if (k & 2) {
                r = q(f);
                r.next();
                r.next();
                k = r.next().value;
                m = r.next().value;
                p = r.next().value;
                r = r.next().value;
                for (var t = bc(l), v = t.length - 1; 0 <= v;) {
                    var z = t[v];
                    Pe(g, [
                        [0, 0, Yn],
                        [p, l[z], r],
                        [k, z, m],
                        [0, 0, Xn],
                        [0, dn(h), Wn]
                    ]);
                    --v
                }
            } else l = m(l), l.push([0, 0, Xn]), l.push([0, dn(h), Wn]), l.unshift([0, 0, Yn]), Pe(g, l);
            return e
        })
    }

    function $n(a, b) {
        var c = b[1][3],
            d = 0,
            e = new a.Uint8Array(b[0]);
        return Rd([c], function(f, g) {
            if (!f) return e;
            f[0](a, f[2], e, d);
            d += f[1];
            g.push(f[3]);
            return e
        })
    }

    function ao(a, b) {
        var c = this;
        this.isSync = !1;
        this.Eb = [];
        var d = {};
        this.Jg = (d.ad = "mutationAdd", d.re = "mutationRemove", d.tc = "mutationTextChange", d.ac = "mutationAttributesChange", d.page = "pageData", d);
        d = {};
        this.Dg = (d.ad = "addedNodesMutation", d.re = "removedNodesMutation", d.tc = "textChangeMutation", d.ac = "attributesChangeMutation", d.touchmove = "touchEvent", d.touchstart = "touchEvent", d.touchend = "touchEvent", d.touchforcechange = "touchEvent", d.touchcancel = "touchEvent", d.resize = "resizeEvent", d.scroll = "scrollEvent", d.change =
            "changeEvent", d.mousemove = "mouseEvent", d.mousedown = "mouseEvent", d.mouseup = "mouseEvent", d.click = "mouseEvent", d.focus = "focusEvent", d.blur = "focusEvent", d.deviceRotation = "deviceRotationEvent", d.zoom = "zoomEvent", d.keystroke = "keystrokesEvent", d.selection = "selectionEvent", d.stylechange = "styleChangeEvent", d.fatalError = "fatalErrorEvent", d.pageData = "page", d);
        this.Yg = function(e) {
            var f = e.type;
            return e.event || "publishersHeader" !== f && "articleInfo" !== f ? {
                type: Vn[f],
                event: Tn[c.Jg[e.event] || e.event]
            } : {
                type: Vn.publishers,
                event: Tn[f]
            }
        };
        this.kf = function(e) {
            var f = !B(e.partNum),
                g = c.Yg(e);
            g = {
                stamp: e.stamp,
                type: g.type,
                event: g.event,
                frameId: e.frameId,
                chunk: f ? e.data : void 0,
                partNum: e.partNum,
                end: e.end
            };
            !f && e.data && (f = c.Dg[e.event] || e.event || e.type) && (g[f] = e.data);
            return g
        };
        this.l = a;
        this.type = b
    }
    ao.prototype.Aa = function(a, b) {
        var c = this,
            d = this.isSync || (void 0 === b ? 0 : b) ? Infinity : 10,
            e = ml(this.l, Rd(a, this.kf), d),
            f = [e];
        this.Eb.push(e);
        return e(wg(function(g) {
            g = Zn(Qn, {
                Ih: g
            });
            g = ml(c.l, g, d, Od);
            f.push(g);
            c.Eb.push(g);
            return g
        }))(wg(function(g) {
            g = $n(c.l, g.slice(-4));
            g = ml(c.l, g, d, Od);
            f.push(g);
            c.Eb.push(g);
            return g
        }))(vg(function(g) {
            g = g[g.length - 1];
            M(function(h) {
                h = vb(c.l)(h, c.Eb);
                c.Eb.splice(h, 1)
            }, f);
            return g
        }))
    };
    ao.prototype.ub = function(a) {
        return Zn(Rn, this.kf(a))(Nd(u))
    };
    ao.prototype.lb = function(a) {
        return a[0]
    };
    ao.prototype.ne = function(a, b) {
        for (var c = $n(this.l, a)(Nd(u)), d = Math.ceil(c.length / b), e = [], f = 0; f < b; f += 1) e.push(c.slice(f * d, d * (f + 1)));
        return e
    };
    ao.isEnabled = function(a) {
        var b = Be(a),
            c = !1;
        try {
            c = (c = 2 === (new a.Blob(["\u00e4"])).size) && 2 === (new a.Blob([new a.Uint8Array([1, 2])])).size
        } catch (d) {}
        return !b && c && !(!a.Uint8Array || !J(a, "Uint8Array.prototype.slice"))
    };

    function bo(a, b, c) {
        if (ao.isEnabled(a)) return new ao(a, b);
        if (Rm.isEnabled(a)) return new Rm(a, c)
    }
    var co = df("wv");

    function eo(a, b, c, d) {
        var e = c.H;
        e.wmode = "0";
        e["wv-hit"] = e["wv-hit"] || "" + lg(a);
        e["page-url"] = e["page-url"] || U(a).href;
        d && (e[d] = e[d] || "" + Xd(a));
        a = {};
        b = {
            Ja: {
                qa: "webvisor/" + b.id
            },
            N: N(c.N || {}, {
                $a: (a["Content-Type"] = "text/plain", a),
                Uc: "POST"
            }),
            H: e
        };
        N(c, b)
    }

    function fo(a, b) {
        return {
            V: function(c, d) {
                eo(a, b, c);
                d()
            }
        }
    }
    var go = "resize scroll mousemove mousedown click windowfocus keydown orientationchange change focus touchmove touchstart".split(" "),
        ho = "id pageTitle stamp chars authors updateDate publicationDate pageUrlCanonical topics rubric".split(" ");

    function io(a, b, c, d, e) {
        var f = this;
        this.wc = !1;
        this.meta = {};
        this.scroll = {
            x: 0,
            y: 0
        };
        this.involvedTime = this.hf = 0;
        this.Td = this.qf = "";
        this.fa = [];
        this.le = this.Pa = 0;
        this.yb = {
            h: 0,
            w: 0
        };
        this.buffer = [];
        this.$f = ho;
        this.flush = function() {
            f.le = X(f.l, f.flush, 2500);
            var g = f.yd();
            if (f.buffer.length || g) {
                var h = xb(f.buffer);
                g && h.push(g);
                f.qf = f.Td;
                f.ja.Aa(h)(ug(V(f.l, "p.b.st"), function(k) {
                    k && f.Rb(k)
                }))
            }
        };
        this.Rb = d;
        this.ja = c;
        this.Yb = D(this.Yb, this);
        this.yd = D(this.yd, this);
        this.flush = D(this.flush, this);
        this.l = a;
        this.ta = e;
        this.Nc =
            b;
        this.Nd = "pai" + b.id;
        this.Jb();
        this.Pe = ud(this.l);
        this.time = Ed(this.l);
        jo(this);
        this.Ad = Q(this.l);
        this.ze = null
    }
    n = io.prototype;
    n.start = function() {
        this.le = X(this.l, this.flush, 2500);
        if (!this.wc) {
            this.Pe.F(this.l, go, this.Yb);
            var a = this.Ad.C(this.Nd, []),
                b = !a.length;
            a.push(D(this.oh, this));
            this.Ad.ra(this.Nd, a);
            b && this.zf();
            this.ze = ud(this.l).F(this.l, ["click"], D(this.Ph, this));
            this.Yb({
                type: "page",
                target: this.l
            })
        }
    };
    n.stop = function() {
        this.ze && this.ze();
        this.Pe.Wb(this.l, go, this.Yb);
        this.wc = !0;
        this.flush();
        rg(this.l, this.le)
    };
    n.zf = function() {
        var a = this;
        V(this.l, "p.ic" + this.Nc.id, function() {
            if (!a.wc) {
                var b = a.Ad.C(a.Nd),
                    c = ko(a.Nc);
                M(function(d) {
                    var e = M(function(f) {
                        return N({}, f)
                    }, c);
                    A(d) && d(e)
                }, b);
                a.Pa = X(a.l, D(a.zf, a), 1E3, "p")
            }
        })()
    };
    n.oh = function(a) {
        this.wc || (lo(this, a), mo(this), no(this))
    };
    n.wg = function(a, b) {
        return (a.ie || 0) <= (b.ie || 0) ? b : a
    };
    n.Ph = function(a) {
        if (this.fa.length) {
            a = kj(a);
            var b = U(this.l).hostname;
            a && ee(a.hostname) === ee(b) && (a = G(this.wg, this.fa[0], this.fa).id, b = lg(this.l), Gf(this.l, this.ta.split(":")[0]).D("pai", a + "-" + b))
        }
    };
    n.Yb = function(a) {
        var b = this;
        V(this.l, "p.ec." + this.Nc.id, function() {
            try {
                var c = a.type;
                var d = a.target
            } catch (k) {
                return
            }
            var e = "page" === c;
            if ("scroll" === c || e) {
                var f = [b.l, b.l.document, b.l.document.documentElement, Qf(b.l)];
                K(d, f) && b.Jb()
            }("resize" === c || e) && jo(b);
            c = b.time(Ad);
            var g = Math.min(c - b.hf, 5E3);
            b.involvedTime += Math.round(g);
            b.hf = c;
            if (b.meta && b.scroll && b.yb) {
                var h = b.yb.h * b.yb.w;
                b.fa = M(function(k) {
                    var l = N({}, k),
                        m = b.meta[l.id],
                        p = Vf(k.Db);
                    if (!m || Ej("html", b.l, l.element) !== b.l.document.documentElement ||
                        !p) return l;
                    k = b.l.Math;
                    m = k.max((b.scroll.y + b.yb.h - m.y) / m.height, 0);
                    var r = p.height * p.width,
                        t = b.yb,
                        v = p.top,
                        z = p.bottom,
                        P = p.left,
                        R = t.w;
                    t = t.h;
                    var ma = b.l.Math;
                    p = ma.min(ma.max(p.right, 0), R) - ma.min(ma.max(P, 0), R);
                    p *= ma.min(ma.max(z, 0), t) - ma.min(ma.max(v, 0), t);
                    l.ie = p / h;
                    l.visibility = p / r;
                    if (.9 <= l.visibility || .1 <= l.ie) l.involvedTime += g;
                    l.maxScrolled = k.round(1E4 * m) / 1E4;
                    return l
                }, b.fa);
                c = {};
                d = {};
                Fe(b.l, (d.name = "publishers", d.counterKey = b.ta, d.data = (c.involvedTime = b.involvedTime, c.contentItems = M(function(k) {
                    var l = {};
                    return N((l.contentElement = k.Db, l), k)
                }, b.fa), c), d))
            }
        })()
    };

    function lo(a, b) {
        var c = M(function(d) {
            return d.id
        }, a.fa);
        a.fa = a.fa.concat(mb(function(d) {
            return !K(d.id, c)
        }, b))
    }

    function jo(a) {
        var b = q(Sf(a.l) || Tf(a.l)),
            c = b.next().value;
        b = b.next().value;
        a.yb = {
            w: c,
            h: b
        }
    }

    function mo(a) {
        V(a.l, "p.um." + a.Nc.id, function() {
            var b = [];
            a.Jb();
            a.meta = G(function(c, d) {
                if (Ej("html", a.l, d.element) !== a.l.document.documentElement) return b.push(d), delete c[d.id], c;
                var e = {};
                e = (e.id = d.id, e.involvedTime = Math.max(d.involvedTime, 0), e.maxScrolled = d.maxScrolled || 0, e.chars = d.update ? d.update("chars") || 0 : 0, e);
                if (d.Db) {
                    var f = Vf(d.Db);
                    f && (e.x = Math.max(Math.round(f.left) + a.scroll.x, 0), e.y = Math.max(Math.round(f.top) + a.scroll.y, 0), e.width = Math.round(f.width), e.height = Math.round(f.height))
                }
                c[d.id] =
                    e;
                return c
            }, {}, a.fa);
            M(function(c) {
                c = vb(a.l)(c, a.fa);
                a.fa.splice(c, 1)
            }, b)
        })()
    }
    n.yd = function() {
        var a = M(F(this.meta, J), bc(this.meta));
        if (a.length && (this.Td = yf(this.l, a), this.qf !== this.Td)) {
            var b = {},
                c = {};
            return c.type = "publishersHeader", c.data = (b.articleMeta = a || [], b.involvedTime = this.involvedTime, b), c
        }
        return null
    };

    function no(a) {
        if (a.fa.length) {
            var b = M(function(c) {
                var d = G(function(f, g) {
                    c[g] && (f[g] = c[g]);
                    return f
                }, {}, a.$f);
                c.If = !0;
                var e = {};
                return e.type = "articleInfo", e.stamp = d.stamp, e.data = d, e
            }, mb(function(c) {
                return !c.If
            }, a.fa));
            b.length && (a.buffer = a.buffer.concat(b), Zh(a.l, a.ta, ["pdf", b]))
        }
    }
    n.Jb = function() {
        this.scroll = {
            x: this.l.pageXOffset || J(this.l, "document.documentElement.scrollLeft") || 0,
            y: this.l.pageYOffset || J(this.l, "document.documentElement.scrollLeft") || 0
        }
    };
    var oo = {},
        po = (oo[1] = 500, oo[2] = 500, oo[3] = 0, oo);

    function qo(a, b, c) {
        var d = b.getAttribute("itemtype");
        c = Aj('[itemprop~="' + c + '"]', b);
        return d ? mb(function(e) {
            return e.parentNode && Ej("[itemtype]", a, e.parentNode) === b
        }, c) : c
    }

    function ro(a, b, c) {
        return (a = qo(a, b, c)) && a.length ? a[0] : null
    }

    function so(a) {
        if (!a) return "";
        a = L(a) ? a : [a];
        return a.length ? a[0].getAttribute("content") || If(a[0]) : ""
    }

    function to(a) {
        return a ? a.attributes && a.getAttribute("datetime") ? a.getAttribute("datetime") : so(a) : ""
    }
    var uo = ["topics", "rubric", "authors"];

    function vo(a, b) {
        var c = this;
        this.id = "a";
        this.Hd = !1;
        this.Gb = {};
        this.tb = {
            "schema.org": "Article NewsArticle Movie BlogPosting Review Recipe Answer".split(" "),
            mf: ["article"]
        };
        var d = {};
        this.Vb = (d.Answer = 3, d.Review = 2, d);
        this.Re = x(function(e, f, g) {
            var h = {};
            Zh(c.l, c.ta, "pfi", (h.field = e, h.itemField = f, h.value = g, h))
        }, function(e, f, g) {
            return "" + e + f + g
        });
        this.bi = function(e) {
            M(function(f) {
                e[f] && (e[f] = G(function(g, h) {
                    var k = h.name,
                        l = h.position;
                    if (!k) return c.Re(f, "name", k), g;
                    if ("string" === typeof l) {
                        k = Sb(l);
                        if (null ===
                            k || c.l.isNaN(k)) return c.Re(f, "position", l), g;
                        h.position = k
                    }
                    g.push(h);
                    return g
                }, [], e[f]))
            }, uo);
            return e
        };
        this.xg = x(function(e, f) {
            var g = {};
            Zh(c.l, c.ta, ["pcs", f], (g.chars = f.chars, g.limit = po[f.type], g))
        });
        this.l = a;
        this.root = Rf(a);
        this.ta = b
    }
    vo.prototype.Ma = function(a) {
        return a.element
    };

    function wo(a, b, c) {
        var d;
        V(a.l, "P.s." + c, function() {
            d = a.Gb[c].call(a, b)
        })();
        return d
    }

    function xo(a, b) {
        var c = N({}, b);
        if (a.Hd && !c.id && K(b.type, [3, 2])) {
            var d = T(", ", M(cb("name"), c.authors || []));
            c.pageTitle = d + ": " + c.pageTitle
        }
        if (!c.pageTitle) {
            a: {
                d = c.Db;
                for (var e = 1; 5 >= e; e += 1) {
                    var f = so(Bj("h" + e, d));
                    if (f) {
                        d = f;
                        break a
                    }
                }
                d = void 0
            }
            c.pageTitle = d
        }
        c.pageUrlCanonical || (d = c.id, d = ("string" !== typeof d ? 0 : /^(https?:)\/\//.test(d)) ? c.id : (d = Bj('[rel="canonical"]', a.root)) ? d.href : void 0, c.pageUrlCanonical = d);
        c.id || (c.id = c.pageTitle || c.pageUrlCanonical);
        return c
    }
    vo.prototype.Da = function(a) {
        var b = this,
            c = {},
            d = this.Ma(a);
        if (!d) return null;
        c.type = a.type;
        M(function(f) {
            c[f] = wo(b, a, f)
        }, bc(this.Gb));
        var e = Ed(this.l);
        c.stamp = e(Dd);
        c.element = a.element;
        c.Db = d;
        c = this.bi(xo(this, c));
        c.id = c.id ? Yj(c.id) : 1;
        c.update = function(f) {
            return b.Ma(a) ? wo(b, a, f) : void 0
        };
        return c
    };
    vo.prototype.getType = function() {
        return 1
    };
    vo.prototype.pc = function() {
        return []
    };

    function ko(a) {
        var b = a.pc(),
            c = 1;
        return G(function(d, e) {
            var f = a.Da({
                element: e,
                type: a.getType(e)
            }) || [];
            L(f) || (f = [f]);
            f = G(function(g, h) {
                var k = g.values,
                    l = g.af;
                h && h.chars > po[h.type] && !K(h.id, l) ? (k.push(h), l.push(h.id)) : h && h.chars <= po[h.type] && a.xg(h.id, h);
                return {
                    values: k,
                    af: l
                }
            }, {
                values: [],
                af: M(cb("id"), d)
            }, f).values;
            return d.concat(M(function(g) {
                var h = {};
                g = N((h.index = c, h.If = !1, h.involvedTime = 0, h), g);
                c += 1;
                return g
            }, f))
        }, [], b)
    }

    function yo() {
        vo.apply(this, arguments);
        this.id = "j";
        this.Hd = !0;
        this.Le = T(",", ['script[type="application/ld+json"]', 'script[type="application/json+ld"]', 'script[type="ld+json"]', 'script[type="json+ld"]']);
        var a = {};
        this.Gb = (a.id = function(b) {
            var c = b.data["@id"];
            b = b.data.mainEntity || b.data.mainEntityOfPage;
            !c && Ra(b) && (c = b["@id"]);
            return c
        }, a.chars = function(b) {
            var c = b.data;
            return y(c.text) ? c.text.length : If(this.Ma(b)).length
        }, a.authors = function(b) {
            b = b.data;
            var c = [];
            c = c.concat(zo(b, "author"));
            c = c.concat(zo(b.mainEntity,
                "author"));
            return c.concat(zo(b.mainEntityOfPage, "author"))
        }, a.pageTitle = function(b) {
            var c = b.data,
                d = c.headline || "";
            c.alternativeHeadline && (d += " " + c.alternativeHeadline);
            "" === d && (c.name ? d = c.name : c.itemReviewed && (d = c.itemReviewed));
            3 === b.type && Ra(c.parentItem) && (d = c.parentItem.text);
            return d
        }, a.updateDate = function(b) {
            return b.data.dateModified || ""
        }, a.publicationDate = function(b) {
            return b.data.datePublished || ""
        }, a.pageUrlCanonical = function(b) {
            return b.data.url
        }, a.topics = function(b) {
            return zo(b.data, "about",
                ["name", "alternateName"])
        }, a.rubric = function(b) {
            var c = this,
                d = this.Ma(b);
            b = nb(M(function(e) {
                e = xf(c.l, If(e));
                if (Ra(e) || L(e)) {
                    var f = Ao(e);
                    if (f) return G(function(g, h) {
                        return g ? g : Ra(h) && "BreadcrumbList" === h["@type"] ? h : g
                    }, null, f);
                    if ("BreadcrumbList" === e["@type"]) return e
                }
                return null
            }, [b.element].concat(Aj(this.Le, document.body === d ? document.documentElement : d))));
            return b.length && (b = b[0].itemListElement, L(b)) ? nb(M(function(e) {
                return Ra(e) && e.item && Ra(e.item) && !c.l.isNaN(e.position) ? {
                    name: e.item.name || e.name,
                    position: e.position
                } : null
            }, b)) : []
        }, a)
    }
    ka(yo, vo);

    function zo(a, b, c) {
        c = void 0 === c ? ["name"] : c;
        if (!Ra(a) || !a[b]) return [];
        a = a[b];
        a = L(a) ? a : [a];
        a = nb(M(function(d) {
            return d ? "string" === typeof d ? d : Ra(d) ? G(function(e, f) {
                return e || "" + d[f]
            }, "", c) : null : null
        }, a));
        return M(function(d) {
            var e = {};
            return e.name = d, e
        }, a)
    }
    yo.prototype.Ma = function(a) {
        var b = a.element,
            c = a.data || {};
        a = c["@id"];
        var d = c.url;
        c = null;
        d && y(d) && (c = Bo(this, d));
        !c && a && y(a) && (c = Bo(this, a));
        c || (c = a = b.parentNode, !Ej("head", this.l, b) && a && 0 !== If(a).length) || (c = this.l.document.body);
        return c
    };

    function Bo(a, b) {
        try {
            var c = qh(a.l, b).hash;
            if (c) {
                var d = Bj(c, a.l.document.body);
                if (d) return d
            }
        } catch (e) {}
        return null
    }
    yo.prototype.Da = function(a) {
        var b = this,
            c = a.element,
            d = a.data;
        if (!d && (d = xf(this.l, If(c)), !d || !/schema\.org/.test(d["@context"]) && !L(d))) return null;
        var e = Ao(d);
        if (e) return M(function(g) {
            return Ra(g) && K(g["@type"], b.tb["schema.org"]) ? vo.prototype.Da.call(b, {
                element: c,
                data: g,
                type: b.Vb[g["@type"]] || 1
            }) : null
        }, e);
        a.data = d;
        if ("QAPage" === a.data["@type"]) {
            var f = a.data.mainEntity || a.data.mainEntityOfPage;
            if (!f) return null
        }
        "Question" === a.data["@type"] && (f = a.data);
        return f ? (a = Ib(F(f, J), ["acceptedAnswer", "suggestedAnswer"]),
            M(function(g) {
                if (!Ra(g) || !K(g["@type"], b.tb["schema.org"])) return null;
                var h = {};
                g = {
                    element: c,
                    type: b.Vb[g["@type"]] || 1,
                    data: N((h.parentItem = f, h), g)
                };
                return vo.prototype.Da.call(b, g)
            }, a)) : K(a.data["@type"], this.tb["schema.org"]) ? vo.prototype.Da.call(this, N(a, {
            type: this.Vb[a.data["@type"]] || 1
        })) : null
    };
    yo.prototype.pc = function() {
        return Aj(this.Le, this.root)
    };

    function Ao(a) {
        if (L(a)) return a;
        if (a && L(a["@graph"])) return a["@graph"]
    }

    function Co() {
        vo.apply(this, arguments);
        this.id = "s";
        this.Hd = !0;
        this.$h = Va("exec", new RegExp("schema.org\\/(" + T("|", bc(this.Vb)) + ")$"));
        var a = {};
        this.Gb = (a.id = function(b) {
            b = b.element;
            var c = ro(this.l, b, "identifier");
            return c ? so(c) : (c = ro(this.l, b, "mainEntityOfPage")) && c.getAttribute("itemid") ? c.getAttribute("itemid") : null
        }, a.chars = function(b) {
            var c = 0;
            b = b.element;
            for (var d = ["articleBody", "reviewBody", "recipeInstructions", "description", "text"], e = 0; e < d.length; e += 1) {
                var f = ro(this.l, b, d[e]);
                if (f) {
                    c = so(f).length;
                    break
                }
            }
            b = If(b);
            0 === c && b && (c += b.length);
            return c
        }, a.topics = function(b) {
            var c = this,
                d = qo(this.l, b.element, "about");
            return M(function(e) {
                var f = {
                    name: so(e)
                };
                if (d = ro(c.l, e, "name")) f.name = so(d);
                return f
            }, d)
        }, a.rubric = function(b) {
            var c = this;
            (b = Bj('[itemtype$="schema.org/BreadcrumbList"]', b.element)) || (b = Bj('[itemtype$="schema.org/BreadcrumbList"]', this.root));
            return b ? M(function(d) {
                return {
                    name: so(ro(c.l, d, "name")),
                    position: so(ro(c.l, d, "position"))
                }
            }, qo(this.l, b, "itemListElement")) : []
        }, a.updateDate = function(b) {
            return (b =
                ro(this.l, b.element, "dateModified")) ? to(b) : ""
        }, a.publicationDate = function(b) {
            return (b = ro(this.l, b.element, "datePublished")) ? to(b) : ""
        }, a.pageUrlCanonical = function(b) {
            b = qo(this.l, b.element, "url");
            if (b.length) {
                var c = b[0];
                return c.href ? c.href : so(b)
            }
            return null
        }, a.pageTitle = function(b) {
            var c = "",
                d = b.element,
                e = ro(this.l, d, "headline");
            e && (c += so(e));
            (e = ro(this.l, d, "alternativeHeadline")) && (c += " " + so(e));
            "" === c && ((e = ro(this.l, d, "name")) || (e = ro(this.l, d, "itemReviewed")), e && (c += so(e)));
            3 === b.type && (b = Ej('[itemtype$="schema.org/Question"]',
                this.l, d)) && (b = ro(this.l, b, "text")) && (c += so(b));
            return c
        }, a.authors = function(b) {
            var c = this;
            b = qo(this.l, b.element, "author");
            return M(function(d) {
                var e = {};
                e = (e.name = "", e);
                if (/.+schema.org\/(Person|Organization)/.test(d.getAttribute("itemtype") || "")) {
                    var f = ro(c.l, d, "name");
                    f && (e.name = so(f))
                }
                e.name || (e.name = d.getAttribute("content") || If(d) || d.getAttribute("href"));
                return e
            }, b)
        }, a)
    }
    ka(Co, vo);
    Co.prototype.getType = function(a) {
        a = a.getAttribute("itemtype") || "";
        return (a = this.$h(a)) ? this.Vb[a[1]] : 1
    };
    Co.prototype.Da = function(a) {
        return a.element && If(a.element).length ? vo.prototype.Da.call(this, a) : null
    };
    Co.prototype.pc = function() {
        var a = T(",", M(function(b) {
            return '[itemtype$="schema.org/' + b + '"]'
        }, this.tb["schema.org"]));
        return Aj(a, this.root)
    };

    function Do(a, b) {
        vo.call(this, a, b);
        this.id = "o";
        var c = {};
        this.Gb = (c.chars = function(d) {
            d = this.Ma(d);
            return If(d).length
        }, c.authors = function(d) {
            return Eo(d.data.author)
        }, c.pageTitle = function(d) {
            return Fo(d.data.title) || ""
        }, c.updateDate = function(d) {
            return Fo(d.data.modified_time)
        }, c.publicationDate = function(d) {
            return Fo(d.data.published_time)
        }, c.pageUrlCanonical = function(d) {
            return Fo(d.data.url)
        }, c.rubric = function(d) {
            return Eo(d.data.section)
        }, c.topics = function(d) {
            return Eo(d.data.tag)
        }, c);
        this.Ig = new RegExp("^(og:)?((" +
            T("|", this.tb.mf) + "):)?")
    }
    ka(Do, vo);

    function Eo(a) {
        if (a) {
            if (L(a)) return M(function(c) {
                var d = {};
                return d.name = c ? "" + c : null, d
            }, a);
            var b = {};
            return [(b.name = a ? "" + a : null, b)]
        }
        return []
    }

    function Fo(a) {
        return L(a) ? a.length ? "" + a[0] : null : a ? "" + a : null
    }
    Do.prototype.pc = function() {
        var a = Aj('meta[property="og:type"]', this.l.document.body);
        return [this.l.document.head].concat(a)
    };

    function Go(a, b) {
        var c = b.element,
            d = {},
            e = a.Ma(b);
        c = Aj("meta[property]", c === a.l.document.head ? c : e);
        if (c.length) M(function(f) {
            try {
                if (f.parentNode === e || f.parentNode === a.l.document.head) {
                    var g = f.getAttribute("property").replace(a.Ig, ""),
                        h = so(f);
                    d[g] ? L(d[g]) ? d[g].push(h) : d[g] = [d[g], h] : d[g] = h
                }
            } catch (k) {
                mf(a.l, "og.ed", k)
            }
        }, c);
        else return null;
        return K(d.type, a.tb.mf) ? N(b, {
            data: d
        }) : null
    }
    Do.prototype.Ma = function(a) {
        a = a.element;
        var b = this.l.document;
        return a === b.head ? b.body : a.parentNode
    };
    Do.prototype.Da = function(a) {
        return (a = Go(this, a)) ? vo.prototype.Da.call(this, a) : null
    };

    function Ho(a, b, c, d, e) {
        d = Nh(a, c, d);
        b = lh(a, e || c, b);
        var f = cf(a, d, b);
        return function(g) {
            g = N({
                N: {
                    ea: ["mms." + c]
                }
            }, g);
            return f(g)
        }
    }
    var Io = "et w v z i u vf".split(" "),
        Jo = {};
    yo && (Jo.json_ld = yo);
    Co && (Jo.schema = Co, Jo.microdata = Co);
    Do && (Jo.opengraph = Do);
    var Ko = W("p.p", function(a, b) {
        function c(l) {
            var m = N({}, k);
            m.N.ba = l;
            return e(m)["catch"](V(a, "s.ww.p"))
        }
        var d = bo(a, "9", "8");
        if (!wa("querySelectorAll", a.document.querySelectorAll) || !d) return S.resolve();
        var e = Ho(a, b, "p", ["f", "x"], [
                [Vg(Io), 1],
                [fo, 1]
            ]),
            f = Le(),
            g = Gf(a, b.id),
            h = g.C("pai");
        h && (g.jc("pai"), f.D("pai", h));
        g = {};
        var k = {
            H: (g["wv-type"] = d.type, g),
            K: f,
            N: {}
        };
        return Wh(b, V(a, "ps.s", function(l) {
            if (l = J(l, "settings.publisher.schema")) {
                Ki(b) && (l = "microdata");
                var m = Jo[l];
                if (m && d) {
                    var p = O(b);
                    m = new m(a, p);
                    m = new io(a, m, d, c, p);
                    m.start();
                    var r = {};
                    Zh(a, p, "ps", (r.schema = l, r));
                    return D(m.stop, m)
                }
            }
        }))
    });

    function Lo(a) {
        var b = Mo;
        this.type = "0";
        this.l = a;
        this.Wg = b
    }
    n = Lo.prototype;
    n.Aa = function(a) {
        return Ag(Ib(D(this.ub, this), a))
    };
    n.ub = function(a, b) {
        var c = this,
            d = [],
            e = this.Wg(this.l, b && b.type, a.type);
        e && (d = Ib(function(f) {
            return f({
                l: c.l,
                ma: a
            }) || []
        }, e));
        return d
    };
    n.lb = function(a) {
        return a.length
    };
    n.ne = function(a) {
        return [a]
    };
    n.isEnabled = function() {
        return !0
    };

    function No(a, b, c) {
        this.Me = 0;
        this.$d = 1;
        this.Wc = 5E3;
        this.l = a;
        this.ja = b;
        this.Rb = c
    }
    No.prototype.Qc = function() {
        this.Me = X(this.l, H(D(this.flush, this), D(this.Qc, this)), this.Wc, "b.f")
    };
    No.prototype.send = function(a, b) {
        var c = this.Rb(a, b || [], this.$d);
        this.$d += 1;
        return c
    };
    No.prototype.push = function() {};
    No.prototype.flush = function() {};

    function Oo(a, b, c) {
        No.call(this, a, b, c);
        this.buffer = [];
        this.ag = 7500;
        this.Wc = 3E4;
        this.Qc()
    }
    ka(Oo, No);
    Oo.prototype.push = function(a, b) {
        var c = this.ja.ub(a, b);
        Pe(this.buffer, c);
        this.ja.lb(this.buffer) > this.ag && this.flush()
    };
    Oo.prototype.flush = function() {
        var a = this.buffer;
        a.length && (this.send(a), this.buffer = [])
    };
    var Po = /opera mini/i;

    function Qo(a, b) {
        var c = Ae(a),
            d = c.C("visorc");
        K(d, ["w", "b"]) || (d = "");
        xe(a) && re(a, "visorc") && !Po.test(Ab(a) || "") || (d = "b");
        var e = J(b, "settings.webvisor.recp");
        if (!a.isFinite(e) || 0 > e || 1 < e) d = "w";
        d || (d = Q(a).C("hitId") % 1E4 / 1E4 < e ? "w" : "b");
        c.D("visorc", d, 30);
        return "w" === d
    }
    var Ro = ["phone", "email"],
        So = "first(-|\\.|_|\\s){0,2}name last(-|\\.|_|\\s){0,2}name zip postal address passport (bank|credit)(-|\\.|_|\\s){0,2}card card(-|\\.|_|\\s){0,2}number card(-|\\.|_|\\s){0,2}holder cvv card(-|\\.|_|\\s){0,2}exp card(-|\\.|_|\\s){0,2}name card.*month card.*year card.*month card.*year password birth(-|\\.|_|\\s){0,2}(day|date) second(-|\\.|_|\\s){0,2}name third(-|\\.|_|\\s){0,2}name patronymic middle(-|\\.|_|\\s){0,2}name birth(-|\\.|_|\\s){0,2}place house street city flat state contact.*".split(" "),
        To = /^[\w\u0410-\u042f\u0430-\u044f]$/,
        Uo = [65, 90],
        Vo = [97, 122];

    function Wo(a, b) {
        if (C(b)) return !1;
        if (Hf(b)) {
            var c = b.parentNode;
            return (C(c) ? 0 : 11 === c.nodeType) ? !1 : Wo(a, b.parentNode)
        }
        c = Pf(a);
        if (!c) return !1;
        var d = c.call(b, ".ym-hide-content,.ym-hide-content *");
        return d && c.call(b, ".ym-show-content,.ym-hide-content .ym-show-content *") ? !1 : d
    }

    function Xo(a, b) {
        return T("", M(function(c) {
            if (!a.isNaN(c)) return "" + Xd(a, 0, 9);
            if (To.test(c)) {
                var d = q(c.toUpperCase() === c ? Uo : Vo);
                c = d.next().value;
                d = d.next().value;
                return String.fromCharCode(Xd(a, c, d))
            }
            return c
        }, b.split("")))
    }
    var Yo = "color radio checkbox date datetime-local email month number password range search tel text time url week".split(" "),
        Zo = new RegExp("(" + So.join("|") + ")", "i"),
        $o = new RegExp("(" + Ro.join("|") + ")", "i"),
        ap = ["password", "passwd", "pswd"],
        bp = new RegExp("(" + So.concat("\u0438\u043c\u044f \u0444\u0430\u043c\u0438\u043b\u0438\u044f \u043e\u0442\u0447\u0435\u0441\u0442\u0432\u043e \u0438\u043d\u0434\u0435\u043a\u0441 \u0442\u0435\u043b\u0435\u0444\u043e\u043d \u0430\u0434\u0440\u0435\u0441 \u043f\u0430\u0441\u043f\u043e\u0440\u0442 \u043d\u043e\u043c\u0435\u0440(-|\\.|_|\\s){0,2}\u043a\u0430\u0440\u0442\u044b \u0434\u0430\u0442\u0430(-|\\.|_|\\s){0,2}\u0440\u043e\u0436\u0434\u0435\u043d\u0438\u044f \u0434\u043e\u043c \u0443\u043b\u0438\u0446\u0430 \u043a\u0432\u0430\u0440\u0442\u0438\u0440\u0430 \u0433\u043e\u0440\u043e\u0434 \u043e\u0431\u043b\u0430\u0441\u0442\u044c".split(" ")).join("|") + ")",
            "i");

    function cp(a) {
        return a && Of("(ym-disable-submit|-metrika-noform)", a)
    }

    function dp(a) {
        try {
            var b = Yf(a);
            if (K(b, hg)) {
                if ("INPUT" === b) {
                    var c = a.type;
                    return !c || K(c.toLocaleLowerCase(), Yo)
                }
                return !0
            }
        } catch (d) {}
        return !1
    }

    function ep(a) {
        return !!(a && 2 < a.length)
    }

    function fp(a, b) {
        var c = a && (Na(a.className, "ym-disable-keys") || Na(a.className, "-metrika-nokeys"));
        return b && a ? c || !!Nj(a).length : c
    }

    function gp(a) {
        return $f(a) ? "password" === a.type || a.name && K(a.name.toLowerCase(), ap) || a.id && K(a.id.toLowerCase(), ap) : !1
    }

    function hp(a, b) {
        return gp(b) || fp(b) ? !0 : Wo(a, b)
    }

    function ip(a, b, c) {
        c = void 0 === c ? !1 : c;
        if (!b) return {
            Wa: !1,
            hb: !1,
            qb: !1
        };
        var d = b.getAttribute("type") || b.type;
        if ("button" === d) return {
            Wa: !1,
            hb: !1,
            qb: !1
        };
        var e = mb(ep, [b.className, b.id, b.name]),
            f = b && Of("ym-record-keys", b);
        d = d && K(d, Ro) || Nb(Wa($o), e);
        var g;
        (g = d) || (g = b.placeholder, g = Nb(Wa(Zo), e) || ep(g) && bp.test(g || ""));
        e = g;
        return {
            Wa: !f && (hp(a, b) || e && c || e && !d && !c),
            hb: f,
            qb: e
        }
    }
    var jp = xa(Array.prototype.reverse, "reverse");

    function kp(a) {
        for (var b = [], c = a.length - 1; 0 <= c; --c) b[a.length - 1 - c] = a[c];
        return b
    }
    var lp = jp ? function(a) {
            return jp.call(a)
        } : kp,
        mp = "metrikaId_" + Math.random(),
        np = {
            counter: 0
        },
        op = x(function() {
            var a = {};
            return a.A = 1, a.ABBR = 2, a.ACRONYM = 3, a.ADDRESS = 4, a.APPLET = 5, a.AREA = 6, a.B = 7, a.BASE = 8, a.BASEFONT = 9, a.BDO = 10, a.BIG = 11, a.BLOCKQUOTE = 12, a.BODY = 13, a.BR = 14, a.BUTTON = 15, a.CAPTION = 16, a.CENTER = 17, a.CITE = 18, a.CODE = 19, a.COL = 20, a.COLGROUP = 21, a.DD = 22, a.DEL = 23, a.DFN = 24, a.DIR = 25, a.DIV = 26, a.DL = 27, a.DT = 28, a.EM = 29, a.FIELDSET = 30, a.FONT = 31, a.FORM = 32, a.FRAME = 33, a.FRAMESET = 34, a.H1 = 35, a.H2 = 36, a.H3 = 37, a.H4 = 38, a.H5 =
                39, a.H6 = 40, a.HEAD = 41, a.HR = 42, a.HTML = 43, a.I = 44, a.IFRAME = 45, a.IMG = 46, a.INPUT = 47, a.INS = 48, a.ISINDEX = 49, a.KBD = 50, a.LABEL = 51, a.LEGEND = 52, a.LI = 53, a.LINK = 54, a.MAP = 55, a.MENU = 56, a.META = 57, a.NOFRAMES = 58, a.NOSCRIPT = 59, a.OBJECT = 60, a.OL = 61, a.OPTGROUP = 62, a.OPTION = 63, a.P = 64, a.PARAM = 65, a.PRE = 66, a.Q = 67, a.S = 68, a.SAMP = 69, a.SCRIPT = 70, a.SELECT = 71, a.SMALL = 72, a.SPAN = 73, a.STRIKE = 74, a.STRONG = 75, a.STYLE = 76, a.SUB = 77, a.SUP = 78, a.TABLE = 79, a.TBODY = 80, a.TD = 81, a.TEXTAREA = 82, a.TFOOT = 83, a.TH = 84, a.THEAD = 85, a.TITLE = 86, a.TR = 87, a.TT = 88,
                a.U = 89, a.UL = 90, a.VAR = 91, a.NOINDEX = 100, a
        }),
        pp = [17, 18, 38, 32, 39, 15, 11, 7, 1];

    function qp(a, b) {
        var c = Math.max(0, Math.min(b, 65535));
        Pe(a, [c >> 8, c & 255])
    }

    function rp(a, b) {
        Pe(a, [b & 255])
    }

    function sp(a, b, c) {
        return -1 !== Aa(a)(c, pp) ? (rp(b, c), !1) : !0
    }

    function Y(a, b) {
        for (var c = Math.max(0, b | 0); 127 < c;) Pe(a, [c & 127 | 128]), c >>= 7;
        Pe(a, [c])
    }

    function tp(a, b) {
        Y(a, b.length);
        for (var c = 0; c < b.length; c += 1) Y(a, b.charCodeAt(c))
    }

    function up(a, b) {
        var c = b;
        255 < c.length && (c = c.substr(0, 255));
        a.push(c.length);
        for (var d = 0; d < c.length; d += 1) qp(a, c.charCodeAt(d))
    }

    function vp(a, b) {
        var c = [];
        if (sp(a, c, 27)) return [];
        Y(c, b);
        return c
    }

    function wp(a, b) {
        var c = Yf(b);
        if (!c) return b[mp] = -1, null;
        var d = +b[mp];
        if (!isFinite(d) || 0 >= d) return null;
        if (b.attributes)
            for (var e = b; e;) {
                if (e.attributes.oi) return null;
                e = e.parentElement
            }
        e = 64;
        var f = Jj(a, b),
            g = f && f[mp] ? f[mp] : 0;
        0 > g && (g = 0);
        c = (c || "").toUpperCase();
        var h = op()[c];
        h || (e |= 2);
        var k = Kj(a, b);
        k || (e |= 4);
        var l = Ij(a, b);
        (f = f ? Ij(a, f) : null) && l[0] === f[0] && l[1] === f[1] && l[2] === f[2] && l[3] === f[3] && (e |= 8);
        np[d].nf = l[0] + "x" + l[1];
        np[d].size = l[2] + "x" + l[3];
        b.id && "string" === typeof b.id && (e |= 32);
        f = [];
        if (sp(a, f, 1)) return null;
        Y(f, d);
        rp(f, e);
        Y(f, g);
        h ? rp(f, h) : up(f, c);
        k && Y(f, k);
        e & 8 || (Y(f, l[0]), Y(f, l[1]), Y(f, l[2]), Y(f, l[3]));
        e & 32 && up(f, b.id);
        rp(f, 0);
        return f
    }

    function xp(a, b) {
        var c = b[mp];
        if (!c || 0 > c || !fg(b) || !b.form || cp(b.form)) return [];
        var d = Xf(a, b.form);
        if (0 > d) return [];
        if ($f(b)) var e = {
            text: 0,
            color: 0,
            ic: 0,
            ui: 0,
            "datetime-local": 0,
            email: 0,
            lf: 0,
            Ii: 0,
            search: 0,
            Si: 0,
            time: 0,
            url: 0,
            month: 0,
            Ti: 0,
            password: 2,
            Hi: 3,
            ri: 4,
            file: 6,
            image: 7
        } [b.type];
        else {
            e = {
                li: 1,
                mi: 5
            };
            var f = Yf(b);
            e = B(f) ? "" : e[f]
        }
        if ("number" !== typeof e) return [];
        f = -1;
        for (var g = b.form.elements, h = g.length, k = 0, l = 0; k < h; k += 1)
            if (g[k].name === b.name) {
                if (g[k] === b) {
                    f = l;
                    break
                }
                l += 1
            } if (0 > f) return [];
        g = [];
        if (sp(a, g, 7)) return [];
        Y(g, c);
        Y(g, d);
        Y(g, e);
        tp(g, b.name || "");
        Y(g, f);
        return g
    }
    var yp = Jb(F("\u2022", w));

    function zp(a, b, c) {
        var d = b[mp];
        if (d) {
            a: {
                var e = Fd(a),
                    f = b[mp];
                if (0 < f) {
                    var g = [];
                    b = Ij(a, b);
                    var h = np[f],
                        k = b[0] + "x" + b[1],
                        l = b[2] + "x" + b[3];
                    if (k !== h.nf) {
                        h.nf = k;
                        if (sp(a, g, 9)) {
                            a = [];
                            break a
                        }
                        Y(g, e);
                        Y(g, f);
                        Y(g, b[0]);
                        Y(g, b[1])
                    }
                    if (l !== h.size) {
                        h.size = l;
                        if (sp(a, g, 10)) {
                            a = [];
                            break a
                        }
                        Y(g, e);
                        Y(g, f);
                        Y(g, b[2]);
                        Y(g, b[3])
                    }
                    if (g.length) {
                        a = g;
                        break a
                    }
                }
                a = []
            }
            Pe(c, a)
        }
        return d
    }

    function Ap(a, b) {
        var c = void 0 === c ? [] : c;
        for (var d = [], e = b; e && !zp(a, e, c); e = Jj(a, e)) d.push(e);
        M(function(f) {
            np.counter += 1;
            var g = np.counter;
            f[mp] = g;
            np[g] = {};
            g = wp(a, f);
            f = xp(a, f);
            g && f && (Pe(c, g), Pe(c, f))
        }, lp(d));
        return c
    }
    var Bp = !0;

    function Cp(a) {
        if (!Bp) {
            Bp = !0;
            a = Fd(a.l);
            var b = [];
            rp(b, 14);
            Y(b, a);
            return b
        }
    }

    function Dp(a) {
        if (Bp) {
            Bp = !1;
            var b = a.l;
            a = Fd(a.l);
            var c = [];
            sp(b, c, 15) ? b = [] : (Y(c, a), b = c);
            return b
        }
    }

    function Ep(a) {
        var b = a.ma;
        if (!Bp || b && !b.fromElement) return Cp(a)
    }

    function Fp(a) {
        var b = a.ma;
        if (b && !b.toElement) return Dp(a)
    }

    function Gp(a, b) {
        var c = a.l,
            d = [],
            e = b.form;
        if (!b[mp] && e) {
            var f = e.elements;
            e = e.length;
            for (var g = 0; g < e; g += 1) {
                var h = f[g];
                gg(h) && !h[mp] && Pe(d, Ap(c, h))
            }
        } else Pe(d, Ap(c, b));
        return d
    }

    function Hp(a) {
        var b = Nf(a.ma);
        if (b && gg(b)) {
            var c = Gp(a, b),
                d = c.concat;
            var e = a.l;
            a = Fd(a.l);
            var f = [];
            sp(e, f, 17) ? b = [] : (Y(f, a), Y(f, b[mp]), b = f);
            return d.call(c, b)
        }
    }

    function Ip(a) {
        var b = a.l,
            c = a.ma.target;
        if (c && gg(c)) {
            b = Ap(b, c);
            var d = b.concat;
            var e = a.l;
            a = Fd(a.l);
            var f = [];
            sp(e, f, 18) ? c = [] : (Y(f, a), Y(f, c[mp]), c = f);
            return d.call(b, c)
        }
    }

    function Jp(a) {
        var b = a.l,
            c = Nf(a.ma);
        if (!c || gp(c) || fp(c)) return [];
        if (fg(c)) {
            var d = Q(b).C("isEU"),
                e = ip(b, c, d),
                f = e.Wa;
            d = e.qb;
            e = e.hb;
            if (eg(c)) var g = c.checked;
            else g = c.value, g = f ? T("", yp(g.split(""))) : g;
            b = Ap(b, c);
            f = b.concat;
            var h = a.l;
            a = Fd(a.l);
            var k = [];
            sp(h, k, 39) ? c = [] : (Y(k, a), Y(k, c[mp]), up(k, String(g)), rp(k, d && !e ? 1 : 0), c = k);
            return f.call(b, c)
        }
    }

    function Kp(a) {
        var b = a.l,
            c = a.ma,
            d = Nf(c);
        if (!d || "SCROLLBAR" === d.nodeName) return [];
        var e = [],
            f = F(e, Pe);
        d && gg(d) ? f(Gp(a, d)) : f(Ap(b, d));
        var g = Oj(b, c);
        f = e.concat;
        a = Fd(a.l);
        var h = c.type,
            k = [g.x, g.y];
        g = c.which;
        c = c.button;
        var l = q(Hj(b, d)),
            m = l.next().value;
        for (l = l.next().value; d && (!m || !l);)
            if (d = Jj(b, d)) l = q(Hj(b, d)), m = l.next().value, l = l.next().value;
        if (d)
            if (m = d[mp], !m || 0 > m) b = [];
            else {
                l = {};
                var p = (l.mousemove = 2, l.click = 32, l.dblclick = 33, l.mousedown = 4, l.mouseup = 30, l.touch = 12, l)[h];
                p ? (l = [], d = Gj(b, d), sp(b, l, p) ? b = [] :
                    (Y(l, a), Y(l, m), Y(l, Math.max(0, k[0] - d.left)), Y(l, Math.max(0, k[1] - d.top)), /^mouse(up|down)|click$/.test(h) && (b = g || c, rp(l, 2 > b ? 1 : b === (g ? 2 : 4) ? 4 : 2)), b = l)) : b = []
            }
        else b = [];
        return f.call(e, b)
    }
    var Lp = "";

    function Mp(a) {
        var b = null,
            c = a.l,
            d = c.document;
        if (c.getSelection) {
            try {
                var e = c.getSelection()
            } catch (g) {
                return []
            }
            if (Qa(e)) return [];
            var f = "" + e;
            b = e.anchorNode
        } else d.selection && d.selection.createRange && (b = d.selection.createRange(), f = b.text, b = b.parentElement());
        if ("string" !== typeof f) return [];
        try {
            for (; b && 1 !== b.nodeType;) b = b.parentNode
        } catch (g) {
            return []
        }
        if (!b) return [];
        d = ip(c, b).Wa || fp(b, !0);
        b = b.getElementsByTagName("*");
        for (e = 0; e < b.length && !d;) d = b[e], d = ip(c, d).Wa || fp(d, !0), e += 1;
        if (f !== Lp) return Lp = f, b = d ?
            T("", yp(f.split(""))) : f, f = a.l, a = Fd(a.l), 0 === b.length ? b = c = "" : 100 >= b.length ? (c = b, b = "") : 200 >= b.length ? (c = b.substr(0, 100), b = b.substr(100)) : (c = b.substr(0, 97), b = b.substr(b.length - 97)), d = [], sp(f, d, 29) ? a = [] : (Y(d, a), tp(d, c), tp(d, b), a = d), a
    }

    function Np(a) {
        return Kp(a).concat(Mp(a) || [])
    }

    function Op(a) {
        return (a.shiftKey ? 2 : 0) | (a.ctrlKey ? 4 : 0) | (a.altKey ? 1 : 0) | (a.metaKey ? 8 : 0) | (a.ctrlKey || a.altKey ? 16 : 0)
    }
    var Pp = !1;

    function Qp(a) {
        var b = [];
        Pp || (Pp = !0, Lp && Pe(b, vp(a.l, Fd(a.l))), ai(a.l, function() {
            Pp = !1
        }, "fv.c"));
        return b
    }

    function Rp(a, b, c, d) {
        b = Nf(b);
        if (!b || hp(a, b)) return [];
        var e = ip(a, b),
            f = e.qb,
            g = e.hb;
        e = e.Wa;
        var h = Q(a);
        if (!g && (f && h.C("isEU") || fp(b))) a = [];
        else {
            f = Ap(a, b);
            g = f.concat;
            var k = Fd(a);
            h = [];
            if (sp(a, h, 38)) a = [];
            else {
                Y(h, k);
                qp(h, c);
                rp(h, d);
                a = b[mp];
                if (!a || 0 > a) a = 0;
                Y(h, a);
                rp(h, e ? 1 : 0);
                a = h
            }
            a = g.call(f, a)
        }
        return a
    }
    var Sp = !0;

    function Tp(a) {
        var b = a.l,
            c = a.ma,
            d = c.keyCode,
            e = Op(c),
            f = [],
            g = F(f, Pe);
        if ({
                3: 1,
                8: 1,
                9: 1,
                13: 1,
                16: 1,
                17: 1,
                18: 1,
                19: 1,
                20: 1,
                27: 1,
                33: 1,
                34: 1,
                35: 1,
                36: 1,
                37: 1,
                38: 1,
                39: 1,
                40: 1,
                45: 1,
                46: 1,
                91: 1,
                92: 1,
                93: 1,
                106: 1,
                110: 1,
                111: 1,
                144: 1,
                145: 1
            } [d] || 112 <= d && 123 >= d || 96 <= d && 105 >= d || e & 16) 19 === d && 4 === (e & -17) && (d = 144), g(Rp(b, c, d, e | 16)), Sp = !1, ai(b, function() {
            Sp = !0
        }, "fv.kd"), !(67 === d && e & 4) || e & 1 || e & 2 || g(Qp(a));
        return f
    }
    var Up = !1;

    function Vp(a) {
        var b = a.l;
        a = a.ma;
        var c = [];
        Sp && !Up && 0 !== a.which && (Pe(c, Rp(b, a, a.charCode || a.keyCode, Op(a))), Up = !0, ai(b, function() {
            Up = !1
        }, "fv.kp"));
        return c
    }

    function Wp(a) {
        var b = a.l,
            c = Nf(a.ma);
        if (!c || cp(c)) return [];
        var d = [];
        if ("FORM" === c.nodeName) {
            for (var e = c.elements, f = 0; f < e.length; f += 1) jg(e[f]) || Pe(d, Ap(b, e[f]));
            a = Fd(a.l);
            e = Xf(b, c);
            if (0 > e) b = [];
            else {
                f = c.elements;
                var g = f.length;
                c = [];
                for (var h = 0; h < g; h += 1)
                    if (!jg(f[h])) {
                        var k = f[h][mp];
                        k && 0 < k && c.push(k)
                    } f = [];
                if (sp(b, f, 11)) b = [];
                else {
                    Y(f, a);
                    Y(f, e);
                    Y(f, c.length);
                    for (b = 0; b < c.length; b += 1) Y(f, c[b]);
                    b = f
                }
            }
            Pe(d, b)
        }
        return d
    }

    function Xp(a) {
        var b = a.flush;
        "BODY" === Yf(Nf(a.ma)) && b()
    }
    var Yp = pa(function(a, b) {
        var c = E([a, "efv." + b.event], V);
        b.R = M(H(w, c), b.R);
        return b
    });

    function Zp(a, b) {
        var c = mb(function(e) {
                return 0 < e.R.length
            }, b),
            d = gc({
                target: a.document,
                type: "document"
            });
        return M(H(w, d, Yp(a)), c)
    }
    var $p = x(function(a) {
            var b = [],
                c = [],
                d = [];
            a.document.attachEvent && !a.opera && (b.push(Dp), c.push(Ep), c.push(Fp));
            a.document.addEventListener ? b.push(Ip) : (c.push(Hp), d.push(Ip));
            return Zp(a, ("onpagehide" in a ? [] : [{
                target: a,
                type: "window",
                event: "beforeunload",
                R: [u]
            }, {
                target: a,
                type: "window",
                event: "unload",
                R: [u]
            }]).concat([{
                event: "click",
                R: [Kp]
            }, {
                event: "dblclick",
                R: [Kp]
            }, {
                event: "mousedown",
                R: [Kp]
            }, {
                event: "mouseup",
                R: [Np]
            }, {
                event: "keydown",
                R: [Tp]
            }, {
                event: "keypress",
                R: [Vp]
            }, {
                event: "copy",
                R: [Qp]
            }, {
                event: "blur",
                R: b
            }, {
                event: "focusin",
                R: c
            }, {
                event: "focusout",
                R: d
            }]).concat(!a.document.attachEvent || a.opera ? [{
                target: a,
                type: "window",
                event: "focus",
                R: [Cp]
            }, {
                target: a,
                type: "window",
                event: "blur",
                R: [Dp]
            }] : []).concat(a.document.addEventListener ? [{
                event: "focus",
                R: [Hp]
            }, {
                event: "change",
                R: [Jp]
            }, {
                event: "submit",
                R: [Wp]
            }] : [{
                type: "formInput",
                event: "change",
                R: [Jp]
            }, {
                type: "form",
                event: "submit",
                R: [Wp]
            }]))
        }),
        aq = x(function(a) {
            var b = [];
            Qf(a) && b.push({
                target: a,
                type: "document",
                event: "mouseleave",
                R: [Xp]
            });
            "onpagehide" in a && b.push({
                target: a,
                type: "window",
                event: "pagehide",
                R: [function(c) {
                    c = c.flush;
                    c()
                }]
            });
            return b
        }),
        bq = ["submit", "beforeunload", "unload"],
        cq = x(function(a, b) {
            var c = b(a);
            return G(function(d, e) {
                d[e.type + ":" + e.event] = e.R;
                return d
            }, {}, c)
        }),
        Mo = F($p, function(a, b, c, d) {
            return cq(b, a)[c + ":" + d] || []
        }),
        dq = /^\s*function submit\(\)/;

    function eq(a, b) {
        var c = a.document,
            d = [],
            e = ud(a),
            f = ":submit" + Math.random(),
            g = [],
            h = D(b.flush, b),
            k = pa(function(l, m) {
                V(a, "hfv." + l, function() {
                    try {
                        var p = m.type
                    } catch (r) {
                        return
                    }
                    p = K(p, bq);
                    b.push(m, {
                        type: l
                    });
                    p && h()
                })()
            });
        return {
            start: V(a, "sfv", function() {
                var l = $p(a),
                    m = aq(a);
                M(function(p) {
                    d.push(e.F(p.target, [p.event], k(p.type)))
                }, l);
                M(function(p) {
                    d.push(e.F(p.target, [p.event], V(a, "hff." + p.type + "." + p.event, function(r) {
                        M(ta({
                            l: a,
                            ma: r,
                            flush: h
                        }), p.R)
                    })))
                }, m);
                g = Dj(a, "form", c);
                c.attachEvent && (l = Dj(a, "form *", c),
                    M(function(p) {
                        d.push(e.F(p, ["submit"], k("form")))
                    }, g), M(function(p) {
                        fg(p) && d.push(e.F(p, ["change"], k("formInput")))
                    }, l));
                M(function(p) {
                    var r = p.submit;
                    if (A(r) || "object" === typeof r && dq.test("" + r)) p[f] = r, p.submit = V(a, "fv", function() {
                        var t = {
                            target: p,
                            type: "submit"
                        };
                        k("document")(t);
                        return p[f]()
                    })
                }, g)
            }),
            stop: V(a, "ufv", function() {
                M(Qe, d);
                M(function(l) {
                    l && (l.submit = l[f])
                }, g);
                b.flush()
            })
        }
    }

    function fq(a, b, c) {
        function d() {
            h && h.stop()
        }
        if (!b.zb) return S.resolve(u);
        var e = Rh(a, "4", b),
            f = {
                K: Le()
            },
            g = new Oo(a, c, function(k, l, m) {
                if (!e) return S.resolve();
                l = "wv-data=" + zl(k, !0);
                var p = {};
                p["wv-part"] = "" + m;
                m = k.length;
                for (var r = 0, t = 255, v = 255, z, P, R; m;) {
                    z = 21 < m ? 21 : m;
                    m -= z;
                    do P = "string" === typeof k ? k.charCodeAt(r) : k[r], r += 1, 255 < P && (R = P >> 8, P &= 255, P ^= R), t += P, v += t; while (--z);
                    t = (t & 255) + (t >> 8);
                    v = (v & 255) + (v >> 8)
                }
                k = (t & 255) + (t >> 8) << 8 | (v & 255) + (v >> 8);
                return e(N({}, f, {
                    N: {
                        ba: l
                    },
                    H: (p["wv-check"] = "" + (65535 === k ? 0 : k), p["wv-type"] =
                        c.type, p)
                }), b)["catch"](V(a, "m.n.m.s"))
            }),
            h = eq(a, g);
        return Wh(b, function(k) {
            k && Q(a).D("isEU", J(k, "settings.eu"));
            Q(a).C("oo") || h && Qo(a, k) && h.start();
            return d
        })
    }
    var gq = W("fw.p", function(a, b) {
        var c;
        if (!(c = b.Eg || !b.zb)) {
            var d = Q(a),
                e = !1;
            c = d.C("hitParam", {});
            var f = O(b);
            c[f] && (d = d.C("counters", {}), e = Nc(b.ca) && !d[f]);
            c[f] = 1;
            c = e
        }
        return c ? S.resolve(u) : fq(a, b, new Lo(a))
    });

    function hq(a, b, c, d) {
        d = void 0 === d ? 0 : d;
        No.call(this, a, b, c);
        this.ue = this.Bb = this.ve = 0;
        this.buffer = [];
        this.Wc = 2E3;
        this.Z = Dg(a);
        this.Qc();
        this.ue = d
    }
    ka(hq, No);

    function iq(a, b) {
        return nb(a.Z.$("ag", b))
    }

    function jq(a, b, c) {
        b(ug(V(a.l, "wv2.b.st"), function(d) {
            a.send(d, c)
        }))
    }

    function kq(a, b, c) {
        rg(a.l, a.Me);
        var d = Math.ceil(a.ja.lb(c) / 63E4),
            e = a.ja.ne(c, d);
        M(function(f, g) {
            var h = {};
            h = N({}, b, (h.data = f, h.partNum = g + 1, h.end = g + 1 === d, h.partsTotal = e.length, h));
            var k = a.ja.Aa([h], !1);
            jq(a, k, [h])
        }, e);
        a.Qc()
    }
    n = hq.prototype;
    n.send = function(a, b) {
        var c = this;
        this.Z.$("se", b);
        return No.prototype.send.call(this, a, b).then(w, function() {
            c.Z.$("see", b)
        })
    };

    function lq(a, b, c, d, e, f) {
        hq.Zc["" + b + c] || (a.Zc[c] = new hq(f, e, d, "m" === c ? 31457280 : 0));
        return a.Zc[c]
    }
    n.push = function(a) {
        var b = this;
        if (!(this.ue && this.ve >= this.ue)) {
            this.Z.$("p", a);
            var c = this.ja.ub(a),
                d = this.ja.lb(c);
            7E5 < d ? kq(this, a, c) : (c = iq(this, this.buffer.concat([a])), c = G(function(e, f) {
                return e + b.ja.lb(b.ja.ub(f))
            }, 0, c), this.Bb + c + d >= 7E5 * .7 && this.flush(), this.buffer.push(a), this.Bb += d)
        }
    };
    n.F = function(a, b) {
        this.Z.F([a], b)
    };
    n.ga = function(a, b) {
        this.Z.ga([a], b)
    };
    n.flush = function(a) {
        var b = this.buffer.concat(iq(this, this.buffer));
        b.length && (this.buffer = [], this.ve += this.Bb, this.Bb = 0, a = this.ja.Aa(b, a), jq(this, a, b))
    };
    hq.Zc = {};

    function mq(a, b, c, d, e) {
        d = void 0 === d ? 1 : d;
        e = void 0 === e ? "itc" : e;
        b = Rd(b, c);
        ml(a, b, d)(ug(V(a, e), u))
    }
    var nq = {
            type: "event",
            event: "fatalError",
            data: {
                code: "invalid-snapshot",
                Lg: "p.s.f",
                stack: ""
            }
        },
        oq = ["checkbox", "radio"],
        pq = /pwd|value|password/i;

    function qq(a, b, c, d, e, f) {
        f = void 0 === f ? Yf(b) : f;
        var g = {
            pb: !1,
            value: d
        };
        if (dp(b)) "value" === c ? !C(d) && "" !== d && (c = e.Jd, f = e.sf, e = Wo(a, b), f ? (c = ip(a, b, c), b = c.qb, a = c.hb, c = c.Wa, g.pb = !a && (e || b)) : (g.pb = e, c = !(b && Of("ym-record-keys", b))), c || e) && (d = "" + d, g.value = 0 < d.length ? pl("\u2022", d.length) : "") : "checked" === c && K((b.getAttribute("type") || "").toLowerCase(), oq) ? g.value = b.checked ? "checked" : null : pq.test(c) && gp(b) && (g.value = null);
        else if ("IMG" === f && "src" === c)(d = Wo(a, b)) ? (g.pb = d, g.value = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=") :
            g.value = (b.getAttribute("srcset") ? b.currentSrc : "") || b.src;
        else if ("A" === f && "href" === c) g.value = d ? "#" : "";
        else if (K(c, ["srcset", "integrity", "crossorigin", "password"]) || 2 < c.length && 0 === La(c, "on") || "IFRAME" === f && "src" === c || "SCRIPT" === f && K(c, ["src", "type"])) g.value = null;
        return g
    }

    function rq(a, b, c) {
        var d = {};
        dp(a) ? d.value = a.value || c.value : "IMG" !== b || c.src || (d.src = "");
        return d
    }

    function sq(a, b, c, d, e) {
        d = void 0 === d ? {} : d;
        e = void 0 === e ? Yf(b) : e;
        var f = N(G(function(h, k) {
            h[k.name] = k.value;
            return h
        }, {}, ub(b.attributes)), d);
        N(f, rq(b, e, f));
        var g = (d = G(function(h, k) {
            var l = q(k),
                m = l.next().value;
            l = l.next().value;
            l = qq(a, b, m, l, c, e);
            var p = l.value;
            C(p) ? delete f[m] : f[m] = p;
            return h || l.pb
        }, !1, ac(f))) && Vf(b);
        g && (f.width = g.width, f.height = g.height);
        return {
            pb: d,
            lg: f
        }
    }

    function tq(a, b) {
        if (y(b)) return b;
        var c = a.textContent;
        if (y(c)) return c;
        c = a.data;
        if (y(c)) return c;
        c = a.nodeValue;
        return y(c) ? c : ""
    }
    var uq = cb("location.href");

    function vq(a, b, c, d) {
        d = void 0 === d ? "wv2" : d;
        return {
            J: function(e, f) {
                return V(a, d + "." + c + "." + f, e, void 0, b)
            }
        }
    }

    function Z(a, b, c) {
        this.qh = "wv2.c";
        this.rb = [];
        this.ha = [];
        this.l = a;
        this.L = vq(a, this, c, this.qh);
        this.G = b;
        this.Ra = this.G.Zg();
        this.start = this.L.J(this.start, "st");
        this.stop = this.L.J(this.stop, "sp")
    }
    Z.prototype.start = function() {
        var a = this;
        this.rb = M(function(b) {
            var c = q(b);
            b = c.next().value;
            var d = c.next().value;
            c = c.next().value;
            d = D(a.L.J(d, b[0]), a);
            return a.Ra.F(c || a.l, b, d)
        }, this.ha)
    };
    Z.prototype.stop = function() {
        M(Qe, this.rb)
    };
    Z.prototype.Y = function(a) {
        return this.G.va().Y(a)
    };

    function wq(a, b, c) {
        Z.call(this, a, b, c);
        this.sa = {
            elements: [],
            attributes: []
        };
        this.index = 0;
        this.Wd = this.L.J(this.Wd, "o");
        this.kd = this.L.J(this.kd, "io");
        this.Xc = this.L.J(this.Xc, "ao");
        this.de = this.L.J(this.de, "a");
        this.ae = this.L.J(this.ae, "at");
        this.ee = this.L.J(this.ee, "r");
        this.ce = this.L.J(this.ce, "c");
        this.oa = new a.MutationObserver(this.Wd)
    }
    ka(wq, Z);
    n = wq.prototype;
    n.start = function() {
        this.oa.observe(this.l.document.documentElement, {
            attributes: !0,
            characterData: !0,
            childList: !0,
            subtree: !0,
            attributeOldValue: !0,
            characterDataOldValue: !0
        })
    };
    n.stop = function() {
        this.oa.disconnect()
    };
    n.Xc = function(a) {
        var b = a.target,
            c = a.attributeName,
            d = a.oldValue;
        a = b.getAttribute(c);
        if (a === d) return !1;
        d = Aa(this.l)(b, this.sa.elements); - 1 === d && (d = this.sa.elements.push(b) - 1, this.sa.attributes[d] = {});
        this.sa.attributes[d] || (this.sa.attributes[d] = {});
        this.sa.attributes[d][c] = qq(this.l, b, c, a, this.G.Ib()).value;
        return !0
    };
    n.kd = function(a) {
        function b(g) {
            var h = Aa(c.l)(g, d);
            return -1 === h ? (d.push(g), g = {
                sd: {}
            }, e.push(g), g) : e[h]
        }
        var c = this,
            d = [],
            e = [];
        M(function(g) {
            var h = g.attributeName,
                k = g.removedNodes,
                l = g.oldValue,
                m = g.target,
                p = g.nextSibling,
                r = g.previousSibling;
            switch (g.type) {
                case "attributes":
                    if (c.Xc(g)) {
                        var t = b(m);
                        t.sd[h] || (t.sd[h] = qq(c.l, m, h, l, c.G.Ib()).value)
                    }
                    break;
                case "childList":
                    k && M(function(v) {
                        t = b(v);
                        t.Ue || N(t, {
                            Ue: m,
                            Rg: p ? p : void 0,
                            Sg: r ? r : void 0
                        })
                    }, ub(k));
                    break;
                case "characterData":
                    t = b(m), t.Ve || (t.Ve = l)
            }
        }, a);
        var f =
            this.G.va();
        M(function(g, h) {
            f.me(g, e[h])
        }, d)
    };
    n.Wd = function(a) {
        var b = this;
        if (uq(this.l)) {
            var c = this.G.stamp();
            this.kd(a);
            M(function(d) {
                var e = d.addedNodes,
                    f = d.removedNodes,
                    g = d.target;
                switch (d.type) {
                    case "childList":
                        f && f.length && b.ee(ub(f), c);
                        e && e.length && b.de(ub(e), c);
                        break;
                    case "characterData":
                        b.ce(g, c)
                }
            }, a);
            this.ae(c)
        } else this.stop()
    };
    n.ae = function(a) {
        var b = this;
        M(function(c, d) {
            var e = xq(b);
            b.G.T("mutation", {
                index: e,
                attributes: b.sa.attributes[d],
                target: b.Y(c)
            }, "ac", a)
        }, this.sa.elements);
        this.sa.elements = [];
        this.sa.attributes = []
    };
    n.de = function(a, b) {
        var c = this,
            d = xq(this);
        this.G.va().sc({
            nodes: a,
            Pc: function(e) {
                e = M(function(f) {
                    f.node = void 0;
                    return f
                }, e);
                c.G.T("mutation", {
                    index: d,
                    nodes: e
                }, "ad", b)
            }
        })
    };
    n.ee = function(a, b) {
        var c = this,
            d = xq(this),
            e = this.G.va(),
            f = M(function(g) {
                var h = e.removeNode(g);
                Lk(c.l, g, function(k) {
                    e.removeNode(k)
                });
                return h
            }, a);
        this.G.T("mutation", {
            index: d,
            nodes: f
        }, "re", b)
    };
    n.ce = function(a, b) {
        var c = xq(this);
        this.G.T("mutation", {
            value: a.textContent,
            target: this.Y(a),
            index: c
        }, "tc", b)
    };

    function xq(a) {
        var b = a.index;
        a.index += 1;
        return b
    }

    function yq(a, b) {
        var c = this;
        this.nc = [];
        this.gb = [];
        this.Vd = 1;
        this.Je = this.Ef = 0;
        this.za = {};
        this.Sa = {};
        this.Hb = [];
        this.Ed = function(e) {
            return c.gb.length ? K(e, c.gb) : !1
        };
        this.removeNode = function(e) {
            var f = c.Y(e),
                g = Yf(e);
            if (g && !B(f)) return g = "NR:" + g.toLowerCase(), c.Ed(g) && c.Z.$(g, {
                data: {
                    node: e,
                    id: f
                }
            }), f
        };
        this.kb = function(e) {
            var f = Yf(e);
            if (f) {
                var g = e.__ym_indexer;
                return g ? g : (g = c.Vd, e.__ym_indexer = g, c.Vd += 1, f = "NA:" + f.toLowerCase(), c.Ed(f) && c.Z.$(f, {
                    data: {
                        node: e,
                        id: g
                    }
                }), g)
            }
            return null
        };
        this.Af = function() {
            c.Ef =
                X(c.l, H(D(c.aa, c, !1), c.Af), 50, "i.s")
        };
        this.yf = function() {
            c.Je = X(c.l, H(D(c.cd, c, !1), c.yf), 50, "i.g")
        };
        this.Jh = function(e) {
            null === c.za[e] && delete c.za[e];
            null === c.Sa[e] && delete c.Sa[e]
        };
        this.l = a;
        var d = vq(a, this, "i");
        this.Z = Dg(a);
        this.options = b;
        this.start = d.J(this.start, "st");
        this.stop = d.J(this.stop, "sp");
        this.Y = d.J(this.Y, "i");
        this.me = d.J(this.me, "o");
        this.sc = d.J(this.sc, "a");
        this.removeNode = d.J(this.removeNode, "r");
        this.aa = d.J(this.aa, "s");
        this.cd = d.J(this.cd, "g")
    }
    n = yq.prototype;
    n.me = function(a, b) {
        var c = this.kb(a);
        Qa(c) || (this.Sa[c] && this.Y(a), this.Sa[c] = b)
    };
    n.F = function(a, b, c) {
        a = "" + b + a;
        this.gb.push(a);
        this.Ed(a) || this.gb.push(a);
        this.Z.F([a], c)
    };
    n.ga = function(a, b, c) {
        var d = "" + b + a;
        this.gb = mb(function(e) {
            return e !== d
        }, this.gb);
        this.Z.ga([d], c)
    };
    n.start = function() {
        this.Af();
        this.yf()
    };
    n.stop = function() {
        this.flush();
        rg(this.l, this.Je);
        rg(this.l, this.Ef);
        this.nc = [];
        this.Hb = [];
        this.za = {};
        this.Sa = {}
    };
    n.sc = function(a) {
        var b = this,
            c = [],
            d = 0,
            e = {
                Pc: a.Pc,
                result: [],
                uc: 0,
                nodes: c
            };
        this.nc.push(e);
        M(function(f) {
            Lk(b.l, f, function(g) {
                var h = b.kb(g);
                Qa(h) || (c.push(g), b.za[h] && b.Y(g), b.za[h] = {
                    node: g,
                    event: e,
                    Yh: d
                }, d += 1)
            })
        }, a.nodes)
    };
    n.Y = function(a) {
        if (a === this.l) return 0;
        var b = this.kb(a),
            c = this.za[b];
        if (Qa(b)) var d = {};
        else(d = this.Sa[b]) ? (this.Sa[b] = null, this.Hb.push(b)) : d = {};
        var e = d.Ue,
            f = d.sd,
            g = d.Ve,
            h = d.Rg,
            k = d.Sg;
        if (c) {
            d = c.event;
            c = c.Yh;
            var l = Jf(this.l) === a;
            h = h || a.nextSibling;
            var m = k || a.previousSibling;
            k = !l && h ? this.kb(h) : null;
            m = !l && m ? this.kb(m) : null;
            l = this.l;
            h = this.options;
            e = this.kb(e || a.parentNode || a.parentElement) || 0;
            var p = f;
            m = void 0 === m ? null : m;
            k = void 0 === k ? null : k;
            p = void 0 === p ? {} : p;
            var r = void 0 === r ? Yf(a) : r;
            if (B(r)) a = void 0;
            else {
                f = {
                    id: b,
                    prev: m !== e ? m : null,
                    next: k !== e ? k : null,
                    parent: e,
                    name: r.toLowerCase(),
                    node: a
                };
                if (Hf(a)) {
                    if (r = tq(a, g), f.attributes = {}, f.content = r)
                        if (a = Wo(l, a)) f.content = "" !== ke(r) ? Xo(l, r) : r, f.hidden = a
                } else r = sq(l, a, h, p, r), g = r.pb, f.attributes = r.lg, g && (f.hidden = g), a.namespaceURI && Na(a.namespaceURI, "svg") && (f.namespace = a.namespaceURI);
                a = f
            }
            if (B(a)) return;
            this.za[b] = null;
            this.Hb.push(b);
            d.result[c] = a;
            d.uc += 1;
            d.nodes.length === d.uc && d.Pc(d.result)
        }
        return b
    };
    n.flush = function() {
        this.aa(!0)
    };
    n.cd = function() {
        this.Hb.length && Rd(this.Hb, this.Jh)(Od(this.l, 30))
    };
    n.aa = function(a) {
        var b = this;
        if (uq(this.l)) {
            var c = bc(this.za);
            c = G(function(d, e) {
                b.za[e] && d.push(b.za[e].node);
                return d
            }, [], c);
            c = Rd(c, this.Y);
            a = a ? Md(u) : Pd(this.l, 20);
            c(a);
            this.nc = mb(function(d) {
                return d.uc !== d.result.length
            }, this.nc)
        }
    };
    var zq = ["input", "change", "keyup", "paste", "cut"];

    function Aq(a, b, c) {
        Z.call(this, a, b, c);
        this.inputs = {};
        this.md = !1;
        this.Bc = this.L.J(this.Bc, "ii");
        this.Cc = this.L.J(this.Cc, "ir");
        this.Kc = this.L.J(this.Kc, "ri");
        this.Tc = this.L.J(this.Tc, "ur");
        this.Cd = this.L.J(this.Cd, "ce");
        this.rc = this.L.J(this.rc, "vc")
    }
    ka(Aq, Z);
    n = Aq.prototype;
    n.start = function() {
        var a = this,
            b = this.G.va();
        this.md = Bq(this);
        M(function(c) {
            c = c.toLowerCase();
            b.F(c, "NA:", D(a.Bc, a));
            b.F(c, "NR:", D(a.Cc, a))
        }, hg);
        this.rb = [this.Ra.F(this.l.document, zq, D(this.Cd, this)), function() {
            M(function(c) {
                c = c.toLowerCase();
                b.ga(c, "NA:", a.Bc);
                b.ga(c, "NR:", a.Cc)
            }, hg);
            M(a.Tc, bc(a.inputs))
        }]
    };
    n.Tc = function(a) {
        var b = this.inputs[a];
        if (b) {
            if (this.md) {
                var c = b.Dh;
                b = b.element;
                c && this.l.Object.defineProperty(b, Cq(b), c)
            }
            delete this.inputs[a]
        }
    };
    n.Cc = function(a) {
        a && this.Tc(a.data.id)
    };
    n.Bc = function(a) {
        a && (a = a.data, this.Kc(a.node, a.id))
    };

    function Cq(a) {
        return eg(a) ? "checked" : "value"
    }
    n.Cd = function(a) {
        if (a = a.target) {
            var b = Cq(a);
            this.rc(a[b], a)
        }
    };
    n.rc = function(a, b) {
        var c = this.Y(b),
            d = this.inputs[c];
        if (!d && (d = this.Kc(d, c), !d)) return;
        var e = d;
        c = e.sg;
        var f = e.value,
            g = Cq(b),
            h = !a || K(typeof a, ["string", "boolean", "number"]);
        e = this.G.Ib().Jd;
        h && a !== f && (f = qq(this.l, b, g, a, this.G.Ib()).value, c ? this.G.T("event", {
            target: this.Y(b),
            checked: !!a
        }, "change") : (c = ip(this.l, b, e), e = c.hb, this.G.T("event", {
            value: f,
            hidden: c.qb && !e,
            target: this.Y(b)
        }, "change")), d.value = a)
    };
    n.Kc = function(a, b) {
        var c = this;
        if (!dp(a) || "__ym_input_override_test" === a.getAttribute("class") || this.inputs[b]) return null;
        var d = eg(a),
            e = Cq(a),
            f = {
                element: a,
                sg: d,
                value: a[e]
            };
        this.inputs[b] = f;
        this.md && ai(this.l, function() {
            var g = c.l.Object.getOwnPropertyDescriptor(Object.getPrototypeOf(a), e) || {},
                h = c.l.Object.getOwnPropertyDescriptor(a, e) || {},
                k = N({}, g, h);
            if (wa("((set)?(\\s?" + e + ")?)?", k.set)) {
                try {
                    c.l.Object.defineProperty(a, e, N({}, k, {
                        configurable: !0,
                        set: function(l) {
                            c.rc(l, this);
                            return k.set.call(this, l)
                        }
                    }))
                } catch (l) {}
                f.Dh =
                    k
            }
        });
        return f
    };

    function Bq(a) {
        var b = !0,
            c = Lf(a.l)("input");
        try {
            c = Lf(a.l)("input");
            c.value = "INPUT_VALUE";
            c.style.setProperty("display", "none", "important");
            c.setAttribute("type", "text");
            c.setAttribute("class", "__ym_input_override_test");
            var d = a.l.Object.getOwnPropertyDescriptor(Object.getPrototypeOf(c), "value") || {},
                e = a.l.Object.getOwnPropertyDescriptor(c, "value") || {},
                f = N({}, d, e);
            a.l.Object.defineProperty(c, "value", N({}, f, {
                configurable: !0,
                set: function(g) {
                    return f.set.call(c, g)
                }
            }));
            "INPUT_VALUE" !== c.value && (b = !1);
            c.value =
                "INPUT_TEST";
            "INPUT_TEST" !== c.value && (b = !1)
        } catch (g) {
            b = !1
        }
        return b
    }

    function Dq(a, b, c) {
        Z.call(this, a, b, c);
        this.Za = {
            width: 0,
            height: 0,
            pageHeight: 0,
            pageWidth: 0,
            orientation: 0
        };
        this.ha.push([
            ["resize"], this.Bh
        ]);
        this.ha.push([
            ["orientationchange"], this.zh
        ])
    }
    ka(Dq, Z);
    Dq.prototype.start = function() {
        Z.prototype.start.call(this);
        this.Cf()
    };
    Dq.prototype.Bh = function() {
        var a = Eq(this);
        if (a.height !== this.Za.height || a.width !== this.Za.width) this.Za = a, Fq(this, a)
    };
    Dq.prototype.zh = function() {
        var a = Eq(this);
        if (this.Za.orientation !== a.orientation) {
            this.Za = a;
            var b = void 0 === b ? this.G.stamp() : b;
            this.G.T("event", {
                width: a.width,
                height: a.height,
                orientation: a.orientation
            }, "deviceRotation", b)
        }
    };

    function Eq(a) {
        var b = a.G.jb(),
            c = q(Tf(a.l)),
            d = c.next().value;
        c = c.next().value;
        b = b.zd();
        return {
            width: d,
            height: c,
            pageWidth: b ? b.scrollWidth : 0,
            pageHeight: b ? b.scrollHeight : 0,
            orientation: a.G.jb().$g()
        }
    }

    function Fq(a, b, c) {
        c = void 0 === c ? a.G.stamp() : c;
        a.G.T("event", {
            width: b.width,
            height: b.height,
            pageWidth: b.pageWidth,
            pageHeight: b.pageHeight
        }, "resize", c)
    }
    Dq.prototype.Cf = function() {
        var a = Eq(this);
        if (a.height && a.width && a.pageWidth && a.pageHeight) {
            var b = this.Za;
            b.height && b.width && b.pageWidth && b.pageHeight || (this.Za = a);
            Fq(this, a, 0)
        } else X(this.l, D(this.Cf, this), 300)
    };

    function Gq(a) {
        this.index = 0;
        this.xb = {};
        this.l = a
    }

    function Hq(a, b, c, d) {
        d = void 0 === d ? {} : d;
        var e = Ed(a.l),
            f = a.index;
        a.index += 1;
        a.xb[f] = {
            Pa: 0,
            Qb: !1,
            fn: b,
            Yc: [],
            Od: e(Ad)
        };
        return function() {
            var g = Ha(arguments),
                h = d.Se && !a.xb[f].Qb,
                k = a.xb[f];
            rg(a.l, k.Pa);
            k.Yc = g;
            k.Qb = !0;
            var l = e(Ad);
            if (h || l - k.Od >= c) b.apply(null, ca(g)), k.Od = l;
            k.Pa = X(a.l, function() {
                h || (b.apply(null, ca(g)), k.Od = e(Ad));
                k.Qb = !1;
                k.Yc = []
            }, c, "th")
        }
    }
    Gq.prototype.flush = function() {
        var a = this;
        M(function(b) {
            var c = a.xb[b],
                d = c.Pa,
                e = c.fn,
                f = c.Yc;
            c.Qb && (a.xb[b].Qb = !1, e.apply(null, ca(f)), rg(a.l, d))
        }, bc(this.xb))
    };

    function Iq(a, b, c) {
        Z.call(this, a, b, c);
        this.Rf = [];
        this.Ee = {
            x: 0,
            y: 0
        };
        this.Ba = new Gq(a);
        this.Fc = this.L.J(this.Fc, "o");
        this.ha.push([
            ["scroll"], this.Ch
        ])
    }
    ka(Iq, Z);
    n = Iq.prototype;
    n.start = function() {
        Z.prototype.start.call(this);
        this.G.T("event", {
            x: Math.max(this.l.scrollX, 0),
            y: Math.max(this.l.scrollY, 0),
            page: !0,
            target: -1
        }, "scroll", 0)
    };
    n.stop = function() {
        Z.prototype.stop.call(this);
        this.Ba.flush()
    };
    n.Ch = function(a) {
        if (this.G.jb().cf()) this.Fc(a);
        else {
            var b = a.target,
                c = mb(function(d) {
                    return q(d).next().value === b
                }, this.Rf).pop();
            if (c)(0, c[1])(a);
            else c = Hq(this.Ba, D(this.Fc, this), 100, {
                Se: !0
            }), this.Rf.push([b, c]), c(a)
        }
    };
    n.Fc = function(a) {
        var b = this.G.jb().zd();
        a = a.target;
        var c = this.Jb(a);
        b = b === a || this.l === a || this.l.document === a;
        var d = Math.max(c.left, 0);
        c = Math.max(c.top, 0);
        if (b) {
            if (this.Ee.x === d && this.Ee.y === c) return;
            this.Ee = {
                x: d,
                y: c
            }
        }
        this.G.T("event", {
            x: d,
            y: c,
            page: b,
            target: b ? -1 : this.Y(a)
        }, "scroll")
    };
    n.Jb = function(a) {
        var b = {
            left: 0,
            top: 0
        };
        if (!a) return b;
        if (a.window === a) return {
            top: a.scrollY || 0,
            left: a.scrollX || 0
        };
        var c = a.ownerDocument || a,
            d = a.documentElement,
            e = c.defaultView || c.parentWindow,
            f = c.body;
        return a !== c || (a = this.G.jb().zd(), a) ? K(a, [d, f]) ? {
            top: a.scrollTop || e.scrollY,
            left: a.scrollLeft || e.scrollX
        } : {
            top: a.scrollTop || 0,
            left: a.scrollLeft || 0
        } : b
    };
    var Jq = ["mousemove", "mousedown", "mouseup", "click"];

    function Kq(a, b, c) {
        Z.call(this, a, b, c);
        this.ha.push([Jq, this.yh]);
        this.Ba = new Gq(a);
        this.Ac = this.L.J(this.Ac, "n");
        this.Sh = this.L.J(Hq(this.Ba, D(this.Ac, this), 100), "t")
    }
    ka(Kq, Z);
    Kq.prototype.stop = function() {
        Z.prototype.stop.call(this);
        this.Ba.flush()
    };
    Kq.prototype.yh = function(a) {
        var b = null;
        try {
            b = a.type
        } catch (c) {
            return
        }
        "mousemove" === b ? this.Sh(a) : this.Ac(a)
    };
    Kq.prototype.Ac = function(a) {
        var b = a.type,
            c = void 0 === a.clientX ? null : a.clientX,
            d = void 0 === a.clientY ? null : a.clientY;
        a = a.target || this.l.document.elementFromPoint(c, d);
        this.G.T("event", {
            x: c || 0,
            y: d || 0,
            target: this.Y(a)
        }, b)
    };
    var Lq = ["focus", "blur"];

    function Mq(a, b, c) {
        Z.call(this, a, b, c);
        this.ha.push([Lq, this.Qg])
    }
    ka(Mq, Z);
    Mq.prototype.Qg = function(a) {
        var b = a.target;
        a = a.type;
        this.G.T("event", {
            target: this.Y(b === this.l ? this.l.document.documentElement : b)
        }, a)
    };
    var Nq = H(x(function(a) {
            var b = xa(a.getSelection, "getSelection");
            return b ? D(b, a) : u
        }), Qe),
        Oq = ["mousemove", "touchmove", "mousedown", "touchdown", "select"],
        Pq = /text|search|password|tel|url/;

    function Qq(a, b, c) {
        Z.call(this, a, b, c);
        this.Fd = !1;
        this.ha.push([Oq, this.fh])
    }
    ka(Qq, Z);
    Qq.prototype.fh = function(a) {
        var b = this.G,
            c = a.type,
            d = a.which;
        a = a.target;
        if ("mousemove" !== c || 1 === d) {
            if ("select" === c) a: {
                if (Pq.test(a.type || "") && (c = this.Y(a), !B(c))) {
                    c = {
                        start: a.selectionStart,
                        end: a.selectionEnd,
                        target: c
                    };
                    break a
                }
                c = void 0
            }
            else a: {
                if ((c = Nq(this.l)) && 0 < c.rangeCount && (c = c.getRangeAt(0) || this.l.document.createRange(), d = this.Y(c.startContainer), a = this.Y(c.endContainer), !B(d) && !B(a))) {
                    c = {
                        start: c.startOffset,
                        end: c.endOffset,
                        startNode: d,
                        endNode: a
                    };
                    break a
                }
                c = void 0
            }
            c && c.start !== c.end ? (this.Fd = !0, b.T("event", c, "selection")) : this.Fd && (this.Fd = !1, b.T("event", {
                start: 0,
                end: 0
            }, "selection"))
        }
    };
    var Rq = {},
        Sq = (Rq.focus = "windowfocus", Rq.blur = "windowblur", Rq.pageshow = "windowfocus", Rq.pagehide = "windowblur", Rq);

    function Tq(a, b, c) {
        Z.call(this, a, b, c);
        this.visibility = null;
        B(this.l.document.hidden) ? B(this.l.document.msHidden) ? B(this.l.document.webkitHidden) || (this.visibility = {
            hidden: "webkitHidden",
            event: "webkitvisibilitychange"
        }) : this.visibility = {
            hidden: "msHidden",
            event: "msvisibilitychange"
        } : this.visibility = {
            hidden: "hidden",
            event: "visibilitychange"
        };
        this.Bd = this.L.J(this.Bd, "fbe");
        this.Dd = this.L.J(this.Dd, "she")
    }
    ka(Tq, Z);
    Tq.prototype.start = function() {
        this.rb = [this.Ra.F(this.l, this.visibility ? [this.visibility.event] : ["focus", "blur"], D(this.Bd, this))];
        "onpagehide" in this.l && this.rb.push(this.Ra.F(this.l, ["pageshow", "pagehide"], D(this.Dd, this), null))
    };
    Tq.prototype.Dd = function(a) {
        this.G.T("event", {}, Sq[a.type])
    };
    Tq.prototype.Bd = function(a) {
        this.visibility ? this.G.T("event", {}, Sq[this.l.document[this.visibility.hidden] ? "blur" : "focus"]) : this.G.T("event", {}, Sq[a.type])
    };

    function Uq() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
    }

    function Vq() {
        return Uq() + Uq() + "-" + Uq() + "-" + Uq() + "-" + Uq() + "-" + Uq() + Uq() + Uq()
    }
    var Wq = ["touchmove", "touchstart", "touchend", "touchcancel", "touchforcechange"];

    function Xq(a, b, c) {
        Z.call(this, a, b, c);
        this.Sc = {};
        this.scrolling = !1;
        this.Bf = 0;
        this.ha.push([
            ["scroll"], this.Nh, this.l.document
        ]);
        this.ha.push([Wq, this.Uh, this.l.document]);
        this.Ba = new Gq(a);
        this.Mb = this.L.J(this.Mb, "nh");
        this.Th = this.L.J(Hq(this.Ba, this.Mb, this.G.jb().cf() ? 0 : 50, {
            Se: !0
        }), "th")
    }
    ka(Xq, Z);
    Xq.prototype.Nh = function() {
        var a = this;
        this.scrolling = !0;
        rg(this.l, this.Bf);
        this.Bf = X(this.l, function() {
            a.scrolling = !1
        }, 150)
    };
    Xq.prototype.Uh = function(a) {
        var b = this,
            c = "touchcancel" === a.type || "touchend" === a.type;
        a.changedTouches && 0 < a.changedTouches.length && M(function(d) {
            b.Sc[d.identifier] || (b.Sc[d.identifier] = Vq());
            d.__ym_touch_id = b.Sc[d.identifier];
            c && delete b.Sc[d.identifier]
        }, ub(a.changedTouches));
        "touchmove" === a.type ? this.scrolling ? this.Mb(a) : this.Th(a, this.G.stamp()) : this.Mb(a)
    };
    Xq.prototype.Mb = function(a, b) {
        b = void 0 === b ? this.G.stamp() : b;
        var c = a.type,
            d = M(function(e) {
                return {
                    id: e.__ym_touch_id,
                    x: Math.round(e.clientX),
                    y: Math.round(e.clientY),
                    force: e.force
                }
            }, ub(a.changedTouches));
        0 < d.length && this.G.T("event", {
            touches: d,
            target: this.Y(a.target)
        }, c, b)
    };

    function Yq(a, b, c) {
        Z.call(this, a, b, c);
        this.ha.push([
            ["load"], this.xh, this.l.document
        ])
    }
    ka(Yq, Z);
    Yq.prototype.xh = function(a) {
        a = a.target;
        "IMG" === Yf(a) && a.getAttribute("srcset") && this.G.T("mutation", {
            target: this.Y(a),
            attributes: {
                src: a.currentSrc
            }
        }, "ac")
    };

    function Zq(a, b, c) {
        Z.call(this, a, b, c);
        this.Yf = 1;
        this.Ba = new Gq(a);
        this.bc = this.L.J(this.bc, "z")
    }
    ka(Zq, Z);
    Zq.prototype.start = function() {
        if ($q(this)) {
            Z.prototype.start.call(this);
            this.bc();
            var a = this.Ra.F(J(this.l, "visualViewport"), ["resize"], Hq(this.Ba, this.bc, 10));
            this.rb.push(a)
        }
    };
    Zq.prototype.stop = function() {
        Z.prototype.stop.call(this);
        this.Ba.flush()
    };
    Zq.prototype.bc = function() {
        var a = $q(this);
        if (a && a !== this.Yf) {
            this.Yf = a;
            var b = Uf(this.l);
            this.G.T("event", {
                x: b.x,
                y: b.y,
                level: a
            }, "zoom")
        }
    };

    function $q(a) {
        return (a = Sf(a.l)) ? a[2] : null
    }
    var ar = {
            91: "super",
            93: "super",
            224: "super",
            18: "alt",
            17: "ctrl",
            16: "shift",
            9: "tab",
            8: "backspace",
            46: "delete"
        },
        br = {
            Pi: 1,
            ti: 2,
            alt: 3,
            shift: 4,
            Ri: 5,
            "delete": 6,
            pi: 6
        },
        cr = [4, 9, 8, 32, 37, 38, 39, 40, 46],
        dr = {},
        er = (dr["1"] = {
            91: "&#8984;",
            93: "&#8984;",
            224: "&#8984;",
            18: "&#8997;",
            17: "&#8963;",
            16: "&#8679;",
            9: "&#8677;",
            8: "&#9003;",
            46: "&#9003;"
        }, dr["2"] = {
            91: "&#xff;",
            93: "&#xff;",
            224: "&#xff;",
            18: "Alt",
            17: "Ctrl",
            16: "Shift",
            9: "Tab",
            8: "Backspace",
            46: "Delete"
        }, dr.sh = {
            32: "SPACEBAR",
            37: "&larr;",
            38: "&uarr;",
            39: "&rarr;",
            40: "&darr;",
            13: "Enter"
        }, dr),
        fr = /flash/,
        gr = /ym-disable-keys/,
        hr = /^&#/;

    function ir(a, b, c) {
        Z.call(this, a, b, c);
        this.mb = {};
        this.Na = 0;
        this.Ea = [];
        this.Nf = [];
        this.uf = this.kc = 0;
        this.ha.push([
            ["keydown"], this.bh
        ]);
        this.ha.push([
            ["keyup"], this.dh
        ]);
        this.gg = -1 !== Ma(J(a, "navigator.appVersion") || "", "Mac") ? "1" : "2";
        this.yc = this.L.J(this.yc, "v");
        this.od = this.L.J(this.od, "ec");
        this.Oc = this.L.J(this.Oc, "sk");
        this.xd = this.L.J(this.xd, "gk");
        this.oe = this.L.J(this.oe, "sc");
        this.$b = this.L.J(this.$b, "cc");
        this.reset = this.L.J(this.reset, "r");
        this.Lc = this.L.J(this.Lc, "rs")
    }
    ka(ir, Z);
    n = ir.prototype;
    n.bh = function(a) {
        if (this.yc(a) && (!a.target || "INPUT" !== a.target.nodeName || !a.shiftKey && 32 !== a.keyCode && "shift" !== ar[a.keyCode])) {
            var b = a.keyCode;
            a.repeat || this.mb[b] || (this.mb[a.keyCode] = !0, ar[a.keyCode] && !this.Na ? (this.Na += 1, this.oe(a), this.reset(300)) : this.Na ? (rg(this.l, this.uf), jr(this, a), this.od()) : (this.reset(), jr(this, a)))
        }
    };
    n.dh = function(a) {
        if (this.yc(a)) {
            var b = a.keyCode,
                c = ar[a.keyCode];
            this.mb[a.keyCode] && (this.mb[b] = !1);
            c && this.Na && (this.Na = 0, this.mb = {});
            1 === this.Ea.length && (a = q(this.Ea).next().value, K(a.keyCode, cr) && (this.Oc([a], !0), this.reset()));
            this.Ea = mb(H(cb("keyCode"), ra(b), Ea), this.Ea);
            rg(this.l, this.kc)
        }
    };
    n.yc = function(a) {
        var b = this.l.document.activeElement;
        b = b && "OBJECT" === b.nodeName && fr.test(b.getAttribute("type") || "");
        a = a.target;
        if (!a) return !b;
        a = "INPUT" === a.nodeName && "password" === a.getAttribute("type") && gr.test(a.className);
        return !b && !a
    };
    n.od = function() {
        this.Nf = this.Ea.slice(0);
        rg(this.l, this.kc);
        this.kc = X(this.l, F(this.Nf, D(this.Oc, this)), 0, "e.c")
    };
    n.Oc = function(a, b) {
        if (1 < a.length || (void 0 === b ? 0 : b)) {
            var c = this.xd(a);
            this.G.T("event", {
                keystrokes: c
            }, "keystroke")
        }
    };
    n.xd = function(a) {
        var b = this;
        a = M(function(c) {
            c = c.keyCode;
            var d = ar[c],
                e = er[b.gg][c] || er.sh[c] || String.fromCharCode(c);
            return {
                id: c,
                key: e,
                isMeta: !!d && hr.test(e),
                modifier: d
            }
        }, a);
        return sl(function(c, d) {
            return (br[c.modifier] || 100) - (br[d.modifier] || 100)
        }, a)
    };

    function jr(a, b) {
        K(b, a.Ea) || a.Ea.push(b)
    }
    n.oe = function(a) {
        jr(this, a);
        this.$b()
    };
    n.$b = function() {
        this.Na ? X(this.l, this.$b, 100) : this.Ea = []
    };
    n.reset = function(a) {
        a ? this.uf = X(this.l, D(this.Lc, this), a) : this.Lc()
    };
    n.Lc = function() {
        this.Na = 0;
        this.Ea = [];
        this.mb = {};
        rg(this.l, this.kc)
    };
    var kr = ["sr", "sd", "\u043d"];

    function lr(a) {
        return !B(a.frameId) && !B(a.data)
    }

    function mr(a, b, c) {
        b || md(hf());
        b.postMessage(yf(a, c), "*")
    }

    function nr(a, b) {
        try {
            return Je(H(cb("contentWindow"), ra(b)), ub(a.document.querySelectorAll("iframe")))
        } catch (c) {
            return null
        }
    }

    function or(a, b, c) {
        var d = Dg(a),
            e = ud(a),
            f = wc(a),
            g = b.wd(),
            h = !J(a, "postMessage") || f && !J(a, "parent.postMessage"),
            k = F(d, w);
        if (h) {
            if (!g) return X(a, D(d.$, d, "i", {
                ia: !1
            }), 10), {
                vd: k,
                Df: u,
                stop: u
            };
            md(hf())
        }
        d.F(["sr"], function(t) {
            if (y(t.origin) && !B(t.source)) {
                var v = nr(a, t.source);
                if (v) {
                    var z = {};
                    mr(a, t.source, (z.type = "\u043d", z.frameId = b.va().Y(v), z))
                }
            }
        });
        d.F(["sd"], function(t) {
            if (y(t.origin) && !B(t.source)) {
                var v = t.data;
                t = t.source;
                (a === t || nr(a, t)) && d.$("sdr", {
                    data: v.data,
                    frameId: v.frameId
                })
            }
        });
        if (f && !g) {
            var l = !1,
                m = 0,
                p = function() {
                    var t = {};
                    mr(a, a.parent, (t.type = "sr", t));
                    m = X(a, p, 100, "if.i")
                };
            p();
            var r = function(t) {
                if (y(t.origin) && !B(t.source)) {
                    d.ga(["\u043d"], r);
                    rg(a, m);
                    var v = qh(a, t.origin).host;
                    l || t.source !== a.parent || !t.data.frameId || "about:blank" !== U(a).host && !K(v, c) || (l = !0, d.$("i", {
                        frameId: t.data.frameId,
                        ia: !0
                    }))
                }
            };
            d.F(["\u043d"], r);
            X(a, function() {
                d.ga(["\u043d"], r);
                rg(a, m);
                l || (l = !0, d.$("i", {
                    ia: !1
                }))
            }, 2E3, "if.r")
        }
        e = e.F(a, ["message"], function(t) {
            var v = xf(a, t.data);
            v && v.type && K(v.type, kr) && d.$(v.type, {
                data: v,
                source: t.source,
                origin: t.origin
            })
        });
        return {
            vd: k,
            Df: function(t) {
                var v = {};
                return mr(a, a.parent, (v.frameId = b.wd(), v.data = t, v.type = "sd", v))
            },
            stop: e
        }
    }
    var pr = /allow-same-origin/;

    function qr(a, b, c) {
        Z.call(this, a, b, c);
        this.Tb = [];
        this.ud = {};
        this.Xd = this.L.J(this.Xd, "fi");
        this.Yd = this.L.J(this.Yd, "sd");
        this.Zd = this.L.J(this.Zd, "src");
        this.oa = new a.MutationObserver(this.Zd)
    }
    ka(qr, Z);
    n = qr.prototype;
    n.start = function() {
        Z.prototype.start.call(this);
        this.G.Ib().cc && this.G.va().F("iframe", "NA:", D(this.Xd, this));
        this.G.We().vd().F(["sdr"], D(this.Yd, this))
    };
    n.stop = function() {
        Z.prototype.stop.call(this);
        M(function(a) {
            a.G.stop()
        }, this.Tb)
    };
    n.Zd = function(a) {
        var b = a.pop().target;
        if (a = Je(function(d) {
                return d.bf === b
            }, this.Tb)) {
            this.Tb = mb(function(d) {
                return d.bf !== b
            }, this.Tb);
            var c = a.G.wd();
            try {
                a.G.stop()
            } catch (d) {}
            this.fc(b, c)
        }
    };
    n.Xd = function(a) {
        if (a) {
            var b = a.data.node;
            this.oa.observe(b, {
                attributes: !0,
                attributeFilter: ["src"]
            });
            this.fc(b, a.data.id)
        }
    };
    n.fc = function(a, b) {
        var c = this;
        rr(this, a) && Bg(this.l, a)(ug(u, function() {
            var d = c.G.fc(a.contentWindow, b);
            c.Tb.push({
                G: d,
                bf: a
            })
        }))
    };
    n.Yd = function(a) {
        var b = this;
        if (lr(a)) {
            var c = a.frameId;
            a = a.data;
            this.ud[c] || (this.ud[c] = {
                data: []
            });
            var d = this.ud[c];
            d.data = d.data.concat(a);
            this.l.isNaN(d.ld) && M(function(e) {
                "page" === e.type && (d.ld = e.data.recordStamp - b.G.Xe())
            }, d.data);
            this.l.isNaN(d.ld) || (this.G.aa(M(function(e) {
                e.stamp += d.ld;
                e.stamp = b.l.Math.max(0, e.stamp);
                return e
            }, d.data)), d.data = [])
        }
    };

    function rr(a, b) {
        var c = b.getAttribute("src"),
            d = b.getAttribute("sandbox");
        return b.getAttribute("_ym_ignore") || d && !d.match(pr) || c && "about:blank" !== c && (c = qh(a.l, c).host) && U(a.l).host !== c ? !1 : J(b, "contentWindow.location.href")
    }
    var sr = x(function(a) {
        var b = J(a, "sessionStorage");
        if (!b) return null;
        try {
            var c = b.getItem("__ym_tab_guid");
            b = !1;
            var d = J(a, "opener.sessionStorage");
            try {
                b = !!d && c === d.getItem("__ym_tab_guid")
            } catch (e) {
                b = !0
            }
            if (!c || b) c = Vq(), a.sessionStorage.setItem("__ym_tab_guid", c);
            return c
        } catch (e) {
            return null
        }
    });

    function tr(a, b, c) {
        Z.call(this, a, b, c);
        this.je = this.L.J(this.je, "ps")
    }
    ka(tr, Z);
    tr.prototype.start = function() {
        this.G.va().sc({
            nodes: [this.l.document.documentElement],
            Pc: this.je
        })
    };
    tr.prototype.je = function(a) {
        var b = this.G.ah(),
            c = b.Vg(),
            d = U(this.l),
            e = d.host,
            f = d.protocol;
        d = d.pathname;
        var g = q(Tf(this.l)),
            h = g.next().value;
        g = g.next().value;
        this.G.T("page", {
            content: M(function(k) {
                k.node = void 0;
                return k
            }, a),
            base: c || "",
            hasBase: !!c,
            viewport: {
                width: h,
                height: g
            },
            title: this.l.document.title,
            doctype: b.Xg() || "",
            address: this.l.location.href,
            ua: Ab(this.l) || "",
            referrer: this.l.document.referrer,
            screen: {
                width: this.l.screen.width,
                height: this.l.screen.height
            },
            location: {
                host: e,
                protocol: f,
                path: d
            },
            recordStamp: this.G.Xe(),
            tabId: sr(this.l)
        }, "page", 0)
    };
    var ur = ["addRule", "removeRule", "insertRule", "deleteRule"];

    function vr(a, b, c) {
        Z.call(this, a, b, c);
        this.bb = {};
        this.Ub = {};
        this.Ie = 0;
        this.Dc = this.L.J(this.Dc, "a");
        this.vb = this.L.J(this.vb, "sr");
        this.Ec = this.L.J(this.Ec, "r");
        this.aa = this.L.J(this.aa, "d")
    }
    ka(vr, Z);
    n = vr.prototype;
    n.start = function() {
        var a = this.G.va();
        a.F("style", "NA:", this.Dc);
        a.F("style", "NR:", this.Ec);
        this.aa()
    };
    n.stop = function() {
        var a = this;
        Z.prototype.stop.call(this);
        var b = this.G.va();
        b.ga("style", "NA:", this.Dc);
        b.ga("style", "NR:", this.Ec);
        this.aa();
        rg(this.l, this.Ie);
        M(function(c) {
            a.bb[c].sheet && wr(a, a.bb[c].sheet)
        }, bc(this.bb));
        this.bb = {}
    };
    n.aa = function() {
        var a = this;
        M(function(b) {
            b = q(b);
            var c = b.next().value;
            b = b.next().value;
            if (b.length) {
                for (var d = [], e = b[0].stamp, f = [], g = 0; g < b.length; g += 1) {
                    var h = b[g],
                        k = h.stamp;
                    delete h.stamp;
                    k <= e + 50 ? d.push(h) : (f.push(d), e = k, d = [h])
                }
                d.length && f.push(d);
                f.length && M(function(l) {
                    a.G.T("event", {
                        target: Ub(c),
                        changes: l
                    }, "stylechange", e)
                }, f);
                delete a.Ub[c]
            }
        }, ac(this.Ub));
        this.Ie = X(this.l, this.aa, 100)
    };
    n.vb = function(a, b) {
        this.Ub[a] || (this.Ub[a] = []);
        this.Ub[a].push(b)
    };

    function xr(a, b, c) {
        var d = b.addRule,
            e = b.removeRule,
            f = b.insertRule,
            g = b.deleteRule;
        A(d) && (b.addRule = function(h, k, l) {
            var m = a.G.stamp(),
                p = d.call(b, h, k, l);
            a.vb(c, {
                op: "a",
                stamp: m,
                style: h + "{" + k + "}",
                index: l
            });
            return p
        });
        A(e) && (b.removeRule = function(h) {
            var k = a.G.stamp(),
                l = e.call(b, h);
            a.vb(c, {
                op: "r",
                stamp: k,
                index: h
            });
            return l
        });
        A(f) && (b.insertRule = function(h, k) {
            var l = a.G.stamp(),
                m = f.call(b, h, k);
            a.vb(c, {
                op: "a",
                stamp: l,
                index: k,
                style: h
            });
            return m
        });
        A(g) && (b.deleteRule = function(h) {
            var k = a.G.stamp(),
                l = g.call(b, h);
            a.vb(c, {
                op: "r",
                stamp: k,
                index: h
            });
            return l
        })
    }

    function wr(a, b) {
        M(function(c) {
            var d = a.l.CSSStyleSheet.prototype[c];
            A(d) && (b[c] = D(d, b))
        }, ur)
    }
    n.Dc = function(a) {
        var b = a.data;
        a = b.id;
        b = b.node;
        if (b.sheet && !b.getAttribute("src") && !b.innerText) {
            var c = b.sheet;
            try {
                var d = c.cssRules || c.rules
            } catch (g) {
                d = null
            }
            if (d && d.length) {
                for (var e = [], f = 0; f < d.length; f += 1) e.push({
                    style: d[f].cssText,
                    index: f,
                    op: "a"
                });
                this.G.T("event", {
                    changes: e,
                    target: a
                }, "stylechange")
            }
            xr(this, c, a);
            this.bb[a] = b
        }
    };
    n.Ec = function(a) {
        a = a.data.id;
        var b = this.bb[a];
        b && (delete this.bb[a], b.sheet && wr(this, b.sheet))
    };
    var yr = [
        [vr, "ss"],
        [Aq, "in"],
        [wq, "mu"],
        [Dq, "r"],
        [Iq, "sc"],
        [Kq, "mo"],
        [Mq, "f"],
        [Qq, "se"],
        [Tq, "wf"],
        [Xq, "t"],
        [Yq, "src"],
        [Zq, "z"],
        [ir, "ks"]
    ];
    yr.push([qr, "if"]);
    yr.push([tr, "pa"]);
    var zr = x(function(a) {
        var b = a.document;
        return {
            zd: function() {
                if (b.scrollingElement) return b.scrollingElement;
                var c = 0 === La(b.compatMode, "CSS1") ? b.documentElement : b.body;
                return J(b, "documentElement.scrollHeight") >= J(b, "body.scrollHeight") ? c : null
            },
            $g: function() {
                var c = a.screen;
                if (!c) return 0;
                var d = Je(F(c, J), ["orientation", "mozOrientation", "msOrientation"]);
                return J(c, d + ".angle") || 0
            },
            Fi: F(a, wc),
            cf: F(a, qc),
            Ei: F(a, ic)
        }
    });

    function Ar(a) {
        return {
            Vg: function() {
                var b = a.document.querySelector("base[href]");
                return b ? b.getAttribute("href") : null
            },
            Xg: function() {
                if (a.document.doctype) {
                    var b = N({
                            name: "html",
                            publicId: "",
                            systemId: ""
                        }, a.document.doctype),
                        c = b.publicId,
                        d = b.systemId;
                    return "<!DOCTYPE " + T("", [b.name, c ? ' PUBLIC "' + c + '"' : "", !c && d ? " SYSTEM" : "", d ? ' "' + d + '"' : ""]) + ">"
                }
                return null
            }
        }
    }

    function Br(a, b) {
        var c = this;
        this.Lb = 0;
        this.hc = [];
        this.Kb = null;
        this.ia = this.Xb = this.Lf = !1;
        this.recordStamp = 0;
        this.stopped = !1;
        this.ah = function() {
            return c.page
        };
        this.wd = function() {
            return c.Lb
        };
        this.Xe = function() {
            return c.recordStamp
        };
        this.Zg = function() {
            return c.Ra
        };
        this.We = function() {
            return c.Kb
        };
        this.va = function() {
            return c.Gd
        };
        this.stamp = function() {
            return c.te ? c.l.Math.max(c.te(Ad) - c.recordStamp, 0) : 0
        };
        this.Ib = function() {
            return c.options
        };
        this.jb = function() {
            return c.ng
        };
        this.T = function(e, f, g, h) {
            h = void 0 ===
                h ? c.stamp() : h;
            c.aa([{
                type: e,
                data: f,
                stamp: h,
                frameId: c.Lb,
                event: g
            }])
        };
        this.aa = function(e) {
            c.Lf && !c.Xb ? c.ia ? c.We().Df(M(function(f) {
                return f.frameId ? f : N(f, {
                    frameId: c.Lb
                })
            }, e)) : c.Rb(e) : c.hc = c.hc.concat(e)
        };
        this.l = a;
        var d = vq(a, this, "R");
        this.pe = d.J(this.pe, "s");
        this.aa = d.J(this.aa, "sd");
        d = Q(a);
        d.C("wv2e") && jf();
        d.D("wv2e", !0);
        this.options = b;
        this.Ra = ud(a);
        this.Gd = new yq(this.l, b);
        this.ng = zr(a);
        this.Ke = M(function(e) {
            var f = q(e);
            e = f.next().value;
            f = f.next().value;
            return new e(a, c, f)
        }, yr);
        Cr(this);
        this.page =
            Ar(this.l);
        this.pe()
    }
    Br.prototype.start = function(a) {
        this.Lf = !0;
        this.Rb = a;
        a = xb(this.hc);
        this.aa(a)
    };
    Br.prototype.stop = function() {
        this.stopped || (this.stopped = !0, uq(this.l) && (M(function(a) {
            return a.stop()
        }, this.Ke), this.Gd.stop(), this.Kb && this.Kb.stop(), this.ia || this.T("event", {}, "eof")))
    };
    Br.prototype.fc = function(a, b) {
        var c = new Br(a, N({}, this.options, {
            frameId: b
        }));
        c.start(u);
        return c
    };

    function Cr(a) {
        a.ia = !!a.options.frameId;
        a.Lb = a.options.frameId || 0;
        a.Xb = !a.ia;
        var b = a.options.Vf || [];
        b.push(U(a.l).host);
        a.Kb = or(a.l, a, b);
        b = a.Kb.vd();
        wc(a.l) ? a.Xb && b.F(["i"], function(c) {
            if (!1 === c.ia || !0 === c.ia) a.ia = c.ia, a.Xb = !1, c.frameId && (a.Lb = c.frameId), c = xb(a.hc), a.aa(c)
        }) : (a.ia = !1, a.Xb = !1)
    }
    Br.prototype.pe = function() {
        this.te = zd(this.l);
        this.recordStamp = this.te(Ad);
        M(function(a) {
            a.start()
        }, this.Ke);
        this.Gd.start()
    };

    function Dr(a, b, c) {
        var d = this;
        this.$c = this.Nb = !1;
        this.Xa = [];
        this.jf = [];
        this.Oe = [];
        this.send = function(e, f, g) {
            e = d.sender(e, d.Ag);
            f && g && e.then(f, g);
            return e
        };
        this.se = function(e, f, g) {
            return new S(function(h, k) {
                e.push([f, h, k, g])
            })
        };
        this.gh = function() {
            d.Xa = sl(function(g, h) {
                return g[3].partNum - h[3].partNum
            }, d.Xa);
            var e = G(function(g, h, k) {
                    h = h[3];
                    return g && k + 1 === h.partNum
                }, !0, d.Xa),
                f = !!d.Xa[d.Xa.length - 1][3].end;
            return e && f
        };
        this.rd = function(e) {
            mq(d.l, e.slice(), function(f) {
                var g = q(f);
                f = g.next().value;
                var h =
                    g.next().value;
                g = g.next().value;
                d.send(f, h, g)
            }, 20, "s.w2.sf.fes");
            xb(e)
        };
        this.Pg = function() {
            d.$c || (d.$c = !0, d.rd(d.jf), d.rd(d.Oe))
        };
        this.qg = function(e) {
            return G(function(f, g) {
                var h = "page" === g.type && !g.frameId,
                    k = "eof" === g.event,
                    l = h && !!g.partNum;
                return {
                    fd: f.fd || l,
                    ed: f.ed || h,
                    dd: f.dd || k
                }
            }, {
                ed: !1,
                dd: !1,
                fd: !1
            }, e)
        };
        this.eh = function(e, f, g) {
            g ? (e = d.se(d.Xa, e, f[0]), d.gh() && (d.rd(d.Xa), d.Nb = !0)) : (d.Nb = !0, e = d.send(e));
            return e
        };
        this.Ye = function(e, f, g) {
            var h = {};
            f = {
                H: (h["wv-part"] = "" + g, h["wv-type"] = d.Oh, h),
                K: Le(),
                N: {
                    ba: f
                }
            };
            e && f.K.D("bt", 1);
            return f
        };
        this.Kg = function(e, f, g) {
            e = d.Ye(!1, e, g);
            return d.Nb ? d.send(e) : d.se(d.Oe, e, f)
        };
        this.th = function(e, f, g) {
            e = d.Ye(!0, e, g);
            if (d.Nb) return d.send(e);
            var h = d.qg(f);
            g = h.ed;
            var k = h.dd;
            h = h.fd;
            var l;
            g && (l = d.eh(e, f, h));
            d.$c ? g || (l = d.send(e)) : (g || (l = d.se(d.jf, e, f)), (d.Nb || k) && d.Pg());
            return l
        };
        this.l = a;
        this.Oh = c;
        this.sender = Rh(a, "W", b);
        this.Ag = b
    }

    function Er() {
        var a = G(function(b, c) {
            var d = q(c),
                e = d.next().value;
            d = d.next().value;
            b[e] = {
                bd: 0,
                pg: 1 / d
            };
            return b
        }, {}, [
            ["blur", .0034],
            ["change", .0155],
            ["click", .01095],
            ["deviceRotation", 2E-4],
            ["focus", .0061],
            ["mousemove", .5132],
            ["scroll", .4795],
            ["selection", .0109],
            ["touchcancel", 2E-4],
            ["touchend", .0265],
            ["touchforcechange", .0233],
            ["touchmove", .1442],
            ["touchstart", .027],
            ["zoom", .0014]
        ]);
        return {
            kg: function(b) {
                if (b.length) return {
                    type: "activity",
                    data: G(function(c, d) {
                            var e = a[d];
                            return Math.round(c + e.bd * e.pg)
                        },
                        0, bc(a))
                }
            },
            vg: function(b) {
                b && (b = b.event) && (b = a[b]) && (b.bd += 1)
            }
        }
    }
    var Fr = x(function(a) {
            var b = Q(a),
                c = b.C("isEU");
            if (B(c)) {
                var d = Ub(se(a, "is_gdpr") || "");
                if (K(d, [0, 1])) b.D("isEU", d), c = !!d;
                else if (a = Ff(a).C("wasSynced"), a = J(a, "params.eu")) b.D("isEU", a), c = !!a
            }
            return c
        }, function(a) {
            return Q(a).C("isEU")
        }),
        Gr = W("i.e", Fr),
        Hr = W("i.ep", function(a) {
            Fr(a)
        });

    function Ir(a, b) {
        var c = Ff(a),
            d = "wv2rf:" + O(b),
            e = b.cc,
            f = Gr(a),
            g = c.C(d),
            h = b.Zh;
        return B(f) || Qa(g) ? ta(function(k, l) {
            Wh(b, function(m) {
                var p = !!J(m, "settings.webvisor.forms");
                p = !J(m, "settings.x3") && p;
                f = Gr(a) || J(m, "settings.eu");
                c.D(d, ib(p));
                l({
                    cc: e,
                    Jd: !!f,
                    sf: p,
                    Vf: h
                })
            })
        }) : Ag({
            cc: e,
            Jd: f,
            sf: !!Ub(g),
            Vf: h
        })
    }
    var Jr = W("w2", function(a, b) {
            function c() {
                h = !0
            }
            var d = Q(a),
                e = O(b);
            if (!b.zb || hc(a) || !a.MutationObserver || !wa("Element", a.Element)) return u;
            wa("MutationObserver", a.MutationObserver) || Yh(a, e).warn("w2mo");
            var f = ta(function(k, l) {
                    Wh(b, l)["catch"](k)
                }),
                g = Bg(a)(wg(E([a, b], Ir)))(vg(function(k) {
                    return new Br(a, k)
                })),
                h = !1;
            yg([g, f])(ug(V(a, "wv2.R.c"), function(k) {
                k = q(k);
                var l = k.next().value;
                k = k.next().value;
                if (!h) {
                    c = D(l.stop, l);
                    var m = d.C("wv2Counter");
                    if (!Qo(a, k) || m) c();
                    else if (d.D("wv2Counter", e), d.D("stopRecorder",
                            c), k = bo(a, "7", "6")) {
                        m = new Dr(a, b, k.type);
                        var p = lq(hq, e, "m", D(m.th, m), k, a),
                            r = lq(hq, e, "e", D(m.Kg, m), k, a);
                        "onpagehide" in a ? ud(a).F(a, ["pagehide"], function(v) {
                            v.persisted ? (p.flush(!0), r.flush(!0)) : c()
                        }, null) : ud(a).F(a, ["beforeunload", "unload"], c);
                        k = Er();
                        m = k.vg;
                        r.F("ag", k.kg);
                        r.F("p", m);
                        p.F("see", function(v) {
                            var z = !1;
                            M(function(P) {
                                "page" === P.type && (z = !0)
                            }, v);
                            z && (h || r.push(nq), c())
                        });
                        var t = Jb(function(v) {
                            "eof" === J(v, "data.type") || "eof" === v.event ? (r.push(v), p.push(v), r.flush(!0), p.flush(!0)) : ("event" ===
                                v.type ? r : p).push(v)
                        });
                        X(a, c, 864E5);
                        ai(a, function() {
                            var v = {},
                                z = {};
                            Fe(a, (z.counterKey = e, z.name = "webvisor", z.data = (v.version = 2, v), z));
                            l.start(t)
                        })
                    }
                }
            }));
            return function() {
                return c()
            }
        }),
        Kr = W("w2.cs", function(a, b) {
            var c = O(b),
                d = {};
            Ci(a, c, (d.webvisor = !!b.zb, d))
        }),
        Lr = Mc.La + "//" + Kc + "/metrika",
        Mr = Lr + "/metrika_match.html",
        Nr = x(function(a) {
            return {
                zi: a,
                ib: null,
                sb: []
            }
        });

    function Or(a, b) {
        var c = Nr(Mr);
        K(b, c.sb) || c.sb.push(b);
        if (Qa(c.ib)) {
            var d = Lf(a);
            if (!d) return null;
            d = d("iframe");
            N(d.style, {
                display: "none",
                width: "1px",
                height: "1px",
                visibility: "hidden"
            });
            d.src = Mr;
            var e = Rf(a);
            if (!e) return null;
            e.appendChild(d);
            c.ib = d
        } else(d = J(c.ib, "contentWindow")) && d.postMessage("frameReinit", "*");
        return c.ib
    }

    function Pr(a) {
        var b = Nr(Mr);
        K(a, b.sb) && (b.sb = mb(H(ra(a), Ea), b.sb), b.sb.length || (Mf(b.ib), b.ib = null))
    }

    function Qr(a, b, c, d) {
        var e = d.data;
        if (y(e)) {
            var f = q(e.split("*"));
            e = f.next().value;
            var g = f.next().value,
                h = f.next().value;
            f = f.next().value;
            "sc.frame" === e && d.source ? d.source.postMessage(("bl" === a || "ntq" === a ? "sc.bl" : "sc.images") + "*" + b, "*") : e === ("bl" === a || "ntq" === a ? "sc.blr" : "sc.image") && g === b.split("?")[0] && c(h, y(f) ? Al(yl(f)) : null)
        }
    }

    function Rr(a, b, c) {
        return new S(function(d, e) {
            if (Or(a, "isp")) {
                var f = u,
                    g = function(h, k) {
                        "1" === h ? d({
                            Ga: k,
                            Ae: 0
                        }) : e();
                        f();
                        Pr("isp")
                    };
                f = ud(a).F(a, ["message"], E([b, c, g], V(a, "isp.stat.m", Qr)));
                X(a, g, 1500)
            } else e()
        })
    }
    var Sr = x(Ce, O);

    function Tr() {
        return T("", M(function(a) {
            return String.fromCharCode(a.charCodeAt(0) + 15)
        }, Al(yl("VCNUKCkkUiMeIlUjVx4lIydVHiohJyEeVyZWKFNVVSEmIyoj"))))
    }

    function Ur(a, b, c) {
        if ("rt" === c) return a = Mg(a, b), c = {}, c = Le((c.rt = 1, c.u = a, c)).Aa(), b = {}, c = Wd((b["browser-info"] = c, b)), "https://yutovo.ru/cors/" + Yj(a) + ".mc.yandex.ru/watch/99742118/1?" + c;
        if ("mf" === c) {
            c = U(a);
            c = Td(c.protocol + "//" + c.hostname + c.pathname);
            b = Mg(a, b);
            var d = "";
            do d += Xd(a); while (d.length < b.length);
            d = d.slice(0, b.length);
            a = "";
            for (var e = 0; e < b.length; e += 1) a += (b.charCodeAt(e) + d.charCodeAt(e) - 96) % 10;
            a = q([d, a]);
            b = a.next().value;
            return "https://yutovo.ru/cors/adstat.yandex.ru/track?service=metrika&id=" + a.next().value + "&mask=" + b + "&ref=" +
                c
        }
        if ("bl" === c) return a = Tr(), T("=", ["https://yutovo.ru/cors/fcpe.beeline.ru/sync/me?guid", a]);
        if ("ntq" === c) return c = new a.Date, c.setMonth(c.getMonth() + 1), c = c.getTime(), a = ql("0", 30, "" + Yj(Mg(a, b))), a = T("-", [a.slice(0, 8), a.slice(8, 12), "4" + a.slice(12, 15), "8" + a.slice(15, 18), a.slice(18, 30)]), "https://yutovo.ru/cors/spadsync.com/partner?brandid=pyan0002&consent=" + c + "&zenithid=" + a
    }
    var Vr = Yd("isp", function(a, b) {
            return Wh(b, function(c) {
                var d = Je(function(g) {
                    return J(c, "settings." + g)
                }, vl);
                if (d) {
                    var e = Sr(b);
                    N(e, {
                        fe: d,
                        status: 4
                    });
                    var f = Ur(a, b, d);
                    if (f) return Rr(a, d, f).then(function(g) {
                        g = g.Ga;
                        e.status = 1;
                        ("bl" === d || "ntq" === d) && y(g) && (g = "bl" === d ? J(xf(a, g), "cid") : g) && (g = zl(Bl(g)), Q(a).D(d, g))
                    })["catch"](function() {
                        e.status = 2
                    })
                }
            })["catch"](V(a, "l.isp"))
        }),
        Wr = W("fbq.o", function(a, b, c) {
            var d = J(a, "fbq");
            if (d && d.callMethod) {
                var e = function() {
                    var g = Ha(arguments),
                        h = d.apply(null, ca(g));
                    b(g);
                    return h
                };
                N(e, d);
                c && M(b, c);
                a.fbq = e
            } else var f = X(a, E([a, b].concat(ub(d && d.queue)), Wr), 1E3, "fbq.d");
            return D(rg, null, a, f)
        }),
        Xr = {},
        Yr = (Xr.add_to_wishlist = "add-to-wishlist", Xr.begin_checkout = "begin-checkout", Xr.generate_lead = "submit-lead", Xr.add_payment_info = "add-payment-info", Xr),
        Zr = {},
        $r = (Zr.AddToCart = "add-to-cart", Zr.Lead = "submit-lead", Zr.InitiateCheckout = "begin-checkout", Zr.Purchase = "purchase", Zr.CompleteRegistration = "register", Zr.Contact = "submit-contact", Zr.AddPaymentInfo = "add-payment-info", Zr.AddToWishlist =
            "add-to-wishlist", Zr.Subscribe = "subscribe", Zr),
        as = {},
        bs = (as["1"] = Yr, as["2"] = Yr, as["3"] = Yr, as["0"] = $r, as),
        cs = [$r.AddToCart, $r.Purchase];

    function ds(a, b, c) {
        if (c) {
            var d = c.version;
            (c = J(bs, d + "." + c.lc)) && (b && K(c, cs) || a("ym-" + c + "-" + d))
        }
    }
    var es = pa(function(a, b) {
        var c = J(b, "ecommerce"),
            d = J(b, "event") || "";
        if (!(c = c && d && {
                version: "3",
                lc: d
            })) a: {
            if (L(b) || db(b))
                if (d = q(Ha(b)), c = d.next().value, d = d.next().value, "event" === c && d) {
                    c = {
                        version: "2",
                        lc: d
                    };
                    break a
                } c = void 0
        }
        c || (c = (c = J(b, "ecommerce")) && {
            version: "1",
            lc: T(",", bc(c))
        });
        c && a(c)
    });

    function fs(a, b, c) {
        c = q(Ha(c));
        a = c.next().value;
        c = c.next().value;
        "track" === a && b({
            version: "0",
            lc: c
        })
    }
    var gs = W("ag.e", function(a, b) {
        if ("0" === b.ca) {
            var c = [],
                d = V(a, "ag.s", E([Qe, c], M));
            Wh(b, function(e) {
                if (J(e, "settings.auto_goals") && fi(a, b) && (e = dj(a, b, "autogoal").reachGoal)) {
                    e = E([e, !!b.nd], ds);
                    var f = es(e);
                    e = E([a, e], fs);
                    c.push(Wr(a, e));
                    c.push(Ek(a, "dataLayer", function(g) {
                        g.oa.F(f)
                    }))
                }
            });
            return d
        }
    });

    function hs(a, b) {
        if (!b) return "";
        var c = [],
            d = J(a, "document");
        Kk(a, b, function(e) {
            if (e.nodeType === d.TEXT_NODE) var f = e.textContent;
            else e instanceof a.HTMLImageElement ? f = e.alt : e instanceof a.HTMLInputElement && (f = e.value);
            (f = f && ke(f)) && c.push(f)
        });
        return 0 === c.length ? "" : T(" ", c)
    }
    var is = /[^\d.,]/g,
        js = /[.,]$/;

    function ks(a) {
        a = ub(yl(a));
        return M(function(b) {
            b = b.charCodeAt(0).toString(2);
            return ql("0", 8, b)
        }, a)
    }

    function ls(a, b) {
        var c = null;
        try {
            c = b ? Bj(b, a) : c
        } catch (d) {}
        return c
    }

    function ms(a, b, c) {
        if (b = fi(a, b)) a = eb(["dr", c || "" + Xd(a, 10, 99)]), b.params(eb(["__ym", a]))
    }
    var ns = W("ep.pp", function(a, b) {
            if (!b) return 0;
            a: {
                var c = b.replace(is, "").replace(js, "");
                for (var d = "0" === c[c.length - 1], e = c.length; 0 < e && !(3 < c.length - e + 1 && d); --e) {
                    var f = c[e - 1];
                    if (K(f, [",", "."])) {
                        c = f;
                        break a
                    }
                }
                c = ""
            }
            c = (d = c) ? b.split(d) : [b];
            d = d ? c[1] : "00";
            c = parseFloat(ne(c[0]) + "." + ne(d));
            d = Math.pow(10, 8) - .01;
            a.isNaN(c) ? c = 0 : (c = a.Math.min(c, d), c = a.Math.max(c, 0));
            return c
        }),
        os = [
            [
                ["EUR", "\u20ac"], "978"
            ],
            [
                ["USD", "\u0423\\.\u0415\\.", "\\$"], "840"
            ],
            [
                ["UAH", "\u0413\u0420\u041d", "\u20b4"], "980"
            ],
            ["\u0422\u0413 KZT \u20b8 \u0422\u04a2\u0413 TENGE \u0422\u0415\u041d\u0413\u0415".split(" "),
                "398"
            ],
            [
                ["GBP", "\u00a3", "UKL"], "826"
            ],
            ["RUR RUB \u0420 \u0420\u0423\u0411 \u20bd P \u0420UB P\u0423\u0411 P\u0423B PY\u0411 \u0420Y\u0411 \u0420\u0423B P\u0423\u0411".split(" "), "643"]
        ],
        ps = x(function(a) {
            return new RegExp(T("|", a), "i")
        }),
        qs = x(function() {
            function a() {
                var k = h + "0",
                    l = h + "1";
                f[k] ? f[l] ? (h = h.slice(0, -1), --g) : (e[l] = c(8), f[l] = 1) : (e[k] = c(8), f[k] = 1)
            }

            function b() {
                var k = h + "1";
                f[h + "0"] ? f[k] ? (h = h.slice(0, -1), --g) : (h += "1", f[h] = 1) : (h += "0", f[h] = 1)
            }

            function c(k) {
                k = void 0 === k ? 1 : k;
                var l = d.slice(g, g + k);
                g += k;
                return l
            }
            for (var d = T("", ks("Cy2FcreLJLpYXW3BXFJqldVsGMwDcBw2BGnHL5uj1TKstzse3piMo3Osz+EqDotgqs1TIoZvKtMKDaSRFztgUS8qkqZcaETgKWM54tCpTXjV5vW5OrjBpC0jF4mspUBQGd95fNSfv+vz+g+Hze33Hg8by+Yen1PP6zsdl7PQCwX9mf+f7FMb9x/Pw+v2Pp8Xy74eTwuBwTt913u4On1XW6hxOO5nIzFam00tC218S0kaeugpqST+XliLOlMoTpRQkuewUxoy4CT3efWtdFjSAAm+1BkjIhyeU4vGOf13a6U8wzNY4bGo6DIUemE7N3SBojDr7ezXahpWF022y8mma1NuTnZbq8XZZlPStejfG/CsbPhV6/bSnA==")), e = {}, f = {}, g = 1, h = ""; g < d.length - 1;)("0" === c() ? b : a)();
            return e
        }),
        rs = W("ep.dec", function(a, b) {
            if (!b ||
                hc(a)) return [];
            var c = q(ks(b)),
                d = c.next().value,
                e = c.next().value,
                f = c.next().value;
            c = ba(c);
            if (2 !== Vb(d)) return [];
            d = qs();
            c = T("", c);
            e = Vb(e + f);
            for (var g = f = "", h = 0; g.length < e && c[h];) f += c[h], d[f] && (g += String.fromCharCode(Vb(d[f])), f = ""), h += 1;
            d = xf(a, Al(g));
            return L(d) ? M(Oa, d) : []
        }),
        ss = W("ep.ent", function(a, b, c) {
            a = "" + Xd(a, 10, 99);
            c = "" + 100 * b + c + a;
            if (16 < db(c)) return "";
            c = ql("0", 16, c);
            b = c.slice(0, 8);
            c = c.slice(-8);
            b = (+b ^ 92844).toString(35);
            c = (+c ^ 92844).toString(35);
            return "" + b + "z" + c
        });

    function ts(a, b) {
        var c = ls(a.document.body, b);
        return c ? hs(a, c) : ""
    }

    function us(a, b) {
        var c = ts(a, b);
        return ns(a, c)
    }
    var vs = H(ts, W("ep.cp", function(a) {
        if (!a) return "643";
        var b = me(a);
        return (a = Je(function(c) {
            c = q(c).next().value;
            return ps(c).test(b)
        }, os)) ? a[1] : "643"
    }));

    function ws(a, b, c, d) {
        (c = ss(a, d, c)) && ms(a, b, c)
    }
    var xs = W("ep.ctp", function(a, b, c, d) {
        var e = vs(a, c),
            f = us(a, d);
        ws(a, b, e, f);
        wa("MutationObserver", a.MutationObserver) && (new a.MutationObserver(function() {
            var g = vs(a, c),
                h = us(a, d);
            if (e !== g || f !== h) e = g, f = h, ws(a, b, e, f)
        })).observe(a.document.body, {
            attributes: !0,
            childList: !0,
            subtree: !0,
            characterData: !0
        })
    });

    function ys(a, b, c, d, e) {
        c = ls(a.document.body, c);
        d = ls(a.document.body, d);
        K(e.target, [c, d]) && ms(a, b)
    }
    var zs = W("ep.chp", function(a, b, c, d, e) {
        c && ms(a, b);
        return d || e ? ud(a).F(a.document, ["click"], V(a, "ep.chp.cl", E([a, b, d, e], ys))) : u
    });

    function As(a, b) {
        return Wh(b, function(c) {
            var d = J(c, "settings.dr");
            return {
                Gg: rs(a, d),
                isEnabled: J(c, "settings.auto_goals")
            }
        })
    }

    function Bs(a, b) {
        if (!b) return !1;
        var c = U(a);
        return (new RegExp(b)).test("" + c.pathname + c.hash + c.search)
    }
    var Cs = W("ep.i", function(a, b) {
        if (zj(a)) return As(a, b).then(function(c) {
            var d = q(c.Gg),
                e = d.next().value,
                f = d.next().value,
                g = d.next().value,
                h = d.next().value,
                k = d.next().value,
                l = d.next().value,
                m = d.next().value,
                p = d.next().value,
                r = d.next().value,
                t = d.next().value,
                v = d.next().value,
                z = d.next().value,
                P = d.next().value,
                R = d.next().value,
                ma = d.next().value,
                Dc = d.next().value;
            if (!c.isEnabled) return S.resolve(u);
            var Gd = Bs(a, e),
                Ze = Bs(a, h),
                qu = Bs(a, m),
                ru = Bs(a, r),
                su = "" + e + f + g === "" + h + k + l;
            return new S(function(tu, uu) {
                Bg(a)(ug(uu,
                    function() {
                        Gd && xs(a, b, f, g, v, z, P);
                        Ze && !su && xs(a, b, k, l, R, ma, Dc);
                        tu(zs(a, b, qu || ru, p, t))
                    }))
            })
        })
    });

    function Ds(a, b) {
        var c = Ff(a),
            d = c.C,
            e = c.D;
        if ("" === d("cc")) {
            e("cc", 0);
            var f = Ed(a),
                g = Q(a);
            Rh(a, "6", b)({
                N: {
                    cb: !0,
                    Vc: !1
                }
            }, ["https://yutovo.ru/cors/mc.yandex.md/cc"]).then(function(h) {
                h = J(h.Ga, "c");
                e("cc", h + "&" + f(Bd));
                g.D("cc", h)
            })["catch"](function(h) {
                var k = f(Bd);
                e("cc", "&" + k);
                mf(a, "cc", h)
            })
        }
    }
    var Es = W("cc.i", function(a, b) {
        var c = E([a, b], Ds);
        c = E([a, c, 300, void 0], X);
        Wh(b, c)
    });

    function Fs(a, b) {
        var c = Nf(b),
            d = Mc.ec,
            e = Rc(a);
        if (c && Of("ym-advanced-informer", c)) {
            var f = e.C("ifc", 0) + 1;
            e.D("ifc", f);
            f = c.getAttribute("data-lang");
            var g = Ub(c.getAttribute("data-cid") || "");
            if (g || 0 === g)(d = J(a, "Ya." + d + ".informer")) ? (e = {}, d((e.i = c, e.id = g, e.lang = f, e))) : e.D("ib", !0), c = b || window.event, c.preventDefault ? c.preventDefault() : c.returnValue = !1
        }
    }

    function Gs(a) {
        var b = V(a, "i.clch", Fs);
        ud(a).F(a.document, ["click"], F(a, b), {
            passive: !1
        });
        return function(c) {
            var d = Mc.La,
                e = a.Ya[Mc.ec],
                f = !!e._informer;
            e._informer = N({
                domain: "informer.yandex.ru"
            }, c);
            f || oh(a, {
                src: d + "//informer.yandex.ru/metrika/informer.js"
            })
        }
    }

    function Hs(a) {
        return {
            V: function(b, c) {
                var d = b.K;
                if (d) {
                    var e = Q(a).C("adBlockEnabled");
                    e && d.D("adb", e)
                }
                c()
            }
        }
    }

    function Is(a, b) {
        var c = a.document;
        if (K(c.readyState, ["interactive", "complete"])) ai(a, b);
        else {
            var d = ud(a),
                e = d.F,
                f = d.Wb,
                g = function() {
                    f(c, ["DOMContentLoaded"], g);
                    f(a, ["load"], g);
                    b()
                };
            e(c, ["DOMContentLoaded"], g);
            e(a, ["load"], g)
        }
    }
    var Js = F("9-d5ve+.r%7", w),
        Ks = W("ad", function(a, b) {
            if (!b.Ua) {
                var c = Q(a);
                if (!c.C("adBlockEnabled")) {
                    var d = function(m) {
                            K(m, ["2", "1"]) && c.D("adBlockEnabled", m)
                        },
                        e = Ae(a),
                        f = e.C("isad");
                    if (f) d(f);
                    else {
                        var g = F("adStatus", c.D),
                            h = function(m) {
                                m = m ? "1" : "2";
                                d(m);
                                g("complete");
                                e.D("isad", m, 1200);
                                return m
                            },
                            k = Rh(a, "adb", b);
                        if (!c.C("adStatus")) {
                            g("process");
                            var l = "metrika/a" + Js().replace(/[^a-v]+/g, "") + "t.gif";
                            Is(a, function() {
                                return k({
                                    Ja: {
                                        qa: l
                                    }
                                }).then(F(!1, h))["catch"](F(!0, h))
                            })
                        }
                    }
                }
            }
        }),
        Ls = W("pr.p", function(a, b) {
            if (Cc(a)) {
                var c =
                    Rh(a, "5", b),
                    d = {};
                d = Le((d.pq = 1, d.ar = 1, d));
                var e = {};
                c({
                    K: d,
                    H: (e["page-url"] = U(a).href, e["page-ref"] = J(a, "document.referrer") || "", e)
                }, b)["catch"](V(a, "pr.p.s"))
            }
        }),
        Ms = !1;

    function Ns(a) {
        return {
            V: function(b, c) {
                if (!b.K) return c();
                var d = Q(a).C("fid");
                !Ms && d && (of(b, "fid", d), Ms = !0);
                return c()
            }
        }
    }
    var Os = W("fid", function(a) {
            var b = u;
            if (!A(a.PerformanceObserver)) return b;
            var c = Q(a);
            if (c.C("fido")) return b;
            c.D("fido", !0);
            var d = new a.PerformanceObserver(V(a, "fid", function(f) {
                f = f.getEntries()[0];
                c.D("fid", a.Math.round(100 * (f.processingStart - f.startTime)));
                b()
            }));
            b = function() {
                return d.disconnect()
            };
            try {
                var e = {};
                d.observe((e.type = "first-input", e.buffered = !0, e))
            } catch (f) {}
            return b
        }),
        Ps = x(Ce);

    function Qs(a) {
        var b = Ps();
        b.Qf || (b.Qf = a)
    }

    function Rs(a, b, c) {
        if (J(c, "settings.ins")) {
            var d = Q(a);
            if (!d.C("scip")) {
                var e = Ff(a),
                    f = Ed(a)(Bd);
                c = Sb(e.C("sci"));
                if (!(c && 1440 >= f - c)) {
                    c = Rh(a, "ci");
                    var g = ["sync.cook.int"],
                        h = function(m) {
                            m = d.C("scip", "") + m;
                            d.D("scip", m)
                        },
                        k = F("a", h);
                    d.D("scip", "0");
                    var l = {};
                    b = (l.tag = "cm-urls", l.stage = "mc-yandex-ru", l["mc-id"] = "" + b.id, l.duid = Mg(a, b), l);
                    (l = Ps().Qf) && (b.scid = l);
                    return c({
                        N: {
                            ea: g,
                            Oa: 3E3,
                            cb: !0
                        },
                        H: b
                    }, ["https://yutovo.ru/cors/eu.asas.yango.com/mapuid"]).then(function(m) {
                        m = J(m.Ga, "CookieMatchUrls");
                        if (L(m) && db(m)) {
                            h("1");
                            var p =
                                Rh(a, "c");
                            m = M(function(r, t) {
                                return p({
                                    N: {
                                        ea: g,
                                        Oa: 3E3
                                    }
                                }, ["https://yutovo.ru/cors/" + r]).then(H(F("c", h), F("" + t, h)))["catch"](H(F("b", h), F("" + t, h)))
                            }, mb(y, m));
                            return S.all(m)
                        }
                        k()
                    }, k).then(function() {
                        var m = d.C("scip");
                        !m || Na(m, "a") || Na(m, "b") || (e.D("sci", f), h("d"))
                    }, u)
                }
            }
        }
    }
    F(hf("ccf"), md);

    function Ss(a, b, c) {
        var d = J(a, "location.host");
        a = Mg(a, b);
        c.D("pu", "" + Yj(d) + a)
    }

    function Ts(a, b, c) {
        var d = Lg(a, b);
        if (d) {
            d.Z.F(["gpu-get"], function() {
                var g = {};
                return g.type = "gpu-get", g.pu = c.C("pu"), g
            });
            var e = J(a, "opener");
            if (e) {
                var f = X(a, E([a, b, c], Ss), 200, "pu.m");
                b = {};
                d.ke(e, (b.type = "gpu-get", b), function(g, h) {
                    var k = J(h, "pu");
                    k && (rg(a, f), c.D("pu", k))
                })
            } else Ss(a, b, c)
        }
    }

    function Us(a, b, c, d) {
        return Wh(b, function(e) {
            if (!Bm(e) && !hc(a))
                if (e = d.C("zzlc"), B(e) || Qa(e) || "na" === e) {
                    var f = Lf(a);
                    if (f && (e = Rf(a))) {
                        var g = f("iframe");
                        N(g.style, {
                            display: "none",
                            width: "1px",
                            height: "1px",
                            visibility: "hidden"
                        });
                        f = Hc(a);
                        var h = Gc(a);
                        g.src = "https://yutovo.ru/cors/mc.yandex." + (f || h ? "md" : "ru") + yl("L21ldHJpa2EvenpsYy5odG1s");
                        e.appendChild(g);
                        var k = 0,
                            l = ud(a).F(a, ["message"], V(a, "zz.m", function(m) {
                                (m = J(m, "data")) && m.substr && "__ym__zz" === m.substr(0, 8) && (Mf(g), m = m.substr(8), d.D("zzlc", m), c.D("zzlc", m), l(), rg(a,
                                    k))
                            }));
                        k = X(a, H(l, F(g, Mf)), 3E3)
                    }
                } else c.D("zzlc", e)
        })
    }

    function Vs(a, b, c, d) {
        b = d.C("cc");
        d = E(["cc", ""], d.D);
        if (b) {
            var e = q(b.split("&"));
            b = e.next().value;
            (e = (e = e.next().value) && Ub(e)) && 1440 < Ed(a)(Bd) - e ? d() : c.D("cc", b)
        } else ra(0)(b) || d()
    }
    var Ws = x(function(a, b) {
        var c = Q(a),
            d = Ff(a),
            e = [],
            f = E([a, b, c, d], hl),
            g = !gl(a) || Hc(a);
        g && e.push(E([Ts, "pu", ""], f));
        !g || d.Id || Ec(a) || (e.push(E([Us, "zzlc", "na"], f)), e.push(E([Vs, "cc", ""], f)));
        return e.length ? {
            Ca: function(h, k) {
                if (0 === c.C("isEU")) try {
                    M(Re, e)
                } catch (l) {}
                k()
            },
            V: function(h, k) {
                var l = h.K;
                if (l && 0 === c.C("isEU")) try {
                    M(ta(l), e)
                } catch (m) {}
                k()
            }
        } : {}
    }, H(Da, O));

    function Xs(a, b, c, d, e) {
        if (!zj(a)) return u;
        var f = [],
            g = [],
            h = ud(a),
            k;
        Bg(a)(ug(u, function() {
            var l = Aj(b, a.document.body);
            e && (l = mb(e, l));
            M(function(p) {
                f.push(p);
                g.push(h.F(p, c, d))
            }, l);
            if (wa("MutationObserver", a.MutationObserver)) {
                var m = b.toUpperCase();
                l = new a.MutationObserver(V(a, "de.m", function(p) {
                    M(function(r) {
                        var t = r.addedNodes;
                        r = r.removedNodes;
                        t && t.length && M(function(v) {
                            Kk(a, v, function(z) {
                                z.nodeName !== m || e && !e(z) || Je(ra(z), f) || (f.push(z), g.push(h.F(z, c, d)))
                            }, void 0, a.NodeFilter.SHOW_ELEMENT, !0)
                        }, t);
                        r && r.length && M(function(v) {
                            Kk(a, v, function(z) {
                                z.nodeName !== m || e && !e(z) || (z = vb(a)(z, f), -1 !== z && (g[z](), g.splice(z, 1), f.splice(z, 1)))
                            }, void 0, a.NodeFilter.SHOW_ELEMENT, !0)
                        }, r)
                    }, p)
                }));
                l.observe(a.document.body, {
                    childList: !0,
                    subtree: !0
                });
                k = D(l.disconnect, l)
            }
        }));
        return function() {
            k && k();
            M(Qe, g);
            xb(g);
            xb(f)
        }
    }

    function Ys(a, b) {
        var c = J(b, "target");
        if (c) {
            var d = J(c, "value");
            if ((d = ke(d)) && !(100 <= db(d))) {
                var e = "tel" === J(c, "type"),
                    f = 0 < La(d, "@") && !e,
                    g = ne(d);
                g = db(g);
                if (f || !f && (e || g))
                    if (d = f ? qi(d) : ti(a, d)) return e = J(b, "isTrusted"), {
                        kh: c,
                        nh: f,
                        lh: d,
                        isTrusted: e,
                        Ld: b.Ld
                    }
            }
        }
    }

    function Zs(a, b, c, d) {
        var e = c.nh,
            f = c.kh,
            g = c.isTrusted;
        c = c.Ld;
        a = Mj(a, f);
        f = f.readOnly;
        var h = {},
            k = {};
        d = (k.fi = nf((h.a = e ? 1 : 0, h.b = a, h.c = d || 0, h.d = f ? 1 : null, h.e = c ? 1 : null, h)).Aa(), k);
        C(g) || (d.ite = ib(g));
        g = {};
        b.params((g.__ym = d, g))
    }
    var $s = W("ice", function(a, b, c) {
            if (b = fi(a, b))
                if (c = Ys(a, c)) return Zs(a, b, c), !0
        }),
        at = W("ice", function(a, b, c) {
            if (b = fi(a, b))
                if (c = Ys(a, c)) return vi(a, c.lh).then(E([a, b, c], Zs), V(a, "ice.s")), !0
        }),
        bt = ["text", "email", "tel"],
        ct = ["cc-", "name", "shipping"],
        dt = W("icei", function(a, b) {
            if (ui(a)) {
                var c = !1,
                    d = u,
                    e = u;
                Wh(b, function(f) {
                    if (!(Gr(a) || J(f, "settings.eu") || c)) {
                        f = J(f, "settings.cf") ? at : $s;
                        var g = E([a, b], f),
                            h = function(k) {
                                return hp(a, k) || !K(k.type, bt) || Nb(jb, M(F(k.autocomplete, Na), ct)) ? !1 : !0
                            };
                        d = Xs(a, "input", ["blur"],
                            g, h);
                        e = Xs(a, "form", ["submit"], function(k) {
                            var l = k.target;
                            if (l) {
                                l = Aj("input", l);
                                var m = 0;
                                M(function(p) {
                                    20 <= m || !h(p) || g({
                                        target: p,
                                        isTrusted: k.isTrusted,
                                        Ld: !0
                                    }) && (m += 1)
                                }, l)
                            }
                        })
                    }
                });
                return function() {
                    c = !0;
                    d();
                    e()
                }
            }
        }),
        et;

    function ft(a, b, c) {
        var d = J(a, "AppMetricaInitializer"),
            e = J(d, "init");
        if (e) try {
            D(e, d)(yf(a, b))
        } catch (f) {} else et = X(a, E([a, b, 2 * c], ft), c, "ai.d");
        return function() {
            return rg(a, et)
        }
    }
    var gt = W("p.ai", function(a, b) {
            if (nc(a) || dl(a)) return Wh(b, function(c) {
                if (c = J(c, "settings.sbp")) {
                    var d = {};
                    return ft(a, N({}, c, (d.c = b.id, d)), 10)
                }
            })
        }),
        ht = "architecture bitness model platformVersion uaFullVersion fullVersionList".split(" "),
        it = Yd("uah", function(a) {
            if (!wa("getHighEntropyValues", J(a, "navigator.userAgentData.getHighEntropyValues"))) return S.reject("0");
            try {
                return a.navigator.userAgentData.getHighEntropyValues(ht).then(function(b) {
                    if (!Ra(b)) throw "2";
                    return b
                }, function() {
                    throw "1";
                })
            } catch (b) {
                return S.reject("3")
            }
        }),
        jt = new RegExp(T("|", "yandex.com/bots;Googlebot;APIs-Google;Mediapartners-Google;AdsBot-Google;FeedFetcher-Google;Google-Read-Aloud;DuplexWeb-Google;Google Favicon;googleweblight;Lighthouse;Mail.RU_Bot;StackRambler;Slurp;msnbot;bingbot;www.baidu.com/search/spi_?der.htm".split(";")).replace(/[./]/g, "\\$&")),
        kt = x(function(a) {
            var b = Ab(a);
            return (b = jt.test(b)) ? S.resolve(b) : it(a).then(function(c) {
                try {
                    return G(function(d, e) {
                        return d || jt.test(e.brand)
                    }, !1, c.brands)
                } catch (d) {
                    return !1
                }
            }, F(!1, w))
        }),
        lt = ["0", "1",
            "2", "3"
        ],
        mt = lt[0],
        nt = lt[1],
        ot = lt[2],
        pt = ["GDPR-ok-view-detailed-0", "GDPR-ok-view-detailed-1", "GDPR-ok-view-detailed-2", "GDPR-ok-view-detailed-3"],
        qt = ["GDPR-ok-view-default", "GDPR-ok-view-detailed"].concat(pt);

    function rt(a) {
        if (K(a, ["GDPR-ok-view-default", "GDPR-ok-view-detailed"])) return mt;
        a = a.replace("GDPR-ok-view-detailed-", "");
        return K(a, lt) ? a : mt
    }
    var st = "GDPR-ok GDPR-cross GDPR-cancel 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 GDPR-settings GDPR-ok-view-default GDPR-ok-view-detailed 21 22 23".split(" ").concat(pt).concat(["28", "29", "30", "31"]),
        tt = "3 13 14 31 15 16 17 28".split(" "),
        ut = H(Jb(cb("ymetrikaEvent.type")), ob(rb(st)));

    function vt(a, b, c) {
        a = c || vc(a);
        return K(a, b) ? a : "en"
    }
    var wt = {
            ph: !0,
            url: "https://yutovo.ru/cors/yastatic.net/s3/gdpr/v3/gdpr",
            pf: "",
            gf: "az be en es et fi fr hy ka kk ky lt lv no pt ro ru sl tg tr uz cs da de el hr it nl pl sk sv".split(" ")
        },
        xt = Yd("gdpr", function(a, b, c, d, e) {
            function f(p) {
                b("10");
                c.F(qt, function(r) {
                    r = r.type;
                    var t = {};
                    l.Gf((t.type = r, t));
                    p({
                        value: rt(r)
                    })
                })
            }
            var g = void 0 === e ? wt : e;
            e = g.url;
            var h = g.pf,
                k = g.ph;
            g = vt(a, g.gf, d.ii);
            var l = Ui(a, d);
            if (!l) return S.resolve({
                value: mt,
                Kd: !0
            });
            if (a._yaGdprLoaded) return new S(function(p) {
                b("7");
                f(p)
            });
            var m = oh(a, {
                src: "" +
                    e + (k ? "" : g) + h + ".js"
            });
            return new S(function(p, r) {
                m ? (b("7"), m.onerror = function() {
                    b("9");
                    var t = {};
                    l.Gf((t.type = "GDPR-ok-view-default", t));
                    p(null)
                }, m.onload = F(p, f)) : (b("9"), r(hf("gdp.e")))
            })
        });

    function yt(a, b) {
        var c = Ui(a, b);
        c && c.Z.F(["isYandex"], function() {
            var d = {};
            return d.type = "isYandex", d.isYandex = Gm(a), d
        })
    }

    function zt(a, b, c) {
        var d = Ui(a, c);
        return new S(function(e) {
            if (d) {
                var f = d.Z,
                    g = H(F("4", b), F(null, e)),
                    h = X(a, g, 2E3, "gdp.f.t"),
                    k = {};
                d.Hf((k.type = "isYandex", k)).then(function(l) {
                    l.isYandex ? (b("5"), f.F(qt, function(m) {
                        m = q(m);
                        m.next();
                        m = m.next().value.type;
                        e({
                            value: rt(m)
                        })
                    })) : (b("6"), e(null))
                })["catch"](g).then(E([a, h], rg))
            } else e({
                value: nt,
                Kd: !0
            })
        })
    }
    var At = {},
        Bt = (At["GDPR-ok"] = "ok", At["GDPR-ok-view-default"] = "ok-default", At["GDPR-ok-view-detailed"] = "ok-detailed", At["GDPR-ok-view-detailed-0"] = "ok-detailed-all", At["GDPR-ok-view-detailed-1"] = "ok-detailed-tech", At["GDPR-ok-view-detailed-2"] = "ok-detailed-tech-analytics", At["GDPR-ok-view-detailed-3"] = "ok-detailed-tech-other", At);

    function Ct(a, b) {
        if (Gm(a)) {
            var c = Wi(a),
                d = fi(a, b);
            d = d && d.params;
            c = M(F(Bt, J), ut(c));
            d && c.length && d("gdpr", nb(c))
        }
    }
    var Dt = "az be en es et fi fr hy ka kk ky lt lv no pt ro ru sl tg tr uz ar he sr uk zh".split(" "),
        Et = [],
        Ft = Va("push", Et),
        Gt = x(function(a, b) {
            var c = b.C("gdpr");
            return K(c, lt) ? "-" + c : ""
        });

    function Ht(a, b, c, d) {
        if (!c.K || Nc(b.ca)) d();
        else {
            var e = Wi(a),
                f = F(e, Vi),
                g = ze(a, ""),
                h = function() {
                    var r = T(",", M(Ca(st), ut(e)));
                    r = "" + r + Gt(r, g);
                    of(c, "gdpr", r);
                    d()
                };
            if (b.hi) f("31"), h();
            else if (3 === b.id) h();
            else {
                var k = Q(a),
                    l = k.C("f1");
                if (l) l(h);
                else if (l = ut(e), Nb(rb(st), l)) h();
                else if (g.C("yandex_login")) f("13"), g.D("gdpr", mt, 525600), h();
                else {
                    l = Gm(a);
                    var m = U(a);
                    var p = /(^|\w+\.)yango(\.yandex)?\.com$/.test(m.hostname) ? {
                            url: "https://yutovo.ru/cors/yastatic.net/s3/taxi-front/yango-gdpr-popup/",
                            version: 2,
                            gf: Dt,
                            pf: "_inversed_buttons"
                        } :
                        void 0;
                    l || p ? (l = g.C("gdpr"), K(l, lt) ? (f(l === nt ? "12" : "3"), h()) : dl(a) || el(a) ? (f("17"), h()) : kt(a).then(w, u).then(function(r) {
                        r ? (f("28"), h()) : (Ft(h), k.D("f1", Ft), r = q(xm).next().value, r(a).then(cb("params.eu")).then(function(t) {
                            if (t || Na(m.href, "yagdprcheck=1") || g.C("yaGdprCheck")) {
                                g.D("gdpr_popup", nt);
                                yt(a, b);
                                if (wc(a)) return zt(a, f, b);
                                var v = Zi(a, e);
                                if (v) return t = xt(a, f, v, b, p), t.then(E([a, b], Ct)), t
                            }
                            t || f("8");
                            return S.resolve({
                                value: mt,
                                Kd: !0
                            })
                        }).then(function(t) {
                            g.jc("gdpr_popup");
                            if (t) {
                                var v = t.value;
                                t = t.Kd;
                                K(v, lt) && g.D("gdpr", v, t ? void 0 : 525600)
                            }
                            v = Rd(Et, Qe);
                            ml(a, v, 20)(ug(V(a, "gdr"), u));
                            k.D("f1", Qe)
                        })["catch"](V(a, "gdp.a")))
                    })) : (f("14"), h())
                }
            }
        }
    }
    var It = Kc.split("."),
        Jt = It.pop(),
        Kt = T(".", It),
        Lt = {};

    function Mt(a, b) {
        Lt[b] || (Lt[b] = {
            Mh: oh(a, {
                src: b
            }),
            state: 0
        });
        return Lt[b]
    }

    function Nt(a, b, c, d) {
        function e() {
            g.state = 1;
            c()
        }

        function f() {
            g.state = 2;
            d && d()
        }
        var g = Mt(a, b);
        b = g.Mh;
        var h = g.state;
        b && 2 !== h ? 1 === h ? e() : (a = ud(a), a.F(b, ["load"], e), a.F(b, ["error"], f)) : f()
    }
    var Ot = x(Ce, O);

    function Pt(a, b, c, d) {
        var e = Ot(c).Hh;
        if (!e) throw jd("im.no");
        Nt(a, Lr + "/" + b + ".js?ver=" + Mc.eb + "&b=pnf", function() {
            var f = Q(a).C("ytmm");
            (f = J(f, b + ".init")) && f(e, d, Mc.eb)
        })
    }
    var Qt = x(De);

    function Rt(a) {
        a = vc(a);
        return mm[a] || "ru"
    }

    function St(a) {
        a = Dm(a);
        return jm[a] || a
    }
    var Tt = x(function() {
            var a = G(function(b, c) {
                "ru" !== c && (b[c] = Kt + "." + c);
                return b
            }, {}, be);
            M(function(b) {
                a[b] = b
            }, bc(km));
            return a
        }),
        Ut = x(function(a) {
            a = U(a).hostname;
            return (a = Je(H(cb("1"), ab("test"), qa(Qe)(a)), ac(km))) && a[0]
        });

    function Vt(a, b) {
        var c = Rt(a),
            d = [Ut(a) || St(a)];
        Em(a) && d.push(c);
        var e = Ed(a);
        c = Ff(a);
        var f = c.C("synced", {});
        d = mb(function(g) {
            if (b[g]) {
                var h = (f[g] || 1) + 1440 < e(Bd);
                h && delete f[g];
                return h
            }
        }, d);
        c.D("synced", f);
        return M(function(g) {
            return {
                Rh: b[g],
                rh: g
            }
        }, d)
    }
    var Wt = function(a, b) {
            return function(c, d) {
                if (Ec(c) || Cb(c)) return {};
                var e = O(d);
                e = Tt(e);
                var f = Vt(c, e),
                    g = Q(c),
                    h = wc(c);
                return {
                    V: function(k, l) {
                        var m = k.K,
                            p = Em(c);
                        m = !(m && m.C("pv"));
                        if (!p || h || m || !f.length) return l();
                        if (g.C("startSync")) Qt(c).push(l);
                        else {
                            g.D("startSync", !0);
                            p = E([c, f, d.id, u, !1], a);
                            m = q(xm).next().value;
                            if (!m) return l();
                            m(c).then(p).then(l, H(sa(l), V(c, b)))["catch"](u)
                        }
                    }
                }
            }
        }(function(a, b, c, d, e) {
            var f = Ed(a),
                g = Q(a),
                h = Ff(a);
            d = Nh(a, "c");
            var k = Oe(a, d),
                l = Vq();
            Qs(l);
            return G(function(m, p) {
                function r() {
                    var z =
                        h.C("synced");
                    g.D("startSync", !1);
                    z && (z[p.rh] = t, h.D("synced", z));
                    z = Qt(a);
                    M(Qe, z);
                    xb(z)
                }
                var t, v = {};
                v = k({
                    N: {
                        ea: ["sync.cook"],
                        Oa: 1500
                    },
                    H: (v.scid = l, v.cid = "" + c, v)
                }, [Mc.La + "//" + p.Rh + "/sync_cookie_image_check" + (e ? "_secondary" : "")]).then(function() {
                    t = f(Bd);
                    r()
                })["catch"](function() {
                    t = f(Bd) - 1435;
                    r()
                });
                v = F(v, w);
                return m.then(v)
            }, S.resolve(), b)["catch"](V(a, "ctl"))
        }, "sy.c"),
        Xt = {},
        Yt = (Xt.brands = "chu", Xt.architecture = "cha", Xt.bitness = "chb", Xt.uaFullVersion = "chf", Xt.fullVersionList = "chl", Xt.mobile = "chm", Xt.model =
            "cho", Xt.platform = "chp", Xt.platformVersion = "chv", Xt);

    function Zt(a) {
        return y(a) ? a : L(a) ? T(",", M(function(b) {
            return '"' + b.brand + '";v="' + b.version + '"'
        }, a)) : C(a) ? "" : a ? "?1" : "?0"
    }

    function $t(a) {
        return "che\n" + a
    }

    function au(a) {
        var b = G(function(c, d) {
            var e = q(d),
                f = e.next().value;
            e = e.next().value;
            (f = Zt(a[f])) && c.push("" + e + "\n" + f);
            return c
        }, [], ac(Yt));
        return T("\n", b)
    }
    var bu = x(function(a) {
        return it(a).then(au, $t)
    });

    function cu(a) {
        return {
            V: function(b, c) {
                bu(a).then(function(d) {
                    b.H || (b.H = {});
                    b.H.uah = d;
                    c()
                }, c)
            }
        }
    }

    function du(a, b) {
        if ("https://oauth.yandex.ru" === J(b, "origin") && J(b, "source.window") && "_ym_uid_request" === J(b.data, "_ym")) {
            var c = b.source,
                d = {};
            d = (d._ym_uid = a, d);
            c.postMessage(d, "https://yutovo.ru/cors/oauth.yandex.ru")
        }
    }
    var eu = Yd("ot", function(a, b) {
        if (Ic(a)) {
            var c = ud(a);
            return Wh(b, V(a, "ot.s", function(d) {
                if (J(d, "settings.oauth")) {
                    var e = [],
                        f = Mg(a, b);
                    e.push(c.F(a, ["message"], V(a, "ot.m", F(f, du))));
                    Bg(a)(ug(u, V(a, "ot.b", function() {
                        function g(p) {
                            var r = p.href;
                            if (r && tj(r, "https://oauth.yandex.ru/") && !Na(r, "_ym_uid=")) {
                                r = Na(r, "?") ? "&" : "?";
                                var t = {};
                                p.href += "" + r + Wd((t._ym_uid = f, t.mc = "v", t));
                                c.F(p, ["click"], V(a, "ot.click", function() {
                                    var v = "et=" + k(Ad);
                                    p.href += "&" + v
                                }))
                            }
                        }
                        var h = a.document.body,
                            k = Ed(a),
                            l = Aj("a", h);
                        M(g, l);
                        if (wa("MutationObserver",
                                a.MutationObserver)) {
                            l = new a.MutationObserver(V(a, "ot.m", F(function(p) {
                                p = p.addedNodes;
                                for (var r = 0; r < p.length; r += 1) {
                                    var t = p[r];
                                    "A" === t.nodeName && g(t)
                                }
                            }, M)));
                            var m = {};
                            m = (m.childList = !0, m.subtree = !0, m);
                            l.observe(h, m);
                            e.push(D(l.disconnect, l))
                        }
                    })));
                    return E([Re, e], M)
                }
            }))
        }
    });

    function fu(a, b, c, d) {
        var e = J(d, "data");
        if (y(e)) {
            var f = q(e.split("*"));
            e = f.next().value;
            var g = f.next().value;
            f = f.next().value;
            "sc.topics-response" === e ? (g && ("1" === g && f ? (a = xf(a, f), L(a) && b.D("cta", a)) : b.D("cta.e", g)), c()) : "sc.frame" === e && d.source && d.source.postMessage("sc.topics", "*")
        }
    }

    function gu(a) {
        var b = J(a, "featurePolicy");
        return b ? "browsingTopics" in a && b.allowsFeature("browsing-topics") : !1
    }
    var hu = W("p.cta", function(a) {
            Bg(a)(ug(u, function() {
                var b = Q(a);
                if (gu(a.document)) {
                    var c = 0;
                    if (Or(a, "cta")) {
                        var d = u,
                            e = function() {
                                Pr("cta");
                                d();
                                rg(a, c)
                            };
                        d = ud(a).F(a, ["message"], W("p.cta.o", E([a, b, e], fu)));
                        c = X(a, e, 1500)
                    } else b.D("cta.e", "if")
                } else b.D("cta.e", "ns")
            }))
        }),
        iu = "pbjsInit bidRequested bidAdjustment bidWon bidResponse bidTimeout auctionInit auctionEnd adRenderSucceeded adRenderFailed".split(" "),
        ju = ["cpm", "currency", "netRevenue", "requestTimestamp", "responseTimestamp"],
        ku = {},
        lu = (ku.netRevenue =
            function(a) {
                return y(a) ? "net" === a : !!a
            }, ku),
        mu = {},
        nu;

    function ou(a) {
        var b = mu[a],
            c = b.Rc,
            d = b.Ne,
            e = b.Kh;
        return M(function(f) {
            var g = q(f);
            f = g.next().value;
            g = g.next().value;
            var h = g.Sd,
                k = g.timeout,
                l = g.Fb,
                m = {};
            return N((m.renderState = g.Ob, m.mediaTypes = h, m.auctionId = a, m.adUnitCode = f, m.startStamp = c, m.endStamp = d, m.requestedBidders = e, m.bidTimeout = k, m), l)
        }, ac(b.Hc))
    }

    function pu(a, b, c) {
        var d = mu[c];
        d.aa = !1;
        d.Pa && rg(a, d.Pa);
        d.Pa = X(a, function() {
            var e = ou(c),
                f = {},
                g = {};
            b((g.__ym = (f.pbjsv = nu, f.pbjs = e, f), g));
            delete mu[c]
        }, 2E3)
    }

    function vu(a, b) {
        M(function(c) {
            mu[c].aa && pu(a, b, c)
        }, bc(mu))
    }

    function wu(a, b) {
        a.Hc[b] || (a.Hc[b] = {
            Fb: {}
        });
        return a.Hc[b]
    }

    function xu(a, b, c) {
        var d = c.adUnitCode,
            e = c.bidderCode || c.bidder;
        if (e && d) {
            var f = wu(b, d);
            !f.Sd && c.mediaTypes && (f.Sd = {}, M(function(g) {
                var h = q(g);
                g = h.next().value;
                h = h.next().value;
                var k;
                L(h) ? k = h : h.sizes ? k = h.sizes : h.playerSize && (k = h.playerSize);
                k && (f.Sd[g] = k)
            }, ac(c.mediaTypes)));
            "bidTimeout" === a ? (f.timeout || (f.timeout = {}), f.timeout[e] = !0) : (f.Fb[a] || (f.Fb[a] = {}), f.Fb[a][e] = G(function(g, h) {
                C(c[h]) || (g[h] = lu[h] ? lu[h](c[h]) : c[h]);
                return g
            }, {}, ju), b = J(c, "meta.advertiserDomains"), L(b) && (f.Fb[a][e].advertiserDomains =
                b))
        }
    }

    function yu(a, b, c) {
        var d = c.bid,
            e = d.bidderCode || d.bidder;
        d = d.adUnitCode;
        e && d && (b = wu(b, d), b.Ob || (b.Ob = {}), a = "adRenderSucceeded" === a, d = {}, b.Ob[e] = (d.success = a, d), a || (b.Ob[e].reason = c.reason, b.Ob[e].message = c.message))
    }

    function zu(a, b) {
        if (K(a, iu))
            if ("pbjsInit" === a) nu = b.version;
            else {
                var c = J(b, "auctionId") || J(b, "bid.auctionId") || void 0;
                if (c) {
                    mu[c] || (mu[c] = {
                        Hc: {}
                    });
                    c = mu[c];
                    var d = "auctionInit" === a,
                        e = "auctionEnd" === a,
                        f = "adRenderFailed" === a || "adRenderSucceeded" === a;
                    f || c.Rc && !d || (c.Rc = J(b, "auctionStart") || void 0, !c.Rc && d && (c.Rc = b.timestamp));
                    var g = E([a, c], xu);
                    "bidRequested" === a ? M(g, b.bids) : f ? yu(a, c, b) : e ? (c.Ne = b.auctionEnd || b.timestamp, c.Kh = mb(function(h, k, l) {
                            return Ba(h, l) === k
                        }, M(cb("bidderCode"), b.bidderRequests))) : d ||
                        g(b);
                    c.Ne && (c.aa = !0)
                }
            }
    }

    function Au(a) {
        M(function(b) {
            var c = b.event;
            b = b.data;
            var d = F(c, zu);
            "bidTimeout" === c ? M(d, b) : d(b)
        }, a)
    }
    var Bu = W("pj", function(a, b) {
            var c = fi(a, b),
                d = c && c.params;
            if (!d) return u;
            c = {};
            return c.pbjs = function(e) {
                L(e) && (e = mb(jb, M(function(f) {
                    if (Ra(f) && f.data && f.event && (Ra(f.data) || L(f.data))) {
                        var g = J(f, "data.args");
                        return g ? {
                            event: f.event,
                            data: g
                        } : f
                    }
                }, e)), Au(e), vu(a, d))
            }, c
        }),
        Cu = x(function() {
            var a = Lj();
            return G(function(b, c) {
                b[a[c]] = c;
                return b
            }, {}, bc(a))
        }),
        Du = /(\D\d*)/g;

    function Eu(a) {
        if (!a) return "";
        a = a.match(Du);
        if (!a || 0 === a.length) return "";
        var b = Cu();
        return "//HTML/BODY/" + G(function(c, d) {
            var e = d[0],
                f = Ub(d.slice(1));
            return "/" + b[e] + (f ? "[" + (f + 1) + "]" : "") + c
        }, "", a)
    }

    function Fu(a, b) {
        var c = Eu(b);
        return c ? J(a, "document.evaluate") ? a.document.evaluate(c, a.document, null, a.XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue : null : null
    }
    var Gu = x(Ce);

    function Hu(a) {
        return {
            Fh: If(a.element),
            qd: a.qd
        }
    }

    function Iu(a, b) {
        var c = a.document.body;
        if (c) {
            var d = b.price_patterns,
                e = Gu(b.id);
            if (e.Cb) {
                if (!Fj(a, e.Cb.element)) return Hu(e.Cb);
                e.Cb = void 0
            }
            d = G(function(h, k) {
                var l = q(k),
                    m = l.next().value;
                l = l.next().value;
                h[m] = l;
                return h
            }, {}, d);
            var f = null,
                g = null;
            d.cs && zj(a) && (f = Bj(d.cs, c), g = "c");
            d.p && !f && (f = Fu(a, d.p), g = "x");
            if (f && g) return e.Cb = {
                element: f,
                qd: g
            }, Hu(e.Cb)
        }
    }

    function Ju(a, b) {
        var c = a[b[0]];
        return !(!c || c !== b[1])
    }

    function Ku(a, b) {
        var c = b.patterns;
        if (0 === c.length) return !1;
        if (1 === c.length) return Ju(a, c[0]);
        c = G(function(f, g) {
            var h = q(g),
                k = h.next().value;
            h = h.next().value;
            var l = a[k];
            if (l === h) {
                if (f.pd += 1, "i" === k || "c" === k) f.ef = !0
            } else l && "p" === k && oe(l) === oe(h) && (f.ff = !0);
            return f
        }, {
            pd: 0,
            ef: !1,
            ff: !1
        }, c);
        var d = c.ef,
            e = c.ff;
        return 2 <= c.pd || d && e
    }

    function Lu(a, b) {
        var c = b.patterns;
        return 0 === c.length ? !1 : Nb(F(a, Ju), c)
    }

    function Mu(a, b, c, d) {
        c = M(function(e) {
            if (!d(b, e)) return !1;
            var f = {};
            f = (f.rg = e.id, f);
            if (e = Iu(a, e)) f.gp = Cl(e.Fh), f.mg = e.qd;
            return f
        }, c);
        return nb(c)
    }
    var Nu = qa(tj)("btn:"),
        Ou = qa(tj)("form:");

    function Pu(a) {
        var b = q(a),
            c = b.next().value;
        b = b.next().value;
        return "bp" === c ? ["p", Al(yl(b))] : a
    }
    var Qu = Jb(function(a) {
            a.patterns = M(Pu, a.patterns);
            a.price_patterns = M(Pu, a.price_patterns);
            return a
        }),
        Ru = "ytm.js ytm.dom ytm.load ytm.init ytm.click ytm.linkClick ytm.formSubmit".split(" "),
        Su = ["ytm.click", "ytm.linkClick", "ytm.formSubmit"];

    function Tu(a, b, c) {
        if (Su.includes(b) && c) {
            a = Fa(c.classList);
            var d = c.innerText,
                e = c.getAttribute("id");
            var f = c.getAttribute("formAction") || c.getAttribute("action") || c.getAttribute("href") || c.getAttribute("src") || c.getAttribute("code") || c.getAttribute("codebase") || "";
            c = {
                element: c,
                elementClasses: a,
                elementText: d,
                elementId: e,
                elementUrl: f,
                wi: c.getAttribute("formTarget") || c.getAttribute("target") || ""
            };
            return {
                event: b,
                ytm: c
            }
        }
        return "ytm.init" === b ? {
            event: b,
            ytm: {
                timestamp: Ed(a)(Ad)
            }
        } : {
            event: b,
            ytm: {}
        }
    }

    function Uu(a, b) {
        return ud(a).F(a.document, ["click"], function(c) {
            "A" === c.target.nodeName && b(Tu(a, "ytm.linkClick", c.target))
        })
    }

    function Vu(a, b, c, d, e) {
        e = void 0 === e ? a.document : e;
        return ud(a).F(e, d, function(f) {
            b(Tu(a, c, f.target))
        })
    }

    function Wu(a, b, c) {
        return K(a.document.readyState, ["complete", "interactive"]) ? (b(Tu(a, c)), u) : Vu(a, b, c, ["DOMContentLoaded"])
    }

    function Xu(a, b, c) {
        if ("ytm.linkClick" === b) return Uu(a, c);
        if ("ytm.js" === b) return Wu(a, c, "ytm.js");
        if ("ytm.dom" === b) return Wu(a, c, "ytm.dom");
        if ("ytm.load" === b) return "complete" === a.document.readyState ? (c(Tu(a, "ytm.load")), a = u) : a = Vu(a, c, "ytm.load", ["load"], a), a;
        if ("ytm.click" === b) return Vu(a, c, "ytm.click", ["click"]);
        if ("ytm.formSubmit" === b) return Vu(a, c, "ytm.formSubmit", ["submit"], a)
    }
    var Yu = ["ytm.js"],
        Zu = ["ytm.js", "ytm.dom", "ytm.load"];

    function $u(a, b) {
        var c = a[b["var"]],
            d = "eq" === b.fn,
            e = b.target;
        return c && "event" === c.type && d && y(e) && e
    }

    function av(a) {
        return Ib(H(cb("conditions"), Jb(F(a.variables, $u)), nb), a.triggers)
    }

    function bv(a, b, c) {
        var d = void 0 === d ? "dataLayer" : d;
        c = av(c);
        var e = [],
            f = [];
        M(function(g) {
            if (K(g, Ru)) {
                var h = Xu(a, g, b);
                h && e.push(h);
                K(g, Yu) && f.push(g)
            } else f.push(g)
        }, sl(function(g, h) {
            var k = vb(a)(g, Zu),
                l = vb(a)(h, Zu);
            return -1 === k ? 1 : -1 === l ? -1 : k - l
        }, c));
        c = J(a, d);
        c || (c = [], a[d] = c);
        Xi(a, c, function(g) {
            g.oa.F(function(h) {
                var k = J(h, "event");
                y(k) && K(k, f) && b(h)
            });
            e.push(g.unsubscribe)
        });
        return function() {
            return M(Qe, e)
        }
    }
    var cv = u,
        dv = x(function(a, b) {
            cv = b
        });

    function ev(a, b, c) {
        return function() {
            try {
                return b.apply(null, arguments)
            } catch (d) {
                cv(a, d)
            }
            return c
        }
    }

    function fv(a) {
        dv(a, function(b, c) {
            mf(a, "ytm." + b, c)
        })
    }

    function gv(a, b) {
        return a === b
    }

    function hv(a, b, c) {
        return Wb(a, b) && Wb(a, c) ? b > c : !1
    }

    function iv(a, b, c) {
        return Wb(a, b) && Wb(a, c) ? b < c : !1
    }

    function jv(a, b, c) {
        if (!y(b) || !y(c)) return !1;
        try {
            return (new RegExp(c, a ? "i" : "")).test(b)
        } catch (d) {
            return !1
        }
    }

    function kv(a, b) {
        return L(a) ? K(b, a) : y(a) ? Na(a, "" + b) : !1
    }

    function lv(a, b, c, d) {
        var e = b.defaultValue;
        if (b = c(b.key)) return d && d.X.checkPermission({
            permissions: d.permissions,
            permissionType: "dataLayer",
            permissionParams: {
                key: b,
                operation: 2
            }
        }), a = J(a, b), C(a) ? e ? c(e) : void 0 : a
    }
    var mv = x(function(a, b, c) {
        b = void 0 === c.min ? 0 : c.min;
        b = a.Math.random() * ((void 0 === c.max ? 2147483647 : c.max) - b + 1) + b;
        return (void 0 === c.isInt ? 0 : c.isInt) ? a.Math.floor(b) : b
    }, Da);

    function nv(a, b, c, d) {
        d = void 0 === d ? !1 : d;
        return "query" === b ? c ? Vd(a.query)[c] : a.query : "protocol" === b ? a.protocol : "host" === b ? d ? ee(a.host) : a.host : "port" === b ? (b = a.protocol, a = Ub(a.port) ? a.port : "http:" === b ? "80" : "https:" === b ? "443" : void 0, a) : "path" === b ? a.pathname : "fragment" === b ? a.hash.replace("#", "") : "extension" === b ? (a = a.pathname.split("."), ((1 < a.length ? a.pop() : void 0) || "").split("/")[0]) : a.href
    }
    var ov = "clientInformation globalThis this caches console cookieStore credentialless crypto customElements document documentPictureInPicture event external fence frameElement frames history indexedDB launchQueue localStorage location mozInnerScreenX mozInnerScreenY navigation navigator opener orientation origin originAgentCluster parent performance scheduler self sessionStorage sharedStorage speechSynthesis top trustedTypes visualViewport window alert atob back blur btoa cancelAnimationFrame cancelIdleCallback captureEvents clearImmediate clearInterval clearTimeout close confirm dump fetch find focus forward getComputedStyle getDefaultComputedStyle getScreenDetails getSelection matchMedia moveBy moveTo open postMessage print prompt queryLocalFonts queueMicrotask releaseEvents reportError requestAnimationFrame requestFileSystem requestIdleCallback resizeBy resizeTo scroll scrollBy scrollByLines scrollByPages scrollTo setImmediate setInterval setTimeout showDirectoryPicker showModalDialog showOpenFilePicker showSaveFilePicker sizeToContent stop structuredClone".split(" ");

    function pv(a) {
        if (!y(a)) throw jd("gppns");
        if (K(a.split(".")[0], ov)) throw jd("rwp");
        if (tj(a, "on")) throw jd("rwp");
    }

    function qv(a, b) {
        if (C(b) || !!b === b || Rb(a, b) || y(b)) return b
    }

    function rv(a, b) {
        if (C(b)) return b;
        var c = qv(a, b);
        if (!C(c)) return c;
        if (Ra(b)) return G(function(d, e) {
            var f = q(e),
                g = f.next().value;
            f = f.next().value;
            d[g] = rv(a, f);
            return d
        }, {}, ac(b));
        if (L(b)) return M(F(a, rv), b)
    }

    function sv(a, b) {
        var c = a(b);
        return C(c) ? void 0 : "" + c
    }

    function tv(a, b, c, d, e) {
        var f = F(d, sv);
        if ("event" === c.type) return lv(b, {
            type: "dataLayer",
            key: "event"
        }, f, e);
        if ("dataLayer" === c.type) return lv(b, c, f, e);
        if ("cnst" === c.type) return d(c.value);
        if ("rand" === c.type) return mv(a, b, c);
        if ("url" === c.type || "ref" === c.type) {
            a: if (e = !1, b = c.component, d = "url" === c.type ? (d = c.urlSource) ? f(d) : J(a, "location.href") : J(a, "document.referrer"), d) {
                if ("queryVar" === c.component) {
                    b = "query";
                    var g = f(c.key);
                    if (!g) {
                        a = void 0;
                        break a
                    }
                }
                "host" === c.component && (e = c.Ni);
                a = qh(a, d);
                a = nv(a, b, g, e)
            } else a =
                void 0;
            return a
        }
        if ("cookie" === c.type) return a = "null" === a.origin ? "" : (g = f(c.cookieName)) ? (a = te(a)) ? a[g] || "" : "" : "", a;
        if ("js" === c.type) return (g = f(c.key)) ? (pv(g), e && e.X.checkPermission({
            permissions: e.permissions,
            permissionType: "globals",
            permissionParams: {
                key: g,
                operation: 2
            }
        }), g = J(a, g), a = qv(a, g)) : a = void 0, a
    }

    function uv(a, b, c, d, e) {
        var f = d[c];
        if (!f) throw jd("var: " + c);
        c = E([a, b, d], vv);
        return tv(a, b, f, c, e)
    }

    function vv(a, b, c, d, e) {
        if (L(d)) {
            if ("template" === d[0]) return T("", M(function(f) {
                return vv(a, b, c, f, e)
            }, d.slice(1)));
            if ("var" === d[0]) return d = q(d), d.next(), d = d.next().value, uv(a, b, d, c, e)
        } else return d
    }

    function wv(a, b, c) {
        a = Pf(a);
        if (!(a && y(c) && b instanceof HTMLElement)) return !1;
        try {
            return a.call(b, c)
        } catch (d) {
            return !1
        }
    }

    function xv(a, b) {
        if ("eq" === b) return gv;
        if ("more" === b) return F(a, hv);
        if ("less" === b) return F(a, iv);
        if ("regex" === b) return F(!1, jv);
        if ("iRegex" === b) return F(!0, jv);
        if ("css" === b) return F(a, wv);
        if ("inc" === b) return kv
    }
    var yv = ev("c.ch", function(a, b, c, d) {
        var e = uv(a, b, c["var"], d),
            f = c.target,
            g = c.not,
            h = xv(a, c.fn);
        if (!h) throw jd("fn: " + c.fn);
        a = vv(a, b, d, f);
        return g ? !h(e, a) : h(e, a)
    }, !1);

    function zv(a, b) {
        var c = b.split("."),
            d = c.pop();
        c = c.length ? J(a, T(".", c)) : a;
        if (!c) throw jd("noma");
        return {
            value: J(c, d),
            parent: c,
            Jc: d
        }
    }

    function Av(a, b, c, d) {
        var e = Lf(a)("img");
        e.src = b;
        b = F(e, Mf);
        var f = F(void 0, w);
        e.onerror = H(b, f, d);
        e.onload = H(b, f, c);
        kc(a) && (a = Qf(a), N(e.style, {
            position: "absolute",
            visibility: "hidden",
            width: "0px",
            height: "0px"
        }), a.appendChild(e))
    }
    var Bv = x(function(a, b) {
            return G(function(c, d) {
                c[d] = a[d];
                return c
            }, {}, b)
        }),
        Cv = "protocol host port path query extension fragment href".split(" ");

    function Dv(a, b, c, d) {
        if (!c) return !1;
        var e = (b = "set_cookies" === b) ? 1 : 2;
        return b && !Ra(d) ? !1 : a.na({
            permissionType: "cookies",
            permissionParams: {
                name: c,
                operation: e,
                options: d
            }
        })
    }

    function Ev(a, b, c, d) {
        if (!c || !y(c) || !y(d)) return !1;
        switch (c) {
            case "read":
                c = 2;
                break;
            case "write":
                c = 1;
                break;
            case "execute":
                c = 4;
                break;
            default:
                return !1
        }
        return a.na({
            permissionType: "access_local_storage" === b ? "localStorage" : "globals",
            permissionParams: {
                key: d,
                operation: c
            }
        })
    }

    function Fv(a, b, c) {
        if (!c) return !1;
        var d = "iframe";
        "load_script" === b ? d = "loadScript" : "send_pixel" === b && (d = "pixel");
        return a.na({
            permissionType: d,
            permissionParams: {
                url: c
            }
        })
    }
    var Gv = {},
        Hv = (Gv.access_globals = Ev, Gv.access_local_storage = Ev, Gv.get_cookies = Dv, Gv.get_referrer = function(a, b, c) {
            return a.na({
                permissionType: "referrer",
                permissionParams: {
                    urlComponent: c || "href"
                }
            })
        }, Gv.get_url = function(a, b, c) {
            return a.na({
                permissionType: "url",
                permissionParams: {
                    urlComponent: c || "href"
                }
            })
        }, Gv.inject_hidden_iframe = Fv, Gv.load_script = Fv, Gv.logging = function(a) {
            return a.na({
                permissionType: "log",
                permissionParams: null
            })
        }, Gv.read_data_layer = function(a, b, c) {
            return c ? a.na({
                permissionType: "dataLayer",
                permissionParams: {
                    key: c,
                    operation: 2
                }
            }) : !1
        }, Gv.read_title = function(a) {
            return a.na({
                permissionType: "readTitle",
                permissionParams: null
            })
        }, Gv.send_pixel = Fv, Gv.set_cookies = Dv, Gv),
        Iv = {},
        Jv = (Iv.callInWindow = function(a) {
                var b = a.l,
                    c = a.X;
                return function(d) {
                    var e = la.apply(1, arguments);
                    pv(d);
                    c.checkPermission({
                        permissionType: "globals",
                        permissionParams: {
                            key: d,
                            operation: 4
                        }
                    });
                    var f = J(b, d);
                    if (!A(f)) throw jd("ca.c.wenf");
                    e = f.apply(null, ca(e));
                    return rv(b, e)
                }
            }, Iv.callLater = function(a) {
                var b = a.l;
                return function(c) {
                    X(b,
                        c, 0)
                }
            }, Iv.copyFromDataLayer = function(a) {
                var b = a.l,
                    c = a.X,
                    d = a.event;
                return function(e) {
                    if (!d) throw jd("No dataLayer data");
                    c.checkPermission({
                        permissionType: "dataLayer",
                        permissionParams: {
                            key: e,
                            operation: 2
                        }
                    });
                    return rv(b, J(d, e))
                }
            }, Iv.copyFromWindow = function(a) {
                var b = a.l,
                    c = a.X;
                return function(d) {
                    pv(d);
                    c.checkPermission({
                        permissionType: "globals",
                        permissionParams: {
                            operation: 2,
                            key: d
                        }
                    });
                    d = J(b, d);
                    return rv(b, d)
                }
            }, Iv.createArgumentsQueue = function(a) {
                var b = a.l,
                    c = a.X;
                return function(d, e) {
                    function f() {
                        return g.push(arguments)
                    }
                    c.checkPermission({
                        permissionType: "globals",
                        permissionParams: {
                            key: d,
                            operation: 2
                        }
                    });
                    c.checkPermission({
                        permissionType: "globals",
                        permissionParams: {
                            key: d,
                            operation: 1
                        }
                    });
                    c.checkPermission({
                        permissionType: "globals",
                        permissionParams: {
                            key: e,
                            operation: 2
                        }
                    });
                    c.checkPermission({
                        permissionType: "globals",
                        permissionParams: {
                            key: e,
                            operation: 1
                        }
                    });
                    pv(d);
                    pv(e);
                    var g = [],
                        h = zv(b, d);
                    h.value || (h.parent[h.Jc] = f);
                    h = zv(b, e);
                    if (h.value) {
                        if (!L(h.value)) throw jd("ca.akna");
                        g = h.value
                    } else h.parent[h.Jc] = g;
                    return f
                }
            }, Iv.createQueue =
            function(a) {
                var b = a.l,
                    c = a.X;
                return function(d) {
                    c.checkPermission({
                        permissionType: "globals",
                        permissionParams: {
                            key: d,
                            operation: 2
                        }
                    });
                    c.checkPermission({
                        permissionType: "globals",
                        permissionParams: {
                            key: d,
                            operation: 1
                        }
                    });
                    pv(d);
                    var e = zv(b, d);
                    d = e.value;
                    var f = e.parent;
                    e = e.Jc;
                    if (!d) f[e] = [];
                    else if (!L(d)) throw jd("akna");
                    return D(f[e].push, f[e])
                }
            }, Iv.decodeUri = function(a) {
                var b = a.l;
                return function(c) {
                    try {
                        return b.decodeURI(c)
                    } catch (d) {}
                }
            }, Iv.decodeUriComponent = function(a) {
                var b = a.l;
                return function(c) {
                    try {
                        return b.decodeURIComponent(c)
                    } catch (d) {}
                }
            },
            Iv.encodeUri = function(a) {
                var b = a.l;
                return function(c) {
                    try {
                        return b.encodeURI(c)
                    } catch (d) {}
                }
            }, Iv.encodeUriComponent = function(a) {
                var b = a.l;
                return function(c) {
                    try {
                        return b.encodeURIComponent(c)
                    } catch (d) {}
                }
            }, Iv.getCookieValues = function(a) {
                var b = a.l,
                    c = a.X;
                return function(d, e) {
                    e = void 0 === e ? !0 : e;
                    c.checkPermission({
                        permissionType: "cookies",
                        permissionParams: {
                            name: d,
                            operation: 2
                        }
                    });
                    return G(function(f, g) {
                        var h = q(ke(g).split("=")),
                            k = h.next().value;
                        h = h.next().value;
                        k === d && f.push(e ? Ud(h) : h);
                        return f
                    }, [], b.document.cookie.split(";"))
                }
            },
            Iv.getTimestamp = function(a) {
                var b = a.l;
                return function() {
                    return Ed(b)(Ad)
                }
            }, Iv.getType = function(a) {
                var b = a.l;
                return function(c) {
                    return B(c) ? "undefined" : Qa(c) ? "null" : Rb(b, c) ? "number" : y(c) ? "string" : !0 === c || !1 === c ? "boolean" : A(c) ? "function" : L(c) ? "array" : "object"
                }
            }, Iv.getUrl = function(a) {
                var b = a.l,
                    c = a.X;
                return function(d) {
                    d = K(d, Cv) ? d : "href";
                    c.checkPermission({
                        permissionType: "url",
                        permissionParams: {
                            urlComponent: d
                        }
                    });
                    var e = U(b);
                    e.query = e.search.replace(/^\?/, "");
                    return nv(e, d)
                }
            }, Iv.injectHiddenIframe = function(a) {
                var b =
                    a.l,
                    c = a.X;
                return function(d, e) {
                    e = void 0 === e ? u : e;
                    c.checkPermission({
                        permissionType: "iframe",
                        permissionParams: {
                            url: d
                        }
                    });
                    var f = Lf(b)("iframe");
                    N(f.style, {
                        display: "none",
                        width: "1px",
                        height: "1px",
                        visibility: "hidden"
                    });
                    f.src = d;
                    f.onload = function() {
                        return e()
                    };
                    f.onerror = u;
                    Qf(b).appendChild(f)
                }
            }, Iv.JSON = function(a) {
                var b = a.l;
                return {
                    parse: function(c) {
                        try {
                            return b.JSON.parse("" + c)
                        } catch (d) {}
                    },
                    stringify: function(c) {
                        try {
                            return b.JSON.stringify(c)
                        } catch (d) {}
                    }
                }
            }, Iv.loadScript = function(a) {
                var b = a.l,
                    c = a.X;
                return function(d,
                    e, f) {
                    c.checkPermission({
                        permissionType: "loadScript",
                        permissionParams: {
                            url: d
                        }
                    });
                    Nt(b, d, A(e) ? ev("ls.ol", function() {
                        return e.apply(null)
                    }) : u, A(f) ? ev("ls.ol", function() {
                        return f.apply(null)
                    }) : void 0)
                }
            }, Iv.localStorage = function(a) {
                var b = a.X,
                    c = a.l.localStorage;
                return {
                    getItem: function(d) {
                        b.checkPermission({
                            permissionType: "localStorage",
                            permissionParams: {
                                key: d,
                                operation: 2
                            }
                        });
                        return c.getItem(d)
                    },
                    setItem: function(d, e) {
                        b.checkPermission({
                            permissionType: "localStorage",
                            permissionParams: {
                                key: d,
                                operation: 1
                            }
                        });
                        c.setItem(d, e)
                    },
                    removeItem: function(d) {
                        b.checkPermission({
                            permissionType: "localStorage",
                            permissionParams: {
                                key: d,
                                operation: 1
                            }
                        });
                        c.removeItem(d)
                    }
                }
            }, Iv.logToConsole = function(a) {
                var b = a.l,
                    c = a.X;
                return function() {
                    var d = la.apply(0, arguments);
                    if (c.na({
                            permissionType: "log",
                            permissionParams: {
                                logLevel: 0
                            }
                        })) {
                        var e;
                        (e = Wk(b)).log.apply(e, ca(d))
                    }
                }
            }, Iv.Math = function(a) {
                return Bv(a.l.Math, "abs floor ceil round max min pow sqrt".split(" "))
            }, Iv.Object = function(a) {
                var b = a.l;
                return {
                    keys: bc,
                    values: ec,
                    freeze: function(c) {
                        return b.Object.freeze(c)
                    },
                    entries: ac,
                    "delete": function(c, d) {
                        if (!c || !I(c, d) || L(c) || c === b) return !1;
                        try {
                            return delete c[d]
                        } catch (e) {
                            return !1
                        }
                    }
                }
            }, Iv.queryPermission = function(a) {
                var b = a.X;
                return function(c, d, e) {
                    return (B(d) || y(d)) && I(Hv, c) ? (0, Hv[c])(b, c, d, e) : !1
                }
            }, Iv.readTitle = function(a) {
                var b = a.l,
                    c = a.X;
                return function() {
                    c.checkPermission({
                        permissionType: "readTitle",
                        permissionParams: null
                    });
                    return b.document.title
                }
            }, Iv.sendPixel = function(a) {
                var b = a.X,
                    c = a.l;
                return function(d, e, f) {
                    e = void 0 === e ? u : e;
                    f = void 0 === f ? u : f;
                    if (!y(d)) throw jd("ca.p.uns");
                    b.checkPermission({
                        permissionType: "pixel",
                        permissionParams: {
                            url: d
                        }
                    });
                    Av(c, d, e, f)
                }
            }, Iv.setCookie = function(a) {
                var b = a.l,
                    c = a.X;
                return function(d, e, f, g) {
                    f = void 0 === f ? {} : f;
                    g = void 0 === g ? !0 : g;
                    c.checkPermission({
                        permissionType: "cookies",
                        permissionParams: {
                            name: d,
                            operation: 1,
                            options: f
                        }
                    });
                    e = g ? Td(e) : e;
                    d = d + "=" + e + ";";
                    if (f) {
                        I(f, "domain") && (d += " Domain=" + f.domain + ";");
                        I(f, "path") && (d += " Path=" + f.path + ";");
                        I(f, "expires") && (d += " Expires=" + f.expires + ";");
                        if (I(f, "max-age")) {
                            if (!Rb(b, f["max-age"])) throw jd("ca.c.mann");
                            d += " Max-Age=" + f["max-age"] + ";"
                        }
                        if (I(f, "sameSite")) {
                            if (!K(f.sameSite, ["Lax", "Strict", "None"])) throw jd("ca.c.ssuop");
                            d += " Same-Site=" + f.sameSite + ";"
                        }
                        I(f, "secure") && f.secure && (d += " Secure;")
                    }
                    b.document.cookie = d
                }
            }, Iv.setInWindow = function(a) {
                var b = a.l,
                    c = a.X;
                return function(d, e, f) {
                    f = void 0 === f ? !1 : f;
                    c.checkPermission({
                        permissionType: "globals",
                        permissionParams: {
                            key: d,
                            operation: 1
                        }
                    });
                    pv(d);
                    try {
                        var g = zv(b, d),
                            h = g.parent,
                            k = g.Jc;
                        if (!f && I(h, k)) return !1;
                        h[k] = e;
                        return !0
                    } catch (l) {
                        return !1
                    }
                }
            }, Iv);

    function Kv(a) {
        return I(Jv, a) ? Jv[a] : void 0
    }

    function Lv(a, b) {
        for (var c = a.length; 0 < c;) {
            var d = a[--c];
            if (I(d.De, b)) return d.De[b]
        }
    }

    function Mv(a, b, c) {
        b = void 0 === b ? {} : b;
        c = void 0 === c ? {} : c;
        b = void 0 === b ? {} : b;
        c = void 0 === c ? {} : c;
        return a.concat({
            De: b,
            methods: c,
            oc: !0
        })
    }

    function Nv(a, b, c, d) {
        for (var e = a.length - 1; 0 <= e; --e) {
            var f = a[e];
            f.oc = !1;
            if (I(f.methods, b)) {
                f.methods[b](d ? d() : void 0);
                return
            }
        }
        throw jd(c);
    }

    function Ov(a, b) {
        var c = q(b);
        c.next();
        var d = c.next().value,
            e = c.next().value,
            f = c.next().value,
            g = M(w, a);
        return function() {
            var h = arguments,
                k = G(function(m, p, r) {
                    if (m[p]) throw jd("da");
                    m[p] = {
                        kind: 1,
                        value: h[r]
                    };
                    return m
                }, {}, e);
            d && !K(d, e) && (k[d] = {
                kind: 0,
                value: d
            });
            var l;
            Pv(g, f, k, {
                "return": function(m) {
                    l = m
                }
            });
            return l
        }
    }

    function Qv(a) {
        return L(a) && 42 === a[0]
    }

    function Rv(a) {
        return L(a) && 35 === a[0]
    }

    function Sv(a, b) {
        var c = q(b);
        c.next();
        c = ba(c);
        return G(function(d, e) {
            var f = q(e),
                g = f.next().value;
            f = f.next().value;
            g = Tv(a, g);
            f = Tv(a, f);
            d["" + g] = f;
            return d
        }, {}, c)
    }

    function Uv(a) {
        return L(a) && 40 === a[0]
    }

    function Vv(a, b) {
        var c = q(b);
        c.next();
        c = ba(c);
        return M(function(d) {
            return Tv(a, d)
        }, c)
    }

    function Wv(a, b) {
        var c = q(b);
        c.next();
        var d = c.next().value,
            e = c.next().value;
        c = c.next().value;
        e = Tv(a, e);
        c = Tv(a, c);
        switch (d) {
            case "==":
                return e == c;
            case "!=":
                return e != c;
            case "===":
                return e === c;
            case "!==":
                return e !== c;
            case "<":
                return e < c;
            case "<=":
                return e <= c;
            case ">":
                return e > c;
            case ">=":
                return e >= c;
            case "<<":
                return e << c;
            case ">>":
                return e >> c;
            case ">>>":
                return e >>> c;
            case "+":
                return e + c;
            case "-":
                return e - c;
            case "*":
                return e * c;
            case "/":
                return e / c;
            case "%":
                return e % c;
            case "|":
                return e | c;
            case "^":
                return e ^
                    c;
            case "&":
                return e & c;
            case "in":
                return e in c;
            case "instanceof":
                return e instanceof c;
            default:
                throw jd("uo");
        }
    }

    function Xv(a, b) {
        var c = q(b);
        c.next();
        var d = c.next().value;
        c = c.next().value;
        c = Tv(a, c);
        switch (d) {
            case "+":
                return +c;
            case "!":
                return !c;
            case "-":
                return -c;
            case "~":
                return ~c;
            default:
                throw jd("uo");
        }
    }

    function Yv(a, b, c) {
        c = void 0 === c ? [] : c;
        if (Uv(b)) {
            b = q(b);
            b.next();
            b = b.next().value;
            a = Lv(a, b);
            if (!a) throw jd("vnd");
            if (0 === a.kind && 0 === c.length) throw jd("cva");
            return {
                Gh: c,
                ei: a
            }
        }
        if (Rv(b)) {
            var d = q(b);
            d.next();
            b = d.next().value;
            d = d.next().value;
            d = Tv(a, d);
            c.push("" + d);
            return Yv(a, b, c)
        }
        throw jd("iat");
    }

    function Zv(a, b, c, d) {
        b = Yv(a, b);
        a = b.ei;
        var e = b.Gh;
        e.unshift("value");
        b = e.pop();
        a = G(function(f, g) {
            return f[g]
        }, a, e);
        switch (d) {
            case "=":
                return a[b] = c;
            case "+=":
                return a[b] += c;
            case "-=":
                return a[b] -= c;
            case "*=":
                return a[b] *= c;
            case "/=":
                return a[b] /= c;
            case "%=":
                return a[b] %= c;
            case "<<=":
                return a[b] <<= c;
            case ">>=":
                return a[b] >>= c;
            case ">>>=":
                return a[b] >>>= c;
            case "|=":
                return a[b] |= c;
            case "^=":
                return a[b] ^= c;
            case "&=":
                return a[b] &= c;
            default:
                throw jd("uo");
        }
    }

    function Tv(a, b) {
        if (y(b) || "[object Number]" === Object.prototype.toString.call(b) || !!b === b || Qv(b)) return Qv(b) ? null : b;
        if (Uv(b)) {
            var c = q(b);
            c.next();
            c = c.next().value;
            c = Lv(a, c);
            if (!c) throw jd("vnd");
            return c.value
        }
        if (L(b) && 37 === b[0]) {
            var d = q(b);
            d.next();
            c = d.next().value;
            d = ba(d);
            c = Tv(a, c);
            if (!A(c)) throw jd("tenf");
            d = M(F(a, Tv), d);
            return c.apply(null, d)
        }
        if (L(b) && 24 === b[0]) return Ov(a, b);
        if (Rv(b)) {
            d = q(b);
            d.next();
            c = d.next().value;
            d = d.next().value;
            c = Tv(a, c);
            d = Tv(a, d);
            if (!c) throw jd("noma");
            return c["" + d]
        }
        if (L(b) &&
            23 === b[0]) return Sv(a, b);
        if (L(b) && 22 === b[0]) return Vv(a, b);
        if (L(b) && 29 === b[0]) return Wv(a, b);
        if (L(b) && 25 === b[0]) return Xv(a, b);
        if (L(b) && 27 === b[0]) {
            d = q(b);
            d.next();
            var e = d.next().value;
            c = d.next().value;
            d = d.next().value;
            switch (e) {
                case "++":
                    e = "+=";
                    break;
                case "--":
                    e = "-=";
                    break;
                default:
                    throw jd("uo");
            }
            c ? c = Zv(a, d, 1, e) : (c = Tv(a, d), Zv(a, d, 1, e));
            return c
        }
        if (L(b) && 31 === b[0]) return e = q(b), e.next(), c = e.next().value, d = e.next().value, e = e.next().value, e = Tv(a, e), Zv(a, d, e, c);
        if (L(b) && 33 === b[0]) {
            c = q(b);
            c.next();
            d = c.next().value;
            e = c.next().value;
            c = c.next().value;
            if ("&&" === d) c = (d = Tv(a, e)) ? Tv(a, c) : d;
            else if ("||" === d) c = (d = Tv(a, e)) ? d : Tv(a, c);
            else throw jd("uo");
            return c
        }
        if (L(b) && 36 === b[0]) return e = q(b), e.next(), d = e.next().value, c = e.next().value, e = e.next().value, d = Tv(a, d), Tv(a, d ? c : e)
    }

    function $v(a) {
        return L(a) && (18 === a[0] || 19 === a[0])
    }

    function aw(a, b) {
        var c = q(b),
            d = c.next().value;
        c = ba(c);
        var e = 18 === d;
        M(function(f) {
            var g = q(f),
                h = g.next().value;
            g = g.next().value;
            if (e && 1 === f.length) throw jd("mca");
            f = a[a.length - 1].De;
            if (I(f, h)) throw jd("vr");
            g = B(g) ? g : Tv(a, g);
            f[h] = {
                kind: e ? 0 : 1,
                value: g
            }
        }, c)
    }

    function bw(a, b) {
        var c = q(b);
        c.next();
        var d = c.next().value;
        Nv(a, "return", "irs", function() {
            return B(d) ? d : Tv(a, d)
        })
    }

    function cw(a) {
        var b = {
            gd: !1
        };
        a = Mv(a, void 0, {
            "continue": function() {
                b.gd = !0
            },
            "break": u
        });
        b.stack = a;
        b.Cg = a[a.length - 1];
        return b
    }

    function dw(a, b) {
        if (L(b) && 3 === b[0]) Pv(a, b);
        else if ($v(b)) aw(a, b);
        else if (L(b) && 2 === b[0]) {
            var c = q(b);
            c.next();
            c = c.next().value;
            Tv(a, c)
        } else if (L(b) && 7 === b[0]) {
            var d = q(b);
            d.next();
            c = d.next().value;
            var e = d.next().value;
            d = d.next().value;
            Tv(a, c) ? dw(a, e) : d && dw(a, d)
        } else if (8 === b[0]) {
            c = q(b);
            c.next();
            var f = c.next().value;
            c = ba(c);
            d = e = !1;
            var g = [],
                h = [];
            f = Tv(a, f);
            for (var k = 0; k < c.length; k += 1) {
                var l = q(c[k]);
                l.next();
                var m = l.next().value;
                l = ba(l);
                var p = Qa(m);
                d = d || p;
                p || (e = e || Tv(a, m) === f);
                e && (g = g.concat(l));
                d && (h =
                    h.concat(l))
            }
            Pv(a, [3].concat(ca(e ? g : h)), {}, {
                "break": u
            })
        } else if (L(b) && 4 === b[0]) bw(a, b);
        else if (L(b) && 5 === b[0]) Nv(a, "break", "ibs");
        else if (L(b) && 6 === b[0]) Nv(a, "continue", "ics");
        else if (L(b) && 15 === b[0])
            for (d = q(b), d.next(), h = d.next().value, c = d.next().value, e = d.next().value, d = d.next().value, g = cw(a), h && ($v(h) ? aw(g.stack, h) : Tv(g.stack, h)), h = !0; h && (!c || Tv(g.stack, c));) h = g.Cg, dw(g.stack, d), g.gd && (h.oc = !0, g.gd = !1), h = h.oc, e && h && Tv(g.stack, e)
    }

    function Pv(a, b, c, d) {
        b = q(b);
        b.next();
        b = ba(b);
        a = Mv(a, c, d);
        c = a[a.length - 1];
        for (d = 0; d < b.length && c.oc; d += 1) dw(a, b[d])
    }

    function ew(a, b, c) {
        b = q(b);
        b.next();
        b.next();
        b = ba(b);
        a = {
            X: c.X,
            l: a,
            event: c.event
        };
        var d = {};
        c = N(c.data, (d.ytmOnFailure = u, d.ytmOnSuccess = u, d));
        d = {};
        c = Mv([], (d.undefined = {
            kind: 0,
            value: void 0
        }, d.require = {
            kind: 0,
            value: H(Kv, qa(Qe)(a))
        }, d.data = {
            kind: 0,
            value: c
        }, d));
        Pv(c, [3].concat(ca(b)))
    }

    function fw(a, b) {
        return {
            checkPermission: function(c) {
                c = N({
                    permissions: a
                }, c);
                b.checkPermission(c)
            },
            na: function(c) {
                c = N({
                    permissions: a
                }, c);
                return b.na(c)
            }
        }
    }

    function gw(a, b) {
        if (!I(b, "code") || !L(b.code) || !b.code[a]) throw jd("mp");
        return b.code[a]
    }

    function hw(a, b, c, d, e) {
        var f = d.data;
        f = L(f) ? f : gw(f, b);
        var g = fw(e.permissions, e.X);
        d = G(function(h, k) {
            var l = q(k),
                m = l.next().value;
            l = l.next().value;
            l = B(l) ? l : vv(a, c, b.variables, l, e);
            h[m] = rv(a, l);
            return h
        }, {}, ac(d.settings || {}));
        ew(a, f, {
            X: g,
            data: d,
            event: c
        })
    }

    function iw(a, b, c, d, e) {
        M(ev("t.e", function(f) {
            var g = b.tags[f],
                h = b.permissions[f];
            if (!g || !h) throw jd("i.conf." + b.containerVersion + "-" + f);
            var k = {
                X: e,
                permissions: h
            };
            "pro" === g.type ? hw(a, b, c, g, k) : "pix" === g.type && (f = k.X, h = k.permissions, g = vv(a, c, b.variables, g.data.pixelUrl, k), y(g) && (f.checkPermission({
                permissions: h,
                permissionType: "pixel",
                permissionParams: {
                    url: g
                }
            }), Av(a, g, u, u)))
        }), sl(function(f, g) {
            return f - g
        }, d))
    }

    function jw(a, b, c) {
        var d = b.triggers,
            e = b.variables;
        return {
            dispatchEvent: function(f) {
                var g = G(function(h, k) {
                    Nb(function(l) {
                        return !yv(a, f, l, e)
                    }, k.conditions) || M(function(l) {
                        K(l, h) || h.push(l)
                    }, k.tags);
                    return h
                }, [], d);
                0 === g.length || iw(a, b, f, g, c)
            }
        }
    }

    function kw(a, b) {
        return b.length > a.length ? !1 : a.substring(a.length - b.length) === b
    }

    function lw(a, b, c) {
        b = qh(a, b);
        if (!b.protocol || "https:" !== b.protocol) return !1;
        a = qh(a, c);
        return b.host && a.host && (tj(a.host, "*.") ? kw(b.host, a.host.substring(2)) : b.host === a.host) ? "/" === a.pathname ? !0 : kw(a.pathname, "/*") ? tj(b.pathname, a.pathname.substring(0, a.pathname.length - 2)) : a.pathname === b.pathname : !1
    }

    function mw(a, b, c, d) {
        if (!I(a, "cookies")) return !1;
        var e = a.cookies;
        a = I(e, b) ? e[b] : {
            access: 0
        };
        if (2 === c) return I(e, "ytm.ks.*") || !!(a.access & c);
        if (1 === c) {
            if (!I(e, b) || !d) return !1;
            b = a.access;
            e = a.domain;
            var f = a.path,
                g = a.secure,
                h = a.Li,
                k = !C(d.expires) || !C(d["max-age"]);
            if (I(a, "session") && h)
                if (1 === h) {
                    if (k) return !1
                } else if (!k) return !1;
            return !(b & c) || I(a, "domain") && e !== d.domain || I(a, "path") && f !== d.path || I(a, "secure") && (1 === g && !d.secure || 2 === g && d.secure) ? !1 : !0
        }
        return !1
    }

    function nw(a, b) {
        var c = b.permissionType,
            d = b.permissions,
            e = b.permissionParams;
        if ("globals" === c || "localStorage" === c || "dataLayer" === c) {
            var f = e.key;
            e = e.operation;
            I(d, c) ? (d = d[c], c = "dataLayer" === c && I(d, "ytm.ks.*") && d["ytm.ks.*"] & e ? !0 : I(d, f) ? !!(d[f] & e) : !1) : c = !1
        } else "url" === c || "referrer" === c ? (f = e.urlComponent, e = e.variableName, I(d, c) ? (c = d[c], c = "queryVar" === f ? I(c, "queryVars") && e ? K(e, c.queryVars) : !1 : !!c[f]) : c = !1) : "log" === c ? (c = e.logLevel, c = I(d, "log") ? c >= d.log : !1) : "loadScript" === c || "pixel" === c || "iframe" === c ? (f =
            e.url, I(d, c) && I(d[c], "allow") ? (c = d[c], c = Nb(E([a, f], lw), c.allow)) : c = !1) : c = "cookies" === c ? mw(d, e.name, e.operation, e.options) : "readTitle" === c ? I(d, "readTitle") ? d.readTitle : !1 : !1;
        return c
    }

    function ow(a, b) {
        return {
            containerId: b,
            permissionType: a.permissionType,
            permissionParams: a.permissionParams
        }
    }

    function pw(a, b) {
        function c(e) {
            var f = I(d, e.permissionType) && d[e.permissionType];
            if (f) {
                var g = ow(e, b);
                if (Nb(function(h) {
                        try {
                            return !1 === h(g, b)
                        } catch (k) {
                            return !0
                        }
                    }, f)) return !1
            }
            return nw(a, e)
        }
        var d = {};
        return {
            jg: function(e, f) {
                y(e) && A(f) && (I(d, e) || (d[e] = []), d[e].push(f))
            },
            checkPermission: function(e) {
                if (!c(e)) {
                    e = ow(e, b);
                    var f = Error("Permission denied for " + e.permissionType);
                    f.cause = e;
                    md(f)
                }
            },
            na: c
        }
    }
    var qw = x(function(a) {
            a = U(a).search;
            return Vd(a.substring(1))._ytm_preview
        }),
        rw = W("p.ips", function(a, b) {
            Wh(b, function(c) {
                (J(c, "settings.phchange") || J(c, "settings.phhide")) && Pt(a, "tag_phone", b, c)
            })
        }),
        sw = W("p.suic", function(a, b) {
            return Wh(b, function(c) {
                var d = Rc(a);
                if (!d.C("pic") && !Bm(c) && (c = J(c, "settings.pic"))) {
                    var e = Rh(a, "pic");
                    d.D("pic", 1);
                    return e({
                        N: {
                            Vc: !1,
                            Mc: !0
                        }
                    }, [c]).then(function(f) {
                        y(f.Ga) && (f = xf(a, f.Ga)) && (f = J(f, "ymaf"), y(f) && f && we(a, "_ym_fa", f, 43200))
                    })
                }
            })["catch"](V(a, "pic"))
        }),
        tw = W("p.tv",
            function(a) {
                if (Hl(a)) {
                    var b = Q(a);
                    Il(a).then(function(c) {
                        b.D("lgguid", c)
                    }, V(a, "p.tv.p"))
                }
            }),
        uw = W("p.cm", function(a) {
            Rc(a).ra("mcs", W("p.cm.cs", function(b, c, d, e, f) {
                if (fi(a, c)) return Ho(b, c, d, e, f);
                md(jd("cmws.cd"))
            })).ra("wsfm", Vg)
        }),
        vw = {},
        ww = x(Ce),
        xw = H(Va("exec", /counterID=(\d+)/), cb("1"));

    function yw(a, b) {
        var c = "" + b,
            d = {
                id: 1,
                ca: "0"
            },
            e = xw(c);
        e ? d.id = e : -1 === La(c, ":") ? (c = Ub(c), d.id = c) : (e = q(c.split(":")), c = e.next().value, e = e.next().value, d.id = Ub(c), d.ca = Nc(e) ? "1" : "0");
        return [fi(a, d), d]
    }
    var zw = pa(function(a, b) {
            var c = ww(a),
                d = q(ub(b)),
                e = d.next().value,
                f = d.next().value,
                g = ba(d);
            if (f) {
                d = q(yw(a, e));
                var h = d.next().value,
                    k = d.next().value;
                d = O(k);
                c[d] || (c[d] = {});
                c = c[d];
                b.Qe || vw[f] && G(function(l, m) {
                    return l || !!m(a, k, g, h)
                }, !1, vw[f]) || ("init" === f ? (b.Qe = !0, h ? (f = {}, Zh(a, "" + e, "dc", (f.key = e, f))) : a["yaCounter" + k.id] = new a.Ya[Mc.ec](N({}, g[0], k))) : h && h[f] && c.jh ? (h[f].apply(h, ca(g)), b.Qe = !0) : (d = c.Kf, d || (d = [], c.Kf = d), d.push(Pe([e, f], g))))
            }
        }),
        Aw = W("destruct.e", function(a, b, c) {
            return function() {
                var d =
                    Q(a),
                    e = b.id;
                M(function(f, g) {
                    return A(f) && V(a, "dest.fr." + g, f)()
                }, c);
                delete d.C("counters")[O(b)];
                delete a["yaCounter" + e]
            }
        });

    function Bw(a, b, c, d) {
        return function() {
            var e = Ha(arguments);
            e = d.apply(null, ca(e));
            return B(e) ? fi(a, b) : e
        }
    }

    function Cw(a, b, c, d) {
        return V(a, "cm." + c, d)
    }

    function Dw(a, b, c, d, e) {
        if (!c.length) return e;
        c = M(function(f) {
            return E([a, b, d], f)
        }, c);
        return H.apply(null, ca(c))(e)
    }
    var Ew = Q(window);
    Ew.ra("hitParam", {});
    Ew.ra("lastReferrer", window.location.href);
    ji.push(function(a, b) {
        var c = {};
        return c.firstPartyParams = yi(a, b), c.firstPartyParamsHashed = Ai(a, b), c
    });
    qf.push("fpp");
    qf.push("fpmh");
    (function() {
        var a = Q(window);
        a.ra("getCounters", Gi(window));
        ii.push(Hi);
        li.push(function(b, c) {
            c.counters = a.C("getCounters")
        })
    })();
    Qh["1"] = ef;
    ji.push(Qi);
    Mh["1"] = Gh;
    hh(Mi, -1);
    jh["1"] = [
        [Mi, -1],
        [gf, 1],
        [bh, 2],
        [Vg(), 3],
        [eh, 4]
    ];
    ji.push(aj);
    ji.push(W("p.ar", function(a, b) {
        var c = Rh(a, "a", b),
            d = {};
        return d.hit = function(e, f, g, h, k, l) {
            var m = {};
            m = {
                H: {},
                K: Le((m.pv = 1, m.ar = 1, m))
            };
            f = Ra(f) ? {
                title: f.title,
                tf: f.referer,
                O: f.params,
                Zb: f.callback,
                l: f.ctx
            } : {
                title: f,
                tf: g,
                O: h,
                Zb: k,
                l: l
            };
            h = Oi(b);
            g = e || U(a).href;
            h.url !== g && (h.ref = h.url, h.url = e);
            e = f.tf || h.ref || a.document.referrer;
            h = {};
            h = $h(a, b, "pv", (h.id = b.id, h.url = g, h.ref = e, h), f.O);
            k = N(m.M || {}, {
                O: f.O,
                title: f.title
            });
            l = {};
            m = c(N(m, {
                M: k,
                H: N(m.H || {}, (l["page-url"] = g, l["page-ref"] = e, l))
            }), b).then(h);
            return Ni(a,
                "p.ar.s", m, f.Zb || u, f.l)
        }, d
    }));
    Qh.a = ef;
    jh.a = fh;
    Mh.a = Gh;
    ji.push(dj);
    Qh.g = ef;
    Mh.g = Gh;
    jh.g = fh;
    ji.push(ej);
    ji.push(jj);
    jh.t = fh;
    Qh.t = ef;
    Mh.t = Gh;
    ji.push(W("cl.p", function(a, b) {
        function c(p, r, t, v) {
            v = void 0 === v ? {} : v;
            t ? mj(a, b, {
                url: t,
                ob: !0,
                vc: p,
                zc: r,
                sender: d,
                Xf: v
            }) : g.warn("clel")
        }
        var d = Rh(a, "2", b),
            e = [],
            f = O(b),
            g = Yh(a, f),
            h = V(a, "s.s.tr", F(Ei(a, f), lj));
        f = {
            l: a,
            fb: b,
            Mg: e,
            sender: d,
            Bi: Q(a),
            zg: Gf(a, b.id),
            Di: lg(a),
            Xh: F(F(f, Fi(a)), H(Qe, cb("trackLinks")))
        };
        f = V(a, "cl.p.c", F(f, nj));
        f = ud(a).F(a, ["click"], f);
        b.Tf && h(b.Tf);
        var k = V(a, "file.clc", E([!0, !1], c)),
            l = V(a, "e.l.l.clc", E([!1, !0], c));
        e = V(a, "add.f.e.clc", oj(e));
        var m = {};
        return m.file = k, m.extLink = l, m.addFileExtension =
            e, m.trackLinks = h, m.u = f, m
    }));
    jh["2"] = fh;
    Qh["2"] = ef;
    Mh["2"] = Gh;
    Qh.r = df("r");
    Mh.r = ["f", "x", "j", "i"];
    ki.push(W("p.r", function(a, b) {
        var c = wj(a),
            d = Rh(a, "r", b),
            e = V(a, "rts.p");
        return Wh(b, E([function(f, g) {
            var h = {
                    id: g.yg,
                    ca: g.ca
                },
                k = {
                    N: {
                        ba: g.Eh
                    },
                    K: Le(g.og),
                    H: g.O,
                    M: {
                        Pb: g.Pb
                    },
                    Ja: {
                        qa: g.qa
                    }
                };
            g.Ha && (k.Ha = nf(g.Ha));
            h = d(k, h)["catch"](e);
            return f.then(F(h, w))
        }, S.resolve(), c], G)).then(F(void 0, w))["catch"](e)
    }));
    kh("r", function(a) {
        return {
            V: function(b, c) {
                var d = void 0 === b.K ? Le() : b.K,
                    e = b.M.Pb,
                    f = pj(a),
                    g = d.C("rqnl", 0) + 1;
                d.D("rqnl", g);
                if (d = J(f, T(".", [e, "browserInfo"]))) d.rqnl = g, qj(a);
                c()
            },
            Ca: function(b, c) {
                rj(a, b);
                c()
            }
        }
    }, 1);
    hh(sj, 100);
    kh("1", sj, 100);
    kh("n", sj, 100);
    kh("m", sj, 100);
    ji.push(yj);
    kh("n", gf, 1);
    kh("n", bh, 2);
    kh("n", Vg(), 3);
    kh("n", eh, 3);
    Qh.n = ef;
    Mh.n = Gh;
    Ve({
        He: {
            da: "accurateTrackBounce"
        }
    });
    ji.push(Uj);
    Qh.m = df("cm");
    Mh.m = Kh;
    kh("m", Vg(["u", "v", "vf"]), 1);
    Ve({
        ug: {
            da: "clickmap"
        }
    });
    ji.push(Vj);
    ji.push(Xj);
    ji.push(jk);
    ji.push(qk);
    ji.push(Ik);
    qf.push("ecommerce");
    Ve({
        nd: {
            da: "ecommerce",
            Va: function(a) {
                if (a) return !0 === a ? "dataLayer" : "" + a
            }
        }
    });
    ji.push(Nk);
    qf.push("user_id");
    ji.push(Ok);
    hh(function(a, b) {
        return {
            Ca: function(c, d) {
                var e = fi(a, b);
                e = e && e.userParams;
                var f = (c.M || {}).Be;
                e && f && e(f);
                d()
            }
        }
    }, 0);
    pe.push("_ym_debug");
    mi.unshift(Rk);
    ji.push(Sk);
    var Fw = {},
        Gw = (Fw.tp = H(Da, Ki, hb), Fw.tpid = H(Da, function(a) {
            a = O(a);
            return Ii[a] && Ii[a].Wh || null
        }), Fw);
    N(Tg, Gw);
    hh(Tk, 20);
    kh("n", Tk, 20);
    kh("1", Tk, 20);
    mi.unshift(Vk);
    Tg.fp = function(a, b, c) {
        if (c.H && c.H.nohit) return null;
        c = Q(a).C;
        if (!c("fpe")) return null;
        b = Uk(b);
        if (b.Og) return null;
        c = c("fht", Infinity);
        a: {
            var d = J(a, "performance.getEntriesByType");
            if (A(d)) {
                if (a = mb(H(w, cb("name"), ra("first-contentful-paint")), d.call(a.performance, "paint")), a.length) {
                    a = a[0].startTime;
                    break a
                }
            } else {
                var e = J(a, "chrome.loadTimes");
                d = Qg(a);
                if (A(e) && (e = e.call(a.chrome), e = J(e, "firstPaintTime"), d && e)) {
                    a = 1E3 * e - d;
                    break a
                }
                if (a = J(a, "performance.timing.msFirstPaint")) {
                    a -= d;
                    break a
                }
            }
            a = void 0
        }
        return a &&
            c > a ? (b.Og = a, Math.round(a)) : null
    };
    ji.push(function(a, b) {
        var c = {};
        return c.ecommerceAdd = W("ecm.a", Zk(a, b)), c.ecommerceRemove = W("ecm.r", $k(a, b)), c.ecommerceDetail = W("ecm.d", al(a, b)), c.ecommercePurchase = W("ecm.p", bl(a, b)), c
    });
    (function() {
        var a = {
            bu: Jl,
            pri: Zl
        };
        a.wv = F(2, w);
        a.ds = Wl;
        a.co = function(c) {
            return ib(Q(c).C("jn"))
        };
        a.td = am;
        var b = {};
        N(a, (b.iss = H(zc, hb), b.hdl = H(Ac, hb), b.iia = H(Bc, hb), b.cpf = H(tl, hb), b.ntf = x(function(c) {
            c = J(c, "Notification.permission");
            c = "denied" === c ? !1 : "granted" === c ? !0 : null;
            return Qa(c) ? null : c ? 2 : 1
        }), b.eu = ul("isEU"), b.ns = Qg, b.np = function(c) {
            return Xd(c, 0, 100) ? null : Cl(ke(jc(c), 100))
        }, b));
        a.pani = Ll;
        a.pci = Ml;
        a.si = Nl;
        a.gi = Ol;
        a.pic = qa(se)("_ym_fa");
        a.stlgg = ul("lgguid");
        a.sttdi = Gl;
        a.stti = Fl;
        a.sttifa = El;
        a.bl =
            ul("bl");
        a.ntq = ul("ntq");
        N(Tg, a)
    })();
    (function() {
        var a = {};
        a.oo = ul("oo");
        a.pmc = ul("cmc");
        a.re = H(og, hb);
        a.aw = function(b) {
            b = Je(H(C, Ea), [b.document.hidden, b.document.msHidden, b.document.webkitHidden]);
            return C(b) ? null : ib(!b)
        };
        a.rcm = rm;
        a.yu = function(b) {
            return (b = ze(b, "").C("yandexuid")) && b.substring(0, 25)
        };
        a.ifc = ul("ifc");
        a.ifb = ul("ifb");
        a.ecs = ul("ecs");
        a.csi = ul("scip");
        a.cdl = ul("cdl");
        a.eco = x(nm, H(Da, O));
        a.dss = ul("dSync");
        a.pis = ul("pis");
        a.ucs = function(b) {
            return (b = ze(b).C("ucs")) && b.substring(0, 25)
        };
        N(wf, a)
    })();
    Mh.er = Ih;
    (function() {
        var a = window;
        try {
            var b = Nh(a, "er"),
                c = um(a, b);
            lf.push(function(d, e, f, g) {
                if (!(.01 >= a.Math.random())) {
                    var h = {},
                        k = {},
                        l = {},
                        m = {},
                        p = {};
                    c((p[d] = (m[Mc.eb] = (l[e] = (k[f] = g ? (h[a.location.href] = g, h) : a.location.href, k), l), m), p))
                }
            })
        } catch (d) {}
    })();
    hi.push(function(a, b) {
        if (J(a, "disableYaCounter" + b.id) || J(a, "Ya.disableMetrica")) {
            var c = O(b);
            delete Q(a).C("counters", {})[c];
            md(hf("oo.e"))
        }
    });
    gh.unshift(function(a) {
        return {
            V: function(b, c) {
                Q(a).C("oo") || c()
            }
        }
    });
    hh(function(a, b) {
        return {
            V: function(c, d) {
                var e = c.H,
                    f = c.K;
                !vm[b.id] && f.C("pv") && b.exp && !e.nohit && (e.exp = b.exp, vm[b.id] = !0);
                d()
            }
        }
    }, -99);
    ji.push(wm);
    jh.e = fh;
    Qh.e = ef;
    Mh.e = Gh;
    Ve({
        exp: {
            da: "experiments"
        }
    });
    uf.experiments = "ex";
    xm.push(zm);
    Qh.f = ef;
    var Hw = {};
    N(Mh, (Hw.f = Hh, Hw));
    kh("f", Vg(), 1);
    kh("f", Wg, 2);
    kh("f", Tk, 20);
    hi.push(function(a, b) {
        var c = {
                ta: O(b),
                jd: fi(a, b),
                Sf: Ed(a),
                Rd: Ff(a)
            },
            d = c.Sf(Bd);
        if (!c.Rd.Id) {
            var e = c.Rd.C("ymoo" + c.ta);
            e && 30 > d - e ? (c = c.ta, delete Q(a).C("counters", {})[c], md(hf("uws"))) : Wh(b, Am(c))["catch"](V(a, "d.f"))
        }
    });
    var Iw = ["x"],
        Jw = {};
    N(Mh, (Jw.s = Iw, Jw.S = Iw, Jw.u = Ih, Jw));
    var Kw = {};
    N(Qh, (Kw.s = Oe, Kw.S = ef, Kw.u = Oe, Kw));
    kh("s");
    kh("u");
    kh("S", Vg(["v", "hid", "u", "vf", "rn"]), 1);
    ji.push(W("s", function(a, b) {
        return Wh(b, function(c) {
            var d = Q(a),
                e = d.C,
                f = F("dSync", d.D);
            O(b);
            if (e("dSync", !1)) f(1);
            else return f(!0), Qm(a, c, {
                fb: b,
                fe: "s",
                Pd: "ds",
                wb: f,
                Pf: function(g, h, k) {
                    var l = g.Ga;
                    g = g.host;
                    if (J(l, "settings")) return md(hf("ds.e"));
                    h = h(Ad) - k;
                    k = g[1];
                    g = {};
                    l = Le((g.di = l, g.dit = h, g.dip = k, g));
                    h = {};
                    h = (h["page-url"] = U(a).href, h);
                    return Rh(a, "S", gm)({
                        K: l,
                        H: h
                    }, gm).then(F(10, f), V(a, "ds.rs"))
                }
            })
        })
    }));
    Qh["8"] = Oe;
    Ch.br = {
        check: nh,
        id: 0
    };
    Mh["8"] = ["br"];
    ji.push(W("p.us", function(a, b) {
        return Wh(b, function(c) {
            if (J(c, "settings.sbp")) return Qm(a, c, {
                fb: b,
                fe: "8",
                Pd: "cs"
            })
        })
    }));
    ki.push(Ko);
    Ve({
        zb: {
            da: "webvisor",
            Va: jb
        },
        Eg: {
            da: "disableFormAnalytics",
            Va: jb
        }
    });
    kh("4", Vg(Io), 1);
    Qh["4"] = co;
    Mh["4"] = ["f", "x", "i"];
    ki.push(gq);
    kh("W", Vg(Io), 1);
    bf("wv", function(a, b) {
        return {
            V: function(c, d) {
                c.K.Sb("we", hb(b.zb));
                eo(a, b, c, "rn");
                d()
            }
        }
    }, 1);
    Mh.W = ["f", "x"];
    Qh.W = co;
    ki.push(Jr);
    ji.push(Kr);
    Ve({
        zb: {
            da: "webvisor"
        }
    });
    Ve({
        Zh: {
            da: "trustedDomains"
        },
        cc: {
            da: "childIframe",
            Va: jb
        }
    });
    ji.push(Vr);
    ji.push(gs);
    ji.push(Cs);
    Mh["6"] = ["f", "x"];
    Qh["6"] = Oe;
    ji.push(Es);
    ji.push(hm);
    li.push(function(a, b) {
        b.informer = Gs(a)
    });
    hh(Hs, 6);
    kh("1", Hs, 6);
    kh("adb");
    kh("n", Hs, 4);
    Mh.adb = Ih;
    Qh.adb = cf;
    ii.push(Ks);
    Mh["5"] = Gh;
    Qh["5"] = ef;
    jh["5"] = mb(H(wb, rb([gf, bh]), Ea), fh);
    ji.push(Ls);
    kh("5", Tk, 20);
    hh(Ns, 7);
    kh("n", Ns, 6);
    ki.push(Os);
    Qh.d = ef;
    kh("d", Vg(["hid", "u", "v", "vf"]), 1);
    Mh.d = Ih;
    kh("n", function(a, b) {
            return {
                Ca: function(c, d) {
                    if (!c.M || !c.M.force) {
                        var e = b.id === Mc.eg ? 1 : .002,
                            f = .002;
                        f = void 0 === f ? 1 : f;
                        e = void 0 === e ? 1 : e;
                        var g = vd(a);
                        if (g && A(g.getEntriesByType)) {
                            f = Math.random() > f;
                            var h = Math.random() > e;
                            if (!f || !h) {
                                var k = g.getEntriesByType("resource"),
                                    l = {},
                                    m = {};
                                g = {};
                                var p = qm();
                                e = U(a).href;
                                for (var r = 0; r < k.length; r += 1) {
                                    var t = k[r],
                                        v = q(t.name.replace(om, "").split("?")).next().value,
                                        z = Yj(v),
                                        P = {};
                                    P = (P.dns = Math.round(t.domainLookupEnd - t.domainLookupStart), P.tcp = Math.round(t.connectEnd - t.connectStart),
                                        P.duration = Math.round(t.duration), P.response = Math.round(t.responseEnd - t.requestStart), P);
                                    if ("script" === t.initiatorType && !f) {
                                        var R = {};
                                        m[v] = N(P, (R.name = t.name, R.decodedBodySize = t.decodedBodySize, R.transferSize = Math.round(t.transferSize), R))
                                    }!pm[z] && !p[z] || l[v] || h || (t = {}, l[v] = N(P, (t.pages = e, t)))
                                }
                                bc(l).length && (g.timings8 = l);
                                bc(m).length && (g.scripts = m);
                                bc(g).length && (f = {}, h = {}, Rh(a, "d", b)({
                                    K: Le((f.ar = 1, f.pv = 1, f)),
                                    N: {
                                        ba: yf(a, g) || void 0
                                    },
                                    H: (h["page-url"] = e, h)
                                }, {
                                    id: Mc.hg,
                                    ca: "0"
                                })["catch"](V(a, "r.tim.ng2")))
                            }
                        }
                    }
                    d()
                }
            }
        },
        7);
    Mh.ci = ["x"];
    Qh.ci = Oe;
    ki.push(W("p.sci", function(a, b) {
        return Wh(b, E([a, b], Rs))["catch"](V(a, "ins.cs"))
    }));
    ki.push(rl);
    hh(Ws, 8);
    kh("f", Ws, 3);
    kh("n", Ws, 5);
    kh("h", function(a) {
        return {
            Ca: function(b, c) {
                var d = b.Lh;
                $g(b) && d && Q(a).D("isEU", J(d, "settings.eu"));
                c()
            }
        }
    }, 3);
    ii.push(Hr);
    ki.push(dt);
    ji.push(gt);
    Ve({
        hi: {
            da: "yaDisableGDPR"
        },
        ii: {
            da: "yaGDPRLang"
        }
    });
    gh.push(function(a, b) {
        return {
            V: E([a, b], Ht)
        }
    });
    pe.push("gdpr");
    pe.push("gdpr_popup");
    qe.push(function(a, b) {
        var c = Wi(a);
        c = ut(c);
        if (mb(rb(tt), c).length) return !0;
        c = b(a, "gdpr");
        return K(c, [mt, ot])
    });
    gh.push(function(a) {
        return {
            V: function(b, c) {
                var d = b.Ja || {},
                    e;
                (e = J(a, "document.referrer")) ? (e = qh(a, e).host, e = de(e), e = Kt + "." + (e || Jt)) : e = Kc;
                b.Ja = N(d, {
                    $e: [e]
                });
                c()
            }
        }
    });
    hh(Wt, 5);
    kh("1", Wt, 6);
    Mh.c = Ih;
    Qh.c = Oe;
    kh("1", cu, 7);
    hh(cu, 7);
    ki.push(W("p.ot", eu));
    ki.push(Yd("cta", hu, !0));
    kh("n", function(a) {
        var b = Q(a);
        return {
            V: function(c, d) {
                var e = c.M || {},
                    f = b.C("cta"),
                    g = b.C("cta.e");
                if (f || g) {
                    e.O || (e.O = {});
                    e.O.__ym || (e.O.__ym = {});
                    var h = {};
                    f ? (f = M(function(k) {
                        var l = J(k, "topic");
                        k = J(k, "version");
                        var m = {};
                        return m.topic = l, m.version = k, m
                    }, f), h.ct = f) : g && (h["ct.e"] = g);
                    N(e.O.__ym, h);
                    c.M = N(c.M || {}, e)
                }
                d()
            }
        }
    }, 7);
    kh("n", Mi, 8);
    ji.push(Bu);
    kh("g", function(a, b) {
        return {
            V: function(c, d) {
                var e = c.H;
                if (e && e["page-url"]) {
                    var f = e["page-url"];
                    Nu(f) || Ou(f) ? Wh(b, function(g) {
                        var h = J(g, "settings.goal_values");
                        if (h) {
                            var k = (g = qh(a, f).query) ? Vd(g) : void 0;
                            if (k) {
                                g = c.M || {};
                                g.O || (g.O = {});
                                g.O.__ym || (g.O.__ym = {});
                                var l = Nu(f) ? Ku : Lu;
                                h = Qu(h);
                                h = Mu(a, k, h, l);
                                0 !== h.length && (k = {}, h = (k.cgd = h[0], k.cmg = h, k), N(g.O.__ym, h), c.M = N(c.M || {}, g))
                            }
                        }
                        d()
                    })["catch"](H(sa(d), V(a, "a.g.v"))) : d()
                } else d()
            }
        }
    }, -2);
    mi.push(W("cdl", function(a) {
        var b = Q(a).ra;
        if (a = J(a, "navigator.cookieDeprecationLabel")) try {
            a.getValue().then(F("cdl", b), E(["cdl", "e"], b))
        } catch (c) {
            b("cdl", "d")
        } else b("cdl", "na")
    }));
    Ve({
        Fg: {
            da: "disableYtm",
            Va: jb
        }
    });
    Mh.ytm = Jh;
    ji.push(W("p.ytm", function(a, b) {
        if (!b.Fg) {
            var c = !1,
                d = function() {
                    c = !0
                },
                e = [],
                f = function(h, k) {
                    e.push([h, k])
                };
            Wh(b, function(h) {
                if (!c && J(h, "settings.aytm")) {
                    fv(a);
                    h = qw(a);
                    var k = Nh(a, "ytm"),
                        l = {};
                    return Oe(a, k)({
                        N: {
                            ea: ["ytm"],
                            cb: !0
                        },
                        H: h ? (l.nonce = h, l) : void 0
                    }, [Mc.La + "//" + Kc + "/ytm-config/" + b.id]).then(function(m) {
                        m = m.Ga;
                        if (!c && Ra(m)) {
                            var p = pw(a, "" + b.id),
                                r = jw(a, m, p).dispatchEvent;
                            f = p.jg;
                            M(function(t) {
                                var v = q(t);
                                t = v.next().value;
                                v = v.next().value;
                                return f(t, v)
                            }, e);
                            xb(e);
                            r(Tu(a, "ytm.init"));
                            d = bv(a, r, m)
                        }
                    })
                }
            })["catch"](V(a,
                "ytm.s"));
            var g = {};
            return g.u = function() {
                return d()
            }, g.policy = function(h, k) {
                return f(h, k)
            }, g
        }
    }));
    ki.push(rw);
    Mh.pis = Kh;
    Qh.pis = Oe;
    ki.push(W("p.sci", function(a, b) {
        return Wh(b, function(c) {
            var d = J(c, "settings.pis");
            if (d && !Bm(c)) {
                c = Q(a);
                var e = c.C;
                c = c.D;
                e = e("pis");
                if (C(e)) return e = Rh(a, "pis"), c("pis", "0"), e({
                    N: {
                        ea: ["pis"]
                    }
                }, [d]).then(E(["pis", "1"], c), sa(E(["pis", "a"], c)))
            }
        })["catch"](V(a, "pis"))
    }));
    Mh.pic = Jh;
    Qh.pic = Oe;
    ki.push(sw);
    mi.push(tw);
    ji.push(uw);
    ji.push(function(a, b) {
        var c = ww(a),
            d = O(b),
            e = c[d];
        e || (e = {}, c[d] = e);
        e.jh = !0;
        if (c = e.Kf) d = zw(a), M(d, c)
    });
    ki.unshift(function(a, b) {
        Wh(b, function(c) {
            var d = Be(a),
                e = J(c, "settings.sm"),
                f = Mk(a);
            (d || e || f.id) && Pt(a, "tag_debug", b, c)
        })
    });

    function Lw(a, b, c, d) {
        var e = this;
        return V(window, "c.i", function() {
            function f(z) {
                (z = kk(k, m, "", z)(k, m)) && (A(z.then) ? z.then(g) : g(z));
                return z
            }

            function g(z) {
                z && (A(z) ? p.push(z) : Ra(z) && M(function(P) {
                    var R = q(P);
                    P = R.next().value;
                    R = R.next().value;
                    A(R) && ("u" === P ? p.push(R) : h(R, P))
                }, ac(z)))
            }

            function h(z, P, R) {
                e[P] = Dw(k, m, R || r, P, z)
            }
            var k = window;
            (!k || isNaN(a) && !a) && jf();
            var l = Oc(a, b, c, d),
                m = Pc(l);
            Ot(m).Hh = l;
            Ji(m, m.O || {});
            var p = [],
                r = [Cw, kk, Bw];
            r.unshift(gi);
            var t = M(w, ki);
            l = O(m);
            m.id || md(jd("Invalid Metrika id: " + m.id,
                !0));
            var v = Ew.C("counters", {});
            if (v[l]) return t = {}, Zh(k, l, "dc", (t.key = l, t)), v[l];
            v[l] = e;
            Ew.D("counters", v);
            Ew.ra("counter", e);
            M(function(z) {
                z(k, m)
            }, hi);
            M(f, ii);
            f(bi);
            h(Aw(k, m, p), "destruct", [Cw, Bw]);
            ai(k, E([k, t, f, 1, "a.i"], mq));
            M(f, ji);
            l = {};
            Fe(k, (l.counterKey = O(m), l.name = "counter", l.data = We(m), l))
        })()
    }
    M(qa(Qe)(window), mi);
    if (window.Ya && Lw) {
        var Mw = Mc.ec;
        window.Ya[Mw] = Lw;
        ei(window);
        M(H($a([window, window.Ya[Mw]]), Qe), li)
    }
    (function(a) {
        var b = J(a, "ym");
        if (b) {
            var c = J(b, "a");
            c || (b.a = [], c = b.a);
            var d = zw(a);
            Xi(a, c, function(e) {
                e.oa.F(d)
            }, !0)
        }
    })(window);
}).call(this);