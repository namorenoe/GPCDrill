import React, {Component} from "react";
import {Meteor} from "meteor/meteor";
import {withTracker} from "meteor/react-meteor-data";
import {Voters} from "../api/voters";
import Registration from "./registration/Registration.js";
import VotingStatistics from "./stats/VotingStatistics.js";
import ConfirmationDialog from "./registration/ConfirmationDialog.js";

import "./App.css";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            registrationError: false,
            selectionError:false,
            errorMessage: "",
            votingSite: "",
            openConfirmDialog: false
        };

        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleVotingSite = this.handleVotingSite.bind(this);
        this.submitVoter = this.submitVoter.bind(this);
        this.handleUndoRegistration = this.handleUndoRegistration.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }

    handleIdChange(val) {
        this.setState({
            id: val,
            registrationError: false
        });
    }

    handleVotingSite(val) {
        this.setState({votingSite:val});
        this.setState({selectionError:false})
    }

    submitVoter(e) {
        e.preventDefault();
        let id = this.state.id;
        if (id.length < 8) {
            this.setState({
                registrationError: true,
                errorMessage: "El documento debe tener una longitud mayor a 7"
            });
        }
        else if(this.state.votingSite===""){
            this.setState({
                selectionError:true
            });
        }
        else {
            let exists = false;
            this.props.voters.forEach(v => {
                if (v.voterID === id) {
                    exists = true;
                    return;
                }
            });
            if (!exists) {
                Meteor.call('voters.insert', this.state.id, this.state.votingSite);
                this.setState({openConfirmDialog: true});
            } else {
                this.setState({
                    registrationError: true,
                    errorMessage: "¡La persona ya ha votado!"
                });
            }
        }
    }

    handleUndoRegistration(){
        Meteor.call('voters.remove', this.state.id);
        this.setState({openConfirmDialog:false});
    }

    handleCloseDialog(){
        this.setState({openConfirmDialog:false});
    }

    render() {
        return (
            <div className="container-fluid main-content center-items">
                <div className="row justify-content-around">
                    <Registration
                        handleIdChange={this.handleIdChange}
                        handleVotingPlace={this.handleVotingSite}
                        registrationError={this.state.registrationError}
                        selectionError={this.state.selectionError}
                        errorMessage={this.state.errorMessage}
                        submitAction={this.submitVoter}
                    />
                </div>
                <div className="row justify-content-around">
                    <VotingStatistics data={this.props.voters}/>
                </div>
                <ConfirmationDialog open={this.state.openConfirmDialog} handleUndo={this.handleUndoRegistration}
                              handleClose={this.handleCloseDialog} voterID={this.state.id}
                />
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