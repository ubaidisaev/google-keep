import React from 'react';
import { KeepIcon } from "components/icons";
import { makeStyles, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
 logoContainer: {
  display: "flex",
  justifyContent: "stretch",
 },
 title: {
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(1),
  fontWeight: 'bold' as 'bold'
}
}));

const Logo = () => {
 const classes = useStyles();
 return (
   <div className={classes.logoContainer}>
     <KeepIcon />
     <Typography
       color="textSecondary"
       className={classes.title}
       variant="h6"
       noWrap
     >
       Keep
     </Typography>
   </div>
 );
};

export default Logo;