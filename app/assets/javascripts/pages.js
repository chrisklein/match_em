(function(){
	var FipGame, FlipGameController, Card, Deck, CardView
	
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
	Card = Backbone.Model.extend({ 
	});

	Deck = Backbone.Collection.extend({
		model: Card
	})
	
	
	/**
	 * Game Views
	 */
	CardView = Backbone.View.extend({
		tagName: 'div',
		
		initialize: function(options){
		},
		
		events: {
		 'click span': 'click'	
			
		},
		
		render: function(){
			$(this.el).append( '<span>'+this.model.get('name')+'</span>' )
			return this
		},
		
		click: function(){
			alert(this.model.get('name'))
		}
	})	
	
	
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
			Deck = new Deck([
				{name: 'Moe',   flipped: false},
				{name: 'Larry', flipped: false},
				{name: 'Larry', flipped: false},
				{name: 'Curly', flipped: false},
				{name: 'Moe',   flipped: false},				
				{name: 'Curly', flipped: false}
				])

			
			$("td").each(function (i) {  
				var card_view = new CardView({ model: Deck.at(i) })     
				$(this).append(  card_view.render().el    )       	
				})
			
			}
	});	
	
	
}).call(this);	