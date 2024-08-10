const newBtn = document.getElementById('new-submit-btn');
const output = document.getElementById('entries');

const inpName = document.getElementById('name');
const inpYouOwe = document.getElementById('you-owe');
const inpOwesYou = document.getElementById('owed-to-you');
const inpDate = document.getElementById('date');
const inpNote = document.getElementById('note');

const retrievefromLocalStorage = (name) => {
    const logs = localStorage.getItem(name);
    if (logs == null)
        return [];
    return JSON.parse(logs);
}

const createLog = (owesYou, youOwe, date, note) => ({
    owesYou,
    youOwe,
    date,
    note
});

const addNewLog = () => {
    const name = inpName.value;
    const owesYou = inpOwesYou.value;
    const youOwe = inpYouOwe.value;
    const date = inpDate.value;
    const note = inpNote.value;
    
    if (name && (owesYou|| youOwe)) {
        const logs = retrievefromLocalStorage(name);
        const temp = createLog(owesYou, youOwe, date, note);
        logs.push(temp);
        localStorage.setItem(name, JSON.stringify(logs));
        location.reload();
    }
}

const displayEntries = () => {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
    
        output.innerHTML += `<div class="entry-card">
                                <div class="name">
                                    <h3>${key}</h3>
                                    <button class="add-btn" type="button">ADD</button>
                                </div>
                                <div class="details"> 
                                    <p>${value}</p>
                                    <button class="del-btn" type="button">DELETE</button>
                                </div>
                            </div>`;
    }
}

newBtn.onclick = addNewLog;

displayEntries();


