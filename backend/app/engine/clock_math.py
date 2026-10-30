import re
from app.schemas import SketchResponse, StrokeSession, Point

def parse_raw_text_to_sketch(raw_text: str) -> SketchResponse:
    """
    Parses both [ draw (x, y, thickness) // ticks ] and [ connect // ticks ] commands.
    'draw' creates a new session. 'connect' appends ticks to the active session.
    """
    sessions = []
    
    # Matches:
    # 1) [ draw (x, y, thickness) // ticks ]
    # 2) [ connect // ticks ]
    pattern = r"\[\s*(draw|connect)\s*(?:\(\s*([\d.-]+)\s*,\s*([\d.-]+)\s*,\s*([\d.-]+)\s*\))?\s*//\s*(.*?)\s*\]"
    
    for match in re.finditer(pattern, raw_text, re.IGNORECASE):
        command = match.group(1).lower()
        raw_ticks = match.group(5)
        
        # Parse ticks into integer list
        ticks = []
        for t in raw_ticks.split(','):
            t = t.strip()
            if t.lstrip('-').isdigit():
                ticks.append(int(t))
        
        if command == "draw":
            x = float(match.group(2)) if match.group(2) else 0.0
            y = float(match.group(3)) if match.group(3) else 0.0
            thickness = float(match.group(4)) if match.group(4) else 1.0
            
            sessions.append(
                StrokeSession(
                    id=len(sessions) + 1,
                    label=f"Session {len(sessions) + 1}",
                    start=Point(x=x, y=y),
                    thickness_mm=thickness,
                    ticks=ticks
                )
            )
            
        elif command == "connect":
            if sessions:
                # Append ticks to the current active session
                sessions[-1].ticks.extend(ticks)
            else:
                # Fallback if text starts with connect before draw
                sessions.append(
                    StrokeSession(
                        id=1,
                        label="Session 1",
                        start=Point(x=0.0, y=0.0),
                        thickness_mm=1.0,
                        ticks=ticks
                    )
                )

    return SketchResponse(
        canvas_units="cm",
        step_size_mm=2.0,
        sessions=sessions
    )

def generate_sample_sketch() -> SketchResponse:
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
