import React, { useState, useRef } from "react";
import {
  makeStyles,
  InputBase,
  Tooltip,
  IconButton,
  Popover,
  useTheme,
  Checkbox,
  Button,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  Palette as PaletteIcon,
  Label,
  Search as SearchIcon,
  AddOutlined,
  DeleteOutlineOutlined as DeleteIcon,
} from "@material-ui/icons";

import { editNote, deleteNote } from "store/actions/note";
import { addLabel } from "store/actions/label";

import { ColorPaletteIcon, ColorPaletteIconChecked } from "components/icons";

import { connect } from "react-redux";
import { db } from "../../services/firebase";

const useStyles = makeStyles((theme) => ({
  noteActionsWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    margin: theme.spacing(0.5, 1),
  },
  popover: {
    width: theme.spacing(17),
    height: theme.spacing(13),
    borderRadius: theme.spacing(0.5),
    background: theme.palette.background.default,
    padding: theme.spacing(0, 0.4),
  },
  colorCheckbox: {
    height: "26px",
    width: "26px",
    margin: "2px",
    padding: 0,
    borderRadius: "50%",
    overflow: "hidden",
    border: "2px solid transparent",
    transition: "visibility 0s ease 0ms,opacity .218s linear",
    "&:hover": {
      borderColor: `${theme.notePaletteColors.borderColor} !important`,
    },
  },
  firstColorIcon: {
    borderColor: `${theme.notePaletteColors.firstIconBorderColor} !important`,
  },
  checkMarkColor: {
    fill: theme.notePaletteColors.checkMarkColor,
  },
  colorCheckboxIcon: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  colorCheckboxWrapper: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap" as "wrap",
  },
  labelSearchInput: {
    display: "flex",
    flexDirection: "row" as "row",
    alignItems: "center",
    padding: "5px",
  },
  noteLabelContainer: {
    padding: theme.spacing(1.5),
    background: theme.palette.primary.main,
  },
  labelInputText: {
    fontWeight: 400,
    paddingRight: theme.spacing(1),
  },
  newLabelWrapper: {
    fontSize: theme.spacing(0.8),
  },
  newLabelBtn: {
    marginTop: theme.spacing(0.4),
  },
  labelIconCheckbox: {
    minWidth: "auto",
  },
  closeButton: {
    padding: theme.spacing(1, 3),
    lineHeight: "1.25",
  },
  actionIcon: {
    padding: theme.spacing(1),
  },
}));

