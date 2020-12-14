import { Reducer, AnyAction } from "redux";
import { LABELS_RECEIVED } from "store/actions/types";

type  IStore = object[]

const InitialState: IStore = [];

const labelsReducer: Reducer<IStore> = (
  state: IStore = InitialState,
  action: AnyAction
): IStore => {
  switch (action.type) {
    case LABELS_RECEIVED:
    {
     return action.payload;
    }
    default:
      return state;
  }
};

export default labelsReducer;



// db.ref('labels').on('value', (snap) => {
//  console.log('recive value', snap.val());
// });