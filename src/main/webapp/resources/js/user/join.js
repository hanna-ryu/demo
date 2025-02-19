// 월 선택 박스
function show(anything) {
    document.querySelector(
            '.screens-user-join_dropdown__textBox').value = anything;
}

let dropdown = document.querySelector('.screens-user-join_dropdown');

// dropdown.onclick = function () {
//     dropdown.classList.toggle('active');
//
//     // 다른 영역 클릭 시 드롭다운 닫기
//     $(document).mouseup(function (e) {
//         let container = $(".screens-user-join_dropdown");
//         if (container.has(e.target).length === 0) {
//             container.removeClass('active');
//         }
//     });
// }

// 주소 검색 API
//본 예제에서는 도로명 주소 표기 방식에 대한 법령에 따라, 내려오는 데이터를 조합하여 올바른 주소를 구성하는 방법을 설명합니다.
// function search_postcode() {
//     new daum.Postcode({
//         oncomplete: function (data) {
//             // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
//
//             // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
//             // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
//             const roadAddr = data.roadAddress; // 도로명 주소 변수
//             let extraRoadAddr = ''; // 참고 항목 변수
//
//             // 법정동명이 있을 경우 추가한다. (법정리는 제외)
//             // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
//             if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
//                 extraRoadAddr += data.bname;
//             }
//             // 건물명이 있고, 공동주택일 경우 추가한다.
//             if (data.buildingName !== '' && data.apartment === 'Y') {
//                 extraRoadAddr += (extraRoadAddr !== '' ? ', '
//                         + data.buildingName
//                         : data.buildingName);
//             }
//             // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
//             if (extraRoadAddr !== '') {
//                 extraRoadAddr = ' (' + extraRoadAddr + ')';
//             }
//
//             // 우편번호와 주소 정보를 해당 필드에 넣는다.
//             document.getElementById(
//                     "screens-user-join_address_roadAddress").value = roadAddr;
//         }
//     }).open();
// }

// 회원가입 버튼 클릭 시
$(document).ready(function () {
    // 가입하기 버튼 클릭 이벤트
    $("#screens-user-join_signup_btn").click(function () {
        if (fnSubmit()) {

            // 사용자가 입력한 정보
            // const user_nickname = $("#screens-user-join_signup_id").val();
            const user_pwd = $("#screens-user-join_signup_pw").val();
            // const user_confirmPassword = $(
            //         "#screens-user-join_signup_pww").val();
            const user_name = $("#screens-user-join_signup_name").val();
            // const user_birthYear = $(
            //         ".screens-user-join_dropdown__textBox").val();
            // const user_birthMonth = $(
            //         ".screens-user-join_dropdown__textBox").val();
            // const user_birthDay = $(
            //         ".screens-user-join_dropdown__textBox").val();

            const user_email = $("#screens-user-join_signup_email").val();
            const user_phone_num1 = $("#screens-user-join_signup_phone_1").val();
            // const user_phone_num2 = $(
            //         "#screens-user-join_signup_phone_2").val();
            // const address = $("#screens-user-join_address_roadAddress").val();
            // const address_detail = $(
            //         "#screens-user-join_address_detailAddress").val();
            // const user_img_url = $("#file").val();
            // 서버로 전송할 데이터를 객체
            const userDto = {
                // user_nickname: user_nickname,
                user_pwd: user_pwd,
                user_name: user_name,
                // user_birth: new Date(user_birthYear, user_birthMonth - 1,
                //         user_birthDay),
                user_email: user_email,
                user_phone_num1: user_phone_num1,
                // user_phone_num2: user_phone_num2,
                // user_address: `${address} ${address_detail}`,
                // user_img_url: user_img_url
            };

            // 서버에 가입 요청
            $.ajax({
                type: "post",
                url: "/user/join", // 가입 요청을 처리하는 컨트롤러 주소
                contentType: "application/json",
                data: JSON.stringify(userDto),
                success: function (response) {
                    if (response == 1) {
                        alert("회원가입에 성공하였습니다.");

                        location.href = "/user/loginForm";
                    } else {
                        alert("회원가입에 실패하였습니다.");
                        location.href = "/user/join";
                    }
                },
                error: function (error) {
                    alert("중복된 이메일이 존재합니다.");
                }
            });
        }

    });
});
//
// $(function () {
//     $("#screens-user-join_id_Check_Btn").click(function () {
//         let user_nickname = $("#screens-user-join_signup_id").val();
//
//         $.ajax({
//             type: 'post',
//             url: "/user/checkNickname",
//             data: {"user_nickname": user_nickname},
//             success: function (data) {
//                 if (data == "N") {
//                     result = "이 아이디를 사용할 수 있습니다.";
//
//                     $("#id_input_helper_text").html(result).removeClass(
//                             "unavailable")
//
//                 } else { // 실패한 경우
//                     const result = "이 아이디는 이미 사용 중입니다.";
//                     $("#id_input_helper_text").html(result).addClass(
//                             "unavailable");
//
//                     $("#screens-user-join_signup_id").val("").trigger("focus");
//                 }
//             },
//             error: function (error) {
//                 const result = "이 아이디는 이미 사용 중입니다.";
//                 $("#id_input_helper_text").html(result).addClass(
//                         "unavailable");
//             },
//         });
//     });
// });
//
// $(function () {
//     $("#screens-user-join_signup_pw, #screens-user-join_signup_pww").on('input',
//             function () {
//                 let user_pw = $("#screens-user-join_signup_pw").val();
//                 let user_pww = $("#screens-user-join_signup_pww").val();
//
//                 if (user_pw === user_pww && user_pww !== null && user_pw
//                         !== null
//                         && user_pww !== "" && user_pw !== "") {
//                     result = "비밀번호가 일치합니다.";
//                     $("#pwd_input_helper_text").html(result).removeClass(
//                             "unavailable");
//                 } else if (user_pw !== user_pww) { // In case of failure
//                     const result = "비밀번호가 일치하지 않습니다.";
//                     $("#pwd_input_helper_text").html(result).addClass(
//                             "unavailable");
//                 } else if (user_pww == null || user_pw == null || user_pww == ""
//                         || user_pw == "") {
//                     const result = "비밀번호 확인을 입력해주세요.";
//                     $("#pwd_input_helper_text").html(result).addClass(
//                             "unavailable");
//                 }
//             });
// });