const NoteActions: React.FC<{
  choosenColor: string | number;
  userID: string;
  noteID?: string;
  labels: [];
  selectedLabels: string[];
  onCloseButtonClick: (event: any) => void;
  editNote: (fieldName: string, value: any) => void;
  deleteNote: (userID: string, noteID: string) => void;
  addLabel: Function;
  showDeleteBtn?: boolean;
  showCloseBtn?: boolean;
}> = ({
  onCloseButtonClick,
  editNote,
  addLabel,
  selectedLabels = [],
  choosenColor,
  labels,
  userID,
  noteID,
  deleteNote,
  showDeleteBtn = false,
  showCloseBtn = false
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const paletteIconRef = useRef();
  const labelIconRef = useRef();
  const [isOpen, setOpen] = useState(false);
  const [isLabelPopoverOpen, setLabelPopoverOpen] = useState(false);
  const [labelName, setLabelName] = useState("");
  const noteBackgroundColors = theme.notePaletteColors.noteBackground;

  const onLabelAddSuccess = () => {
    setLabelName("");
  };

  const filteredLabels = labels.filter((label: any) => {
    return (
      labelName === "" ||
      label.labelName.toLowerCase().includes(labelName.toLowerCase())
    );
  });

  const checkLabel = (): boolean => {
    const haveSameLabel = labels.some((label: any) => {
      return label.labelName.toLowerCase() === labelName.toLowerCase();
    });
    return !!labelName && !haveSameLabel;
  };

  const allowAddLabel: boolean = checkLabel();

  const handleLabelClick = (labelID: string) => {
    let newLabelsID: Array<string>;
    if (selectedLabels.includes(labelID)) {
      newLabelsID = selectedLabels.filter((id) => id !== labelID);
    } else {
      newLabelsID = [...selectedLabels, labelID];
    }

    if (noteID) {
      db.ref(`notes/${userID}/${noteID}`).update({
        labelsID: newLabelsID,
      });
    } else {
      editNote("labelsID", newLabelsID);
    }
  };

  const onColorChange = (color: string) => {
    if (noteID) {
      db.ref(`notes/${userID}/${noteID}`).update({
        color: color,
      });
    } else {
      editNote("color", color);
    }
  };

  const removeButtonClick = () => {
    noteID && deleteNote(userID, noteID);
  };

  const renderColors = () => {
    let res = Object.keys(noteBackgroundColors).map((color, index) => {
      return (
        <Checkbox
          classes={{ root: classes.colorCheckbox }}
          style={{
            borderColor: noteBackgroundColors[color],
          }}
          className={index === 0 ? classes.firstColorIcon : ""}
          checked={choosenColor === color}
          onChange={() => {
            onColorChange(color);
          }}
          key={color}
          color="primary"
          icon={<ColorPaletteIcon bgColor={noteBackgroundColors[color]} />}
          checkedIcon={
            <ColorPaletteIconChecked
              className={classes.checkMarkColor}
              checkMarkColor={noteBackgroundColors[color]}
            />
          }
        />
      );
    });
    return res;
  };

  return (
    <>
      <div className={classes.noteActionsWrapper}>
        <div>
          <Tooltip title="Change color">
            <IconButton
              classes={{
                root: classes.actionIcon,
              }}
              size="small"
              buttonRef={paletteIconRef}
              onClick={() => {
                setOpen(true);
              }}
            >
              <PaletteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Change label">
            <IconButton
              classes={{
                root: classes.actionIcon,
              }}
              size="small"
              buttonRef={labelIconRef}
              onClick={() => {
                setLabelPopoverOpen(true);
              }}
            >
              <Label fontSize="small" />
            </IconButton>
          </Tooltip>
          {showDeleteBtn && (
            <Tooltip title="delete note">
              <IconButton
                classes={{
                  root: classes.actionIcon,
                }}
                size="small"
                onClick={() => {
                  removeButtonClick();
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </div>
        { showCloseBtn && (<Button
          size="small"
          classes={{
            root: classes.closeButton,
          }}
          onClick={onCloseButtonClick}
        >
          Close
        </Button>)}
        
      </div>

      <Popover
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        anchorEl={paletteIconRef.current}
        open={isOpen}
        onClose={() => {
          setOpen(false);
        }}
        classes={{
          paper: classes.popover,
        }}
      >
        <div className={classes.colorCheckboxWrapper}>{renderColors()}</div>
      </Popover>
      <Popover
        anchorEl={labelIconRef.current}
        open={isLabelPopoverOpen}
        onClose={() => setLabelPopoverOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className={classes.noteLabelContainer}>
          <Typography variant="subtitle2">Label note</Typography>
          <div className={classes.labelSearchInput}>
            <InputBase
              classes={{ root: classes.labelInputText }}
              placeholder="Enter label name"
              value={labelName}
              onChange={(event) => setLabelName(event.target.value)}
              inputProps={{
                maxLength: 15,
              }}
            />
            <SearchIcon />
          </div>
          <div className={classes.newLabelWrapper}>
            {allowAddLabel && (
              <>
                <Divider />
                <Button
                  onClick={() => {
                    addLabel(userID, labelName, onLabelAddSuccess);
                  }}
                  size="small"
                  className={classes.newLabelBtn}
                >
                  <AddOutlined fontSize="small" />
                  <Typography variant="body2">
                    Create "<b>{labelName}</b>"
                  </Typography>
                </Button>
              </>
            )}
            <List dense={true} component="div">
              {filteredLabels.map((label: any) => {
                return (
                  <ListItem
                    key={label.labelID}
                    button
                    dense
                    onClick={() => {
                      handleLabelClick(label.labelID);
                    }}
                  >
                    <ListItemIcon
                      classes={{
                        root: classes.labelIconCheckbox,
                      }}
                    >
                      <Checkbox
                        edge="start"
                        checked={selectedLabels.includes(label.labelID)}
                        color="default"
                      />
                    </ListItemIcon>
                    <ListItemText primary={label.labelName} />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </div>
      </Popover>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  editNote: (fieldName: string, value: any) =>
    dispatch(editNote(fieldName, value)),
  addLabel,
  deleteNote,
});

const mapStateToProps = (state: any) => ({
  labels: state.labels,
  userID: state.auth.user.userID,
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteActions);
