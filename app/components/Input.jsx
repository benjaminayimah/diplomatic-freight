import {
  EyeIcon,
  EyeSlashIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Input({
  label,
  id,
  type = "text",
  errors,
  className = "",
  required = false,
  readOnly = false,
  disabled = false,
  autoComplete = "off",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  const Icon = showPassword ? EyeSlashIcon : EyeIcon

  const inputType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : type;

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  
  return (
    <div className="flex flex-col gap-1 w-full px-px">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-semibold text-gray-700 whitespace-nowrap"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <span className="relative">
        <input
          id={id}
          type={inputType}
          className={`${disabled ? "bg-gray-100" : ""} 
            w-full px-3 py-2 border hover:not-disabled:border-gray-600
            rounded-md outline-none transition duration-300 
            focus-within:ring-1 focus-within:ring-blue-500 
            focus-within:border-blue-500!
            ${errors?.length > 0 ? "border-red-500!" : "border-gray-300"} 
            ${isPassword ? "pr-10" : ""}
            ${className}`}
          {...props}
          required={required}
          readOnly={readOnly}
          disabled={disabled}
          autoComplete={autoComplete}
        />

        {isPassword && (
          <button
            type="button"
            onClick={togglePassword}
            disabled={disabled}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-2 -translate-y-1/2 
              p-1 text-gray-400 hover:text-gray-600 
              disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon className="h-4.5 w-4.5"  />
          </button>
        )}
      </span>

      {errors?.length > 0 &&
        errors.map((error, index) => (
          <p key={index} className="text-sm text-red-500">
            {error}
          </p>
        ))}
    </div>
  );
}