function fnSubmit() {

    // if ($("#screens-user-join_signup_id").val() == null || $(
    //         "#screens-user-join_signup_id").val() == "") {
    //     alert("아이디를 입력해주세요.");
    //     $("#screens-user-join_signup_id").focus();
    //
    //     return false;
    // }

    if ($("#screens-user-join_signup_pw").val() == null || $(
            "screens-user-join_signup_pw").val() == "") {
        alert("비밀번호를 입력해주세요.");
        $("#screens-user-join_signup_pw").focus();

        return false;
    }

    // if ($("#screens-user-join_signup_pww").val() == null || $(
    //         "#screens-user-join_signup_pww").val() == "") {
    //     alert("비밀번호 확인을 입력해주세요.");
    //     $("#screens-user-join_signup_pww").focus();
    //
    //     return false;
    // }

    if ($("#screens-user-join_signup_name").val() == null || $(
        "#screens-user-join_signup_name").val() == "") {
        alert("이름을 입력해주세요.");
        $("#screens-user-join_signup_name").focus();

        return false;
    }

    if ($("#screens-user-join_signup_email").val() == null || $(
        "#screens-user-join_signup_email").val() == "") {
        alert("이메일을 입력해주세요.");
        $("#screens-user-join_signup_email").focus();

        return false;
    }

    // 아이디 중복확인 버튼 눌렀는지 확인
    // if (!isButtonPressed) {
    //   alert("아이디 중복확인을 해주세요.");
    //   $("#screens-user-join_signup_id").focus();
    //
    //   return false;
    // }
    //
    // if ($("#screens-user-join_code_check_input").val() == null || $(
    //                 "#screens-user-join_code_check_input").val()
    //         == "") {
    //     alert("인증번호를 입력해주세요.");
    //     $("#screens-user-join_code_check_input").focus();
    //
    //     return false;
    // }

    let tel_num_1 = $("#screens-user-join_signup_phone_1").val();
    // let tel_num_2 = $("#screens-user-join_signup_phone_2").val();

    if (tel_num_1.length > 13) {
        alert("전화번호 형식이 맞지 않습니다.");
        $("#screens-user-join_signup_phone_1").focus();
        return false;
    }

    // if (tel_num_2.length > 13) {
    //     alert("전화번호 형식이 맞지 않습니다.");
    //     $("#screens-user-join_signup_phone_2").focus();
    //     return false;
    // }
//
//     let user_pw = $("#screens-user-join_signup_pw").val();
//     let user_pww = $("#screens-user-join_signup_pww").val();
//
//     if (user_pw !== user_pww) {
//         alert("비밀번호가 맞지 않습니다. 다시 확인해주세요.");
//
//         // Optionally, you can clear the password fields or take other actions
//         $("#screens-user-join_signup_pw").val("");
//         $("#screens-user-join_signup_pww").val("");
//         $("#screens-user-join_signup_pw").focus();
//     }
//
    if (confirm("회원가입하시겠습니까?")) {
        // if (isButtonPressed && isEmailCodeChecked && isIdCheckButtonPressed) {
            $("#screens-user-join_signup_btn").submit();
            return true;
        // } else {
        //     alert("인증번호 확인 혹은 아이디 중복체크를 확인하세요");
        // }
    }
// };
//
// $(function () {
//     $("#screens-user-join_signup_pw").on('input', function () {
//         const pw = $("#screens-user-join_signup_pw").val();
//         const num = pw.search(/[0-9]/g);
//         const eng = pw.search(/[a-z]/ig);
//         const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
//
//         if (pw.length < 8 || pw.length > 20) {
//             result = "8자리 ~ 20자리 이내로 입력해주세요.";
//             $("#pwd_input_first_helper_text").html(result).addClass(
//                     "unavailable");
//         } else if (pw.search(/\s/) != -1) {
//             result = "비밀번호는 공백 없이 입력해주세요.";
//             $("#pwd_input_first_helper_text").html(result).addClass(
//                     "unavailable");
//         } else if (num < 0 || eng < 0 || spe < 0) {
//             result = "영문,숫자, 특수문자를 혼합하여 입력해주세요.";
//             $("#pwd_input_first_helper_text").html(result).addClass(
//                     "unavailable");
//         } else {
//             result = "사용 가능한 비밀번호입니다.";
//             $("#pwd_input_first_helper_text").html(result).removeClass(
//                     "unavailable");
//         }
//     })
// });

// let timeLeft = 180;
// let timerInterval;
//
// function startTimer() {
//     countdown(); // 타이머 시작
// }
//
// function countdown() {
//     let minutes = Math.floor(timeLeft / 60);
//     let seconds = timeLeft % 60;
//
//     minutes = minutes < 10 ? "0" + minutes : minutes;
//     seconds = seconds < 10 ? "0" + seconds : seconds;
//
//     const timerElement = document.getElementsByClassName(
//             "certificationTime")[0];
//     timerElement.innerHTML = minutes + ":" + seconds;
//
//     if (timeLeft <= 0) {
//         timerElement.innerHTML = "만료";
//
//     } else {
//         timeLeft--;
//         timerInterval = setTimeout(countdown, 1000); // 1초마다 갱신
//     }
// }
//
// document.getElementById(
//         "screens-user-join_mail_code_check_Btn").addEventListener("click",
//         function () {
//             //  clearTimeout(timerInterval); // 타이머 중지
//             const timerElement = document.getElementsByClassName(
//                     "certificationTime")[0];
//             timerElement.innerHTML = "03:00"; // 초기값으로 타이머를 설정
//             timeLeft = 180; // 타이머 시간을 초기화
//         });

    let isButtonPressed = false;
    let isEmailCodeChecked = false;
    let isIdCheckButtonPressed = false;
}

