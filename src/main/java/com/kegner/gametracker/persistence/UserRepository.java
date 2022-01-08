package com.kegner.gametracker.persistence;

import com.kegner.gametracker.model.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    public User findByUsername(String username);

    public int countByUsername(String username);

}
