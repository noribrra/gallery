import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      {/* اللوجو - استبدل بمكون اللوجو الخاص بك */}
      <div className="mb-6">
        <img
          src={logo}  // غير هذا لمسار شعارك الصحيح
          alt="Norr Gallery Logo"
          className="w-24 h-24 mx-auto"
        />
      </div>

      {/* العنوان */}
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">404</h1>

      {/* نص التوضيح */}
      <p className="text-xl text-gray-600 mb-8 max-w-md text-center">
        الصفحة التي تبحث عنها غير موجودة أو قد تم نقلها.
      </p>

      {/* زر العودة للصفحة الرئيسية */}
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
      >
        العودة إلى الصفحة الرئيسية
      </button>
    </div>
  );
}
