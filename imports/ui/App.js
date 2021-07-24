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
const cedulasString = "1000921018,	1000850625,	1050977297,	1001174334,	1000365970,	1092362731,	1018466786,	1007441643,	1061626150,	1078349246,	1032494428,	1234642826,	,	1022444199,	1010238060,	1024577588,	1007658202,	1010000627,	1053587794,	1010037882,	1098825706,	1094274911,	1010156815,	1061819950,	1193407507,	1010234701,	1098639013,	,	,	,	1017263850,	,	,	1007787930,	,	1214728411,	1000618754,	1121818203,	1110478617,	1053870662,	1010017215,	1051477916,	1020845012,	1019110214,	1112630920,	1059710566,	1000158029,	1121219981,	1136886242,	1000617462,	1121959975,	,	1053860816,	1001089331,	,	,	1110599725,	1000708074,	1026307799,	1005715280,	1026161950,	1006794453,	1007766788,	,	1007674618,	1087109779,	1001300989,	1003213678,	1007441663,	,	,	1085318064,	1000971052,	1005753049,	1001188811,	1193579083,	1099204067,	1030556917,	,	1001200173,	1000619938,	1010066891,	1127616719,	1053853717,	1001139353,	1143379902,	1006116760,	1013689264,	1056030612,	1005334187,	1001330909,	1036683056,	,	1152471300,	1076626324,	1059066265,	,	1000757491,	1007161881,	,	,	1116272236,	1017211966,	1033816156,	1101693356,	1000064823,	1007419243,	1094289389,	1005178624,	1005108618,	1067950855,	1073720829,	1001342820,	1098824243,	1104864786,	1143869690,	,	,	1085254259,	,	1193044124,	,	,	,	1024593585,	1065849927,	,	1192739528,	1007291994,	1103713692,	80449915,	1007291994,	1118573111,	,	1006562705,	93391852,	1233509244,	,	1000887747,	,	1000400624,	1007555755,	1005297913,	1152220860,	,	,	,	1193089870,	,	,	,	,	97435685,	1000377785,	,	,	,	,	,	1007372136,	,	,	1001971409,	1016076555,	42824118,	,	1007678349,	,	,	,	1088355685,	,	1004779474,	,	,	,	,	1193115443,	1037659068,	,	,	1005108480,	1020474270,	1045023928,	,	1053802584,	1003305370,	1067962232,"

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