/**
 * Personalization Utilities for AI Oracle
 * Translates user data into contextually rich strings for the AI prompt.
 */
export const getAICoreContext = (user: any) => {
  const name = user.nickname || user.name?.split(' ')[0] || 'Student';
  const language = user.preferredLanguage || 'English';
  const academicLevel = user.yearOfStudy || 'N/A';
  const program = user.fieldOfStudy || 'N/A';
  const concerns = user.reasonsForJoining?.join(', ') || 'N/A';
  const faithLevel = user.spiritualityImportance || 'Not specified';
  const approach = user.preferredApproach || 'Holistic';
  const institution = user.institution || 'N/A';
  
  // Custom logic for different academic levels
  let academicNote = '';
  if (academicLevel.includes('400')) {
    academicNote = "As a final year student, they might be feeling 'thesis stress' or 'graduation anxiety'.";
  } else if (academicLevel.includes('100')) {
    academicNote = "As a first year student, they are likely adjusting to university life and seeking belonging.";
  }

  // Custom logic for programs
  let programNote = '';
  if (['Engineering', 'Medicine', 'Computer Science'].includes(program)) {
    programNote = `In the ${program} field, workload is typically high with frequent exams and technical deadlines.`;
  }

  return {
    name,
    language,
    academicLevel,
    program,
    concerns,
    faithLevel,
    approach,
    academicNote,
    programNote,
    displayName: name,
    institution
  };
};

export const getMoodInsight = (recentMoods: any[]) => {
  if (recentMoods.length === 0) return 'No recent mood data.';
  
  const avg = recentMoods.reduce((acc, m) => acc + m.value, 0) / recentMoods.length;
  const trend = recentMoods.length >= 3 ? 
    (recentMoods[0].value > recentMoods[2].value ? 'improving' : 'declining') : 'stable';
    
  return `Average mood: ${avg.toFixed(1)}/5. The user's mood trend seems to be ${trend}.`;
};
