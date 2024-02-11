import fetch from "node-fetch";

const myHeaders = new Headers();
myHeaders.append(
  "User-Agent",
  "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0"
);
myHeaders.append("Accept", "application/json");
myHeaders.append("Accept-Language", "en-US,en;q=0.5");
myHeaders.append("Accept-Encoding", "gzip, deflate, br");
myHeaders.append("Alt-Used", "www.letsrevolutionizetesting.com");
myHeaders.append("Connection", "keep-alive");
myHeaders.append("Upgrade-Insecure-Requests", "1");
myHeaders.append("Sec-Fetch-Dest", "document");
myHeaders.append("Sec-Fetch-Mode", "navigate");
myHeaders.append("Sec-Fetch-Site", "cross-site");
myHeaders.append("TE", "trailers");
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

const initialId = "756775492";
let shouldFetch = true;

const fetchSomething = async (id) => {
  if (shouldFetch) {
    fetch(
      `https://www.letsrevolutionizetesting.com/challenge?id=${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (!result.follow) {
          console.log("end", result);
          shouldFetch = false;
          return;
        }
        const urlParams = new URL(result.follow).searchParams;
        const newId = urlParams.get("id");
        console.log("continue", newId, result);
        fetchSomething(newId);
      })
      .catch((error) => console.log("error", error));
  }
};

fetchSomething(initialId);
