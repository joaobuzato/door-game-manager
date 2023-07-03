import { FieldErrors, FieldValues, useFormContext } from "react-hook-form";

export default function Input(props: {
  label: string;
  type: string;
  placeholder: string;
  id: string;
  validation?: { required: boolean };
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  //   function findInputError(errors: FieldErrors<FieldValues>, label: string) {
  //     const filtered = Object.keys(errors)
  //       .filter((key) => key.includes(label))
  //       .map((key) => {
  //         return {
  //           error: errors[key],
  //         };
  //       });

  //     //   .reduce((cur, key) => {
  //     //     return Object.assign(cur, { error: errors[key] }, {});
  //     //   });

  //     return filtered;
  //   }

  //   function isFormInvalid(err) {
  //     if (Object.keys(err).length > 0) return true;
  //     return false;
  //   }

  //   const inputError = findInputError(errors, props.label);
  //   const isInvalid = isFormInvalid(inputError);

  return (
    <>
      <label htmlFor={props.id}>
        {props.label}
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          {...register(props.label, {
            required: {
              value: true,
              message: "required",
            },
          })}
        ></input>
        {/* <InputError
          message={inputError.error.message}
          key={inputError.error.message}
        /> */}
      </label>
    </>
  );
}

export function InputError({ message }: { message: string }) {
  return <p>{message}</p>;
}
