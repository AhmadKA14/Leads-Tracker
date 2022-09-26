let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const tabBtn = document.getElementById("tab-btn")

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    list(myLeads)
}

function list(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += "<li><a target=_blank href=" + leads[i] + ">" + leads[i] + "</a></li>"
    }
    ulEl.innerHTML = listItems
}

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = null

    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    list(myLeads)
    console.log(localStorage.getItem("myLeads"))
})

tabBtn.addEventListener("click", function () {
    localStorage.setItem("myLeads", JSON.stringify(myLeads))

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        list(myLeads)
    })
})

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear(myLeads)
    myLeads = []
    ulEl.innerHTML = ""
})
