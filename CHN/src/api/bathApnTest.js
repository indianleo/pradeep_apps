
var u = "https://iid.googleapis.com/iid/v1:batchImport"
var d = {
  "application": "org.communityHealth.CHN",
  "sandbox": false,
  "apns_tokens": [
      "980dd42d9ab3f1dbe20942a9da8a76f7b6ea5936ddbecc39c9931becb2defabe",
   ]
}

async function apiCall(url = "", options = {}, _data = false) {
    if (typeof options == 'object' && _data) {
        options.body = JSON.stringify(_data) // body data type must match "Content-Type" header
    }
    if (typeof options == 'object' && !options.headers) {
        options.headers = { 
            "Content-Type": "application/json",
            "Authorization": "key=AAAAKk2JVkM:APA91bFk78fjFYx-7xeduxNhZ714JL4vWoAF3phP1rb7xnZPiH7sljyZbEDoiYtcFAyUvyexVR18bOnqOm2OgRwbglo1HYKtXHbEKnDdQfkJSpgkPlVqe6IYp16ftoWwLVWpqILce6Kw",
        };
    }
    try {
        const res = await fetch(url, options);
        return res.json();
          
    } catch(err) {
        return Promise.reject(err);
    }
} 
