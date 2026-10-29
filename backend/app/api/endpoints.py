from fastapi import APIRouter, HTTPException
from app.schemas import SketchResponse, SketchRequest
from app.engine.clock_math import generate_sample_sketch, parse_raw_text_to_sketch

router = APIRouter()

@router.get("/sketch/sample", response_model=SketchResponse)
def get_sample_sketch():
    return generate_sample_sketch()

@router.post("/sketch/generate", response_model=SketchResponse)
def generate_sketch_from_text(request: SketchRequest):
    """
    Receives raw text from the UI, parses it into clock vectors, and returns the JSON.
    """
    response = parse_raw_text_to_sketch(request.raw_text)
    if not response.sessions:
        raise HTTPException(status_code=400, detail="No valid drawing commands found in text.")
    return response
