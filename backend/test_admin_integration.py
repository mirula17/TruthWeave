from fastapi.testclient import TestClient
from app.main import app
from app.db.session import SessionLocal
from app.models.user import User

client = TestClient(app)

def test_health():
    res = client.get("/health")
    assert res.status_code == 200
    assert res.json()["status"] == "ok"

def test_admin_flow():
    db = SessionLocal()
    try:
        admin_user = db.query(User).filter(User.role == "ADMIN").first()
        assert admin_user is not None, "Admin user must exist in database"
        
        # We can generate token for this admin or test with admin credentials
        from app.core import security
        token = security.create_access_token(admin_user.id)
        admin_headers = {"Authorization": f"Bearer {token}"}

        # 1. Admin Stats
        stats_res = client.get("/api/v1/admin/stats", headers=admin_headers)
        assert stats_res.status_code == 200
        stats = stats_res.json()
        assert "totalUsers" in stats
        assert "totalVerifications" in stats
        print("Admin stats:", stats)

        # 2. Admin Users list
        users_res = client.get("/api/v1/admin/users", headers=admin_headers)
        assert users_res.status_code == 200
        users_list = users_res.json()
        assert len(users_list) > 0
        print("Admin users count:", len(users_list))

        # 3. Admin Audit logs
        logs_res = client.get("/api/v1/admin/audit-logs", headers=admin_headers)
        assert logs_res.status_code == 200
        logs = logs_res.json()
        assert len(logs) > 0
        print("Admin audit logs count:", len(logs))

        # 4. Admin System Health
        health_res = client.get("/api/v1/admin/system-health", headers=admin_headers)
        assert health_res.status_code == 200
        health_services = health_res.json()
        assert len(health_services) >= 4
        print("System health services:", [s["name"] for s in health_services])

    finally:
        db.close()

if __name__ == "__main__":
    test_health()
    test_admin_flow()
    print("ALL ADMIN TESTS PASSED SUCCESSFULLY!")
