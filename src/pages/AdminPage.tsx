import React from 'react';
import { NextPage } from 'next';
import DeleteOldPosts from '../components/DeleteOldPosts';

const AdminPage: NextPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Page</h1>
      <DeleteOldPosts />
    </div>
  );
};

export default AdminPage;