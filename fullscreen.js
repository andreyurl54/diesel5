;(function () {
'use strict';
setTimeout(function() { 
  if ($(".head__action.full-screen")) Lampa.Utils.trigger(document.querySelector(".head__action.full-screen"), 'click')
  else Lampa.Noty.show('0')
  },3000)
})();
