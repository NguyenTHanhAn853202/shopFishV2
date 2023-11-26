import {useContext,  useEffect, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import { newProduct } from '~/api-server/suggestProduct';
import { Link } from 'react-router-dom';
import { Context } from '~/GlobalContext';
import { dotMoney } from '~/utils/dotMoney';


const cx = classNames.bind(styles);

function Product({ ...props }) {
    const [data, setData] = useState([]);
    const [{product},dispatch] = useContext(Context)

    useEffect(() => {
        (async () => {
            const type = ''; //all
            const limit = 5;
            const data = await newProduct(type, limit);
            setData(data);
        })();
        
    }, [JSON.stringify(product)]);
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title-product')}>SẢN PHẨM</h2>
            {data.map((item, index) => {
                const image = item.image[0]
          
                return <Link  key={index} to={`/san-pham/${item.slug}`}>
                <div {...props} className={cx('product', { [classNames]: classNames })}>
                    {/* <img className={cx('product-img')} src={image} alt={item.name} /> */}
                    {image?.includes('.mp4')? <video className={cx('product-img')}><source src={image} type="video/mp4"/></video> :<img className={cx('product-img')} src={image} />}
                    <div className={cx('title-price')}>
                        <h4 className={cx('name-product')}>{item.name}</h4>
                        <h4 className={cx('price')}>{`${dotMoney(item.price)} VNĐ`}</h4>
                    </div>
                </div>
            </Link>
            })}
           
        </div>
    );
}


// const Product = ({ products }) => {
//     const [currentPage, setCurrentPage] = useState(1);
  
//     // Tổng số trang
//     const totalPages = Math.ceil(products.length / 20);
  
//     // Dữ liệu sản phẩm trên trang hiện tại
//     const currentProducts = products.slice((currentPage - 1) * 20, currentPage * 20);
  
//     const handlePageChange = (pageNumber) => {
//       setCurrentPage(pageNumber);
//     };
  
//     return (
//       <div>
//         {/* Hiển thị dữ liệu sản phẩm trên trang hiện tại */}
//         {currentProducts.map((product) => (
//           <div key={product.id}>{product.name}</div>
//         ))}
  
//         {/* Hiển thị paginate */}
//         <ReactPaginate
//           totalPages={totalPages}
//           currentPage={currentPage}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     );
//   };

export default Product;
