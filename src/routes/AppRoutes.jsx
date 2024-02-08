// routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CatalogForm from '../components/catalog/CatalogForm';
import { CatalogList } from '../components/catalog/CatalogList';
import { NotFoundPage } from '../components/NotFoundComponent';

const routes = (
  <Routes>
    <Route exact path="/catalog/all" element={<CatalogList/>} />
    <Route exact path="/catalog/new" element={<CatalogForm/>} />
    <Route exact path="/" element={<CatalogForm/>} />
    {/* Add more routes for different options if needed */}
    <Route path="*" element={<NotFoundPage/>} />
  </Routes>
);

export default routes;