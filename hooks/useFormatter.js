
export const useFormatter = () => {

  const dateFormat = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return {
    dateFormat
  }
  
}
