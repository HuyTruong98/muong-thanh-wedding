import * as Types from "../../constants/ActionType";
var initialState = {};

const itemEditing = (state = initialState, action) => {
  var { value } = action;
  switch (action.type) {
    case Types.EDIT_RESTAURANT:
      return value;
    default:
      return state;
  }
};

export default itemEditing;
