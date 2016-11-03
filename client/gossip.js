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
Meteor.subscribe('allGossips');
Meteor.subscribe('allGossipUsers');
Meteor.subscribe('singleUser');
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
				Session.set('uSurname', uSurname);
				Session.set('city', city);
				Session.set('school', school);
				Session.set('employer', employer);
				
				if (Session.get('uName') != "" || Session.get('uSurname') != "" || Session.get('city') != "" ||
					Session.get('school') != "" || Session.get('employer') != "")
					Session.set('emptyFlag', false);
				else
					Session.set('emptyFlag', true);
					
				Router.go('gossipUsers');
           } else if ($(e.target).prop("id") == "clear") {
			 	// clear input values
			   	console.log("clear");
			   	t.find("form").reset();
           }
       }
});

/*
Template.home.events({
    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err){
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
*/

Template.sidebar1.events({
   	'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    }
});

Template.sidebar1.helpers({
	returnProfilePicture: function () {
		//check(user_id, String);
	 	return "http://graph.facebook.com/" + Meteor.user().profile.facebookId + "/picture/?type=small";	
	},
	returnName: function() {
		//return this.profile.firstName;
		return Meteor.user().profile.firstName + " " + Meteor.user().profile.lastName;
	}	
});

Template.sidebar2.events({
    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
			else {
				console.log("FB login is successfull");
				//console.log("FB name is: " + currentUser.profile.name);
				// check if the current user is already in the Users collection.
				// If not, add to the collection, otherwise skip adding
				
				//Users.insert({fb_id: currentUser.services.facebook.id, admin: "n", createdAt: new Date()});
			}
        });
    }
});

Template.recentGossips.helpers({
    'gossips': function(){
		return Gossips.find({}, {sort: {createdAt: -1}, limit: 10});
    },
	'gossipUser': function() {
		var id = new Meteor.Collection.ObjectID(this.gossipUserId);
	    return GossipUsers.findOne(id);
	}
});

Template.recentGossips.events({
	'click .gossipHome': function(){
		var id = this.gossipUserId;
		Session.set('uId', id);
		console.log("You clicked a .gossipHome element:", id);
		Router.go('userGossips');
		// console.log("You clicked a .gossipUser element:" + this._id);
	}
});

Template.gossipUsers.helpers({
    'getGossips': function(){

		//return Users.find({name: {$regex : /s/i}}, {sort: {createdAt: -1}}); // finds all entries having s or S in name
		
		/*var query1 = Users.find({name: {$regex : ".*" + Session.get('uName') + ".*", $options: 'i' }}); 
		var query2 = query1.collection.find({surname: {$regex : ".*" + Session.get('uSurname') + ".*", $options: 'i' }}); 
		return query2;
		*/
		
		// if at least one field is not empty
		if (Session.get('emptyFlag') == false)
		{
			return GossipUsers.find({$and: [{name: {$regex : ".*" + Session.get('uName') + ".*", $options: 'i' }}, 
			{surname: {$regex : ".*" + Session.get('uSurname') + ".*", $options: 'i' }},
			{city: {$regex : ".*" + Session.get('city') + ".*", $options: 'i' }},
			{school: {$regex : ".*" + Session.get('school') + ".*", $options: 'i' }},
			{employer: {$regex : ".*" + Session.get('employer') + ".*", $options: 'i' }}
			]}, {sort: {createdAt: -1}});
		}
		else
			return;
    },
	'getInfo': function(){
		if (Session.get('emptyFlag') == true)
			return "Ama olmaz ki, bilgilerin hiçbirini girmemişsin ";
		else
			return Session.get('uName') + " için dedikodu yapılmamış, yapmak için buraya tıklayın:" ;
	}
});

Template.gossipUsers.events({
	'click .gossipUser': function(){
		var id = this._id;
		Session.set('uId', id._str);
		console.log("You clicked a .gossipUser element:", id);
		Router.go('userGossips');
		// console.log("You clicked a .gossipUser element:" + this._id);
	},
	'click #dedikodula': function(){
		console.log("You clicked dedikodula!");
		Router.go('gossipCreate');
	}
});

Template.userGossips.helpers({
	'getGossips': function(){
		return Gossips.find({gossipUserId: Session.get('uId')});
	},
	'getName': function(){
		var id = new Meteor.Collection.ObjectID(Session.get('uId'));
		var user = GossipUsers.findOne(id);
		return  user.name + " " + user.surname;
	}
});

Template.gossipsToMe.helpers({
	'getGossipsMe': function(){
		var vname = Meteor.user().profile.firstName;
		var vsurname = Meteor.user().profile.lastName;
		//var vlocation = "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/me?fields=id,gender,name,friends,location";
        //var result = Meteor.http.get('https://graph.facebook.com/v2.4/' + currentUser.services.facebook.id + '?access_token=' + currentUser.services.facebook.accessToken + '&fields=first_name, last_name, birthday, email, gender, location, link, friends');
		//console.log(result.data.first_name);
		var user = GossipUsers.findOne({$and: [{"name": {$regex: vname, $options: 'i'}}, {"surname": {$regex: vsurname, $options: 'i'}}]});
//		var id = new Meteor.Collection.ObjectID(this.gossipUserId);
		console.log("ID: " + user._id);
		console.log("gossips: " + Gossips.find({gossipUserId: user._id._str}));
		return Gossips.find({gossipUserId: user._id._str});
		
	},
	'getName': function(){
		var vname = Meteor.user().profile.firstName;
		var vsurname = Meteor.user().profile.lastName;
		return  vname + " " + vsurname;
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
		        console.log(result.data.friends);
		}
			*/	
	        //var result = Meteor.http.get('https://graph.facebook.com/v2.4/' + currentUser.services.facebook.id + '?access_token=' + currentUser.services.facebook.accessToken + '&fields=first_name, last_name, birthday, email, gender, location, link, friends');
	}
});
  