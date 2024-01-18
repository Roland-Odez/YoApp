import validator from 'validator'

const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{2,15}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const validateCredentials = ({email = '', username = '', password = '', img = ''}: {email: string, username: string, password: string, img: string}) => {
    const isValidUsername = usernameRegex.test(username);
    const isValidEmail = emailRegex.test(email)
    const isValidPassword = passwordRegex.test(password);
    const isValidImg = validator.isBase64(img);

    return {
        isValidUsername,
        isValidEmail,
        isValidPassword,
        isValidImg: true
    }
    
}