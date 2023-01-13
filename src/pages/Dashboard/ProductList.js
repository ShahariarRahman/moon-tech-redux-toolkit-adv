import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, removeProduct } from "../../features/products/productsSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, isLoading, deleteSuccess, isError, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);


  useEffect(() => {
    if (!isLoading && deleteSuccess) {
      toast.success("Successfully Removed", { id: "removeProduct" });
    };
  }, [isLoading, deleteSuccess,]);

  if (isLoading) {
    return <p>Loading...</p>
  };

  return (
    <div className='flex flex-col justify-center items-center h-full w-full '>
      <div className='w-full max-w-7xl mx-auto rounded-lg  bg-white shadow-lg border border-gray-200'>
        <header className='px-5 py-4 border-b border-gray-100'>
          <div className='font-semibold text-gray-800'>Products</div>
        </header>

        <div className='overflow-x-auto p-3'>
          <table className='table-auto w-full'>
            <thead className='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
              <tr>
                <th></th>
                <th className='p-2'>
                  <div className='font-semibold text-left'>Product Name</div>
                </th>
                <th className='p-2'>
                  <div className='font-semibold text-left'>Brand</div>
                </th>
                <th className='p-2'>
                  <div className='font-semibold text-left'>In Stock</div>
                </th>
                <th className='p-2'>
                  <div className='font-semibold text-left'>Price</div>
                </th>
                <th className='p-2'>
                  <div className='font-semibold text-center'>Action</div>
                </th>
              </tr>
            </thead>

            <tbody className='text-sm divide-y divide-gray-100'>
              {products.map(({ model, brand, price, status, _id }) => (
                <tr key={_id}>
                  <td className='p-2'>
                    <input type='checkbox' className='w-5 h-5' value='id-1' />
                  </td>
                  <td className='p-2'>
                    <div className='font-medium text-gray-800'>{model}</div>
                  </td>
                  <td className='p-2'>
                    <div className='text-left capitalize'>{brand}</div>
                  </td>
                  <td className='p-2'>
                    <div className='text-left'>
                      {status ? (
                        <p className='text-green-500 font-medium'>Available</p>
                      ) : (
                        <p className='text-red-500 font-medium'>Stock out</p>
                      )}
                    </div>
                  </td>
                  <td className='p-2'>
                    <div className='text-left font-medium text-indigo-500'>
                      {price}
                    </div>
                  </td>
                  <td className='p-2'>
                    <div className='flex justify-center'>
                      <button onClick={() => dispatch(removeProduct(_id))}>
                        <svg
                          className='w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    // </section>
  );
};

export default ProductList;
