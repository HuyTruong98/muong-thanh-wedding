import * as Types from "../../constants/ActionType";

const initialState = {
  userInfo: {
    data: {},
    load: false,
    error: "",
  },
};

export default function user(state = initialState, action) {
  var { value } = action;
  switch (action.type) {
    case Types.LOGIN_REQUEST: {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: true,
        },
      };
    }

    case Types.GET_USER_INFO_REQUEST: {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          load: true,
        },
      };
    }

    default: {
      return state;
    }
  }
}
