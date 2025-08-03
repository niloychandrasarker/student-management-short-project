import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, GraduationCap } from 'lucide-react';
import { 
  fetchStudents, 
  addStudent, 
  updateStudent, 
  deleteStudent,
  setShowForm,
  setEditingStudent,
  clearError,
  cancelForm
} from './store/slices/studentSlice';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const dispatch = useDispatch();
  const { students, loading, error, showForm, editingStudent } = useSelector(state => state.students);

  // Load students on component mount
  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  const handleRetry = () => {
    dispatch(clearError());
    dispatch(fetchStudents());
  };

  const handleAddStudent = async (studentData) => {
    dispatch(addStudent(studentData));
  };

  const handleUpdateStudent = async (studentData) => {
    dispatch(updateStudent({ id: editingStudent.id, studentData }));
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(id));
    }
  };

  const handleEditStudent = (student) => {
    dispatch(setEditingStudent(student));
    dispatch(setShowForm(true));
  };

  const handleCancelForm = () => {
    dispatch(cancelForm());
  };

  const handleFormSubmit = (studentData) => {
    if (editingStudent) {
      handleUpdateStudent(studentData);
    } else {
      handleAddStudent(studentData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="w-12 h-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Student Management System</h1>
          </div>
          <p className="text-gray-600 text-lg">Manage your students efficiently and effectively</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} onRetry={handleRetry} />
          </div>
        )}

        {/* Add Student Button */}
        {!showForm && (
          <div className="mb-6 text-center">
            <button
              onClick={() => dispatch(setShowForm(true))}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors flex items-center mx-auto shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Student
            </button>
          </div>
        )}

        {/* Main Content */}
        <div className="flex justify-center">
          {showForm ? (
            <StudentForm
              student={editingStudent}
              onSubmit={handleFormSubmit}
              onCancel={handleCancelForm}
              isEditing={!!editingStudent}
            />
          ) : (
            <div className="w-full max-w-4xl">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <StudentList
                  students={students}
                  onEdit={handleEditStudent}
                  onDelete={handleDeleteStudent}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;