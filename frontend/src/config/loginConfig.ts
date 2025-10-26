import { FormValidator } from "../components/formGroup/formVakidator";

export const loginConfig = () => {
  return {
    type: "inputFields",
    fields: [
      {
        type: "text",
        field: "identifier",
        label: "User name or Email Address",
        required: true,
        onChangeValidation: () =>
          FormValidator.alternatives()
            .try(
              FormValidator.string().min(6).max(30),
              FormValidator.string().email({
                minDomainSegments: 2,
                tlds: { allow: ["com", "net"] },
              })
            )
            .messages({
              "alternatives.match":
                "Must be a valid email or a username (6–30 chars)",
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
                "must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
              "string.empty": " cannot be empty.",
            }),
      },
    ],
  };
};
