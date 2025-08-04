import { Edit, Trash2, User, Mail, Phone, MapPin, Users } from 'lucide-react';

const StudentList = ({ students, onEdit, onDelete }) => {
  if (students.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
        <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Users className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-700 mb-3">No Students Found</h3>
        <p className="text-gray-500 text-lg">Start building your student database by adding your first student!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Users className="mr-3 w-8 h-8" />
          Students Directory
          <span className="ml-3 bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
            {students.length} {students.length === 1 ? 'Student' : 'Students'}
          </span>
        </h2>
      </div>
      
      <div className="divide-y divide-gray-100">
        {students.map((student, index) => (
          <div key={student.id} className="p-8 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {student.name}
                    </h3>
                    <p className="text-sm text-gray-500">Student ID: #{student.id}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-16">
                  <div className="flex items-center p-3 bg-green-50 rounded-xl border border-green-100">
                    <Mail className="w-5 h-5 mr-3 text-green-600" />
                    <div>
                      <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Email</p>
                      <p className="text-gray-800 font-medium">{student.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-purple-50 rounded-xl border border-purple-100">
                    <Phone className="w-5 h-5 mr-3 text-purple-600" />
                    <div>
                      <p className="text-xs text-purple-600 font-medium uppercase tracking-wide">Phone</p>
                      <p className="text-gray-800 font-medium">{student.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start md:col-span-2 p-3 bg-orange-50 rounded-xl border border-orange-100">
                    <MapPin className="w-5 h-5 mr-3 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-orange-600 font-medium uppercase tracking-wide">Address</p>
                      <p className="text-gray-800 font-medium">{student.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 ml-6">
                <button
                  onClick={() => onEdit(student)}
                  className="p-3 text-blue-600 hover:bg-blue-100 rounded-xl transition-all duration-200 hover:shadow-md group/btn"
                  title="Edit student"
                >
                  <Edit className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                </button>
                
                <button
                  onClick={() => onDelete(student.id)}
                  className="p-3 text-red-600 hover:bg-red-100 rounded-xl transition-all duration-200 hover:shadow-md group/btn"
                  title="Delete student"
                >
                  <Trash2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
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