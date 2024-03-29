import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '~/defaultLayout';
import FormAccount from '~/formAccount';
import { layoutPublic, layoutPrivate, layoutAccount, layout_employee_manager, layoutManager } from './router/router';
import { Fragment } from 'react';
import LazyCom from './utils/lazyCom';
import ScrollToTop from './utils/scrollToTop';
import { EmployeeAndManager, Manager, Protect } from '~/protect';
import { Context } from './GlobalContext';
import { CART, CATEGOTY, LOGIN } from './GlobalContext/key';
import { useEffect, useContext } from 'react';
import request from '~/utils/Api/request';
import { refreshToken } from '~/api-server/refeshToken';
import { get } from './api-server/cartService';
import { getInfoOfUser } from './api-server/getInfoOfUser';
import { show } from './api-server/category';
import { im } from 'mathjs';
import Chatbox from '~/chatbot';

function App() {
    const [states, dispatch] = useContext(Context);



    request.interceptors.request.use(
        async (config) => {
            const url = config.url;
            if (
                url.includes('get-products') ||
                url.includes('login') ||
                url.includes('account/refreshTokens') ||
                url.includes('logout')
            )
                return config;
            const timeNow = Date.now();
            const expiresIn = localStorage.expiresIn * 1;
            if (timeNow > expiresIn) {
                const token = localStorage.refreshToken;
                const {
                    token: { accessToken, expiresIn },
                } = await refreshToken(token);
                localStorage.accessToken = accessToken;
                localStorage.expiresIn = expiresIn;
            }
            config.headers.Authorization = localStorage.accessToken;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    useEffect(() => {
        dispatch({ key: LOGIN, value: localStorage.login });
        (async function () {
            try {
                const category = await show()
                dispatch({key:CATEGOTY,value:category})

                if (localStorage.id || localStorage.userName) {
                    await getInfoOfUser();
                    const data = await get(1);
                    dispatch({ key: CART, value: data });
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    return (
        <ScrollToTop>
            <DefaultLayout>
                <LazyCom>
                    <Routes>
                        {layoutPublic.map((item) => {
                            const Layout = item.element || Fragment;
                            return (
                                <Route key={item} path={item.path} element={<Layout />}>
                                    {item.slug && <Route path=":slug" element={<Layout />} />}
                                </Route>
                            );
                        })}
                        <Route path="/account" element={<FormAccount />}>
                            {layoutAccount.map((item, index) => {
                                const Layout = item.element || Fragment;
                                return (
                                    <Route key={index} path={item.path} element={<Layout />}>
                                        {item.slug && <Route path=":slug" element={<Layout />} />}
                                    </Route>
                                );
                            })}
                        </Route>
                        {layoutPrivate.map((item) => {
                            const Layout = item.element || Fragment;
                            return (
                                <Route key={item} element={<Protect />}>
                                    <Route path={item.path} element={<Layout />}>
                                        {item.slug && <Route path=":slug" element={<Layout />} />}
                                    </Route>
                                </Route>
                            );
                        })}
                        {layout_employee_manager.map((item, index) => {
                            const Layout = item.element || Fragment;
                            return (
                                <Route element={<EmployeeAndManager />} key={index}>
                                    <Route path={item.path} element={<Layout />}>
                                        {item.slug && <Route path=":slug" element={<Layout />} />}
                                    </Route>
                                </Route>
                            );
                        })}
                        {layoutManager.map((item, index) => {
                            const Layout = item.element || Fragment;
                            return (
                                <Route path="/quan-ly" key={index} element={<Manager />}>
                                    <Route path={item.path} element={<Layout />}>
                                        {item.slug && <Route path=":slug" element={<Layout />} />}
                                    </Route>
                                </Route>
                            );
                        })}
                    </Routes>
                </LazyCom>
                <Chatbox/>
            </DefaultLayout>
        </ScrollToTop>
    );
}

export default App;
