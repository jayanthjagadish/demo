// ❌ Intentional security issue
const API_SECRET = "my-super-secret-key-12345";
const pwd = "admin123";
function login(password) {
    if (password == pwd) {
        return "Access granted";
    }
    return "Access denied";
}

console.log(login("admin123"));