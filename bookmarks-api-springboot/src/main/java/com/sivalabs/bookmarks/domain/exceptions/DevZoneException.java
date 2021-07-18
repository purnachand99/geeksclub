package com.sivalabs.bookmarks.domain.exceptions;

public class DevZoneException extends RuntimeException {
    public DevZoneException(String message) {
        super(message);
    }

    public DevZoneException(Throwable cause) {
        super(cause);
    }
}
