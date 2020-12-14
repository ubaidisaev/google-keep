import { db } from "../../services/firebase";

export const editNote = (fieldName: string, value: any) => (dispatch: any) => {
  dispatch({
    type: "EDIT_NOTE",
    payload: {
      fieldName,
      value: value,
    },
  });
};

export const setNoteEditPopup = (note: any) => ({
  type: "NOTE_EDIT_POPUP",
  payload: note,
});

export const closeNoteEditPopup = () => ({
  type: "CLOSE_NOTE_EDIT_POPUP",
});

export const updateNote = (
  userID: string,
  noteID: string,
  updatedNote: any
) => (dispatch: any) => {
  db.ref(`notes/${userID}/${noteID}`)
    .update(updatedNote)
    .finally(() => {
      dispatch(closeNoteEditPopup());
    });
};

export const deleteNote = (userID: string, noteID: string) => {
  db.ref(`notes/${userID}/${noteID}`).remove();
};

export const createNote = (
  userID: string,
  newNote: any
) => (dispatch: any) => {
  db.ref(`notes/${userID}`)
    .push(newNote)
    .then(() => {
      //dispatch(closeNoteEditPopup());
    });
};

