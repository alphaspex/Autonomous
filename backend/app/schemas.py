from pydantic import BaseModel
from typing import List

class Point(BaseModel):
    x: float
    y: float

class StrokeSession(BaseModel):
    id: int
    label: str
    start: Point
    thickness_mm: float
    ticks: List[int]

class SketchResponse(BaseModel):
    canvas_units: str = "cm"
    step_size_mm: float = 2.0
    sessions: List[StrokeSession]

# NEW: Input schema for the UI text box
class SketchRequest(BaseModel):
    raw_text: str
