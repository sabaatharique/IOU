const newBtn = document.getElementById('new-submit-btn');
const output = document.getElementById('entries');

const inpName = document.getElementById('name');
const inpYouOwe = document.getElementById('you-owe');
const inpOwesYou = document.getElementById('owed-to-you');
const inpDate = document.getElementById('date');
const inpNote = document.getElementById('note');

let allEntries = [];

class Log {
    constructor(owesYou, youOwe, date, note) {
        this.owesYou = owesYou;
        this.youOwe = youOwe;
        this.date = date;
        this.note = note;
    }
}

class Entry {
    constructor(name) {
        this.name = name;
        this.logs = [];
    }

    add(owesYou, youOwe, date, note) {
        let temp = new Log(owesYou, youOwe, date, note);
        this.logs.push(temp);
    }
}

newBtn.onclick = function () {
    if (inpName.value && (inpYouOwe.value || inpOwesYou.value)) {
        let entry = new Entry(inpName.value);
        entry.add(inpYouOwe.value, inpOwesYou.value, inpDate.value, inpNote.value);
        localStorage.setItem(inpName.value, JSON.stringify(entry.logs));
        location.reload();
    }
};

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

