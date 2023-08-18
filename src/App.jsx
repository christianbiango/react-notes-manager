import { NoteAPI } from "api/note-api";
import { Header } from "components/Header/Header";
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { setNoteList } from "store/note/note-slice";
import s from "./style.module.css";

export function App() {
  const dispatch = useDispatch();

  const fetchAllNotes = useCallback(async () => {
    const noteList = await NoteAPI.fetchAll();
    dispatch(setNoteList(noteList));
  }, [dispatch]);

  useEffect(() => {
    fetchAllNotes();
  }, [fetchAllNotes]);

  return (
    <div className="container-fluid">
      <Header />
      <div className={s.outlet_container}>
        <Outlet />
      </div>
    </div>
  );
}
