export function formatLocalTimestamp(timestamp: string): string {
  // Create a new Date object using the timestamp
  const date = new Date(parseInt(timestamp) * 1000); // Convert from seconds to milliseconds

  // Get the local time components
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  // Format the date and time in a readable format (e.g., "2024-11-16 12:30:45")
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
