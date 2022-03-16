import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ContextProvider } from "./Context/Context";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      {" "}
      {/* {ALL COMPONENTS INSIDE THIS, CAN REACH THESE DATA} */}
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
