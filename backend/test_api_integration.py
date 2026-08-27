import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json()["status"] == "ok"

def test_e2e_flow():
    import uuid
    test_email = f"test_user_{uuid.uuid4().hex[:8]}@example.com"
    test_password = "SecurePassword123!"

    # 1. Signup
    signup_res = client.post("/api/v1/auth/signup", json={
        "email": test_email,
        "password": test_password,
        "name": "Integration Tester"
    })
    assert signup_res.status_code == 200
    user_data = signup_res.json()
    assert user_data["email"] == test_email
    assert "id" in user_data

    # 2. Login
    login_res = client.post("/api/v1/auth/login", data={
        "username": test_email,
        "password": test_password
    })
    assert login_res.status_code == 200
    token_data = login_res.json()
    assert "access_token" in token_data
    token = token_data["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 3. /auth/me
    me_res = client.get("/api/v1/auth/me", headers=headers)
    assert me_res.status_code == 200
    assert me_res.json()["email"] == test_email

    # 4. Create Verification (Claim)
    ver_res = client.post("/api/v1/verifications/claim", headers=headers, json={
        "claim": "The earth rotates around the sun once per year.",
        "language": "English (US)"
    })
    assert ver_res.status_code == 200
    ver_data = ver_res.json()
    assert ver_data["status"] == "COMPLETED"
    assert ver_data["verdict"] in ["TRUE", "FALSE", "MISLEADING", "UNVERIFIED"]
    assert "id" in ver_data
    ver_id = ver_data["id"]

    # 5. List Verifications
    list_res = client.get("/api/v1/verifications", headers=headers)
    assert list_res.status_code == 200
    items = list_res.json()
    assert any(i["id"] == ver_id for i in items)

    # 6. Get Verification by ID
    get_res = client.get(f"/api/v1/verifications/{ver_id}", headers=headers)
    assert get_res.status_code == 200
    assert get_res.json()["id"] == ver_id

    # 7. Document Upload & List
    doc_res = client.post(
        "/api/v1/documents/upload",
        headers=headers,
        files={"file": ("test_doc.txt", b"Sample test file content for truthweave", "text/plain")}
    )
    assert doc_res.status_code == 200
    doc_data = doc_res.json()
    assert doc_data["name"] == "test_doc.txt"
    doc_id = doc_data["id"]

    docs_res = client.get("/api/v1/documents", headers=headers)
    assert docs_res.status_code == 200
    assert any(d["id"] == doc_id for d in docs_res.json())

    # 8. Check non-admin access to admin endpoints (should be 403)
    # The created user role is USER (since DB already has users)
    if user_data["role"] == "USER":
        admin_stats_res = client.get("/api/v1/admin/stats", headers=headers)
        assert admin_stats_res.status_code == 403

    # 9. Test Chrome Extension Text Verification Route
    ext_res = client.post("/api/v1/verify/text", headers=headers, json={
        "text": "India won the 2025 Cricket World Cup."
    })
    assert ext_res.status_code == 200
    ext_data = ext_res.json()
    assert "score" in ext_data
    assert "summary" in ext_data

if __name__ == "__main__":
    test_health()
    test_e2e_flow()
    print("ALL TESTS PASSED SUCCESSFULLY!")
