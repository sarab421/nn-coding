# Code Assistant API

A FastAPI-based code generation service using Groq's Qwen model.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file in the root directory:
```
GROQ_API_KEY=your_api_key_here
```

3. Run the application:
```bash
uvicorn app.main:app --reload
```

## API Endpoints

### Generate Code
- **Endpoint**: `/api/generate_code`
- **Method**: POST
- **Request Body**:
```json
{
    "prompt": "Your code generation prompt here"
}
```
- **Response**:
```json
{
    "code": "Generated code"
}
```

## Example Usage

```bash
curl -X POST http://localhost:8000/api/generate_code \
-H "Content-Type: application/json" \
-d '{"prompt": "Write a complete Python script using PyTorch to implement a small neural network for classifying digits from the MNIST dataset..."}'
```
