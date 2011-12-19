(function(){
	var FipGame, FlipGameController, Card, Deck, CardView
	
	FlipGame = {
		init: function(){
			this.Controller = new FlipGameController;
			Backbone.history.start()
		},
		
		flipped: 0
	}
	
	this.FlipGame = FlipGame
	
	
	/**
	 * Game Models
	 */
	Card = Backbone.Model.extend({ });

	Deck = Backbone.Collection.extend({	model: Card })
	
	
	/**
	 * Game Views
	 */
	CardView = Backbone.View.extend({
		tagName: 'div',
		
		initialize: function(options){
			_.bindAll(this, 'render');
			this.model.bind('change', this.render);
			},
		
		events: {
		 	'click': 'click'	
			},
		
		render: function(){
			$(this.el).empty()
			if( _.isEmpty(this.model.attributes) ){ this.remove() }
			else{ this.model.get('flipped') ? this.face_up() : this.face_down() }
			return this
			},
		
		face_down: function(){
			$(this.el).append( '<span class="card-back"></span>' )
			},
			
		face_up: function(){
			$(this.el).append( '<span class="'+this.model.get('name')+'"></span>' )
			},	
		
		click: function(){
			if( !this.model.flipped ){ this.model.set({'flipped': true}); ++FlipGame.flipped }
			this.render()
			FlipGame.Controller.check_count()
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
				{name: 'moe',   flipped: false},
				{name: 'larry', flipped: false},
				{name: 'larry', flipped: false},
				{name: 'curly', flipped: false},
				{name: 'moe',   flipped: false},				
				{name: 'curly', flipped: false}
				])
			
			$("td").each(function (i) {  
				var card = Deck.at(i)
				var card_view = new CardView({ model: card })     
				$(this).append( card_view.render().el )       	
				})
			
			},
			
		check_count: function(){
			if(FlipGame.flipped %2 == 0){ var t=setTimeout("FlipGame.Controller.check_match()",1000); }
			},
			
		check_match: function(){
			var flipped_cards = Deck.filter(function(card){ return card.get('flipped') == true })
			if(flipped_cards[0].get('name') == flipped_cards[1].get('name')){_(flipped_cards).each(function(card){ card.clear() }) }
			else{ _(flipped_cards).each(function(card){ card.set({ 'flipped': false }); FlipGame.flipped = FlipGame.flipped - 1 }) }
			if(Deck.all(function(card){ return _.isEmpty(card.attributes) })){ this.end_game() }
			},
			
		end_game: function(){
			$('#cards-wrapper').empty().append('<div id="invitation"><span>Wow, you have a geate memory!<span></div>')
			}
	});	
	
	
}).call(this);	