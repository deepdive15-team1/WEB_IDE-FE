/**
 * ISO 8601 형식의 시간을 한국어 시간 형식으로 변환
 * @param {string} isoString - ISO 8601 형식의 시간 문자열 (예: "2025-07-17T20:30:00")
 * @returns {string} - 한국어 시간 형식 (예: "오후 08:30")
 */
export const formatTime = (isoString) => {
  if (!isoString) return "";

  const date = new Date(isoString);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const period = hours >= 12 ? "오후" : "오전";
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  const displayMinutes = String(minutes).padStart(2, "0");

  return `${period} ${String(displayHours).padStart(2, "0")}:${displayMinutes}`;
};
