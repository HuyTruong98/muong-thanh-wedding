import * as Types from "../../constants/ActionType";

var initialState = [];

var findIndex = (data, id) => {
  var result = -1;
  data.forEach((data, index) => {
    console.log("🚀 ~ file: sanhnhahang.js ~ line 8 ~ data.forEach ~ data", data)
    if (data.id === id) {
      result = index
    }
  });
  return result;
}

const sanhnhahang = (state = initialState, action) => {
  var index = -1;
  var { id, value, data } = action;
  switch (action.type) {
    case Types.FETCH_SANH_NHA_HANG:
      var arrayNew = [];
      data.map((item, index) => {
        item = {
          ...item,
          key: item.id,
        };
        arrayNew.push(item);
      });
      state = arrayNew;
      console.log("🚀 ~ file: sanhnhahang.js ~ line 29 ~ sanhnhahang ~ state", state)
      return [...state];
    default:
      return [...state];
  }
};

export default sanhnhahang;
