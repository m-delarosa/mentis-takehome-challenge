const $nextButton = document.getElementById('next-button')
const $submitButton = document.getElementById('submit-button')
const $contactForm = document.getElementById('contact-form')
const $password = document.getElementById('password')
const $passwordControl = document.getElementById('password-control')
const $confirmPasswordControl = document.getElementById('confirm-password-control')

$nextButton.addEventListener('click', (e) => {
    validateAccountInputs()
    if (inputSuccess()) showContactForm()
})

$submitButton.addEventListener('click', (e) => {
    e.preventDefault()

    const $phoneControl = document.getElementById('phone-control')
    validatePhone()
    if (!$phoneControl.classList.contains('error')) showVerification()
})

const validateAccountInputs = () => {
    validateName()
    validateEmail()
    validatePassword()
    validatePasswordConfirmation()
}

const inputSuccess = () => {
    const $nameControl = document.getElementById('name-control')
    const $emailControl = document.getElementById('email-control')

    if ($nameControl.classList.contains('success') &&
        $emailControl.classList.contains('success') &&
        $passwordControl.classList.contains('success') &&
        $confirmPasswordControl.classList.contains('success')) return true
    else return false
}

const showVerification = () => {
    const $verificationHeader = document.getElementById('verification-header')
    $contactForm.classList.add('hidden')
    $verificationHeader.classList.remove('hidden')
}

const showContactForm = () => {
    const $accountForm = document.getElementById('account-form')
    $accountForm.classList.add('hidden')
    $contactForm.classList.remove('hidden')
}

const validateName = () => {
    const $name = document.getElementById('name')
    const nameValue = $name.value.trim()

    if (nameValue === '' || nameValue === null) setErrorFor($name, 'Name cannot be blank')
    else setSuccessFor($name)
}

const validateEmail = () => {
    const $email = document.getElementById('email')
    const emailValue = $email.value.trim()

    if (emailValue === '' || emailValue === null) setErrorFor($email, 'Email cannot be blank')
    else if (!isEmail(emailValue)) setErrorFor($email, 'Not a valid email address')
    else setSuccessFor($email)
}

const validatePassword = () => {
    const passwordValue = $password.value

    if (passwordValue.length < 8) setErrorFor($password, 'Passwords must be greater than 8 characters')
    else if (passwordValue.length > 15) setErrorFor($password, 'Passwords must be less than 15 characters')
    else if (passwordValue.search(/[a-z]/i) < 0) setErrorFor($password, 'Passwords must contain at least one letter')
    else if (passwordValue.search(/[0-9]/) < 0) setErrorFor($password, 'Passwords must contain at least one number')
    else if (passwordValue.search(/[!@#$%^&*]/) < 0) setErrorFor($password, 'Passwords must contain at least one special character')
    else setSuccessFor($password)
}

const validatePasswordConfirmation = () => {
    const $passwordConfirmation = document.getElementById('password-confirmation')
    const passwordConfirmationValue = $passwordConfirmation.value.trim()
    const passwordValue = $password.value.trim()

    if ($passwordControl.classList.contains('success')) {
        if (passwordConfirmationValue === '' || passwordConfirmationValue === null) setErrorFor($passwordConfirmation, 'Passwords cannot be       blank')
        else if (passwordValue !== passwordConfirmationValue) setErrorFor($passwordConfirmation, 'Passwords must match')
        else setSuccessFor($passwordConfirmation)
    }
}

const validatePhone = () => {
    const $phone = document.getElementById('phone')
    const phoneValue = $phone.value

    if (phoneValue.length > 0) {
        if (!isPhone(phoneValue)) {
            setErrorFor($phone, 'Not a valid ten-digit phone number, ex: XXX-XXX-XXXX')
        } else {
            setSuccessFor($phone)
        }
    }
}

const setErrorFor = (input, message) => {
    const $formControl = input.parentElement
    const $small = $formControl.querySelector('small')
    $formControl.className = 'form-control error'
    $small.innerText = message
}

const setSuccessFor = input => {
    const $formControl = input.parentElement
    $formControl.className = 'form-control success'
}

const isEmail = email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)

const isPhone = phoneInput => /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phoneInput)