(function () {
'use strict';
var icon_menu_sort = '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg viewBox="0 -0.5 29 29" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>sort-by 2</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-520.000000, -207.000000)" fill="#ffffff"> <path d="M547,225 L535,225 C533.896,225 533,225.896 533,227 C533,228.104 533.896,229 535,229 L547,229 C548.104,229 549,228.104 549,227 C549,225.896 548.104,225 547,225 L547,225 Z M547,219 L535,219 C533.896,219 533,219.896 533,221 C533,222.104 533.896,223 535,223 L547,223 C548.104,223 549,222.104 549,221 C549,219.896 548.104,219 547,219 L547,219 Z M547,213 L541,213 C539.896,213 539,213.896 539,215 C539,216.104 539.896,217 541,217 L547,217 C548.104,217 549,216.104 549,215 C549,213.896 548.104,213 547,213 L547,213 Z M535.687,216.697 C536.079,216.303 536.079,215.665 535.687,215.271 L528.745,207.283 C528.535,207.073 528.258,206.983 527.984,206.998 C527.711,206.983 527.434,207.073 527.224,207.283 L520.282,215.271 C519.89,215.665 519.89,216.303 520.282,216.697 C520.674,217.091 521,217 521,217 L527,217 L527,235 L529,235 L529,217 L535,217 C535,217 535.295,217.091 535.687,216.697 L535.687,216.697 Z M535,211 L547,211 C548.104,211 549,210.104 549,209 C549,207.896 548.104,207 547,207 L535,207 C533.896,207 533,207.896 533,209 C533,210.104 533.896,211 535,211 L535,211 Z M547,231 L535,231 C533.896,231 533,231.896 533,233 C533,234.104 533.896,235 535,235 L547,235 C548.104,235 549,234.104 549,233 C549,231.896 548.104,231 547,231 L547,231 Z" id="sort-by-2" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg></div><div style="font-size:1.3em">Сортировка меню</div></div>'

/* Компонент */
		Lampa.Settings.listener.follow('open', function (e) {
					if (e.name == 'main') {
						Lampa.SettingsApi.addComponent({
                            component: 'add_menu_sort',
							name: 'menu_manager'
						});
						setTimeout(function() {
							$('div[data-component="add_menu_sort"]').remove();
						}, 0);
					}
		});
	/* Головной раздел */	
		Lampa.SettingsApi.addParam({
					component: 'interface',
					param: {
						name: 'add_menu_sort',
						type: 'static',
						id: 'sort',
						default: true
					},
					field: {
						name: icon_menu_sort
					},
					onRender: function(item) {
						setTimeout(function() { 
							//$('.settings-param__name', item).css('color','f3d900');
							$('div[class="settings-folder"]').parent().parent().insertBefore('div[data-static="true"]')[0];
							$('div[data-static="true"]').last().hide();
						}, 0); 
						item.on('hover:enter', function () {
							Lampa.Settings.create('add_menu_sort');
							Lampa.Controller.enabled().controller.back = function(){
								Lampa.Settings.create('interface');
							}
						});
					}
		});  
 
	/* Дочерний элемент Пункты*/
	Lampa.SettingsApi.addParam({
					component: 'add_menu_sort',
					param: {
						name: 'clear_hidden_items',
						type: 'button'
					},
					field: {
						name: 'Показать все скрытые',
						description: ''
					},
					onRender: function (item) {
						item.on('hover:enter', function () {
							setTimeout(function() {
								localStorage.setItem('menu_hide', []);
							}, 0);
						});
					}
	});
})();
