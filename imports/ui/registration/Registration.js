import React, {Component} from "react";
import PropTypes from "prop-types";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
            <div className="col-md-5 col-sm-6 col-6 register-content">

<Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>

                <div className={"card"} >
                    <h2 className="card-header">Vota Aquí</h2>
                    <h4 className="card-header">¿Está de acuerdo con la postulación de la lista, copresidencias y tesorerías para conformar el nuevo Comité Ejecutivo Nacional de ACREES?</h4>
                    <form onSubmit={this.props.submitAction}>
                        <div className={"form-group " +
                        (this.props.registrationError && !$("#voterID").is(":focus") ? "has-danger" : "")}>
                            <label htmlFor="email" style={marginstop}>
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
                                <option>Presencial (U.Externado)</option>
                                <option>Remoto</option>
                                
                            </select>
                        </div>
                        {
                            this.props.selectionError ?
                                <small className="form-control-feedback">Debe seleccionar un sitio de votación</small> : null
                        }
                        <div className="form-group">
                            <label htmlFor="sel2">Seleccione su voto:</label>
                            <select className="form-control" id="sel2" onChange={this.handleCandidate.bind(this)}>
                                <option></option>
                                <option>Si</option>
                                <option>Voto en Blanco</option>
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