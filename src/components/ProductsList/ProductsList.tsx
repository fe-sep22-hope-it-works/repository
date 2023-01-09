import React, { useContext, useEffect, useState } from 'react';
import { getAllPhones } from '../api/phones';
import { Card } from '../Card';
import { Pagination } from '../Pagination';
import { PhoneContext } from '../PhoneContext/PhoneContext';

export const ProductsList: React.FC = () => {
  const [perPage, setPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  // const products: number[] // type will be changed after getting products
  //   = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]; // it`s a temp array, must be changed

  const {
    // cartPhoneIds,
    // setCartPhoneIds,
    phones,
    setPhones,
  } = useContext(PhoneContext);

  const getPhonesFromServer = async () => {
    const phonesFromServer = await getAllPhones();

    setPhones(phonesFromServer);
  };

  useEffect(() => {
    getPhonesFromServer();
  }, []);
  const perPageOptions = [4, 8, 12, 16, 20];

  const firstPageItemIndex = currentPage * perPage - perPage;

  const lastPageItemIndex = perPage * currentPage;

  const visibleItems = phones.slice(firstPageItemIndex, lastPageItemIndex);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(event.target.value));
  };

  return (
    <>
      <div className="perPage_form">
        <select
          data-cy="perPageSelector"
          id="perPageSelector"
          className="form-control"
          value={perPage}
          onChange={handleChange}
        >
          {perPageOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="grid">
        {visibleItems.map((phone) => (
          <Card
            key={phone.id}
            phone={phone}
          />
        ))}

      </div>

      <Pagination
        countOfItems={phones.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};
