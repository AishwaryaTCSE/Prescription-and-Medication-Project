import os
import subprocess
from utils.preprocessing import load_data, preprocess_and_split
from config import TRAIN_DATA_PATH, RAW_DATA_PATH, MODELS_DIR

def initialize_directories():
    """Ensure necessary data and model directories exist."""
    os.makedirs(os.path.dirname(RAW_DATA_PATH), exist_ok=True)
    os.makedirs(os.path.dirname(TRAIN_DATA_PATH), exist_ok=True)
    os.makedirs(MODELS_DIR, exist_ok=True)

def ensure_data_ready():
    """
    Checks if raw data exists and ensures interim train/test splits are created.
    If data is missing, creates dummy data.
    """
    initialize_directories()
    
    if not os.path.exists(RAW_DATA_PATH) or os.path.getsize(RAW_DATA_PATH) == 0:
        print("Raw data not found. Creating dummy data.")
        df_raw = load_data(RAW_DATA_PATH) 
        preprocess_and_split(df_raw)
    elif not os.path.exists(TRAIN_DATA_PATH):
         print("Raw data found, but interim splits missing. Splitting data.")
         df_raw = load_data(RAW_DATA_PATH)
         preprocess_and_split(df_raw)
    else:
        print("Data files ready in interim/ folder.")


def main():
    """Main entry point for the AI module workflow: training and evaluation."""
    ensure_data_ready()
    
    # Run Training Script
    print("\n--- Running Model Training (scripts/train.py) ---")
    try:
        subprocess.run(['python', os.path.join('scripts', 'train.py')], check=True, cwd=os.getcwd())
    except subprocess.CalledProcessError as e:
        print(f"Training failed: {e}")
        return

    # Run Evaluation Script
    print("\n--- Running Model Evaluation (scripts/evaluate.py) ---")
    try:
        subprocess.run(['python', os.path.join('scripts', 'evaluate.py')], check=True, cwd=os.getcwd())
    except subprocess.CalledProcessError as e:
        print(f"Evaluation failed: {e}")
        return

    print("\n--- AI Workflow Completed ---")

if __name__ == '__main__':
    main()