(function () {
'use strict';
var icon_add_local_server = '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#00ff11"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.048"></g><g id="SVGRepo_iconCarrier"> <path d="M18.5 18.5L22 22" stroke="#ffd505" stroke-width="2.4" stroke-linecap="round"></path> <path d="M9 11.5H11.5M11.5 11.5H14M11.5 11.5V14M11.5 11.5V9" stroke="#00ff11" stroke-width="2.4" stroke-linecap="round"></path> <path d="M6.75 3.27093C8.14732 2.46262 9.76964 2 11.5 2C16.7467 2 21 6.25329 21 11.5C21 16.7467 16.7467 21 11.5 21C6.25329 21 2 16.7467 2 11.5C2 9.76964 2.46262 8.14732 3.27093 6.75" stroke="#ffd505" stroke-width="2.4" stroke-linecap="round"></path> </g></svg></div><div style="font-size:1.3em">Локальный TorrServer</div></div>'

/* Компонент */
		Lampa.Settings.listener.follow('open', function (e) {
					if (e.name == 'main') {
						Lampa.SettingsApi.addComponent({
                            component: 'add_local_server',
							name: 'checker'
						});
						setTimeout(function() {
							$('div[data-component="add_local_server"]').remove();
						}, 0);
					}
		});
	/* Головной раздел */	
		Lampa.SettingsApi.addParam({
					component: 'interface',
					param: {
						name: 'add_local_server',
						type: 'static',
						default: true
					},
					field: {
						name: icon_add_local_server
					},
					onRender: function(item) {
						setTimeout(function() {
							if($('div[data-static="true"]').length > 1) item.hide();
							//$('.settings-param__name', item).css('color','f3d900');
							$('div[data-static="true"]').insertAfter('div[data-name="torrserver_use_link"]');
						}, 0);
						item.on('hover:enter', function () {
							Lampa.Settings.create('add_local_server');
							Lampa.Controller.enabled().controller.back = function(){
								Lampa.Settings.create('interface');
							}
						});
					}
		});  
 })();
