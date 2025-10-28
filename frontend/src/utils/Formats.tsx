/* eslint-disable react-refresh/only-export-components */
export const combineDateAndTime = (date: Date, time: Date): Date => {
  const combined = new Date(date);
  combined.setHours(time.getHours());
  combined.setMinutes(time.getMinutes());
  return combined;
};

export const formatDateForBackend = (date: Date | null): string => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatDateToLocalString = (
  InputDate: Date | string | null
): string => {
  if (!InputDate) return "";
  const date = new Date(InputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}/${month}/${year}`;
};

export const formatTimeToLocalString = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const DisableSpecificTime = (date: Date | null) => {
  if (!date) return false;
  const now = new Date();

  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  // if (isToday && clockType === "hours") {
  //   return timeValue < now.getHours();
  // }
  // if (isToday && clockType === "minutes") {
  //   return (
  //     time && time.getHours() === now.getHours() && timeValue < now.getMinutes()
  //   );
  // }

  return isToday;
};
