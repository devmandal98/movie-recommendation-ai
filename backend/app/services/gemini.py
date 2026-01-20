from google import genai
from google.genai import types # Added for structured output
import json
import os

# 1. Ensure the API key is actually found
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable is not set. Please check your .env file.")

# 2. Correct Client Initialization for the new SDK
client = genai.Client(api_key=GEMINI_API_KEY)

def get_movie_recommendations(user_input: str):
    prompt = f"Recommend 3 to 5 movies based on: {user_input}."
    
    # 3. Use built-in JSON response formatting (Modern 2026 way)
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema={
                "type": "ARRAY",
                "items": {
                    "type": "OBJECT",
                    "properties": {
                        "title": {"type": "STRING"},
                        "description": {"type": "STRING"}
                    },
                    "required": ["title", "description"]
                }
            }
        )
    )

    try:
        # The new SDK returns a clean parsed object or JSON string
        return json.loads(response.text)
    except Exception:
        return {"error": "Could not parse recommendations"}