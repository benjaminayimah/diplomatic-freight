// utils/phoneFormatter.js

import { AsYouType } from "libphonenumber-js";

export const formatPhoneNumber = (value, country = "GH") => {
  return new AsYouType(country).input(value);
};