package com.universestay.project.user.controller;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.universestay.project.user.dto.UserDto;
import com.universestay.project.user.service.JoinService;
import com.universestay.project.user.service.MailSendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class JoinController {

    @Autowired
    private MailSendService mailSendService;
    @Autowired
    private JoinService joinService;

    private int code;

    // 회원가입 페이지
    @GetMapping("/join")
    public String join() {
        return "user/join";
    }

    @PostMapping("/join")
    public ResponseEntity<Integer> join(@RequestBody UserDto userDto) {
        try {
            if (joinService.registerUser(userDto) == 1) {
                System.out.println("userDto.getUser_name >> " + userDto.getUser_name());

            //--------- api 호출
            Map<String, String> apiCallResult = getMCToken();
            System.out.println("First API Result >> " + apiCallResult);

            if(apiCallResult.get("StatusCode").equals("1")) {

                int secondApiCallResult = callMCDEInsert(userDto.getUser_email(), userDto.getUser_name(), userDto.getUser_phone_num1(), apiCallResult.get("Token"));
                System.out.println("Second API Result >> " + secondApiCallResult);
                if(secondApiCallResult == 1) {
                    System.out.println("DE로 데이터 업로드 성공");
                } else {
                    System.out.println("DE로 데이터 업로드 에러");
                }
            }

            //--------- api 호출 end

            } else if (joinService.registerUser(userDto) != 1) {
                throw new RuntimeException("등록 실패");
            }
        } catch (Exception e) {
            System.out.println("Catch");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }
        return ResponseEntity.ok(1);
    }


    public int callJourney(String userEmail, String userName, String userMobile, String token) {
        try {
            // 요청 바디 설정
            Map<String, Object> requestBodyMap = new HashMap<>();

            // Data 맵 구성
            Map<String, String> dataMap = new HashMap<>();
            dataMap.put("email", userEmail);
            dataMap.put("name", userName);
            dataMap.put("mobile", userMobile);

            requestBodyMap.put("ContactKey", "TEST1");
            requestBodyMap.put("EventDefinitionKey", "ContactEvent-8ff2c8ed-459e-66cc-8239-ee74665ad4f0");
            requestBodyMap.put("Data", dataMap);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + token);

            // Map을 JSON 문자열로 변환
            ObjectMapper objectMapper = new ObjectMapper();

            //해당 코드를 사용하지 않으면 한글로 DE에서 한글로 들어가지 않는다.
            objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
            String requestBody = objectMapper.writeValueAsString(requestBodyMap);

            HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

            // 외부 API 호출
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.postForEntity("https://mc7ccd76-999rb-5nxks3yj-r068.rest.marketingcloudapis.com/interaction/v1/events", request, String.class);

            // 응답 처리
            if (response.getStatusCode().is2xxSuccessful()) {
                // 성공적으로 응답 받았을 경우
                System.out.println("Second API Response >> " + response.getBody());
                return 1;
            } else {
                // 실패한 경우
                System.out.println("Second API 호출 실패: " + response.getStatusCodeValue());
                return 0;
            }
        } catch (Exception e) {
            // 예외 처리
            System.out.println("Second API 예외 발생");
            e.printStackTrace();
            return 0;
        }
    }

    //MC Data Extensions에 데이터 insert
    public int callMCDEInsert(String userEmail, String userName, String userMobile, String token) {

        try {

            // 요청 바디 설정
            List<Map<String, String>> itemsList = new ArrayList<>();

            Map<String, String> firstItemMap = new HashMap<>();
            firstItemMap.put("email", userEmail);
            firstItemMap.put("name", userName);
            firstItemMap.put("mobile", userMobile);

            itemsList.add(firstItemMap);

            Map<String, List<Map<String, String>>> requestBodyMap = new HashMap<>();
            requestBodyMap.put("items", itemsList);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + token);

            // Map을 JSON 문자열로 변환
            ObjectMapper objectMapper = new ObjectMapper();

            //해당 코드를 사용하지 않으면 한글로 DE에서 한글로 들어가지 않는다.
            objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
            String requestBody = objectMapper.writeValueAsString(requestBodyMap);

            HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

            // 외부 API 호출
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.postForEntity("https://mc7ccd76-999rb-5nxks3yj-r068.rest.marketingcloudapis.com/data/v1/async/dataextensions/key:0CF9D1B2-7D94-45F4-A767-2077933B2EF7/rows", request, String.class);

            // 응답 처리
            if (response.getStatusCode().is2xxSuccessful()) {
                // 성공적으로 응답 받았을 경우
                System.out.println("Second API Response >> " + response.getBody());
                return 1;
            } else {
                // 실패한 경우
                System.out.println("Second API 호출 실패: " + response.getStatusCodeValue());
                return 0;
            }
        } catch (Exception e) {
            // 예외 처리
            System.out.println("Second API 예외 발생");
            e.printStackTrace();
            return 0;
        }
    }

    //토큰 발급 메소드
    public Map<String, String> getMCToken() {

        try {
            // 요청 바디 설정
            Map<String, String> requestBodyMap = new HashMap<>();
            requestBodyMap.put("grant_type", "client_credentials");
            requestBodyMap.put("client_id", "8u2qtgsmdint22boix7w2xwg");
            requestBodyMap.put("client_secret", "KaOy7yEUYsPoTlotZZK4YT6j");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Map을 JSON 문자열로 변환
            ObjectMapper objectMapper = new ObjectMapper();
            String requestBody = objectMapper.writeValueAsString(requestBodyMap);

            HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

            // 외부 API 호출
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.postForEntity("https://mc7ccd76-999rb-5nxks3yj-r068.auth.marketingcloudapis.com/v2/token", request, String.class);

            // 응답 처리
            if (response.getStatusCode().is2xxSuccessful()) {
                // 토큰을 성공적으로 받아왔을 경우
                String token = response.getBody();

                System.out.println("First response.getBody() >> " + response.getBody());

                Map<String, Object> responseMap = objectMapper.readValue(response.getBody(), new TypeReference<Map<String,Object>>(){});

                Map<String, String> resultMap = new HashMap<>();
                resultMap.put("StatusCode", "1");
                resultMap.put("Token", (String)responseMap.get("access_token"));

                return resultMap;
            } else {
                // 외부 API 호출이 실패한 경우
                System.out.println("API 호출 실패: " + response.getStatusCodeValue());
                Map<String, String> resultMap = new HashMap<>();
                resultMap.put("StatusCode", "0");
                return resultMap;
            }
        } catch (Exception e) {
            // 예외 처리
            System.out.println("First API 예외 발생");
            e.printStackTrace();
            Map<String, String> resultMap = new HashMap<>();
            resultMap.put("StatusCode", "0");
            return resultMap;
        }

    }

    // 닉네임 중복체크
//    @PostMapping("/checkNickname")
//    public ResponseEntity<String> checkId(@RequestParam("user_nickname") String user_nickname) {
//        try {
//            if (joinService.checkNickname(user_nickname) != 1) {
//                return ResponseEntity.ok("N");
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new RuntimeException(e);
//        }
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Y");
//    }

    // 이메일 인증
//    @GetMapping("/mailCheck")
//    public ResponseEntity<String> mailCheck(String email) {
//        try {
//            if (joinService.checkEmail(email) != 1) {
//                code = Integer.parseInt(mailSendService.joinEmail(email));
//                return ResponseEntity.ok("Y");
//            } else {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("N");
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("N");
//        }
//    }

    // 이메일 인증번호 확인
//    @PostMapping("/checkMailCode")
//    public ResponseEntity<String> checkMailCode(String inputCode) {
//        try {
//
//            if (code == Integer.parseInt(inputCode)) {
//                return ResponseEntity.ok("Y");
//            } else {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("N");
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("N");
//        }
//    }
}