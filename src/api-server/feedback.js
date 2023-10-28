import request from '~/utils/Api/request';

export const showFeedback = async (idProduct) => {
    try {
        const data = await request.get('feedback/show', {
            params: {
                id: localStorage?.id,
                idProduct: idProduct,
            },
        });
        return data.data.data;
    } catch (error) {}
};

export const write = async (idProduct,message,star)=>{
    try {
        const data = await request.post('feedback/write',{
            id:localStorage.id,
            idProduct: idProduct,
            message: message,
            starNumber: star
        })
        return data.data
    } catch (error) {
        console.log(error);
    }
}

export const reply = async (idFeedback,message)=>{
    try {
        const data = await request.post('feedback/reply',{
            id:localStorage.id,
            idFeedback: idFeedback,
            message:message
        })
        return data.data
    } catch (error) {
        console.log(error);
    }
}