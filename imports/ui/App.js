import React, {Component} from "react";
import {Meteor} from "meteor/meteor";
import {withTracker} from "meteor/react-meteor-data";
import {Voters} from "../api/voters";

import "./App.css";

class App extends Component {
    render(){
        return(
            <div>
                <h1>Hello World</h1>
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe("voters");

    let all = Voters.find().fetch();
    return {
        voters: all,
    }
})(App);