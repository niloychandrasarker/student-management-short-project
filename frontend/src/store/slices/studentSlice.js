import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { studentService } from '../../services/studentService';

// Async thunks for API calls
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await studentService.getAllStudents();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch students');
    }
  }
);

export const addStudent = createAsyncThunk(
  'students/addStudent',
  async (studentData, { rejectWithValue }) => {
    try {
      const response = await studentService.addStudent(studentData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add student');
    }
  }
);

export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async ({ id, studentData }, { rejectWithValue }) => {
    try {
      const response = await studentService.updateStudent(id, studentData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update student');
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (id, { rejectWithValue }) => {
    try {
      await studentService.deleteStudent(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete student');
    }
  }
);

const initialState = {
  students: [],
  loading: false,
  error: null,
  showForm: false,
  editingStudent: null,
  operationLoading: false,
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setShowForm: (state, action) => {
      state.showForm = action.payload;
      if (!action.payload) {
        state.editingStudent = null;
      }
    },
    setEditingStudent: (state, action) => {
      state.editingStudent = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    cancelForm: (state) => {
      state.showForm = false;
      state.editingStudent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch students
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload || [];
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add student
      .addCase(addStudent.pending, (state) => {
        state.operationLoading = true;
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.students.push(action.payload);
        state.showForm = false;
        state.editingStudent = null;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.operationLoading = false;
        state.error = action.payload;
      })
      // Update student
      .addCase(updateStudent.pending, (state) => {
        state.operationLoading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.operationLoading = false;
        const index = state.students.findIndex(student => student.id === action.payload.id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
        state.showForm = false;
        state.editingStudent = null;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.operationLoading = false;
        state.error = action.payload;
      })
      // Delete student
      .addCase(deleteStudent.pending, (state) => {
        state.operationLoading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.students = state.students.filter(student => student.id !== action.payload);
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.operationLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setShowForm, setEditingStudent, clearError, cancelForm } = studentSlice.actions;
export default studentSlice.reducer;