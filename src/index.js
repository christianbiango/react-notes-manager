import "./index.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { App } from "App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageNotFound } from "pages/PageNotFound/PageNotFound";
import { NoteBrowse } from "pages/NoteBrowse/NoteBrowse";
import { NoteCreate } from "pages/NoteCreate/NoteCreate";
import { Note } from "pages/Note/Note";

const root = ReactDOM.createRoot(document.getElementById("root"));
// BrowserRouter permet d'utiliser les root
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<NoteBrowse />}></Route>
          <Route path="/note/:noteId" element={<Note />}></Route>
          <Route path="/note/new" element={<NoteCreate />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
