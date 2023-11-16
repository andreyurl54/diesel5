;(function () {
'use strict';

if (!!window.appready) Lampa.Utils.trigger(document.querySelector(".head__action.full-screen"), 'click');
else Lampa.Listener.follow('app', function(e){if (e.type === 'ready') Lampa.Utils.trigger(document.querySelector(".head__action.full-screen"), 'click')});
})();
