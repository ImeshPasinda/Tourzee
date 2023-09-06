import React, { createContext, useReducer } from "react";

const INITIAL_STATE = {
  city: undefined,
  name: undefined,
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return {
        ...state,
        city: action.payload.city,
        name: action.payload.name,
      };
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        name: state.name,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
