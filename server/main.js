//import '../collections.js';

Meteor.publish('allUsers', function(){
        return Users.find({});
    })
	
Meteor.publish('allGossips', function(){
	    return Gossips.find({approved: "y"});
	})
	
Meteor.publish('allGossipUsers', function(){
		return GossipUsers.find({});
	})
/*	
Meteor.publish('singleUser', function(id){
		return FBUsers.find({});
	})
*/	
Meteor.publish('singleUser', function(id) {
    //check(id, String);

    return Meteor.users.find(id,
        {fields: {'profile.facebookId': 1, 'profile.name': 1, 'profile.firstName': 1, 'profile.link': 1}});
});
	
/*
// on the server
Meteor.publish('posts', function() {
    if(isAdmin(this.userId)){
        return Posts.find();
    }else{
      return Posts.find({flagged: false});
    }
});
*/

Accounts.onCreateUser(function(options, user) {
	// We still want the default hook's 'profile' behavior.
	if (options.profile) {
	    user.profile = options.profile;
	    user.profile.memberSince = new Date();

	    // Copy data from Facebook to user object
	    user.profile.facebookId = user.services.facebook.id;
	    user.profile.firstName = user.services.facebook.first_name;
		user.profile.lastName = user.services.facebook.last_name;
	    user.profile.email = user.services.facebook.email;
	    user.profile.link = user.services.facebook.link;
	}
	return user;
});
	
	
	