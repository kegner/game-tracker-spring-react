package com.kegner.gametracker.config;

import com.kegner.gametracker.exceptions.UnauthenticatedRequestHandler;
import com.kegner.gametracker.security.UserDetailsServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UnauthenticatedRequestHandler unauthenticatedRequestHandler() {
        return new UnauthenticatedRequestHandler();
    }

    @Autowired
    public UserDetailsServiceImpl userService;
     
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userService);
        authProvider.setPasswordEncoder(passwordEncoder());
        auth.authenticationProvider(authProvider);
    }

	@Override
	protected void configure(HttpSecurity http) throws Exception {
        http
            .cors()
                .and()
            .csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and()
			.authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/v1/users")
                .permitAll()
                .antMatchers(HttpMethod.GET, "/signup", "/static/**", "/*.json", "/*.ico", "/*.png", "/*.txt")
                .permitAll()
                .anyRequest().authenticated()
                .and()
            .exceptionHandling()
                .authenticationEntryPoint(unauthenticatedRequestHandler())
                .and()
			.formLogin()
                .loginPage("/login")
				.permitAll()
				.and()
            .logout()
				.permitAll();
	}
}
