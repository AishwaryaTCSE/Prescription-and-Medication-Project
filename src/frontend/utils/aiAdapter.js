// Mock AI Adapter - simulates fetching AI-driven suggestions

export const getAdherenceSuggestion = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Randomly return a suggestion or an empty state
  const suggestions = [
    { text: "You've had great adherence lately! Keep up the good work.", action: null, type: 'positive' },
    { text: "Consider setting a recurring alarm for your evening medication to improve consistency.", action: "Set Alarm", type: 'suggestion' },
    { text: "Have you tried linking your medication schedule with a family member for support?", action: "Learn More", type: 'suggestion' },
    { text: "You missed one dose of Metformin yesterday. Try to catch up if your doctor advised.", action: null, type: 'warning' },
    { text: "Ensure you are taking your medication with food as prescribed for better absorption.", action: null, type: 'tip' },
  ];

  const randomIndex = Math.floor(Math.random() * suggestions.length);
  return suggestions[randomIndex];
};

export const getGamificationBadge = async (adherenceScore) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  if (adherenceScore >= 95) {
    return { name: "Pill Perfect", description: "Achieved 95%+ adherence for a month!", icon: "⭐" };
  } else if (adherenceScore >= 85) {
    return { name: "Consistent Care", description: "Maintained 85%+ adherence for two weeks.", icon: "🏅" };
  } else {
    return null; // No badge earned yet
  }
};

export default {
  getAdherenceSuggestion,
  getGamificationBadge,
};