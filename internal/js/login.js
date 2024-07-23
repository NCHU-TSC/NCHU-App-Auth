function login(loginid, password, remember) {
    console.log(loginid + password + remember);
    var url = AuthApp.BACKEND_HOST + "/login.pye";
    var data = {
        account_name: loginid,
        password: password
    };

    $.post(url, data, function (result) {
        if (result.code == 0) {
            data = JSON.parse(result.data);
            auth_id = data['data']['auth_id'] ? data['data']['auth_id'] : 'none';
            user_id = data['data']['user_id'];
            token = data['data']['user_token'];

            if (remember) {
                localStorage.setItem("user_id", user_id);
                localStorage.setItem("token", token);
            } else {
                sessionStorage.setItem("user_id", user_id);
                sessionStorage.setItem("token", token);
            }

            if(auth_id === 'none') {
                window.location.href = "profile.html";
            } else {
                window.location.href = "profile.html" + "?auth_id=" + auth_id;
            }
        } else {
            console.log(result);
        }
    });
}