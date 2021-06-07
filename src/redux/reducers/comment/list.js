import * as Types from '../../../constants/ActionType';

var initialState = [];
var findIndex = (data, id) => {
  var result = -1;
  data.forEach((data, index) => {
    if (data.id === id) {
      result = index;
    }
  });
  return result;
};

const list = (state = initialState, action) => {
  var index = -1;
  var { id, value, data } = action;
  switch (action.type) {
    case Types.FETCH_COMMENT:
      var arrayNew = [];
      data.map((item, index) => {
        item = {
          ...item,
          key: item.id,
        };
        arrayNew.push(item);
      });
      state = arrayNew;
      return [...state];
    case Types.CREATE_COMMENT:
      state.push(action.value);
      return [...state];
    case Types.DELETE_COMMENT:
      index = findIndex(state, id);
      state.splice(index, 1);
      return [...state];
    case Types.UPDATE_COMMENT:
      index = findIndex(state, value.id);
      state[index] = value;
      return [...state];
    default:
      return [...state];
  }
};

export default list;