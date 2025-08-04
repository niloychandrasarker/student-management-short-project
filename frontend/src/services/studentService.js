import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/students';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const studentService = {
  // Get all students
  getAllStudents: async () => {
    try {
      const response = await api.get('');
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch students');
    }
  },

  // Get student by ID
  getStudentById: async (id) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching student:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch student');
    }
  },

  // Add new student
  addStudent: async (student) => {
    try {
      const response = await api.post('', student);
      return response.data;
    } catch (error) {
      console.error('Error adding student:', error);
      throw new Error(error.response?.data?.message || 'Failed to add student');
    }
  },

  // Update student
  updateStudent: async (id, student) => {
    try {
      const response = await api.put(`/${id}`, student);
      return response.data;
    } catch (error) {
      console.error('Error updating student:', error);
      throw new Error(error.response?.data?.message || 'Failed to update student');
    }
  },

  // Delete student
  deleteStudent: async (id) => {
    try {
      await api.delete(`/${id}`);
      return id;
    } catch (error) {
      console.error('Error deleting student:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete student');
    }
  },
};