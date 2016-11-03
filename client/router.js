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

Router.route('/recentGossips', function () {
  this.render('recentGossips');
});

Router.route('/popularGossips', function () {
  this.render('popularGossips');
});

Router.route('/gossipUsers', function () {
  this.render('gossipUsers');
});

Router.route('/userGossips', function () {
  this.render('userGossips');
});

Router.route('/gossipsMade', function () {
  this.render('gossipsMade');
});

Router.route('/gossipsToMe', function () {
  this.render('gossipsToMe');
});

Router.route('/gossipCreate', function () {
  this.render('gossipCreate');
});

Router.route('/friends', function () {
  this.render('friends');
});