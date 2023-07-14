import { Fragment, React } from "react"
import { Route } from "react-router-dom"
import NoAuthRoute from "./authentication/NoAuthRoute"
import SignUp from "../auth/SignUp"
import Login from "../auth/Login"
import ForgotPassword from "../auth/ForgotPassword"
import ResetPassword from "../auth/ResetPassword"
export const  authRoutes  = 
<Route>
    <Route exact path='/sign-up' element={<NoAuthRoute><SignUp /></NoAuthRoute>}/>
    <Route exact path='/login' element={<NoAuthRoute><Login /></NoAuthRoute>} />
    <Route exact path='/forgot-password' element={<NoAuthRoute><ForgotPassword /></NoAuthRoute>} />
    <Route exact path="/reset-password/:token" element={<NoAuthRoute><ResetPassword /></NoAuthRoute>} />
</Route>
