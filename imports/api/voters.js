import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";
import {check} from "meteor/check";

export const Voters = new Mongo.Collection("voters");

if(Meteor.isServer){
    Meteor.publish("voters",()=>{
        return Voters.find();
    });
}

Meteor.methods({
    'voters.insert'(voterID,votingSite){
        check(voterID,String);
        check(votingSite,String);

        Voters.insert({
            voterID: voterID,
            votingSite: votingSite,
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