package com.sivalabs.geeksclub.bookmarks.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BookmarksDTO {
    private List<BookmarkDTO> data;
    private long totalElements;
    private int pageNumber;
    private int totalPages;

    @JsonProperty("isFirst")
    private boolean isFirst;

    @JsonProperty("isLast")
    private boolean isLast;

    @JsonProperty("hasNext")
    private boolean hasNext;

    @JsonProperty("hasPrevious")
    private boolean hasPrevious;

    public BookmarksDTO(Page<BookmarkDTO> bookmarksPage) {
        this.setData(bookmarksPage.getContent());
        this.setTotalElements(bookmarksPage.getTotalElements());
        this.setPageNumber(bookmarksPage.getNumber() + 1); // 1 - based page numbering
        this.setTotalPages(bookmarksPage.getTotalPages());
        this.setFirst(bookmarksPage.isFirst());
        this.setLast(bookmarksPage.isLast());
        this.setHasNext(bookmarksPage.hasNext());
        this.setHasPrevious(bookmarksPage.hasPrevious());
    }
}
