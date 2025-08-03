package com.niloy.Service;

import com.niloy.modal.Student;

import java.util.List;

public interface StudentService {
    Student addStudent(Student student);
    Student getStudentById(Long id);
    Student updateStudent(Long id, Student student);
    List<Student> getAllStudents();
    void deleteStudent(Long id);
}
