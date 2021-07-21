import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";
import {check} from "meteor/check";

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://namorenoe:nicolas@1@cluster0.0tkz0.mongodb.net/votaciones?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

export const Voters = new Mongo.Collection("voters");

if(Meteor.isServer){
    Meteor.publish("voters",()=>{
        return Voters.find();
    });
}


Meteor.methods({
    'voters.insert'(voterID,votingSite,candidate){
        check(voterID,String);
        check(votingSite,String);
        check(candidate,String);

        Voters.insert({
            voterID: voterID,
            votingSite: votingSite,
            candidate: candidate,
            date: new Date().getTime()
        },(err)=>{
            if(err) console.log(err);
            console.log("INSERT SUCCESS");
        });
    },
    'voters.remove'(voterID){
        check(voterID,String);
        Voters.remove({voterID:voterID},(err)=>{
            if(err) console.log(err);
            console.log("DELETE SUCCESS");
        });
    }
});