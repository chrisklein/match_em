# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/
	
FlipGame =
  init: ->
    @Controller = new FlipGameController;
    Backbone.history.start()
	
  flipped: 0

@FlipGame = FlipGame


#
# Game Models
#

Card = Backbone.Model.extend
  initialize: ->

Deck = Backbone.Collection.extend model: Card


#
# Game Views
#

CardView = Backbone.View.extend
	tagName: 'div'
	
	initialize: (options)->
		_.bindAll(this, 'render')
		this.model.bind('change', this.render)
	
	events:
	 	'click': 'click'
	
	render: ->
		$(this.el).empty()
		if _.isEmpty this.model.attributes
	      this.remove()
		else
		  if this.model.get 'flipped' then this.face_up() else this.face_down()
		
		return this
	
	face_down: ->
		$(this.el).append( "<span class='card-back'></span>" )
		
	face_up: ->
		name = this.model.get 'name'
		$(this.el).append( "<span class='#{name}'></span>" )
	
	click: ->
		if !this.model.flipped
		  this.model.set 'flipped': true
		  ++FlipGame.flipped
		
		this.render()
		FlipGame.Controller.check_count()


#
# Game Controller
#

FlipGameController = Backbone.Router.extend
  
  routes:
    ""   : "root"	
  		
  root: ->
    Deck = new Deck _.shuffle Data
  		
    $('#cards-wrapper').find('.four').each (i)->
      card = Deck.at i
      card_view = new CardView model: card
      $(this).append card_view.render().el      	
  		
  check_count: ->
    if FlipGame.flipped %2 is 0
      $('#cards-wrapper').append('<div id="mask"></div>')
      t = setTimeout "FlipGame.Controller.check_match()", 1000
	
  check_match: ->
    flipped_cards = Deck.filter (card)-> card.get('flipped') is true 
  		
 	  if flipped_cards[0].get('name') is flipped_cards[1].get('name')
 	    _(flipped_cards).each (card)-> card.clear() 
 			
 	  else
 	    _(flipped_cards).each (card)-> 
 	      card.set 'flipped': false
 	      FlipGame.flipped = FlipGame.flipped - 1 
 	
    $('#mask').remove()
    game_over = Deck.all (card)-> _.isEmpty card.attributes
    if game_over then this.end_game()

  end_game: ->markup = '<div id="invitation"><div class="six columns"><span class="stoogies"></span></div><div class="six columns"><span>We are very impressed!  We\'ve got more.</span><a href="#" class="full-width button">Join Us</a></div></div>';$('#cards-wrapper').empty().append(markup)
		

Data = [
	{name: 'moe',   flipped: false},
	{name: 'larry', flipped: false},
	{name: 'larry', flipped: false},
	{name: 'curly', flipped: false},
	{name: 'moe',   flipped: false},				
	{name: 'curly', flipped: false}
]
	