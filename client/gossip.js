/*
Template.friends.events({
    'click .goToRoom': function(e, t){
      console.log("You clicked");
      console.log(this);
      Meteor.Router.to('/rooms/' + this.id);
    }
 })
*/

//alert("Hello world1!");
//console.log("Inside gossip.js");

//import { GossipCollection } from '../collections.js';
//console.log(GossipCollection.findOne().name);

/*Meteor.subscribe('gossipCollection', function() {
  console.log(GossipCollection.find().count()); // 3
});
*/
Meteor.subscribe('allUsers');
//Meteor.subscribe('allGossips');
//SearchUser  = new Mongo.Collection(null);

/*
Template.sidebarMain.events({
	'click #searchButton': function(){
		// var findCollection = MyCollection.find({key1: "value 1..."}).fetch();
		//console.log(findGossip);
		Router.go('/gossips');
	}
}); */

Template.sidebarMain.events({
    'click input[type=submit]': function(e, t) {
           if ($(e.target).prop("id") == "search") {
			   // Search the input user's gossips
	   	    	e.preventDefault();
				//var name = $(e.target).prop("name");
				var uName = t.$("form input[name=name]").val();
				var uSurname = t.$("form input[name=surname]").val();
				var city = t.$("form input[name=city]").val();
				var school = t.$("form input[name=school]").val();
				var employer = t.$("form input[name=employer]").val();
				//SearchUser.drop();
				//SearchUser.insert({name: uName, city: city, school: school, employer: employer});
				Session.set('uName', uName);
				Session.set('uSurname', uName);
				Session.set('city', city);
				Session.set('school', school);
				Session.set('employer', employer);
				console.log(Session.get('uName'));
				Router.go('gossips');
           } else if ($(e.target).prop("id") == "clear") {
			 	// clear input values
			   	console.log("clear");
			   	t.find("form").reset();
           }
       }
});

Template.home.helpers({
    'gossipsRecent': function(){
		return Users.find({}, {sort: {createdAt: -1}, limit: 3});
		//var c = GossipCollection.findOne().name;
		//return 5;
    }
});

Template.gossips.helpers({
    'getGossips': function(){
		return Users.find({name: {$regex : ".*" + Session.get('uName') + ".*"}}, {sort: {createdAt: -1}});
		//var c = GossipCollection.findOne().name;
		//return 5;
    }
});

/*
Template.login.events({
    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({requestPermissions: ['email', 'public_profile', 'user_friends', 'user_likes']}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
    },
 
    'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    }
});

Template.login.helpers({
    returnProfilePicture: function(userId){
      return "http://graph.facebook.com/" + userId + "/picture/";
    }
  });
*/

/*
Template.myTemplate.helpers({
    returnProfilePicture: function(userId){
      return "http://graph.facebook.com/" + user_id + "/picture/";
    }
  });
*/
  
/* Template.sidebar1.helpers({
      activeIfTemplateIs: function (template) {
        var currentRoute = Router.current();
        return currentRoute &&
          template === currentRoute.lookupTemplate() ? 'active' : '';
      }
    });
*/
	

Template.friends.helpers({
    listFriends: function (userId) {
		GET /userId/permissions;
		//GET /v2.4/userId/friendlists HTTP/1.1;
		Host: graph.facebook.com;
    },
	
	returnFriends: function (user){
		/*if (currentUser.hasOwnProperty('services') && currentUser.services.hasOwnProperty('facebook')  ) {
		        var result = Meteor.http.get('https://graph.facebook.com/v2.4/' + currentUser.services.facebook.id + '?access_token=' + currentUser.services.facebook.accessToken + '&fields=first_name, last_name, birthday, email, gender, location, link, friends');

		        console.log(result.data.first_name);
		        console.log(result.data.last_name);
		        console.log(result.data.birthday);
		        console.log(result.data.email);
		        console.log(result.data.gender);
		        console.log(result.data.location);
		        console.log(result.data.link);
		        console.log(result.data.friends);
		}
			*/	
			console.log(user);
	        //var result = Meteor.http.get('https://graph.facebook.com/v2.4/' + currentUser.services.facebook.id + '?access_token=' + currentUser.services.facebook.accessToken + '&fields=first_name, last_name, birthday, email, gender, location, link, friends');
	        //console.log(result.data.first_name);
			console.log(user.services.facebook.id);
			console.log(user.services.facebook.accessToken);
			console.log(user.services.facebook.friends);
	}
})
  
/*
  All necessary methods are defined below.
*/
Meteor.methods({
  return_profile_picture: function (user_id) {
	 
	  check(user_id, String);
	/*

   if ( you want to throw an error ) {
      throw new Meteor.Error("pants-not-found", "Can't find my pants");
	  
    } */

    return "http://graph.facebook.com/" + user_id + "/picture/?type=large";
  },
  
  getGossips: function () {
	  //return GossipCollection.findOne({});
	  return 7;
  },

  bar: function () {
    // .. do other stuff ..
    return "baz";
  }
});
