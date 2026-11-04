package com.iot.backend.controller;

import com.iot.backend.dto.AuthResponse;
import com.iot.backend.dto.LoginRequest;
import com.iot.backend.dto.RegisterRequest;
import com.iot.backend.entity.User;
import com.iot.backend.repository.UserRepository;
import com.iot.backend.security.JwtTokenProvider;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostConstruct
    public void initDefaultUser() {
        if (!userRepository.existsByUsername("binh")) {
            User defaultUser = new User(
                    "binh",
                    passwordEncoder.encode("binh2502"),
                    "Nguyễn Thanh Bình",
                    "ROLE_ADMIN"
            );
            userRepository.save(defaultUser);
            System.out.println("-> [BẢO MẬT] Đã tạo tài khoản mặc định: username='binh', password='binh2502'");
        }
    }

    /**
     * 1. Đăng ký tài khoản mới
     * POST /api/v1/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request) {
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Tên đăng nhập không được để trống!"));
        }
        if (request.getPassword() == null || request.getPassword().length() < 6) {
            return ResponseEntity.badRequest().body(Map.of("message", "Mật khẩu phải từ 6 ký tự trở lên!"));
        }

        if (userRepository.existsByUsername(request.getUsername().trim())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Tên đăng nhập '" + request.getUsername() + "' đã tồn tại!"));
        }

        String fullName = (request.getFullName() != null && !request.getFullName().trim().isEmpty())
                ? request.getFullName().trim() : "Người dùng mới";

        User newUser = new User(
                request.getUsername().trim(),
                passwordEncoder.encode(request.getPassword()),
                fullName,
                "ROLE_USER"
        );
        userRepository.save(newUser);

        // Tự động tạo token trả về luôn cho người dùng sau khi đăng ký
        String token = tokenProvider.generateToken(newUser.getUsername());

        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse(
                token, newUser.getUsername(), newUser.getFullName(), newUser.getRole()
        ));
    }

    /**
     * 2. Đăng nhập và lấy Bearer Token
     * POST /api/v1/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = tokenProvider.generateToken(loginRequest.getUsername());

            Optional<User> userOpt = userRepository.findByUsername(loginRequest.getUsername());
            String fullName = userOpt.map(User::getFullName).orElse(loginRequest.getUsername());
            String role = userOpt.map(User::getRole).orElse("ROLE_USER");

            return ResponseEntity.ok(new AuthResponse(token, loginRequest.getUsername(), fullName, role));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Tài khoản hoặc mật khẩu không chính xác!"));
        }
    }

    /**
     * 3. Lấy thông tin tài khoản hiện tại từ Token
     * GET /api/v1/auth/me
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Chưa xác thực!"));
        }

        String username = auth.getName();
        return userRepository.findByUsername(username)
                .map(user -> ResponseEntity.ok((Object) Map.of(
                        "id", user.getId(),
                        "username", user.getUsername(),
                        "fullName", user.getFullName(),
                        "role", user.getRole(),
                        "createdAt", user.getCreatedAt() != null ? user.getCreatedAt().toString() : ""
                )))
                .orElse(ResponseEntity.notFound().build());
    }
}

