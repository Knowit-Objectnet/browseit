var getEmployees = async function() {
  let data = await fetch(
    "https://projects.knowit.no/pages/viewpage.action?pageId=55805057",
    { credentials: "include", sameSite: false }
  )
    .then(result => {
      if (result.redirected) {
        throw "Error loading employees";
      } else {
        return result.text();
      }
    })
    .then(html => {
      // Parse HTML table to an array of tuples {name, imageURL}
      let result = [];
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, "text/html");
      var employees = Array.from(doc.querySelectorAll("tr")).slice(1);
      employees.forEach(function(person) {
        const name = person.querySelector(".confluence-userlink");
        const img = person.querySelector(".confluence-embedded-image");
        if (name && img) {
          var imgUrl = img.getAttribute("src");

          // Images are hosted on multiple domains
          // If domain is not specified it defaults to projects.knowit.no
          if (!imgUrl.includes("https://")) {
            imgUrl = "https://projects.knowit.no" + imgUrl;
          }
          result.push({ name: name.innerText, img: imgUrl });
        }
      });
      return result;
    })
    .catch(e => {
      throw e;
    });

  return data;
};
