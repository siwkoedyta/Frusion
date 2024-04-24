package com.esiwko.frusion.controller.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.esiwko.frusion.controller.errors.BadRequestEx;
import lombok.extern.log4j.Log4j2;
import lombok.val;
import org.springframework.stereotype.Component;

import java.security.KeyFactory;
import java.security.interfaces.RSAKey;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;

@Component
@Log4j2
public class JwtService {
    private static final Duration EXPIRE_DURATION = Duration.ofDays(30);
    private static final String ISSUER = "frusion";
    private final RSAPrivateKey privateKey = loadPrivateKey();
    private final RSAPublicKey publicKey = loadPublicKey();
    private final Algorithm algorithm = Algorithm.RSA256(publicKey, privateKey);
    private final JWTVerifier jwtVerifier = JWT.require(algorithm)
            .withIssuer(ISSUER)
            .build();


    public String create(AuthDetails authDetails) {
        return JWT.create()
                .withIssuer(ISSUER)
                .withSubject(authDetails.role().name() + '/' + authDetails.id())
                .withExpiresAt(Instant.now().plus(EXPIRE_DURATION))
                .sign(algorithm);
    }

    public AuthDetails verify(String token) {
        try {
            val roleAndId = jwtVerifier.verify(token)
                    .getSubject().split("/");
            val role = AuthDetails.Role.valueOf(roleAndId[0]);
            val id = roleAndId[1];

            return new AuthDetails(role, id);
        } catch (JWTVerificationException e) {
            log.error(e);
            throw new BadRequestEx("JWT_INVALID");
        }
    }

    public String verify(String token, AuthDetails.Role role) {
        val auth = verify(token);
        if (auth.role() == role) return auth.id();
        else throw new BadRequestEx("ROLE_INVALID");
    }

    private RSAPrivateKey loadPrivateKey() {
        try {
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(loadFile("private_key.pem"));
            return (RSAPrivateKey) keyFactory.generatePrivate(keySpec);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private RSAPublicKey loadPublicKey() {
        try {
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(loadFile("public_key.pem"));
            return (RSAPublicKey) keyFactory.generatePublic(keySpec);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private byte[] loadFile(String name) {
        try (val bytesStream = this.getClass().getClassLoader().getResourceAsStream(name)) {
            return Base64.getDecoder().decode(new String(bytesStream.readAllBytes()).replaceAll("\\s+", ""));
        } catch (Exception ex) {
            throw new RuntimeException("File load error", ex);
        }
    }

}
