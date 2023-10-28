
const statusDelivery = (status)=>{
    switch(status){
        case 'ready_to_pick':
            return 'Mới tạo đơn hàng'
        case 'picking':
            return 'Nhân viên đang lấy hàng'
        case 'cancel':
            return 'Hủy đơn hàng'
        case 'picked':
            return 'Nhân viên đã lấy hàng'
        case 'transporting': 
            return 'Đang luân chuyển hàng'
        case 'delivered':
            return 'Đã giao hàng thành công'
        default:
            return 'Đang vận chuyển' 
    }
}

export default statusDelivery