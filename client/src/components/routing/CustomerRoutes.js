import { React } from "react"
import { Route } from "react-router-dom"
import CustomerRoute from "./authentication/CustomerRoute"
import {Dashboard} from '../layout/Dashboard'
export const customerRoutes = 
    <Route>
        <Route exact path="/dashboard" element={<CustomerRoute><Dashboard /></CustomerRoute>} />
    </Route>
