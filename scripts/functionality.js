class Calculator{
    constructor(form, tipDisplay, totalDisplay, bill, people, errorMsg, reset, button){
        this.totalDisplay = totalDisplay
        this.tipDisplay = tipDisplay
        this.bill = bill
        this.people = people
        this.errorMsg = errorMsg
        this.resetbtn = reset
        this.button = button
        this.form = form
    }

    billInput(bill){
        this.billVal = bill;
        if (this.billVal === ''){
            this.errorMsg[0].textContent = `Can't be empty`
        }else{
            this.errorMsg[0].textContent = `Can't be zero`
        }
    }

    tipPercentage(tip){
        this.tip = tip.textContent.replace('%', '')
        this.parent = tip
    }

    custom(customTip){
        this.customTip = customTip;
    }

    peopleInput(people){
        this.peopleVal = people;
        if (this.peopleVal === ''){
            this.errorMsg[1].textContent = `Can't be empty`
        }else{
            this.errorMsg[1].textContent = `Can't be zero`
        }
    }

    computation(){
        let bill = parseFloat(this.billVal);
        let percentageTip = parseFloat(this.tip);
        let customTip = parseFloat(this.customTip);
        let people = parseFloat(this.peopleVal);
        let parent = this.parent
        let tip;

        if (customTip){
            tip = customTip;
            percentageTip = ''
            if(parent){
                parent.classList.remove('fill')
            }
        }else if (customTip == 0) {
            this.specialError()
            return
        }else{
            tip = percentageTip;
            if(parent){
                parent.classList.add('fill')
            }
        }

        this.specialError()

        if(!bill || !tip || !people){
            this.specialError()
            return
        }

        const tipPerson = (bill * (tip / 100) ) / people ;
        const tipTotal = tipPerson + (bill / people);

        const roundOne = (Math.round(tipPerson * 100) / 100).toFixed(2)
        const roundTwo = (Math.round(tipTotal * 100) / 100).toFixed(2)
        
        this.updateUI(roundOne, roundTwo)

    }

    updateUI(tip, total){
            this.tipDisplay.classList.remove('view')
            this.totalDisplay.classList.remove('view')

            setTimeout(() => {
                this.tipDisplay.textContent = `$${tip}`
                this.totalDisplay.textContent = `$${total}`
            },150)
            
            setTimeout(() => {
                this.tipDisplay.classList.add('view')
                this.totalDisplay.classList.add('view')
            },200)
    }

    reset(){
        this.tipDisplay.textContent = '$0.00'
        this.totalDisplay.textContent = '$0.00'
        this.bill.classList.remove('error')
        this.people.classList.remove('error')
        this.errorMsg[0].style.display = 'none'
        this.errorMsg[1].style.display = 'none'
        this.resetbtn.classList.remove('active')
        this.form.reset()
        this.button.forEach( btn => {
            btn.classList.remove('fill')
        })
    }

    specialError(){

        if (Number(this.bill.value) === 0){
            this.bill.classList.add('error')
            this.errorMsg[0].style.display = 'block'
        }else {
            this.bill.classList.remove('error')
            this.errorMsg[0].style.display = 'none'
        }
        if (Number(this.people.value) === 0){
            this.people.classList.add('error')
            this.errorMsg[1].style.display = 'block'
        }else {
            this.people.classList.remove('error')
            this.errorMsg[1].style.display = 'none'
        }
        
        this.tipDisplay.classList.remove('view')
        this.totalDisplay.classList.remove('view')

        setTimeout(() => {
            this.tipDisplay.textContent = ':('
            this.totalDisplay.textContent = ':('
        },120)
        
        setTimeout(() => {
            this.tipDisplay.classList.add('view')
            this.totalDisplay.classList.add('view')
        },170)
    }
}
