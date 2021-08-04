import { GET_ARCHIVES, GET_ARCHIVE, DELETE_ARCHIVE, ADD_ARCHIVE, ARC_CHOOSE, SAVE_ART } from "../actions/types.js";

const initialState = {
  archives: [],
  chosen: [],
  archive: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ARCHIVES:
      return {
        ...state,
        archives: action.payload,
      };
      case GET_ARCHIVE:
      return {
        ...state,
        archive: action.payload,
      };
    case DELETE_ARCHIVE:
      return {
        ...state,
        archives: state.archives.filter(archive => archive.id !== action.payload)

      };
      case ADD_ARCHIVE:
      return {
        ...state,
        archives: [ action.payload, ...state.archives]
      };
      case ARC_CHOOSE:
        return {
          ...state,
          chosen:  action.payload 

        };
      case SAVE_ART:
        return {
          ...state,
          data: action.payload
        }


    default:
      return state;
  }
};


