;(function () {
'use strict';
setTimeout(function() {
    var elem = document.documentElement;
  // переход в полноэкранный режим
  elem.requestFullscreen().catch(function() {
    elem.webkitRequestFullscreen().catch(function() {
      elem.msRequestFullscreen();
    });
  });
  //document.querySelector("div.head__action.selector.full-screen").trigger_click()
  //$("div.head__action.selector.full-screen").trigger('hover:enter');
  //Lampa.Utils.toggleFullscreen()
},4000)
})();
