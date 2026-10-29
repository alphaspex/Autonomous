from app.schemas import SketchResponse, StrokeSession, Point

def generate_sample_sketch() -> SketchResponse:
    """
    Pure I/O generator: Outputs a sample vector sketch using 60-tick clock math.
    1 tick = 6 degrees. 0 ticks = straight ahead (initial heading is UP / +Y).
    """
    return SketchResponse(
        canvas_units="cm",
        step_size_mm=2.0,
        sessions=[
            # A smooth sweeping arc (mimicking human wrist)
            StrokeSession(
                id=1,
                label="Smooth Arc",
                start=Point(x=10.0, y=10.0),
                thickness_mm=1.5,
                ticks=[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ),
            # A robotic square edge corner
            StrokeSession(
                id=2,
                label="Sharp Corner",
                start=Point(x=15.0, y=10.0),
                thickness_mm=2.0,
                ticks=[0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0] # 15 ticks = 90 degrees
            ),
            # A sketchy hand-drawn straight line
            StrokeSession(
                id=3,
                label="Sketchy Line",
                start=Point(x=5.0, y=5.0),
                thickness_mm=0.5,
                ticks=[0, 1, 0, -1, 0, 1, 0, -1, 0, 0]
            )
        ]
    )
