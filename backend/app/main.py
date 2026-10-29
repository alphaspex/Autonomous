from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import router as sketch_router

app = FastAPI(title="Clock-Vector API")

# Allow CORS for Render Static Site
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register the sketch router
app.include_router(sketch_router, prefix="/api/v1")

@app.get("/health")
def health_check():
    """ Keeps Render free tier instance alive / health monitoring """
    return {"status": "ok", "system": "clock-vector-backend"}
