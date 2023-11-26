
export const dotMoney = (money) => {
    if(typeof money !== 'string' && typeof money !== 'number') return money
    if(typeof money === 'number') money = money.toString()
    let count =0
    let newMoney = ''
    for(let i = money.length - 1; i >= 0; i--){
        if(count !== 3){
            newMoney += money[i]
            count++
        }
        else{
            count = 0;
            newMoney += '.'
            i++
        }
    }

    return newMoney.split('').reverse().join('')
}