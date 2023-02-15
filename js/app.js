/*!
* jsandbox v0.1.0
* Autor: Javier Rojas
* Copyright: copia, estudia, evoluciona este código lo que quieras. 
* Lo he desarrollado como refuerzo para que compruebes de manera rápida los ejemplos de clase pero puedes usarlo como quieras.
* Si consigues crear algo digno de mención a partir de este código no ovides enviarme una copia.
*
* Date: 2023-02-14
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PARÁMETROS GET:																											//
// ¿Qué parámetros GET debemos recibir siempre? //////////////////////////////////////////////////////////////////////////////
//																															//
//	querystring.js genera una variable global QueryString que almacena todos los parámetros GET: 							//
//																															//
//	QueryString.iframe		bit que determina si al cargar se en modo iframe: sin <header>	y un botón para maximizar		//
//								0-> muestra el <header>.																	//
//								1-> oculta el <header> y muestra le botón #go-to-web.										//
//  QueryString.ud			ud almacena el número de la unidad.																//
//  QueryString.ex			ex almacena el número del ejemplo.																//
//  QueryString.mode		mode determina si estamos en modo "demo" o "test".												//
// 						 		QueryString.modee = "demo"; Pensado para mostrar ejemplos de código							//
//  							QueryString.mode = "test"; Pensado para que los alumnos practiquen, 						//
//								es como demo, pero se borran códigos y se muestra el panel de ENUNCIADO						//
//	QueryString.runload		bit que determina si al cargar la página se ejecuta el código.									//
//								0-> no ejecutar al cargar.																	//
//								1-> ejecutar al cargar.																		//
//	QueryString.liveserver	bit que determina si se muestran los cambios en tiempo real.									//
//								0-> no muestra cambios en tiempo real.														//
//								1-> muestra cambios en tiempo real.															//
//	QueryString.view		bit que determina si al cargar se muesrta la vista horizontal o vertical.						//
//								0-> muestra la vista vertical.																//
//								1-> muestra la vista horizontal.															//
//	QueryString.dark		bit que determina si al cargar se muesrta el tema oscuro.										//
//								0-> muestra el tema claro.																	//
//								1-> muestra el tema oscuro.																	//
//  QueryString.panels		mode determina qué paneles se muestran maximizados al cargar. Sus valores son seis bits 0 o 1. 	//
//								0-> mostrar minimizado.																		//
//								1-> mostrar maximizado.																		//
//							La posición del bit determina el panel: HTML,CSS,JS,ENUNCIADO,PANTALLA y CONSOLA, por ejemplo:	//
//								Para mostrar HTML, CSS y la salida de PANTALLA tendrá el valor 110010						//
//									---------------------------------------------------------								//
//									|HTML	|CSS	|JS	|ENUNCIADO	|PANTALLA	|CONSOLA	|								//
//									---------------------------------------------------------								//
//									|	1	|	1	|0	|	0		|	1		|	0		|								//
//									---------------------------------------------------------								//
//																															//
// 						 	QueryString.modee = "js"; Muestra los paneles html y js.										//
//  						QueryString.mode = "css"; Muestra los paneles html y css.										//
//																															//
// Ejemplo de get típico:																									// 
//																															//
//	http://localhost/jsandbox/index.html?iframe=0&ud=1&ex=1&mode=demo&runload=1&liveserver=1&view=1&dark=1&panels=111010	//	
//	https://javierrojascomercio.github.io/jsandbox/index.html?iframe=0&ud=1&ex=1&mode=demo&runload=1&liveserver=1&view=1&dark=1&panels=111010
//																															//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LA CONSTANTE CONFIG:																										//
// Todos los parámetros enviados por get y almacenados en QueryString se vuelcan a CONFIG ////////////////////////////////////
CONFIG = QueryString;																									//
// Todos los parámetros de configuración están encapsulados en el objeto CONFIG. Si necesitas algún dato, ESTÁ AQUÍ.		//
//																															//
// Nombres de los paneles para poder añadir eventos y atributos mediante un foreach y no repertir 6 veces el mismo código	//
CONFIG.nombreToggles = ["#switch-html", "#switch-css", "#switch-js", "#switch-text", "#switch-out", "#switch-dev"];			//
CONFIG.nombrePaneles = ["#htmlPanel", "#cssPanel", "#jsPanel", "#textPanel", "#outputPanel", "#devPanel"];					//
//																															//
// Configuraciones de estilo para los editores de código																	//
CONFIG.EditorTema = "one_dark";																								//
CONFIG.EditorColorFondo = "#333";																							//
//																															//
// Antes que nada comprobamos que QueryString esté bien formado, mostramos el tutorial con parámetros por defecto.			//
// También estaría bien comrpobar que:																						//
//	-no se introduce un número de unidad o ejemplo inexistente o que el modo... 											//
//	-o cualquier otra variable tienen valores correctos.																	//
// pero esto solo producirá errores 404 al no poder acceder al recurso, por lo que son asumibles.							//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (

	QueryString.iframe === undefined || QueryString.iframe == "" ||
	QueryString.ud === undefined || QueryString.ud == "" ||
	QueryString.ex === undefined || QueryString.ex == "" ||
	QueryString.mode === undefined || QueryString.mode == "" ||
	QueryString.runload === undefined || QueryString.runload == "" ||
	QueryString.liveserver === undefined || QueryString.liveserver == "" ||
	QueryString.view === undefined || QueryString.view == "" ||
	QueryString.dark === undefined || QueryString.dark == "" ||
	QueryString.panels === undefined || QueryString.panels == "" ||
	QueryString.panels.length != 6) {

	CONFIG.iframe = "0";
	CONFIG.ud = "0";
	CONFIG.ex = "0";
	CONFIG.mode = "demo";
	CONFIG.runload = "0";
	CONFIG.liveserver = "1";
	CONFIG.view = "1";
	CONFIG.dark = "1";
	CONFIG.panels = ["1", "1", "1", "1", "1", "1"];
	CONFIG.panelsCode = ["1", "1", "1"];
	CONFIG.numPanelsCode = 3;
	CONFIG.panelsOut = ["1", "1", "1"];
	CONFIG.numPanelsOut = 3;
	CONFIG.url = window.location.href;
	CONFIG.textoIframe =
		"<iframe width='100%' height='500px'\n src='" +
		CONFIG.url + "'\n" +
		" frameborder='0' \n allowfullscreen='allowfullscreen'>\n</iframe>";

} else {

	CONFIG.panels = QueryString.panels.split('');
	CONFIG.panelsCode = CONFIG.panels.slice(0, 3);
	CONFIG.numPanelsCode = CONFIG.panelsCode.filter(x => x == "1").length;
	CONFIG.panelsOut = CONFIG.panels.slice(3, 6);
	CONFIG.numPanelsOut = CONFIG.panelsOut.filter(x => x == "1").length;
	CONFIG.url = window.location.href;
	CONFIG.textoIframe =
		"<iframe width='100%' height='500px'\n src='" +
		CONFIG.url.replace('iframe=0&', 'iframe=1&') + "'\n" +
		" frameborder='0' \n allowfullscreen='allowfullscreen'>\n</iframe>";

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INICIALIZACIÓN DE TODOS LOS PANELES A PARTIR DE :																		//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//		- CONFIG que almacena los parámetros GET y todas las configuracione.												//
// 		- LOS ARCHIVOS menu.json, doc.html style.css script.js Y statement.txt												//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Estas variables almacenan en todo momento lo que se ha escrito en cada panel.											//
// Al cargar la página se rellenan a partir de archivos de la ruta "examples/ud-/ex-", 										//
// donde - es el número de ud y de ex, que se reciben como parámetos GET y quedan almacenados en CONFIG						//
//  - editorHTML se rellena con "doc.html"																					//
//  - editorCSS se rellena con "style.css"																					//
//  - editorJS se rellena con "script.js"																					//
//	- editorTXT se rellena con "statement.txt"																				//	
//  - editorDEV se rellena a partir de las salidas de consola capturadas por "js/tools/console.js"							//	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var editorHTML;
var editorCSS;
var editorJS;
var editorTEXT;
var editorDEV;
var textoConsola = "Mensajes de CONSOLA:\n>\n";

$(document).ready(function () {

	// Inicializamos las variables globales del iframe con el resultado el código.
	$('.grid').height($(window).height());
	const contents = $('iframe').contents();
	const body = contents.find('body');
	const head = contents.find('head');
	//Añadimos fontawesome para los ejercicios que lo usan:
	head.html('<link rel="stylesheet" href="plugins/fontawesome/font-awesome.min.css">');
	const styleTag = $('<style></style>').appendTo(head);

	// Cargamos los archivos desde la ruta indicada por los parámetros GET.
	// La varialbe QueryString almacena los parámetros que se hayan recibido mediante GET.

	// Pedimos el archivo 'examples/menu.json' que almacena el número y la descripción de cada ejemplo.
	$(() => {
		$.ajax({
			url: 'examples/menu.json',
			type: 'GET',
			async: true,
			success: (respuesta) => {
				// Rellemanos el menú 
				respuesta['menu'].ud.forEach(unidad => {
					let unidadTxt = "UD " + unidad.numero + ". " + unidad.titulo;
					$("#menu").append("<li><h3>" + unidadTxt + "</h3></li>");

					unidad.ejemplos.ej.forEach(ejemplo => {

						let enlaceEjemplo = "<li><a href='index.html?"
							+ "iframe=" + CONFIG.iframe + "&"
							+ "ud=" + unidad.numero + "&"
							+ "ex=" + ejemplo.numero + "&"
							+ "mode=" + CONFIG.mode + "&"
							+ "runload=" + CONFIG.runload + "&"
							+ "liveserver=" + CONFIG.liveserver + "&"
							+ "view=" + CONFIG.view + "&"
							+ "dark=" + CONFIG.dark + "&"
							+ "panels=" + CONFIG.panels.join('')
							+ "'><i class='fa fa-chevron-right' aria-hidden='true'></i>"
							+ "EJ" + ejemplo.numero + ": " + ejemplo.info + "</a></li>";

						$("#menu").append(enlaceEjemplo);
					});
				});
				// Rellemanos el info-panel
				// Recogemos el info del ejemplo concreto
				let infoTxt;
				let info;
				//Si es el tutorial se muesta el título literal
				if (CONFIG.ud == "0") {
					info = "<p id='info'>TUTORIAL </p>";
					//Si es cualquier otro ejemplo se muestran sus datos obtenidos del archivo 'examples/menu.json'.
				} else {
					infoTxt = "UD" + CONFIG.ud + " EJ" + CONFIG.ex + "</p><p> ";
					infoTxt += respuesta['menu'].ud[parseInt(CONFIG.ud) - 1].ejemplos.ej[parseInt(CONFIG.ex) - 1].info;
					info =
						"<p id ='info'>" + infoTxt + "</p>";
				}

				$("#info-panel").append(info);
			}
		});
	});


	// Rellenamos los paneles a partir de archivos de la ruta "examples/ud-/ex-", donde - es el número de ud y de ex

	//  editorHTML se rellena con "doc.html"
	$(() => {
		$.ajax({
			url: 'examples/ud' + CONFIG.ud + '/ex' + CONFIG.ex + '/doc.html',
			type: 'GET',
			async: true,
			success: (respuesta) => {
				// Rellemanos el editor html de ACE.
				$("#html").text(respuesta);
				// Inicializamos el editor html de ACE.
				editorHTML = ace.edit("html");
				editorHTML.setTheme("ace/theme/" + CONFIG.EditorTema);
				editorHTML.getSession().setMode("ace/mode/html");
				editorHTML.container.style.background = CONFIG.EditorColorFondo;
				editorHTML.setShowFoldWidgets(false);
				editorHTML.container.style.height
			}
		});
	});

	//  editorCSS se rellena con "style.css"
	$(() => {
		$.ajax({
			url: 'examples/ud' + CONFIG.ud + '/ex' + CONFIG.ex + '/style.css',
			type: 'GET',
			async: true,
			success: (respuesta) => {
				// Rellemanos el editor css de ACE.
				$("#css").text(respuesta);
				// Inicializamos el editor css de ACE.
				editorCSS = ace.edit("css");
				editorCSS.setTheme("ace/theme/" + CONFIG.EditorTema);
				editorCSS.getSession().setMode("ace/mode/css");
				editorCSS.container.style.background = CONFIG.EditorColorFondo;
				editorCSS.setShowFoldWidgets(false);
			}
		});
	});

	//  editorJS se rellena con "script.js"
	$(() => {
		$.ajax({
			url: 'examples/ud' + CONFIG.ud + '/ex' + CONFIG.ex + '/script.js',
			type: 'GET',
			async: true,
			success: (respuesta) => {
				// Rellemanos el editor js de ACE.
				$("#js").text(respuesta);
				// Inicializamos el editor js de ACE.
				editorJS = ace.edit("js");
				editorJS.setTheme("ace/theme/" + CONFIG.EditorTema);
				editorJS.getSession().setMode("ace/mode/javascript");
				editorJS.container.style.background = CONFIG.EditorColorFondo;
				editorJS.setShowFoldWidgets(false);
			}
		});
	});
	//  editorTXT se rellena con "statement.txt"
	$(() => {
		$.ajax({
			url: 'examples/ud' + CONFIG.ud + '/ex' + CONFIG.ex + '/statement.txt',
			type: 'GET',
			async: true,
			success: (respuesta) => {
				// Rellemanos el editor text de ACE.
				$("#text").text(respuesta);
				// Inicializamos el editor text de ACE.
				editorTEXT = ace.edit("text");
				editorTEXT.setTheme("ace/theme/" + CONFIG.EditorTema);
				editorTEXT.getSession().setMode("ace/mode/text");
				editorTEXT.container.style.background = CONFIG.EditorColorFondo;
				editorTEXT.setShowFoldWidgets(false);
				editorTEXT.setReadOnly(true);
				editorTEXT.renderer.setOption('showLineNumbers', false);
				editorTEXT.$blockScrolling = Infinity;
				editorTEXT.setValue(respuesta);
			}
		});
	});

	// Rellemanos el editor dev de ACE. Representa la consola, no es editable ni muestra números de línea.
	//  No se inicializa cargando un archivo, como los anteriores, sino que lo hace
	//  a partir de las salidas de consola capturadas por "js/tools/console.js".
	// Inicializamos el editor js de ACE.
	editorDEV = ace.edit("dev");
	editorDEV.setTheme("ace/theme/" + CONFIG.EditorTema);
	editorDEV.getSession().setMode("ace/mode/text");
	editorDEV.container.style.background = CONFIG.EditorColorFondo;
	editorDEV.setShowFoldWidgets(false);
	editorDEV.setReadOnly(true);
	editorDEV.renderer.setOption('showLineNumbers', false);
	editorDEV.$blockScrolling = Infinity;
	editorDEV.setValue(textoConsola);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ASIGNACIÓN DE TODOS LOS EVENTOS:																						//
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Aplicamos el HTML, el CSS y el JS al iframe cuando el usuario pulsa RUN.
	$("#run").click(function () {
		body.html(editorHTML.getValue());
		styleTag.text(editorCSS.getValue());
		// Se incluye jquery también para que funcionen los ejemplos que lo usan.
		let scriptjQueryTagBody = $('<script src="js/tools/jquery-3.6.0.min.js">').appendTo(body);
		let scriptTagBody = $('<script>').appendTo(body);

		// Si hay un error lo capturamos para mostrarlo también en la consola.

		//--------------------------------------------------------------------------------------------------//
		// * BUG REPORTADO: solo muestra console.log al cargar el documento. No se actualiza con RUN.		//
		// * No muestra los errores. Por ahora con eso es suficiente para el usuario objetivo.				//
		// * Si estás leyendo esto puedes empezar por intentar arreglarlo, a mi no me apetece ahora mismo.	//
		//--------------------------------------------------------------------------------------------------// 

		textoConsola = textoConsola + "nuevo" + "\n";
		editorDEV.setValue(textoConsola);
		//console.log("try {\n" + editorJS.getValue() + " \n} catch(err) { \n console.log(err);\n}");
		scriptTagBody.text("try {\n" + editorJS.getValue() + " \n} catch(err) { \n console.error(err);\n}");

		//--------------------------------------------------------------------------------------------------//
	});

	// Visualización dinámica de cambios. Aplicamos el HTML, el CSS cuando pulsamos una tecla en el div html y css.
	$('#html, #css, #js').keyup(function () {
		// Si está activada la opción de liveserver en la configuración:
		if (CONFIG.liveserver == "1") {
			var $this = $(this);

			if ($this.attr('id') === 'html') {
				body.html(editorHTML.getValue());
				let scriptTagBody = $('<script>').appendTo(body);
				scriptTagBody.text(editorJS.getValue());
			}
			if ($this.attr('id') === 'css') {
				styleTag.text(editorCSS.getValue());
			}
			// con js no lo hacemos porque se inudaría la consola de mensajes de error con cada keyup, 
			// con js el usuario debe pulsar RUN.
		}
	});

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ASIGNACIÓN DE TODOS EVENTOS CLIC EN LOS BOTONES:																						//
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$("#config").click(function () {
		$("#modal_container").addClass("show");
		$("#modal_container").css('zIndex', 999);
		$("#close").focus();
	});

	$("#close").click(function () {
		$("#modal_container").removeClass("show");
		$("#modal_container").css('zIndex', -999);
	});

	$(".modal-close").click(function (e) {
		if (e.target !== this) {
			return;
		}
		else {
			$("#modal_container").removeClass("show");
			$("#modal_container").css('zIndex', -999);
		}
	});

	$("#reset").click(function () {
		alert("Falta de implementar, primero hay que gestrionar las cookies");
	});

	$("#runload").click(function () {
		let url = CONFIG.url;
		if (CONFIG.runload == "0") {
			url = url.replace('runload=0&', 'runload=1&')
		} else {
			url = url.replace('runload=1&', 'runload=0&')
		}
		window.location.href = url;
	});

	$("#liveserver").click(function () {
		let url = CONFIG.url;
		if (CONFIG.liveserver == "0") {
			url = url.replace('liveserver=0&', 'liveserver=1&')
		} else {
			url = url.replace('liveserver=1&', 'liveserver=0&')
		}
		window.location.href = url;
	});

	$("#test").click(function () {

		alert("Falta de implementar, primero hay que hacer modal de preview del ejericicio y no cargar css ni el js");

		let url = CONFIG.url;
		if (CONFIG.mode == "demo") {
			url = url.replace('mode=demo&', 'mode=test&')
		} else {
			url = url.replace('mode=test&', 'mode=demo&')
		}
		window.location.href = url;
	});

	$("#dark").click(function () {

		alert("Falta de implementar, primero hay que hacer todos los estilos claros");

		let url = CONFIG.url;
		if (CONFIG.dark == "0") {
			url = url.replace('dark=0&', 'dark=1&')
		} else {
			url = url.replace('dark=1&', 'dark=0&')
		}
		window.location.href = url;
	});

	$("#view").click(function () {

		alert("Falta de implementar, primero hay que hacer todos los estilos horizontales");

		let url = CONFIG.url;
		if (CONFIG.view == "0") {

			url = url.replace('view=0&', 'view=1&')
		} else {
			url = url.replace('view=1&', 'view=0&')
		}
		window.location.href = url;
	});

	$("#iframe").click(function () {
		var $bridge = $("<input>")
		$("body").append($bridge);
		$bridge.val($("#iframecode").text()
			.replace('12345', '')  //esto es una pequeña ñapa por el formato en el que davuelve el textoel editor Ace.
			.replace('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', ''))	// esto también.
			.select();
		document.execCommand("copy");
		$bridge.remove();

		$("#text-copy-iframe").text("¡Copiado!");
		setTimeout(function () {
			$("#text-copy-iframe").text("Clic en el botón para copiar el código html para incrustar el iframe")
		}, 500);
	});

	$("#go-to-web").click(function () {
		CONFIG.url = CONFIG.url.replace('iframe=1&', 'iframe=0&');
		window.open(CONFIG.url);
	});

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ASIGNACIÓN DE TODOS LOS TECLADO:																						//
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$(document).bind('keydown', function (e) {
		if (e.which == 27) {
			$("#run").focus();
			$("#close").click();
		};
	})

	$(".button , .float-button").keypress(function (event) {
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			event.target.click();
		}
	});















	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FUNCIONES PARA REDIMENSIONAR LOS PANELES:																			//
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// La función setHeightPanelsOnLoad cambia el alto de los paneles en función de cuantos hay visibles.					//
	//	-Si hay un panel activo, se le da la clase panelL(100% de altura) 													//
	//		y se ocultan los otros dos con la clase panel0(0px de altura)													//
	//	-Si hay dos paneles activos, se les da la clase panelM (50% de altura) y se oculta el otro.							//
	//	-Si hay tres paneles activos, se les da la clase panelS (33% de altura) para que quepan todos.						//
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function setHeightPanelsOnLoad() {

		let panelesPorLado;

		for (let index = 0; index < CONFIG.nombrePaneles.length; index++) {

			if (CONFIG.panels[index] == '1') {
				$(CONFIG.nombrePaneles[index]).removeClass("panelL");
				$(CONFIG.nombrePaneles[index]).removeClass("panelM");
				$(CONFIG.nombrePaneles[index]).removeClass("panelS");
				$(CONFIG.nombrePaneles[index]).removeClass("panel0");

				if (index < 3) {
					panelesPorLado = CONFIG.numPanelsCode;
				} else {
					panelesPorLado = CONFIG.numPanelsOut;
				}

				switch (panelesPorLado) {
					case 1:
						$(CONFIG.nombrePaneles[index]).removeAttr("style");
						$(CONFIG.nombrePaneles[index]).addClass("panelL");
						$(CONFIG.nombrePaneles[index]).css("height: calc((100% - 72px) - 48px);");
						break;
					case 2:
						$(CONFIG.nombrePaneles[index]).removeAttr("style");
						$(CONFIG.nombrePaneles[index]).addClass("panelM");
						$(CONFIG.nombrePaneles[index]).css("height: calc((100% - 72px) - 48px);");
						break;
					case 3:
						$(CONFIG.nombrePaneles[index]).removeAttr("style");
						$(CONFIG.nombrePaneles[index]).addClass("panelS");
						$(CONFIG.nombrePaneles[index]).css("height: calc((100% - 72px) - 48px);");
						break;
				}

			} else {
				$(CONFIG.nombrePaneles[index]).removeClass("panelL");
				$(CONFIG.nombrePaneles[index]).removeClass("panelM");
				$(CONFIG.nombrePaneles[index]).removeClass("panelS");
				$(CONFIG.nombrePaneles[index]).removeClass("panel0");
				$(CONFIG.nombrePaneles[index]).addClass("panel0");
				$(CONFIG.nombrePaneles[index]).removeAttr("style");
				$(CONFIG.nombrePaneles[index]).css("height: height: 0px;");
			}
		}

		// Ajustamos la altura si estamos en el modo iframe
		if (CONFIG.iframe == "1") {

			$(".panelL").css({ height: 'calc(((100%)) - 66px' });
			$(".panelM").css({ height: 'calc(((100%) / 2) - 32px' });
			$(".panelS").css({ height: 'calc(((100%) / 3) - 20px' });
	
		}
	};

	// setHeightPanels() se debe llamar siempre que se quiera actualizar el tamaño de los paneles
	function setHeightPanels() {
		setHeightPanelsOnLoad();
		// En Ace Editor es nesario reescalar los editores para que se adapten al nuevo tamaño de su div.
		// Si no se hace cambia su tamaño pero no el tamaño de lo que muestra, por lo que corta líneas de código.
		editorHTML.resize();
		editorCSS.resize();
		editorJS.resize();
		editorTEXT.resize();
		editorDEV.resize();
	};

	// Mostrar y ocultar los paneles en función de los toggler.

	// Evento clic en el toggler de cada panel
	for (let index = 0; index < CONFIG.nombrePaneles.length; index++) {
		$(CONFIG.nombreToggles[index]).click(function () {
			//Si son los paneles de código
			if (index < 3) {
				if (CONFIG.panelsCode[index] == '1') {
					CONFIG.panelsCode[index] = '0';
					CONFIG.numPanelsCode--;
					CONFIG.panels[index] = '0';

				} else {
					CONFIG.panelsCode[index] = '1';
					CONFIG.numPanelsCode++;
					CONFIG.panels[index] = '1';

				}
				//Si son los paneles de salida
			} else {
				let numPanelOut = index - 3;
				if (CONFIG.panelsOut[numPanelOut] == '1') {
					CONFIG.panelsOut[numPanelOut] = '0';
					CONFIG.numPanelsOut--;
					CONFIG.panels[index] = '0';

				} else {
					CONFIG.panelsOut[numPanelOut] = '1';
					CONFIG.numPanelsOut++;
					CONFIG.panels[index] = '1';

				}
			}
			setHeightPanels();
		});
	}

	setHeightPanelsOnLoad();

	if (CONFIG.runload == "0") {
		$("#runload").addClass("button-disable");
		$("#text-runload").text("Activa ejecutar el código al cargar la página");
	} else {
		$("#runload").removeClass("button-disable");
		$("#text-runload").text("Desactiva ejecutar el código al cargar la página");
		setTimeout(function () {
			$("#run").trigger("click");
		}, 1000);
	}

	if (CONFIG.liveserver == "0") {
		$("#liveserver").addClass("button-disable");
		$("#text-liveserver").text("Activa Live Server");
	} else {
		$("#liveserver").removeClass("button-disable");
		$("#text-liveserver").text("Desctiva Live Server");
	}

	if (CONFIG.mode == "demo") {
		$("#test").addClass("button-disable");
		$("#text-test").text("Activa Modo ejericicio");
	} else {
		$("#test").removeClass("button-disable");
		$("#text-test").text("Desctiva Modo ejericicio");
	}

	if (CONFIG.dark == "0") {
		$("#dark").addClass("button-disable");
		$("#text-dark").text("Activa Modo oscuro");
	} else {
		$("#dark").removeClass("button-disable");
		$("#text-dark").text("Desctiva Modo oscuro");
	}

	if (CONFIG.view == "0") {
		$("#view").addClass("button-disable");
		$("#text-view").text("Activa Vista vertical");
	} else {
		$("#view").removeClass("button-disable");
		$("#text-view").text("Desctiva Vista vertical");
	}

	var editorIFRAME;
	$("#iframecode").text(CONFIG.textoIframe);
	// Inicializamos el editor html de ACE.
	editorIFRAME = ace.edit("iframecode");
	editorIFRAME.setTheme("ace/theme/" + CONFIG.EditorTema);
	editorIFRAME.getSession().setMode("ace/mode/html");
	editorIFRAME.container.style.background = CONFIG.EditorColorFondo;
	editorIFRAME.setShowFoldWidgets(false);
	editorIFRAME.container.style.height

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	CONFIG.iframe		bit que determina si al cargar se en modo iframe: sin <header>	y un botón para maximizar		//
	//							0-> muestra el <header>.																	//
	//							1-> oculta el <header> y muestra le botón #go-to-web.										//
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	if (CONFIG.iframe == "1") {

		$("#go-to-web").show();
		$("header").hide();
		$(".container").css("margin-top", "0px");

		$(".panelL").css({ height: 'calc(((100%)) - 66px' });
		$(".panelM").css({ height: 'calc(((100%) / 2) - 32px' });
		$(".panelS").css({ height: 'calc(((100%) / 3) - 20px' });

	} else {
		$("#go-to-web").hide();
		$("header").show();
		$(".container").css("margin-top", "52px");

	}




	// TO DO
	alert(
	"POR HACER:_________________________________________________________________\n"
	+"Formatear el menú: bonito, tabindex, anterior, siguiente y tutorial \n "
	+"ancho mínimo de 600px, si es más no se ajusta más \n "
	+"botón mostrar solo paneles de código o solo resultados --> y <-- \n "
	+"que en todos los ACE editor rompa linea en lugar de scroll horizontal \n "
	+"botón modo impresión \n "
	+"funciones de botones de opciones \n "
	+"ancho mínimo de 600px, si es más no se ajusta más \n "
	)
});