import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Redirect } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [backToHome, setBackToHome] = React.useState(false);

  const clickedBackToHome = () => {
    setBackToHome(true);
  }

  return (
    <div>

      {backToHome ? <Redirect to="/" /> : null}
    
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Congratulations!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You completed the game in {props.score} moves.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={clickedBackToHome} color="primary">
            BACK TO HOME PAGE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
