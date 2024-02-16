import { configureStore } from "@reduxjs/toolkit"


// Redutor fictício apenas para teste
const dummyReducer = (state = {}) => {
    return state;
  };
  
  export const store = configureStore({
    reducer: {
      dummy: dummyReducer 
    }
  });