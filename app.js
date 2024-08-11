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
    let owesYou = inpOwesYou.value || 0;
    let youOwe = inpYouOwe.value || 0;
    let date = inpDate.value || "-";
    let note = inpNote.value || "-";

    
    if (name && (owesYou || youOwe)) {
        const logs = retrievefromLocalStorage(name);
        const temp = createLog(owesYou, youOwe, date, note);
        logs.push(temp);
        localStorage.setItem(name, JSON.stringify(logs));
        location.reload();
    }
}

const calculateTotal = (logs) => {
    let total = 0;
    for (let i = 0; i < logs.length; i++) {
        total += parseFloat(logs[i].youOwe);
        total -= parseFloat(logs[i].owesYou);
    }
    return total;
}

const deleteLog = (name, logIndex) => {
    let logs = retrievefromLocalStorage(name);
    logs.splice(logIndex, 1);
    if (logs.length > 0) {
        localStorage.setItem(name, JSON.stringify(logs)); 
    } else {
        localStorage.removeItem(name);
    }           
    displayEntries();
}

const deleteEntry = (name) => {
    localStorage.removeItem(name);
    displayEntries();
}

const displayEntries = () => {
    output.innerHTML = '';
    for (let i = 0; i < localStorage.length; i++) {
        const entryName = localStorage.key(i);
        const entryLogs = retrievefromLocalStorage(entryName);

        const totalOwed = calculateTotal(entryLogs);
        let who = "";
        if (totalOwed > 0){
            who = "You";
        } else {
            who = "They";
        }

        const entryCard = document.createElement('div');
        entryCard.className = 'entry-card';

        const details = document.createElement('div');
        details.className = 'details';
        details.innerHTML = `<h3>${entryName} : ${who} owe ${Math.abs(totalOwed)}</h3>
                            <button class="del-btn" id="${i}">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                                <path fill="currentColor"/>
                                </svg>
                            </button>`;

        const allLogs = document.createElement('div');
        allLogs.className = 'logs';
        entryLogs.forEach((log, j) => {
            const eachLog = document.createElement('div');
            eachLog.className = 'log';
            eachLog.innerHTML = `<p> Date: ${log.date} | You Owe: ${log.youOwe} | Owes you: ${log.owesYou} | Note: ${log.note}</p>
            <button class="clr-btn" data-entry="${entryName}" data-index="${j}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                </svg>
            </button>`;
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
            deleteLog(name, logIndex);
        });
    });

    const delBtn = document.querySelectorAll('.del-btn').forEach(button => {
        button.addEventListener('click', function() {
            const name = localStorage.key(this.id);
            deleteEntry(name);
        });
    });
}

newBtn.onclick = addNewLog;

displayEntries();


