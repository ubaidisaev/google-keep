import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Container,
  Box,
  makeStyles,
  useTheme,
  Dialog,
  DialogContent,
} from "@material-ui/core";



import AddNoteForm from "./AddNoteForm";
import NotesList from "./NotesList";

import { updateNote, createNote } from "store/actions/note";

const useStyles = makeStyles((theme) => ({
  dialogContentRoot: {
    padding: '0 !important'
  },
  noteCreateContainer: {
    padding: theme.spacing(4, 0),
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

const NotesArea: React.FC<{
  userID: string;
  notesArray: any;
  isNavBarOpen: boolean;
  currentLabel?: string;

  labels: object[],

  newNoteLabels: string[];

  updateNote: (userID: string, noteID: string, updatedNote: any) => void;
  createNote: (userID: string, newNote: any) => void;

  newNoteTitle: string;
  newNoteBody: string;
  newNoteColor: string;

  editingNoteLabels: string[];
  editingNoteTitle: string;
  editingNoteBody: string;
  editingNoteColor: string;
  editingNoteID: string;

  editNoteMode: boolean;
}> = ({
  newNoteTitle,
  newNoteBody,
  newNoteColor,
  newNoteLabels,

  editingNoteTitle,
  editingNoteBody,
  editingNoteColor,
  editingNoteLabels,
  editingNoteID,
  editNoteMode,

  createNote,
  updateNote,


  userID,
  notesArray,
  currentLabel,
}) => {
  const [isFocused, setIsFocused] = useState(false);  
  const [selectedLabels, addToSelectedLabels] = useState<string[]>([]);

  

  const theme = useTheme();
  const classes = useStyles();

  const filteredNotes = () => {
    if (currentLabel === "all") {
      return notesArray;
    }
    return notesArray.filter((note: any) => {
      return note.labelsID && note.labelsID.includes(currentLabel);
    });
  };


  const onCloseEditNotePopup = () => {
    let updatedNote = {
      title: editingNoteTitle,
      body: editingNoteBody,
      color: editingNoteColor,
      labelsID: editingNoteLabels || [],
    };
    updateNote(userID, editingNoteID, updatedNote);
  };

  const onCloseAddNoteForm = () => {
    let newNote = {
      title: newNoteTitle,
      body: newNoteBody,
      color: newNoteColor,
      labelsID: newNoteLabels,
    };
    if (newNote.title || newNote.body) {
      createNote(userID, newNote);
    }    
  };

  const onAddLabelClick = (labelID: string) => {
    if (selectedLabels.includes(labelID)) {
      let newLabelsID = selectedLabels.filter((id) => id !== labelID);
      addToSelectedLabels(newLabelsID);
    } else {
      addToSelectedLabels([...selectedLabels, labelID]);
    }
  };

  return (
    <Container maxWidth={false}>
      <Box>
        <AddNoteForm
          noteTitle={newNoteTitle}
          noteBody={newNoteBody}
          noteColor={newNoteColor}
          setIsFocused={setIsFocused}
          isFocused={isFocused}
          selectedLabels={newNoteLabels}
          onAddLabelClick={onAddLabelClick}
          onCloseButtonClick={onCloseAddNoteForm}
        />
        <NotesList
          filteredNotes={filteredNotes()}
          selectedLabels={selectedLabels}
          onCloseButtonClick={() => {}}
        />
        
        <Dialog
            open={editNoteMode}
            fullWidth={true}          
          >
            <DialogContent 
              classes={{
                root: classes.dialogContentRoot,
              }}
              
              >
              <AddNoteForm
                noteTitle={editingNoteTitle}
                noteBody={editingNoteBody}
                noteColor={editingNoteColor}
                setIsFocused={setIsFocused}
                isFocused={true}
                selectedLabels={editingNoteLabels}
                onAddLabelClick={onAddLabelClick}
                onCloseButtonClick={onCloseEditNotePopup}
              />
            </DialogContent>
          </Dialog>
        
      </Box>
    </Container>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  updateNote: (userID: string, noteID: string, updatedNote: any) =>
    dispatch(updateNote(userID, noteID, updatedNote)),
  createNote: (userID: string, newNote: any) =>
    dispatch(createNote(userID, newNote)),
});

const mapStateToProps = (state: any) => ({
  labels: state.labels,
  userID: state.auth.user.userID,

  notesArray: state.note.items,
  newNoteTitle: state.note.newNote.title,
  newNoteBody: state.note.newNote.body,
  newNoteColor: state.note.newNote.color,
  newNoteLabels: state.note.newNote.labelsID,

  editingNoteTitle: state.note.editingNote.title,
  editingNoteBody: state.note.editingNote.body,
  editingNoteColor: state.note.editingNote.color,
  editingNoteLabels: state.note.editingNote.labelsID,
  editingNoteID: state.note.editingNote.id,
  editNoteMode: state.note.editNoteMode,
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesArea);
