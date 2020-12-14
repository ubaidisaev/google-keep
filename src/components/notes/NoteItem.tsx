import React from "react";
import { Paper, useTheme, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";


import { setNoteEditPopup } from "store/actions/note";
import NoteActions from "./NoteActions";

const useStyles = makeStyles((theme) => ({
  item: {
    position: 'relative' as 'relative',
    width: theme.spacing(30),
    margin: ".5rem",
    wordBreak: "break-all" as "break-all",
  },
  itemActions: {
    position: "absolute" as "absolute",
    width: '100%',
    top: '100%',
    transform: 'translateY(-100%)'
  },
  noteTitle: {
    padding: theme.spacing(1.5, 2, 1),
  },
  noteBody: {
    padding: theme.spacing(1, 2, 1),
  },
  labelsList: {
    marginTop: theme.spacing(1.5),
  },
  labelItem: {
    padding: "2px 10px",
    display: "inline-flex",
    cursor: "pointer",
    borderRadius: "12px",
    backgroundColor: "rgba(0,0,0,0.08)",
    fontSize: ".875rem",
    color: theme.note.labelColor,
    marginRight: "5px",
    marginBottom: "5px",
  },
  noteItem: {
    paddingBottom: '40px',
  },
}));

interface IProps {
  note: any;
  userID: string;
  labels: object[];
  setNoteEditPopup: (note: any) => void;
  onCloseButtonClick: (evt: any) => void;
  selectedLabels: string[];
}
const NoteItem: React.FC<IProps> = (props) => {
  const { color, id, title, body } = props.note;
  const {
    setNoteEditPopup,
    labels,
    selectedLabels,
    onCloseButtonClick,
  } = props;

  const theme = useTheme();
  const classes = useStyles();
  return (
    <div className={classes.item}>
      <Paper
        onClick={() => {
          setNoteEditPopup(props.note);
        }}
        className={classes.noteItem}
        style={{          
          backgroundColor: theme.notePaletteColors.noteBackground[color],
        }}
      >
        <div className={classes.noteTitle}>{title}</div>
        <div className={classes.noteBody}>
          {body}
          <br />
          <div className={classes.labelsList}>
            {labels.map((label: any) => {
              if (
                props.note.labelsID &&
                props.note.labelsID.includes(label.labelID)
              ) {
                return (
                  <div key={label.labelID} className={classes.labelItem}>
                    {label.labelName}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </Paper>
      <div className={classes.itemActions}>
      <NoteActions
        showDeleteBtn
        noteID={id}
        choosenColor={color}
        onCloseButtonClick={onCloseButtonClick}
        selectedLabels={selectedLabels}
      />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  labels: state.labels,
  userID: state.auth.user.userID,
});

const mapDispatchToProps = (dispatch: any) => ({
  setNoteEditPopup: (note: any) => dispatch(setNoteEditPopup(note)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoteItem);
