import { SET_CAREER_SUGGESTION } from "../actions/careerActions";

const initialState = {
  careerSuggestion: null,
  student: {},
};

const careerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CAREER_SUGGESTION:
      return {
        ...state,
        careerSuggestion: action.payload.careerSuggestion,
        student: action.payload.student,
      };
    default:
      return state;
  }
};

export default careerReducer;
