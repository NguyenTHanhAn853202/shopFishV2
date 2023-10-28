
import request from "~/utils/Api/request";


export const create = async(formData,config)=>{
    try {
        const data = await request.post('news/create',formData,config);
        return data.data
    } catch (error) {
        console.log(error);
    }
}

export const show = async()=>{
    try {
        const data = await request.get('news')
        return data.data
    } catch (error) {
        console.log(error);
    }
}

export const specify = async(idNews) =>{
    try {
        const data  = await request.get('news/specify',{
            params:{
                idNews:idNews
            }
        })
        return data.data
    } catch (error) {
        console.log(error);
    }
}