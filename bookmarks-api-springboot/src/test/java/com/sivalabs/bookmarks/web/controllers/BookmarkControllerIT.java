package com.sivalabs.bookmarks.web.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.sivalabs.bookmarks.common.AbstractIntegrationTest;
import org.junit.jupiter.api.Test;

class BookmarkControllerIT extends AbstractIntegrationTest {

    @Test
    void shouldFetchLinksFirstPage() throws Exception {
        this.mockMvc.perform(get("/api/bookmarks")).andExpect(status().isOk());
    }

    @Test
    void shouldFetchLinksSecondPage() throws Exception {
        this.mockMvc.perform(get("/api/bookmarks?page=2")).andExpect(status().isOk());
    }

    @Test
    void shouldFetchLinksByTag() throws Exception {
        this.mockMvc.perform(get("/api/tags/spring-boot")).andExpect(status().isOk());
    }

    @Test
    void shouldSearchLinks() throws Exception {
        this.mockMvc.perform(get("/api/bookmarks/search?query=spring")).andExpect(status().isOk());
    }
}
