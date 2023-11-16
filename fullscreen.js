(function () {
'use strict';
setTimeout(function() {
  //document.querySelector("div.head__action.selector.full-screen").trigger_click()
  //$("div.head__action.selector.full-screen").trigger('hover:enter');
  //Lampa.Utils.toggleFullscreen()
  //document.documentElement.requestFullscreen()
  if (
  document.cancelFullScreen &&
  document.fullScreenElement &&
  !document.mozCancelFullScreen && !document.webkitCancelFullScreen
) {
  document.documentElement.requestFullScreen();
}

if (!document.cancelFullScreen) {
  if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen(
      Element.ALLOW_KEYBOARD_INPUT
    );
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  }
}
},3000)
})();
