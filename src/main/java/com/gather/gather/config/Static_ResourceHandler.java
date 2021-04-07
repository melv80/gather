package com.gather.gather.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.GzipResourceResolver;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
@EnableWebMvc
public class Static_ResourceHandler implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // When overriding default behavior, you need to add default(/) as well as added static paths(/webapp).

        // src/main/resources/static/...
        registry
            //.addResourceHandler("/**") // « /css/myStatic.css
            .addResourceHandler("/static/**") // « /static/css/myStatic.css
            .addResourceLocations("classpath:/static/") // Default Static Loaction
            .setCachePeriod( 3600 )
            .resourceChain(true) // 4.1
           ; //4.1

        // src/main/resources/templates/static/...
        registry
            .addResourceHandler("/templates/**") // « /templates/style.css
            .addResourceLocations("classpath:/templates/static/");


    }
}