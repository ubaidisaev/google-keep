import { db } from "../../services/firebase";



export const addLabel = (userID: string, labelName: string, callback: Function) => {
 db.ref(`labels/${userID}`)
 .push({ labelName })
 .then(() => callback());
}


export const deleteLabel = (userID: string, labelID: string) => {
 db.ref(`labels/${userID}/${labelID}`).remove();
}