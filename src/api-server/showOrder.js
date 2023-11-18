import * as request from '~/utils/Api/request';

export const showOrder = async (type) => {
    const data = await request.get('order/show-order', {
        params: {
            type,
            column: 'createdAt',
            id: localStorage.id,
        },
    });
    return data.data;
};

export const confirm = async (idOrder, idInfoOrder,orderCode,billId,itemId,ship,name='') => {
    const data = await request.post('order/confirm', {
        id: localStorage.id,
        idOrder: idOrder, 
        idInfoOrder,
        orderCode: orderCode,
        billId,itemId,ship,name
    });
    return data;
};

export const  myOrder = async () => {
    const data = await request.get('order/my-order',{
        params:{
            id: localStorage.id
        }
    })
    return data.data;
}
