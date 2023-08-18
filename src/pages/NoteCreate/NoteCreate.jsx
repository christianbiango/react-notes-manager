import { NoteForm } from "components/NoteForm/NoteForm";
import { NoteAPI } from "api/note-api";
import { addNote } from "store/note/note-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export function NoteCreate(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function createNote(formValues) {
    const createdNote = await NoteAPI.create({
      ...formValues,
      created_at: new Date().toLocaleDateString(),
    });
    dispatch(addNote(createdNote));
    navigate("/");
  } // Rend le format de date par rapport à où tu vis
  return (
    <>
      <NoteForm title="Create a note" onSubmit={createNote} />
    </>
  );
}
