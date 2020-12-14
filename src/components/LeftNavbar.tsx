import React, { useState } from "react";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import {
  Drawer,
  List,  
} from "@material-ui/core";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { Label, EditOutlined, Delete } from "@material-ui/icons";
import { LabelIcon, NoteIcon } from "components/icons";

import MailIcon from "@material-ui/icons/Mail";
import { db } from "../services/firebase";
import EditLabelsModal from "./EditLabelsModal";

const minWidth = 80;
const maxWidth = 280;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBarShift: {
      width: `100%`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: maxWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    navBarOpen: {
      width: maxWidth,
    },
    navBarClose: {
      width: minWidth,
    },
    navbarContainer: {
      minWidth: "65px",
      top: "65px",
      border: "none",
      backgroundColor: "transparent",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      // width: `${minWidth}px`,
      "&:hover": {
        width: `${maxWidth}px`,
      },
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    navItemBtn: {
      padding: 0,
      paddingLeft: "12px",
      display: "flex",
      alignItems: "center",
      width: "48px",
      height: "48px",
      overflow: "hidden",
      borderRadius: "0 25px 25px 0",
      // borderRadius: "50%",
      "&:hover": {
        width: "100%",
        // borderRadius: "0 25px 25px 0",
      },
    },
    navItemBtnOpen: {
      width: "100%",
    },
    navItemIcon: {
      padding: theme.spacing(0, 1.5),
    },
    navTransition: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  })
);

const LeftNavbar: React.FC<{
  isNavBarOpen: boolean;
  setLabel: (label: string) => void;
  labels?: object[];
}> = ({ setLabel, isNavBarOpen, labels = [] }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isLabelsEditModalOpen, openLabelsEditModal] = React.useState(false);
  const [isReady, setReady] = useState(false);

  const handlenavBarOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.navbarContainer,
          docked: classes.navTransition,
        }}
        className={isNavBarOpen ? classes.navBarOpen : classes.navBarClose}
      >
        <List>
          <ListItem
            onClick={() => setLabel("all")}
            button
            classes={{
              root: classes.navItemBtn,
            }}
            className={isNavBarOpen ? classes.navItemBtnOpen : ""}
          >
            <ListItemIcon
              classes={{
                root: classes.navItemIcon,
              }}
            >
              <NoteIcon />
            </ListItemIcon>
            <ListItemText primary={"notes"} />
          </ListItem>
          {labels.map((label: any) => (
            <ListItem
              onClick={() => setLabel(label.labelID)}
              button
              key={label.labelID}
              classes={{
                root: classes.navItemBtn,
              }}
              className={isNavBarOpen ? classes.navItemBtnOpen : ""}
            >
              <ListItemIcon
                classes={{
                  root: classes.navItemIcon,
                }}
              >
                <LabelIcon />
              </ListItemIcon>
              <ListItemText primary={label.labelName} />
            </ListItem>
          ))}
          {labels.length ? (
            <ListItem
              onClick={() => {
                openLabelsEditModal(true);
              }}
              button
              classes={{
                root: classes.navItemBtn,
              }}
              className={isNavBarOpen ? classes.navItemBtnOpen : ""}
            >
              <ListItemIcon
                classes={{
                  root: classes.navItemIcon,
                }}
              >
                <EditOutlined />
              </ListItemIcon>
              <ListItemText primary={"Edit labels"} />
            </ListItem>
          ) : null}
        </List>
        <EditLabelsModal
          isModalOpen={isLabelsEditModalOpen}
          labels={labels}
          closeModal={openLabelsEditModal}
        />
      </Drawer>
    </>
  );
};
export default LeftNavbar;
