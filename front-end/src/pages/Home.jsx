import { useEffect, useState } from 'react';
import axios from 'axios';
import PhotoCard from '../components/PhotoCard';
import Navbar from '../components/Navbar';
export default function HomePage() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPhotos = async (pageNum = 1) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`/api/get/photos?page=${pageNum}`, {
        headers: {
          Authorization:token|| '',
        }
      });
      if (pageNum === 1) {
        setPhotos(res.data.photos);
      } else {
        setPhotos(prev => [...prev, ...res.data.photos]);
      }
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Error fetching photos:', err);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPhotos(nextPage);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <Navbar />
      <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-6 text-center">Norr Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map(photo => (
          <PhotoCard key={photo._id} photo={photo} />
        ))}
      </div>
      {page < totalPages && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-gray-900 text-white rounded-full shadow hover:bg-gray-800 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
