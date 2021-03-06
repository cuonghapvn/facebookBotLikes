function run_like() {
    var run = casper_like("Enter your token here");
} // set triger per menit

function casper_like(token) {
    var t = new Date();
    t = t.getTime();
    t = t + "";
    t = t.substring(0, 6);

    var fql = "select type,app_id,comments,post_id,actor_id,target_id,message,created_time from stream";

    fql = fql + " where strpos(created_time," + t + ") >=0 AND source_id in ";

    fql = fql + "(select uid2 from friend where uid1=me())";

    fql = encodeURIComponent(fql);
    fql = "https://api.facebook.com/method/fql.query?query=" + fql + "&limit=50&format=json&access_token=";
    if (token && token != "") {
        var me = get_cr_url("https://graph.beta.facebook.com/me?access_token=" + token);
        if (me && me.id) {
            fql = get_cr_url(fql + token);
            if (fql && fql.length != 0) {
                var hit = 0;
                for (x in fql) {
                    //if(fql[x].type==46 || fql[x].type==247){

                    var cek_daftar = "https://graph.beta.facebook.com/" + fql[x].post_id + "/likes?limit=100&access_token=";
                    cek_daftar = get_cr_url(cek_daftar + token);
                    var can_cr = 1;
                    if (cek_daftar && cek_daftar.data && cek_daftar.data.length != 0) {
                        for (y in cek_daftar.data) {
                            if (cek_daftar.data[y].id == me.id) {
                                can_cr = 1;
                                break;
                            }
                        }
                    }
                    if (can_cr == 1) {
                        hit = hit + 1;
                        Utilities.sleep(200);
                        var jempol = "https://graph.beta.facebook.com/" + fql[x].post_id + "/reactions?type=LIKE&method=post&access_token=";
                        jempol = get_cr_url(jempol + token);
                    }
                    //}
                }
            }
        }
    }
}

function get_cr_url(almt) {
    //var url_cr = UrlFetchApp.fetch(almt);
    //var json_cr = Utilities.jsonParse(url_cr.getContentText());
    //return json_cr;
    try {
        var url_cr = UrlFetchApp.fetch(almt);
        var responseCode = url_cr.getResponseCode()
        if (responseCode === 200) {
            var json_cr = Utilities.jsonParse(url_cr.getContentText());
            return json_cr;
        }
    } catch (e) {}
    return null
}