// function IdcheckButtonPressed() {
//     isIdCheckButtonPressed = true;
//
// }
//
// $('#screens-user-join_mail_code_check_Btn').click(function () {
//     const inputCode = $('#screens-user-join_code_check_input').val();
//
//     isButtonPressed = true;
//
//     $.ajax({
//         type: 'post',
//         url: '/user/checkMailCode',
//         data: {"inputCode": inputCode},
//         success: function (data) {
//             if ("Y" === data) {
//                 alert('인증번호가 확인되었습니다.');
//                 isEmailCodeChecked = true;
//                 confirmAuthenticationNumber();
//                 clearTimeout(timerInterval); // 타이머 중지
//
//             } else {
//                 document.getElementById(
//                         "screens-user-join_code_check_input").disabled = false;
//                 alert('인증번호가 확인되지 않았습니다.');
//             }
//         },
//         error: function (xhr, status, error) {
//             document.getElementById(
//                     "screens-user-join_code_check_input").disabled = false;
//
//             alert('인증번호가 일치하지 않습니다. 다시 입력해주세요.');
//             console.error("Ajax request failed:", status, error);
//             console.log(xhr.responseText);
//         }
//     });
// });
//
// function confirmAuthenticationNumber() {
//     document.getElementById(
//             "screens-user-join_code_check_input").disabled = true;
//
// }

const autoHyphen = (target) => {
    target.value = target.value
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(
            /(\-{1,2})$/g,
            "");
}