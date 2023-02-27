/*
// https://ss-iptv.com/ru/operators/catchup
// niklabs.com/catchup-settings/
// http://example.com/iptv/00000000000000/9201/index.m3u8?utc=1666796400&lutc=1666826200
*/
;(function () {
    'use strict';
    var usermail = Lampa.Storage.field('account_email').toLowerCase();
	
	
	var plugin = {
        component: 'my_iptv',
        icon: "<svg height=\"244\" viewBox=\"0 0 260 244\" xmlns=\"http://www.w3.org/2000/svg\" style=\"fill-rule:evenodd;\" fill=\"currentColor\"><path d=\"M259.5 47.5v114c-1.709 14.556-9.375 24.723-23 30.5a2934.377 2934.377 0 0 1-107 1.5c-35.704.15-71.37-.35-107-1.5-13.625-5.777-21.291-15.944-23-30.5v-115c1.943-15.785 10.61-25.951 26-30.5a10815.71 10815.71 0 0 1 208 0c15.857 4.68 24.523 15.18 26 31.5zm-230-13a4963.403 4963.403 0 0 0 199 0c5.628 1.128 9.128 4.462 10.5 10 .667 40 .667 80 0 120-1.285 5.618-4.785 8.785-10.5 9.5-66 .667-132 .667-198 0-5.715-.715-9.215-3.882-10.5-9.5-.667-40-.667-80 0-120 1.35-5.18 4.517-8.514 9.5-10z\"/><path d=\"M70.5 71.5c17.07-.457 34.07.043 51 1.5 5.44 5.442 5.107 10.442-1 15-5.991.5-11.991.666-18 .5.167 14.337 0 28.671-.5 43-3.013 5.035-7.18 6.202-12.5 3.5a11.529 11.529 0 0 1-3.5-4.5 882.407 882.407 0 0 1-.5-42c-5.676.166-11.343 0-17-.5-4.569-2.541-6.069-6.375-4.5-11.5 1.805-2.326 3.972-3.992 6.5-5zM137.5 73.5c4.409-.882 7.909.452 10.5 4a321.009 321.009 0 0 0 16 30 322.123 322.123 0 0 0 16-30c2.602-3.712 6.102-4.879 10.5-3.5 5.148 3.334 6.314 7.834 3.5 13.5a1306.032 1306.032 0 0 0-22 43c-5.381 6.652-10.715 6.652-16 0a1424.647 1424.647 0 0 0-23-45c-1.691-5.369-.191-9.369 4.5-12zM57.5 207.5h144c7.788 2.242 10.288 7.242 7.5 15a11.532 11.532 0 0 1-4.5 3.5c-50 .667-100 .667-150 0-6.163-3.463-7.496-8.297-4-14.5 2.025-2.064 4.358-3.398 7-4z\"/></svg>",
        name: 'Дизель ТВ'
    };
    var lists = [];
    var curListId = -1;
    var defaultGroup = 'Other';
    var catalog = {};
    var UID = '';

    var chNumber = '';
    var chTimeout = null;
    var stopRemoveChElement = false;
    var chPanel = $(
        "<div class=\"player-info info--visible js-ch-" + plugin.component + "\" style=\"top: 9em;right: auto;z-index: 1000;\">\n" +
        "    <div class=\"player-info__body\">\n" +
        "        <div class=\"player-info__line\">\n" +
        "            <div class=\"player-info__name\">&nbsp;</div>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "</div>"
    ).hide().fadeOut(0);
    var chHelper = $(
        "<div class=\"player-info info--visible js-ch-" + plugin.component + "\" style=\"top: 14em;right: auto;z-index: 1000;\">\n" +
        "    <div class=\"player-info__body\">\n" +
        "        <div class=\"tv-helper\"></div>\n" +
        "    </div>\n" +
        "</div>"
    ).hide().fadeOut(0);
    var chHelpEl = chHelper.find('.tv-helper');
    var chNumEl = chPanel.find('.player-info__name');
    var encoder = $('<div/>');

    function isPluginPlaylist(playlist) {
        return !(!playlist.length || !playlist[0].tv
            || !playlist[0].plugin || playlist[0].plugin !== plugin.component);
    }

    function channelSwitch(dig, isChNum) {
        if (!Lampa.Player.opened()) return false;
        var playlist = Lampa.PlayerPlaylist.get();
        if (!isPluginPlaylist(playlist)) return false;
        if (!$('body>.js-ch-' + plugin.component).length) $('body').append(chPanel).append(chHelper);
        var cnt = playlist.length;
        var prevChNumber = chNumber;
        chNumber += dig;
        var number = parseInt(chNumber);
        if (number && number <= cnt) {
            if (!!chTimeout) clearTimeout(chTimeout);
            stopRemoveChElement = true; // fix removing element in callback on animate.finish()
            chNumEl.text(playlist[number - 1].title);
            if (isChNum || parseInt(chNumber + '0') > cnt) {
                chHelper.finish().hide().fadeOut(0);
            } else {
                var help = [];
                var chHelpMax = 9;
                var start = parseInt(chNumber + '0');
                for (var i = start; i <= cnt && i <= (start + Math.min(chHelpMax, 9)); i++) {
                    help.push(encoder.text(playlist[i - 1].title).html());
                }
                chHelpEl.html(help.join('<br>'));
                chHelper.finish().show().fadeIn(0);
            }
            if (number < 10 || isChNum) {
                chPanel.finish().show().fadeIn(0);
            }
            stopRemoveChElement = false;
            var chSwitch = function () {
                var pos = number - 1;
                if (Lampa.PlayerPlaylist.position() !== pos) {
                    Lampa.PlayerPlaylist.listener.send('select', {
                        playlist,
                        position: pos,
                        item: playlist[pos]
                    });
                }
                chPanel.delay(1000).fadeOut(500,function(){stopRemoveChElement || chPanel.remove()});
                chHelper.delay(1000).fadeOut(500,function(){stopRemoveChElement || chHelper.remove()});
                chNumber = "";
            }
            if (isChNum === true) {
                chTimeout = setTimeout(chSwitch, 1000);
                chNumber = "";
            } else if (parseInt(chNumber + '0') > cnt) {
                // Ещё одна цифра невозможна - переключаем
                chSwitch();
            } else {
                // Ждём следующую цифру или переключаем
                chTimeout = setTimeout(chSwitch, 3000);
            }
        } else {
            chNumber = prevChNumber;
        }
        return true;
    }

    var cacheVal = {};

    function cache(name, value, timeout) {
        var time = (new Date()) * 1;
        if (!!timeout && timeout > 0) {
            cacheVal[name] = [(time + timeout), value];
            return;
        }
        if (!!cacheVal[name] && cacheVal[name][0] > time) {
            return cacheVal[name][1];
        }
        delete (cacheVal[name]);
        return value;
    }

    function unixtime() {
        return Math.floor(new Date().getTime()/1000);
    }

    var utils = {
        uid: function() {return UID},
        timestamp: unixtime,
        token: function() {return generateSigForString(Lampa.Storage.field('account_email').toLowerCase())}
    };

    //utils.md5()
    !function(n){"use strict";function t(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function r(n,t){return n<<t|n>>>32-t}function e(n,e,o,u,c,f){return t(r(t(t(e,n),t(u,f)),c),o)}function o(n,t,r,o,u,c,f){return e(t&r|~t&o,n,t,u,c,f)}function u(n,t,r,o,u,c,f){return e(t&o|r&~o,n,t,u,c,f)}function c(n,t,r,o,u,c,f){return e(t^r^o,n,t,u,c,f)}function f(n,t,r,o,u,c,f){return e(r^(t|~o),n,t,u,c,f)}function i(n,r){n[r>>5]|=128<<r%32,n[14+(r+64>>>9<<4)]=r;var e,i,a,d,h,l=1732584193,g=-271733879,v=-1732584194,m=271733878;for(e=0;e<n.length;e+=16)i=l,a=g,d=v,h=m,g=f(g=f(g=f(g=f(g=c(g=c(g=c(g=c(g=u(g=u(g=u(g=u(g=o(g=o(g=o(g=o(g,v=o(v,m=o(m,l=o(l,g,v,m,n[e],7,-680876936),g,v,n[e+1],12,-389564586),l,g,n[e+2],17,606105819),m,l,n[e+3],22,-1044525330),v=o(v,m=o(m,l=o(l,g,v,m,n[e+4],7,-176418897),g,v,n[e+5],12,1200080426),l,g,n[e+6],17,-1473231341),m,l,n[e+7],22,-45705983),v=o(v,m=o(m,l=o(l,g,v,m,n[e+8],7,1770035416),g,v,n[e+9],12,-1958414417),l,g,n[e+10],17,-42063),m,l,n[e+11],22,-1990404162),v=o(v,m=o(m,l=o(l,g,v,m,n[e+12],7,1804603682),g,v,n[e+13],12,-40341101),l,g,n[e+14],17,-1502002290),m,l,n[e+15],22,1236535329),v=u(v,m=u(m,l=u(l,g,v,m,n[e+1],5,-165796510),g,v,n[e+6],9,-1069501632),l,g,n[e+11],14,643717713),m,l,n[e],20,-373897302),v=u(v,m=u(m,l=u(l,g,v,m,n[e+5],5,-701558691),g,v,n[e+10],9,38016083),l,g,n[e+15],14,-660478335),m,l,n[e+4],20,-405537848),v=u(v,m=u(m,l=u(l,g,v,m,n[e+9],5,568446438),g,v,n[e+14],9,-1019803690),l,g,n[e+3],14,-187363961),m,l,n[e+8],20,1163531501),v=u(v,m=u(m,l=u(l,g,v,m,n[e+13],5,-1444681467),g,v,n[e+2],9,-51403784),l,g,n[e+7],14,1735328473),m,l,n[e+12],20,-1926607734),v=c(v,m=c(m,l=c(l,g,v,m,n[e+5],4,-378558),g,v,n[e+8],11,-2022574463),l,g,n[e+11],16,1839030562),m,l,n[e+14],23,-35309556),v=c(v,m=c(m,l=c(l,g,v,m,n[e+1],4,-1530992060),g,v,n[e+4],11,1272893353),l,g,n[e+7],16,-155497632),m,l,n[e+10],23,-1094730640),v=c(v,m=c(m,l=c(l,g,v,m,n[e+13],4,681279174),g,v,n[e],11,-358537222),l,g,n[e+3],16,-722521979),m,l,n[e+6],23,76029189),v=c(v,m=c(m,l=c(l,g,v,m,n[e+9],4,-640364487),g,v,n[e+12],11,-421815835),l,g,n[e+15],16,530742520),m,l,n[e+2],23,-995338651),v=f(v,m=f(m,l=f(l,g,v,m,n[e],6,-198630844),g,v,n[e+7],10,1126891415),l,g,n[e+14],15,-1416354905),m,l,n[e+5],21,-57434055),v=f(v,m=f(m,l=f(l,g,v,m,n[e+12],6,1700485571),g,v,n[e+3],10,-1894986606),l,g,n[e+10],15,-1051523),m,l,n[e+1],21,-2054922799),v=f(v,m=f(m,l=f(l,g,v,m,n[e+8],6,1873313359),g,v,n[e+15],10,-30611744),l,g,n[e+6],15,-1560198380),m,l,n[e+13],21,1309151649),v=f(v,m=f(m,l=f(l,g,v,m,n[e+4],6,-145523070),g,v,n[e+11],10,-1120210379),l,g,n[e+2],15,718787259),m,l,n[e+9],21,-343485551),l=t(l,i),g=t(g,a),v=t(v,d),m=t(m,h);return[l,g,v,m]}function a(n){var t,r="",e=32*n.length;for(t=0;t<e;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);return r}function d(n){var t,r=[];for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;var e=8*n.length;for(t=0;t<e;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;return r}function h(n){return a(i(d(n),8*n.length))}function l(n,t){var r,e,o=d(n),u=[],c=[];for(u[15]=c[15]=void 0,o.length>16&&(o=i(o,8*n.length)),r=0;r<16;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(d(t)),512+8*t.length),a(i(c.concat(e),640))}function g(n){var t,r,e="";for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+="0123456789abcdef".charAt(t>>>4&15)+"0123456789abcdef".charAt(15&t);return e}function v(n){return unescape(encodeURIComponent(n))}function m(n){return h(v(n))}function p(n){return g(m(n))}function s(n,t){return l(v(n),v(t))}function C(n,t){return g(s(n,t))}function A(n,t,r){return t?r?s(t,n):C(t,n):r?m(n):p(n)}"function"==typeof define&&define.amd?define(function(){return A}):"object"==typeof module&&module.exports?module.exports=A:n.md5=A}(utils);

    function generateSigForString(string) {
        var sigTime = unixtime();
        return sigTime + ':' + utils.md5((string || '') + sigTime + utils.uid());
    }

    function prepareUrl(url) {
        var m = [], val = '';
        while (!!(m = url.match(/\$\{(\(([a-zA-Z\d]+)\))?([^${}]+)}/))) {
            if (!!m[2] && typeof utils[m[2]] === "function") {
                val = encodeURIComponent(utils[m[2]](m[3]));
            } else if (m[3] in utils) {
                val = encodeURIComponent(typeof utils[m[3]] === "function" ? utils[m[3]]() : utils[m[3]]);
            } else {
                val = m[1];
            }
            url = url.replace(m[0], val);
        }
        return url;
    }


    /* ***********************************
     * Управление плеером клавишами пульта
     * ***********************************
     * Поддержка переключения каналов (возможно не все устройства):
     * - цифровыми клавишами (по номеру канала)
     * - клавишами влево-вправо
     * - клавиши Pg+ и Pg-
     */
    Lampa.Keypad.listener.destroy();
	Lampa.Keypad.listener.follow('keydown', function (e) {
        var code = e.code;
        if (Lampa.Player.opened() && !$('body.selectbox--open').length) {
            var playlist = Lampa.PlayerPlaylist.get();
            if (!isPluginPlaylist(playlist)) return;
            var isStopEvent = false;
            var curCh = cache('curCh') || (Lampa.PlayerPlaylist.position() + 1);
            if (code === 428 || code === 34 // Pg-
                //4 - Samsung orsay
                || ((code === 37 || code === 4) && !$('.player.tv .panel--visible .focus').length) // left
            ) {
                curCh = curCh === 1 ? playlist.length : curCh - 1; // зацикливаем
                cache('curCh', curCh, 1000);
                isStopEvent = channelSwitch(curCh, true);
            } else if (code === 427 || code === 33 // Pg+
                // 5 - Samsung orsay right
                || ((code === 39 || code === 5) && !$('.player.tv .panel--visible .focus').length) // right
            ) {
                curCh = curCh === playlist.length ? 1 : curCh + 1; // зацикливаем
                cache('curCh', curCh, 1000);
                isStopEvent = channelSwitch(curCh, true);
            } else if (code >= 48 && code <= 57) { // numpad
                isStopEvent = channelSwitch(code - 48);
            } else if (code >= 96 && code <= 105) { // numpad
                isStopEvent = channelSwitch(code - 96);
            }
            if (isStopEvent) {
                e.event.preventDefault();
                e.event.stopPropagation();
            }
        }
    });

    function bulkWrapper(func, bulk) {
        var bulkCnt = 1, timeout = 1, queueEndCallback, queueStepCallback, emptyFn = function(){};
        if (typeof bulk === 'object') {
            timeout = bulk.timeout || timeout;
            queueStepCallback = bulk.onBulk || emptyFn;
            queueEndCallback = bulk.onEnd || emptyFn;
            bulkCnt = bulk.bulk || bulkCnt;
        } else if (typeof bulk === 'number') {
            bulkCnt = bulk;
            if (typeof arguments[2] === "number") timeout = arguments[2];
        } else if (typeof bulk === 'function') {
            queueStepCallback = bulk;
            if (typeof arguments[2] === "number") bulkCnt = arguments[2];
            if (typeof arguments[3] === "number") timeout = arguments[3];
        }
        if (!bulkCnt || bulkCnt < 1) bulkCnt = 1;
        if (typeof queueEndCallback !== 'function') queueEndCallback = emptyFn;
        if (typeof queueStepCallback !== 'function') queueStepCallback = emptyFn;
        var context = this;
        var queue = [];
        var interval;
        var cnt = 0;
        var runner = function() {
            if (!!queue.length && !interval) {
                interval = setInterval(
                    function() {
                        var i = 0;
                        while (queue.length && ++i <= bulkCnt) func.apply(context, queue.shift());
                        i = queue.length ? i : i-1;
                        cnt += i;
                        queueStepCallback.apply(context, [i, cnt, queue.length])
                        if (!queue.length) {
                            clearInterval(interval);
                            interval = null;
                            queueEndCallback.apply(context, [i, cnt, queue.length]);
                        }
                    },
                    timeout || 0
                );
            }
        }
        return function() {
            queue.push(arguments);
            runner();
        }
    }

    //Стиль
    Lampa.Template.add(plugin.component + '_style', '<style>.' + plugin.component + '.category-full .card__icons {top:0.3em;right:0.3em;justify-content:right;}</style>');
    $('body').append(Lampa.Template.get(plugin.component + '_style', {}, true));

//Lampa.SettingsApi.addComponent({
//					component: 'My_Menu_Component',
//					name: 'TVmenuP', //Задаём название меню
//					icon: '<svg viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="M19.7.5H4.3C2.2.5.5 2.2.5 4.3v15.4c0 2.1 1.7 3.8 3.8 3.8h15.4c2.1 0 3.8-1.7 3.8-3.8V4.3c0-2.1-1.7-3.8-3.8-3.8zM13 14.6H8.6c-.3 0-.5.2-.5.5v4.2H6V4.7h7c2.7 0 5 2.2 5 5 0 2.7-2.2 4.9-5 4.9z" fill="#ffffff" class="fill-000000 fill-ffffff"></path><path d="M13 6.8H8.6c-.3 0-.5.2-.5.5V12c0 .3.2.5.5.5H13c1.6 0 2.8-1.3 2.8-2.8.1-1.6-1.2-2.9-2.8-2.9z" fill="#ffffff" class="fill-000000 fill-ffffff"></path></svg>'
//					});

//Выбор сервера
Lampa.SettingsApi.addParam({
					component: 'my_iptv', //Название компонента
					param: {
						name: 'TVmenu', 			//название в Storage
						type: 'select', 			//доступно select,input,trigger,title,static
						values: {					//значения (слева) выставляемые в поле TVmenu через Storage, справа - их видимое название в меню
							RU_1: 'Россия_RU',
							RU_1_MTS: 'Россия_RU_MpegTS',
							RU_KFC: 'Россия_KFC',
							RU_KFC_MTS: 'Россия_KFC_MpegTS',
							RU_BN: 'Россия_BN',
							RU_BN_MTS: 'Россия_BN_MpegTS',
							DE_DE: 'Германия',
							DE_DE_MTS: 'Германия_MpegTS',
							KZ_KZ: 'Казахстан',
							KZ_KZ_MTS: 'Казахстан_MpegTS',
							UA_GN: 'Украина',
							UA_GN_MTS: 'Украина_MpegTS'
						},
						default: 'RU_1'				//Здесь прописываем вариант по-умолчанию, а именно левую часть в VALUES (не значение, а имя параметра - слева!), иначе - undefined
					},
					field: {
						name: 'Источник', 			//Название подпункта меню
						description: 'Выбранный сервер трансляции' //Комментарий к подпункту
					},
					onChange: function (value) { 	//Действия при изменении подпункта
						Lampa.Noty.show("Перезагрузите Lampa для применения настроек!"); //Уведомление
						Lampa.Settings.update();

					}
				});

/* Прячем зарубежные каналы в списке категорий */
	Lampa.SettingsApi.addParam({
			component: 'my_iptv',
			param: {
				name: 'HidenCategories',
				type: 'trigger', //доступно select,input,trigger,title,static
				default: false
			},
				field: {
					name: 'Скрыть зарубежные категории', //Название подпункта меню
					description: 'Каналы Германии, Израиля и т.п.' //Комментарий к подпункту
				},
				onChange: function (value) { //Действия при изменении подпункта
					if (Lampa.Storage.field('HidenCategories') == true){
						setInterval(function() {
							var elementDE = $('.selectbox-item.selector > div:contains("Germany")');
							var elementIL = $('.selectbox-item.selector > div:contains("Israel")');
							var elementTR = $('.selectbox-item.selector > div:contains("Turkey")');
							var elementKZ = $('.selectbox-item.selector > div:contains("Казахстан")');
							var elementBT = $('.selectbox-item.selector > div:contains("Baltic")');
							if(elementDE.length > 0) elementDE.parent('div').hide();
							if(elementIL.length > 0) elementIL.parent('div').hide();
							if(elementTR.length > 0) elementTR.parent('div').hide();
							if(elementKZ.length > 0) elementKZ.parent('div').hide();
							if(elementBT.length > 0) elementBT.parent('div').hide();
						}, 1000); //End Interval
					}
					if (Lampa.Storage.field('HidenCategories') == false){
						Lampa.Noty.show("Перезагрузите Lampa для применения настроек!"); //Уведомление
					}
				}
	});		
/* End Прячем зарубежные каналы в списке категорий */

/* Прячем Эротику */
	Lampa.SettingsApi.addParam({
			component: 'my_iptv',
			param: {
				name: 'HidenErotic',
				type: 'trigger', //доступно select,input,trigger,title,static
				default: false
			},
				field: {
					name: 'Скрыть Эротику', //Название подпункта меню
					description: 'Скрывает каналы 18+' //Комментарий к подпункту
				},
				onChange: function (value) { //Действия при изменении подпункта
					if (Lampa.Storage.field('HidenErotic') == true){
						setInterval(function() {
							var elementEROTIC = $('.selectbox-item.selector > div:contains("Эротические")');
							if(elementEROTIC.length > 0) elementEROTIC.parent('div').hide();
						}, 1000); //End Interval
					}
					if (Lampa.Storage.field('HidenErotic') == false){
						Lampa.Noty.show("Перезагрузите Lampa для применения настроек!"); //Уведомление
					}
				}
	});		
/* End Прячем Эротику */
/*
//АВТОЗАПУСК
Lampa.SettingsApi.addParam({
					component: 'my_iptv', 
					param: {
						name: 'Diesel_Auto_Start',
						type: 'trigger', //доступно select,input,trigger,title,static
						default: false
					},
					field: {
						name: 'Автозапуск при старте', //Название подпункта меню
						description: 'Открывает раздел ТВ при запуске Lampa' //Комментарий к подпункту
					},
					onChange: function (value) { //Действия при изменении подпункта
						Lampa.Noty.show("Перезагрузите Lampa для применения настроек!"); //Уведомление
						Lampa.Settings.update();
					}
				});				
*/
//userAgent
Lampa.SettingsApi.addParam({
					component: 'my_iptv', //Название компонента
					param: {
						name: 'DIESEL_UserAgent', 		//название в Storage
						type: 'select', 			//доступно select,input,trigger,title,static
						values: {					//значения (слева) выставляемые в поле TVmenu через Storage, справа - их видимое название в меню
							STANDART: 	'Стандарт',	// не меняем
							Wink: 		'Wink',	// Wink
							CUSTOM: 	'Свой',	// Свой
						},
						default: 'STANDART'			//Здесь прописываем вариант по-умолчанию, а именно левую часть в VALUES (не значение, а имя параметра - слева!), иначе - undefined
					},
					field: {
						name: 'userAgent', 	//Название подпункта меню
						description: 'Необходим для некоторых плейлистов, не работает на Android и некоторых устройствах' //Комментарий к подпункту
					},
					onChange: function (value) {
						if (Lampa.Storage.field('DIESEL_UserAgent') == 'CUSTOM') {
						Lampa.Input.edit ({
							value: '',
							free: true,
							nosave: true
						}, function (t) {
							Lampa.Storage.set('DIESEL_CustomAgent', t);
							Lampa.Settings.update();
						})};					
					}
				});

//Выбор плотности иконок
Lampa.SettingsApi.addParam({
					component: 'my_iptv', //Название компонента
					param: {
						name: 'ICONS_in_row', 		//название в Storage
						type: 'select', 			//доступно select,input,trigger,title,static
						values: {					//значения (слева) выставляемые в поле TVmenu через Storage, справа - их видимое название в меню
							ICONS_6: '6 иконок',	// 6 иконок
							ICONS_7: '7 иконок',	// 7 иконок
							ICONS_8: '8 иконок',	// 8 иконок
						},
						default: 'ICONS_7'			//Здесь прописываем вариант по-умолчанию, а именно левую часть в VALUES (не значение, а имя параметра - слева!), иначе - undefined
					},
					field: {
						name: 'Значки каналов', 	//Название подпункта меню
						description: 'Сколько значков в одной строке' //Комментарий к подпункту
					},
					onChange: function (value) { 	//Действия при изменении подпункта
						Lampa.Noty.show("Перезагрузите Lampa для применения настроек!"); //Уведомление
						Lampa.Settings.update();

					}
				});
//Выбор цвета рамки
Lampa.SettingsApi.addParam({
					component: 'my_iptv', //Название компонента
					param: {
						name: 'FRAME_AROUND_pic', 	//название в Storage
						type: 'select', 			//доступно select,input,trigger,title,static
						values: {					//значения (слева) выставляемые в поле TVmenu через Storage, справа - их видимое название в меню
							COLOUR_yellow: 	'Жёлтый',	// жёлтый
							COLOUR_blue: 	'Синий',	// синий
							COLOUR_white: 	'Белый',	// белый
							COLOUR_green: 	'Зелёный',	// зелёный
						},
						default: 'COLOUR_yellow'			//Здесь прописываем вариант по-умолчанию, а именно левую часть в VALUES (не значение, а имя параметра - слева!), иначе - undefined
					},
					field: {
						name: 'Цвет рамки выбранного канала', 	//Название подпункта меню
						description: 'Выберите цвет выделения' //Комментарий к подпункту
					},
					onChange: function (value) { 	//Действия при изменении подпункта
						Lampa.Noty.show("Перезагрузите Lampa для применения настроек!"); //Уведомление
						Lampa.Settings.update();
					}
				});
//Выбор формы пикона
Lampa.SettingsApi.addParam({
					component: 'my_iptv', //Название компонента
					param: {
						name: 'PICon', 		//название в Storage
						type: 'select', 			//доступно select,input,trigger,title,static
						values: {					//значения (слева) выставляемые в поле TVmenu через Storage, справа - их видимое название в меню
							QUAD: 'Квадратный',		// Квадрат
							CLASSIC: 'Прямоугольный',	// Классика
						},
						default: 'CLASSIC'			//Здесь прописываем вариант по-умолчанию, а именно левую часть в VALUES (не значение, а имя параметра - слева!), иначе - undefined
					},
					field: {
						name: 'Вид иконки канала', 	//Название подпункта меню
						description: 'Форма иконки' //Комментарий к подпункту
					},
					onChange: function (value) { 	//Действия при изменении подпункта
						Lampa.Storage.set('custom_icons', '14.2');
						Lampa.Noty.show("Перезагрузите Lampa для применения настроек!"); //Уведомление
						Lampa.Settings.update();
					}
				});
//Копирование плейлиста в буфер
Lampa.SettingsApi.addParam({
				component: 'my_iptv',
				param: {
					name: 'PLAYLIST_copy',
					type: 'static', //доступно select,input,trigger,title,static
					default: ''
				},
				field: {
					name: 'Ссылка на плейлист',
					description: 'Нажмите для копирования ссылки'
				},
				onRender: function (item) {
					//if (Lampa.Storage.get('DIESEL_cat')) {
						item.show();
					//} else item.hide();
					item.on('hover:enter', function () {
  					
					Lampa.Utils.copyTextToClipboard(diesel_playlist, function () {
  						Lampa.Noty.show('OK');
  					}, function () {
  						Lampa.Noty.show('Not OK');
									});						
						Lampa.Noty.show('Успешно скопирован');
					});
				}
			});
//Режим отладки
Lampa.SettingsApi.addParam({
					component: 'my_iptv', 
					param: {
						name: 'DIESEL_debug',
						type: 'trigger', //доступно select,input,trigger,title,static
						default: false
					},
					field: {
						name: 'Режим отладки', //Название подпункта меню
						description: 'Диагностический режим работы плагина' //Комментарий к подпункту
					},
					onChange: function (value) { //Действия при изменении подпункта
						Lampa.Noty.show("Перезагрузите Lampa для применения настроек!"); //Уведомление
						Lampa.Settings.update();
					}
				});
//ГЕО БЛОК ПРОВАЙДЕРА
Lampa.SettingsApi.addParam({
					component: 'my_iptv', 
					param: {
						name: 'DIESEL_GEO_BLOCK',
						type: 'trigger', //доступно select,input,trigger,title,static
						default: false
					},
					field: {
						name: 'Обход геоблока провайдера', //Название подпункта меню
						description: '' //Комментарий к подпункту
					},
					onChange: function (value) { //Действия при изменении подпункта
						Lampa.Noty.show("Перезагрузите Lampa для применения настроек!"); //Уведомление
						Lampa.Settings.update();
					}
				});				


//Плейлист
	if (Lampa.Storage.field('TVmenu') == 'RU_1')		Lampa.Storage.set('diesel_source', 'playlist.RU_1.m3u8');
	if (Lampa.Storage.field('TVmenu') == 'RU_1_MTS')		Lampa.Storage.set('diesel_source', 'playlist.RU_1_MTS.m3u8');
	if (Lampa.Storage.field('TVmenu') == 'RU_KFC')		Lampa.Storage.set('diesel_source', 'playlist.RU_KFC.m3u8');
	if (Lampa.Storage.field('TVmenu') == 'RU_KFC_MTS')		Lampa.Storage.set('diesel_source', 'playlist.RU_KFC_MTS.m3u8');
	if (Lampa.Storage.field('TVmenu') == 'RU_BN')		Lampa.Storage.set('diesel_source', 'playlist.RU_BN.m3u8');
	if (Lampa.Storage.field('TVmenu') == 'RU_BN_MTS')		Lampa.Storage.set('diesel_source', 'playlist.RU_BN_MTS.m3u8');
	if (Lampa.Storage.field('TVmenu') == 'DE_DE')		Lampa.Storage.set('diesel_source', 'playlist.DE_DE.m3u8');
	if (Lampa.Storage.field('TVmenu') == 'DE_DE_MTS')		Lampa.Storage.set('diesel_source', 'playlist.DE_DE_MTS.m3u8');
	if (Lampa.Storage.field('TVmenu') == 'KZ_KZ')		Lampa.Storage.set('diesel_source', 'playlist.KZ_KZ.m3u8');
	if (Lampa.Storage.field('TVmenu') == 'KZ_KZ_MTS')		Lampa.Storage.set('diesel_source', 'playlist.KZ_KZ_MTS.m3u8');
	if (Lampa.Storage.field('TVmenu') == 'UA_GN')		Lampa.Storage.set('diesel_source', 'playlist.UA_GN.m3u8');
	if (Lampa.Storage.field('TVmenu') == 'UA_GN_MTS')		Lampa.Storage.set('diesel_source', 'playlist.UA_GN_MTS.m3u8');
//Фильтр Категорий
	//Зарубежные
	if (Lampa.Storage.field('HidenCategories') == true){
		setInterval(function() {
			var elementDE = $('.selectbox-item.selector > div:contains("Germany")');
			var elementIL = $('.selectbox-item.selector > div:contains("Israel")');
			var elementTR = $('.selectbox-item.selector > div:contains("Turkey")');
			var elementKZ = $('.selectbox-item.selector > div:contains("Казахстан")');
			var elementBT = $('.selectbox-item.selector > div:contains("Baltic")');
			if(elementDE.length > 0) elementDE.parent('div').hide();
			if(elementIL.length > 0) elementIL.parent('div').hide();
			if(elementTR.length > 0) elementTR.parent('div').hide();
			if(elementKZ.length > 0) elementKZ.parent('div').hide();
			if(elementBT.length > 0) elementBT.parent('div').hide();
		}, 1000); //End Interval
	}
	//Эротика
	if (Lampa.Storage.field('HidenErotic') == true){
		setInterval(function() {
			var elementEROTIC = $('.selectbox-item.selector > div:contains("Эротические")');
			if(elementEROTIC.length > 0) elementEROTIC.parent('div').hide();
		}, 1000); //End Interval
	}
//Иконки
	if (Lampa.Storage.field('ICONS_in_row') == 'ICONS_6')		Lampa.Storage.set('custom_icons', '16.6');
	if (Lampa.Storage.field('ICONS_in_row') == 'ICONS_7')		Lampa.Storage.set('custom_icons', '14.2');
	if (Lampa.Storage.field('ICONS_in_row') == 'ICONS_8')		Lampa.Storage.set('custom_icons', '12.5');
//Цвет рамки выделения
	if (Lampa.Storage.field('FRAME_AROUND_pic') == 'COLOUR_yellow')		Lampa.Storage.set('custom_colour', 'yellow'); 	//fff10d
	if (Lampa.Storage.field('FRAME_AROUND_pic') == 'COLOUR_blue')		Lampa.Storage.set('custom_colour', 'blue');		//0078ff
	if (Lampa.Storage.field('FRAME_AROUND_pic') == 'COLOUR_white')		Lampa.Storage.set('custom_colour', 'white');	//ffffff
//Форма иконки
	if (Lampa.Storage.field('PICon') == 'QUAD')			Lampa.Storage.set('custom_shape', '100');		//Квадрат
	if (Lampa.Storage.field('PICon') == 'CLASSIC')		Lampa.Storage.set('custom_shape', '60');	//Классика
//userAgent navigator.userAgent
	//if (Lampa.Storage.field('DIESEL_UserAgent') == 'STANDART')	Object.defineProperty(navigator, 'userAgent', {get: function () {return '' + Lampa.Storage.field('DIESEL_DefaultAgent'); }});
	//if (Lampa.Storage.field('DIESEL_UserAgent') == 'Wink') 		Object.defineProperty(navigator, 'userAgent', {get: function () {return 'http-user-agent=WINK/1.28.2 (AndroidTV/9) HlsWinkPlayer'; }});
	//if (Lampa.Storage.field('DIESEL_UserAgent') == 'CUSTOM') 	Object.defineProperty(navigator, 'userAgent', {get: function () {return '' + Lampa.Storage.field('DIESEL_CustomAgent'); }});


var custom_icons = Lampa.Storage.field('custom_icons'); 			//размер иконок в ряд
var custom_colour = Lampa.Storage.field('custom_colour'); 			//цвет выделения
var custom_shape = Lampa.Storage.field('custom_shape'); 			//цвет выделения

var usermail = Lampa.Storage.field('account_email').toLowerCase(); //почта пользователя
var diesel_server_selected = Lampa.Storage.field('diesel_source'); //извлекается из меню последством переменной
var diesel_playlist = 'http://lampatv.site/users/' + usermail + '/' + diesel_server_selected; //полный путь до плейлиста по выбранному серверу (из трёх частей)
	if (Lampa.Storage.field('DIESEL_GEO_BLOCK') == true) diesel_playlist = 'http://lampatv.site/users/' + usermail + '/' + diesel_server_selected;


//Стиль "Обводка"
	Lampa.Template.add('tv_style', '<style>#app > div.wrap.layer--height.layer--width > div.wrap__content.layer--height.layer--width > div > div > div.activity.layer--width.activity--active > div.activity__body > div > div.scroll.scroll--mask.scroll--over.layer--wheight > div > div > div > div.card.selector.card--collection.card--loaded.focus > div.card__view > img{box-shadow: 0 0 0 0.5em #' + custom_colour +'!important;}</style>');
	$('body').append(Lampa.Template.get('tv_style', {}, true));
//Стиль "Форма"
	Lampa.Template.add('shape_style', '<style>#app > div.wrap.layer--height.layer--width > div.wrap__content.layer--height.layer--width > div > div > div > div.activity__body > div > div.scroll.scroll--mask.scroll--over.layer--wheight > div > div > div > div > div.card__view{padding-bottom: ' + custom_shape +'%!important;}</style>');
	$('body').append(Lampa.Template.get('shape_style', {}, true));



    function pluginPage(object) {
        if (object.id !== curListId) {
            catalog = {};
            curListId = object.id;
        }
        var favorite = getStorage('favorite' + object.id, '[]');
        var network = new Lampa.Reguest();
        var scroll = new Lampa.Scroll({
            mask: true,
            over: true,
            step: 250
        });
        // var items = [];
        var html = $('<div></div>');
        var body = $('<div class="' + plugin.component + ' category-full"></div>');
        var info;
        var last;
        this.create = function () {
            var _this = this;
            this.activity.loader(true);
            var emptyResult = function () {
                var empty = new Lampa.Empty();
                html.append(empty.render());
                _this.start = empty.start;
                _this.activity.loader(false);
                _this.activity.toggle();
            };
            if (Object.keys(catalog).length) {
                _this.build(
                    !catalog[object.currentGroup]
                        ? (lists[object.id].groups.length > 1 && catalog[lists[object.id].groups[1].key]
                            ? catalog[lists[object.id].groups[1].key]['channels']
                            : []
                        )
                        : catalog[object.currentGroup]['channels']
                );
            } else if(!lists[object.id] || !object.url) {
                emptyResult();
                return;
            } else {
                network.native(
                    prepareUrl(object.url),
                    function (data) {
                        if (typeof data != 'string'
                            || data.substr(0, 7).toUpperCase() !== "#EXTM3U"
                        ) {
                            emptyResult();
                            return;
                        }
                        catalog = {
                            '': {
                                title: langGet('favorites'),
                                channels: []
                            }
                        };
                        lists[object.id].groups = [{
                            title: langGet('favorites'),
                            key: ''
                        }];
                        var l = data.split(/\r?\n/);
                        var cnt = 0, i = 1, chNum = 0, m, mm, defGroup = defaultGroup;
                        while (i < l.length) {
                            chNum = cnt + 1;
                            var channel = {
                                ChNum: chNum,
                                Title: "Ch " + chNum,
                                isYouTube: false,
                                Url: '',
                                Group: '',
                                Options: {}
                            };
                            for (; cnt < chNum && i < l.length; i++) {
                                if (!!(m = l[i].match(/^#EXTGRP:\s*(.+?)\s*$/i))
                                    && m[1].trim() !== ''
                                ) {
                                    defGroup = m[1].trim();
                                } else if (!!(m = l[i].match(/^#EXTINF:\s*-?\d+(\s+\S.*?\s*)?,(.+)$/i))) {
                                    channel.Title = m[2].trim();
                                    if (!!m[1]
                                        && !!(m = m[1].match(/([^\s=]+)=((["'])(.*?)\3|\S+)/g))
                                    ) {
                                        for (var j = 0; j < m.length; j++) {
                                            if (!!(mm = m[j].match(/([^\s=]+)=((["'])(.*?)\3|\S+)/))) {
                                                channel[mm[1].toLowerCase()] = mm[4] || mm[2];
                                            }
                                        }
                                    }
                                } else if (!!(m = l[i].match(/^#EXTVLCOPT:\s*([^\s=]+)=(.+)$/i))) {
                                    channel.Options[m[1].trim().toLowerCase()] = m[2].trim();
                                }
                                // else if (!!(m = l[i].match(/^(https?|udp|rt[ms]?p|mms|acestream):\/\/(.+)$/i))) {
                                else if (!!(m = l[i].match(/^(https?):\/\/(.+)$/i))) {
                                    channel.Url = m[0].trim();
                                    channel.isYouTube = !!(m[2].match(/^(www\.)?youtube\.com/));
                                    channel.Group = channel['group-title'] || defGroup;
                                    cnt++;
                                }
                            }
                            if (!!channel.Url && !channel.isYouTube) {
                                if (!catalog[channel.Group]) {
                                    catalog[channel.Group] = {
                                        title: channel.Group,
                                        channels: []
                                    };
                                    lists[object.id].groups.push({
                                        title: channel.Group,
                                        key: channel.Group
                                    });
                                }
                                if (!channel['tvg-logo'] && channel['Title'] !== "Ch " + chNum) {
                                    channel['tvg-logo'] = 'http://epg.rootu.top/picon/'
                                        + encodeURIComponent(channel['Title']) + '.png';
                                }
                                catalog[channel.Group].channels.push(channel);
                                var favI = favorite.indexOf(favID(channel.Title));
                                if (favI !== -1) {
                                    catalog[''].channels[favI] = channel;
                                }
                            }
                        }
                        for (i = 0; i < lists[object.id].groups.length; i++) {
                            var group = lists[object.id].groups[i];
                            group.title += ' [' + catalog[group.key].channels.length + ']';
                        }
                        for (i = 0; i < favorite.length; i++) {
                            if (!catalog[''].channels[i]) {
                                catalog[''].channels[i] = {
                                    ChNum: -1,
                                    Title: "#" + favorite[i],
                                    isYouTube: false,
                                    Url: 'http://epg.rootu.top/empty/_.m3u8',
                                    Group: '',
                                    Options: {},
                                    'tvg-logo': 'http://epg.rootu.top/empty/_.gif'
                                };
                            }
                        }
                        _this.build(
                            !catalog[object.currentGroup]
                                ? (lists[object.id].groups.length > 1 && !!catalog[lists[object.id].groups[1].key]
                                    ? catalog[lists[object.id].groups[1].key]['channels']
                                    : []
                                )
                                : catalog[object.currentGroup]['channels']
                        );
                    },
                    function () {
                        // todo попробовать silent запрос через CORS прокси
                        emptyResult();
                    },
                    false,
                    {
                        dataType: 'text'
                    }
                )
            }
            return this.render();
        };
        this.append = function (data) {
            var chIndex = 0;
            var _this2 = this;
            var lazyLoadImg = ('loading' in HTMLImageElement.prototype);
            var bulkFn = bulkWrapper(function (channel) {
                    var chI = chIndex++;
                    var card = Lampa.Template.get('card', {
                        title: channel.Title,
                        release_year: ''
                    });
                    card.addClass('card--collection');
                    card.find('.card__img').css({
                        'cursor': 'pointer',
                        'background-color': '#353535a6'
                    });
                    var img = card.find('.card__img')[0];
                    if (lazyLoadImg) img.loading = (chI < 18 ? 'eager' : 'lazy');
                    img.onload = function () {
                        card.addClass('card--loaded');
                    };
                    img.onerror = function (e) {
                        img.src = './img/img_broken.svg';
                        channel['tvg-logo'] = '';
                    };
                    img.src = channel['tvg-logo'] || './img/img_broken.svg';
                    var favIcon = $('<div class="card__icon icon--book hide"></div>');
                    card.find('.card__icons-inner').append(favIcon);
                    if (object.currentGroup !== '' && favorite.indexOf(favID(channel.Title)) !== -1) {
                        favIcon.toggleClass('hide', false);
                    }
                    card.on('hover:focus', function () {
                        last = card[0];
                        scroll.update(card, true);
                        // info.find('.info__title').text(channel['Group']);
                        info.find('.info__title-original').text(channel.Title);
                    }).on('hover:enter', function () {
                        var video = {
                            title: channel.Title,
                            url: prepareUrl(channel.Url),
                            plugin: plugin.component,
                            tv: true
                        };
                        var playlist = [];
                        var playlistForExtrnalPlayer = [];
                        var i = 0;
                        data.forEach(function (elem) {
                            // Изменяем порядок для внешнего плейлиста (плейлист начинается с текущего элемента)
                            var j = i < chI ? data.length - chI + i : i - chI;
                            var videoUrl = i === chI ? video.url : prepareUrl(elem.Url);
                            playlistForExtrnalPlayer[j] = {
                                title: elem.Title,
                                url: videoUrl,
                                tv: true
                            };
                            playlist.push({
                                title: ++i + '. ' + elem.Title,
                                url: videoUrl,
                                plugin: plugin.component,
                                tv: true
                            });
                        });
                        video['playlist'] = playlistForExtrnalPlayer;
                        Lampa.Player.play(video);
                        Lampa.Player.playlist(playlist);
                    }).on('hover:long', function () {
                        var favI = favorite.indexOf(favID(channel.Title));
                        var isFavoriteGroup = object.currentGroup === '';
                        var menu = [
                            {
                                title: favI === -1 ? langGet('favorites_add') : langGet('favorites_del'),
                                favToggle: true
                            }
                        ];
                        if (isFavoriteGroup && favorite.length) {
                            if (favI !== 0) {
                                menu.push({
                                    title: langGet('favorites_move_top'),
                                    favMove: true,
                                    i: 0
                                });
                                menu.push({
                                    title: langGet('favorites_move_up'),
                                    favMove: true,
                                    i: favI-1
                                });
                            }
                            if ((favI + 1) !== favorite.length) {
                                menu.push({
                                    title: langGet('favorites_move_down'),
                                    favMove: true,
                                    i: favI+1
                                });
                                menu.push({
                                    title: langGet('favorites_move_end'),
                                    favMove: true,
                                    i: favorite.length-1
                                });
                            }
                            menu.push({
                                title: langGet('favorites_clear'),
                                favClear: true
                            });
                        }
                        Lampa.Select.show({
                            title: Lampa.Lang.translate('title_action'),
                            items: menu,
                            onSelect: function(sel) {
                                var favGroup = lists[object.id].groups[0];
                                if (!!sel.favToggle) {
                                    if (favI === -1) {
                                        favI = favorite.length
                                        favorite[favI] = favID(channel.Title);
                                        catalog[favGroup.key].channels[favI] = channel;
                                    } else {
                                        favorite.splice(favI,1);
                                        catalog[favGroup.key].channels.splice(favI,1);
                                    }
                                } else if (!!sel.favClear) {
                                    favorite = [];
                                    catalog[favGroup.key].channels = [];
                                } else if (!!sel.favMove) {
                                    favorite.splice(favI,1);
                                    favorite.splice(sel.i, 0, favID(channel.Title));
                                    catalog[favGroup.key].channels.splice(favI,1);
                                    catalog[favGroup.key].channels.splice(sel.i, 0, channel);
                                }
                                setStorage('favorite' + object.id, favorite);
                                favGroup.title = catalog[favGroup.key].title
                                    + ' [' + catalog[favGroup.key].channels.length + ']';
                                if (isFavoriteGroup) {
                                    Lampa.Activity.replace(Lampa.Arrays.clone(lists[object.id].activity));
                                } else {
                                    favIcon.toggleClass('hide', favorite.indexOf(favID(channel.Title)) === -1);
                                    Lampa.Controller.toggle('content');
                                }
                            },
                            onBack: function() {
                                Lampa.Controller.toggle('content');
                            }
                        });
                    });
                    body.append(card);
                },
                {
                    bulk: 18,
                    onEnd: function(last, total, left) {
                        _this2.activity.loader(false);
                        _this2.activity.toggle();
                    }
                }
            );
            data.forEach(bulkFn);
        };
        this.build = function (data) {
            var _this2 = this;
            Lampa.Background.change();
            Lampa.Template.add(plugin.component + '_button_category', "<style>@media screen and (max-width: 2560px) {." + plugin.component + " .card--collection {width: " + custom_icons +"%!important;}}@media screen and (max-width: 385px) {." + plugin.component + " .card--collection {width: 33.3%!important;}}</style><div class=\"full-start__button selector view--category\"><svg style=\"enable-background:new 0 0 512 512;\" version=\"1.1\" viewBox=\"0 0 24 24\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><g id=\"info\"/><g id=\"icons\"><g id=\"menu\"><path d=\"M20,10H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2C22,10.9,21.1,10,20,10z\" fill=\"currentColor\"/><path d=\"M4,8h12c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2H4C2.9,4,2,4.9,2,6C2,7.1,2.9,8,4,8z\" fill=\"currentColor\"/><path d=\"M16,16H4c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2C18,16.9,17.1,16,16,16z\" fill=\"currentColor\"/></g></g></svg>   <span>" + langGet('categories') + "</span>\n    </div>");
            Lampa.Template.add(plugin.component + '_info_radio', '<div class="info layer--width"><div class="info__left"><div class="info__title"></div><div class="info__title-original"></div><div class="info__create"></div></div><div class="info__right" style="display: flex !important;">  <div id="stantion_filtr"></div></div></div>');
            var btn = Lampa.Template.get(plugin.component + '_button_category');
            info = Lampa.Template.get(plugin.component + '_info_radio');
            info.find('#stantion_filtr').append(btn);
            info.find('.view--category').on('hover:enter hover:click', function () {
                _this2.selectGroup();
            });
            info.find('.info__title').text(!catalog[object.currentGroup] ? '' : catalog[object.currentGroup].title);
            info.find('.info__title-original').text('');
            html.append(info.append());
            // this.activity.loader(false);
            // this.activity.toggle();
            if (data.length) {
                scroll.render().addClass('layer--wheight').data('mheight', info);
                html.append(scroll.render());
                this.append(data);
                scroll.append(body);
                setStorage('last_catalog' + object.id, object.currentGroup);
                lists[object.id].activity.currentGroup = object.currentGroup;
            } else {
                var empty = new Lampa.Empty();
                html.append(empty.render());
                // this.start = empty.start;
                this.activity.loader(false);
                // this.activity.toggle();
                Lampa.Controller.collectionSet(info);
                Navigator.move('right');
            }
        };
        this.selectGroup = function () {
            var activity = Lampa.Arrays.clone(lists[object.id].activity);
            Lampa.Select.show({
                title: langGet('categories'),
                items: Lampa.Arrays.clone(lists[object.id].groups),
                onSelect: function(group) {
                    if (object.currentGroup !== group.key) {
                        activity.currentGroup = group.key;
                        Lampa.Activity.replace(activity);
                    } else {
                        Lampa.Controller.toggle('content');
                    }
                },
                onBack: function() {
                    Lampa.Controller.toggle('content');
                }
            });
        };
        this.start = function () {
            if (Lampa.Activity.active().activity !== this.activity) return; //обязательно, иначе наблюдается баг, активность создается но не стартует, в то время как компонент загружается и стартует самого себя.
            var _this = this;
            Lampa.Controller.add('content', {
                toggle: function toggle() {
                    Lampa.Controller.collectionSet(scroll.render());
                    Lampa.Controller.collectionFocus(last || false, scroll.render());
                },
                left: function left() {
                    if (Navigator.canmove('left')) Navigator.move('left');
                    else Lampa.Controller.toggle('menu');
                },
                right: function right() {
                    if (Navigator.canmove('right')) Navigator.move('right');
                    else _this.selectGroup();
                },
                up: function up() {
                    if (Navigator.canmove('up')) {
                        Navigator.move('up');
                    } else {
                        if (!info.find('.view--category').hasClass('focus')) {
                            if (!info.find('.view--category').hasClass('focus')) {
                                Lampa.Controller.collectionSet(info);
                                Navigator.move('right')
                            }
                        } else Lampa.Controller.toggle('head');
                    }
                },
                down: function down() {
                    if (Navigator.canmove('down')) Navigator.move('down');
                    else if (info.find('.view--category').hasClass('focus')) {
                        Lampa.Controller.toggle('content');
                    }
                },
                back: function back() {
                    Lampa.Activity.backward();
                }
            });
            Lampa.Controller.toggle('content');
        };
        this.pause = function () {
        };
        this.stop = function () {
        };
        this.render = function () {
            return html;
        };
        this.destroy = function () {
            network.clear();
            scroll.destroy();
            if (info) info.remove();
            html.remove();
            body.remove();
            favorite = null;
            network = null;
            html = null;
            body = null;
            info = null;
        };
    }

    if (!Lampa.Lang) {
        var lang_data = {};
        Lampa.Lang = {
            add: function add(data) {
                lang_data = data;
            },
            translate: function translate(key) {
                return lang_data[key] ? lang_data[key].ru : key;
            }
        };
    }
    var langData = {};
    function langAdd(name, values) {
        langData[plugin.component + '_' + name] = values;
    }
    function langGet(name) {
        return Lampa.Lang.translate(plugin.component + '_' + name);
    }

    langAdd('default_playlist',
        {
            ru: '' + diesel_playlist + '',
            uk: 'https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8',
            be: 'https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8',
            en: 'https://raw.githubusercontent.com/Free-TV/IPTV/master/playlist.m3u8',
            zh: 'https://raw.iqiq.io/Free-TV/IPTV/master/playlist.m3u8'
        }
    );
    langAdd('default_playlist_cat',
        {
            ru: 'Russia',
            uk: 'Ukraine',
            be: 'Belarus',
            en: 'VOD Movies (EN)',
            zh: 'China'
        }
    );
    langAdd('settings_playlist_num_group',
        {
            ru: 'Плейлист ',
            uk: 'Плейлист ',
            be: 'Плэйліст ',
            en: 'Playlist ',
            zh: '播放列表 '
        }
    );
    langAdd('settings_list_name',
        {
            ru: 'Название',
            uk: 'Назва',
            be: 'Назва',
            en: 'Name',
            zh: '名称'
        }
    );
    langAdd('settings_list_name_desc',
        {
            ru: 'Название плейлиста в Главном (левом) меню',
            uk: 'Назва плейлиста у лівому меню',
            be: 'Назва плэйліста ў левым меню',
            en: 'Playlist name in the left menu',
            zh: '左侧菜单中的播放列表名称'
        }
    );
    langAdd('settings_list_url',
        {
            ru: 'URL-адрес',
            uk: 'URL-адреса',
            be: 'URL-адрас',
            en: 'URL',
            zh: '网址'
        }
    );
    langAdd('settings_list_url_desc0',
        {
            ru: 'По умолчанию используется плейлист из проекта <i>Дизель ТВ</i><br>Вы можете заменить его на свой.',
            uk: 'За замовчуванням використовується плейлист із проекту <i>https://github.com/Free-TV/IPTV</i><br>Ви можете замінити його на свій.',
            be: 'Па змаўчанні выкарыстоўваецца плэйліст з праекта <i>https://github.com/Free-TV/IPTV</i><br> Вы можаце замяніць яго на свой.',
            en: 'The default playlist is from the project <i>https://github.com/Free-TV/IPTV</i><br>You can replace it with your own.',
            zh: '默认播放列表来自项目 <i>https://github.com/Free-TV/IPTV</i><br>您可以将其替换为您自己的。'
        }
    );
    langAdd('settings_list_url_desc1',
        {
            ru: 'Вы можете добавить еще один плейлист здесь. Ссылки на плейлисты обычно заканчиваются на <i>.m3u</i> или <i>.m3u8</i>',
            uk: 'Ви можете додати ще один плейлист суду. Посилання на плейлисти зазвичай закінчуються на <i>.m3u</i> або <i>.m3u8</i>',
            be: 'Вы можаце дадаць яшчэ адзін плэйліст суда. Спасылкі на плэйлісты звычайна заканчваюцца на <i>.m3u</i> або <i>.m3u8</i>',
            en: 'You can add another trial playlist. Playlist links usually end with <i>.m3u</i> or <i>.m3u8</i>',
            zh: '您可以添加另一个播放列表。 播放列表链接通常以 <i>.m3u</i> 或 <i>.m3u8</i> 结尾'
        }
    );
    langAdd('categories',
        {
            ru: 'Категории',
            uk: 'Категорія',
            be: 'Катэгорыя',
            en: 'Categories',
            zh: '分类'
        }
    );
    langAdd('uid',
        {
            ru: 'UID',
            uk: 'UID',
            be: 'UID',
            en: 'UID',
            zh: 'UID'
        }
    );
    langAdd('unique_id',
        {
            ru: 'уникальный идентификатор (нужен для некоторых ссылок на плейлисты)',
            uk: 'унікальний ідентифікатор (необхідний для деяких посилань на списки відтворення)',
            be: 'унікальны ідэнтыфікатар (неабходны для некаторых спасылак на спіс прайгравання)',
            en: 'unique identifier (needed for some playlist links)',
            zh: '唯一 ID（某些播放列表链接需要）'
        }
    );
    langAdd('favorites',
        {
            ru: 'Избранное',
            uk: 'Вибране',
            be: 'Выбранае',
            en: 'Favorites',
            zh: '收藏夹'
        }
    );
    langAdd('favorites_add',
        {
            ru: 'Добавить в избранное',
            uk: 'Додати в обране',
            be: 'Дадаць у абранае',
            en: 'Add to favorites',
            zh: '添加到收藏夹'
        }
    );
    langAdd('favorites_del',
        {
            ru: 'Удалить из избранного',
            uk: 'Видалити з вибраного',
            be: 'Выдаліць з абранага',
            en: 'Remove from favorites',
            zh: '从收藏夹中删除'
        }
    );
    langAdd('favorites_clear',
        {
            ru: 'Очистить избранное',
            uk: 'Очистити вибране',
            be: 'Ачысціць выбранае',
            en: 'Clear favorites',
            zh: '清除收藏夹'
        }
    );
    langAdd('favorites_move_top',
        {
            ru: 'В начало списка',
            uk: 'На початок списку',
            be: 'Да пачатку спісу',
            en: 'To the top of the list',
            zh: '到列表顶部'
        }
    );
    langAdd('favorites_move_up',
        {
            ru: 'Сдвинуть вверх',
            uk: 'Зрушити вгору',
            be: 'Ссунуць уверх',
            en: 'Move up',
            zh: '上移'
        }
    );
    langAdd('favorites_move_down',
        {
            ru: 'Сдвинуть вниз',
            uk: 'Зрушити вниз',
            be: 'Ссунуць уніз',
            en: 'Move down',
            zh: '下移'
        }
    );
    langAdd('favorites_move_end',
        {
            ru: 'В конец списка',
            uk: 'В кінець списку',
            be: 'У канец спісу',
            en: 'To the end of the list',
            zh: '到列表末尾'
        }
    );

    Lampa.Lang.add(langData);

    function favID(title) {
        return title.toLowerCase().replace(/[\s!-\/:-@\[-`{-~]+/g, '')
    }
    function getStorage(name, defaultValue) {
        return Lampa.Storage.get(plugin.component + '_' + name, defaultValue);
    }
    function setStorage(name, val, noListen) {
        return Lampa.Storage.set(plugin.component + '_' + name, val, noListen);
    }
    function getSettings(name) {
        return Lampa.Storage.field(plugin.component + '_' + name);
    }
    function addSettings(type, param) {
        var data = {
            component: plugin.component,
            param: {
                name: plugin.component + '_' + param.name,
                type: type, // select|trigger|input|title|static
                values: !param.values ? '' : param.values,
                placeholder: !param.placeholder ? '' : param.placeholder,
                default: (typeof param.default === 'undefined') ? '' : param.default
            },
            field: {
                name: !param.title ? (!param.name ? '' : param.name) : param.title
            }
        }
        if (!!param.name) data.param.name = plugin.component + '_' + param.name;
        if (!!param.description) data.field.description = param.description;
        if (!!param.onChange) data.onChange = param.onChange;
        if (!!param.onRender) data.onRender = param.onRender;
        Lampa.SettingsApi.addParam(data);
    }

    function configurePlaylist(i) {
        addSettings('title', {title: langGet('settings_playlist_num_group') + (i+1)});
        var defName = 'list ' + (i+1);
        var activity = {
            id: i,
            url: '',
            title: plugin.name,
            groups: [],
            currentGroup: getStorage('last_catalog' + i, langGet('default_playlist_cat')),
            component: plugin.component,
            page: 1
        };
        addSettings('input', {
            title: langGet('settings_list_name'),
            name: 'list_name_' + i,
            default: i ? 'Ваш второй плейлист' : plugin.name,
            placeholder: i ? defName : '',
            description: langGet('settings_list_name_desc'),
            onChange: function (newVal) {
                var title = !newVal ? (i ? defName : plugin.name) : newVal;
                $('.js-' + plugin.component + '-menu' + i + '-title').text(title);
                activity.title = title + (title === plugin.name ? '' : ' - ' + plugin.name);
            }
        });
        addSettings('input', {
            title: langGet('settings_list_url'),
            name: 'list_url_' + i,
            default: i ? '' : langGet('default_playlist'),
            placeholder: i ? 'http://example.com/list.m3u8' : '',
            description: i
                ? (!getStorage('list_url_' + i) ? langGet('settings_list_url_desc1') : '')
                : langGet('settings_list_url_desc0'),
            onChange: function (url) {
                if (url === activity.url) return;
                if (activity.id === curListId) {
                    catalog = {};
                    curListId = -1;
                }
                if (/^https?:\/\/./i.test(url)) {
                    activity.url = url;
                    $('.js-' + plugin.component + '-menu' + i).show();
                } else {
                    activity.url = '';
                    $('.js-' + plugin.component + '-menu' + i).hide();
                }
            }
        });

        var name = getSettings('list_name_' + i);
        var url = getSettings('list_url_' + i);
        var title = (name || defName);
        activity.title = title + (title === plugin.name ? '' : ' - ' + plugin.name);
        var menuEl = $('<li class="menu__item selector js-' + plugin.component + '-menu' + i + '">'
                            + '<div class="menu__ico">' + plugin.icon + '</div>'
                            + '<div class="menu__text js-' + plugin.component + '-menu' + i + '-title">'
                                + encoder.text(title).html()
                            + '</div>'
                        + '</li>')
            .hide()
            .on('hover:enter', function(){
                if (Lampa.Activity.active().component === plugin.component) {
                    Lampa.Activity.replace(Lampa.Arrays.clone(activity));
                } else {
                    Lampa.Activity.push(Lampa.Arrays.clone(activity));
                }
            });
        if (/^https?:\/\/./i.test(url)) {
            activity.url = url;
            menuEl.show();
        }
        lists.push({activity: activity, menuEl: menuEl, groups: []});
        return !activity.url ? i + 1 : i;
    }

    Lampa.Component.add(plugin.component, pluginPage);
    // Готовим настройки
    Lampa.SettingsApi.addComponent(plugin);
    for (var i=0; i <= lists.length; i++) i = configurePlaylist(i);
    UID = getStorage('uid', '');
    if (!UID) {
        UID = (Math.random() + 1).toString(36).substring(2).toUpperCase().replace(/(.{4})/g, '$1-');
        setStorage('uid', UID);
    }
    addSettings('title', {title: langGet('uid')});
    addSettings('static', {title: UID, description: langGet('unique_id')});
    //~ Готовим настройки

    function pluginStart() {
        if (!!window['plugin_' + plugin.component + '_ready']) return;
        window['plugin_' + plugin.component + '_ready'] = true;
        var menu = $('.menu .menu__list').eq(0);
        for (var i=0; i < lists.length; i++) menu.append(lists[i].menuEl);
    }

    if (!!window.appready) {
        pluginStart();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') pluginStart();
        });
    }

//Прячем настройки
//Lampa.Template.add('nomenuiptv', '<style>div[data-component="my_iptv"]{opacity: 0%!important;display: none;}</style>');
//$('body').append(Lampa.Template.get('nomenuiptv', {}, true));

//Убираем смену первого плейлиста - у нас Дизель ТВ!
Lampa.Template.add('nomenuiptv1', '<style>div[data-name="my_iptv_list_url_0"]{opacity: 0%!important;display: none;}</style>');
$('body').append(Lampa.Template.get('nomenuiptv1', {}, true));

//Прячем ошибку плеера
Lampa.Template.add('PlayerError', '<style>body > div.player > div.player-info.info--visible > div > div.player-info__error{opacity: 0%!important;display: none;}</style>');
$('body').append(Lampa.Template.get('PlayerError', {}, true));

//Режим отладки выключен - Да
	if (Lampa.Storage.field('DIESEL_debug') == false)	{
		//Прячем вкладку Player для маскировки токена
		Lampa.Template.add('nomenuiptv', '<style>div[data-name="1901885695"]{opacity: 0%!important;display: none;}</style>');
		$('body').append(Lampa.Template.get('nomenuiptv', {}, true));
	}
//Режим отладки выключен - Нет
	if (Lampa.Storage.field('DIESEL_debug') == true)	{
		//Выводим плейлист в консоль
		console.log ('DEBUG', diesel_playlist); //выводим в консоль
	}	
/*
//АвтоЗапуск
Lampa.Keypad.listener.destroy(); //Убираем блок
	if (Lampa.Storage.field('Diesel_Auto_Start') == true)	{
		function b64EncodeUnicode(str) {
			return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
				function toSolidBytes(match, p1) {
					return String.fromCharCode('0x' + p1);
    }));
}
var String2encode1 = Lampa.Storage.field('activity');
var String2encode2 = '{"id":0,"url":"' + diesel_playlist + '","title":"Дизель ТВ","groups":[],"currentGroup":"Russia","component":"my_iptv","page":1}';
var encoded_1 = b64EncodeUnicode(String2encode1); // что кодировать
var encoded_2 = b64EncodeUnicode(String2encode2);

Lampa.Keypad.listener.follow('keydown', function (e) {
	  var code = e.code;
		Lampa.Storage.set('start_page', 'last');
          var usermail = Lampa.Storage.field('account_email').toLowerCase(); //почта пользователя
		  var diesel_server_selected = Lampa.Storage.field('diesel_source'); //извлекается из меню последством переменной
		  var diesel_playlist = 'http://lampatv.site/users/' + usermail + '/' + diesel_server_selected; //полный путь до плейлиста по выбранному серверу (из трёх частей)
		  if ( (encoded_1 == encoded_2) == false) {
		  Lampa.Storage.set('activity', '{"id":0,"url":"' + diesel_playlist + '","title":"Дизель ТВ","groups":[],"currentGroup":"Russia","component":"my_iptv","page":1}');
		  }
      });
$('body').click(function() {
        // здесь свои действия со storage при клике:
	  //var code = e.code;
		Lampa.Storage.set('start_page', 'last');
          var usermail = Lampa.Storage.field('account_email').toLowerCase(); //почта пользователя
		  var diesel_server_selected = Lampa.Storage.field('diesel_source'); //извлекается из меню последством переменной
		  var diesel_playlist = 'http://lampatv.site/users/' + usermail + '/' + diesel_server_selected; //полный путь до плейлиста по выбранному серверу (из трёх частей)
		  if ( (encoded_1 == encoded_2) == false) {
		  Lampa.Storage.set('activity', '{"id":0,"url":"' + diesel_playlist + '","title":"Дизель ТВ","groups":[],"currentGroup":"Russia","component":"my_iptv","page":1}');
		  }
});	
	}
*/
//$(".info__create").css('display', 'none');
	Lampa.Template.add('tv_short', '<style>#app > div.wrap.layer--height.layer--width > div.wrap__content.layer--height.layer--width > div > div > div > div.activity__body > div > div.info.layer--width{height: 12%!important;}</style>');
	$('body').append(Lampa.Template.get('tv_short', {}, true));
	Lampa.Template.add('tv_short1', '<style>#app > div.wrap.layer--height.layer--width > div.wrap__content.layer--height.layer--width > div > div > div > div.activity__body > div > div.info.layer--width > div.info__left > div.info__title-original{display: none!important;}</style>');
	$('body').append(Lampa.Template.get('tv_short1', {}, true));


})();