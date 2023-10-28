import * as request from '~/utils/Api/request';

export const show = async() =>{
    try {
        const data = await request.get('category')
        return data?.data 
    } catch (error) {
        console.log(error);
    }
}

export const create = async(type) =>{
    try {
        const data = await request.post('category/create',{
            id:localStorage?.id,
            type:type
        })
        return data
    } catch (error) {
        console.log(error);
    }
}

export const destroy = async(id) =>{
    const data = await request.remove('category/delete',{
        id:localStorage?.id,
        idType:id
    })
    return data
}

export const replace = async(id,value,oldType) =>{
    try {
        const data = await request.post('category/replace',{
            idType:id,
            id:localStorage?.id,
            value,
            oldType,

        })
        return data
    } catch (error) {
        console.log(error);
    }
}