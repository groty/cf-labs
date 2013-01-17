(function (m) {
    m.version = "0.8.5";
    m.protocol = 1;
    m.transports = [];
    m.j = [];
    m.sockets = {};
    m.connect = function (b, d) {
        var c = m.util.parseUri(b),
            h, e;
        if ("undefined" != typeof document) {
            c.protocol = c.protocol || document.location.protocol.slice(0, -1);
            c.host = c.host || document.domain;
            c.port = c.port || document.location.port
        }
        h = m.util.uniqueUri(c);
        var a = {
            host: c.host,
            secure: "https" == c.protocol,
            port: c.port || ("https" == c.protocol ? 443 : 80),
            query: c.query || ""
        };
        m.util.merge(a, d);
        if (a["force new connection"] || !m.sockets[h]) e = new m.Socket(a);
        if (!a["force new connection"] && e) m.sockets[h] = e;
        e = e || m.sockets[h];
        return e.of(c.path.length > 1 ? c.path : "")
    }
})("object" === typeof module ? module.exports : window.io = {});
(function (m, b) {
    var d = m.util = {}, c = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
        h = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
    d.parseUri = function (a) {
        a = c.exec(a || "");
        for (var f = {}, j = 14; j--;) f[h[j]] = a[j] || "";
        return f
    };
    d.uniqueUri = function (a) {
        var f = a.protocol,
            j = a.host;
        a = a.port;
        if ("document" in b) {
            j = j || document.domain;
            a = a || (f == "https" && document.location.protocol !== "https:" ? 443 : document.location.port)
        } else {
            j = j || "localhost";
            if (!a && f == "https") a = 443
        }
        return (f || "http") + "://" + j + ":" + (a || 80)
    };
    d.query = function (a, f) {
        var j = d.chunkQuery(a || ""),
            k = [];
        d.merge(j, d.chunkQuery(f || ""));
        for (var o in j) j.hasOwnProperty(o) && k.push(o + "=" + j[o]);
        return k.length ? "?" + k.join("&") : ""
    };
    d.chunkQuery = function (a) {
        var f = {};
        a = a.split("&");
        for (var j = 0, k = a.length, o; j < k; ++j) {
            o = a[j].split("=");
            if (o[0]) f[o[0]] = decodeURIComponent(o[1])
        }
        return f
    };
    var e = false;
    d.load = function (a) {
        if ("document" in b && document.readyState === "complete" || e) return a();
        d.on(b, "load", a, false)
    };
    d.on = function (a, f, j, k) {
        if (a.attachEvent) a.attachEvent("on" + f, j);
        else a.addEventListener && a.addEventListener(f, j, k)
    };
    d.request = function (a) {
        if ("undefined" != typeof window) {
            if (a && window.XDomainRequest) return new XDomainRequest;
            if (window.XMLHttpRequest && (!a || d.ua.hasCORS)) return new XMLHttpRequest;
            if (!a) try {
                return new window.ActiveXObject("Microsoft.XMLHTTP")
            } catch (f) {}
        }
        return null
    };
    "undefined" != typeof window && d.load(function () {
        e = true
    });
    d.defer = function (a) {
        if (!d.ua.webkit) return a();
        d.load(function () {
            setTimeout(a, 100)
        })
    };
    d.merge = function (a, f, j, k) {
        k = k || [];
        j = typeof j == "undefined" ? 2 : j;
        var o;
        for (o in f) if (f.hasOwnProperty(o) && d.indexOf(k, o) < 0) if (typeof a[o] !== "object" || !j) {
            a[o] = f[o];
            k.push(f[o])
        } else d.merge(a[o], f[o], j - 1, k);
        return a
    };
    d.mixin = function (a, f) {
        d.merge(a.prototype, f.prototype)
    };
    d.inherit = function (a, f) {
        function j() {}
        j.prototype = f.prototype;
        a.prototype = new j
    };
    d.isArray = Array.isArray || function (a) {
        return Object.prototype.toString.call(a) === "[object Array]"
    };
    d.intersect = function (a, f) {
        for (var j = [], k = a.length > f.length ? a : f, o = a.length > f.length ? f : a, p = 0, n = o.length; p < n; p++)~d.indexOf(k, o[p]) && j.push(o[p]);
        return j
    };
    d.indexOf = function (a, f, j) {
        if (Array.prototype.indexOf) return Array.prototype.indexOf.call(a, f, j);
        var k = a.length;
        for (j = j < 0 ? j + k < 0 ? 0 : j + k : j || 0; j < k && a[j] !== f; j++);
        return k <= j ? -1 : j
    };
    d.toArray = function (a) {
        for (var f = [], j = 0, k = a.length; j < k; j++) f.push(a[j]);
        return f
    };
    d.ua = {};
    d.ua.hasCORS = "undefined" != typeof window && window.XMLHttpRequest && function () {
        try {
            var a = new XMLHttpRequest
        } catch (f) {
            return false
        }
        return a.withCredentials != undefined
    }();
    d.ua.webkit = "undefined" != typeof navigator && /webkit/i.test(navigator.userAgent)
})("undefined" != typeof window ? io : module.exports, this);
(function (m, b) {
    function d() {}
    m.EventEmitter = d;
    d.prototype.on = function (c, h) {
        if (!this.$events) this.$events = {};
        if (this.$events[c]) if (b.util.isArray(this.$events[c])) this.$events[c].push(h);
        else this.$events[c] = [this.$events[c], h];
        else this.$events[c] = h;
        return this
    };
    d.prototype.addListener = d.prototype.on;
    d.prototype.once = function (c, h) {
        function e() {
            a.removeListener(c, e);
            h.apply(this, arguments)
        }
        var a = this;
        e.listener = h;
        this.on(c, e);
        return this
    };
    d.prototype.removeListener = function (c, h) {
        if (this.$events && this.$events[c]) {
            var e = this.$events[c];
            if (b.util.isArray(e)) {
                for (var a = -1, f = 0, j = e.length; f < j; f++) if (e[f] === h || e[f].listener && e[f].listener === h) {
                    a = f;
                    break
                }
                if (a < 0) return this;
                e.splice(a, 1);
                e.length || delete this.$events[c]
            } else if (e === h || e.listener && e.listener === h) delete this.$events[c]
        }
        return this
    };
    d.prototype.removeAllListeners = function (c) {
        if (this.$events && this.$events[c]) this.$events[c] = null;
        return this
    };
    d.prototype.listeners = function (c) {
        if (!this.$events) this.$events = {};
        this.$events[c] || (this.$events[c] = []);
        b.util.isArray(this.$events[c]) || (this.$events[c] = [this.$events[c]]);
        return this.$events[c]
    };
    d.prototype.emit = function (c) {
        if (!this.$events) return false;
        var h = this.$events[c];
        if (!h) return false;
        var e = Array.prototype.slice.call(arguments, 1);
        if ("function" == typeof h) h.apply(this, e);
        else if (b.util.isArray(h)) {
            h = h.slice();
            for (var a = 0, f = h.length; a < f; a++) h[a].apply(this, e)
        } else return false;
        return true
    }
})("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports);
(function (m, b) {
    function d(n) {
        return n < 10 ? "0" + n : n
    }
    function c(n) {
        f.lastIndex = 0;
        return f.test(n) ? '"' + n.replace(f, function (z) {
            var t = o[z];
            return typeof t === "string" ? t : "\\u" + ("0000" + z.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + n + '"'
    }
    function h(n, z) {
        var t, B, C, G, w = j,
            A, y = z[n];
        if (y instanceof Date) y = isFinite(n.valueOf()) ? n.getUTCFullYear() + "-" + d(n.getUTCMonth() + 1) + "-" + d(n.getUTCDate()) + "T" + d(n.getUTCHours()) + ":" + d(n.getUTCMinutes()) + ":" + d(n.getUTCSeconds()) + "Z" : null;
        if (typeof p === "function") y = p.call(z,
        n, y);
        switch (typeof y) {
            case "string":
                return c(y);
            case "number":
                return isFinite(y) ? String(y) : "null";
            case "boolean":
            case "null":
                return String(y);
            case "object":
                if (!y) return "null";
                j += k;
                A = [];
                if (Object.prototype.toString.apply(y) === "[object Array]") {
                    G = y.length;
                    for (t = 0; t < G; t += 1) A[t] = h(t, y) || "null";
                    C = A.length === 0 ? "[]" : j ? "[\n" + j + A.join(",\n" + j) + "\n" + w + "]" : "[" + A.join(",") + "]";
                    j = w;
                    return C
                }
                if (p && typeof p === "object") {
                    G = p.length;
                    for (t = 0; t < G; t += 1) if (typeof p[t] === "string") {
                        B = p[t];
                        if (C = h(B, y)) A.push(c(B) + (j ? ": " :
                            ":") + C)
                    }
                } else for (B in y) if (Object.prototype.hasOwnProperty.call(y, B)) if (C = h(B, y)) A.push(c(B) + (j ? ": " : ":") + C);
                C = A.length === 0 ? "{}" : j ? "{\n" + j + A.join(",\n" + j) + "\n" + w + "}" : "{" + A.join(",") + "}";
                j = w;
                return C
        }
    }
    if (b && b.parse) return m.JSON = {
        parse: b.parse,
        stringify: b.stringify
    };
    var e = m.JSON = {}, a = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        f = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        j, k, o = {
            "\u0008": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\u000c": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, p;
    e.stringify = function (n, z, t) {
        var B;
        k = j = "";
        if (typeof t === "number") for (B = 0; B < t; B += 1) k += " ";
        else if (typeof t === "string") k = t;
        if ((p = z) && typeof z !== "function" && (typeof z !== "object" || typeof z.length !== "number")) throw Error("JSON.stringify");
        return h("", {
            "": n
        })
    };
    e.parse = function (n, z) {
        function t(C, G) {
            var w, A, y = C[G];
            if (y && typeof y === "object") for (w in y) if (Object.prototype.hasOwnProperty.call(y, w)) {
                A = t(y, w);
                if (A !== undefined) y[w] = A;
                else delete y[w]
            }
            return z.call(C, G, y)
        }
        var B;
        n = String(n);
        a.lastIndex = 0;
        if (a.test(n)) n = n.replace(a, function (C) {
            return "\\u" + ("0000" + C.charCodeAt(0).toString(16)).slice(-4)
        });
        if (/^[\],:{}\s]*$/.test(n.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
            B = eval("(" + n + ")");
            return typeof z === "function" ? t({
                "": B
            }, "") : B
        }
        throw new SyntaxError("JSON.parse");
    }
})("undefined" != typeof io ? io : module.exports, typeof JSON !== "undefined" ? JSON : undefined);
(function (m, b) {
    var d = m.parser = {}, c = d.packets = ["disconnect", "connect", "heartbeat", "message", "json", "event", "ack", "error", "noop"],
        h = d.reasons = ["transport not supported", "client not handshaken", "unauthorized"],
        e = d.advice = ["reconnect"],
        a = b.JSON,
        f = b.util.indexOf;
    d.encodePacket = function (k) {
        var o = f(c, k.type),
            p = k.id || "",
            n = k.endpoint || "",
            z = k.ack,
            t = null;
        switch (k.type) {
            case "error":
                var B = k.reason ? f(h, k.reason) : "";
                k = k.advice ? f(e, k.advice) : "";
                if (B !== "" || k !== "") t = B + (k !== "" ? "+" + k : "");
                break;
            case "message":
                if (k.data !==
                    "") t = k.data;
                break;
            case "event":
                t = {
                    name: k.name
                };
                if (k.args && k.args.length) t.args = k.args;
                t = a.stringify(t);
                break;
            case "json":
                t = a.stringify(k.data);
                break;
            case "connect":
                if (k.qs) t = k.qs;
                break;
            case "ack":
                t = k.ackId + (k.args && k.args.length ? "+" + a.stringify(k.args) : "");
                break
        }
        o = [o, p + (z == "data" ? "+" : ""), n];
        t !== null && t !== undefined && o.push(t);
        return o.join(":")
    };
    d.encodePayload = function (k) {
        var o = "";
        if (k.length == 1) return k[0];
        for (var p = 0, n = k.length; p < n; p++) o += "\ufffd" + k[p].length + "\ufffd" + k[p];
        return o
    };
    var j = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;
    d.decodePacket = function (k) {
        var o = k.match(j);
        if (!o) return {};
        var p = o[2] || "";
        k = o[5] || "";
        var n = {
            type: c[o[1]],
            endpoint: o[4] || ""
        };
        if (p) {
            n.id = p;
            n.ack = o[3] ? "data" : true
        }
        switch (n.type) {
            case "error":
                o = k.split("+");
                n.reason = h[o[0]] || "";
                n.advice = e[o[1]] || "";
                break;
            case "message":
                n.data = k || "";
                break;
            case "event":
                try {
                    var z = a.parse(k);
                    n.name = z.name;
                    n.args = z.args
                } catch (t) {}
                n.args = n.args || [];
                break;
            case "json":
                try {
                    n.data = a.parse(k)
                } catch (B) {}
                break;
            case "connect":
                n.qs = k || "";
                break;
            case "ack":
                if (o = k.match(/^([0-9]+)(\+)?(.*)/)) {
                    n.ackId = o[1];
                    n.args = [];
                    if (o[3]) try {
                        n.args = o[3] ? a.parse(o[3]) : []
                    } catch (C) {}
                }
                break;
            case "disconnect":
            case "heartbeat":
                break
        }
        return n
    };
    d.decodePayload = function (k) {
        if (k.charAt(0) == "\ufffd") {
            for (var o = [], p = 1, n = ""; p < k.length; p++) if (k.charAt(p) == "\ufffd") {
                o.push(d.decodePacket(k.substr(p + 1).substr(0, n)));
                p += Number(n) + 1;
                n = ""
            } else n += k.charAt(p);
            return o
        } else return [d.decodePacket(k)]
    }
})("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports);
(function (m, b) {
    function d(c, h) {
        this.socket = c;
        this.sessid = h
    }
    m.Transport = d;
    b.util.mixin(d, b.EventEmitter);
    d.prototype.onData = function (c) {
        this.clearCloseTimeout();
        this.setCloseTimeout();
        if (c !== "") if ((c = b.parser.decodePayload(c)) && c.length) for (var h = 0, e = c.length; h < e; h++) this.onPacket(c[h]);
        return this
    };
    d.prototype.onPacket = function (c) {
        if (c.type == "heartbeat") return this.onHeartbeat();
        c.type == "connect" && c.endpoint == "" && this.onConnect();
        this.socket.onPacket(c);
        return this
    };
    d.prototype.setCloseTimeout = function () {
        if (!this.closeTimeout) {
            var c = this;
            this.closeTimeout = setTimeout(function () {
                c.onDisconnect()
            }, this.socket.closeTimeout)
        }
    };
    d.prototype.onDisconnect = function () {
        this.close && this.close();
        this.clearTimeouts();
        this.socket.onDisconnect();
        return this
    };
    d.prototype.onConnect = function () {
        this.socket.onConnect();
        return this
    };
    d.prototype.clearCloseTimeout = function () {
        if (this.closeTimeout) {
            clearTimeout(this.closeTimeout);
            this.closeTimeout = null
        }
    };
    d.prototype.clearTimeouts = function () {
        this.clearCloseTimeout();
        this.reopenTimeout && clearTimeout(this.reopenTimeout)
    };
    d.prototype.packet = function (c) {
        this.send(b.parser.encodePacket(c))
    };
    d.prototype.onHeartbeat = function () {
        this.packet({
            type: "heartbeat"
        })
    };
    d.prototype.onOpen = function () {
        this.open = true;
        this.clearCloseTimeout();
        this.socket.onOpen()
    };
    d.prototype.onClose = function () {
        this.open = false;
        this.setCloseTimeout();
        this.socket.onClose()
    };
    d.prototype.prepareUrl = function () {
        var c = this.socket.options;
        return this.scheme() + "://" + c.host + ":" + c.port + "/" + c.resource + "/" + b.protocol + "/" + this.name + "/" + this.sessid
    };
    d.prototype.ready = function (c, h) {
        h.call(this)
    }
})("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports);
(function (m, b, d) {
    function c(e) {
        this.options = {
            port: 80,
            secure: false,
            document: "document" in d ? document : false,
            resource: "socket.io",
            transports: b.transports,
            "connect timeout": 1E4,
            "try multiple transports": true,
            reconnect: true,
            "reconnection delay": 500,
            "reconnection limit": Infinity,
            "reopen delay": 3E3,
            "max reconnection attempts": 10,
            "sync disconnect on unload": true,
            "auto connect": true,
            "flash policy port": 10843
        };
        b.util.merge(this.options, e);
        this.reconnecting = this.connecting = this.open = this.connected = false;
        this.namespaces = {};
        this.buffer = [];
        this.doBuffer = false;
        if (this.options["sync disconnect on unload"] && (!this.isXDomain() || b.util.ua.hasCORS)) {
            var a = this;
            b.util.on(d, "beforeunload", function () {
                a.disconnectSync()
            }, false)
        }
        this.options["auto connect"] && this.connect()
    }
    function h() {}
    m.Socket = c;
    b.util.mixin(c, b.EventEmitter);
    c.prototype.of = function (e) {
        if (!this.namespaces[e]) {
            this.namespaces[e] = new b.SocketNamespace(this, e);
            e !== "" && this.namespaces[e].packet({
                type: "connect"
            })
        }
        return this.namespaces[e]
    };
    c.prototype.publish = function () {
        this.emit.apply(this,
        arguments);
        var e;
        for (var a in this.namespaces) if (this.namespaces.hasOwnProperty(a)) {
            e = this.of(a);
            e.$emit.apply(e, arguments)
        }
    };
    c.prototype.handshake = function (e) {
        function a(n) {
            n instanceof Error ? f.onError(n.message) : e.apply(null, n.split(":"))
        }
        var f = this,
            j = this.options;
        j = ["http" + (j.secure ? "s" : "") + ":/", j.host + ":" + j.port, this.options.resource, b.protocol, b.util.query(this.options.query, "t=" + +new Date)].join("/");
        if (this.isXDomain()) {
            var k = document.getElementsByTagName("script")[0],
                o = document.createElement("script");
            o.src = j + "&jsonp=" + b.j.length;
            k.parentNode.insertBefore(o, k);
            b.j.push(function (n) {
                a(n);
                o.parentNode.removeChild(o)
            })
        } else {
            var p = b.util.request();
            p.open("GET", j, true);
            p.onreadystatechange = function () {
                if (p.readyState == 4) {
                    p.onreadystatechange = h;
                    if (p.status == 200) a(p.responseText);
                    else !f.reconnecting && f.onError(p.responseText)
                }
            };
            p.send(null)
        }
    };
    c.prototype.getTransport = function (e) {
        e = e || this.transports;
        for (var a = 0, f; f = e[a]; a++) if (b.Transport[f] && b.Transport[f].check(this) && (!this.isXDomain() || b.Transport[f].xdomainCheck())) return new b.Transport[f](this,
        this.sessionid);
        return null
    };
    c.prototype.connect = function (e) {
        if (this.connecting) return this;
        var a = this;
        this.handshake(function (f, j, k, o) {
            function p(n) {
                a.transport && a.transport.clearTimeouts();
                a.transport = a.getTransport(n);
                if (!a.transport) return a.publish("connect_failed");
                a.transport.ready(a, function () {
                    a.connecting = true;
                    a.publish("connecting", a.transport.name);
                    a.transport.open();
                    if (a.options["connect timeout"]) a.connectTimeoutTimer = setTimeout(function () {
                        if (!a.connected) {
                            a.connecting = false;
                            if (a.options["try multiple transports"]) {
                                if (!a.remainingTransports) a.remainingTransports = a.transports.slice(0);
                                for (var z = a.remainingTransports; z.length > 0 && z.splice(0, 1)[0] != a.transport.name;);
                                z.length ? p(z) : a.publish("connect_failed")
                            }
                        }
                    }, a.options["connect timeout"])
                })
            }
            a.sessionid = f;
            a.closeTimeout = k * 1E3;
            a.heartbeatTimeout = j * 1E3;
            a.transports = b.util.intersect(o.split(","), a.options.transports);
            p();
            a.once("connect", function () {
                clearTimeout(a.connectTimeoutTimer);
                e && typeof e == "function" && e()
            })
        });
        return this
    };
    c.prototype.packet = function (e) {
        this.connected && !this.doBuffer ? this.transport.packet(e) : this.buffer.push(e);
        return this
    };
    c.prototype.setBuffer = function (e) {
        this.doBuffer = e;
        if (!e && this.connected && this.buffer.length) {
            this.transport.payload(this.buffer);
            this.buffer = []
        }
    };
    c.prototype.disconnect = function () {
        if (this.connected) {
            this.open && this.of("").packet({
                type: "disconnect"
            });
            this.onDisconnect("booted")
        }
        return this
    };
    c.prototype.disconnectSync = function () {
        b.util.request().open("GET", this.resource + "/" + b.protocol + "/" + this.sessionid, true);
        this.onDisconnect("booted")
    };
    c.prototype.isXDomain = function () {
        var e = window.location.port || ("https:" == window.location.protocol ? 443 : 80);
        return this.options.host !== document.domain || this.options.port != e
    };
    c.prototype.onConnect = function () {
        if (!this.connected) {
            this.connected = true;
            this.connecting = false;
            this.doBuffer || this.setBuffer(false);
            this.emit("connect")
        }
    };
    c.prototype.onOpen = function () {
        this.open = true
    };
    c.prototype.onClose = function () {
        this.open = false
    };
    c.prototype.onPacket = function (e) {
        this.of(e.endpoint).onPacket(e)
    };
    c.prototype.onError = function (e) {
        if (e && e.advice) if (e.advice ===
            "reconnect" && this.connected) {
            this.disconnect();
            this.reconnect()
        }
        this.publish("error", e && e.reason ? e.reason : e)
    };
    c.prototype.onDisconnect = function (e) {
        var a = this.connected;
        this.open = this.connecting = this.connected = false;
        if (a) {
            this.transport.close();
            this.transport.clearTimeouts();
            this.publish("disconnect", e);
            "booted" != e && this.options.reconnect && !this.reconnecting && this.reconnect()
        }
    };
    c.prototype.reconnect = function () {
        function e() {
            if (f.connected) {
                for (var p in f.namespaces) f.namespaces.hasOwnProperty(p) && "" !== p && f.namespaces[p].packet({
                    type: "connect"
                });
                f.publish("reconnect", f.transport.name, f.reconnectionAttempts)
            }
            f.removeListener("connect_failed", a);
            f.removeListener("connect", a);
            f.reconnecting = false;
            delete f.reconnectionAttempts;
            delete f.reconnectionDelay;
            delete f.reconnectionTimer;
            delete f.redoTransports;
            f.options["try multiple transports"] = k
        }
        function a() {
            if (f.reconnecting) {
                if (f.connected) return e();
                if (f.connecting && f.reconnecting) return f.reconnectionTimer = setTimeout(a, 1E3);
                if (f.reconnectionAttempts++ >= j) if (f.redoTransports) {
                    f.publish("reconnect_failed");
                    e()
                } else {
                    f.on("connect_failed", a);
                    f.options["try multiple transports"] = true;
                    f.transport = f.getTransport();
                    f.redoTransports = true;
                    f.connect()
                } else {
                    if (f.reconnectionDelay < o) f.reconnectionDelay *= 2;
                    f.connect();
                    f.publish("reconnecting", f.reconnectionDelay, f.reconnectionAttempts);
                    f.reconnectionTimer = setTimeout(a, f.reconnectionDelay)
                }
            }
        }
        this.reconnecting = true;
        this.reconnectionAttempts = 0;
        this.reconnectionDelay = this.options["reconnection delay"];
        var f = this,
            j = this.options["max reconnection attempts"],
            k = this.options["try multiple transports"],
            o = this.options["reconnection limit"];
        this.options["try multiple transports"] = false;
        this.reconnectionTimer = setTimeout(a, this.reconnectionDelay);
        this.on("connect", a)
    }
})("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports, this);
(function (m, b) {
    function d(h, e) {
        this.socket = h;
        this.name = e || "";
        this.flags = {};
        this.json = new c(this, "json");
        this.ackPackets = 0;
        this.acks = {}
    }
    function c(h, e) {
        this.namespace = h;
        this.name = e
    }
    m.SocketNamespace = d;
    b.util.mixin(d, b.EventEmitter);
    d.prototype.$emit = b.EventEmitter.prototype.emit;
    d.prototype.of = function () {
        return this.socket.of.apply(this.socket, arguments)
    };
    d.prototype.packet = function (h) {
        h.endpoint = this.name;
        this.socket.packet(h);
        this.flags = {};
        return this
    };
    d.prototype.send = function (h, e) {
        var a = {
            type: this.flags.json ? "json" : "message",
            data: h
        };
        if ("function" == typeof e) {
            a.id = ++this.ackPackets;
            a.ack = true;
            this.acks[a.id] = e
        }
        return this.packet(a)
    };
    d.prototype.emit = function (h) {
        var e = Array.prototype.slice.call(arguments, 1),
            a = e[e.length - 1],
            f = {
                type: "event",
                name: h
            };
        if ("function" == typeof a) {
            f.id = ++this.ackPackets;
            f.ack = "data";
            this.acks[f.id] = a;
            e = e.slice(0, e.length - 1)
        }
        f.args = e;
        return this.packet(f)
    };
    d.prototype.disconnect = function () {
        if (this.name === "") this.socket.disconnect();
        else {
            this.packet({
                type: "disconnect"
            });
            this.$emit("disconnect")
        }
        return this
    };
    d.prototype.onPacket = function (h) {
        function e() {
            a.packet({
                type: "ack",
                args: b.util.toArray(arguments),
                ackId: h.id
            })
        }
        var a = this;
        switch (h.type) {
            case "connect":
                this.$emit("connect");
                break;
            case "disconnect":
                this.name === "" ? this.socket.onDisconnect(h.reason || "booted") : this.$emit("disconnect", h.reason);
                break;
            case "message":
            case "json":
                var f = ["message", h.data];
                if (h.ack == "data") f.push(e);
                else h.ack && this.packet({
                    type: "ack",
                    ackId: h.id
                });
                this.$emit.apply(this, f);
                break;
            case "event":
                f = [h.name].concat(h.args);
                h.ack ==
                    "data" && f.push(e);
                this.$emit.apply(this, f);
                break;
            case "ack":
                if (this.acks[h.ackId]) {
                    this.acks[h.ackId].apply(this, h.args);
                    delete this.acks[h.ackId]
                }
                break;
            case "error":
                if (h.advice) this.socket.onError(h);
                else h.reason == "unauthorized" ? this.$emit("connect_failed", h.reason) : this.$emit("error", h.reason);
                break
        }
    };
    c.prototype.send = function () {
        this.namespace.flags[this.name] = true;
        this.namespace.send.apply(this.namespace, arguments)
    };
    c.prototype.emit = function () {
        this.namespace.flags[this.name] = true;
        this.namespace.emit.apply(this.namespace,
        arguments)
    }
})("undefined" != typeof io ? io : module.exports, "undefined" != typeof io ? io : module.parent.exports);
(function (m, b) {
    function d() {
        b.Transport.apply(this, arguments)
    }
    m.websocket = d;
    b.util.inherit(d, b.Transport);
    d.prototype.name = "websocket";
    d.prototype.open = function () {
        var c = b.util.query(this.socket.options.query),
            h = this,
            e;
        e || (e = window.MozWebSocket || window.WebSocket);
        this.websocket = new e(this.prepareUrl() + c);
        this.websocket.onopen = function () {
            h.onOpen();
            h.socket.setBuffer(false)
        };
        this.websocket.onmessage = function (a) {
            h.onData(a.data)
        };
        this.websocket.onclose = function () {
            h.onClose();
            h.socket.setBuffer(true)
        };
        this.websocket.onerror = function (a) {
            h.onError(a)
        };
        return this
    };
    d.prototype.send = function (c) {
        this.websocket.send(c);
        return this
    };
    d.prototype.payload = function (c) {
        for (var h = 0, e = c.length; h < e; h++) this.packet(c[h]);
        return this
    };
    d.prototype.close = function () {
        this.websocket.close();
        return this
    };
    d.prototype.onError = function (c) {
        this.socket.onError(c)
    };
    d.prototype.scheme = function () {
        return this.socket.options.secure ? "wss" : "ws"
    };
    d.check = function () {
        return "WebSocket" in window && !("__addTask" in WebSocket) || "MozWebSocket" in window
    };
    d.xdomainCheck = function () {
        return true
    };
    b.transports.push("websocket")
})("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports);
(function (m, b) {
    function d() {
        b.Transport.websocket.apply(this, arguments)
    }
    m.flashsocket = d;
    b.util.inherit(d, b.Transport.websocket);
    d.prototype.name = "flashsocket";
    d.prototype.open = function () {
        var c = this,
            h = arguments;
        WebSocket.__addTask(function () {
            b.Transport.websocket.prototype.open.apply(c, h)
        });
        return this
    };
    d.prototype.send = function () {
        var c = this,
            h = arguments;
        WebSocket.__addTask(function () {
            b.Transport.websocket.prototype.send.apply(c, h)
        });
        return this
    };
    d.prototype.close = function () {
        WebSocket.__tasks.length = 0;
        b.Transport.websocket.prototype.close.call(this);
        return this
    };
    d.prototype.ready = function (c, h) {
        function e() {
            var f = c.options,
                j = f["flash policy port"],
                k = ["http" + (f.secure ? "s" : "") + ":/", f.host + ":" + f.port, f.resource, "static/flashsocket", "WebSocketMain" + (c.isXDomain() ? "Insecure" : "") + ".swf"];
            if (!d.loaded) {
                if (typeof WEB_SOCKET_SWF_LOCATION === "undefined") WEB_SOCKET_SWF_LOCATION = k.join("/");
                j !== 843 && WebSocket.loadFlashPolicyFile("xmlsocket://" + f.host + ":" + j);
                WebSocket.__initialize();
                d.loaded = true
            }
            h.call(a)
        }
        var a = this;
        if (document.body) return e();
        b.util.load(e)
    };
    d.check = function () {
        if (typeof WebSocket == "undefined" || !("__initialize" in WebSocket) || !swfobject) return false;
        return swfobject.getFlashPlayerVersion().major >= 10
    };
    d.xdomainCheck = function () {
        return true
    };
    if (typeof window != "undefined") WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = true;
    b.transports.push("flashsocket")
})("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports);
var swfobject = function () {
    function m() {
        if (!M) {
            try {
                var g = u.getElementsByTagName("body")[0].appendChild(u.createElement("span"));
                g.parentNode.removeChild(g)
            } catch (i) {
                return
            }
            M = true;
            g = Q.length;
            for (var l = 0; l < g; l++) Q[l]()
        }
    }
    function b(g) {
        if (M) g();
        else Q[Q.length] = g
    }
    function d(g) {
        if (typeof F.addEventListener != w) F.addEventListener("load", g, false);
        else if (typeof u.addEventListener != w) u.addEventListener("load", g, false);
        else if (typeof F.attachEvent != w) z(F, "onload", g);
        else if (typeof F.onload == "function") {
            var i = F.onload;
            F.onload = function () {
                i();
                g()
            }
        } else F.onload = g
    }
    function c() {
        var g = u.getElementsByTagName("body")[0],
            i = u.createElement(A);
        i.setAttribute("type", y);
        var l = g.appendChild(i);
        if (l) {
            var q = 0;
            (function () {
                if (typeof l.GetVariable != w) {
                    var r = l.GetVariable("$version");
                    if (r) {
                        r = r.split(" ")[1].split(",");
                        s.pv = [parseInt(r[0], 10), parseInt(r[1], 10), parseInt(r[2], 10)]
                    }
                } else if (q < 10) {
                    q++;
                    setTimeout(arguments.callee, 10);
                    return
                }
                g.removeChild(i);
                l = null;
                h()
            })()
        } else h()
    }
    function h() {
        var g = J.length;
        if (g > 0) for (var i = 0; i < g; i++) {
            var l = J[i].id,
                q = J[i].callbackFn,
                r = {
                    success: false,
                    id: l
                };
            if (s.pv[0] > 0) {
                var x = n(l);
                if (x) if (t(J[i].swfVersion) && !(s.wk && s.wk < 312)) {
                    C(l, true);
                    if (q) {
                        r.success = true;
                        r.ref = e(l);
                        q(r)
                    }
                } else if (J[i].expressInstall && a()) {
                    r = {};
                    r.data = J[i].expressInstall;
                    r.width = x.getAttribute("width") || "0";
                    r.height = x.getAttribute("height") || "0";
                    if (x.getAttribute("class")) r.styleclass = x.getAttribute("class");
                    if (x.getAttribute("align")) r.align = x.getAttribute("align");
                    var v = {};
                    x = x.getElementsByTagName("param");
                    for (var D = x.length, E = 0; E < D; E++) if (x[E].getAttribute("name").toLowerCase() != "movie") v[x[E].getAttribute("name")] = x[E].getAttribute("value");
                    f(r, v, l, q)
                } else {
                    j(x);
                    q && q(r)
                }
            } else {
                C(l, true);
                if (q) {
                    if ((l = e(l)) && typeof l.SetVariable != w) {
                        r.success = true;
                        r.ref = l
                    }
                    q(r)
                }
            }
        }
    }
    function e(g) {
        var i = null;
        if ((g = n(g)) && g.nodeName == "OBJECT") if (typeof g.SetVariable != w) i = g;
        else if (g = g.getElementsByTagName(A)[0]) i = g;
        return i
    }
    function a() {
        return !R && t("6.0.65") && (s.win || s.mac) && !(s.wk && s.wk < 312)
    }
    function f(g, i, l, q) {
        R = true;
        X = q || null;
        Z = {
            success: false,
            id: l
        };
        var r = n(l);
        if (r) {
            if (r.nodeName == "OBJECT") {
                O = k(r);
                S = null
            } else {
                O = r;
                S = l
            }
            g.id = $;
            if (typeof g.width == w || !/%$/.test(g.width) && parseInt(g.width, 10) < 310) g.width = "310";
            if (typeof g.height == w || !/%$/.test(g.height) && parseInt(g.height, 10) < 137) g.height = "137";
            u.title = u.title.slice(0, 47) + " - Flash Player Installation";
            q = s.ie && s.win ? "ActiveX" : "PlugIn";
            q = "MMredirectURL=" + F.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + q + "&MMdoctitle=" + u.title;
            if (typeof i.flashvars != w) i.flashvars += "&" + q;
            else i.flashvars = q;
            if (s.ie && s.win && r.readyState != 4) {
                q = u.createElement("div");
                l += "SWFObjectNew";
                q.setAttribute("id", l);
                r.parentNode.insertBefore(q, r);
                r.style.display = "none";
                (function () {
                    r.readyState == 4 ? r.parentNode.removeChild(r) : setTimeout(arguments.callee, 10)
                })()
            }
            o(g, i, l)
        }
    }
    function j(g) {
        if (s.ie && s.win && g.readyState != 4) {
            var i = u.createElement("div");
            g.parentNode.insertBefore(i, g);
            i.parentNode.replaceChild(k(g), i);
            g.style.display = "none";
            (function () {
                g.readyState == 4 ? g.parentNode.removeChild(g) : setTimeout(arguments.callee,
                10)
            })()
        } else g.parentNode.replaceChild(k(g), g)
    }
    function k(g) {
        var i = u.createElement("div");
        if (s.win && s.ie) i.innerHTML = g.innerHTML;
        else if (g = g.getElementsByTagName(A)[0]) if (g = g.childNodes) for (var l = g.length, q = 0; q < l; q++)!(g[q].nodeType == 1 && g[q].nodeName == "PARAM") && g[q].nodeType != 8 && i.appendChild(g[q].cloneNode(true));
        return i
    }
    function o(g, i, l) {
        var q, r = n(l);
        if (s.wk && s.wk < 312) return q;
        if (r) {
            if (typeof g.id == w) g.id = l;
            if (s.ie && s.win) {
                var x = "";
                for (var v in g) if (g[v] != Object.prototype[v]) if (v.toLowerCase() ==
                    "data") i.movie = g[v];
                else if (v.toLowerCase() == "styleclass") x += ' class="' + g[v] + '"';
                else if (v.toLowerCase() != "classid") x += " " + v + '="' + g[v] + '"';
                v = "";
                for (var D in i) if (i[D] != Object.prototype[D]) v += '<param name="' + D + '" value="' + i[D] + '" />';
                r.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + x + ">" + v + "</object>";
                T[T.length] = g.id;
                q = n(g.id)
            } else {
                D = u.createElement(A);
                D.setAttribute("type", y);
                for (var E in g) if (g[E] != Object.prototype[E]) if (E.toLowerCase() == "styleclass") D.setAttribute("class",
                g[E]);
                else E.toLowerCase() != "classid" && D.setAttribute(E, g[E]);
                for (x in i) if (i[x] != Object.prototype[x] && x.toLowerCase() != "movie") {
                    g = D;
                    v = x;
                    E = i[x];
                    l = u.createElement("param");
                    l.setAttribute("name", v);
                    l.setAttribute("value", E);
                    g.appendChild(l)
                }
                r.parentNode.replaceChild(D, r);
                q = D
            }
        }
        return q
    }
    function p(g) {
        var i = n(g);
        if (i && i.nodeName == "OBJECT") if (s.ie && s.win) {
            i.style.display = "none";
            (function () {
                if (i.readyState == 4) {
                    var l = n(g);
                    if (l) {
                        for (var q in l) if (typeof l[q] == "function") l[q] = null;
                        l.parentNode.removeChild(l)
                    }
                } else setTimeout(arguments.callee,
                10)
            })()
        } else i.parentNode.removeChild(i)
    }
    function n(g) {
        var i = null;
        try {
            i = u.getElementById(g)
        } catch (l) {}
        return i
    }
    function z(g, i, l) {
        g.attachEvent(i, l);
        N[N.length] = [g, i, l]
    }
    function t(g) {
        var i = s.pv;
        g = g.split(".");
        g[0] = parseInt(g[0], 10);
        g[1] = parseInt(g[1], 10) || 0;
        g[2] = parseInt(g[2], 10) || 0;
        return i[0] > g[0] || i[0] == g[0] && i[1] > g[1] || i[0] == g[0] && i[1] == g[1] && i[2] >= g[2] ? true : false
    }
    function B(g, i, l, q) {
        if (!(s.ie && s.mac)) {
            var r = u.getElementsByTagName("head")[0];
            if (r) {
                l = l && typeof l == "string" ? l : "screen";
                if (q) Y = H = null;
                if (!H || Y != l) {
                    q = u.createElement("style");
                    q.setAttribute("type", "text/css");
                    q.setAttribute("media", l);
                    H = r.appendChild(q);
                    if (s.ie && s.win && typeof u.styleSheets != w && u.styleSheets.length > 0) H = u.styleSheets[u.styleSheets.length - 1];
                    Y = l
                }
                if (s.ie && s.win) H && typeof H.addRule == A && H.addRule(g, i);
                else H && typeof u.createTextNode != w && H.appendChild(u.createTextNode(g + " {" + i + "}"))
            }
        }
    }
    function C(g, i) {
        if (aa) {
            var l = i ? "visible" : "hidden";
            if (M && n(g)) n(g).style.visibility = l;
            else B("#" + g, "visibility:" + l)
        }
    }
    function G(g) {
        return /[\\\"<>\.;]/.exec(g) != null && typeof encodeURIComponent != w ? encodeURIComponent(g) : g
    }
    var w = "undefined",
        A = "object",
        y = "application/x-shockwave-flash",
        $ = "SWFObjectExprInst",
        F = window,
        u = document,
        K = navigator,
        ba = false,
        Q = [function () {
            ba ? c() : h()
        }],
        J = [],
        T = [],
        N = [],
        O, S, X, Z, M = false,
        R = false,
        H, Y, aa = true,
        s = function () {
            var g = typeof u.getElementById != w && typeof u.getElementsByTagName != w && typeof u.createElement != w,
                i = K.userAgent.toLowerCase(),
                l = K.platform.toLowerCase(),
                q = l ? /win/.test(l) : /win/.test(i);
            l = l ? /mac/.test(l) : /mac/.test(i);
            i = /webkit/.test(i) ? parseFloat(i.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false;
            var r = !+"\u000b1",
                x = [0, 0, 0],
                v = null;
            if (typeof K.plugins != w && typeof K.plugins["Shockwave Flash"] == A) {
                if ((v = K.plugins["Shockwave Flash"].description) && !(typeof K.mimeTypes != w && K.mimeTypes[y] && !K.mimeTypes[y].enabledPlugin)) {
                    ba = true;
                    r = false;
                    v = v.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    x[0] = parseInt(v.replace(/^(.*)\..*$/, "$1"), 10);
                    x[1] = parseInt(v.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                    x[2] = /[a-zA-Z]/.test(v) ? parseInt(v.replace(/^.*[a-zA-Z]+(.*)$/,
                        "$1"), 10) : 0
                }
            } else if (typeof F.ActiveXObject != w) try {
                var D = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                if (D) if (v = D.GetVariable("$version")) {
                    r = true;
                    v = v.split(" ")[1].split(",");
                    x = [parseInt(v[0], 10), parseInt(v[1], 10), parseInt(v[2], 10)]
                }
            } catch (E) {}
            return {
                w3: g,
                pv: x,
                wk: i,
                ie: r,
                win: q,
                mac: l
            }
        }();
    (function () {
        if (s.w3) {
            if (typeof u.readyState != w && u.readyState == "complete" || typeof u.readyState == w && (u.getElementsByTagName("body")[0] || u.body)) m();
            if (!M) {
                typeof u.addEventListener != w && u.addEventListener("DOMContentLoaded",
                m, false);
                if (s.ie && s.win) {
                    u.attachEvent("onreadystatechange", function () {
                        if (u.readyState == "complete") {
                            u.detachEvent("onreadystatechange", arguments.callee);
                            m()
                        }
                    });
                    F == top && function () {
                        if (!M) {
                            try {
                                u.documentElement.doScroll("left")
                            } catch (g) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            m()
                        }
                    }()
                }
                s.wk && function () {
                    M || (/loaded|complete/.test(u.readyState) ? m() : setTimeout(arguments.callee, 0))
                }();
                d(m)
            }
        }
    })();
    (function () {
        s.ie && s.win && window.attachEvent("onunload", function () {
            for (var g = N.length, i = 0; i < g; i++) N[i][0].detachEvent(N[i][1],
            N[i][2]);
            g = T.length;
            for (i = 0; i < g; i++) p(T[i]);
            for (var l in s) s[l] = null;
            s = null;
            for (var q in swfobject) swfobject[q] = null;
            swfobject = null
        })
    })();
    return {
        registerObject: function (g, i, l, q) {
            if (s.w3 && g && i) {
                var r = {};
                r.id = g;
                r.swfVersion = i;
                r.expressInstall = l;
                r.callbackFn = q;
                J[J.length] = r;
                C(g, false)
            } else q && q({
                success: false,
                id: g
            })
        },
        getObjectById: function (g) {
            if (s.w3) return e(g)
        },
        embedSWF: function (g, i, l, q, r, x, v, D, E, P) {
            var U = {
                success: false,
                id: i
            };
            if (s.w3 && !(s.wk && s.wk < 312) && g && i && l && q && r) {
                C(i, false);
                b(function () {
                    l += "";
                    q += "";
                    var L = {};
                    if (E && typeof E === A) for (var I in E) L[I] = E[I];
                    L.data = g;
                    L.width = l;
                    L.height = q;
                    I = {};
                    if (D && typeof D === A) for (var V in D) I[V] = D[V];
                    if (v && typeof v === A) for (var W in v) if (typeof I.flashvars != w) I.flashvars += "&" + W + "=" + v[W];
                    else I.flashvars = W + "=" + v[W];
                    if (t(r)) {
                        V = o(L, I, i);
                        L.id == i && C(i, true);
                        U.success = true;
                        U.ref = V
                    } else if (x && a()) {
                        L.data = x;
                        f(L, I, i, P);
                        return
                    } else C(i, true);
                    P && P(U)
                })
            } else P && P(U)
        },
        switchOffAutoHideShow: function () {
            aa = false
        },
        ua: s,
        getFlashPlayerVersion: function () {
            return {
                major: s.pv[0],
                minor: s.pv[1],
                release: s.pv[2]
            }
        },
        hasFlashPlayerVersion: t,
        createSWF: function (g, i, l) {
            if (s.w3) return o(g, i, l)
        },
        showExpressInstall: function (g, i, l, q) {
            s.w3 && a() && f(g, i, l, q)
        },
        removeSWF: function (g) {
            s.w3 && p(g)
        },
        createCSS: function (g, i, l, q) {
            s.w3 && B(g, i, l, q)
        },
        addDomLoadEvent: b,
        addLoadEvent: d,
        getQueryParamValue: function (g) {
            var i = u.location.search || u.location.hash;
            if (i) {
                if (/\?/.test(i)) i = i.split("?")[1];
                if (g == null) return G(i);
                i = i.split("&");
                for (var l = 0; l < i.length; l++) if (i[l].substring(0, i[l].indexOf("=")) == g) return G(i[l].substring(i[l].indexOf("=") + 1))
            }
            return ""
        },
        expressInstallCallback: function () {
            if (R) {
                var g = n($);
                if (g && O) {
                    g.parentNode.replaceChild(O, g);
                    if (S) {
                        C(S, true);
                        if (s.ie && s.win) O.style.display = "block"
                    }
                    X && X(Z)
                }
                R = false
            }
        }
    }
}();
(function () {
    if (!window.WebSocket) {
        var m = window.console;
        if (!m || !m.log || !m.error) m = {
            log: function () {},
            error: function () {}
        };
        if (swfobject.hasFlashPlayerVersion("10.0.0")) {
            location.protocol == "file:" && m.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://...");
            WebSocket = function (b, d, c, h, e) {
                var a = this;
                a.__id = WebSocket.__nextId++;
                WebSocket.__instances[a.__id] = a;
                a.readyState = WebSocket.CONNECTING;
                a.bufferedAmount = 0;
                a.__events = {};
                if (d) {
                    if (typeof d == "string") d = [d]
                } else d = [];
                setTimeout(function () {
                    WebSocket.__addTask(function () {
                        WebSocket.__flash.create(a.__id, b, d, c || null, h || 0, e || null)
                    })
                }, 0)
            };
            WebSocket.prototype.send = function (b) {
                if (this.readyState == WebSocket.CONNECTING) throw "INVALID_STATE_ERR: Web Socket connection has not been established";
                b = WebSocket.__flash.send(this.__id, encodeURIComponent(b));
                if (b < 0) return true;
                else {
                    this.bufferedAmount += b;
                    return false
                }
            };
            WebSocket.prototype.close = function () {
                if (!(this.readyState == WebSocket.CLOSED || this.readyState == WebSocket.CLOSING)) {
                    this.readyState = WebSocket.CLOSING;
                    WebSocket.__flash.close(this.__id)
                }
            };
            WebSocket.prototype.addEventListener = function (b, d) {
                b in this.__events || (this.__events[b] = []);
                this.__events[b].push(d)
            };
            WebSocket.prototype.removeEventListener = function (b, d) {
                if (b in this.__events) for (var c = this.__events[b], h = c.length - 1; h >= 0; --h) if (c[h] === d) {
                    c.splice(h, 1);
                    break
                }
            };
            WebSocket.prototype.dispatchEvent = function (b) {
                for (var d = this.__events[b.type] || [], c = 0; c < d.length; ++c) d[c](b);
                (d = this["on" + b.type]) && d(b)
            };
            WebSocket.prototype.__handleEvent = function (b) {
                if ("readyState" in b) this.readyState = b.readyState;
                if ("protocol" in b) this.protocol = b.protocol;
                if (b.type == "open" || b.type == "error") b = this.__createSimpleEvent(b.type);
                else if (b.type == "close") b = this.__createSimpleEvent("close");
                else if (b.type == "message") b = this.__createMessageEvent("message", decodeURIComponent(b.message));
                else throw "unknown event type: " + b.type;
                this.dispatchEvent(b)
            };
            WebSocket.prototype.__createSimpleEvent = function (b) {
                if (document.createEvent && window.Event) {
                    var d = document.createEvent("Event");
                    d.initEvent(b, false, false);
                    return d
                } else return {
                    type: b,
                    bubbles: false,
                    cancelable: false
                }
            };

            WebSocket.prototype.__createMessageEvent = function (b, d) {
                if (document.createEvent && window.MessageEvent && !window.opera) {
                    var c = document.createEvent("MessageEvent");
                    c.initMessageEvent("message", false, false, d, null, null, window, null);
                    return c
                } else return {
                    type: b,
                    data: d,
                    bubbles: false,
                    cancelable: false
                }
            };
            WebSocket.CONNECTING = 0;
            WebSocket.OPEN = 1;
            WebSocket.CLOSING = 2;
            WebSocket.CLOSED = 3;
            WebSocket.__flash = null;
            WebSocket.__instances = {};
            WebSocket.__tasks = [];
            WebSocket.__nextId = 0;
            WebSocket.loadFlashPolicyFile = function (b) {
                WebSocket.__addTask(function () {
                    WebSocket.__flash.loadManualPolicyFile(b)
                })
            };
            WebSocket.__initialize = function () {
                if (!WebSocket.__flash) {
                    if (WebSocket.__swfLocation) window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation;
                    if (window.WEB_SOCKET_SWF_LOCATION) {
                        var b = document.createElement("div");
                        b.id = "webSocketContainer";
                        b.style.position = "absolute";
                        if (WebSocket.__isFlashLite()) {
                            b.style.left =
                                "0px";
                            b.style.top = "0px"
                        } else {
                            b.style.left = "-100px";
                            b.style.top = "-100px"
                        }
                        var d = document.createElement("div");
                        d.id = "webSocketFlash";
                        b.appendChild(d);
                        document.body.appendChild(b);
                        swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION, "webSocketFlash", "1", "1", "10.0.0", null, null, {
                            hasPriority: true,
                            swliveconnect: true,
                            allowScriptAccess: "always"
                        }, null, function (c) {
                            c.success || m.error("[WebSocket] swfobject.embedSWF failed")
                        })
                    } else m.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf")
                }
            };
            WebSocket.__onFlashInitialized = function () {
                setTimeout(function () {
                    WebSocket.__flash = document.getElementById("webSocketFlash");
                    WebSocket.__flash.setCallerUrl(location.href);
                    WebSocket.__flash.setDebug( !! window.WEB_SOCKET_DEBUG);
                    for (var b = 0; b < WebSocket.__tasks.length; ++b) WebSocket.__tasks[b]();
                    WebSocket.__tasks = []
                }, 0)
            };
            WebSocket.__onFlashEvent = function () {
                setTimeout(function () {
                    try {
                        for (var b = WebSocket.__flash.receiveEvents(), d = 0; d < b.length; ++d) WebSocket.__instances[b[d].webSocketId].__handleEvent(b[d])
                    } catch (c) {
                        m.error(c)
                    }
                }, 0);
                return true
            };
            WebSocket.__log = function (b) {
                m.log(decodeURIComponent(b))
            };
            WebSocket.__error = function (b) {
                m.error(decodeURIComponent(b))
            };
            WebSocket.__addTask = function (b) {
                WebSocket.__flash ? b() : WebSocket.__tasks.push(b)
            };
            WebSocket.__isFlashLite = function () {
                if (!window.navigator || !window.navigator.mimeTypes) return false;
                var b = window.navigator.mimeTypes["application/x-shockwave-flash"];
                if (!b || !b.enabledPlugin || !b.enabledPlugin.filename) return false;
                return b.enabledPlugin.filename.match(/flashlite/i) ? true : false
            };
            window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION || (window.addEventListener ? window.addEventListener("load", function () {
                WebSocket.__initialize()
            }, false) : window.attachEvent("onload", function () {
                WebSocket.__initialize()
            }))
        } else m.error("Flash Player >= 10.0.0 is required.")
    }
})();
(function (m, b, d) {
    function c(e) {
        if (e) {
            b.Transport.apply(this, arguments);
            this.sendBuffer = []
        }
    }
    function h() {}
    m.XHR = c;
    b.util.inherit(c, b.Transport);
    c.prototype.open = function () {
        this.socket.setBuffer(false);
        this.onOpen();
        this.get();
        this.setCloseTimeout();
        return this
    };
    c.prototype.payload = function (e) {
        for (var a = [], f = 0, j = e.length; f < j; f++) a.push(b.parser.encodePacket(e[f]));
        this.send(b.parser.encodePayload(a))
    };
    c.prototype.send = function (e) {
        this.post(e);
        return this
    };
    c.prototype.post = function (e) {
        function a() {
            if (this.readyState == 4) {
                this.onreadystatechange = h;
                j.posting = false;
                this.status == 200 ? j.socket.setBuffer(false) : j.onClose()
            }
        }
        function f() {
            this.onload = h;
            j.socket.setBuffer(false)
        }
        var j = this;
        this.socket.setBuffer(true);
        this.sendXHR = this.request("POST");
        if (d.XDomainRequest && this.sendXHR instanceof XDomainRequest) this.sendXHR.onload = this.sendXHR.onerror = f;
        else this.sendXHR.onreadystatechange = a;
        this.sendXHR.send(e)
    };
    c.prototype.close = function () {
        this.onClose();
        return this
    };
    c.prototype.request = function (e) {
        var a = b.util.request(this.socket.isXDomain()),
            f = b.util.query(this.socket.options.query, "t=" + +new Date);
        a.open(e || "GET", this.prepareUrl() + f, true);
        if (e == "POST") try {
            if (a.setRequestHeader) a.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
            else a.contentType = "text/plain"
        } catch (j) {}
        return a
    };
    c.prototype.scheme = function () {
        return this.socket.options.secure ? "https" : "http"
    };
    c.check = function (e, a) {
        try {
            if (b.util.request(a)) return true
        } catch (f) {}
        return false
    };
    c.xdomainCheck = function () {
        return c.check(null, true)
    }
})("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this);
(function (m, b) {
    function d() {
        b.Transport.XHR.apply(this, arguments)
    }
    m.htmlfile = d;
    b.util.inherit(d, b.Transport.XHR);
    d.prototype.name = "htmlfile";
    d.prototype.get = function () {
        this.doc = new ActiveXObject("htmlfile");
        this.doc.open();
        this.doc.write("<html></html>");
        this.doc.close();
        this.doc.parentWindow.s = this;
        var c = this.doc.createElement("div");
        c.className = "socketio";
        this.doc.body.appendChild(c);
        this.iframe = this.doc.createElement("iframe");
        c.appendChild(this.iframe);
        var h = this;
        c = b.util.query(this.socket.options.query,
            "t=" + +new Date);
        this.iframe.src = this.prepareUrl() + c;
        b.util.on(window, "unload", function () {
            h.destroy()
        })
    };
    d.prototype._ = function (c, h) {
        this.onData(c);
        try {
            var e = h.getElementsByTagName("script")[0];
            e.parentNode.removeChild(e)
        } catch (a) {}
    };
    d.prototype.destroy = function () {
        if (this.iframe) {
            try {
                this.iframe.src = "about:blank"
            } catch (c) {}
            this.doc = null;
            this.iframe.parentNode.removeChild(this.iframe);
            this.iframe = null;
            CollectGarbage()
        }
    };
    d.prototype.close = function () {
        this.destroy();
        return b.Transport.XHR.prototype.close.call(this)
    };
    d.check = function () {
        if ("ActiveXObject" in window) try {
            return new ActiveXObject("htmlfile") && b.Transport.XHR.check()
        } catch (c) {}
        return false
    };
    d.xdomainCheck = function () {
        return false
    };
    b.transports.push("htmlfile")
})("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports);
(function (m, b, d) {
    function c() {
        b.Transport.XHR.apply(this, arguments)
    }
    function h() {}
    m["xhr-polling"] = c;
    b.util.inherit(c, b.Transport.XHR);
    b.util.merge(c, b.Transport.XHR);
    c.prototype.name = "xhr-polling";
    c.prototype.open = function () {
        b.Transport.XHR.prototype.open.call(this);
        return false
    };
    c.prototype.get = function () {
        function e() {
            if (this.readyState == 4) {
                this.onreadystatechange = h;
                if (this.status == 200) {
                    f.onData(this.responseText);
                    f.get()
                } else f.onClose()
            }
        }
        function a() {
            this.onload = h;
            f.onData(this.responseText);
            f.get()
        }
        if (this.open) {
            var f = this;
            this.xhr = this.request();
            if (d.XDomainRequest && this.xhr instanceof XDomainRequest) this.xhr.onload = this.xhr.onerror = a;
            else this.xhr.onreadystatechange = e;
            this.xhr.send(null)
        }
    };
    c.prototype.onClose = function () {
        b.Transport.XHR.prototype.onClose.call(this);
        if (this.xhr) {
            this.xhr.onreadystatechange = this.xhr.onload = h;
            try {
                this.xhr.abort()
            } catch (e) {}
            this.xhr = null
        }
    };
    c.prototype.ready = function (e, a) {
        var f = this;
        b.util.defer(function () {
            a.call(f)
        })
    };
    b.transports.push("xhr-polling")
})("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports, this);
(function (m, b) {
    function d() {
        b.Transport["xhr-polling"].apply(this, arguments);
        this.index = b.j.length;
        var c = this;
        b.j.push(function (h) {
            c._(h)
        })
    }
    m["jsonp-polling"] = d;
    b.util.inherit(d, b.Transport["xhr-polling"]);
    d.prototype.name = "jsonp-polling";
    d.prototype.post = function (c) {
        function h() {
            e();
            a.socket.setBuffer(false)
        }
        function e() {
            a.iframe && a.form.removeChild(a.iframe);
            try {
                p = document.createElement('<iframe name="' + a.iframeId + '">')
            } catch (z) {
                p = document.createElement("iframe");
                p.name = a.iframeId
            }
            p.id = a.iframeId;
            a.form.appendChild(p);
            a.iframe = p
        }
        var a = this,
            f = b.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
        if (!this.form) {
            var j = document.createElement("form"),
                k = document.createElement("textarea"),
                o = this.iframeId = "socketio_iframe_" + this.index,
                p;
            j.className = "socketio";
            j.style.position = "absolute";
            j.style.top = "-1000px";
            j.style.left = "-1000px";
            j.target = o;
            j.method = "POST";
            j.setAttribute("accept-charset", "utf-8");
            k.name = "d";
            j.appendChild(k);
            document.body.appendChild(j);
            this.form = j;
            this.area = k
        }
        this.form.action = this.prepareUrl() + f;
        e();
        this.area.value = c;
        try {
            this.form.submit()
        } catch (n) {}
        if (this.iframe.attachEvent) p.onreadystatechange = function () {
            a.iframe.readyState == "complete" && h()
        };
        else this.iframe.onload = h;
        this.socket.setBuffer(true)
    };
    d.prototype.get = function () {
        var c = this,
            h = document.createElement("script"),
            e = b.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
        if (this.script) {
            this.script.parentNode.removeChild(this.script);
            this.script = null
        }
        h.async = true;
        h.src = this.prepareUrl() + e;
        h.onerror = function () {
            c.onClose()
        };
        e = document.getElementsByTagName("script")[0];
        e.parentNode.insertBefore(h, e);
        this.script = h
    };
    d.prototype._ = function (c) {
        this.onData(c);
        this.open && this.get();
        return this
    };
    d.check = function () {
        return true
    };
    d.xdomainCheck = function () {
        return true
    };
    b.transports.push("jsonp-polling")
})("undefined" != typeof io ? io.Transport : module.exports, "undefined" != typeof io ? io : module.parent.exports);
EasyWebSocket = function (m) {
    var b = this;
    this.url = m;
    this.bufferedAmount = 0;
    this.readyState = EasyWebSocket.CONNECTING;
    this._clientId = "clientid-sio-" + this.url + "-" + Math.floor(Math.random() * 999999).toString(36);
    this.log = EasyWebSocket.logFunction;
    this.onopen = function () {
        b.log("default onopen method")
    };
    this.onmessage = function () {
        b.log("default onmessage method")
    };
    this.onerror = function () {
        b.log("default onerror method")
    };
    this.onclose = function () {
        b.log("default onclose method")
    };
    this._sioCtor()
};
EasyWebSocket.prototype._sioCtor = function () {
    var m = this,
        b = this.parseUri(EasyWebSocket.serverUrl),
        d = b.host;
    b = parseInt(b.port);
    this._sockio = io.connect(d + ":" + b, {
        "force new connection": true
    });
    this._sockio.on("connect", function () {
        m.log("socket connected", m._sockio, m._clientId);
        m._sockio.json.send({
            type: "connect",
            data: {
                wsUrl: m.url,
                clientId: m._clientId
            }
        });
        m.readyState = EasyWebSocket.CONNECTED;
        m.onopen()
    });
    this._sockio.on("connect_failed", function () {
        m.onerror()
    });
    this._sockio.on("message", function (c) {
        m.log("received message",
        c);
        m.onmessage({
            data: c
        })
    });
    this._sockio.on("disconnect", function () {
        m.log("socket disconnected");
        m.onclose()
    })
};
EasyWebSocket.prototype.send = function (m) {
    this._sockio.json.send({
        type: "message",
        data: {
            clientId: this._clientId,
            message: m
        }
    })
};
EasyWebSocket.prototype.close = function () {
    this._sockio.disconnect()
};
EasyWebSocket.CONNECTING = 0;
EasyWebSocket.OPEN = 1;
EasyWebSocket.CLOSING = 2;
EasyWebSocket.CLOSED = 3;
EasyWebSocket.serverUrl = "http://88.191.76.230:8950";
EasyWebSocket.logFunction = function () {};
EasyWebSocket.prototype.parseUri = function (m) {
    var b = this.parseUri.options;
    m = b.parser[b.strictMode ? "strict" : "loose"].exec(m);
    for (var d = {}, c = 14; c--;) d[b.key[c]] = m[c] || "";
    d[b.q.name] = {};
    d[b.key[12]].replace(b.q.parser, function (h, e, a) {
        if (e) d[b.q.name][e] = a
    });
    return d
};
EasyWebSocket.prototype.parseUri.options = {
    strictMode: false,
    key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
    q: {
        name: "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};