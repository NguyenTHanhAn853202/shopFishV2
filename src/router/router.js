// import Home from '~/Component/page/home';
import { lazy } from 'react';

const UpdateBill = lazy(()=>import('~/Component/page/updateBill'))
const Inventory = lazy(()=>import('~/Component/pageEmployee/inventory'))
const ExportBill = lazy(()=>import('~/Component/pageEmployee/exportBill'))
const ShowBill = lazy(()=>import('~/Component/pageEmployee/showBill'))
const Bill = lazy(()=>import('~/Component/pageEmployee/bill'))
const BoughtAtStore = lazy(() =>import('~/Component/pageEmployee/boughtAtStore'))

const AllBought = lazy(()=>import('~/Component/pageEmployee/allBought'))
const MyOrder = lazy(()=>import('~/Component/page/myOrder'));
const CreatePost = lazy(()=>import('~/Component/pageEmployee/createPost'))
const Statistic = lazy(() => import('~/Component/pageEmployee/statistic'))
const CreateAccount = lazy(() => import('~/Component/pageManager/createAccount'));
const SeeOrder = lazy(() => import('~/Component/pageEmployee/seeOrder'));
const Payment = lazy(() => import('~/Component/page/payment'));
const Home = lazy(() => import('~/Component/page/home'));



const NewsAndEvent = lazy(() => import('~/Component/page/newsAndEvent'))
const SpecifyNews = lazy(() => import('~/Component/page/specifyNews'))

const Introduct = lazy(() => import('~/Component/page/introduction'));
const Contact = lazy(() => import('~/Component/page/contact'));
const Brand = lazy(() => import('~/Component/page/brand'));
const Collection = lazy(() => import('~/Component/page/collection'));
const Store = lazy(() => import('~/Component/page/store'));
const Cart = lazy(() => import('~/Component/page/cart'));
const Product = lazy(() => import('~/Component/page/product'));
const Login = lazy(() => import('~/Component/page/login'));
const Register = lazy(() => import('~/Component/page/register'));
const updateInfoOfUser = lazy(() => import('~/Component/page/updateInfoOfUser'));
const UploadProduct = lazy(() => import('~/Component/page/uploadProduct'));
const DisableAccount = lazy(() => import('~/Component/page/disableAccount'));
const ChangePassword = lazy(() => import('~/Component/page/changePassword'));
const Category = lazy(() => import('~/Component/page/category'));

export const layoutPrivate = [
    {
        element: Cart,
        path: '/gio-hang',
    },
    {
        element: Payment,
        path: '/thanh-toan',
    },
    {
        element: updateInfoOfUser,
        path: '/cap-nhat-thong-tin',
    },
    {
        element: ChangePassword,
        path: '/doi-mat-khau',
    },
    {
        element:MyOrder,
        path:'/my-order'
    }
];

export const layout_employee_manager = [
    {
        element: UploadProduct,
        path: '/upload-product',
        slug:true
    },
    {
        element: UploadProduct,
        path:'/modify'
    },
    {
        element: SeeOrder,
        path: '/see-order',
    },
    {
        element: Statistic,
        path:'thong-ke'
    },
    {
        element: AllBought,
        path:'all-bought'
    },
    {
        element:CreatePost,
        path:'create-post'
    },{
        element:BoughtAtStore,
        path:'bought-at-store'
    },
    {
        element:Bill,
        path:'cap-nhat-hoa-don'
    },
    {
        element:ShowBill,
        path:'xem-hoa-don'
    },
    {
        element:ExportBill,
        path:'hoa-don-xuat'
    },
    {
        element:Inventory,
        path:'hang-ton'
    }
];

export const layoutManager = [
    {
        element: CreateAccount,
        path: 'tao-tai-khoan',
    },
    {
        element: DisableAccount,
        path: 'vo-hieu-hoa-tai-khoan',
    },
    {
        element: Category,
        path:'danh-muc'
    },
    {
        element:UpdateBill,
        path:'cap-nhat-thong-tin-ql',
        slug:true
    }
];

export const layoutPublic = [
    {
        element: Home,
        path: '/',
    },
    {
        element: Introduct,
        path: '/gioi-thieu',
    },
    {
        element: Contact,
        path: '/lien-he',
    },
    {
        element: Brand,
        path: '/thuong-hieu',
    },
    {
        element: Collection,
        path: '/bo-suu-tap',
    },
    {
        element: Store,
        path: '/cua-hang',
        slug: true,
    },

    {
        element: NewsAndEvent,
        path: '/tin-tuc-su-kien',
    },
    {
        element: Product,
        path: '/san-pham',
        slug: true,
    },
    {
        element:SpecifyNews,
        path: '/chi-tiet-tin-tuc'
    }
];
export const layoutAccount = [
    {
        element: Login,
        path: 'login',
    },
    {
        element: Register,
        path: 'register',
    },
];
