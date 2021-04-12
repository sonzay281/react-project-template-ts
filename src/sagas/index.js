//you may add takeLeading as per the requirements
import { takeLatest } from "redux-saga/effects";

import * as actions from "actions";
import { fetchData, postData, patchData, deleteData } from "./genericSagas";

export default function* rootSaga() {
  //yield takeLatest(<GETACTION>, fetchData);
  //yield takeLatest(<POSTACTION>, postData);
  //yield takeLatest(<PATCHACTION>, patchData);
  //yield takeLatest(<DELETEACTION>, deleteData);
}
