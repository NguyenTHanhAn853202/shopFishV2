const CODEBILL = 'codebill'
const PROVIDER = 'provider'
const DATE = 'date'
const CODEITEM = 'codeitem'
const NAME = 'name'
const NUMBER = 'number'
const PRICE = 'price'
const CLEARPROVIDER = 'clearprovider'
const CLEARITEM = 'clearitem'
const ADDPRODUCT = 'add'

const subState = {
    codeItem:'',
    name:'',
    number:'',
    price:''
}

const states ={
    codeBill:'',
    provider:'',
    date: new Date().toISOString().substring(0, 10),
    subState:[
        subState
    ]
}
export {states, PROVIDER, DATE,CLEARPROVIDER,CLEARITEM, CODEBILL,CODEITEM,NAME,NUMBER, PRICE,ADDPRODUCT}

const reduce = (state, action) =>{
    const {key, value,index=null} = action
    switch (key) {
        case ADDPRODUCT:
            const addState = state.subState
            addState.push({
                codeItem:'',
                name:'',
                number:'',
                price:''
            })
            return {
                ...state,
                subState: addState,
            }
        case CODEBILL:
            return {
                ...state,
                codeBill:value
            }
        case PROVIDER:
            return {
                ...state,
                provider: value
            }
        case DATE:
            return {
                ...state,
                date: value
            }
        case CODEITEM:
            const codeItemState = state.subState
            codeItemState[index].codeItem = value
            return {
                ...state,
                subState:codeItemState
            }
        case NAME:
            const nameState = state.subState
            nameState[index].name = value
            return {
                ...state,
                subState:nameState
            }
        case NUMBER:
            const numberState = state.subState
            numberState[index].number = value
            return {
                ...state,
                subState:numberState
            }
        case PRICE:
            const priceState = state.subState
            priceState[index].price = value
            return {
                ...state,
                subState:priceState
            }
        case CLEARITEM:
            return {
                ...state,
                subState:[subState]
            }
        case CLEARPROVIDER:
            return {
                codeBill:'',
                provider:'',
                date: new Date().toISOString().substring(0, 10),
                subState:[
                    {
                        codeItem:'',
                        name:'',
                        number:'',
                        price:''
                    }
                ]
            }  
        default:
            break;
    }
}

export default reduce
