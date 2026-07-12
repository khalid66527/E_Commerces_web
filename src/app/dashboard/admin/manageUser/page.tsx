import ManageAllUaer from '@/components/dashboardcomponents/ManageAllUaer';
import { getUsers } from '@/lib/api/users';
import React from 'react';

export const dynamic = 'force-dynamic';

const ManageAllUaerPage = async () => {
    const users = await getUsers();
    return (
        <div>
            <ManageAllUaer initialUsers={users}></ManageAllUaer>
        </div>
    );
};

export default ManageAllUaerPage;