"use strict";

webshims.ready("jme-base DOM", function () {
  "use strict";

  function a(a) {
    this._data = a, this.lists = {}, this.on("showcontrolschange", this._updateControlsClass);
  }

  function b(a, c, d) {
    this.list = a || [], this.playlists = c, this.media = c._data.media, this.player = c._data.player, this.options = h.extend(!0, {}, b.defaults, d), this.options.itemTmpl = this.options.itemTmpl.trim(), this.deferred = h.Deferred(), this._selectedIndex = -1, this._selectedItem = null, this.$rendered = null, this._detectListType(), this.autoplay(this.options.autoplay), this.deferred.done(function () {
      this._addEvents(this), "auto" != this.options.defaultSelected || this.media.jmeProp("srces").length || (this.options.defaultSelected = 0), this.list[this.options.defaultSelected] && this.selectedIndex(this.options.defaultSelected), this._fire("addlist");
    });
  }

  function c(a) {
    return a.description = a.description || a.content, a.srces = [], (a.mediaGroups || []).forEach(function (b) {
      (b.contents || []).forEach(function (b) {
        b.src = b.src || b.url, a.srces.push(b);
      });
    }), a;
  }

  function d() {
    return {
      src: h.attr(this, "href"),
      srclang: h.attr(this, "lang"),
      label: h.attr(this, "data-label")
    };
  }

  function e() {
    return {
      src: h.attr(this, "url") || h.attr(this, "href"),
      type: h.attr(this, "type")
    };
  }

  function f() {
    return 1 == this.nodeType;
  }

  var g = window.webshims,
      h = g.$,
      i = h.jme,
      j = 0,
      k = '<button class="{%class%}" type="button" aria-label="{%text%}"></button>';
  h.extend(a.prototype, {
    on: function on() {
      h.fn.on.apply(h(this), arguments);
    },
    off: function off() {
      h.fn.off.apply(h(this), arguments);
    },
    _getListId: function _getListId(a) {
      var b;
      return b = "string" == typeof a ? a : a.id;
    },
    _updateControlsClass: function _updateControlsClass() {
      this._data.player[this.getShowcontrolsList() ? "addClass" : "removeClass"]("has-playlist");
    },
    add: function add(a, c) {
      return a = new b(a, this, c), a.id || (j++, a.id = "list-" + j), this.lists[a.id] = a, a.options.showcontrols && this._data.player.addClass("has-playlist"), a;
    },
    remove: function remove(a) {
      var b = this._getListId(a);

      this.lists[b] && (this.lists[b]._remove(), delete this.lists[b]), this.getShowcontrolsList() || this._data.player.removeClass("has-playlist");
    },
    getAutoplayList: function getAutoplayList() {
      var a = null;
      return h.each(this.lists, function (b, c) {
        return c.options.autoplay ? (a = c, !1) : void 0;
      }), a;
    },
    getShowcontrolsList: function getShowcontrolsList() {
      var a = null;
      return h.each(this.lists, function (b, c) {
        return c.options.showcontrols ? (a = c, !1) : void 0;
      }), a;
    }
  }), b.getText = function (a) {
    return a.attr("content") || (a.text() || "").trim();
  }, b.getUrl = function (a) {
    return a.attr("content") || a.attr("url") || a.attr("href") || a.attr("src") || (a.text() || "").trim();
  }, b.defaults = {
    loop: !1,
    autoplay: !1,
    defaultSelected: "auto",
    addItemEvents: !0,
    showcontrols: !0,
    ajax: {},
    itemTmpl: '<li class="list-item"><% if(typeof poster == "string" && poster) {%><img src="<%=poster%>" /><% }%><h3><%=title%></h3><% if(typeof description == "string" && description) {%><div class="item-description"><%=description%></div><% }%></li>',
    renderer: function renderer(a, b) {
      return h.jme.tmpl(b, a);
    },
    mapDom: function mapDom(a) {
      return {
        title: b.getText(h('[itemprop="name"], h1, h2, h3, h4, h5, h6, a', a)),
        srces: h('[itemprop="contentUrl"], a[type^="video"], a[type^="audio"]', a).map(function () {
          var c,
              d = {
            src: b.getUrl(h(this))
          };
          return c = "a" == this.nodeName.toLowerCase() ? h.prop(this, "type") : b.getText(h('[itemprop="encodingFormat"]', a)), c && (d.type = c), c = h.attr(this, "data-media"), c && (d.media = c), d;
        }).get(),
        tracks: h('a[type="text/vtt"]').map(d).get(),
        poster: b.getUrl(h('[itemprop="thumbnailUrl"], a[type^="image"], img', a)) || null,
        description: b.getText(h('[itemprop="description"], .item-description, p', a)) || null
      };
    },
    mapUrl: function mapUrl(a, f) {
      h.ajax(h.extend(a, {
        success: function success(a) {
          var g;
          h.isArray(a) ? g = a : a.responseData && a.responseData.feed ? (a = a.responseData.feed, g = (a.entries || []).map(c)) : (g = [], h("item", a).each(function () {
            var a = h("enclosure, media\\:content", this).filter('[type^="video"], [type^="audio"]').map(e).get();
            a.length && g.push({
              title: h("title", this).html(),
              srces: a,
              publishedDate: h("pubDate", this).html() || null,
              description: h("description", this).text() || null,
              poster: b.getUrl(h('itunes\\:image, media\\:thumbnail, enclosure[type^="image"], media\\:content[type^="image"]', this)) || null,
              author: h("itunes\\:author", this).html() || null,
              duration: h("itunes\\:duration", this).html() || null,
              tracks: h("media\\:subTitle", this).map(d).get() || null
            });
          })), g != a && (g.fullData = a), f(g);
        }
      }));
    }
  }, h.extend(b.prototype, {
    on: function on() {
      h.fn.on.apply(h(this), arguments);
    },
    off: function off() {
      h.fn.off.apply(h(this), arguments);
    },
    _detectListType: function _detectListType() {
      var a;
      return "string" == typeof this.list ? void this._createListFromUrl() : (this.list.nodeName || this.list.length > 0 && this.list[0].nodeName ? this._createListFromDom() : this.list.responseData && this.list.responseData.feed && (a = this.list.responseData.feed, this.list = (a.entries || []).map(c), this.list.fullData = a), void this.deferred.resolveWith(this));
    },
    _createListFromUrl: function _createListFromUrl() {
      var a = this;
      this.options.ajax.url = this.list, this.options.mapUrl(this.options.ajax, function (b) {
        a.list = b, a.deferred.resolveWith(a);
      });
    },
    _createListFromDom: function _createListFromDom() {
      var a = this;
      this.$rendered = h(this.list).eq(0), this.list = [], this.$rendered && (this._addDomList(), this.list = this.$rendered.children().map(function () {
        return a._createItemFromDom(this);
      }).get());
    },
    _createItemFromDom: function _createItemFromDom(a) {
      var b = this.options.mapDom(a);
      return this._addItemData(b, a), b;
    },
    _fire: function _fire(a, b) {
      var a = h.Event(a);
      h(this).triggerHandler(a, b), h(this.playlists).triggerHandler(a, h.merge([{
        list: this
      }], b || [])), this.$rendered && this.$rendered.triggerHandler(a, b);
    },
    _addDomList: function _addDomList() {
      this.$rendered.attr({
        "data-autoplay": this.options.autoplay,
        "data-loop": this.options.loop
      }).addClass("media-playlist").data("playlist", this);
    },
    _addItemData: function _addItemData(a, b) {
      var c = this;
      a.$item = h(b).data("itemData", a), a == this._selectedItem && a.$item.addClass("selected-item"), this.options.addItemEvents && a.$item.on("click.playlist", function (b) {
        return c.options.addItemEvents ? (c.playItem(a, b), !1) : void 0;
      });
    },
    _addEvents: function _addEvents(a) {
      var b = a.options,
          c = function c(_c) {
        b.autoplay && a.playNext(_c);
      };

      this.media.on("ended", c), this._remove = function () {
        a.media.off("ended", c), a.autoplay(!1), a.$rendered && a.$rendered.remove(), a._fire("removelist");
      };
    },
    _remove: function _remove() {
      this._fire("removelist");
    },
    render: function render(a) {
      this.$rendered ? a(this.$rendered, this.player, this) : this.deferred.done(function () {
        var b,
            c = this,
            d = [];

        if (!this.$rendered) {
          switch (h.each(this.list, function (a, b) {
            var e = h(h.parseHTML(c.options.renderer(b, c.options.itemTmpl))).filter(f)[0];
            c._addItemData(b, e), d.push(e);
          }), b = (d[0] && d[0].nodeName || "").toLowerCase()) {
            case "li":
              this.$rendered = h.parseHTML("<ul />");
              break;

            case "option":
              this.$rendered = h.parseHTML("<select />");
              break;

            default:
              this.$rendered = h.parseHTML("<div />");
          }

          this.$rendered = h(this.$rendered).html(d), this._addDomList();
        }

        a(this.$rendered, this.player, this);
      });
    },
    _loadItem: function _loadItem(a) {
      var b = this.media;
      b.attr("poster", a.poster || ""), h("track", b).remove(), h.each(a.tracks || [], function (a, c) {
        h("<track />").attr(c).appendTo(b);
      }), a.srces || (a.srces = a), b.jmeProp("srces", a.srces);
    },
    _getItem: function _getItem(a) {
      return a && (a.nodeName || a.jquery || "string" == typeof a) && (a = h(a).data("itemData")), a;
    },
    playItem: function playItem(a, b) {
      var c;
      this.selectedItem(a, b), a && (c = this.media.play(), setTimeout(function () {
        c.play();
      }, 9));
    },
    selectedIndex: function selectedIndex(a, b) {
      return arguments.length ? void this.selectedItem(this.list[a], b) : this._selectedIndex;
    },
    selectedItem: function selectedItem(a, b) {
      var c, d;
      return arguments.length ? (d = -1, a = this._getItem(a), a && h.each(this.list, function (b) {
        return a == this ? (d = b, !1) : void 0;
      }), d >= 0 && this._loadItem(this.list[d]), d != this._selectedIndex && (c = this._selectedItem || null, c && c.$item && c.$item.removeClass("selected-item"), this._selectedItem = this.list[d] || null, this._selectedIndex = d, this._selectedItem && this._selectedItem.$item && this._selectedItem.$item.addClass("selected-item"), c !== this._selectedItem && this._fire("itemchange", [{
        oldItem: c,
        from: b || null
      }])), void 0) : this._selectedItem;
    },
    playNext: function playNext() {
      var a = this.getNext();
      a && this.playItem(a);
    },
    playPrev: function playPrev() {
      var a = this.getPrev();
      a && this.playItem(a);
    },
    getNext: function getNext() {
      var a = this._selectedIndex + 1;
      return this.list[a] || (this.options.loop ? this.list[0] : null);
    },
    getPrev: function getPrev() {
      var a = this._selectedIndex - 1;
      return this.list[a] || (this.options.loop ? this.list[this.list.length - 1] : null);
    }
  }), [{
    name: "autoplay",
    fn: "getAutoplayList"
  }, {
    name: "showcontrols",
    fn: "getShowcontrolsList"
  }, {
    name: "loop"
  }].forEach(function (a) {
    b.prototype[a.name] = function (b) {
      var c;
      return arguments.length ? (b = !!b, b && a.fn && (c = this.playlists[a.fn](), c && c != this && c[a.name](!1)), this.options[a.name] != b && (this.options[a.name] = b, this.$rendered && this.$rendered.attr("data-" + a.name, b), this._fire(a.name + "change")), void 0) : this.options[a.name];
    };
  }), i.defineProp("playlists", {
    writable: !1,
    get: function get(b) {
      var c = h.jme.data(b);
      return b != c.player[0] ? null : (c.playlists || (c.playlists = new a(c)), c.playlists);
    }
  }), i.defineMethod("addPlaylist", function (a, b) {
    var c = h.jme.prop(this, "playlists");
    return c && c.add ? c.add(a, b) : null;
  }), [{
    name: "playlist-prev",
    text: "previous",
    get: "getPrev",
    play: "playPrev"
  }, {
    name: "playlist-next",
    text: "next",
    get: "getNext",
    play: "playNext"
  }].forEach(function (a) {
    h.jme.registerPlugin(a.name, {
      structure: k,
      text: a.text,
      _create: function _create(b, c, d) {
        function e() {
          var c = g[a.get]();
          b.prop(c ? {
            disabled: !1,
            title: c.title
          } : {
            disabled: !0,
            title: ""
          });
        }

        function f() {
          var a = h.getShowcontrolsList();
          a != g && (g && g.off("itemchange", e), g = a, g && (g.on("itemchange", e), e()));
        }

        var g,
            h = d.jmeProp("playlists");
        b.on("click", function () {
          g && g[a.play]();
        }), h.on({
          "addlist removelist showcontrolschange": f
        }), f();
      }
    });
  }), function () {
    var a = {};

    h.jme.tmpl = function (b, c) {
      return a[b] || (a[b] = new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + b.replace(/[\r\t\n]/g, " ").replace(/'(?=[^%]*%>)/g, "	").split("'").join("\\'").split("	").join("'").replace(/<%=(.+?)%>/g, "',$1,'").split("<%").join("');").split("%>").join("p.push('") + "');}return p.join('');")), c ? a[b](c) : a[b];
    };
  }(), h.jme.Playlist = b, g.isReady("playlist", !0);
});