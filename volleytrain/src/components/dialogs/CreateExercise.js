import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Exercises from "../Exercises";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import VolleytrainAPI from "../../api/VolleytrainAPI";
import ExerciseBO from "../../api/ExerciseBO";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateExercise({ Players, Training, Trigger }) {
  const [open, setOpen] = React.useState(false);

  //show or hide Exercise Component state
  const [showComp, setShowComp] = React.useState(false);

  //show or hide Button Component state
  const [showButton, setShowButton] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExerciseCompCall = () => {
    createExerciseObj();
    setShowComp(true);
    setShowButton(false);
    setOpen(false);
  };

  const handleExerciseLibraryCall = () => {
    setShowComp(false);
  };

  //this function gets passed to the exercise component
  const closeOpenHandler = () => {
    setShowComp(false);
    setShowButton(true);
    Trigger(exercise);
  };

  // const init Exercise State
  const [exercise, setExercise] = React.useState(null);

  const createExerciseObj = () => {
    let exercise = new ExerciseBO();
    exercise.setTraining(Training.id);

    VolleytrainAPI.getAPI()
      .addExercise(exercise)
      .then((exerciseBO) => {
        setExercise(exerciseBO);
      })
      .catch((e) => {
        setExercise(null);
      });
  };

  console.log(exercise);

  const MatchfieldIDMock = 4;

  return (
    <div>
      {showButton ? (
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
          style={{ marginLeft: "440px" }}
        >
          weitere ??bung hinzuf??gen
        </Button>
      ) : null}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle></DialogTitle>
        <DialogContent>
          <Button onClick={handleExerciseLibraryCall} color="primary">
            ??bung aus Bibliothek hinzuf??gen
          </Button>

          <Button onClick={handleExerciseCompCall} color="primary">
            Neue ??bung erstellen
          </Button>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      {showComp ? (
        <ExerciseComp
          Players={Players}
          MatchfieldID={MatchfieldIDMock}
          setShowCompState={closeOpenHandler}
          exerciseToChange={exercise}
        />
      ) : null}
    </div>
  );
}

const ExerciseComp = ({
  Players,
  MatchfieldID,
  setShowCompState,
  exerciseToChange,
}) => (
  <div id="ExerciseComp">
    <DndProvider backend={HTML5Backend}>
      <Exercises
        Players={Players}
        MatchfieldID={MatchfieldID}
        setShowCompState={setShowCompState}
        exercise={exerciseToChange}
      />
    </DndProvider>
  </div>
);
