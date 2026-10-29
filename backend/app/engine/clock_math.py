import re
from app.schemas import SketchResponse, StrokeSession, Point

def parse_raw_text_to_sketch(raw_text: str) -> SketchResponse:
    """
    Pure I/O parser: Converts raw AI output string into structured vector data.
    """
    sessions = []
    # Regex to match: [ draw (x, y, thickness) // t1, t2, ... ]
    pattern = r"\[\s*draw\s*\(\s*([\d.-]+)\s*,\s*([\d.-]+)\s*,\s*([\d.-]+)\s*\)\s*//\s*(.*?)\s*\]"
    
    # Find all matches in the text (supports multi-line / multiple sessions)
    for session_id, match in enumerate(re.finditer(pattern, raw_text), start=1):
        x = float(match.group(1))
        y = float(match.group(2))
        thickness = float(match.group(3))
        
        # Parse ticks into integer array
        raw_ticks = match.group(4)
        ticks = []
        for t in raw_ticks.split(','):
            t = t.strip()
            # Handle negative and positive integers safely
            if t.lstrip('-').isdigit():
                ticks.append(int(t))
                
        sessions.append(
            StrokeSession(
                id=session_id,
                label=f"Parsed Session {session_id}",
                start=Point(x=x, y=y),
                thickness_mm=thickness,
                ticks=ticks
            )
        )
        
    return SketchResponse(
        canvas_units="cm",
        step_size_mm=2.0,
        sessions=sessions
    )

def generate_sample_sketch() -> SketchResponse:
    # (Keep your existing sample generator here as a fallback/test)
    return SketchResponse(
        canvas_units="cm",
        step_size_mm=2.0,
        sessions=[
            StrokeSession(
                id=1, label="Perfect Circle", start=Point(x=10.0, y=5.0),
                thickness_mm=1.0, ticks=[1] * 60
            )
        ]
    )
