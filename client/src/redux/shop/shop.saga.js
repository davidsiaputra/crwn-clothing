import { takeEvery, call, put, takeLatest, all } from "redux-saga/effects";

import {
  firestore,
  convertCollectionSnapshotToMap
} from "../../firebase/firebase.utils";
import {
  fetchCollectionFailure,
  fetchCollectionsSuccess
} from "./shop.actions";

import ShopActionTypes from "./shop.types";

export function* fetchCollectionAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionSnapshotToMap, snapshot);
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
