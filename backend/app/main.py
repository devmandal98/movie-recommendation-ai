from fastapi import FastAPI

app = FastAPI(title="Movie Recommendation API")


@app.get("/")
def root():
    return {"message": "Backend is running successfully"}
