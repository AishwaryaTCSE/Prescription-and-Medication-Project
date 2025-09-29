export const getCurrentTimestamp = () => {
    return new Date().toISOString();
};

export const getNextDosageTime = (frequencyHours, lastTaken) => {
    // Calculates next time based on frequency (e.g., 8 hours)
    const frequencyMs = frequencyHours * 3600000; 
    const lastTime = lastTaken ? new Date(lastTaken.toDate()) : new Date();
    
    return new Date(lastTime.getTime() + frequencyMs);
};
