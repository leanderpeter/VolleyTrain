import React, { Component } from "react";
import { Button, DialogActions } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import {
  default as DialogContent,
  default as DialogContentText,
} from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import VolleytrainAPI from "../../api/VolleytrainAPI";

class TrainingDeletion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      training: props.training,
      error: null,
    };
  }

  onDialogClose = () => {
    this.props.onClose();
  };

  removeTraining = (training) => {
    VolleytrainAPI.getAPI()
      .deleteTraining(this.props.training.getID())
      .then((training) => {
        this.props.onDialogClose(training);
      })
      .catch((e) =>
        this.setState({
          error: e,
        })
      );
    this.setState({
      error: null,
    });
    this.props.onDelete();
  };

  removeAlert = (training) => {
    this.removeTraining(training);
    alert("Training gelöscht!");
    this.onDialogClose();
  };

  render() {
    const { openDeletion } = this.props;
    const { training } = this.state;
    return (
      <Dialog open={openDeletion}>
        <DialogTitle id="alert-dialog-title">Sicherheitswarnung</DialogTitle>
        <DialogContent id="alert-dialog-description">
          <DialogContentText id="alert-dialog-description">
            Möchten Sie das Training <b>"{training.getName()}"</b> wirklich
            löschen?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              marginBottom: 10,
              marginTop: 10,
            }}
            onClick={() => this.removeAlert(training)}
          >
            Löschen
          </Button>
          <Button
            style={{
              marginBottom: 10,
              marginTop: 10,
            }}
            onClick={() => this.onDialogClose()}
          >
            Abbrechen
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default TrainingDeletion;
