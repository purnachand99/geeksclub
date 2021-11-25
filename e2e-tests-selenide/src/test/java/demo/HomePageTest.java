package demo;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import static com.codeborne.selenide.Selenide.*;

class HomePageTest {

    @Test
    void open_geeksclub_homepage() {
        open("http://localhost:8080");
        $(By.name("query")).val("springboot").pressEnter();
    }
}
