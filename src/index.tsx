import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { unwrapApiResponse } from "./api";
import { fetchMe } from "./api/user";
import "./index.scss";
import "./prototypes/string";
import FBotRouter from "./router";
import { store } from "./store";
import { setUser } from "./store/user";

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

fetchMe().then(u => {
    store.dispatch(setUser(unwrapApiResponse(u)));
});
