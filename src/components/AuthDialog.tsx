import React, { useState } from "react";
import { Dialog, DialogContent, Box, Typography, TextField } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  dialogContentRoot: {
    padding: 0,
    marginTop: 0,
    "&:first-child": {
      paddingTop: 0
    }
  },
  form: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  signUpButton: {
    margin: "16px 0"
  },
  forgotPassword: {
    cursor: "pointer"
  },
  input: {
    marginBottom: "8px"
  }
});

interface Props {
  open: boolean;
  handleClose: () => void;
}

const AuthDialog: React.FC<Props> = ({
  open = true,
  handleClose = () => {}
}) => {

 const styles = useStyles();
 
  return (
    <Dialog maxWidth="md" open={open} onClose={handleClose}>
      <DialogContent classes={{root: styles.dialogContentRoot}}>
        <Box>
          <div className={`container`}>
            <div className="form-container sign-up-container">
              <form action="#" autoComplete="off" className={styles.form} >
                <Typography variant="h6">Create Account</Typography>
                <TextField fullWidth label="name"/>
              </form>
            </div>
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
