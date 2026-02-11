from flask import Blueprint, jsonify, request
from .profile_data import PROFILE
from .storage import append_message

api = Blueprint("api", __name__)

@api.get("/health")
def health():
    return jsonify({"ok": True})

@api.get("/profile")
def profile():
    return jsonify(PROFILE)

@api.get("/projects")
def projects():
    return jsonify(PROFILE.get("projects", []))

@api.post("/contact")
def contact():
    data = request.get_json(silent=True) or {}
    # Basic validation (keep simple; front also validates)
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    message = (data.get("message") or "").strip()

    if len(name) < 2 or "@" not in email or len(message) < 10:
        return jsonify({"ok": False, "error": "Champs invalides."}), 400

    append_message({"name": name, "email": email, "message": message})
    return jsonify({"ok": True})
