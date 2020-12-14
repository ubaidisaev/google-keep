import React, { useState, Dispatch } from "react";
import { connect } from "react-redux";
import {
  makeStyles,
  Paper,
  Collapse,
  InputBase,
  useTheme,  
} from "@material-ui/core";

import NoteActions from "./NoteActions";

import {editNote} from 'store/actions/note';

const useStyles = makeStyles((theme) => ({
  noteCreateContainer: {
    maxWidth: theme.spacing(75),
    margin: "0 auto",
  },
  wrapper: {
    display: "flex",
    flexFlow: "column",
  },
  noteTitleRoot: {
    padding: theme.spacing(1.5, 2),
  },
  noteTitleInput: {
    fontWeight: 500,
    fontSize: "1rem",
    padding: 0,
    lineHeight: "1rem",
    verticalAlign: "middle",
    color: theme.palette.text.primary,
  },
  navBarClose: {
    marginLeft: "0",
  },
  noteActionsWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const AddNoteForm: React.FC<{
  isFocused: boolean;
  setIsFocused: (value: any) => any;
  selectedLabels: string[];
  onAddLabelClick: (labelID: string) => void;
  onCloseButtonClick: () => void;
  variant?: "elevation" | "outlined";
  editNote: (fieldName: string, value: string) => void;
  noteTitle: string;
  noteBody: string;
  noteColor: string;
}> = ({
  editNote,
  noteColor, 
  isFocused,  
  noteBody,
  setIsFocused,  
  selectedLabels,
  onCloseButtonClick,
  variant = "outlined",  
  noteTitle,
}) => {

  

  const classes = useStyles();
  const theme = useTheme();

  

  return (
    <div >
      <Paper
        className={classes.noteCreateContainer}
        elevation={0}
        variant={variant}
        style={{
          backgroundColor: theme.notePaletteColors.noteBackground[noteColor],
        }}
      >
        <div>
          <Collapse
            classes={{ wrapperInner: classes.wrapper }}
            in={isFocused}
            collapsedHeight="3rem"
          >
            <InputBase
              placeholder={isFocused ? "Title" : "Take a note..."}
              classes={{
                root: classes.noteTitleRoot,
                input: classes.noteTitleInput,
              }}
              onFocus={() => setIsFocused(true)}
              value={noteTitle}
              onChange={(event) => editNote('title', event.target.value)}
            />
            <InputBase
              placeholder="Take a note..."
              classes={{
                root: classes.noteTitleRoot,
                input: classes.noteTitleInput,
              }}
              value={noteBody}
              onChange={(event) => editNote('body', event.target.value)}
              multiline
            />
            <NoteActions
              selectedLabels={selectedLabels}
              choosenColor={noteColor}
              onCloseButtonClick={onCloseButtonClick}
              showCloseBtn
            />
          </Collapse>
        </div>
      </Paper>
    </div>
  );
};




const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  editNote: (fieldName: string, value: string) => dispatch(editNote(fieldName, value))
 });

export default connect(null, mapDispatchToProps)(AddNoteForm);
// export default AddNoteForm;
