import { createStore } from "redux";
import StatusReducer from "./StatusReducer";

const store = createStore(StatusReducer);

export default store;