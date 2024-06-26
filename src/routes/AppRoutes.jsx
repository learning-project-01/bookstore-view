// routes.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import CatalogForm from "../components/catalog/CatalogForm";
import { CatalogList } from "../components/catalog/CatalogList";
import { CatalogComponent } from "../components/catalog/CatalogComponent";
import { Home } from "../components/dashboard/Home";
import { NotFoundPage } from "../components/NotFoundComponent";
import SignupComponent from "../components/SignupComponent";
import { AddressComponent } from "../components/profile/AddressComponent";
import LoginForm from "../components/LoginForm";
import AddressForm from "../components/address/AddressForm";
import {UserCatalog} from "../components/catalog/UserCatalog";
import {AddressList} from "../components/address/AddressList";
import {CartComponent} from "../components/cart/CartComponent"
import { Checkout } from "../components/cart/Checkout";
import { ProfileComponent } from "../components/profile/ProfileComponent";
import { OrderComponent, ViewOrder } from "../components/orders/OrderComponent";

const appRoutes = (
  <Routes>
      <Route exact path="shop" element={<UserCatalog />} />
      <Route exact path="orders" element={<OrderComponent />} />
      <Route exact path="orders/:orderId" element={<ViewOrder />} />
      <Route exact path="catalog" element={<CatalogComponent />}>
        <Route exact path="" element={<CatalogComponent />} />
        <Route exact path="all" element={<CatalogList />} />
        <Route exact path="new" element={<CatalogForm />} />
      </Route>
     
      <Route exact path="profile" element={<ProfileComponent />}>
          <Route exact path="address" element={<AddressComponent />}>
              <Route exact path="all" element={<AddressList />} />
              <Route exact path="" element={<AddressForm />} />
              <Route exact path="new" element={<AddressForm />} />
          </Route>
      </Route>
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/" element={<Home />} />
    {/* Add more routes for different options if needed */}
      <Route path="/signup" element={<SignupComponent />} />
      <Route path="/login" element={< LoginForm/>} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="cart" element={<CartComponent/>}/>
      <Route path="/checkout" element={<Checkout/>}/>
  </Routes>
);

export default appRoutes;