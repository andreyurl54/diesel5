(function () {
'use strict';
setTimeout(function() {
  Lampa.Utils.toggleFullscreen();
  document.addEventListener("contextmenu", function(e) {
        e.preventDefault(); window.history.back();
        return false;
  });
},3000)
})();
