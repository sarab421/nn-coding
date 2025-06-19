from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

router = APIRouter()

# Load environment variables
load_dotenv()

# Initialize the model
model = ChatGroq(model="qwen/qwen3-32b")

# Define the prompt template
promptToGetScore = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """You are a coding assistant help the user with their code. Also just simply write the code no explanation needed."""
        ),
        MessagesPlaceholder(variable_name="messages"),
    ]
)

class CodeRequest(BaseModel):
    prompt: str
    show_thinking: bool = False

class CodeResponse(BaseModel):
    thinking_process: str
    code: str

@router.post("/generate_code", response_model=CodeResponse)
async def generate_code(request: CodeRequest):
    try:
        # Create initial message from user prompt
        initial_message = HumanMessage(content=request.prompt)
        
        # Generate code with thinking process
        output = model.invoke(promptToGetScore.format(messages=[initial_message]))
        
        # Split the output into thinking process and code using <think> tags
        content = output.content
        
        # Find the thinking process using <think> tags
        start_tag = content.find('<think>')
        end_tag = content.find('</think>')
        
        if start_tag != -1 and end_tag != -1:
            # Extract the thinking process
            thinking_process = content[start_tag + len('<think>'):end_tag].strip()
            
            # Extract the code (everything after </think>)
            code_start = end_tag + len('</think>')
            code = content[code_start:].strip()
        else:
            # If no tags found, treat the entire content as code
            thinking_process = ""
            code = content.strip()
        
        return CodeResponse(
            thinking_process=thinking_process,
            code=code
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating code: {str(e)}")
