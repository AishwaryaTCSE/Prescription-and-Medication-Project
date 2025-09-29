// Utility functions for date manipulation

export const formatToLocalDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

export const formatToLocalTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const getNextDoseTime = (frequency) => {
  // Basic logic for demonstration. A real app would need more complex parsing.
  // Examples: "Once Daily", "Twice Daily", "Every 8 hours"
  const now = new Date();
  let nextTime = new Date(now);

  if (frequency.includes('Daily')) {
    nextTime.setDate(now.getDate() + 1);
    if (frequency.includes('morning')) nextTime.setHours(8, 0, 0);
    else if (frequency.includes('evening')) nextTime.setHours(20, 0, 0);
    else nextTime.setHours(9, 0, 0); // Default to 9 AM
  } else if (frequency.includes('Twice Daily')) {
    // Alternate between morning and evening
    const currentHour = now.getHours();
    if (currentHour < 12) { // If before noon, schedule for evening
      nextTime.setHours(20, 0, 0);
    } else { // If after noon, schedule for next morning
      nextTime.setDate(now.getDate() + 1);
      nextTime.setHours(8, 0, 0);
    }
  } else if (frequency.includes('hours')) {
    const hoursMatch = frequency.match(/(\d+)\s+hours/);
    if (hoursMatch) {
      const hours = parseInt(hoursMatch[1], 10);
      nextTime.setHours(now.getHours() + hours);
    }
  } else {
    // Default: assume daily next day
    nextTime.setDate(now.getDate() + 1);
    nextTime.setHours(9, 0, 0);
  }
  return nextTime.toISOString(); // Return ISO string for consistency
};

export const isRenewalDue = (prescription) => {
  // Add logic to check if renewal date is approaching based on prescription data
  // For now, a simple flag from the data itself
  return prescription.renewalNeeded || false;
};

export const getFormattedDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // January is 0!
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};