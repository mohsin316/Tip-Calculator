const form = document.querySelector('form')
const bill = document.querySelector('[data-bill]')
const button = document.querySelectorAll('[data-button]')
const custom = document.querySelector('[data-custom]')
const people = document.querySelector('[data-people]')
const tipDisplay = document.querySelector('[data-tip-display ]')
const totalDisplay = document.querySelector('[data-total-display ]')
const reset = document.querySelector('[data-reset]')
const tipButtons = document.querySelector('[data-tipButton]')
const errorMsg = document.querySelectorAll('.error-msg')

const calculator = new Calculator(form, tipDisplay, totalDisplay, bill, people, errorMsg, reset, button)


button.forEach( btn => {
    btn.addEventListener('click', e => {
        calculator.tipPercentage(btn)
        custom.value = ''
        btn.classList.add('fill')
    })
    
    tipButtons.addEventListener("mouseup", e=> {
        btn.classList.remove('fill')
    });
})

form.addEventListener('submit', e => {
    e.preventDefault()

    calculator.billInput(bill.value)
    calculator.peopleInput(people.value)
    calculator.custom(custom.value)
    calculator.computation()


    setTimeout(() => {
        if(tipDisplay.textContent === '$0.00'){
            reset.classList.remove('active')
            return
        }else{
            reset.classList.add('active')
            reset.addEventListener('click', e => {
                calculator.reset()
                
            })
        }
    }, 150)
})

form.addEventListener('change', e => {
    reset.classList.add('active')

})

