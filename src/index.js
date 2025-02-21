import { AppRegistry } from "react-native";
import App from "./App";
import Pagination from "./Pagination";
import OrderData from "./OrderData";
import CartApp from "./CartApp";

AppRegistry.registerComponent("App", () => CartApp);

AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root"),
});
