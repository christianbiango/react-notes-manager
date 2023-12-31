import s from "./style.module.css";
import { PencilFill, Trash, TrashFill } from "react-bootstrap-icons";
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { useState } from "react";
import { ValidatorService } from "services/form-validators";
import { FieldError } from "components/FieldError/FieldError";

const VALIDATORS = {
  title: (value) => {
    return ValidatorService.min(value, 3) || ValidatorService.max(value, 20);
  },
  content: (value) => {
    return ValidatorService.min(value, 3);
  },
};

export function NoteForm({
  isEditable = true,
  title,
  onClickEdit,
  onClickTrash,
  onSubmit,
  note,
}) {
  const [formValues, setFormValues] = useState({
    title: note?.title || "", // Le || sert à ne pas rendre l'input undefined.
    content: note?.content || "",
  }); /* "?." Si note est là, prend content sinon empty string */

  const [formErrors, setFormErrors] = useState({
    title: note?.title ? undefined : "",
    content: note?.content ? undefined : "",
  });

  function updateFormValues(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value }); // Une clé utilisée comme variable dans un objet faut mettre entre crochets
    // Le ...formValues sert à garder les valeurs précédentes car sans lui on ferait juste par exemple formValues = content:abc. Il faut aussi le title
    validate(e.target.name, e.target.value);
  }

  function validate(fieldName, fieldValue) {
    setFormErrors({
      ...formErrors,
      [fieldName]: VALIDATORS[fieldName](fieldValue),
    });
  }

  function hasError() {
    return Object.values(formErrors).some((error) => error !== undefined);
  }

  const actionsIcons = (
    <>
      <div className="col-1">
        {onClickEdit && <PencilFill onClick={onClickEdit} className={s.icon} />}
      </div>
      <div className="col-1">
        {onClickTrash && (
          <TrashFill onClick={onClickTrash} className={s.icon} />
        )}
      </div>
    </>
  );
  const titleInput = (
    <div className="mb-5">
      <label className="form-label">Title</label>
      <input
        onChange={updateFormValues}
        type="text"
        name="title"
        className="form-control"
        value={formValues.title}
      />
      <FieldError msg={formErrors.title} />
    </div>
  );
  const contentInput = (
    <div className="mb-5">
      <label className="form-label">Content</label>
      <input
        onChange={updateFormValues}
        type="text"
        name="content"
        className="form-control"
        row="5"
        value={formValues.content}
      />
      <FieldError msg={formErrors.content} />
    </div>
  );
  const submitButton = (
    <>
      <div className={s.submit_btn}>
        <ButtonPrimary
          isDisabled={hasError()}
          onClick={() => onSubmit(formValues)}
        >
          Submit
        </ButtonPrimary>
      </div>
    </>
  );

  return (
    <form className={s.container}>
      <div className="row justify-content-space-between">
        <div className="col-10">
          <h2 className="mb-3">{title}</h2>
        </div>
        {actionsIcons}
      </div>
      <div className={`mb-3 ${s.title_input_container}`}>
        {isEditable && titleInput}
      </div>
      <div className="mb-3">
        {isEditable ? contentInput : <pre>{note.content}</pre>}
      </div>
      {onSubmit && submitButton}
    </form>
  );
}
/* <pre></pre> prend en compte les \n des div car de base les div les prennent pas en compte*/
