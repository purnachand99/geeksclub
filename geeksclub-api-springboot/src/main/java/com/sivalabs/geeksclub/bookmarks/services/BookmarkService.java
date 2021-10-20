package com.sivalabs.geeksclub.bookmarks.services;

import com.sivalabs.geeksclub.bookmarks.entities.Bookmark;
import com.sivalabs.geeksclub.bookmarks.entities.Tag;
import com.sivalabs.geeksclub.bookmarks.mappers.BookmarkMapper;
import com.sivalabs.geeksclub.bookmarks.models.BookmarkDTO;
import com.sivalabs.geeksclub.bookmarks.models.BookmarksDTO;
import com.sivalabs.geeksclub.bookmarks.repositories.BookmarkRepository;
import com.sivalabs.geeksclub.bookmarks.repositories.TagRepository;
import com.sivalabs.geeksclub.common.exceptions.ResourceNotFoundException;
import com.sivalabs.geeksclub.users.repositories.UserRepository;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class BookmarkService {
    private final BookmarkRepository bookmarkRepository;
    private final TagRepository tagRepository;
    private final UserRepository userRepository;
    private final BookmarkMapper bookmarkMapper;

    @Transactional(readOnly = true)
    public BookmarksDTO getAllBookmarks(Pageable pageable) {
        Page<Long> pageOfBookmarkIds = bookmarkRepository.fetchBookmarkIds(pageable);
        List<Bookmark> bookmarks =
                bookmarkRepository.findBookmarksWithTags(
                        pageOfBookmarkIds.getContent(), pageable.getSort());
        Page<Bookmark> pageOfAuthors =
                new PageImpl<>(bookmarks, pageable, pageOfBookmarkIds.getTotalElements());
        return buildBookmarksResult(pageOfAuthors);
    }

    @Transactional(readOnly = true)
    public BookmarksDTO searchBookmarks(String query, Pageable pageable) {
        Page<Long> pageOfBookmarkIds =
                bookmarkRepository.fetchBookmarkIdsByTitleContainingIgnoreCase(query, pageable);
        List<Bookmark> bookmarks =
                bookmarkRepository.findBookmarksWithTags(
                        pageOfBookmarkIds.getContent(), pageable.getSort());
        Page<Bookmark> pageOfAuthors =
                new PageImpl<>(bookmarks, pageable, pageOfBookmarkIds.getTotalElements());
        return buildBookmarksResult(pageOfAuthors);
    }

    @Transactional(readOnly = true)
    public BookmarksDTO getBookmarksByTag(String tag, Pageable pageable) {
        Optional<Tag> tagOptional = tagRepository.findByName(tag);
        if (tagOptional.isEmpty()) {
            throw new ResourceNotFoundException("Tag " + tag + " not found");
        }
        Page<Long> pageOfBookmarkIds = bookmarkRepository.fetchBookmarkIdsByTag(tag, pageable);
        List<Bookmark> bookmarks =
                bookmarkRepository.findBookmarksWithTags(
                        pageOfBookmarkIds.getContent(), pageable.getSort());
        Page<Bookmark> pageOfAuthors =
                new PageImpl<>(bookmarks, pageable, pageOfBookmarkIds.getTotalElements());
        return buildBookmarksResult(pageOfAuthors);
    }

    @Transactional(readOnly = true)
    public Optional<BookmarkDTO> getBookmarkById(Long id) {
        log.debug("process=get_bookmark_by_id, id={}", id);
        return bookmarkRepository.findById(id).map(bookmarkMapper::toDTO);
    }

    public BookmarkDTO createBookmark(BookmarkDTO bookmark) {
        bookmark.setId(null);
        log.debug("process=create_bookmark, url={}", bookmark.getUrl());
        return bookmarkMapper.toDTO(saveBookmark(bookmark));
    }

    public BookmarkDTO updateBookmark(BookmarkDTO bookmark) {
        log.debug("process=update_bookmark, url={}", bookmark.getUrl());
        return bookmarkMapper.toDTO(saveBookmark(bookmark));
    }

    public void deleteBookmark(Long id) {
        log.debug("process=delete_bookmark_by_id, id={}", id);
        bookmarkRepository.deleteById(id);
    }

    public void deleteAllBookmarks() {
        log.debug("process=delete_all_bookmarks");
        bookmarkRepository.deleteAllInBatch();
    }

    @Transactional(readOnly = true)
    public List<Tag> findAllTags() {
        Sort sort = Sort.by("name");
        return tagRepository.findAll(sort);
    }

    private BookmarksDTO buildBookmarksResult(Page<Bookmark> bookmarks) {
        log.trace("Found {} bookmarks in page", bookmarks.getNumberOfElements());
        return new BookmarksDTO(bookmarks.map(bookmarkMapper::toDTO));
    }

    private Bookmark saveBookmark(BookmarkDTO bookmarkDTO) {
        Bookmark bookmark = new Bookmark();
        if (bookmarkDTO.getId() != null) {
            bookmark = bookmarkRepository.findById(bookmarkDTO.getId()).orElse(bookmark);
        }
        bookmark.setUrl(bookmarkDTO.getUrl());
        bookmark.setTitle(getTitle(bookmarkDTO));
        bookmark.setCreatedBy(userRepository.getById(bookmarkDTO.getCreatedUserId()));
        bookmark.setCreatedAt(LocalDateTime.now());
        Set<Tag> tagsList = new HashSet<>();
        bookmarkDTO
                .getTags()
                .forEach(
                        tagName -> {
                            if (!tagName.trim().isEmpty()) {
                                Tag tag = createTagIfNotExist(tagName.trim());
                                tagsList.add(tag);
                            }
                        });
        bookmark.setTags(tagsList);
        return bookmarkRepository.save(bookmark);
    }

    private String getTitle(BookmarkDTO bookmark) {
        if (StringUtils.isNotEmpty(bookmark.getTitle())) {
            return bookmark.getTitle();
        }
        try {
            Document doc = Jsoup.connect(bookmark.getUrl()).get();
            return doc.title();
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
        return bookmark.getUrl();
    }

    private Tag createTagIfNotExist(String tagName) {
        Optional<Tag> tagOptional = tagRepository.findByName(tagName);
        if (tagOptional.isPresent()) {
            return tagOptional.get();
        }
        Tag tag = new Tag();
        tag.setName(tagName);
        return tagRepository.save(tag);
    }
}
