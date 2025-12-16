from typing import Dict

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI(
    title="Mongolian Archery Website API",
    version="0.1.0",
    description="Simple API serving status and static files for the Mongolian archery website.",
)

app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
async def root() -> Dict[str, str]:
    """Return a simple status payload."""
    return {"status": "running"}


if __name__ == "__main__":
    # For local development: `python main.py`
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

