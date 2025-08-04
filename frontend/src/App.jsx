import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, GraduationCap, Sparkles } from 'lucide-react';
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
  const { students, loading, error, showForm, editingStudent, operationLoading } = useSelector(state => state.students);

  // Load students on component mount
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(clearError());
    dispatch(fetchStudents());
  };

  const handleAddStudent = async (studentData) => {
    const result = await dispatch(addStudent(studentData));
    if (addStudent.fulfilled.match(result)) {
      // Success - form will be closed automatically by Redux
    }
  };

  const handleUpdateStudent = async (studentData) => {
    const result = await dispatch(updateStudent({ id: editingStudent.id, studentData }));
    if (updateStudent.fulfilled.match(result)) {
      // Success - form will be closed automatically by Redux
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Student Management
              </h1>
              <div className="flex items-center mt-2">
                <Sparkles className="w-5 h-5 text-purple-500 mr-2" />
                <p className="text-gray-600 text-lg font-medium">Professional Student Database System</p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8">
            <ErrorMessage message={error} onRetry={handleRetry} />
          </div>
        )}

        {/* Add Student Button */}
        {!showForm && (
          <div className="mb-8 text-center">
            <button
              onClick={() => dispatch(setShowForm(true))}
              disabled={operationLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 flex items-center mx-auto shadow-xl hover:shadow-2xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-6 h-6 mr-3" />
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
            <div className="w-full max-w-6xl">
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