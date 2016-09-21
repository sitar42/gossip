//import '../collections.js';

Meteor.publish('allUsers', function(){
        return Users.find({});
    })