import React, {Component} from "react";
import {Meteor} from "meteor/meteor";
import {withTracker} from "meteor/react-meteor-data";
import {Voters} from "../api/voters";
import Registration from "./registration/Registration.js";
import VotingStatistics from "./stats/VotingStatistics.js";
import VotingHistogram from "./stats/VotingHistogram.js";
import ConfirmationDialog from "./registration/ConfirmationDialog.js";

import "./App.css";

const heading = {
    backgroundColor: '#eb626b',
    //opacity: 0.2,
    width: '1200px',
    height: '400px',
}
const esta = {
    //backgroundColor: rgb('#607d8b'),
    //opacity: 0.2,
    marginTop: "8%",
}

//cedulas permitidas
const cedulasString = "1000921018,1000850625,1050977297,1001174334,	1000365970,	,1018466786,	1007441643,	1061626150,	1078349246,	1032494428,	1234642826,	,	,	1010238060,	1024577588,	1007658202,	1010000627,	1053587794,	1010037882,	,	1094274911,	1010156815,	1061819950,	1193407507,	,	,	,	,	,	1017263850,	,	,	1007787930,	,	,	1000618754,	1121818203,	1110478617,	1053870662,	1010017215,	1051477916,	1020845012,	1019110214,	,	1059710566,	1000158029,	1121219981,	1136886242,	,	1121959975,	,	,	,	,	,	1110599725,	1000708074,	1026307799,	,	,	,	1007766788,	,	,	1087109779,	1001300989,	,	1007441663,	,	,	1085318064,	,	1005753049,	1001188811,	1193579083,	1099204067,	,	,	1001200173,	1000619938,	1010066891,	1127616719,	1053853717,	1001139353,	1143379902,	1006116760,	1013689264,	1056030612,	1005334187,	1001330909,	1036683056,	,	1152471300,	1076626324,	1059066265,	,	1000757491,	1007161881,	,	,	1116272236,	1017211966,	,	,	1022434817,	1026298390,	1019149401,	,	1000064823,	1000365970,";
const cedulasDef = cedulasString.replaceAll(/\s/g,'');
const cedulas = cedulasDef.split(',');

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            registrationError: false,
            selectionError: false,
            errorMessage: "",
            votingSite: "",
            candidate: "",
            openConfirmDialog: false
        };

        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleVotingSite = this.handleVotingSite.bind(this);
        this.handleCandidate = this.handleCandidate.bind(this);
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
        this.setState({votingSite: val});
        this.setState({selectionError: false})
    }

    handleCandidate(val) {
        this.setState({candidate: val});
        this.setState({selectionError: false})
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
        else if (this.state.votingSite === "") {
            this.setState({
                selectionError: true
            });
        }
        else if (this.state.candidate === "") {
            this.setState({
                selectionError: true
            });
        }
        else if (!cedulas.includes(this.state.id)){
            this.setState({
                registrationError: true,
                errorMessage: "El documento no esta habilitado para votar, comuniquese con el administrador"
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
                Meteor.call('voters.insert', this.state.id, this.state.votingSite, this.state.candidate);
                this.setState({openConfirmDialog: true});
            } else {
                this.setState({
                    registrationError: true,
                    errorMessage: "¡La persona ya ha votado!"
                });
            }
        }
    }

    handleUndoRegistration() {
        Meteor.call('voters.remove', this.state.id);
        this.setState({openConfirmDialog: false});
    }

    handleCloseDialog() {
        this.setState({openConfirmDialog: false});
    }

    

    render() {
        return (
            <div className="container-fluid main-content">
                <div className="row justify-content-around">
                    <div className="col-12 center-items">
                        <img src="BANNER.png" alt="logo_ceu" style={heading}/>
                    </div>
                </div>
                <div className="row justify-content-around center-items" >
                    <Registration
                        handleIdChange={this.handleIdChange}
                        handleVotingPlace={this.handleVotingSite}
                        handleCandidate={this.handleCandidate}
                        registrationError={this.state.registrationError}
                        selectionError={this.state.selectionError}
                        errorMessage={this.state.errorMessage}
                        submitAction={this.submitVoter}
                    />
                </div>
                <div className="row justify-content-around" style={esta}>
                        
                        <div className="col-6 center-items">
                            <h1>Estadísticas</h1>
                            <VotingStatistics data={this.props.voters}/>
                        </div>
                        <div className="col-6 center-items">
                            <VotingHistogram data={this.props.voters}/>
                        </div>
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