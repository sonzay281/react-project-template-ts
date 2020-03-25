import Immutable from "immutable";
import { VALUE_CHANGED, DELETE_VALUE } from "actions";

const initialState = Immutable.fromJS({});

const baseReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case VALUE_CHANGED:
      return state.setIn(
        [...action.payload.field.split(".")],
        Immutable.fromJS(action.payload.value)
      );

    case DELETE_VALUE:
      return state.deleteIn([...action.payload.field.split(".")]);

    /*With mutation example
    case ACTION:
      return state.withMutations((s: any) => {
        action.response.forEach((r: any) => s.setIn(['key1', 'key2', r.id], Immutable.fromJS(r)));
      });
    */

    /*without mutation
    case ACTION:
      return state.set('key', Immutable.fromJS(action.response));
    */

    default:
      return state;
  }
};

export default baseReducer;
