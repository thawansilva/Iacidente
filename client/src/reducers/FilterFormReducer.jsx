import { getStates } from "../assets/js/HelpersFunctions.js";

const stateOptions = getStates();

export const filterReducer = (state, action) => {
  switch (action.type) {
    case "YEAR":
      return { ...state, year: action.year };
    case "REGION":
      return {
        ...state,
        region: action.region,
        state: stateOptions[action.region.value]?.[0],
      };
    case "STATE":
      return { ...state, state: action.state };
    default:
      return state;
  }
};
