import * as request from '~/utils/Api/request';

export const payment = async (infoOfOder, typeOfPayment, codeDiscount,info,address,addressName) => {
    try {
        const datas = await request.post('order/create', {
            userID: localStorage.id,
            infoOfOder,
            typeOfPayment,
            codeDiscount,
            toProvince:address.province,
            toDistrict:address.district,
            toVillage:address.village,
            address:addressName,
            ...info
        });
        return datas.data;
    } catch (error) {
        console.log(error);
    }
};

export const banking = async (infoOfOder) => {
    try {
        const data = await request.post('order/banking', {
            userID: localStorage.id,
            infoOfOder,
        });
        return data?.success || false;
    } catch (error) {}
};
