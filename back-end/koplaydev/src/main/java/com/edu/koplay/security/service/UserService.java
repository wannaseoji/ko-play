package com.edu.koplay.security.service;

import com.edu.koplay.model.Student;
import com.edu.koplay.repository.StudentRepository;
import com.edu.koplay.security.dto.UserDTO;
import com.edu.koplay.security.util.ROLE;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class UserService implements UserDetailsService {
    Logger logger = LoggerFactory.getLogger(UserService.class);
    private final StudentRepository studentRepository;

    @Autowired
    public UserService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student login(Student entity) {
        return studentRepository.findByStudentIdAndStudentPw(entity.getStudentId(), entity.getStudentPw());
    }

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        logger.info("아이디: "+id);
        Student member = studentRepository.findByStudentIdAndIsDeletedFalse(id)
                .orElseThrow(() -> new UsernameNotFoundException("없는 회원 입니다..."));
        UserDTO userDTO = new UserDTO();
        userDTO.setData(member.getStudentId());
        userDTO.setRoles(ROLE.STUDENT.name());
        return User.builder().username(member.getStudentId()).password(member.getStudentPw()).roles(ROLE.STUDENT.name()).build();
    }
}
