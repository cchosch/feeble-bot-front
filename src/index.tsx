import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.scss";
import FBotRouter from "./router";
import { store } from "./store";

const root = document.getElementById("root");
if(root) {
    createRoot(root).render(<>
        <Provider store={store}>
            <FBotRouter/>
        </Provider>
    </>);
} else {
    alert("root not found");
}
