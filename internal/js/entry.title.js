const brand_title_vue = Vue.createApp({
    data () {
        return {
            brand_name: AuthApp.client_name,
            brand_image: AuthApp.client_image
        }
    }
});

brand_title = brand_title_vue.mount("#brand-title");
$("#google_button").load("/internal/html/continue_with_google.htm");