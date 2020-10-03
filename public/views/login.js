<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
    <title>로그인</title>
    <script type="text/javascript">
        function login(){
            var loginForm = document.loginForm;
            var userId = loginForm.userId.value;
            var password = loginForm.password.value;

            if(!userId || !password){
                alert("아이디와 비밀번호를 모두 입력해주세요.")
            }else{
                loginForm.submit();
            }
        }
    </script>
</head>
<body>
    <form name="loginForm" action="/"  method="post">
            계정 : <input type="text" name="userId"><br>
            비밀번호 : <input type="password" name="password"><br>
            <input type="hidden" name="loginType" value="admin">
            <input type="button" onclick="login()" value="로그인">
    </form>
</body>
</html>
