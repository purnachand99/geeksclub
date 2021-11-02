package com.sivalabs.geeksclub.bookmarks.web.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.sivalabs.geeksclub.bookmarks.models.BookmarksDTO;
import com.sivalabs.geeksclub.bookmarks.services.BookmarkService;
import com.sivalabs.geeksclub.common.AbstractWebMvcTest;
import com.sivalabs.geeksclub.users.services.SecurityService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Pageable;

@WebMvcTest(controllers = BookmarkController.class)
class BookmarkControllerTest extends AbstractWebMvcTest {
    @MockBean protected BookmarkService bookmarkService;

    @MockBean protected SecurityService securityService;

    @Test
    void shouldFetchBookmarksFirstPage() throws Exception {
        BookmarksDTO bookmarksDTO = new BookmarksDTO();
        given(bookmarkService.getAllBookmarks(any(Pageable.class))).willReturn(bookmarksDTO);

        this.mockMvc.perform(get("/api/bookmarks")).andExpect(status().isOk());
    }
}
