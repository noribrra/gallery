// PhotoCard.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function PhotoCard({ photo, isFromProfile, onEdit, onDelete }) {
  const [liked, setLiked] = useState(photo.likedByCurrentUser);
  const [likesCount, setLikesCount] = useState(photo.likesCount);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLike = async () => {
    try {
      const res = await axios.post(`/api/photos/${photo._id}/like`, {}, {
        headers: {
          Authorization: localStorage.getItem('token') || '',
        },
      });
      setLiked(res.data.likedByCurrentUser);
      setLikesCount(res.data.likesCount);
    } catch (error) {
      console.error('Error liking photo:', error);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `https://gallery-dye0.onrender.com${photo.imageUrl}`;
    link.download = photo.imageUrl.split('/').pop();
    link.click();
  };

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="rounded-2xl shadow-lg overflow-hidden cursor-pointer bg-white hover:scale-105 transition-transform duration-300 relative"
      >
        <img
          src={`https://gallery-dye0.onrender.com${photo.imageUrl}`}
          alt={photo.title}
          className="w-full h-64 object-cover"
        />

        {/* Buttons edit & delete if isFromProfile */}
        {isFromProfile && (
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit && onEdit(photo);
              }}
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete && onDelete(photo);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        )}

        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">{photo.title}</h2>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/user/${photo.user._id}`);
            }}
            className="text-sm text-black hover:decoration-blue-950"
          >
            By {photo.user.name}
          </button>
          <p className="text-xs text-gray-400">{formatDistanceToNow(new Date(photo.createdAt))} ago</p>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLike();
              }}
              className={`px-4 py-1 rounded-full text-white ${liked ? 'bg-red-500' : 'bg-gray-400'} hover:opacity-90`}
            >
              ♥ {likesCount}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-xl shadow-xl max-w-2xl w-full relative"
          >
            <img
              src={`https://gallery-dye0.onrender.com/${photo.imageUrl}`}
              alt={photo.title}
              className="w-full h-96 object-contain rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">{photo.title}</h2>
            <p className="text-gray-600 mb-4">{photo.description}</p>
            <div className="flex justify-between">
              <button
                onClick={handleDownload}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
              >
                Download
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
