import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import { chatReducer } from "./chatReducer";
import { botReducer } from "./botReducer";

const rootReducer = combineReducers({
  cartReducer: cartReducer,
  chatReducer: chatReducer,
  botReducer, //key and value both are same. So no need to mention the value. Can do it for above two reducers (cartReducer, chatReducer)
});

export default rootReducer;
