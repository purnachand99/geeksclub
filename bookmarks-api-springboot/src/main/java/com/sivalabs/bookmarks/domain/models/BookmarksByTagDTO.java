package com.sivalabs.bookmarks.domain.models;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookmarksByTagDTO {
    private Long id;
    private String name;
    private List<BookmarkDTO> bookmarks;
}
