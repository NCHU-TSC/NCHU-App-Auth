function getAuthID() {
    params = new URLSearchParams(window.location.search);
    return params.get('authID');
}