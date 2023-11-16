(function () {
'use strict';
setTimeout(function() {
  //document.querySelector("div.head__action.selector.full-screen").trigger_click()
  //$("div.head__action.selector.full-screen").trigger('hover:enter');
  //Lampa.Utils.toggleFullscreen()
  document.documentElement.requestFullscreen()
},3000)
})();
