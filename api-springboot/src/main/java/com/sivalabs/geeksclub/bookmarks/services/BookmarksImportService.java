package com.sivalabs.geeksclub.bookmarks.services;

import static com.sivalabs.geeksclub.common.utils.AppConstants.SYSTEM_USER_ID;

import com.opencsv.CSVIterator;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import com.sivalabs.geeksclub.bookmarks.models.BookmarkDTO;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class BookmarksImportService {
    private final BookmarkService bookmarkService;

    public void importBookmarks(String fileName) throws IOException, CsvValidationException {
        log.info("Importing bookmarks from file: {}", fileName);
        long count = 0L;

        ClassPathResource file = new ClassPathResource(fileName, this.getClass());
        try (InputStreamReader inputStreamReader =
                        new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8);
                CSVReader csvReader = new CSVReader(inputStreamReader)) {
            csvReader.skip(1);
            CSVIterator iterator = new CSVIterator(csvReader);

            while (iterator.hasNext()) {
                String[] nextLine = iterator.next();
                BookmarkDTO bookmarkDTO = new BookmarkDTO();
                bookmarkDTO.setUrl(nextLine[0]);
                bookmarkDTO.setTitle(nextLine[1]);
                bookmarkDTO.setCreatedUserId(SYSTEM_USER_ID);
                bookmarkDTO.setCreatedAt(LocalDateTime.now());
                if (nextLine.length > 2 && StringUtils.trimToNull(nextLine[2]) != null) {
                    bookmarkDTO.setTags(
                            Arrays.asList(StringUtils.trimToEmpty(nextLine[2]).split("\\|")));
                }
                bookmarkService.createBookmark(bookmarkDTO);
                count++;
            }
        }
        log.info("Imported {} bookmarks from file {}", count, fileName);
    }
}
