import request from "~/utils/Api/request";
import axios from "axios";



const token = '74e5fe47-5d4c-11ee-b394-8ac29577e80e'

export const getProvince = async()=>{
    try {
        const data =  await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province',{
            headers: {'Content-Type': 'application/json',Token: token}
        });
        return data.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const getDistrict = async (provinceID) => {
    try {
        const data = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceID}`,{
            headers: {'Content-Type': 'application/json','Token':token}
        })
        return data.data.data
    } catch (error) {
        console.log(error);
    }
}

export const getVillage = async(districtID)=> {
    try {
        const data = await axios.post(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id`,{
            district_id:districtID
        },{
            headers: {'Content-Type': 'application/json','Token':token}
        })
        return data.data.data
    } catch (error) {
        console.log(error);
    }
}

export const createItem = async(toName,toPhoneNumber,address,toVillage,toDistrict,money,weight,length,width,height,number,name,price)=>{
    try {
        const data = await axios.post('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create',{
            "payment_type_id": 2,
            // "note": "Tintest 123",
            "required_note": "CHOXEMHANGKHONGTHU",
            "return_phone": "",
            "return_address": "",
            "return_district_id": null,
            "return_ward_code": "",
            "client_order_code": "",
            "to_name": toName,
            "to_phone": toPhoneNumber,
            "to_address": address,
            "to_ward_code": toVillage,
            "to_district_id": toDistrict,
            "cod_amount": money,
            "content": "Theo New York Times",
            "weight": weight,
            "length": length,
            "width": width,
            "height": height,
            "cod_failed_amount": 2000,                  
            "pick_station_id": null,
            "deliver_station_id": null,
            "insurance_value": money,
            "service_id": 0,
            "service_type_id":2,
            "coupon":null,
            // "pickup_time":1692840132,
            "pick_shift":[2],
            "items": [
                 {
                     "name":name,
                    //  "code":"Polo123",
                     "quantity": number,
                     "price": price,
                    //  "length": 12,
                    //  "width": 12,
                    //  "weight": 1200,
                    //  "height": 12,   
                    //  "category": 
                    //  {
                    //      "level1":"Áo"
                    //  }
                 }
                 
             ]
        },{
            headers: {'Content-Type': 'application/json','Token':token}
        })
        return data
    } catch (error) {
        console.log(error);
    }
}

export const statusOrder = async(code)=>{
    try {
        const data = await axios.post('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail',{
            order_code:code
        },{ headers: {'Content-Type': 'application/json','Token':token}})
        return data
    } catch (error) {
        console.log(error);
    }
}

