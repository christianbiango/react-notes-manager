import { useNavigate, useParams } from "react-router-dom";
import s from "./style.module.css";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { NoteForm } from "components/NoteForm/NoteForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateNote } from "store/note/note-slice";
import { NoteAPI } from "api/note-api";
import { deleteNote } from "store/note/note-slice";

export function Note(props) {
  const [isEditable, setIsEditable] = useState(false);
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const note = useSelector((store) =>
    store.NOTE.noteList.find((note) => note.id === noteId)
  );
  async function submit(formValues) {
    const updatedNote = await NoteAPI.update({ ...formValues, id: note.id });
    dispatch(updateNote(updatedNote));
    setIsEditable(false);
  }
  function deleteNote_(note) {
    if (window.confirm("Supprimer la note ?")) {
      NoteAPI.deleteById(note.id);
      dispatch(deleteNote(note));
      navigate("/");
    }
  }
  return (
    <>
      {note && (
        <NoteForm
          isEditable={isEditable}
          note={note}
          onClickEdit={() => setIsEditable(!isEditable)}
          onClickTrash={() => deleteNote_(note)}
          title={isEditable ? "Edit Note" : note.title}
          onSubmit={isEditable && submit}
        />
      )}
    </>
  );
}
