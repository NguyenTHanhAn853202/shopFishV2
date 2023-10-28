import styles from './styles.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Map() {
    return (
        <div className={cx('wrapper')}>
            <iframe
                className={cx('map')}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125805.74583126655!2d105.66483020782462!3d9.814242228398461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a05f22aae96d87%3A0x776dd59b1baed229!2zQ-G7rWEgSMOgbmcgQ8OhIEPhuqNuaCDDmnQ!5e0!3m2!1svi!2s!4v1692721603052!5m2!1svi!2s">
            </iframe>
        </div>
    );
}

export default Map;
