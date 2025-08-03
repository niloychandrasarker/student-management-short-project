import { Edit, Trash2, User, Mail, Phone, MapPin } from 'lucide-react';

const StudentList = ({ students, onEdit, onDelete }) => {
  if (students.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Students Found</h3>
        <p className="text-gray-500">Add your first student to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-indigo-600">
        <h2 className="text-xl font-bold text-white flex items-center">
          <User className="mr-2" />
          Students ({students.length})
        </h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {students.map((student) => (
          <div key={student.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <User className="w-5 h-5 mr-2 text-indigo-600" />
                  {student.name}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{student.email}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{student.phone}</span>
                  </div>
                  
                  <div className="flex items-start md:col-span-2">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span>{student.address}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => onEdit(student)}
                  className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
                  title="Edit student"
                >
                  <Edit className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => onDelete(student.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                  title="Delete student"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;