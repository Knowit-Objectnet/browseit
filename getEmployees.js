var getEmployees = async function() {
    let data = await fetch("https://projects.knowit.no/pages/viewpage.action?pageId=55805057", { credentials: "include", sameSite: false})
    .then(result => result.text())
    .then(html => {
        let result = []
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");
        var employees = Array.from(doc.querySelectorAll('tr')).slice(1)

        employees.forEach(function(person) {
            console.log(person)
            const name = person.querySelector('.confluence-userlink');
            const img = person.querySelector('.confluence-embedded-image');

            if(name && img){  
                let src = img.getAttribute("src"); 
                if (!src.includes("https://")) {
                    src = "https://projects.knowit.no" + src;
                };
                result.push({name: name.innerText, img: src});
            };
        });
        return result;

    })
    .catch(e => console.log(e));

    return data
}