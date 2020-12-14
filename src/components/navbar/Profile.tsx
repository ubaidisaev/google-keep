import React  from "react";
import { Popover, Typography, Avatar, makeStyles, useTheme, Divider, Button } from "@material-ui/core";
import { FaceOutlined as FaceIcon } from "@material-ui/icons";
import { connect } from "react-redux";

import { signout } from "store/actions/auth";

const useStyles = makeStyles((theme) => ({
  popover: {
    width: theme.spacing(40),
    background: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
  },
  container: {
    display: "flex",
    padding: theme.spacing(2),
    flexFlow: "column",
    alignItems: "center",
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    margin: theme.spacing(1),
    backgroundColor: theme.palette.background.default
  },
  iconColor: {
   color: theme.palette.type === "dark" ? "#949596" : "#5f6368"
  },
  bottom: {
   padding: theme.spacing(2),
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center'
  }
}));
interface IProfile {
  userName: string | null;
  userEmail: string | null;
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  popoverOpenHandler: () => void;
  signout: () => void;
}
const Profile: React.FC<IProfile> = ({
  anchorEl,
  isOpen,
  popoverOpenHandler,
  userName,
  userEmail,
  signout
}) => {
  const classes = useStyles();  
  return (
    <div>
      <Popover
        open={isOpen}
        classes={{
          paper: classes.popover,
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={popoverOpenHandler}
      >
        <div className={classes.container}>
          <Avatar className={classes.avatar}>
            <FaceIcon className={classes.iconColor} fontSize="large"></FaceIcon>
          </Avatar>
          <Typography variant="body1"   color="textPrimary">
           {userName}
          </Typography>
          <Typography  variant="body2"  color="textSecondary">
           {userEmail}
          </Typography>
        </div>
        <Divider/>
        <div className={classes.bottom}>
         <Button  onClick={signout} variant="contained">Sign out</Button>
        </div>
      </Popover>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
 userName: state.auth.user.displayName,
 userEmail: state.auth.user.userEmail,
});

const mapDispatchToProps = (dispatch: any) => ({
 signout: () => dispatch(signout())
});



export default connect(mapStateToProps, mapDispatchToProps)(Profile);
