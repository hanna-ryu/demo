<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="c" uri="http://java.sun.com/jstl/core_rt" %>
<html>
<head>
    <title>main</title>
    <link rel="stylesheet" href="/resources/css2/style.css">
</head>
<body>
    <div class="popBackground">
    <div class="popUpContent">
        <div class="logoImg">
            <img src="/resources/img/logo/small_logo_no_bgd2.png" alt="Logo">
        </div>

        <div class="info-container">
            <p class="infoTitle">사용자 이메일</p>
            <p class="infoContent"><%= request.getParameter("userEmail") %></p>
            <p class="infoTitle">숙소 지역</p>
            <p class="infoContent"><%= request.getParameter("roomCity") %></p>
        </div>

        <label class="check">
            <input type="checkbox" id="promotionCheckbox" name="promotionCheckbox">
            관련 지역에 대한 프로모션 알림을 받으시겠습니까?
        </label>
    </div>
    </div>
</body>

</html>