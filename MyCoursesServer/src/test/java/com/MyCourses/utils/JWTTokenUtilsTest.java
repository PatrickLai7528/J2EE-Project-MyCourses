package com.MyCourses.utils;

import org.junit.Test;

import static org.junit.Assert.*;

public class JWTTokenUtilsTest {

    @Test
    public void test1() {
        String token = JWTTokenUtils.sign("patricklai");
        System.out.println(token);
        assertTrue(JWTTokenUtils.verify(token));
        assertEquals("patricklai", JWTTokenUtils.getUsername(token));

        assertFalse(JWTTokenUtils.verify(token.replace("c","a")));
        assertNotEquals("fake username", JWTTokenUtils.getUsername(token));


        assertFalse(JWTTokenUtils.verify(token.replace("1","2")));
        assertNotEquals("patricklai", JWTTokenUtils.getUsername(token.replace("a","b")));
    }
}
