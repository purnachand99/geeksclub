package com.sivalabs.bookmarks.domain.repositories;

import com.sivalabs.bookmarks.domain.entities.Tag;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByName(String tag);
}
