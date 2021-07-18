package com.sivalabs.bookmarks.config;

import com.sivalabs.bookmarks.domain.services.BookmarkService;
import com.sivalabs.bookmarks.domain.services.BookmarksImportService;
import java.util.Locale;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {
    private final ApplicationProperties applicationProperties;
    private final BookmarkService bookmarkService;
    private final BookmarksImportService bookmarksImportService;
    private final MessageSource messageSource;

    @Override
    public void run(String... args) throws Exception {
        log.info(
                messageSource.getMessage(
                        "startup-message", null, "Welcome to Bookmarks!!!", Locale.getDefault()));
        if (applicationProperties.isImportDataEnabled()) {
            bookmarkService.deleteAllBookmarks();
            String fileName = applicationProperties.getImportFilePath();
            bookmarksImportService.importBookmarks(fileName);
        } else {
            log.info("Data importing is disabled");
        }
    }
}
