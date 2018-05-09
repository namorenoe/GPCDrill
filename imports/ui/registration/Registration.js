import React, {Component} from "react";
import PropTypes from "prop-types";

import "./Registration.css";

export default class Registration extends Component {

    handleIdChange(e) {
        this.props.handleIdChange($("#voterID").val());
    }

    handleVotingPlace(e){
        this.props.handleVotingPlace(e.target.value);
    }

    render() {
        return (
            <div className="col-md-4 col-sm-5 col-6 register-content">
                <div className={"card"}>
                    <h2 className="auth-card-title">Registro</h2>
                    <form onSubmit={this.props.submitAction}>
                        <div className={"form-group " +
                        (this.props.registrationError && !$("#voterID").is(":focus") ? "has-danger" : "")}>
                            <label htmlFor="email">
                                Codigo/Cédula:</label>
                            <input placeholder="i.e 203012121" type="number" id={"voterID"}
                                   className={"form-control " +
                                   (this.props.registrationError && !$("#voterID").is(":focus") ? "form-control-danger" : "")
                                   }
                                   onChange={this.handleIdChange.bind(this)}
                                   aria-label="Text input for email"
                            />
                            {
                                this.props.registrationError ?
                                    <small className="form-control-feedback">{this.props.errorMessage}</small> : null
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="sel1">Seleccione puesto de votación:</label>
                            <select className="form-control" id="sel1" onChange={this.handleVotingPlace.bind(this)}>
                                <option></option>
                                <option>ML</option>
                                <option>W</option>
                                <option>FRANCO</option>
                                <option>CP</option>
                                <option>SD</option>
                            </select>
                        </div>
                        {
                            this.props.selectionError ?
                                <small className="form-control-feedback">Debe seleccionar un sitio de votación</small> : null
                        }
                        <div className="form-group center-items">
                            <button type="submit"
                                    className="btn auth-button"
                                //disabled={this.props.disableButton}
                                    aria-label="submit button">
                                Registrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Registration.propTypes = {
    submitAction: PropTypes.func.isRequired,
    registrationError: PropTypes.bool.isRequired,
    selectionError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    handleIdChange: PropTypes.func.isRequired,
    handleVotingPlace: PropTypes.func.isRequired,
};