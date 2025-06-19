# Code Assistant

A modern web application that generates code using AI. The application consists of a FastAPI backend and a React frontend.

## Features

- AI-powered code generation
- Terminal-like code display with syntax highlighting
- Option to view AI's thinking process
- Clean, modern UI with dark theme
- Real-time code generation

## Prerequisites

- Python 3.10 or higher
- Node.js 18 or higher
- npm (comes with Node.js)

## Installation

### Backend Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd nn-coding
```

2. Create and activate a Python virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install backend dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the root directory with your Groq API key:
```
GROQ_API_KEY=your_groq_api_key_here
```

5. Start the backend server:
```bash
cd app
uvicorn main:app --reload
```
The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install frontend dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm start
```
The frontend will be available at `http://localhost:3000`

## Running the Application

1. First, make sure both servers are running:
   - Backend: `http://localhost:8000`
   - Frontend: `http://localhost:3000`

2. Open your web browser and navigate to `http://localhost:3000`

3. Enter your code generation prompt in the text area
4. Toggle the "Show thinking process" switch if you want to see AI's reasoning
5. Click "Generate Code" to get the generated code

## API Endpoints

### Generate Code
- **Endpoint**: `/api/generate_code`
- **Method**: POST
- **Request Body**:
```json
{
    "prompt": "Your code generation prompt here",
    "show_thinking": true  # Optional: Set to true to include AI's thinking process
}
```
- **Response**:
```json
{
    "thinking_process": "AI's reasoning process (if show_thinking is true)",
    "code": "Generated code"
}
```

## Project Structure

```
nn-coding/
├── app/              # Backend code
│   ├── main.py       # FastAPI application
│   └── api.py        # API endpoints
├── frontend/         # Frontend code
│   ├── src/          # React components
│   ├── public/       # Static files
│   └── package.json  # Frontend dependencies
├── requirements.txt  # Backend dependencies
└── .env.example      # Environment variables template
```

## Technologies Used

### Backend
- Python 3.10+
- FastAPI
- Groq's Qwen model
- Python-dotenv
- Pydantic
- Uvicorn

### Frontend
- React
- Material-UI
- Prism.js (for code highlighting)
- React Router

## Environment Variables

The application requires a `.env` file in the root directory with the following content:
```
GROQ_API_KEY=your_groq_api_key_here
```

You can get your Groq API key by signing up at [Groq's website](https://groq.com).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Support

For support, please open an issue in the GitHub repository.

## Acknowledgments

- Groq for providing the Qwen model
- FastAPI for the backend framework
- React and Material-UI for the frontend framework
- Prism.js for code syntax highlighting
