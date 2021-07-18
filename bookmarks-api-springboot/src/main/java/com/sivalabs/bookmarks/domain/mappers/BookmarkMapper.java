package com.sivalabs.bookmarks.domain.mappers;

import com.sivalabs.bookmarks.domain.entities.Bookmark;
import com.sivalabs.bookmarks.domain.entities.Tag;
import com.sivalabs.bookmarks.domain.entities.User;
import com.sivalabs.bookmarks.domain.models.BookmarkDTO;
import com.sivalabs.bookmarks.domain.services.SecurityService;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BookmarkMapper {
    private final SecurityService securityService;

    public BookmarkDTO toDTO(Bookmark bookmark) {
        BookmarkDTO dto = new BookmarkDTO();
        dto.setId(bookmark.getId());
        dto.setUrl(bookmark.getUrl());
        dto.setTitle(bookmark.getTitle());
        dto.setCreatedUserId(bookmark.getCreatedBy().getId());
        dto.setCreatedUserName(bookmark.getCreatedBy().getName());
        dto.setCreatedAt(bookmark.getCreatedAt());
        dto.setUpdatedAt(bookmark.getUpdatedAt());
        if (bookmark.getTags() != null) {
            dto.setTags(bookmark.getTags().stream().map(Tag::getName).collect(Collectors.toList()));
        }
        boolean editable = this.canCurrentUserEditLink(dto);
        dto.setEditable(editable);
        return dto;
    }

    public boolean canCurrentUserEditLink(BookmarkDTO bookmarkDTO) {
        User loginUser = securityService.loginUser();
        return loginUser != null
                && bookmarkDTO != null
                && (Objects.equals(bookmarkDTO.getCreatedUserId(), loginUser.getId())
                        || securityService.isCurrentUserAdminOrModerator(loginUser));
    }
}
