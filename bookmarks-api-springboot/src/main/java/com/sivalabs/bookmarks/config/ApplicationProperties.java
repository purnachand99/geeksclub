package com.sivalabs.bookmarks.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "bookmarks")
@Data
public class ApplicationProperties {
    private boolean importDataEnabled = true;
    private String importFilePath;

    private JwtConfig jwt = new JwtConfig();

    @Data
    public static class JwtConfig {
        private static final Long DEFAULT_JWT_TOKEN_EXPIRES = 604_800L;

        private String issuer = "bookmarks";
        private String header = "Authorization";
        private Long expiresIn = DEFAULT_JWT_TOKEN_EXPIRES;
        private String secret = "";
    }
}
