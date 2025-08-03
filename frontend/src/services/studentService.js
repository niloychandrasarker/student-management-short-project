const API_BASE_URL = 'http://localhost:8080/students';

export const studentService = {
  // Get all students
  getAllStudents: async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

  // Get student by ID
  getStudentById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch student');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  },

  // Add new student
  addStudent: async (student) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });
      if (!response.ok) {
        throw new Error('Failed to add student');
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding student:', error);
      throw error;
    }
  },

  // Update student
  updateStudent: async (id, student) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });
      if (!response.ok) {
        throw new Error('Failed to update student');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  },

  // Delete student
  deleteStudent: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete student');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  },
};