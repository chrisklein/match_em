(function(){
	var FipGame, FlipGameController
	
	FlipGame = {
		init: function(){
			this.Controller = new FlipGameController;
			Backbone.history.start()
		}
	}
	
	this.FlipGame = FlipGame
	
	/**
	 * Game Models
	 */
	Card = Backbone.Model.extend({ });

	Deck = Backbone.Collection.extend({
		model: Card
	})
	
	
	/**
	 * Game Views
	 */
	
	
	/**
	 * Game Controller
	 */
	FlipGameController = Backbone.Router.extend({
		initialize: function( options ){
			// Code if we need it.
			},
			
		routes: {
			""   : "root"
			},	
			
		root: function(){
			console.log('hello world')
			}
	});	
	
}).call(this);	