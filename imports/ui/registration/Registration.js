import React, {Component} from "react";
import PropTypes from "prop-types";

import "./Registration.css";


const margins = {
    //backgroundColor: rgb('#607d8b'),
    //opacity: 0.2,
    marginRight: "20px",
    marginLeft: "20px",
}
const marginstop = {
    //backgroundColor: rgb('#607d8b'),
    //opacity: 0.2,
    marginTop: "20px",
}

const marginsbottom = {
    //backgroundColor: rgb('#607d8b'),
    //opacity: 0.2,
    marginBottom: "20px",
}

export default class Registration extends Component {

    handleIdChange(e) {
        this.props.handleIdChange($("#voterID").val());
    }

    handleVotingPlace(e){
        this.props.handleVotingPlace(e.target.value);
    }

    handleCandidate(e){
        this.props.handleCandidate(e.target.value);
    }

    render() {
        return (
            <div className="col-md-3 col-sm-4 col-8 register-content">
                <div className={"card"} >
                    <h2 className="card-header">Vota Aquí</h2>
                    <form onSubmit={this.props.submitAction}>
                        <div className={"form-group " +
                        (this.props.registrationError && !$("#voterID").is(":focus") ? "has-danger" : "")}>
                            <label htmlFor="email" style={marginstop}>
                                Codigo/Cédula:</label>
                            <input placeholder="i.e 203012121" style={margins} type="number" id={"voterID"}
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
                            <select className="form-control" style={margins} id="sel1" onChange={this.handleVotingPlace.bind(this)}>
                                <option></option>
                                <option>Universidad de los Andes</option>
                                <option>Universidad Javeriana</option>
                                <option>Universidad Jorge Tadeo Lozano</option>
                                <option>CP - Universidad de los Andes</option>
                                <option>Pontificia Universidad Javeriana</option>
                            </select>
                        </div>
                        {
                            this.props.selectionError ?
                                <small className="form-control-feedback">Debe seleccionar un sitio de votación</small> : null
                        }
                        <div className="form-group">
                            <label htmlFor="sel2">Seleccione su voto:</label>
                            <select className="form-control" style={margins} id="sel2" onChange={this.handleCandidate.bind(this)}>
                                <option></option>
                                <option>Claudia Lopez</option>
                                <option>Miguel Uribe Turbay</option>
                                <option>Fernando Galan</option>
                                <option>Hollman Morris</option>
                                <option>En Blanco</option>
                            </select>
                        </div>
                        {
                            this.props.selectionError ?
                                <small className="form-control-feedback">Debe seleccionar un candidato</small> : null
                        }
                        <div className="form-group center-items">
                            <button type="submit" 
                                    className="btn auth-button"
                                //disabled={this.props.disableButton}
                                    aria-label="submit button" style={marginsbottom}>
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
    handleCandidate: PropTypes.func.isRequired,
};