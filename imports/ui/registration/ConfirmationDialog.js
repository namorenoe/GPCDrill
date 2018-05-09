import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ActionHelp from 'material-ui/svg-icons/action/help-outline';
import Paper from 'material-ui/Paper';

export default class CustomDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actions: [

                <FlatButton
                    label="Deshacer"
                    primary={true}
                    keyboardFocused={true}
                    onClick={this.props.handleUndo}
                    aria-label="Boton para deshacer accion"
                />,
                <FlatButton
                    label="Confirmar"
                    primary={true}
                    onClick={this.props.handleClose}
                    aria-label="Boton para confirmar acción"
                />
            ]
        }
    }

    render() {

        const customContentStyle = {
            width: '400px',
            maxWidth: 'none',

        };
        return (

            <MuiThemeProvider>
                <Dialog
                    actions={this.state.actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.handleClose}
                    contentStyle={customContentStyle}
                >
                    <h5>El ciudadano con el documento:</h5>
                    <h5>{this.props.voterID}</h5>
                    <h5>ha sido agregado exitosamente</h5>
                </Dialog>
            </MuiThemeProvider>

        );
    }
}