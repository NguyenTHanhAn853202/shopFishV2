import request from "~/utils/Api/request";

export const create = async(codeBill,provider,date,codeItem,name,number,price)=>{
    try {
        const data = await request.post('bill/create',{
            billId: codeBill,
            provider: provider,
            date: date,
            itemId:codeItem,
            name:name,
            number,
            price,
            id:localStorage.id
        })
        return data.data
    } catch (error) {
        console.log(error);
    }
}

export const showBill = async()=>{
    try {
        const data = await request.get('bill/show-bill',{
            params: {
                id:localStorage.id
            }
        })
        return data.data
    } catch (error) {
        console.log(error);
    }
}

export const showSpecifyBill = async(billId)=>{
    try {
        const data = await request.get('bill/show-specify-bill',{
            params: {
                id:localStorage.id,
                billId
            }
        })
        return data.data
    } catch (error) {
        console.log(error);
    }
}

export const showAddProduect = async()=>{
    try {
        const data =await request.get('bill/show-add-product')
        return data.data
    } catch (error) {
        console.log(error);
    }
}
