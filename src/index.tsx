import { createRoot } from "react-dom/client";
import "./index.scss";
import FBotRouter from "./router";

const root = document.getElementById("root");
if(root) {
    createRoot(root).render(<FBotRouter/>);
} else {
    alert("root not found");
}
