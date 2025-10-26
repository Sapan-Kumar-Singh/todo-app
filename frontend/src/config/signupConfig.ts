import { FormValidator } from "../components/formGroup/formVakidator";

export const signupConfig = () => {
  return {
    type: "inputFields",
    fields: [
      {
        type: "text",
        field: "username",
        label: "User name",
        required: true,
        onChangeValidation: () =>
          FormValidator.string().min(6).max(30).messages({
            "string.min": "Username must be at least 6 characters long",
            "string.max": "Username cannot exceed 30 characters",
          }),
      },
      {
        type: "text",
        field: "email",
        label: "Email",
        required: true,
        onChangeValidation: () =>
          FormValidator.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .messages({
              "string.email": "Invalid email address format",
            }),
      },
      {
        type: "password",
        field: "password",
        label: "Password",
        required: true,
        onChangeValidation: () =>
          FormValidator.string()
            .pattern(
              new RegExp(
                "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
              )
            )
            .messages({
              "string.pattern.base":
                " must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
              "string.empty": " cannot be empty.",
            }),
      },
      {
        type: "password",
        field: "confirmPassword",
        label: "Confirm password",
        required: true,
        onChangeValidation: () =>
          FormValidator.string()
            .valid(FormValidator.ref("password"))
            .required()
            .messages({
              "any.only": "Passwords do not match",
              "any.required": "Confirm password is required",
            }),
      },
    ],
  };
};
