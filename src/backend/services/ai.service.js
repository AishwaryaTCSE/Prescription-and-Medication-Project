export const checkDrugInteractions = async (medicationNames) => {
  console.log('[AI Service] Running drug interaction check for:', medicationNames.join(', '));
  // STUB IMPLEMENTATION
  if (medicationNames.length > 2) {
    return {
      safe: false,
      warning: 'Multiple drug interaction risk detected. HIGH PRIORITY.',
      detail: 'This is simulated AI output.',
    };
  }
  return {
    safe: true,
    message: 'No major interactions detected based on known data (STUB).',
  };
};

export const analyzePrescription = async (text) => {
  console.log('[AI Service] Analyzing prescription text...');
  // STUB IMPLEMENTATION
  return {
    medicationName: 'Analyzed Drug Name',
    dosage: '100mg',
    frequency: 'Twice daily',
    notes: text,
  };
};

export const predictAdherence = async (features) => {
  // Calls Python Flask service at /predict
  const base = process.env.AI_SERVICE_URL || 'http://127.0.0.1:5001';
  const url = `${base.replace(/\/$/, '')}/predict`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(features || {}),
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`AI predict failed ${resp.status}: ${text}`);
  }
  return resp.json();
};