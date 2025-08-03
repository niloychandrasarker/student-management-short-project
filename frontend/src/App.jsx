import { useState, useEffect } from 'react';
import { Plus, GraduationCap } from 'lucide-react';
import { studentService } from './services/studentService';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  // Load students on component mount
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await studentService.getAllStudents();
      setStudents(data);
    } catch (err) {
      setError('Failed to load students. Please make sure your backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (studentData) => {
    try {
      const newStudent = await studentService.addStudent(studentData);
      setStudents(prev => [...prev, newStudent]);
      setShowForm(false);
    } catch (err) {
      setError('Failed to add student. Please try again.');
    }
  };

  const handleUpdateStudent = async (studentData) => {
    try {
      const updatedStudent = await studentService.updateStudent(editingStudent.id, studentData);
      setStudents(prev => 
        prev.map(student => 
          student.id === editingStudent.id ? updatedStudent : student
        )
      );
      setEditingStudent(null);
      setShowForm(false);
    } catch (err) {
      setError('Failed to update student. Please try again.');
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentService.deleteStudent(id);
        setStudents(prev => prev.filter(student => student.id !== id));
      } catch (err) {
        setError('Failed to delete student. Please try again.');
      }
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingStudent(null);
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
            <ErrorMessage message={error} onRetry={loadStudents} />
          </div>
        )}

        {/* Add Student Button */}
        {!showForm && (
          <div className="mb-6 text-center">
            <button
              onClick={() => setShowForm(true)}
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