const { faEnvelope, faCopyright } = require('@fortawesome/free-regular-svg-icons');
const { faLocationDot, faPhone } = require('@fortawesome/free-solid-svg-icons');
const { FontAwesomeIcon } = require('@fortawesome/react-fontawesome');

export const contactAt = [
    {
        title: 'Ninh Kiều, Cần Thơ',
        icon: <FontAwesomeIcon icon={faLocationDot} />,
    },
    {
        title: '0355644732',
        icon: <FontAwesomeIcon icon={faPhone} />,
    },
    {
        title: 'maitrungtin4732@gmail.com',
        icon: <FontAwesomeIcon icon={faEnvelope} />,
    },
    {
        title: 'shop cánh cảnh',
        icon: <FontAwesomeIcon icon={faCopyright} />,
    },
];
