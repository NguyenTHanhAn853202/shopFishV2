import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import Products from '~/Component/product';
// import { useParams } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
import Content from './content';
import ContextProduct from './ConetextProduct';

const cx = classNames.bind(styles);

function Product() {
    

    return (
        <ContextProduct>
            <div className={cx('wrapper', { wrap: true })}>
                <div className={cx('contain', { grid: true })}>
                    <div className={cx('sidebar')}>
                        <Products  />
                    </div>
                    <div className={cx('content')}>
                        <Content />
                    </div>
                </div>
            </div>
        </ContextProduct>
    );
}

export default Product;
