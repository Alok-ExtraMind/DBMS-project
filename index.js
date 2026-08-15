let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = leads.length - 1; i >= 0 && i >= leads.length - 5; i--) {
        // Changed the loop from 'i < leads.length' to 'i < 5' to limit the number of displayed leads to 5. 
        // But if the extension starts from scratch, it should not crash. So, we need to check if the leads array has at least 5 elements before trying to access them.
        // Why use target='_blank'? Because it opens the link in a new tab, allowing users to keep the current page open while exploring the link.  
        listItems +=
            `   <li>                       
                <a target='_blank' href='${leads[i]}'>   
                    ${leads[i]}
                </a>
            </li>
        `
        ulEl.innerHTML = listItems
    }
}
deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})