const CODEBILL = 'codebill'
const PROVIDER = 'provider'
const DATE = 'date'
const CODEITEM = 'codeitem'
const NAME = 'name'
const NUMBER = 'number'
const PRICE = 'price'
const CLEARPROVIDER = 'clearprovider'
const CLEARITEM = 'clearitem'

const states ={
    codeBill:'',
    provider:'',
    date: new Date().toISOString().substr(0, 10),
    codeItem:'',
    name:'',
    number:'',
    price:''
}
export {states, PROVIDER, DATE,CLEARPROVIDER,CLEARITEM, CODEBILL,CODEITEM,NAME,NUMBER, PRICE}

const reduce = (state, action) =>{
    const {key, value} = action
    switch (key) {
        case CODEBILL:
            return {
                ...state,
                codeBill:value
            }
        case PROVIDER:
            return {
                ...state,
                provider:value
            }
        case DATE:
            return {
                ...state,
                date:value
            }
        case CODEITEM:
            return {
                ...state,
                codeItem:value
            }
        case NAME:
            return {
                ...state,
                name:value
            }
        case NUMBER:
            return {
                ...state,
                number:value*1
            } 
        case PRICE:
            return {
                ...state,
                price:value*1
            }   
        case CLEARITEM:
            return {
                ...state,
                price:'',
                number:'',
                name:'',
                codeItem:'',
            }   
        case CLEARPROVIDER:
            return {
                ...state,
                codeBill:'',
                provider:'',
                price:'',
                number:'',
                name:'',
                codeItem:''

            }         
        default:
            break;
    }
}

export default reduce
