'use strict';
/** @type {function(!Object): ?} */
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(exclude) {
  return typeof exclude;
} : function(obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
(function() {
  /**
   * @param {!Object} nodes
   * @return {?}
   */
  function clear(nodes) {
    return !(!nodes.length || !nodes[0].tv || !nodes[0].plugin || nodes[0].plugin !== event.component);
  }
  /**
   * @param {number} s
   * @param {boolean} layer
   * @return {?}
   */
  function init(s, layer) {
    if (!Lampa.Player.opened()) {
      return false;
    }
    var items = Lampa.PlayerPlaylist.get();
    if (!clear(items)) {
      return false;
    }
    if (!$("body>.js-ch-" + event.component).length) {
      $("body").append(handle).append(frame);
    }
    var max = items.length;
    var c2 = c;
    c = c + s;
    /** @type {number} */
    var index = parseInt(c);
    if (index && index <= max) {
      if (!!_takingTooLongTimeout) {
        clearTimeout(_takingTooLongTimeout);
      }
      /** @type {boolean} */
      stopRemoveChElement = true;
      mElmOrSub.text(items[index - 1].title);
      if (layer || parseInt(c + "0") > max) {
        frame.finish().hide().fadeOut(0);
      } else {
        /** @type {!Array} */
        var drilldownLevelLabels = [];
        /** @type {number} */
        var last = 9;
        /** @type {number} */
        var length = parseInt(c + "0");
        /** @type {number} */
        var i = length;
        for (; i <= max && i <= length + Math.min(last, 9); i++) {
          drilldownLevelLabels.push($endTime.text(items[i - 1].title).html());
        }
        jQFooter.html(drilldownLevelLabels.join("<br>"));
        frame.finish().show().fadeIn(0);
      }
      if (index < 10 || layer) {
        handle.finish().show().fadeIn(0);
      }
      /** @type {boolean} */
      stopRemoveChElement = false;
      /**
       * @return {undefined}
       */
      var disableColorPicker = function removeaToolTip() {
        /** @type {number} */
        var i = index - 1;
        if (Lampa.PlayerPlaylist.position() !== i) {
          Lampa.PlayerPlaylist.listener.send("select", {
            playlist : items,
            position : i,
            item : items[i]
          });
        }
        handle.delay(1000).fadeOut(500, function() {
          if (!stopRemoveChElement) {
            handle.remove();
          }
        });
        frame.delay(1000).fadeOut(500, function() {
          if (!stopRemoveChElement) {
            frame.remove();
          }
        });
        /** @type {string} */
        c = "";
      };
      if (layer === true) {
        /** @type {number} */
        _takingTooLongTimeout = setTimeout(disableColorPicker, 1000);
        /** @type {string} */
        c = "";
      } else {
        if (parseInt(c + "0") > max) {
          disableColorPicker();
        } else {
          /** @type {number} */
          _takingTooLongTimeout = setTimeout(disableColorPicker, 3000);
        }
      }
    } else {
      c = c2;
    }
    return true;
  }
  /**
   * @param {string} id
   * @param {?} object
   * @param {number} depth
   * @return {?}
   */
  function cowSet(id, object, depth) {
    /** @type {number} */
    var select2_results_dept_ = new Date * 1;
    if (!!depth && depth > 0) {
      /** @type {!Array} */
      objectIdMap[id] = [select2_results_dept_ + depth, object];
      return;
    }
    if (!!objectIdMap[id] && objectIdMap[id][0] > select2_results_dept_) {
      return objectIdMap[id][1];
    }
    delete objectIdMap[id];
    return object;
  }
  /**
   * @return {?}
   */
  function currentTime() {
    return Math.floor((new Date).getTime() / 1000);
  }
  /**
   * @param {string} media
   * @return {?}
   */
  function set(media) {
    var children = currentTime();
    return children + ":" + data.md5((media || "") + children + data.uid());
  }
  /**
   * @param {string} d
   * @return {?}
   */
  function callback(d) {
    /** @type {!Array} */
    var r = [];
    /** @type {string} */
    var key = "";
    for (; !!(r = d.match(/\$\{(\(([a-zA-Z\d]+)\))?([^${}]+)}/));) {
      if (!!r[2] && typeof data[r[2]] === "function") {
        /** @type {string} */
        key = encodeURIComponent(data[r[2]](r[3]));
      } else {
        if (r[3] in data) {
          /** @type {string} */
          key = encodeURIComponent(typeof data[r[3]] === "function" ? data[r[3]]() : data[r[3]]);
        } else {
          key = r[1];
        }
      }
      d = d.replace(r[0], key);
    }
    return d;
  }
  /**
   * @param {!Function} func
   * @param {!Object} options
   * @return {?}
   */
  function run(func, options) {
    /** @type {number} */
    var index = 1;
    /** @type {number} */
    var timeout = 1;
    var fn;
    var callback;
    /**
     * @return {undefined}
     */
    var noop = function swarmVerifiedPublish() {
    };
    if ((typeof options === "undefined" ? "undefined" : _typeof(options)) === "object") {
      timeout = options.timeout || timeout;
      callback = options.onBulk || noop;
      fn = options.onEnd || noop;
      index = options.bulk || index;
    } else {
      if (typeof options === "number") {
        /** @type {!Object} */
        index = options;
        if (typeof arguments[2] === "number") {
          timeout = arguments[2];
        }
      } else {
        if (typeof options === "function") {
          /** @type {!Object} */
          callback = options;
          if (typeof arguments[2] === "number") {
            index = arguments[2];
          }
          if (typeof arguments[3] === "number") {
            timeout = arguments[3];
          }
        }
      }
    }
    if (!index || index < 1) {
      /** @type {number} */
      index = 1;
    }
    if (typeof fn !== "function") {
      /** @type {function(): undefined} */
      fn = noop;
    }
    if (typeof callback !== "function") {
      /** @type {function(): undefined} */
      callback = noop;
    }
    var _this = this;
    /** @type {!Array} */
    var node = [];
    var initializeCheckTimer;
    /** @type {number} */
    var value = 0;
    /**
     * @return {undefined}
     */
    var HackMyResumeOutputStub = function showNotificationsCount() {
      if (!!node.length && !initializeCheckTimer) {
        /** @type {number} */
        initializeCheckTimer = setInterval(function() {
          /** @type {number} */
          var e = 0;
          for (; node.length && ++e <= index;) {
            func.apply(_this, node.shift());
          }
          /** @type {number} */
          e = node.length ? e : e - 1;
          value = value + e;
          callback.apply(_this, [e, value, node.length]);
          if (!node.length) {
            clearInterval(initializeCheckTimer);
            /** @type {null} */
            initializeCheckTimer = null;
            fn.apply(_this, [e, value, node.length]);
          }
        }, timeout || 0);
      }
    };
    return function() {
      node.push(arguments);
      HackMyResumeOutputStub();
    };
  }
  /**
   * @param {!Object} scope
   * @return {undefined}
   */
  function create(scope) {
    if (scope.id !== value) {
      map = {};
      value = scope.id;
    }
    var val = cb("favorite" + scope.id, "[]");
    var collection = new Lampa.Reguest;
    var worldEngine = new Lampa.Scroll({
      mask : true,
      over : true,
      step : 250
    });
    var $module = $("<div></div>");
    var body = $('<div class="' + event.component + ' category-full"></div>');
    var info;
    var swap;
    /**
     * @return {?}
     */
    this.create = function() {
      var self = this;
      this.activity.loader(true);
      /**
       * @return {undefined}
       */
      var handleDbError = function render() {
        var cur = new Lampa.Empty;
        $module.append(cur.render());
        self.start = cur.start;
        self.activity.loader(false);
        self.activity.toggle();
      };
      if (Object.keys(map).length) {
        self.build(!map[scope.currentGroup] ? rules[scope.id].groups.length > 1 && map[rules[scope.id].groups[1].key] ? map[rules[scope.id].groups[1].key]["channels"] : [] : map[scope.currentGroup]["channels"]);
      } else {
        if (!rules[scope.id] || !scope.url) {
          handleDbError();
          return;
        } else {
          collection.native(callback(scope.url), function(hexstr) {
            if (typeof hexstr != "string" || hexstr.substr(0, 7).toUpperCase() !== "#EXTM3U") {
              handleDbError();
              return;
            }
            map = {
              "" : {
                title : require("favorites"),
                channels : []
              }
            };
            /** @type {!Array} */
            rules[scope.id].groups = [{
              title : require("favorites"),
              key : ""
            }];
            /** @type {!Array<string>} */
            var theseCookies = hexstr.split(/\r?\n/);
            /** @type {number} */
            var k = 0;
            /** @type {number} */
            var i = 1;
            /** @type {number} */
            var j = 0;
            var format;
            var charsetMatch;
            /** @type {string} */
            var message = titleSome;
            for (; i < theseCookies.length;) {
              /** @type {number} */
              j = k + 1;
              var data = {
                ChNum : j,
                Title : "Ch " + j,
                isYouTube : false,
                Url : "",
                Group : "",
                Options : {}
              };
              for (; k < j && i < theseCookies.length; i++) {
                if (!!(format = theseCookies[i].match(/^#EXTGRP:\s*(.+?)\s*$/i)) && format[1].trim() !== "") {
                  /** @type {string} */
                  message = format[1].trim();
                } else {
                  if (!!(format = theseCookies[i].match(/^#EXTINF:\s*-?\d+(\s+\S.*?\s*)?,(.+)$/i))) {
                    /** @type {string} */
                    data.Title = format[2].trim();
                    if (!!format[1] && !!(format = format[1].match(/([^\s=]+)=((["'])(.*?)\3|\S+)/g))) {
                      /** @type {number} */
                      var formatPointer = 0;
                      for (; formatPointer < format.length; formatPointer++) {
                        if (!!(charsetMatch = format[formatPointer].match(/([^\s=]+)=((["'])(.*?)\3|\S+)/))) {
                          /** @type {string} */
                          data[charsetMatch[1].toLowerCase()] = charsetMatch[4] || charsetMatch[2];
                        }
                      }
                    }
                  } else {
                    if (!!(format = theseCookies[i].match(/^#EXTVLCOPT:\s*([^\s=]+)=(.+)$/i))) {
                      /** @type {string} */
                      data.Options[format[1].trim().toLowerCase()] = format[2].trim();
                    } else {
                      if (!!(format = theseCookies[i].match(/^(https?):\/\/(.+)$/i))) {
                        /** @type {string} */
                        data.Url = format[0].trim();
                        /** @type {boolean} */
                        data.isYouTube = !!format[2].match(/^(www\.)?youtube\.com/);
                        data.Group = data["group-title"] || message;
                        k++;
                      }
                    }
                  }
                }
              }
              if (!!data.Url && !data.isYouTube) {
                if (!map[data.Group]) {
                  map[data.Group] = {
                    title : data.Group,
                    channels : []
                  };
                  rules[scope.id].groups.push({
                    title : data.Group,
                    key : data.Group
                  });
                }
                if (!data["tvg-logo"] && data["Title"] !== "Ch " + j) {
                  /** @type {string} */
                  data["tvg-logo"] = "http://epg.rootu.top/picon/" + encodeURIComponent(data["Title"]) + ".png";
                }
                map[data.Group].channels.push(data);
                var name = val.indexOf(fn(data.Title));
                if (name !== -1) {
                  map[""].channels[name] = data;
                }
              }
            }
            /** @type {number} */
            i = 0;
            for (; i < rules[scope.id].groups.length; i++) {
              var e = rules[scope.id].groups[i];
              e.title += " [" + map[e.key].channels.length + "]";
            }
            /** @type {number} */
            i = 0;
            for (; i < val.length; i++) {
              if (!map[""].channels[i]) {
                map[""].channels[i] = {
                  ChNum : -1,
                  Title : "#" + val[i],
                  isYouTube : false,
                  Url : "http://epg.rootu.top/empty/_.m3u8",
                  Group : "",
                  Options : {},
                  "tvg-logo" : "http://epg.rootu.top/empty/_.gif"
                };
              }
            }
            self.build(!map[scope.currentGroup] ? rules[scope.id].groups.length > 1 && !!map[rules[scope.id].groups[1].key] ? map[rules[scope.id].groups[1].key]["channels"] : [] : map[scope.currentGroup]["channels"]);
          }, function() {
            handleDbError();
          }, false, {
            dataType : "text"
          });
        }
      }
      return this.render();
    };
    /**
     * @param {!Array} value
     * @return {undefined}
     */
    this.append = function(value) {
      /** @type {number} */
      var silverlightCount = 0;
      var context = this;
      /** @type {boolean} */
      var lazyLoadImg = "loading" in HTMLImageElement.prototype;
      var result = run(function(data) {
        /** @type {number} */
        var end = silverlightCount++;
        var list = Lampa.Template.get("card", {
          title : data.Title,
          release_year : ""
        });
        list.addClass("card--collection");
        list.find(".card__img").css({
          "cursor" : "pointer",
          "background-color" : "#353535a6"
        });
        var me = list.find(".card__img")[0];
        if (lazyLoadImg) {
          /** @type {string} */
          me.loading = end < 18 ? "eager" : "lazy";
        }
        /**
         * @return {undefined}
         */
        me.onload = function() {
          list.addClass("card--loaded");
        };
        /**
         * @param {?} event
         * @return {undefined}
         */
        me.onerror = function(event) {
          /** @type {string} */
          me.src = "./img/img_broken.svg";
          /** @type {string} */
          data["tvg-logo"] = "";
        };
        me.src = data["tvg-logo"] || "./img/img_broken.svg";
        var $node_runner_indicator = $('<div class="card__icon icon--book hide"></div>');
        list.find(".card__icons-inner").append($node_runner_indicator);
        if (scope.currentGroup !== "" && val.indexOf(fn(data.Title)) !== -1) {
          $node_runner_indicator.toggleClass("hide", false);
        }
        list.on("hover:focus", function() {
          swap = list[0];
          worldEngine.update(list, true);
          info.find(".info__title-original").text(data.Title);
        }).on("hover:enter", function() {
          var params = {
            title : data.Title,
            url : callback(data.Url),
            plugin : event.component,
            tv : true
          };
          /** @type {!Array} */
          var req = [];
          /** @type {!Array} */
          var list = [];
          /** @type {number} */
          var start = 0;
          value.forEach(function(data) {
            var id = start < end ? value.length - end + start : start - end;
            var requestOrUrl = start === end ? params.url : callback(data.Url);
            list[id] = {
              title : data.Title,
              url : requestOrUrl,
              tv : true
            };
            req.push({
              title : ++start + ". " + data.Title,
              url : requestOrUrl,
              plugin : event.component,
              tv : true
            });
          });
          /** @type {!Array} */
          params["playlist"] = list;
          Lampa.Player.play(params);
          Lampa.Player.playlist(req);
        }).on("hover:long", function() {
          var i = val.indexOf(fn(data.Title));
          /** @type {boolean} */
          var closing = scope.currentGroup === "";
          /** @type {!Array} */
          var values = [{
            title : i === -1 ? require("favorites_add") : require("favorites_del"),
            favToggle : true
          }];
          if (closing && val.length) {
            if (i !== 0) {
              values.push({
                title : require("favorites_move_top"),
                favMove : true,
                i : 0
              });
              values.push({
                title : require("favorites_move_up"),
                favMove : true,
                i : i - 1
              });
            }
            if (i + 1 !== val.length) {
              values.push({
                title : require("favorites_move_down"),
                favMove : true,
                i : i + 1
              });
              values.push({
                title : require("favorites_move_end"),
                favMove : true,
                i : val.length - 1
              });
            }
            values.push({
              title : require("favorites_clear"),
              favClear : true
            });
          }
          Lampa.Select.show({
            title : Lampa.Lang.translate("title_action"),
            items : values,
            onSelect : function render(pos) {
              var e = rules[scope.id].groups[0];
              if (!!pos.favToggle) {
                if (i === -1) {
                  i = val.length;
                  val[i] = fn(data.Title);
                  /** @type {!Object} */
                  map[e.key].channels[i] = data;
                } else {
                  val.splice(i, 1);
                  map[e.key].channels.splice(i, 1);
                }
              } else {
                if (!!pos.favClear) {
                  /** @type {!Array} */
                  val = [];
                  /** @type {!Array} */
                  map[e.key].channels = [];
                } else {
                  if (!!pos.favMove) {
                    val.splice(i, 1);
                    val.splice(pos.i, 0, fn(data.Title));
                    map[e.key].channels.splice(i, 1);
                    map[e.key].channels.splice(pos.i, 0, data);
                  }
                }
              }
              get("favorite" + scope.id, val);
              /** @type {string} */
              e.title = map[e.key].title + " [" + map[e.key].channels.length + "]";
              if (closing) {
                Lampa.Activity.replace(Lampa.Arrays.clone(rules[scope.id].activity));
              } else {
                $node_runner_indicator.toggleClass("hide", val.indexOf(fn(data.Title)) === -1);
                Lampa.Controller.toggle("content");
              }
            },
            onBack : function onResize() {
              Lampa.Controller.toggle("content");
            }
          });
        });
        body.append(list);
      }, {
        bulk : 18,
        onEnd : function detach(oldChrome, newChrome, detachRange) {
          context.activity.loader(false);
          context.activity.toggle();
        }
      });
      value.forEach(result);
    };
    /**
     * @param {!Array} value
     * @return {undefined}
     */
    this.build = function(value) {
      var $scope = this;
      Lampa.Background.change();
      Lampa.Template.add(event.component + "_button_category", "<style>@media screen and (max-width: 2560px) {." + event.component + " .card--collection {width: " + custom_icons + "%!important;}}@media screen and (max-width: 385px) {." + event.component + ' .card--collection {width: 33.3%!important;}}</style><div class="full-start__button selector view--category"><svg style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="info"/><g id="icons"><g id="menu"><path d="M20,10H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2C22,10.9,21.1,10,20,10z" fill="currentColor"/><path d="M4,8h12c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6C2,7.1,2.9,8,4,8z" fill="currentColor"/><path d="M16,16H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2C18,16.9,17.1,16,16,16z" fill="currentColor"/></g></g></svg>   <span>' + 
      require("categories") + "</span>\n    </div>");
      Lampa.Template.add(event.component + "_info_radio", '<div class="info layer--width"><div class="info__left"><div class="info__title"></div><div class="info__title-original"></div><div class="info__create"></div></div><div class="info__right" style="display: flex !important;">  <div id="stantion_filtr"></div></div></div>');
      var btn = Lampa.Template.get(event.component + "_button_category");
      info = Lampa.Template.get(event.component + "_info_radio");
      info.find("#stantion_filtr").append(btn);
      info.find(".view--category").on("hover:enter hover:click", function() {
        $scope.selectGroup();
      });
      info.find(".info__title").text(!map[scope.currentGroup] ? "" : map[scope.currentGroup].title);
      info.find(".info__title-original").text("");
      $module.append(info.append());
      if (value.length) {
        worldEngine.render().addClass("layer--wheight").data("mheight", info);
        $module.append(worldEngine.render());
        this.append(value);
        worldEngine.append(body);
        get("last_catalog" + scope.id, scope.currentGroup);
        rules[scope.id].activity.currentGroup = scope.currentGroup;
      } else {
        var mipAd = new Lampa.Empty;
        $module.append(mipAd.render());
        this.activity.loader(false);
        Lampa.Controller.collectionSet(info);
        Navigator.move("right");
      }
    };
    /**
     * @return {undefined}
     */
    this.selectGroup = function() {
      var data = Lampa.Arrays.clone(rules[scope.id].activity);
      Lampa.Select.show({
        title : require("categories"),
        items : Lampa.Arrays.clone(rules[scope.id].groups),
        onSelect : function onResize(item) {
          if (scope.currentGroup !== item.key) {
            data.currentGroup = item.key;
            Lampa.Activity.replace(data);
          } else {
            Lampa.Controller.toggle("content");
          }
        },
        onBack : function onResize() {
          Lampa.Controller.toggle("content");
        }
      });
    };
    /**
     * @return {undefined}
     */
    this.start = function() {
      if (Lampa.Activity.active().activity !== this.activity) {
        return;
      }
      var $scope = this;
      Lampa.Controller.add("content", {
        toggle : function onResize() {
          Lampa.Controller.collectionSet(worldEngine.render());
          Lampa.Controller.collectionFocus(swap || false, worldEngine.render());
        },
        left : function start() {
          if (Navigator.canmove("left")) {
            Navigator.move("left");
          } else {
            Lampa.Controller.toggle("menu");
          }
        },
        right : function moveBalls() {
          if (Navigator.canmove("right")) {
            Navigator.move("right");
          } else {
            $scope.selectGroup();
          }
        },
        up : function up() {
          if (Navigator.canmove("up")) {
            Navigator.move("up");
          } else {
            if (!info.find(".view--category").hasClass("focus")) {
              if (!info.find(".view--category").hasClass("focus")) {
                Lampa.Controller.collectionSet(info);
                Navigator.move("right");
              }
            } else {
              Lampa.Controller.toggle("head");
            }
          }
        },
        down : function start() {
          if (Navigator.canmove("down")) {
            Navigator.move("down");
          } else {
            if (info.find(".view--category").hasClass("focus")) {
              Lampa.Controller.toggle("content");
            }
          }
        },
        back : function callbackWrapper() {
          Lampa.Activity.backward();
        }
      });
      Lampa.Controller.toggle("content");
    };
    /**
     * @return {undefined}
     */
    this.pause = function() {
    };
    /**
     * @return {undefined}
     */
    this.stop = function() {
    };
    /**
     * @return {?}
     */
    this.render = function() {
      return $module;
    };
    /**
     * @return {undefined}
     */
    this.destroy = function() {
      collection.clear();
      worldEngine.destroy();
      if (info) {
        info.remove();
      }
      $module.remove();
      body.remove();
      /** @type {null} */
      val = null;
      /** @type {null} */
      collection = null;
      /** @type {null} */
      $module = null;
      /** @type {null} */
      body = null;
      /** @type {null} */
      info = null;
    };
  }
  /**
   * @param {string} type
   * @param {?} data
   * @return {undefined}
   */
  function reply(type, data) {
    r[event.component + "_" + type] = data;
  }
  /**
   * @param {string} type
   * @return {?}
   */
  function require(type) {
    return Lampa.Lang.translate(event.component + "_" + type);
  }
  /**
   * @param {string} pressed
   * @return {?}
   */
  function fn(pressed) {
    return pressed.toLowerCase().replace(/[\s!-\/:-@\[-`{-~]+/g, "");
  }
  /**
   * @param {string} value
   * @param {string} code
   * @return {?}
   */
  function cb(value, code) {
    return Lampa.Storage.get(event.component + "_" + value, code);
  }
  /**
   * @param {string} uri
   * @param {string} file
   * @param {?} val
   * @return {?}
   */
  function get(uri, file, val) {
    return Lampa.Storage.set(event.component + "_" + uri, file, val);
  }
  /**
   * @param {string} dim
   * @return {?}
   */
  function open(dim) {
    return Lampa.Storage.field(event.component + "_" + dim);
  }
  /**
   * @param {string} type
   * @param {!Object} config
   * @return {undefined}
   */
  function render(type, config) {
    var options = {
      component : event.component,
      param : {
        name : event.component + "_" + config.name,
        type : type,
        values : !config.values ? "" : config.values,
        placeholder : !config.placeholder ? "" : config.placeholder,
        default : typeof config.default === "undefined" ? "" : config.default
      },
      field : {
        name : !config.title ? !config.name ? "" : config.name : config.title
      }
    };
    if (!!config.name) {
      /** @type {string} */
      options.param.name = event.component + "_" + config.name;
    }
    if (!!config.description) {
      options.field.description = config.description;
    }
    if (!!config.onChange) {
      options.onChange = config.onChange;
    }
    if (!!config.onRender) {
      options.onRender = config.onRender;
    }
    Lampa.SettingsApi.addParam(options);
  }
  /**
   * @param {number} path
   * @return {?}
   */
  function update(path) {
    render("title", {
      title : require("settings_playlist_num_group") + (path + 1)
    });
    /** @type {string} */
    var undefined = "list " + (path + 1);
    var params = {
      id : path,
      url : "",
      title : event.name,
      groups : [],
      currentGroup : cb("last_catalog" + path, require("default_playlist_cat")),
      component : event.component,
      page : 1
    };
    render("input", {
      title : require("settings_list_name"),
      name : "list_name_" + path,
      default : path ? "\u0412\u0430\u0448 \u0432\u0442\u043e\u0440\u043e\u0439 \u043f\u043b\u0435\u0439\u043b\u0438\u0441\u0442" : event.name,
      placeholder : path ? undefined : "",
      description : require("settings_list_name_desc"),
      onChange : function render(options) {
        var url = !options ? path ? undefined : event.name : options;
        $(".js-" + event.component + "-menu" + path + "-title").text(url);
        /** @type {string} */
        params.title = url + (url === event.name ? "" : " - " + event.name);
      }
    });
    render("input", {
      title : require("settings_list_url"),
      name : "list_url_" + path,
      default : path ? "" : require("default_playlist"),
      placeholder : path ? "http://example.com/list.m3u8" : "",
      description : path ? !cb("list_url_" + path) ? require("settings_list_url_desc1") : "" : require("settings_list_url_desc0"),
      onChange : function onChange(url) {
        if (url === params.url) {
          return;
        }
        if (params.id === value) {
          map = {};
          /** @type {number} */
          value = -1;
        }
        if (/^https?:\/\/./i.test(url)) {
          /** @type {string} */
          params.url = url;
          $(".js-" + event.component + "-menu" + path).show();
        } else {
          /** @type {string} */
          params.url = "";
          $(".js-" + event.component + "-menu" + path).hide();
        }
      }
    });
    var content = open("list_name_" + path);
    var p = open("list_url_" + path);
    var title = content || undefined;
    /** @type {string} */
    params.title = title + (title === event.name ? "" : " - " + event.name);
    var menuEl = $('<li class="menu__item selector js-' + event.component + "-menu" + path + '">' + '<div class="menu__ico">' + event.icon + "</div>" + '<div class="menu__text js-' + event.component + "-menu" + path + '-title">' + $endTime.text(title).html() + "</div>" + "</li>").hide().on("hover:enter", function() {
      if (Lampa.Activity.active().component === event.component) {
        Lampa.Activity.replace(Lampa.Arrays.clone(params));
      } else {
        Lampa.Activity.push(Lampa.Arrays.clone(params));
      }
    });
    if (/^https?:\/\/./i.test(p)) {
      params.url = p;
      menuEl.show();
    }
    rules.push({
      activity : params,
      menuEl : menuEl,
      groups : []
    });
    return !params.url ? path + 1 : path;
  }
  /**
   * @return {undefined}
   */
  function destroy() {
    if (!!window["plugin_" + event.component + "_ready"]) {
      return;
    }
    /** @type {boolean} */
    window["plugin_" + event.component + "_ready"] = true;
    var top_vals_el = $(".menu .menu__list").eq(0);
    /** @type {number} */
    var i = 0;
    for (; i < rules.length; i++) {
      top_vals_el.append(rules[i].menuEl);
    }
  }
  var _ddoc = Lampa.Storage.field("account_email").toLowerCase();
  var event = {
    component : "my_iptv",
    icon : '<svg height="244" viewBox="0 0 260 244" xmlns="http://www.w3.org/2000/svg" style="fill-rule:evenodd;" fill="currentColor"><path d="M259.5 47.5v114c-1.709 14.556-9.375 24.723-23 30.5a2934.377 2934.377 0 0 1-107 1.5c-35.704.15-71.37-.35-107-1.5-13.625-5.777-21.291-15.944-23-30.5v-115c1.943-15.785 10.61-25.951 26-30.5a10815.71 10815.71 0 0 1 208 0c15.857 4.68 24.523 15.18 26 31.5zm-230-13a4963.403 4963.403 0 0 0 199 0c5.628 1.128 9.128 4.462 10.5 10 .667 40 .667 80 0 120-1.285 5.618-4.785 8.785-10.5 9.5-66 .667-132 .667-198 0-5.715-.715-9.215-3.882-10.5-9.5-.667-40-.667-80 0-120 1.35-5.18 4.517-8.514 9.5-10z"/><path d="M70.5 71.5c17.07-.457 34.07.043 51 1.5 5.44 5.442 5.107 10.442-1 15-5.991.5-11.991.666-18 .5.167 14.337 0 28.671-.5 43-3.013 5.035-7.18 6.202-12.5 3.5a11.529 11.529 0 0 1-3.5-4.5 882.407 882.407 0 0 1-.5-42c-5.676.166-11.343 0-17-.5-4.569-2.541-6.069-6.375-4.5-11.5 1.805-2.326 3.972-3.992 6.5-5zM137.5 73.5c4.409-.882 7.909.452 10.5 4a321.009 321.009 0 0 0 16 30 322.123 322.123 0 0 0 16-30c2.602-3.712 6.102-4.879 10.5-3.5 5.148 3.334 6.314 7.834 3.5 13.5a1306.032 1306.032 0 0 0-22 43c-5.381 6.652-10.715 6.652-16 0a1424.647 1424.647 0 0 0-23-45c-1.691-5.369-.191-9.369 4.5-12zM57.5 207.5h144c7.788 2.242 10.288 7.242 7.5 15a11.532 11.532 0 0 1-4.5 3.5c-50 .667-100 .667-150 0-6.163-3.463-7.496-8.297-4-14.5 2.025-2.064 4.358-3.398 7-4z"/></svg>',
    name : "\u0414\u0438\u0437\u0435\u043b\u044c \u0422\u0412"
  };
  /** @type {!Array} */
  var rules = [];
  /** @type {number} */
  var value = -1;
  /** @type {string} */
  var titleSome = "Other";
  var map = {};
  /** @type {string} */
  var result = "";
  /** @type {string} */
  var c = "";
  /** @type {null} */
  var _takingTooLongTimeout = null;
  /** @type {boolean} */
  var stopRemoveChElement = false;
  var handle = $('<div class="player-info info--visible js-ch-' + event.component + '" style="top: 9em;right: auto;z-index: 1000;">\n' + '    <div class="player-info__body">\n' + '        <div class="player-info__line">\n' + '            <div class="player-info__name">&nbsp;</div>\n' + "        </div>\n" + "    </div>\n" + "</div>").hide().fadeOut(0);
  var frame = $('<div class="player-info info--visible js-ch-' + event.component + '" style="top: 14em;right: auto;z-index: 1000;">\n' + '    <div class="player-info__body">\n' + '        <div class="tv-helper"></div>\n' + "    </div>\n" + "</div>").hide().fadeOut(0);
  var jQFooter = frame.find(".tv-helper");
  var mElmOrSub = handle.find(".player-info__name");
  var $endTime = $("<div/>");
  var objectIdMap = {};
  var data = {
    uid : function lexicalOrder() {
      return result;
    },
    timestamp : currentTime,
    token : function set() {
      return set(Lampa.Storage.field("account_email").toLowerCase());
    }
  };
  !function(options) {
    /**
     * @param {number} a
     * @param {number} b
     * @return {?}
     */
    function $(a, b) {
      /** @type {number} */
      var r = (65535 & a) + (65535 & b);
      return (a >> 16) + (b >> 16) + (r >> 16) << 16 | 65535 & r;
    }
    /**
     * @param {number} x
     * @param {number} n
     * @return {?}
     */
    function render(x, n) {
      return x << n | x >>> 32 - n;
    }
    /**
     * @param {number} elem
     * @param {number} options
     * @param {number} data
     * @param {number} e
     * @param {number} name
     * @param {number} id
     * @return {?}
     */
    function startTimer(elem, options, data, e, name, id) {
      return $(render($($(options, elem), $(e, id)), name), data);
    }
    /**
     * @param {number} t
     * @param {number} b
     * @param {number} a
     * @param {number} e
     * @param {undefined} name
     * @param {number} fn
     * @param {number} data
     * @return {?}
     */
    function g(t, b, a, e, name, fn, data) {
      return startTimer(b & a | ~b & e, t, b, name, fn, data);
    }
    /**
     * @param {number} ctx
     * @param {number} n
     * @param {number} t
     * @param {number} a
     * @param {undefined} s
     * @param {number} fn
     * @param {number} ms
     * @return {?}
     */
    function format(ctx, n, t, a, s, fn, ms) {
      return startTimer(n & a | t & ~a, ctx, n, s, fn, ms);
    }
    /**
     * @param {number} ctx
     * @param {number} x
     * @param {number} t
     * @param {number} f
     * @param {undefined} fn
     * @param {number} msg
     * @param {number} ms
     * @return {?}
     */
    function setTimeout(ctx, x, t, f, fn, msg, ms) {
      return startTimer(x ^ t ^ f, ctx, x, fn, msg, ms);
    }
    /**
     * @param {number} ctx
     * @param {number} c
     * @param {number} d
     * @param {number} a
     * @param {undefined} fn
     * @param {number} name
     * @param {number} arg1
     * @return {?}
     */
    function f(ctx, c, d, a, fn, name, arg1) {
      return startTimer(d ^ (c | ~a), ctx, c, fn, name, arg1);
    }
    /**
     * @param {!Object} b
     * @param {number} a
     * @return {?}
     */
    function i(b, a) {
      b[a >> 5] |= 128 << a % 32;
      /** @type {number} */
      b[14 + (a + 64 >>> 9 << 4)] = a;
      var j;
      var e;
      var d;
      var next;
      var t;
      /** @type {number} */
      var p = 1732584193;
      /** @type {number} */
      var c = -271733879;
      /** @type {number} */
      var n = -1732584194;
      /** @type {number} */
      var i = 271733878;
      /** @type {number} */
      j = 0;
      for (; j < b.length; j = j + 16) {
        e = p;
        d = c;
        next = n;
        t = i;
        c = f(c = f(c = f(c = f(c = setTimeout(c = setTimeout(c = setTimeout(c = setTimeout(c = format(c = format(c = format(c = format(c = g(c = g(c = g(c = g(c, n = g(n, i = g(i, p = g(p, c, n, i, b[j], 7, -680876936), c, n, b[j + 1], 12, -389564586), p, c, b[j + 2], 17, 606105819), i, p, b[j + 3], 22, -1044525330), n = g(n, i = g(i, p = g(p, c, n, i, b[j + 4], 7, -176418897), c, n, b[j + 5], 12, 1200080426), p, c, b[j + 6], 17, -1473231341), i, p, b[j + 7], 22, -45705983), n = g(n, i = g(i, p = 
        g(p, c, n, i, b[j + 8], 7, 1770035416), c, n, b[j + 9], 12, -1958414417), p, c, b[j + 10], 17, -42063), i, p, b[j + 11], 22, -1990404162), n = g(n, i = g(i, p = g(p, c, n, i, b[j + 12], 7, 1804603682), c, n, b[j + 13], 12, -40341101), p, c, b[j + 14], 17, -1502002290), i, p, b[j + 15], 22, 1236535329), n = format(n, i = format(i, p = format(p, c, n, i, b[j + 1], 5, -165796510), c, n, b[j + 6], 9, -1069501632), p, c, b[j + 11], 14, 643717713), i, p, b[j], 20, -373897302), n = format(n, i = 
        format(i, p = format(p, c, n, i, b[j + 5], 5, -701558691), c, n, b[j + 10], 9, 38016083), p, c, b[j + 15], 14, -660478335), i, p, b[j + 4], 20, -405537848), n = format(n, i = format(i, p = format(p, c, n, i, b[j + 9], 5, 568446438), c, n, b[j + 14], 9, -1019803690), p, c, b[j + 3], 14, -187363961), i, p, b[j + 8], 20, 1163531501), n = format(n, i = format(i, p = format(p, c, n, i, b[j + 13], 5, -1444681467), c, n, b[j + 2], 9, -51403784), p, c, b[j + 7], 14, 1735328473), i, p, b[j + 12], 
        20, -1926607734), n = setTimeout(n, i = setTimeout(i, p = setTimeout(p, c, n, i, b[j + 5], 4, -378558), c, n, b[j + 8], 11, -2022574463), p, c, b[j + 11], 16, 1839030562), i, p, b[j + 14], 23, -35309556), n = setTimeout(n, i = setTimeout(i, p = setTimeout(p, c, n, i, b[j + 1], 4, -1530992060), c, n, b[j + 4], 11, 1272893353), p, c, b[j + 7], 16, -155497632), i, p, b[j + 10], 23, -1094730640), n = setTimeout(n, i = setTimeout(i, p = setTimeout(p, c, n, i, b[j + 13], 4, 681279174), c, n, b[j], 
        11, -358537222), p, c, b[j + 3], 16, -722521979), i, p, b[j + 6], 23, 76029189), n = setTimeout(n, i = setTimeout(i, p = setTimeout(p, c, n, i, b[j + 9], 4, -640364487), c, n, b[j + 12], 11, -421815835), p, c, b[j + 15], 16, 530742520), i, p, b[j + 2], 23, -995338651), n = f(n, i = f(i, p = f(p, c, n, i, b[j], 6, -198630844), c, n, b[j + 7], 10, 1126891415), p, c, b[j + 14], 15, -1416354905), i, p, b[j + 5], 21, -57434055), n = f(n, i = f(i, p = f(p, c, n, i, b[j + 12], 6, 1700485571), c, 
        n, b[j + 3], 10, -1894986606), p, c, b[j + 10], 15, -1051523), i, p, b[j + 1], 21, -2054922799), n = f(n, i = f(i, p = f(p, c, n, i, b[j + 8], 6, 1873313359), c, n, b[j + 15], 10, -30611744), p, c, b[j + 6], 15, -1560198380), i, p, b[j + 13], 21, 1309151649), n = f(n, i = f(i, p = f(p, c, n, i, b[j + 4], 6, -145523070), c, n, b[j + 11], 10, -1120210379), p, c, b[j + 2], 15, 718787259), i, p, b[j + 9], 21, -343485551);
        p = $(p, e);
        c = $(c, d);
        n = $(n, next);
        i = $(i, t);
      }
      return [p, c, n, i];
    }
    /**
     * @param {!Object} input
     * @return {?}
     */
    function s(input) {
      var i;
      /** @type {string} */
      var b = "";
      /** @type {number} */
      var inputsSize = 32 * input.length;
      /** @type {number} */
      i = 0;
      for (; i < inputsSize; i = i + 8) {
        /** @type {string} */
        b = b + String.fromCharCode(input[i >> 5] >>> i % 32 & 255);
      }
      return b;
    }
    /**
     * @param {string} s
     * @return {?}
     */
    function replace(s) {
      var i;
      /** @type {!Array} */
      var array = [];
      array[(s.length >> 2) - 1] = void 0;
      /** @type {number} */
      i = 0;
      for (; i < array.length; i = i + 1) {
        /** @type {number} */
        array[i] = 0;
      }
      /** @type {number} */
      var cell_amount = 8 * s.length;
      /** @type {number} */
      i = 0;
      for (; i < cell_amount; i = i + 8) {
        array[i >> 5] |= (255 & s.charCodeAt(i / 8)) << i % 32;
      }
      return array;
    }
    /**
     * @param {string} c
     * @return {?}
     */
    function d(c) {
      return s(i(replace(c), 8 * c.length));
    }
    /**
     * @param {string} n
     * @param {string} message
     * @return {?}
     */
    function callback(n, message) {
      var index;
      var e;
      var str = replace(n);
      /** @type {!Array} */
      var args = [];
      /** @type {!Array} */
      var attribs = [];
      args[15] = attribs[15] = void 0;
      if (str.length > 16) {
        str = i(str, 8 * n.length);
      }
      /** @type {number} */
      index = 0;
      for (; index < 16; index = index + 1) {
        /** @type {number} */
        args[index] = 909522486 ^ str[index];
        /** @type {number} */
        attribs[index] = 1549556828 ^ str[index];
      }
      return e = i(args.concat(replace(message)), 512 + 8 * message.length), s(i(attribs.concat(e), 640));
    }
    /**
     * @param {string} s
     * @return {?}
     */
    function expect(s) {
      var a;
      var i;
      /** @type {string} */
      var chain = "";
      /** @type {number} */
      i = 0;
      for (; i < s.length; i = i + 1) {
        a = s.charCodeAt(i);
        /** @type {string} */
        chain = chain + ("0123456789abcdef".charAt(a >>> 4 & 15) + "0123456789abcdef".charAt(15 & a));
      }
      return chain;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function concat(value) {
      return unescape(encodeURIComponent(value));
    }
    /**
     * @param {?} name
     * @return {?}
     */
    function applyDecorator(name) {
      return d(concat(name));
    }
    /**
     * @param {?} decorator
     * @return {?}
     */
    function maybeListenFirebaseRef(decorator) {
      return expect(applyDecorator(decorator));
    }
    /**
     * @param {?} left
     * @param {?} key
     * @return {?}
     */
    function build(left, key) {
      return callback(concat(left), concat(key));
    }
    /**
     * @param {?} args
     * @param {?} name
     * @return {?}
     */
    function cb(args, name) {
      return expect(build(args, name));
    }
    /**
     * @param {?} decorator
     * @param {?} args
     * @param {?} name
     * @return {?}
     */
    function apply(decorator, args, name) {
      return args ? name ? build(args, decorator) : cb(args, decorator) : name ? applyDecorator(decorator) : maybeListenFirebaseRef(decorator);
    }
    if ("function" == typeof define && define.amd) {
      define(function() {
        return apply;
      });
    } else {
      if ("object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports) {
        /** @type {function(?, ?, ?): ?} */
        module.exports = apply;
      } else {
        /** @type {function(?, ?, ?): ?} */
        options.md5 = apply;
      }
    }
  }(data);
  Lampa.Keypad.listener.destroy();
  Lampa.Keypad.listener.follow("keydown", function(event) {
    var arg = event.code;
    if (Lampa.Player.opened() && !$("body.selectbox--open").length) {
      var start = Lampa.PlayerPlaylist.get();
      if (!clear(start)) {
        return;
      }
      /** @type {boolean} */
      var instance = false;
      var i = cowSet("curCh") || Lampa.PlayerPlaylist.position() + 1;
      if (arg === 428 || arg === 34 || (arg === 37 || arg === 4) && !$(".player.tv .panel--visible .focus").length) {
        i = i === 1 ? start.length : i - 1;
        cowSet("curCh", i, 1000);
        instance = init(i, true);
      } else {
        if (arg === 427 || arg === 33 || (arg === 39 || arg === 5) && !$(".player.tv .panel--visible .focus").length) {
          i = i === start.length ? 1 : i + 1;
          cowSet("curCh", i, 1000);
          instance = init(i, true);
        } else {
          if (arg >= 48 && arg <= 57) {
            instance = init(arg - 48);
          } else {
            if (arg >= 96 && arg <= 105) {
              instance = init(arg - 96);
            }
          }
        }
      }
      if (instance) {
        event.event.preventDefault();
        event.event.stopPropagation();
      }
    }
  });
  Lampa.Template.add(event.component + "_style", "<style>." + event.component + ".category-full .card__icons {top:0.3em;right:0.3em;justify-content:right;}</style>");
  $("body").append(Lampa.Template.get(event.component + "_style", {}, true));
  Lampa.SettingsApi.addParam({
    component : "my_iptv",
    param : {
      name : "TVmenu",
      type : "select",
      values : {
        RU_1 : "\u0420\u043e\u0441\u0441\u0438\u044f_RU",
        RU_1_MTS : "\u0420\u043e\u0441\u0441\u0438\u044f_RU_MpegTS",
        RU_KFC : "\u0420\u043e\u0441\u0441\u0438\u044f_KFC",
        RU_KFC_MTS : "\u0420\u043e\u0441\u0441\u0438\u044f_KFC_MpegTS",
        RU_BN : "\u0420\u043e\u0441\u0441\u0438\u044f_BN",
        RU_BN_MTS : "\u0420\u043e\u0441\u0441\u0438\u044f_BN_MpegTS",
        DE_DE : "\u0413\u0435\u0440\u043c\u0430\u043d\u0438\u044f",
        DE_DE_MTS : "\u0413\u0435\u0440\u043c\u0430\u043d\u0438\u044f_MpegTS",
        KZ_KZ : "\u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d",
        KZ_KZ_MTS : "\u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d_MpegTS",
        UA_GN : "\u0423\u043a\u0440\u0430\u0438\u043d\u0430",
        UA_GN_MTS : "\u0423\u043a\u0440\u0430\u0438\u043d\u0430_MpegTS"
      },
      default : "RU_1"
    },
    field : {
      name : "\u0418\u0441\u0442\u043e\u0447\u043d\u0438\u043a",
      description : "\u0412\u044b\u0431\u0440\u0430\u043d\u043d\u044b\u0439 \u0441\u0435\u0440\u0432\u0435\u0440 \u0442\u0440\u0430\u043d\u0441\u043b\u044f\u0446\u0438\u0438"
    },
    onChange : function onChange(xhr) {
      Lampa.Noty.show("\u041f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 Lampa \u0434\u043b\u044f \u043f\u0440\u0438\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043a!");
      Lampa.Settings.update();
    }
  });
  Lampa.SettingsApi.addParam({
    component : "my_iptv",
    param : {
      name : "HidenCategories",
      type : "trigger",
      default : false
    },
    field : {
      name : "\u0421\u043a\u0440\u044b\u0442\u044c \u0437\u0430\u0440\u0443\u0431\u0435\u0436\u043d\u044b\u0435 \u043a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438",
      description : "\u041a\u0430\u043d\u0430\u043b\u044b \u0413\u0435\u0440\u043c\u0430\u043d\u0438\u0438, \u0418\u0437\u0440\u0430\u0438\u043b\u044f \u0438 \u0442.\u043f."
    },
    onChange : function ready(fn) {
      if (Lampa.Storage.field("HidenCategories") == true) {
        setInterval(function() {
          var $post_list = $('.selectbox-item.selector > div:contains("Germany")');
          var $stickyResizeElement = $('.selectbox-item.selector > div:contains("Israel")');
          var $gbox = $('.selectbox-item.selector > div:contains("Turkey")');
          var asker = $('.selectbox-item.selector > div:contains("\u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d")');
          var gridCtl = $('.selectbox-item.selector > div:contains("Baltic")');
          if ($post_list.length > 0) {
            $post_list.parent("div").hide();
          }
          if ($stickyResizeElement.length > 0) {
            $stickyResizeElement.parent("div").hide();
          }
          if ($gbox.length > 0) {
            $gbox.parent("div").hide();
          }
          if (asker.length > 0) {
            asker.parent("div").hide();
          }
          if (gridCtl.length > 0) {
            gridCtl.parent("div").hide();
          }
        }, 1000);
      }
      if (Lampa.Storage.field("HidenCategories") == false) {
        Lampa.Noty.show("\u041f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 Lampa \u0434\u043b\u044f \u043f\u0440\u0438\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043a!");
      }
    }
  });
  Lampa.SettingsApi.addParam({
    component : "my_iptv",
    param : {
      name : "HidenErotic",
      type : "trigger",
      default : false
    },
    field : {
      name : "\u0421\u043a\u0440\u044b\u0442\u044c \u042d\u0440\u043e\u0442\u0438\u043a\u0443",
      description : "\u0421\u043a\u0440\u044b\u0432\u0430\u0435\u0442 \u043a\u0430\u043d\u0430\u043b\u044b 18+"
    },
    onChange : function ready(fn) {
      if (Lampa.Storage.field("HidenErotic") == true) {
        setInterval(function() {
          var $post_list = $('.selectbox-item.selector > div:contains("\u042d\u0440\u043e\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0435")');
          if ($post_list.length > 0) {
            $post_list.parent("div").hide();
          }
        }, 1000);
      }
      if (Lampa.Storage.field("HidenErotic") == false) {
        Lampa.Noty.show("\u041f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 Lampa \u0434\u043b\u044f \u043f\u0440\u0438\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043a!");
      }
    }
  });
  Lampa.SettingsApi.addParam({
    component : "my_iptv",
    param : {
      name : "DIESEL_UserAgent",
      type : "select",
      values : {
        STANDART : "\u0421\u0442\u0430\u043d\u0434\u0430\u0440\u0442",
        Wink : "Wink",
        CUSTOM : "\u0421\u0432\u043e\u0439"
      },
      default : "STANDART"
    },
    field : {
      name : "userAgent",
      description : "\u041d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c \u0434\u043b\u044f \u043d\u0435\u043a\u043e\u0442\u043e\u0440\u044b\u0445 \u043f\u043b\u0435\u0439\u043b\u0438\u0441\u0442\u043e\u0432, \u043d\u0435 \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442 \u043d\u0430 Android \u0438 \u043d\u0435\u043a\u043e\u0442\u043e\u0440\u044b\u0445 \u0443\u0441\u0442\u0440\u043e\u0439\u0441\u0442\u0432\u0430\u0445"
    },
    onChange : function init(navigatorType) {
      if (Lampa.Storage.field("DIESEL_UserAgent") == "CUSTOM") {
        Lampa.Input.edit({
          value : "",
          free : true,
          nosave : true
        }, function(ideaExample) {
          Lampa.Storage.set("DIESEL_CustomAgent", ideaExample);
          Lampa.Settings.update();
        });
      }
    }
  });
  Lampa.SettingsApi.addParam({
    component : "my_iptv",
    param : {
      name : "ICONS_in_row",
      type : "select",
      values : {
        ICONS_6 : "6 \u0438\u043a\u043e\u043d\u043e\u043a",
        ICONS_7 : "7 \u0438\u043a\u043e\u043d\u043e\u043a",
        ICONS_8 : "8 \u0438\u043a\u043e\u043d\u043e\u043a"
      },
      default : "ICONS_7"
    },
    field : {
      name : "\u0417\u043d\u0430\u0447\u043a\u0438 \u043a\u0430\u043d\u0430\u043b\u043e\u0432",
      description : "\u0421\u043a\u043e\u043b\u044c\u043a\u043e \u0437\u043d\u0430\u0447\u043a\u043e\u0432 \u0432 \u043e\u0434\u043d\u043e\u0439 \u0441\u0442\u0440\u043e\u043a\u0435"
    },
    onChange : function onChange(xhr) {
      Lampa.Noty.show("\u041f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 Lampa \u0434\u043b\u044f \u043f\u0440\u0438\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043a!");
      Lampa.Settings.update();
    }
  });
  Lampa.SettingsApi.addParam({
    component : "my_iptv",
    param : {
      name : "FRAME_AROUND_pic",
      type : "select",
      values : {
        COLOUR_yellow : "\u0416\u0451\u043b\u0442\u044b\u0439",
        COLOUR_blue : "\u0421\u0438\u043d\u0438\u0439",
        COLOUR_white : "\u0411\u0435\u043b\u044b\u0439",
        COLOUR_green : "\u0417\u0435\u043b\u0451\u043d\u044b\u0439"
      },
      default : "COLOUR_yellow"
    },
    field : {
      name : "\u0426\u0432\u0435\u0442 \u0440\u0430\u043c\u043a\u0438 \u0432\u044b\u0431\u0440\u0430\u043d\u043d\u043e\u0433\u043e \u043a\u0430\u043d\u0430\u043b\u0430",
      description : "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0446\u0432\u0435\u0442 \u0432\u044b\u0434\u0435\u043b\u0435\u043d\u0438\u044f"
    },
    onChange : function onChange(xhr) {
      Lampa.Noty.show("\u041f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 Lampa \u0434\u043b\u044f \u043f\u0440\u0438\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043a!");
      Lampa.Settings.update();
    }
  });
  Lampa.SettingsApi.addParam({
    component : "my_iptv",
    param : {
      name : "PICon",
      type : "select",
      values : {
        QUAD : "\u041a\u0432\u0430\u0434\u0440\u0430\u0442\u043d\u044b\u0439",
        CLASSIC : "\u041f\u0440\u044f\u043c\u043e\u0443\u0433\u043e\u043b\u044c\u043d\u044b\u0439"
      },
      default : "CLASSIC"
    },
    field : {
      name : "\u0412\u0438\u0434 \u0438\u043a\u043e\u043d\u043a\u0438 \u043a\u0430\u043d\u0430\u043b\u0430",
      description : "\u0424\u043e\u0440\u043c\u0430 \u0438\u043a\u043e\u043d\u043a\u0438"
    },
    onChange : function save(fromHtml) {
      Lampa.Storage.set("custom_icons", "14.2");
      Lampa.Noty.show("\u041f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 Lampa \u0434\u043b\u044f \u043f\u0440\u0438\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043a!");
      Lampa.Settings.update();
    }
  });
  Lampa.SettingsApi.addParam({
    component : "my_iptv",
    param : {
      name : "PLAYLIST_copy",
      type : "static",
      default : ""
    },
    field : {
      name : "\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u043f\u043b\u0435\u0439\u043b\u0438\u0441\u0442",
      description : "\u041d\u0430\u0436\u043c\u0438\u0442\u0435 \u0434\u043b\u044f \u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f \u0441\u0441\u044b\u043b\u043a\u0438"
    },
    onRender : function initialize(obj) {
      obj.show();
      obj.on("hover:enter", function() {
        Lampa.Utils.copyTextToClipboard(httpStreamPort, function() {
          Lampa.Noty.show("OK");
        }, function() {
          Lampa.Noty.show("Not OK");
        });
        Lampa.Noty.show("\u0423\u0441\u043f\u0435\u0448\u043d\u043e \u0441\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d");
      });
    }
  });
  Lampa.SettingsApi.addParam({
    component : "my_iptv",
    param : {
      name : "DIESEL_debug",
      type : "trigger",
      default : false
    },
    field : {
      name : "\u0420\u0435\u0436\u0438\u043c \u043e\u0442\u043b\u0430\u0434\u043a\u0438",
      description : "\u0414\u0438\u0430\u0433\u043d\u043e\u0441\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0440\u0435\u0436\u0438\u043c \u0440\u0430\u0431\u043e\u0442\u044b \u043f\u043b\u0430\u0433\u0438\u043d\u0430"
    },
    onChange : function onChange(xhr) {
      Lampa.Noty.show("\u041f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 Lampa \u0434\u043b\u044f \u043f\u0440\u0438\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043a!");
      Lampa.Settings.update();
    }
  });
  Lampa.SettingsApi.addParam({
    component : "my_iptv",
    param : {
      name : "DIESEL_GEO_BLOCK",
      type : "trigger",
      default : false
    },
    field : {
      name : "\u041e\u0431\u0445\u043e\u0434 \u0433\u0435\u043e\u0431\u043b\u043e\u043a\u0430 \u043f\u0440\u043e\u0432\u0430\u0439\u0434\u0435\u0440\u0430",
      description : ""
    },
    onChange : function onChange(xhr) {
      Lampa.Noty.show("\u041f\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 Lampa \u0434\u043b\u044f \u043f\u0440\u0438\u043c\u0435\u043d\u0435\u043d\u0438\u044f \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043a!");
      Lampa.Settings.update();
    }
  });
  if (Lampa.Storage.field("TVmenu") == "RU_1") {
    Lampa.Storage.set("diesel_source", "playlist.RU_1.m3u8");
  }
  if (Lampa.Storage.field("TVmenu") == "RU_1_MTS") {
    Lampa.Storage.set("diesel_source", "playlist.RU_1_MTS.m3u8");
  }
  if (Lampa.Storage.field("TVmenu") == "RU_KFC") {
    Lampa.Storage.set("diesel_source", "playlist.RU_KFC.m3u8");
  }
  if (Lampa.Storage.field("TVmenu") == "RU_KFC_MTS") {
    Lampa.Storage.set("diesel_source", "playlist.RU_KFC_MTS.m3u8");
  }
  if (Lampa.Storage.field("TVmenu") == "RU_BN") {
    Lampa.Storage.set("diesel_source", "playlist.RU_BN.m3u8");
  }
  if (Lampa.Storage.field("TVmenu") == "RU_BN_MTS") {
    Lampa.Storage.set("diesel_source", "playlist.RU_BN_MTS.m3u8");
  }
  if (Lampa.Storage.field("TVmenu") == "DE_DE") {
    Lampa.Storage.set("diesel_source", "playlist.DE_DE.m3u8");
  }
  if (Lampa.Storage.field("TVmenu") == "DE_DE_MTS") {
    Lampa.Storage.set("diesel_source", "playlist.DE_DE_MTS.m3u8");
  }
  if (Lampa.Storage.field("TVmenu") == "KZ_KZ") {
    Lampa.Storage.set("diesel_source", "playlist.KZ_KZ.m3u8");
  }
  if (Lampa.Storage.field("TVmenu") == "KZ_KZ_MTS") {
    Lampa.Storage.set("diesel_source", "playlist.KZ_KZ_MTS.m3u8");
  }
  if (Lampa.Storage.field("TVmenu") == "UA_GN") {
    Lampa.Storage.set("diesel_source", "playlist.UA_GN.m3u8");
  }
  if (Lampa.Storage.field("TVmenu") == "UA_GN_MTS") {
    Lampa.Storage.set("diesel_source", "playlist.UA_GN_MTS.m3u8");
  }
  if (Lampa.Storage.field("HidenCategories") == true) {
    setInterval(function() {
      var $post_list = $('.selectbox-item.selector > div:contains("Germany")');
      var $stickyResizeElement = $('.selectbox-item.selector > div:contains("Israel")');
      var $gbox = $('.selectbox-item.selector > div:contains("Turkey")');
      var asker = $('.selectbox-item.selector > div:contains("\u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d")');
      var gridCtl = $('.selectbox-item.selector > div:contains("Baltic")');
      if ($post_list.length > 0) {
        $post_list.parent("div").hide();
      }
      if ($stickyResizeElement.length > 0) {
        $stickyResizeElement.parent("div").hide();
      }
      if ($gbox.length > 0) {
        $gbox.parent("div").hide();
      }
      if (asker.length > 0) {
        asker.parent("div").hide();
      }
      if (gridCtl.length > 0) {
        gridCtl.parent("div").hide();
      }
    }, 1000);
  }
  if (Lampa.Storage.field("HidenErotic") == true) {
    setInterval(function() {
      var $post_list = $('.selectbox-item.selector > div:contains("\u042d\u0440\u043e\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0435")');
      if ($post_list.length > 0) {
        $post_list.parent("div").hide();
      }
    }, 1000);
  }
  if (Lampa.Storage.field("ICONS_in_row") == "ICONS_6") {
    Lampa.Storage.set("custom_icons", "16.6");
  }
  if (Lampa.Storage.field("ICONS_in_row") == "ICONS_7") {
    Lampa.Storage.set("custom_icons", "14.2");
  }
  if (Lampa.Storage.field("ICONS_in_row") == "ICONS_8") {
    Lampa.Storage.set("custom_icons", "12.5");
  }
  if (Lampa.Storage.field("FRAME_AROUND_pic") == "COLOUR_yellow") {
    Lampa.Storage.set("custom_colour", "yellow");
  }
  if (Lampa.Storage.field("FRAME_AROUND_pic") == "COLOUR_blue") {
    Lampa.Storage.set("custom_colour", "blue");
  }
  if (Lampa.Storage.field("FRAME_AROUND_pic") == "COLOUR_white") {
    Lampa.Storage.set("custom_colour", "white");
  }
  if (Lampa.Storage.field("PICon") == "QUAD") {
    Lampa.Storage.set("custom_shape", "100");
  }
  if (Lampa.Storage.field("PICon") == "CLASSIC") {
    Lampa.Storage.set("custom_shape", "60");
  }
  var custom_icons = Lampa.Storage.field("custom_icons");
  var custom_colour = Lampa.Storage.field("custom_colour");
  var custom_shape = Lampa.Storage.field("custom_shape");
  _ddoc = Lampa.Storage.field("account_email").toLowerCase();
  var picKey = Lampa.Storage.field("diesel_source");
  /** @type {string} */
  var httpStreamPort = "http://lampatv.site/users/" + _ddoc + "/" + picKey;
  if (Lampa.Storage.field("DIESEL_GEO_BLOCK") == true) {
    /** @type {string} */
    httpStreamPort = "http://lampatv.site/users/" + _ddoc + "/" + picKey;
  }
  Lampa.Template.add("tv_style", "<style>#app > div.wrap.layer--height.layer--width > div.wrap__content.layer--height.layer--width > div > div > div.activity.layer--width.activity--active > div.activity__body > div > div.scroll.scroll--mask.scroll--over.layer--wheight > div > div > div > div.card.selector.card--collection.card--loaded.focus > div.card__view > img{box-shadow: 0 0 0 0.5em #" + custom_colour + "!important;}</style>");
  $("body").append(Lampa.Template.get("tv_style", {}, true));
  Lampa.Template.add("shape_style", "<style>#app > div.wrap.layer--height.layer--width > div.wrap__content.layer--height.layer--width > div > div > div > div.activity__body > div > div.scroll.scroll--mask.scroll--over.layer--wheight > div > div > div > div > div.card__view{padding-bottom: " + custom_shape + "%!important;}</style>");
  $("body").append(Lampa.Template.get("shape_style", {}, true));
  if (!Lampa.Lang) {
    var source = {};
    Lampa.Lang = {
      add : function includeDep(name) {
        /** @type {string} */
        source = name;
      },
      translate : function show_add_field(key) {
        return source[key] ? source[key].ru : key;
      }
    };
  }
  var r = {};
  reply("default_playlist", {
    ru : "" + httpStreamPort + "",
    uk : "https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8",
    be : "https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8",
    en : "https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8",
    zh : "https://raw.iqiq.io/Free-TV/IPTV/master/playlist.m3u8"
  });
  reply("default_playlist_cat", {
    ru : "Russia",
    uk : "Ukraine",
    be : "Belarus",
    en : "VOD Movies (EN)",
    zh : "China"
  });
  reply("settings_playlist_num_group", {
    ru : "\u041f\u043b\u0435\u0439\u043b\u0438\u0441\u0442 ",
    uk : "\u041f\u043b\u0435\u0439\u043b\u0438\u0441\u0442 ",
    be : "\u041f\u043b\u044d\u0439\u043b\u0456\u0441\u0442 ",
    en : "Playlist ",
    zh : "\u64ad\u653e\u5217\u8868 "
  });
  reply("settings_list_name", {
    ru : "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",
    uk : "\u041d\u0430\u0437\u0432\u0430",
    be : "\u041d\u0430\u0437\u0432\u0430",
    en : "Name",
    zh : "\u540d\u79f0"
  });
  reply("settings_list_name_desc", {
    ru : "\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043f\u043b\u0435\u0439\u043b\u0438\u0441\u0442\u0430 \u0432 \u0413\u043b\u0430\u0432\u043d\u043e\u043c (\u043b\u0435\u0432\u043e\u043c) \u043c\u0435\u043d\u044e",
    uk : "\u041d\u0430\u0437\u0432\u0430 \u043f\u043b\u0435\u0439\u043b\u0438\u0441\u0442\u0430 \u0443 \u043b\u0456\u0432\u043e\u043c\u0443 \u043c\u0435\u043d\u044e",
    be : "\u041d\u0430\u0437\u0432\u0430 \u043f\u043b\u044d\u0439\u043b\u0456\u0441\u0442\u0430 \u045e \u043b\u0435\u0432\u044b\u043c \u043c\u0435\u043d\u044e",
    en : "Playlist name in the left menu",
    zh : "\u5de6\u4fa7\u83dc\u5355\u4e2d\u7684\u64ad\u653e\u5217\u8868\u540d\u79f0"
  });
  reply("settings_list_url", {
    ru : "URL-\u0430\u0434\u0440\u0435\u0441",
    uk : "URL-\u0430\u0434\u0440\u0435\u0441\u0430",
    be : "URL-\u0430\u0434\u0440\u0430\u0441",
    en : "URL",
    zh : "\u7f51\u5740"
  });
  reply("settings_list_url_desc0", {
    ru : "\u041f\u043e \u0443\u043c\u043e\u043b\u0447\u0430\u043d\u0438\u044e \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442\u0441\u044f \u043f\u043b\u0435\u0439\u043b\u0438\u0441\u0442 \u0438\u0437 \u043f\u0440\u043e\u0435\u043a\u0442\u0430 <i>\u0414\u0438\u0437\u0435\u043b\u044c \u0422\u0412</i><br>\u0412\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0437\u0430\u043c\u0435\u043d\u0438\u0442\u044c \u0435\u0433\u043e \u043d\u0430 \u0441\u0432\u043e\u0439.",
    uk : "\u0417\u0430 \u0437\u0430\u043c\u043e\u0432\u0447\u0443\u0432\u0430\u043d\u043d\u044f\u043c \u0432\u0438\u043a\u043e\u0440\u0438\u0441\u0442\u043e\u0432\u0443\u0454\u0442\u044c\u0441\u044f \u043f\u043b\u0435\u0439\u043b\u0438\u0441\u0442 \u0456\u0437 \u043f\u0440\u043e\u0435\u043a\u0442\u0443 <i>https://github.com/Free-TV/IPTV</i><br>\u0412\u0438 \u043c\u043e\u0436\u0435\u0442\u0435 \u0437\u0430\u043c\u0456\u043d\u0438\u0442\u0438 \u0439\u043e\u0433\u043e \u043d\u0430 \u0441\u0432\u0456\u0439.",
    be : "\u041f\u0430 \u0437\u043c\u0430\u045e\u0447\u0430\u043d\u043d\u0456 \u0432\u044b\u043a\u0430\u0440\u044b\u0441\u0442\u043e\u045e\u0432\u0430\u0435\u0446\u0446\u0430 \u043f\u043b\u044d\u0439\u043b\u0456\u0441\u0442 \u0437 \u043f\u0440\u0430\u0435\u043a\u0442\u0430 <i>https://github.com/Free-TV/IPTV</i><br> \u0412\u044b \u043c\u043e\u0436\u0430\u0446\u0435 \u0437\u0430\u043c\u044f\u043d\u0456\u0446\u044c \u044f\u0433\u043e \u043d\u0430 \u0441\u0432\u043e\u0439.",
    en : "The default playlist is from the project <i>https://github.com/Free-TV/IPTV</i><br>You can replace it with your own.",
    zh : "\u9ed8\u8ba4\u64ad\u653e\u5217\u8868\u6765\u81ea\u9879\u76ee <i>https://github.com/Free-TV/IPTV</i><br>\u60a8\u53ef\u4ee5\u5c06\u5176\u66ff\u6362\u4e3a\u60a8\u81ea\u5df1\u7684\u3002"
  });
  reply("settings_list_url_desc1", {
    ru : "\u0412\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0434\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0435\u0449\u0435 \u043e\u0434\u0438\u043d \u043f\u043b\u0435\u0439\u043b\u0438\u0441\u0442 \u0437\u0434\u0435\u0441\u044c. \u0421\u0441\u044b\u043b\u043a\u0438 \u043d\u0430 \u043f\u043b\u0435\u0439\u043b\u0438\u0441\u0442\u044b \u043e\u0431\u044b\u0447\u043d\u043e \u0437\u0430\u043a\u0430\u043d\u0447\u0438\u0432\u0430\u044e\u0442\u0441\u044f \u043d\u0430 <i>.m3u</i> \u0438\u043b\u0438 <i>.m3u8</i>",
    uk : "\u0412\u0438 \u043c\u043e\u0436\u0435\u0442\u0435 \u0434\u043e\u0434\u0430\u0442\u0438 \u0449\u0435 \u043e\u0434\u0438\u043d \u043f\u043b\u0435\u0439\u043b\u0438\u0441\u0442 \u0441\u0443\u0434\u0443. \u041f\u043e\u0441\u0438\u043b\u0430\u043d\u043d\u044f \u043d\u0430 \u043f\u043b\u0435\u0439\u043b\u0438\u0441\u0442\u0438 \u0437\u0430\u0437\u0432\u0438\u0447\u0430\u0439 \u0437\u0430\u043a\u0456\u043d\u0447\u0443\u044e\u0442\u044c\u0441\u044f \u043d\u0430 <i>.m3u</i> \u0430\u0431\u043e <i>.m3u8</i>",
    be : "\u0412\u044b \u043c\u043e\u0436\u0430\u0446\u0435 \u0434\u0430\u0434\u0430\u0446\u044c \u044f\u0448\u0447\u044d \u0430\u0434\u0437\u0456\u043d \u043f\u043b\u044d\u0439\u043b\u0456\u0441\u0442 \u0441\u0443\u0434\u0430. \u0421\u043f\u0430\u0441\u044b\u043b\u043a\u0456 \u043d\u0430 \u043f\u043b\u044d\u0439\u043b\u0456\u0441\u0442\u044b \u0437\u0432\u044b\u0447\u0430\u0439\u043d\u0430 \u0437\u0430\u043a\u0430\u043d\u0447\u0432\u0430\u044e\u0446\u0446\u0430 \u043d\u0430 <i>.m3u</i> \u0430\u0431\u043e <i>.m3u8</i>",
    en : "You can add another trial playlist. Playlist links usually end with <i>.m3u</i> or <i>.m3u8</i>",
    zh : "\u60a8\u53ef\u4ee5\u6dfb\u52a0\u53e6\u4e00\u4e2a\u64ad\u653e\u5217\u8868\u3002 \u64ad\u653e\u5217\u8868\u94fe\u63a5\u901a\u5e38\u4ee5 <i>.m3u</i> \u6216 <i>.m3u8</i> \u7ed3\u5c3e"
  });
  reply("categories", {
    ru : "\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0438\u0438",
    uk : "\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0456\u044f",
    be : "\u041a\u0430\u0442\u044d\u0433\u043e\u0440\u044b\u044f",
    en : "Categories",
    zh : "\u5206\u7c7b"
  });
  reply("uid", {
    ru : "UID",
    uk : "UID",
    be : "UID",
    en : "UID",
    zh : "UID"
  });
  reply("unique_id", {
    ru : "\u0443\u043d\u0438\u043a\u0430\u043b\u044c\u043d\u044b\u0439 \u0438\u0434\u0435\u043d\u0442\u0438\u0444\u0438\u043a\u0430\u0442\u043e\u0440 (\u043d\u0443\u0436\u0435\u043d \u0434\u043b\u044f \u043d\u0435\u043a\u043e\u0442\u043e\u0440\u044b\u0445 \u0441\u0441\u044b\u043b\u043e\u043a \u043d\u0430 \u043f\u043b\u0435\u0439\u043b\u0438\u0441\u0442\u044b)",
    uk : "\u0443\u043d\u0456\u043a\u0430\u043b\u044c\u043d\u0438\u0439 \u0456\u0434\u0435\u043d\u0442\u0438\u0444\u0456\u043a\u0430\u0442\u043e\u0440 (\u043d\u0435\u043e\u0431\u0445\u0456\u0434\u043d\u0438\u0439 \u0434\u043b\u044f \u0434\u0435\u044f\u043a\u0438\u0445 \u043f\u043e\u0441\u0438\u043b\u0430\u043d\u044c \u043d\u0430 \u0441\u043f\u0438\u0441\u043a\u0438 \u0432\u0456\u0434\u0442\u0432\u043e\u0440\u0435\u043d\u043d\u044f)",
    be : "\u0443\u043d\u0456\u043a\u0430\u043b\u044c\u043d\u044b \u0456\u0434\u044d\u043d\u0442\u044b\u0444\u0456\u043a\u0430\u0442\u0430\u0440 (\u043d\u0435\u0430\u0431\u0445\u043e\u0434\u043d\u044b \u0434\u043b\u044f \u043d\u0435\u043a\u0430\u0442\u043e\u0440\u044b\u0445 \u0441\u043f\u0430\u0441\u044b\u043b\u0430\u043a \u043d\u0430 \u0441\u043f\u0456\u0441 \u043f\u0440\u0430\u0439\u0433\u0440\u0430\u0432\u0430\u043d\u043d\u044f)",
    en : "unique identifier (needed for some playlist links)",
    zh : "\u552f\u4e00 ID\uff08\u67d0\u4e9b\u64ad\u653e\u5217\u8868\u94fe\u63a5\u9700\u8981\uff09"
  });
  reply("favorites", {
    ru : "\u0418\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435",
    uk : "\u0412\u0438\u0431\u0440\u0430\u043d\u0435",
    be : "\u0412\u044b\u0431\u0440\u0430\u043d\u0430\u0435",
    en : "Favorites",
    zh : "\u6536\u85cf\u5939"
  });
  reply("favorites_add", {
    ru : "\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435",
    uk : "\u0414\u043e\u0434\u0430\u0442\u0438 \u0432 \u043e\u0431\u0440\u0430\u043d\u0435",
    be : "\u0414\u0430\u0434\u0430\u0446\u044c \u0443 \u0430\u0431\u0440\u0430\u043d\u0430\u0435",
    en : "Add to favorites",
    zh : "\u6dfb\u52a0\u5230\u6536\u85cf\u5939"
  });
  reply("favorites_del", {
    ru : "\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0438\u0437 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0433\u043e",
    uk : "\u0412\u0438\u0434\u0430\u043b\u0438\u0442\u0438 \u0437 \u0432\u0438\u0431\u0440\u0430\u043d\u043e\u0433\u043e",
    be : "\u0412\u044b\u0434\u0430\u043b\u0456\u0446\u044c \u0437 \u0430\u0431\u0440\u0430\u043d\u0430\u0433\u0430",
    en : "Remove from favorites",
    zh : "\u4ece\u6536\u85cf\u5939\u4e2d\u5220\u9664"
  });
  reply("favorites_clear", {
    ru : "\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435",
    uk : "\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u0438 \u0432\u0438\u0431\u0440\u0430\u043d\u0435",
    be : "\u0410\u0447\u044b\u0441\u0446\u0456\u0446\u044c \u0432\u044b\u0431\u0440\u0430\u043d\u0430\u0435",
    en : "Clear favorites",
    zh : "\u6e05\u9664\u6536\u85cf\u5939"
  });
  reply("favorites_move_top", {
    ru : "\u0412 \u043d\u0430\u0447\u0430\u043b\u043e \u0441\u043f\u0438\u0441\u043a\u0430",
    uk : "\u041d\u0430 \u043f\u043e\u0447\u0430\u0442\u043e\u043a \u0441\u043f\u0438\u0441\u043a\u0443",
    be : "\u0414\u0430 \u043f\u0430\u0447\u0430\u0442\u043a\u0443 \u0441\u043f\u0456\u0441\u0443",
    en : "To the top of the list",
    zh : "\u5230\u5217\u8868\u9876\u90e8"
  });
  reply("favorites_move_up", {
    ru : "\u0421\u0434\u0432\u0438\u043d\u0443\u0442\u044c \u0432\u0432\u0435\u0440\u0445",
    uk : "\u0417\u0440\u0443\u0448\u0438\u0442\u0438 \u0432\u0433\u043e\u0440\u0443",
    be : "\u0421\u0441\u0443\u043d\u0443\u0446\u044c \u0443\u0432\u0435\u0440\u0445",
    en : "Move up",
    zh : "\u4e0a\u79fb"
  });
  reply("favorites_move_down", {
    ru : "\u0421\u0434\u0432\u0438\u043d\u0443\u0442\u044c \u0432\u043d\u0438\u0437",
    uk : "\u0417\u0440\u0443\u0448\u0438\u0442\u0438 \u0432\u043d\u0438\u0437",
    be : "\u0421\u0441\u0443\u043d\u0443\u0446\u044c \u0443\u043d\u0456\u0437",
    en : "Move down",
    zh : "\u4e0b\u79fb"
  });
  reply("favorites_move_end", {
    ru : "\u0412 \u043a\u043e\u043d\u0435\u0446 \u0441\u043f\u0438\u0441\u043a\u0430",
    uk : "\u0412 \u043a\u0456\u043d\u0435\u0446\u044c \u0441\u043f\u0438\u0441\u043a\u0443",
    be : "\u0423 \u043a\u0430\u043d\u0435\u0446 \u0441\u043f\u0456\u0441\u0443",
    en : "To the end of the list",
    zh : "\u5230\u5217\u8868\u672b\u5c3e"
  });
  Lampa.Lang.add(r);
  Lampa.Component.add(event.component, create);
  Lampa.SettingsApi.addComponent(event);
  /** @type {number} */
  var x = 0;
  for (; x <= rules.length; x++) {
    x = update(x);
  }
  result = cb("uid", "");
  if (!result) {
    /** @type {string} */
    result = (Math.random() + 1).toString(36).substring(2).toUpperCase().replace(/(.{4})/g, "$1-");
    get("uid", result);
  }
  render("title", {
    title : require("uid")
  });
  render("static", {
    title : result,
    description : require("unique_id")
  });
  if (!!window.appready) {
    destroy();
  } else {
    Lampa.Listener.follow("app", function(firstTask) {
      if (firstTask.type == "ready") {
        destroy();
      }
    });
  }
  Lampa.Template.add("nomenuiptv1", '<style>div[data-name="my_iptv_list_url_0"]{opacity: 0%!important;display: none;}</style>');
  $("body").append(Lampa.Template.get("nomenuiptv1", {}, true));
  Lampa.Template.add("PlayerError", "<style>body > div.player > div.player-info.info--visible > div > div.player-info__error{opacity: 0%!important;display: none;}</style>");
  $("body").append(Lampa.Template.get("PlayerError", {}, true));
  if (Lampa.Storage.field("DIESEL_debug") == false) {
    Lampa.Template.add("nomenuiptv", '<style>div[data-name="1901885695"]{opacity: 0%!important;display: none;}</style>');
    $("body").append(Lampa.Template.get("nomenuiptv", {}, true));
  }
  if (Lampa.Storage.field("DIESEL_debug") == true) {
    console.log("DEBUG", httpStreamPort);
  }
  Lampa.Template.add("tv_short", "<style>#app > div.wrap.layer--height.layer--width > div.wrap__content.layer--height.layer--width > div > div > div > div.activity__body > div > div.info.layer--width{height: 12%!important;}</style>");
  $("body").append(Lampa.Template.get("tv_short", {}, true));
  Lampa.Template.add("tv_short1", "<style>#app > div.wrap.layer--height.layer--width > div.wrap__content.layer--height.layer--width > div > div > div > div.activity__body > div > div.info.layer--width > div.info__left > div.info__title-original{display: none!important;}</style>");
  $("body").append(Lampa.Template.get("tv_short1", {}, true));
})();
