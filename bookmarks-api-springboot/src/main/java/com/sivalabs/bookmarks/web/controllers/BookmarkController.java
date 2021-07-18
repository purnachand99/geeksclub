package com.sivalabs.bookmarks.web.controllers;

import static org.springframework.data.domain.Sort.Direction.DESC;

import com.sivalabs.bookmarks.annotations.AnyAuthenticatedUser;
import com.sivalabs.bookmarks.annotations.CurrentUser;
import com.sivalabs.bookmarks.domain.entities.User;
import com.sivalabs.bookmarks.domain.exceptions.ResourceNotFoundException;
import com.sivalabs.bookmarks.domain.models.BookmarkDTO;
import com.sivalabs.bookmarks.domain.models.BookmarksDTO;
import com.sivalabs.bookmarks.domain.services.BookmarkService;
import com.sivalabs.bookmarks.domain.services.SecurityService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class BookmarkController {
    private final BookmarkService bookmarkService;
    private final SecurityService securityService;

    @GetMapping("/bookmarks")
    public BookmarksDTO getBookmarks(
            @PageableDefault(size = 15)
                    @SortDefault.SortDefaults({@SortDefault(sort = "createdAt", direction = DESC)})
                    Pageable pageable) {
        log.info("Fetching bookmarks with page: {}", pageable.getPageNumber());
        return bookmarkService.getAllBookmarks(pageable);
    }

    @GetMapping("/bookmarks/search")
    public BookmarksDTO search(
            @RequestParam(name = "query", required = false) String query,
            @PageableDefault(size = 15)
                    @SortDefault.SortDefaults({@SortDefault(sort = "createdAt", direction = DESC)})
                    Pageable pageable) {
        BookmarksDTO data;
        if (StringUtils.isNotEmpty(query)) {
            log.info("Searching bookmarks for {} with page: {}", query, pageable.getPageNumber());
            data = bookmarkService.searchBookmarks(query, pageable);
        } else {
            log.info("Fetching bookmarks with page: {}", pageable.getPageNumber());
            data = bookmarkService.getAllBookmarks(pageable);
        }
        return data;
    }

    @GetMapping("/tags/{tag}")
    public BookmarksDTO bookmarksByTag(
            @PathVariable(name = "tag") String tag,
            @PageableDefault(size = 15)
                    @SortDefault.SortDefaults({@SortDefault(sort = "createdAt", direction = DESC)})
                    Pageable pageable) {
        log.info("Fetching bookmarks for tag {} with page: {}", tag, pageable.getPageNumber());
        return bookmarkService.getBookmarksByTag(tag, pageable);
    }

    @GetMapping("/bookmarks/{id}")
    public BookmarkDTO getBookmark(@PathVariable Long id) {
        return bookmarkService.getBookmarkById(id).orElse(null);
    }

    @PostMapping("/bookmarks")
    @ResponseStatus(HttpStatus.CREATED)
    @AnyAuthenticatedUser
    public void createBookmark(
            @Valid @RequestBody BookmarkDTO bookmark, @CurrentUser User loginUser) {
        bookmark.setCreatedUserId(loginUser.getId());
        bookmarkService.createBookmark(bookmark);
    }

    @PutMapping("/bookmarks/{id}")
    @AnyAuthenticatedUser
    public void updateBookmark(
            @PathVariable Long id,
            @Valid @RequestBody BookmarkDTO bookmark,
            @CurrentUser User loginUser) {
        this.checkPrivilege(id, bookmark, loginUser);
        bookmark.setId(id);
        bookmark.setCreatedUserId(loginUser.getId());
        bookmarkService.updateBookmark(bookmark);
    }

    @DeleteMapping("/bookmarks/{id}")
    @AnyAuthenticatedUser
    public ResponseEntity<Void> deleteBookmark(@PathVariable Long id, @CurrentUser User loginUser) {
        BookmarkDTO bookmark = bookmarkService.getBookmarkById(id).orElse(null);
        this.checkPrivilege(id, bookmark, loginUser);
        bookmarkService.deleteBookmark(id);
        return ResponseEntity.ok().build();
    }

    private void checkPrivilege(Long bookmarkId, BookmarkDTO bookmark, User loginUser) {
        if (bookmark == null
                || !(bookmark.getCreatedUserId().equals(loginUser.getId())
                        || securityService.isCurrentUserAdmin())) {
            throw new ResourceNotFoundException("Bookmark not found with id=" + bookmarkId);
        }
    }
}
