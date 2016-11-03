//console.log("Inside Collections");

Users = new Mongo.Collection('userCollection');
Gossips = new Mongo.Collection('gossips');
GossipUsers = new Mongo.Collection('gossipUsers');

//GossipCollection.insert({name:"sitar", city:"Ankara", school:"Bilkent", employer:"", createdAt: new Date()});
//GossipCollection.insert({name:"testN", city:"testC", school:"testS", employer:"testE", createdAt: new Date()});
//console.log(GossipCollection.find().count());

//var findGossip = GossipCollection.find({});
//console.log(findGossip.count());
//console.log(GossipCollection.findOne({city:"Ankara"}));
