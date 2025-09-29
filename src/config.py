import os

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

# --- Model Configuration ---
MODEL_NAME = 'adherence_predictor_v1.pkl'

# --- Data Paths ---
DATA_ROOT = os.path.join(PROJECT_ROOT, 'data')

# Raw Paths
RAW_DATA_PATH = os.path.join(DATA_ROOT, 'raw', 'patients_raw.csv')
ADHERENCE_LOGS_PATH = os.path.join(DATA_ROOT, 'raw', 'adherence_logs.json')

# Interim Paths
TRAIN_DATA_PATH = os.path.join(DATA_ROOT, 'interim', 'train.csv')
TEST_DATA_PATH = os.path.join(DATA_ROOT, 'interim', 'test.csv')

# Model Paths
MODELS_DIR = os.path.join(PROJECT_ROOT, 'models')
MODEL_PATH = os.path.join(MODELS_DIR, MODEL_NAME)

# --- Serving Configuration ---
HOST = '0.0.0.0'
PORT = 5000