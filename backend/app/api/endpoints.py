from fastapi import APIRouter
from app.schemas import SketchResponse
from app.engine.clock_math import generate_sample_sketch

router = APIRouter()

@router.get("/sketch/sample", response_model=SketchResponse)
def get_sample_sketch():
    """
    Returns the vector clock-tick sequence for the frontend decoder to render.
    """
    return generate_sample_sketch()
