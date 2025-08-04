import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { User, Mail, Phone, MapPin, Save, X, Loader2 } from 'lucide-react';

const StudentForm = ({ student, onSubmit, onCancel, isEditing = false }) => {
  const { operationLoading } = useSelector(state => state.students);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        email: student.email || '',
        phone: student.phone || '',
        address: student.address || ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: ''
      });
    }
  }, [student]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && !operationLoading) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border border-gray-100">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditing ? 'Edit Student' : 'Add New Student'}
        </h2>
        <p className="text-gray-500 mt-2">
          {isEditing ? 'Update student information' : 'Fill in the details below'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <User className="inline w-4 h-4 mr-2 text-blue-500" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-400'
              }`}
              placeholder="Enter student's full name"
              disabled={operationLoading}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1 flex items-center">
              <span className="w-4 h-4 mr-1">⚠</span>{errors.name}
            </p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Mail className="inline w-4 h-4 mr-2 text-green-500" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-400'
              }`}
              placeholder="student@example.com"
              disabled={operationLoading}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 flex items-center">
              <span className="w-4 h-4 mr-1">⚠</span>{errors.email}
            </p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Phone className="inline w-4 h-4 mr-2 text-purple-500" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-400'
              }`}
              placeholder="+1 (555) 123-4567"
              disabled={operationLoading}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1 flex items-center">
              <span className="w-4 h-4 mr-1">⚠</span>{errors.phone}
            </p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="inline w-4 h-4 mr-2 text-orange-500" />
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-none ${
                errors.address ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-400'
              }`}
              placeholder="Enter complete address"
              disabled={operationLoading}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1 flex items-center">
              <span className="w-4 h-4 mr-1">⚠</span>{errors.address}
            </p>}
          </div>
        </div>

        <div className="flex space-x-4 pt-6">
          <button
            type="submit"
            disabled={operationLoading}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 flex items-center justify-center font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {operationLoading ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Save className="w-5 h-5 mr-2" />
            )}
            {operationLoading ? 'Processing...' : (isEditing ? 'Update Student' : 'Add Student')}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={operationLoading}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200 flex items-center justify-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-5 h-5 mr-2" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;