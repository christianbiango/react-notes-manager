import { useDispatch, useSelector } from "react-redux";
import s from "./style.module.css";
import { TextCard } from "components/TextCard/TextCard";
import { useNavigate } from "react-router-dom";
import { NoteAPI } from "api/note-api";
import { deleteNote } from "store/note/note-slice";
/*<TextCard
title="a"
subtitle="01/01"
content="abd"
onClick={() => alert("click note")}
onClickTrash={() => alert("click trash")}
/>*/
export function NoteList({ noteList }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function deleteNote_(note) {
    if (window.confirm("Supprimer la note ?")) {
      NoteAPI.deleteById(note.id);
      dispatch(deleteNote(note));
    }
  }
  return (
    <div className="row justify-content-center">
      {noteList.map((note) => {
        return (
          <div key={note.id} className={s.card_container}>
            <TextCard
              title={note.title}
              subtitle={note.subtitle}
              content={note.content}
              onClick={() => navigate("/note/" + note.id)}
              onClickTrash={() => deleteNote_(note)}
            />
          </div>
        );
      })}
    </div>
  );
}
