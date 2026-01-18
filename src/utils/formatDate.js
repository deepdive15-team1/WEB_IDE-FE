export const formatDate = (date) => {
  if (!date) return "";

  const fmDate = new Date(date);
  const year = fmDate.getFullYear();
  const month = String(fmDate.getMonth() + 1).padStart(2, "0");
  const day = String(fmDate.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};
