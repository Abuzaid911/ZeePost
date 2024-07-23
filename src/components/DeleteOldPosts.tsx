import React, { useState } from 'react';
import { trpc } from '../utils/trpc';

const DeleteOldPosts = () => {
  const [date, setDate] = useState('');
  const deleteOldPosts = trpc.example.deleteOldPosts.useMutation();

  const handleDelete = async () => {
    try {
      await deleteOldPosts.mutateAsync({ beforeDate: date });
      alert('Old posts deleted successfully');
    } catch (error) {
      alert('Failed to delete old posts');
    }
  };

  return (
    <div className="delete-old-posts">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={handleDelete}
        className="ml-2 px-4 py-2 bg-red-600 text-white rounded"
      >
        Delete Old Posts
      </button>
    </div>
  );
};

export default DeleteOldPosts;