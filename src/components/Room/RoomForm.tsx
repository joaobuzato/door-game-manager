import styles from "./RoomForm.module.css";
import { Formik } from "formik";

export default function RoomForm(props: {
  room_id?: number;
  closeForm: Function;
}) {
  const cancelHandler = () => {
    props.closeForm();
  };

  return (
    <Formik
      initialValues={{ id: 0, title: "", text: "", path: "" }}
      validate={(values) => {
        const errors = { title: "" };
        if (!values.title) {
          errors.title = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        isSubmitting,
      }) => (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>{props.room_id ? "Update Room" : "Insert a Room"}</h2>
          <input
            className={styles.id}
            type="number"
            name="id"
            defaultValue={props.room_id ?? 0}
          />
          <label htmlFor="title">
            Title
            <input
              type="text"
              placeholder="Insert title"
              name="title"
              id="title"
              onChange={handleChange}
              value={values.title}
            />
            {errors.title && touched.title && errors.title}
          </label>
          <label htmlFor="text">
            Text
            <input
              type="textarea"
              name="text"
              placeholder="text"
              id="text"
              onChange={handleChange}
              value={values.text}
            />
            {errors.text && touched.text && errors.text}
          </label>
          <label htmlFor="path">
            Path
            <input
              type="text"
              name="path"
              id="path"
              placeholder="Insert path"
              onChange={handleChange}
              value={values.path}
            />
            {errors.path && touched.path && errors.path}
          </label>

          <button onClick={cancelHandler}>Cancel</button>
          <button type="submit" disabled={isSubmitting}>
            Salvar
          </button>
        </form>
      )}
    </Formik>
  );
}
