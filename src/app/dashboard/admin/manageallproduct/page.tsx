import ManageAllProduct from '@/components/dashboardcomponents/ManageAllProduct';
import { getProducts } from '@/lib/api/products';
import React from 'react';

export const dynamic = 'force-dynamic';

const ManageAllProductPage = async () => {
    const products = await getProducts();
    return (
        <div>
            <ManageAllProduct initialProducts={products}></ManageAllProduct>
        </div>
    );
};

export default ManageAllProductPage;