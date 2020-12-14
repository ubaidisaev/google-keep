import { ThunkDispatch } from "redux-thunk";

import { db, auth } from "services/firebase";
import { EMPTY_NOTES, NOTES_RECEIVED, LABELS_RECEIVED } from './types';

export const configDatabase = () => (dispatch: ThunkDispatch<{}, {}, any>) => {
  if (auth.currentUser) {
    db.ref(`labels/${auth.currentUser.uid}`).on("value", (snap) => {
      if (snap.val()) {
        let labelsArray: any = [];
        snap.forEach((element) => {
          let label = { ...element.val(), labelID: element.key };
          labelsArray.push(label);
        });
        dispatch({
          type: LABELS_RECEIVED,
          payload: labelsArray,
        });
      }
    });




    db.ref(`notes/${auth.currentUser.uid}`).on("value", (snap) => {
      if (snap.val()) {
        let notesArray: any = [];
        snap.forEach((element) => {
          let note = { ...element.val(), id: element.key };
          notesArray.push(note);
        });
        dispatch({
          type: NOTES_RECEIVED,
          payload: notesArray,
        });
      } else {
        dispatch({
          type: EMPTY_NOTES
        })        
      }
    });
  }
};
