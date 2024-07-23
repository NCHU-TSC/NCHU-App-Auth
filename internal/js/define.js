class Account {
    constructor(user_ID=null, login_ID=null, name=null, email=null, valid_email=null, gender=null, department=null, grade=null, role=null, photo=null, google_ID=null) {
        this.user_ID = user_ID;
        this.login_ID = login_ID;
        this.name = name;
        this.email = email;
        this.valid_email = valid_email;
        this.gender = gender;
        this.department = department;
        this.grade = grade;
        this.role = role;
        this.photo = photo;
        this.google_ID = google_ID;
    }
}

function noop() {}

const gender_basic = ['Unselected', 'Male', 'Female'];
function displayGenderOther(now_gender) {
    return gender_basic.includes(now_gender) ? '其他' : now_gender;
}

class AuthApp {
    static BACKEND_HOST = "https://api.auth.nchu.app";
    static params = new URLSearchParams(window.location.search);
    static authID = AuthApp.params.get('auth_id') || "none";
    static default_client_name = "NCHU App Authenticator";
    static client_name = "NCHU App Authenticator";
    static client_image = "/internal/brand/nchuapp.png";

    static account = new Account();

    // For Profile Settings Page
    static requestAccount(action=noop, callback=noop) {
        // send request to get account info
        // if success, set account info
        // else, redirect to login page
        XHR_GET(AuthApp.BACKEND_HOST + "/res.pye?type=auth_settings").then((response) => {
            if (response.status === "success") {
                let data = response.data;
                AuthApp.account.login_ID = data.Login_ID;
                AuthApp.account.name = data.Name;
                AuthApp.account.email = data.Email;
                AuthApp.account.valid_email = data.Valid_Email;
                AuthApp.account.gender = data.Gender;
                AuthApp.account.department = data.Department;
                AuthApp.account.grade = data.Grade;
                AuthApp.account.role = data.Role;
                AuthApp.account.photo = data.Photo;
                AuthApp.account.google_ID = data.Google_ID;

                action();
            } else {
                window.location.replace("/entry.htm");
            }
        }).catch((status) => {
            console.error("Error: " + status);
            callback();
        });

        AuthApp.account.user_ID = getCookie("user_id");
    }

    // For Entry Page
    static verifyAccount(action=noop, callback=noop) {
        // send request to verify account info
        // if success, redirect to profile page
        // else, leave the page
        XHR_GET(AuthApp.BACKEND_HOST + "/res.pye?type=auth_verify").then((response) => {
            if (response.status === "success") {
                action();
            } else {
                callback();
            }
        }).catch((status) => {
            console.error("Error: " + status);
        });
    }

    static requestClient() {
        XHR_GET(AuthApp.BACKEND_HOST + "/res.pye?type=client&auth_id=" + AuthApp.authID).then((response) => {
            if (response.status === "success") {
                AuthApp.client_name = response.data.client_name;
                AuthApp.client_image = response.data.client_image;
            }
        }).catch((status) => {
            console.error("Error: " + status);
        });
    }

    static redirectProfile() {
        window.location.replace("/profile.htm" + window.location.search);
    }

    static verifying_redirect() {
        XHR_POST(AuthApp.BACKEND_HOST + "/auth/verifying_redirect.pye", {url: window.location.href}).then((response) => {
            if (response.status === "success") {
                window.location.replace(response.data.auth_url);
            }
        }).catch((status) => {
            console.error("Error: " + status);
        });
    }
}
