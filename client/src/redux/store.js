import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";

const composeEnhancers = composeWithDevTools({}); //we can directly use composeWithDevTools() funciton in the createStore function

const initialStore = {
  cartReducer: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) ?? [],
    // cartItems : localStorage.getItem('cartItems') ?? []
  },
  chatReducer: {
    credentials: JSON.parse(localStorage.getItem("credentials")) ?? {},
  },
};
console.log(initialStore);
export const store = createStore(
  rootReducer,
  initialStore,
  composeEnhancers() //this should be a function otherwise there will be errors
  //   composeWithDevTools()
);
