const joi = require('joi');

// Define the validation scheme for user Signup using joi
const userRegisterData = () => {
    return joi.object({
    firstname:
    joi.string().min(3).max(10).required().messages({'string.empty':'firstname cannot be empty'}),
    
    lastname:
    joi.string().min(3).max(10).required().messages({'string.empty':'lastname cannot be empty'}),
    
    email:
    joi.string().email().required().messages({
        'string.email': 'Invalid email format',
        'any.required': 'email is required',
        'string.empty': 'email cannot be empty'
    }),

    password:
    joi.string().min(8).max(10).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,10}$"))
    .required().messages({'string.pattern.base': 'Password must contain atleast one uppercase letter, one lower case, one number, and one special character',
        'string.min':'Password must be atleast 8 characters long',
        'string.max':'Password must not exceed 10 characters',
        'any.required': 'Password is required'
    })
})
}

// Define the validation scheme for user Login using joi
const userLoginData = () => {
    return joi.object({
        email:
        joi.string().email().required().messages({
            'string.email': 'Invalid email format',
            'any.required': 'Email is required'
        }),

        password:
        joi.string().min(8).max(10).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,10}$"))
        .required().messages({'string.pattern.base': 'Password must contain atleast one uppercase letter, one lower case, one number, and one special character',
            'string.min':'Password must be atleast 8 characters long',
            'string.max':'Password must not exceed 10 characters',
            'any.required': 'Password is required'
        })
    })
};

module.exports= {userRegisterData, userLoginData}