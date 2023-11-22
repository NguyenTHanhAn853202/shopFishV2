import request from "~/utils/Api/request";

export const myBought = async ()=>{
    try {
        const data = await request.get('bought/my-bought',{
            params: {
                id:localStorage.id
            }
        })
        return data.data.data
    } catch (error) {
        console.log(error);
    }
}

export const allBought = async()=>{
    try {
        const data = await request.get('bought/all-bought',{
            params: {
                id:localStorage.id
            }
        })
        return data.data
    } catch (error) {
        console.log(error);
    }
}

export const updateStatus = async(idBought,status,billId='',itemId='',number=0,price=0,name) => {
    try {
        const data = await request.post('/bought/update-status',{
            id:localStorage.id,
            idBought,
            status:status,
            billId,itemId,number,price,name
        })
        return data.data
    } catch (error) {
        console.log(error);
    }
}

export const statistic = async(year)=>{
    try {
        const data = await request.post('bought/list-bought',{
           year:year,
           id:localStorage.id
        })
        return data.data
    } catch (error) {
        console.log(error);
    }
}

export const boughtAtStore = async(customerName,phoneNumber,address,billId,products,number,ship=true)=>{
    try {
        const data = await request.post('bought/bought-at-store',{
            phoneNumber,address,billId,customerName,products,number,
            id:localStorage.id,
         })
         return data.data
    } catch (error) {
         return error.response.data
        
    }
}