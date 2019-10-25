var loadEmployees = async function() {
    let data = await fetch("https://projects.knowit.no/pages/viewpage.action?pageId=55805057", { credentials: "include", sameSite: false})
    .then(result => result.text())
    .then(html => {
        let result = []
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");
        var employees = Array.from(doc.querySelectorAll('tr')).slice(1)

        employees.forEach(function(person) {
            const name = person.querySelector('.confluence-userlink');
            const img = person.querySelector('.confluence-embedded-image');
            if(name && img){
                result.push({name: name.innerText, img: "projects.knowit.no" + img.getAttribute("src")});
            };
        });
        return result;

    })
    .catch(e => console.log(e));

    return data
}