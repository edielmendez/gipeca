

$(document).ready(function(){
	$(".dropdown-button").dropdown();
	$(".button-collapse").sideNav({
		menuWidth: 200, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick:true
	});

	if((sessionStorage.getItem("vista")==="mensajes") || (sessionStorage.getItem("vista")==null) ) {
		$("#btnMensajes").addClass("z-depth-3 #e3f2fd blue lighten-5");
		$("#btnEquipo").removeClass("z-depth-3 #e3f2fd blue lighten-5");
	}else{
		$("#btnEquipo").addClass("z-depth-3 #e3f2fd blue lighten-5");
		$("#btnMensajes").removeClass("z-depth-3 #e3f2fd blue lighten-5");
	}




});

$(document).on('click',"#btnMensajes",function(){
	sessionStorage.setItem("vista","mensajes");
	$(this).addClass("z-depth-3 #e3f2fd blue lighten-5");
	$("#btnEquipo").removeClass("z-depth-3 #e3f2fd blue lighten-5");
});

$(document).on('click',"#btnEquipo",function(){
	sessionStorage.setItem("vista","equipo");
	$(this).addClass("z-depth-3 #e3f2fd blue lighten-5");
	$("#btnMensajes").removeClass("z-depth-3 #e3f2fd blue lighten-5");
});
$(document).on('click',"#btnCerrarSesion",function(){
	sessionStorage.removeItem("vista");
});
