import request from "~/utils/Api/request";

export const createProvider = async(name)=>{
    try {
        const data = await request.post('provider/create',{
            id:localStorage.id,
            name
        })
        return data.data
    } catch (error) {
        console.log(error);
    }
}

export const changeProvider = async(idProvider,value) => {
    try {
        const data = await request.post('provider/update',{
            id:localStorage.id,
            idProvider,
            value
        })
        return data.data
    } catch (error) {
        console.log(error);
    }
}

export const removeProvider = async(idProvider) => {
    try {
        const data = await request.delete('provider/remove',{
           data:{
            id:localStorage.id,
            idProvider,
           }
        })
        return data.data
    } catch (error) {
        console.log(error);
    }
}

export const showProvider = async()=>{
    try {
        const data = await request.get('provider/show',{
            params: {
                id:localStorage.id
            }
        })
        return data.data
    } catch (error) {
        console.log(error);
    }
}




export const createProductName = async(name)=>{
    try {
        const data = await request.post('name-of-product/create',{
            id:localStorage.id,
            name
        })
        return data.data
    } catch (error) {
        console.log(error);
    }
}

export const changeProductName = async(idProductName,value) => {
    try {
        const data = await request.post('name-of-product/update',{
            id:localStorage.id,
            idProductName,
            value
        })
        return data.data
    } catch (error) {
        console.log(error);
    }
}

export const removeProductName = async(idProductName) => {
    try {
        const data = await request.delete('name-of-product/remove',{
           data:{
            id:localStorage.id,
            idProductName,
           }
        })
        return data.data
    } catch (error) {
        console.log(error);
    }
}

export const showProductName = async()=>{
    try {
        const data = await request.get('name-of-product/show',{
            params: {
                id:localStorage.id
            }
        })
        return data.data
    } catch (error) {
        console.log(error);
    }
}

export const search = async(key)=>{
    try {
        const data = await request.get('name-of-product/search',{
            params:{
                key: key,
                id:localStorage.id
            }
        })
        return data.data
    } catch (error) {
        console.log(error.message);
    }
}