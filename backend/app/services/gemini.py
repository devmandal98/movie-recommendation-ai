from google import genai
from google.genai import types, errors
import json
import os
import time

# 1. Setup API Key and Client
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=GEMINI_API_KEY)

# 2. Backup recommendations if API is fully overloaded
FALLBACK_MOVIES = [
    {"title": "Inception", "description": "A thief who steals corporate secrets through the use of dream-sharing technology."},
    {"title": "The Shawshank Redemption", "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption."},
    {"title": "Interstellar", "description": "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."}
]

def get_movie_recommendations(user_input: str):
    prompt = f"Recommend 3 to 5 movies based on: {user_input}."
    
    gen_config = types.GenerateContentConfig(
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

    # 3. Retry Logic (Attempts: 3)
    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash-lite", 
                contents=prompt,
                config=gen_config
            )
            # Success! Return the data
            return json.loads(response.text)

        except errors.ServerError as e:
            print(f"Attempt {attempt + 1} failed: Model overloaded (503).")
            if attempt < 2:
                time.sleep(2 * (attempt + 1)) # Wait 2s, then 4s
            else:
                # 4. Final Fallback after all retries fail
                print("All retries failed. Returning fallback recommendations.")
                return {
                    "message": "The AI is currently overloaded, but here are some classic favorites instead!",
                    "recommendations": FALLBACK_MOVIES,
                    "is_fallback": True
                }

        except Exception as e:
            print(f"Unexpected error: {e}")
            return {"error": "Something went wrong.", "details": str(e)}