import { Reducer, AnyAction } from "redux";
import {SIGNOUT_SUCCESS} from "store/actions/types";
import { initializeApp } from "firebase";
interface IStore {
  items: object[];
  newNote: {
    title: string;
    body: string;
    color: string;
    labelsID: string[];
  },
  editingNote: {
    id: string;
    title: string;
    body: string;
    color: string;
    labelsID: string[];
  };
  editNoteMode: boolean;
}

const InitialState: IStore = {
  items: [],
  editNoteMode: false,
  newNote: {
    title: "",
    body: "",
    color: "default",
    labelsID: [],
  },
  editingNote: {
    id: '',
    title: "",
    body: "",
    color: "default",
    labelsID: [],
  }
};

const notesReducer: Reducer<IStore> = (
  state: IStore = InitialState,
  action: AnyAction
): IStore => {
  switch (action.type) {
    case "NOTES_RECEIVED": {
      return {
        ...state,
        items: action.payload,
        newNote: {...InitialState.newNote, labelsID: [...InitialState.newNote.labelsID]}
      };
    }
    case 'EMPTY_NOTES': {
      return {
        ...state,
        items: [],
      }
    }
    case "EDIT_NOTE": {
      const currentForm = state.editNoteMode ? "editingNote" : "newNote";    
      return {
        ...state,
        [currentForm]: {
          ...state[currentForm],
          [action.payload.fieldName]: typeof action.payload.value === "string" ? action.payload.value : [...action.payload.value],
        },
      };
    }
    case "NOTE_EDIT_POPUP": {
      return {
        ...state,
        editNoteMode: true,
        editingNote: {
          ...state.editingNote,
          title: action.payload.title, 
          body: action.payload.body, 
          color: action.payload.color, 
          id: action.payload.id,
          labelsID: action.payload.labelsID
        },
    }            
      };
    case 'CLOSE_NOTE_EDIT_POPUP': {
      return {
        ...state, 
        editNoteMode: false,
      }
    }
    case SIGNOUT_SUCCESS: 
    return {
      ...InitialState, 
      newNote: {...InitialState.newNote},
      editingNote: {...InitialState.editingNote}
    }
    default:
      return state;
  }
};

export default notesReducer;

// db.ref('labels').on('value', (snap) => {
//  console.log('recive value', snap.val());
// });
