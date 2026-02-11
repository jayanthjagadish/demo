// ❌ Intentional security issue
const API_SECRET = "my-super-secret-key-12345";

function login(password) {
    if (password === "admin123") {
        return "Access granted";
    }
    return "Access denied";
}

console.log(login("admin123"));