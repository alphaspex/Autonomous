import re
from app.schemas import SketchResponse, StrokeSession, Point

def parse_raw_text_to_sketch(raw_text: str) -> SketchResponse:
    """
    Parses: [draw (thickness_mm) // (x1, y1), (x2, y2), (x3, y3), ...]
    Connects sequential points in order to form a continuous stroke line.
    """
    sessions = []
    
    # Matches: [ draw (thickness) // (x1, y1), (x2, y2), ... ]
    session_pattern = r"\[\s*draw\s*\(\s*([\d.-]+)\s*\)\s*//\s*(.*?)\s*\]"
    point_pattern = r"\(\s*([\d.-]+)\s*,\s*([\d.-]+)\s*\)"
    
    for session_id, match in enumerate(re.finditer(session_pattern, raw_text, re.IGNORECASE), start=1):
        thickness = float(match.group(1))
        points_raw = match.group(2)
        
        points = []
        for pt_match in re.finditer(point_pattern, points_raw):
            x = float(pt_match.group(1))
            y = float(pt_match.group(2))
            points.append(Point(x=x, y=y))
            
        if points:
            sessions.append(
                StrokeSession(
                    id=session_id,
                    label=f"Stroke {session_id}",
                    thickness_mm=thickness,
                    points=points
                )
            )
            
    return SketchResponse(
        canvas_units="cm",
        sessions=sessions
    )

def generate_sample_sketch() -> SketchResponse:
    return SketchResponse(
        canvas_units="cm",
        sessions=[
            StrokeSession(
                id=1,
                label="Sample Box",
                thickness_mm=1.5,
                points=[
                    Point(x=2.0, y=2.0),
                    Point(x=6.0, y=2.0),
                    Point(x=6.0, y=6.0),
                    Point(x=2.0, y=6.0),
                    Point(x=2.0, y=2.0)
                ]
            )
        ]
    )
