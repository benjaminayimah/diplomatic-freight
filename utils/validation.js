export const validateRequiredFields = (form, fields) => {
  const errors = {};

  fields.forEach(({ name, label }) => {
    const value = form[name];

    if (
      value === undefined ||
      value === null ||
      String(value).trim() === ""
    ) {
      errors[name] = [`${label} is required`];
    }
  });

  return errors;
};