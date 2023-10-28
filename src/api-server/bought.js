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

export const updateStatus = async(idBought,status,billId='',itemId='',number=0) => {
    try {
        const data = await request.post('/bought/update-status',{
            id:localStorage.id,
            idBought,
            status:status,
            billId,itemId,number
        })
        return data.data
    } catch (error) {
        console.log(error);
    }
}

export const  statistic = async(year)=>{
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

export const boughtAtStore = async(idProduct,nameProduct,name,phoneNumber,address,price,number)=>{
    try {
        const data = await request.post('bought/bought-at-store',{
            idProduct,nameProduct,name,phoneNumber,address,price,number,
            id:localStorage.id
         })
         return data.data
    } catch (error) {
        console.log(error);
    }
}