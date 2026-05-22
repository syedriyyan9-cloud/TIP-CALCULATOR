
let billInputs = {
    people: document.getElementById('people'),
    bill: document.getElementById('bill'),
    custom: document.getElementById('custom'),
}

let validationFields = {
    bill: document.getElementById('billError'),
    people: document.getElementById('peopleError'),
    custom: document.getElementById('customError'),
}

let tipButtons = document.querySelectorAll('button[data-tip]')
let selectedTip = 0

function setTipSelection(button) {
    tipButtons.forEach(btn => btn.classList.toggle('active', btn === button))
    selectedTip = parseFloat(button.dataset.tip) || 0
    billInputs.custom.value = ''
}

tipButtons.forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault()
        setTipSelection(button)
        display()
    })
})

function parseNumberInput(value) {
    const text = String(value).trim()
    if (!/^-?\d+(?:\.\d+)?$/.test(text)) {
        return NaN
    }
    return Number(text)
}

function parseIntegerInput(value) {
    const text = String(value).trim()
    if (!/^\d+$/.test(text)) {
        return NaN
    }
    return Number(text)
}

function setInvalid(input, errorField, message) {
    if (input) {
        input.classList.add('is-invalid')
    }
    if (errorField) {
        errorField.textContent = message
    }
}

function clearInvalid(input, errorField) {
    if (input) {
        input.classList.remove('is-invalid')
    }
    if (errorField) {
        errorField.textContent = ''
    }
}

function validateInputs() {
    let isValid = true
    const billText = billInputs.bill.value
    const peopleText = billInputs.people.value
    const customText = billInputs.custom.value

    const billValue = parseNumberInput(billText)
    if (isNaN(billValue) || billValue <= 0) {
        setInvalid(billInputs.bill, validationFields.bill, 'Enter a valid positive bill amount')
        isValid = false
    } else {
        clearInvalid(billInputs.bill, validationFields.bill)
    }

    const peopleValue = parseIntegerInput(peopleText)
    if (isNaN(peopleValue) || peopleValue < 1) {
        setInvalid(billInputs.people, validationFields.people, 'Enter a whole number of people')
        isValid = false
    } else {
        clearInvalid(billInputs.people, validationFields.people)
    }

    if (customText.trim() !== '') {
        const customValue = parseNumberInput(customText)
        if (isNaN(customValue) || customValue < 0 || customValue > 100) {
            setInvalid(billInputs.custom, validationFields.custom, 'Enter a valid tip between 0 and 100')
            isValid = false
        } else {
            clearInvalid(billInputs.custom, validationFields.custom)
        }
    } else {
        clearInvalid(billInputs.custom, validationFields.custom)
    }

    return {
        isValid,
        billValue,
        peopleValue,
        customValue: customText.trim() === '' ? null : parseNumberInput(customText),
    }
}

function getTipPercentage() {
    const validation = validateInputs()
    if (!validation.isValid) {
        return 0
    }
    if (validation.customValue !== null) {
        return validation.customValue
    }
    return selectedTip
}

function totalTip(billInputs) {
    // a function that calculates the total tip
    const billValue = parseFloat(billInputs.bill.value)
    const tipPercentage = getTipPercentage()

    if (isNaN(billValue) || billValue <= 0 || isNaN(tipPercentage) || tipPercentage <= 0) {
        return 0
    }

    return billValue * (tipPercentage / 100)
}

function totalBill(billInputs) {
    //  a funtion that calculates the total bill
    const validation = validateInputs()
    if (!validation.isValid || validation.billValue < 0) {
        return 0
    }
    return validation.billValue + totalTip(billInputs)
}

function shareOfPeople(billInputs) {
    // a function that calculates the share of every person
    const validation = validateInputs()
    const billTotal = totalBill(billInputs)

    if (!validation.isValid || validation.peopleValue < 1 || billTotal <= 0) {
        return 0
    }

    return billTotal / validation.peopleValue
}

function display(event) {
    if (event) {
        event.preventDefault()
    }

    const total_tip = totalTip(billInputs)
    const total_bill = totalBill(billInputs)
    const share_per_person = shareOfPeople(billInputs)

    document.getElementById('tipResult').textContent = total_tip.toFixed(2)
    document.getElementById('totalResult').textContent = total_bill.toFixed(2)
    document.getElementById('shareResult').textContent = share_per_person.toFixed(2)
}

const form = document.getElementById('form')
if (form) {
    form.addEventListener('submit', display)
}

Object.values(billInputs).forEach(input => {
    if (input) {
        input.addEventListener('input', () => {
            validateInputs()
        })
    }
})

const themeToggle = document.getElementById('themeToggle')

function setTheme(theme) {
    const isDark = theme === 'dark'
    document.body.classList.toggle('dark-mode', isDark)
    if (themeToggle) {
        const icon = isDark ? '☀️' : '🌙'
        const label = isDark ? 'Switch to light mode' : 'Switch to dark mode'
        themeToggle.innerHTML = `<span class="theme-icon">${icon}</span>`
        themeToggle.setAttribute('aria-label', label)
    }
    localStorage.setItem('tipCalculatorTheme', theme)
}

function initTheme() {
    const savedTheme = localStorage.getItem('tipCalculatorTheme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(savedTheme || (prefersDark ? 'dark' : 'light'))
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark'
        setTheme(nextTheme)
    })
}

initTheme()

let total_tip = totalTip(billInputs)               // total tip = bill * tip percentage
let total_bill = totalBill(billInputs)              // total bill = bill + tip
let share_per_person = shareOfPeople(billInputs)        // share per person = total bill / people