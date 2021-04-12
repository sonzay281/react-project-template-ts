import { VALUE_CHANGED, DELETE_VALUE } from "actions";

export const valueChanged = (field, value) => ({
  type: VALUE_CHANGED,
  payload: { field, value }
});

export const deleteValue = (field) => ({
  type: DELETE_VALUE,
  payload: { field }
});

export const createAction = (data) => ({
  /*
    type: CREATE,
    payload: {
      url: '/create',
      data,
      onSuccess: CREATE_SUCCEEDED,
      onFailure: CREATE_FAILED
    }
  */
});
