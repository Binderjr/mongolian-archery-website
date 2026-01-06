# mongolian-archery-website

Simple static website showcasing traditional Mongolian bows and related assets.

Structure
- `main.py` — small FastAPI app used to serve the static site and a status endpoint.
- `index.html` — HTML, images, and client-side scripts (index, gallery, demo pages).

Run locally
1. Install dependencies: `pip install fastapi uvicorn`
2. Run API: `python main.py` (or `uvicorn main:app --reload`)

Notes
- The `dropship.html` page is a demo storefront (no payments).
- Feel free to request more formatting, accessibility improvements, or to add automated formatting (black/prettier).
