/*
Router.configure({
	layoutTemplate:'layout'
})

Router.map(function(){
	this.route('home', {path:'/'});
	this.route('messages', {path:'/messages'});
	this.route('friends', {path:'/friends'});
})
*/


Router.route('/', function () {
  this.render('home');
});

Router.route('/gossips', function () {
  this.render('gossips');
});

Router.route('/friends', function () {
  this.render('friends');
});