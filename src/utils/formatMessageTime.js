export function formatMessageTime(date) {
  const newDate = new Date(date);

  return newDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
