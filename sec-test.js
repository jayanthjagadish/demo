// ❌ Intentional security issue
const API_SECRET = "my-super-secret-key-123456";

function login(password) {
    if (password === "admin1234") {
        return "Access granted";
    }
    return "Access denied";
}

console.log(login("admin123"));