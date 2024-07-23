function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }

    return false;
}

function getCookie(cname) {
    let cs = document.cookie.split(';');
    for (let i = 0; i < cs.length; i++) {
        let c = cs[i].split('=');
        if (c[0].trim() === cname) {
            return c[1];
        }
    }

    return null;
}

function XHR_GET(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.withCredentials = true;
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log(xhr.response);
                resolve(JSON.parse(xhr.response));
            } else {
                reject(xhr.status);
            }
        };
        
        xhr.send();
    });
}

function XHR_POST(url, data) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.withCredentials = true;
        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(xhr.status);
            }
        };
        
        xhr.send(JSON.stringify(data));
    });
}