package com.gather.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class StaticResourceHandler implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // When overriding default behavior, you need to add default(/) as well as added static paths(/webapp).

        // src/main/resources/static/...
        registry
            .addResourceHandler("/static/**") // « /static/css/myStatic.css
            .addResourceLocations("classpath:/static/") // Default Static Loaction
            .setCachePeriod( 0 )
            .resourceChain(true) // 4.1
           ;

        registry
            .addResourceHandler("/templates/**") // « /templates/style.css
            .addResourceLocations("classpath:/templates/static/");


    }
}