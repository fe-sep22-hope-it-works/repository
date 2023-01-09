import React from 'react';
import '../../styles/page-title.scss';
import { ProductsList } from '../ProductsList';

export const PhonesPage = () => (
  <>
    <div className="phones-page">
      <h1 className="page-title">Phones Page</h1>
      <ProductsList />
    </div>
  </>
);
