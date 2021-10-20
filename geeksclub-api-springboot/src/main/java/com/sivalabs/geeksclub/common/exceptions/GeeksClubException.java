package com.sivalabs.geeksclub.common.exceptions;

public class GeeksClubException extends RuntimeException {
    public GeeksClubException(String message) {
        super(message);
    }

    public GeeksClubException(Throwable cause) {
        super(cause);
    }
}
