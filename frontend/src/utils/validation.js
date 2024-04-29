export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]{2,})(?=.*[0-9]).{1,}$/;
    return passwordRegex.test(password);
}

export const arePasswordsMatch = (password, repeatPassword) => {
    return password === repeatPassword;
}