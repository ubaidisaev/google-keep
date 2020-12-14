import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  progress: {
    position: "fixed" as "fixed",
    width: '100%',
    height: '100%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.progress}>
      <CircularProgress color="inherit"/>
    </div>
  );
};

export default Loading;
