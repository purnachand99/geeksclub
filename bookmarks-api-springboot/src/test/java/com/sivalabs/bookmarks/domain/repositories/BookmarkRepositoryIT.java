package com.sivalabs.bookmarks.domain.repositories;

import static com.sivalabs.bookmarks.utils.TestConstants.PROFILE_IT;
import static org.assertj.core.api.Assertions.assertThat;

import com.sivalabs.bookmarks.domain.entities.Bookmark;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

@DataJpaTest(
        properties = {
            "spring.test.database.replace=NONE",
            "spring.datasource.url=jdbc:tc:postgresql:12.3:///testdb"
        })
@ActiveProfiles(PROFILE_IT)
class BookmarkRepositoryIT {

    @Autowired private BookmarkRepository bookmarkRepository;

    @Test
    void shouldReturnAllLinks() {
        List<Bookmark> allBookmarks = bookmarkRepository.findAll();
        assertThat(allBookmarks).isNotNull();
    }
}
