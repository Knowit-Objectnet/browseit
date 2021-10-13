#  BrowseIt
  
  
BrowseIt gives you quick access and a good overview of the most frequently used sites internally in Knowit Objectnet. Additionally BrowseIt contains an introductory todolist, which both noobs and veterans will find useful. Try to check off everything in "the nooblist" to avoid forgetting something important.
  
BrowseIt is an internal tool for employees in Knowit Objectnet AS, Norway. But *you're welcome to take a look* even if you don't work here.
  
  
**Install**
- Install link: https://chrome.google.com/webstore/detail/browseit-for-knowit/hbmpfibpnmpenneffbojjkcehjpacedo
- Install shortlink: https://bit.ly/welcome-to-knowit
  
**Contact**
- Primary contact: frida.klockmann@knowit.no
- Hangman contact: henrik.liodden@knowit.no, levi.sorum@knowit.no
  
**Create new or modifiy content**
The content of the extension is defined in json files located in `browseit/src/json/...json`. Add or remove links to/from your company's json file following the existing structure. I have added a json template for new companies to follow if they want to use the extension as well. Once you're json file is created / up to date make sure it's exported in `browseit/src/json/index.js`. Add a line that looks like this:
`export { default as yourCompanyJson }  from "./yourCompany.json";`
  
  
  
##  Legal
  
  
This software, as well as the concept, is not licensed for use anywhere outside of Knowit Objectnet. Consent may be given to modify and/or distribute the source code, but this consent will only be given explicitly and in writing, and only after receiving an emailed request detailing the intended usage. Contact michael.johansen@knowit.no if you want to use this source code or the concept.
  
##  Credits (newest first)
  
* Reactified av Eirik Eilertsen
* Henrik Liodden and Levi Sørum made the awesome hangman game in 2019 (henrik.liodden@knowit.no, levi.sorum@knowit.no)
* New recruits in 2019 provided a detailed PDF with change requests
* All new recruits in 2016 provided great feedback
* Lars Ivar Næss provided valuable feedback
* Christer Kjellesvig came up with the idea of having "time estimate fields"
* Sigmund Marius Nilssen provided valuable feedback
* Michael Johansen is the lead developer (michael.johansen@knowit.no)
  
##  Suggestions for future features
  
  
* Stian Lågstad suggested that unchecked boxes should pop up to the top, like in Google Keep
* Sigmund Marius Nilssen suggested that there should be a list of "who to ask about what"
  
##  History
  
  
Version 2.0.0 included the awesome hangman game which lets employees play a game to learn each others names (match picture to name, hangman-style). The game was made by the new recruits Henrik Liodden and Levi Sørum.
  
The initial release of BrowseIt was made by Michael Johansen in July 2016. The extension was made with "research time" in "Web Chapter", a knowledge sharing community in Knowit Objectnet. It was created because Michael needed to prepare a talk about *Chrome extensions*, and what better way to prepare than to just make a Chrome extension? The extension is used by practically all new recruits as an onboarding tool.
  
3.0.0 is the reactified version. Introducing company selctor as the only new functionality. Reactifing makes it much more maintanable as well as keeping configuration in json makes life much easier for implementing checkboxes and info for new Knowit sub companies. 
  