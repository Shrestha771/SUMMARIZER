#  Multi Content Summarizer

An intelligent multi-format document summarization system that generates concise and meaningful summaries from:

-  Plain Text
-  PDF Documents
-  Images (via OCR)

---

##  Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Backend | FastAPI (Python) |
| Middleware | Node.js (Express) |
| AI Model | HuggingFace Transformers (BART - `facebook/bart-large-cnn`) |
| OCR Engine | Tesseract OCR |

---

##  Features

- 🔹 Text summarization
- 🔹 PDF document summarization
- 🔹 Image-to-text summarization using OCR
- 🔹 Adjustable summary length (20 – 500 words)
- 🔹 Clean modular backend architecture
- 🔹 RESTful API design
- 🔹 Multi-input validation (only one input at a time)

---

##  System Architecture
```
User
  ↓
Frontend (React + Vite)
  ↓
Node.js (Express Middleware)
  ↓
FastAPI (Python Backend)
   ├── Text → Summarizer
   ├── PDF → Text Extraction → Summarizer
   └── Image → OCR → Text → Summarizer
  ↓
Summary Response
```

---

##  Summary Length Mapping

Since the model works on token/character limits rather than exact words, the selected word count is internally mapped to an approximate maximum length.
```python
LENGTH_MAP = {
    20: 120,
    50: 300,
    100: 600,
    150: 900,
    200: 1200,
    250: 1500,
    300: 1800,
    400: 2400,
    500: 3000
}
```

###  Explanation

- Average assumption: **1 word ≈ 5 characters + 1 space ≈ 6 units**
- Therefore: `max_length ≈ words × 6`

>  **Note:** This mapping is an approximation, not exact. Output word count may slightly vary. Post-processing can be applied to trim results for exact word limits.

---

##  Backend Setup (FastAPI)

### 1. Navigate to backend
```bash
cd backend/fast-api
```

### 2. Create Virtual Environment

**Windows (PowerShell):**
```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

**Git Bash:**
```bash
python -m venv .venv
source .venv/Scripts/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run FastAPI Server
```bash
uvicorn app.main:app --reload
```

Open: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

##  OCR Setup (Windows Only)

1. Download Tesseract: [https://github.com/UB-Mannheim/tesseract/wiki](https://github.com/UB-Mannheim/tesseract/wiki)
2. Install at: `C:\Program Files\Tesseract-OCR`
3. Configure path if needed:
```python
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
```

---

##  Node.js Middleware Setup
```bash
cd node-server
npm install
node index.js
```

Server runs at: [http://localhost:3000](http://localhost:3000)

---

##  Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Open: [http://localhost:5173](http://localhost:5173)

---

##  API Endpoints

###  Text Summarization
```
POST /summarize-text
```

**Request Body:**
```json
{
  "text": "Your text here",
  "max_length": 150
}
```

---

###  PDF Summarization
```
POST /summarize-pdf
```

**Form Data:**
- `file` → PDF file
- `max_length` → integer

---

###  Image Summarization
```
POST /summarize-image
```

**Form Data:**
- `file` → Image file
- `max_length` → integer

---

##  Model Details

| Parameter | Value |
|-----------|-------|
| Model | `facebook/bart-large-cnn` |
| Decoding Strategy | Beam Search (`num_beams = 4`) |
| Max Input Length | 1024 tokens |

---

##  Trained Model Files

Due to GitHub file size limitations, the trained model is not stored in this repository.

###  Download Link (Google Drive)

[Click here to download the model](https://drive.google.com/drive/folders/1zHeh5Q3bazDMkPMs_QymzmwHZ0Y3IlCl?usp=drive_link)

###  Setup Instructions

1. Download the folder
2. Extract the ZIP
3. Place inside:
```
model/auto_summarizer_model/
```

---

## 📄 License

This project is for educational purposes.
