from pydantic import BaseModel
from typing import List

class Point(BaseModel):
    x: float
    y: float

class StrokeSession(BaseModel):
    id: int
    label: str
    thickness_mm: float
    points: List[Point]

class SketchResponse(BaseModel):
    canvas_units: str = "cm"
    sessions: List[StrokeSession]

class SketchRequest(BaseModel):
    raw_text: str
