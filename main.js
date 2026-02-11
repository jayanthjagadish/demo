function divide(a, b) {
    return a / b;
}

// Intentional bug: undefined variable
function getUser() {
    return user.name; // ❌ user is not defined
}

console.log("Result:", divide(10, 2));
console.log("User:", getUser());
