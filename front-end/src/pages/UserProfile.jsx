import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PhotoCard from '../components/PhotoCard';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function ProfilePage() {
  const { id: routeId } = useParams();
  const localId = localStorage.getItem('id');
  const isOwner = routeId === localId;

  const [photos, setPhotos] = useState([]);
  const [showLiked, setShowLiked] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [showDialog, setShowDialog] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ title: '', description: '', image: null });
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editPhotoData, setEditPhotoData] = useState(null);


  const fetchPhotos = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = showLiked && isOwner
        ? '/api/get/photos/me'
        : `/api/get/photos/user/${routeId}`;

      const res = await axios.get(url, {
        headers: { Authorization: token },
      });

      const data = res.data.photos || res.data;
      setPhotos(data);

      if (data.length > 0 && data[0].user) {
        setUserInfo({
          name: data[0].user.name,
          email: data[0].user.email || '',
        });
      }
    } catch (error) {
      console.error('خطأ في جلب الصور:', error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [showLiked, routeId]);

  const handleEdit = (photo) => {
    setEditPhotoData(photo);
    setShowEditDialog(true);
  };

  const handleUpdatePhoto = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.put(
        `http://localhost:5000/api/photo/update/${editPhotoData._id}`,
        {
          title: editPhotoData.title,
          description: editPhotoData.description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      );
      setShowEditDialog(false);
      setEditPhotoData(null);
      fetchPhotos();
    } catch (error) {
      console.error('خطأ أثناء تعديل الصورة:', error);
      alert('فشل في تعديل الصورة.');
    }
  };

  const handleDelete = async (photo) => {
    if (!window.confirm('هل أنت متأكد من حذف الصورة؟')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/photo/delete/${photo._id}`, {
        headers: { Authorization: token },
      });
      setPhotos((prev) => prev.filter((p) => p._id !== photo._id));
    } catch (error) {
      alert('حدث خطأ أثناء حذف الصورة.');
      console.error(error);
    }
  };

  const handleCreatePhoto = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('title', newPhoto.title);
    formData.append('description', newPhoto.description);
    formData.append('image', newPhoto.image);

    try {
      await axios.post('http://localhost:5000/api/photo/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });
      setShowDialog(false);
      setNewPhoto({ title: '', description: '', image: null });
      fetchPhotos();
    } catch (error) {
      console.error('خطأ أثناء إنشاء الصورة:', error);
      alert('فشل في إنشاء الصورة.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Navbar />
      <header className="mt-9 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-1">{userInfo.name}</h1>
            {userInfo.email && <p className="text-gray-600 mb-4">{userInfo.email}</p>}
          </div>
          {isOwner && !showLiked && (
            <button
              onClick={() => setShowDialog(true)}
              className="bg-green-600 text-white px-5 py-2 rounded-full font-semibold"
            >
              + Add Photo
            </button>
          )}
        </div>

        {isOwner && (
          <div className="mt-2">
            <button
              onClick={() => setShowLiked(false)}
              className={`mr-4 px-4 py-2 rounded-full font-semibold ${!showLiked ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`}
            >
              My Photos
            </button>
            <button
              onClick={() => setShowLiked(true)}
              className={`px-4 py-2 rounded-full font-semibold ${showLiked ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`}
            >
              My Likes
            </button>
          </div>
        )}
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full text-lg py-10">
            No photos to display.
          </p>
        ) : (
          photos.map((photo) => (
            <PhotoCard
              key={photo._id}
              photo={photo}
              isFromProfile={isOwner && !showLiked}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </section>

      {/* Dialog: Add Photo */}
      {isOwner && showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Photo</h2>
            <form onSubmit={handleCreatePhoto} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newPhoto.title}
                onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
              <textarea
                placeholder="Description"
                value={newPhoto.description}
                onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewPhoto({ ...newPhoto, image: e.target.files[0] })}
                required
                className="w-full"
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowDialog(false)}
                  className="px-4 py-2 rounded bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white font-semibold"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dialog: Edit Photo */}
      {isOwner && showEditDialog && editPhotoData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Photo</h2>
            <form onSubmit={handleUpdatePhoto} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={editPhotoData.title}
                onChange={(e) => setEditPhotoData({ ...editPhotoData, title: e.target.value })}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
              <textarea
                placeholder="Description"
                value={editPhotoData.description}
                onChange={(e) => setEditPhotoData({ ...editPhotoData, description: e.target.value })}
                required
                className="w-full border border-gray-300 px-3 py-2 rounded"
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditDialog(false);
                    setEditPhotoData(null);
                  }}
                  className="px-4 py-2 rounded bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
