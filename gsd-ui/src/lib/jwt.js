const GSD_USER_TOKEN = "gsd_user_token";

const jwtToken = () =>{
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(GSD_USER_TOKEN + '=')) {
        return cookie.substring(GSD_USER_TOKEN.length + 1);
        }
    }
    return null;
}
const clearCookie = () =>{
    document.cookie = GSD_USER_TOKEN + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
} 
module.exports = {jwtToken,clearCookie};