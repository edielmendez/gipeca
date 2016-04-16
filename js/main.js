$(function(){

	var ref = new Firebase("https://gipeca.firebaseio.com");
	var data = {};
	var vista = "mensajes";
	var user = {};
	var timeLineView = null;
	var teamView = null;


	/**
	 * Routes
	 */
	
	/**
	 * fin de routes
	 */

	/**
	Modelo de mensajes
	**/
	var Message = Backbone.Model.extend({
		defaults: { 
			title: "Empty message",
			platform: "Twitter",
			action: "Post",
			instructions: "Post this to Twitter." 
		}
	});

	var User = Backbone.Model.extend({
		defaults:{
			id: "0",
			username : "sin username",
			mensajes : [],
			membersTeam: []
		}
	});

	/**
	Colleccion de mensajes que el usuario actual ha recibido
	**/
	var TimeLine = Backbone.Collection.extend({
		model:Message
	});
	
	

	/**
	Vista de inicio para el login con Twitter
	**/
	var AppView = Backbone.View.extend({
		el: $("#content"),

		template: _.template($("#principal-view").html()),

		events:{
			"click #btnCerrarSesion":"logout",
			"click #btnEquipo":"cargarEquipo",
			"click #btnMensajes":"cargarTimeLine"
		},

		render: function(){
			$("body").attr("bgcolor","white");
			 $(this.el).html(this.template(this.model.toJSON()));
			 //console.log("sessionStorage : "+sessionStorage.getItem("vista"))
			
			//this.$el.html($("#principal-view").html());
			/*
			ref.child("messages").child(user.root).on("value", function(payload){
				timeLineView.addMessage(payload.val());
			});

			return this;*/
		},
		logout: function(){
			ref.unauth();
			document.getElementById("content-general").innerHTML = "";
		
			/*
			var timeline = new TimeLineView();
			console.log(timeline);*/
			var salir = new LoginView();
			salir.render();
		},
		cargarEquipo: function(){
			var equipo = new EquipoView();
			equipo.render();
		},
		cargarTimeLine: function(){

			var timeline = new TimeLineView();
			timeline.render();

		}
		/*
		events: {
			"click #logoutButton": "logout",
			"click #teamButton": "drawTeamView",
			"click #homeButton": "drawTimeLine"
		},
		
		initialize: function(){
			data = ref.getAuth();

			if (data) {
				this.login();
			} else {	
				var _this = this;		
				ref.authWithOAuthPopup("twitter", function(error, authData) {
					if (error) {
						console.log("Login Failed!", error);
					} else {
						console.log(authData);
						data = authData;
						_this.login();
					}
				});
			}
		},

		login: function(){
			ref.authWithOAuthPopup("twitter", function(error, authData) {
				if (error) {
					console.log("Login Failed!", error);
				} else {
					console.log(authData);
					data = authData;
					//_this.login();
					console.log(data);
				}
			});
			/*
			var _this = this;
			ref.child("users").child(data.uid).once("value", function(payload){
				user = payload.val();
				_this.drawTimeLine();
			}, function(errorObject){
				console.log("User doesn't exist.");
				ref.unauth();
			});
		},

		logout: function(){
			ref.unauth();
		},

		drawTimeLine: function(){
			timeLineView = new TimeLineView();
			timeLineView.render();
		},

		drawTeamView: function(){	
			teamView = new TeamView();		
			teamView.render();
		}*/

	});

	var LoginView = Backbone.View.extend({
		el:$("#content"),

		events:{
			"click #btnLoginTwitter":"login"
		},

		render : function(){
			var authData = ref.getAuth();
			if (authData) {
			  console.log("Authenticated user with uid:", authData);
			  var usuarioActual = new User({id:authData.twitter.id,username:authData.twitter.username});
			  var app = new AppView({model:usuarioActual});
			  if( (sessionStorage.getItem("vista")=="mensajes") || ((sessionStorage.getItem("vista")==null) )){
			  	var timeline = new TimeLineView();
			  	timeline.render();
			  }else{
			  	var equipo = new EquipoView();
			  	equipo.render();
			  }
			  console.log(sessionStorage.getItem("vista"));
			  
			  

			  app.render();
			}else{
				console.log("ahora "+authData);
				console.log("No Authenticated");
				$("body").attr("bgcolor","4099FF");
		
				this.$el.html($("#login-view").html());
				
			
			}
			/*
			ref.onAuth(function(authData) {

				if (authData) {
				    console.log("Authenticated with uid:", authData.uid);
				    var app = new AppView();
				    app.render();
			    } else {
				    console.log("Client unauthenticated.")
				    this.$el.html($("#login-view").html());
				}
			});*/
			
			
		},
		login : function(){
		
			ref.authWithOAuthPopup("twitter", function(error, authData) {
				if (error) {
					console.log("Login Failed!", error);
				} else {
					console.log(authData);
					data = authData;
					var usuarioActual = new User({id:authData.twitter.id,username:authData.twitter.username});
			  		var app = new AppView({model:usuarioActual});
			  		app.render();
			  		var timeline = new TimeLineView();
					timeline.render();
					
			  		
				}
			});
		}
	});
	/**
	 *Vista del equipo
	 */
	var EquipoView = Backbone.View.extend({
		el:$("#content-general"),

		render : function(){
			this.$el.html($("#equipo-view").html());
			//$(this.el).appendTo(this.$el.html($("#equipo-view").html())).hide().fadeIn(1000).slideDown();
		}
	});

	/**
	 * Vista del TimeLine
	 */
	var TimeLineView = Backbone.View.extend({
		el:$("#content-general"),

		render : function(){
			this.$el.html($("#timeline-view").html());
			//$(this.el).appendTo(this.$el.html($("#timeline-view").html())).hide().fadeIn(1000).slideDown();
		}
	});

	/**
	 * Inicio de todo
	 */

	var login = new LoginView();

	login.render();



});