import request from "~/utils/Api/request";

export const overview = async()=>{
    try {
        const data = await request.get('bought/overview',{
            params:{
                id:localStorage.id
            }
        })
        return data.data
    } catch (error) {
        console.log(error);
    }
}

export const saleInYear = async()=>{
    try {
        const data = await request.get('bought/price-each-years',{
            params: {
                id:localStorage.id
            }
        })
        return data.data
    } catch (error) {
        console.log(error);
    }
}

export const item = async(startDate,endDate,option) => {
    try {
        const data = await request.get('bought/product',{
            params: {
                id:localStorage.id,
                startDate,
                endDate,
                option
            }
        })
        return data.data
    } catch (error) {
        console.log(error.message);
    }
}

export const order = async(startDate,endDate,option) => {
    try {
        const data = await request.get('bought/order',{
            params: {
                id:localStorage.id,
                startDate,endDate,option
            }
        })
        return data.data
    } catch (error) {
        console.log(error.message);
    }
}
export const user = async(startDate,endDate,option) => {
    try {
        const data = await request.get('bought/user',{
            params: {
                id:localStorage.id,
                startDate,endDate,option
            }
        })
        return data.data
    } catch (error) {
        console.log(error.message);
    }
}

export const provider = async(startDate,endDate,option) => {
    try {
        const data = await request.get('bought/provider',{
            params: {
                id:localStorage.id,
                startDate,endDate,option
            }
        })
        return data.data
    } catch (error) {
        console.log(error.message);
    }
}