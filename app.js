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
    output.innerHTML = '';
    for (let i = 0; i < localStorage.length; i++) {
        const entryName = localStorage.key(i);
        const entryLogs = retrievefromLocalStorage(entryName);

        const entryCard = document.createElement('div');
        entryCard.className = 'entry-card';

        const details = document.createElement('div');
        details.className = 'details';
        details.innerHTML = `<h3>${entryName}</h3>
                            <button class="del-btn" id="${i}" type="button">DELETE</button>`;

        const allLogs = document.createElement('div');
        allLogs.className = 'logs';
        entryLogs.forEach((log, j) => {
            const eachLog = document.createElement('div');
            eachLog.className = 'log';
            eachLog.innerHTML = `<p> Date: ${log.date} | Owes you: ${log.owesYou} | You Owe: ${log.youOwe} | Note: ${log.note}</p>
            <button class="clr-btn" data-entry="${entryName}" data-index="${j}" type="button">CLEAR</button>`;
            allLogs.appendChild(eachLog);
        });

        entryCard.appendChild(details);
        entryCard.appendChild(allLogs);
        output.appendChild(entryCard);
    }

    const clrBtn = document.querySelectorAll('.clr-btn').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.dataset.entry;
            const logIndex = this.dataset.index;
            let logs = retrievefromLocalStorage(name);
            logs.splice(logIndex, 1);
            if (logs.length > 0) {
                localStorage.setItem(name, JSON.stringify(logs)); 
            } else {
                localStorage.removeItem(name);
            }           
            displayEntries();
        });
    });

    const delBtn = document.querySelectorAll('.del-btn').forEach(button => {
        button.addEventListener('click', function() {
            const name = localStorage.key(this.id);
            localStorage.removeItem(name);
            displayEntries();
        });
    });
}

newBtn.onclick = addNewLog;

displayEntries();


