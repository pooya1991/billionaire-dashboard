import React from 'react';
import './scss/_custom.scss';
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Strategies = React.lazy(() => import('./views/Strategy/Strategy'));
const CreateStrategy = React.lazy(() => import('./views/Strategy/CreateStrategy'))
const BackTest = React.lazy(() => import('./views/BackTest/BackTest'))
const Register = React.lazy(() => import('./views/Pages/Register/Register'))
const Activate = React.lazy(() => import('./views/Activate/Activate'))
const ChangePassword = React.lazy(() => import('./views/Pages/Login/ChangePassword'))
//const StrategyTest = React.lazy(() => import('./views/StrategiesTest/index'))
//const SnackBar = React.lazy(()=>import('./views/Snack/Snack'))
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'خانه' },
  //{ path: '/snack', exact: true, name: 'اسنک',component:SnackBar},
  //{ path: '/strategyEdit', exact: true, name: 'استراتژی تست',component:StrategyTest},
  { path: '/ChangePassword', exact: true, name: 'فراموشی رمز عبور' ,component:ChangePassword},
  { path: '/dashboard', name: 'پنل کاربری', component: Dashboard },
  { path: '/strategies/new', name: 'ایجاد استراتژی', component: CreateStrategy },
  { path: '/strategies', exact: true, name: 'استراتژی ها', component: Strategies },
  { path: '/backtest', exact: true, name: 'بک تست', component: BackTest},
  { path: '/register', exact: true, name: 'ثبت نام', component: Register },
  { path: '/activate', exact: true, name: 'فعال سازی استراتژی', component: Activate },
];

export default routes;
