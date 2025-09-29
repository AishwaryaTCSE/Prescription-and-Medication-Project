import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMedications, addMedication, updateMedication, deleteMedication } from '../features/medication/medication.service';

// Async thunks for API interactions
export const getMedications = createAsyncThunk('medications/getMedications', async () => {
  const data = await fetchMedications();
  return data;
});

export const createMedication = createAsyncThunk('medications/createMedication', async (medData) => {
  const data = await addMedication(medData);
  return data;
});

export const editMedication = createAsyncThunk('medications/editMedication', async ({ medId, medData }) => {
  const data = await updateMedication(medId, medData);
  return data;
});

export const removeMedication = createAsyncThunk('medications/removeMedication', async (medId) => {
  await deleteMedication(medId);
  return medId; // Return the ID to remove it from the state
});

const initialState = {
  medications: [],
  loading: false,
  error: null,
};

const medicationSlice = createSlice({
  name: 'medications',
  initialState,
  reducers: {
    // Add any synchronous reducers here if needed
    resetMedications: (state) => {
      state.medications = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetching medications
      .addCase(getMedications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMedications.fulfilled, (state, action) => {
        state.loading = false;
        state.medications = action.payload;
      })
      .addCase(getMedications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Creating medication
      .addCase(createMedication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMedication.fulfilled, (state, action) => {
        state.loading = false;
        state.medications.push(action.payload);
      })
      .addCase(createMedication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Updating medication
      .addCase(editMedication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editMedication.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.medications.findIndex(med => med.id === action.payload.id);
        if (index !== -1) {
          state.medications[index] = action.payload;
        }
      })
      .addCase(editMedication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Removing medication
      .addCase(removeMedication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeMedication.fulfilled, (state, action) => {
        state.loading = false;
        state.medications = state.medications.filter(med => med.id !== action.payload);
      })
      .addCase(removeMedication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetMedications } = medicationSlice.actions;

export default medicationSlice.reducer;