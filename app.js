const newBtn = document.getElementById('new-submit-btn');
const output = document.getElementById('entries');

const inpName = document.getElementById('name');
const inpYouOwe = document.getElementById('you-owe');
const inpOwesYou = document.getElementById('owed-to-you');
const inpDate = document.getElementById('date');
const inpNote = document.getElementById('note');

const delAllBtn = document.getElementById('del-all');
const themeBtn = document.getElementById('mode-toggle');

const root = document.querySelector(':root');

const retrieveTheme = () => {
    const theme = localStorage.getItem('mode-selector');
    if (theme == null) {
        localStorage.setItem('mode-selector', 'dark');
        return 'dark';
    }
    return theme;
}

const applyTheme = () => {
    const theme = retrieveTheme();
    if (theme == 'dark') {
        root.style.setProperty('--shadow-color', 'rgb(30, 32, 38)');
        root.style.setProperty('--pink-color', '#d64898');
        root.style.setProperty('--dark-pink-color', '#9c2781');
        root.style.setProperty('--blue-color', '#3460e1');
        root.style.setProperty('--dark-blue-color', '#2d3592');
        root.style.setProperty('--purple-color', '#9a44a5');
        root.style.setProperty('--dark-purple-color', '#69328c');
        root.style.setProperty('--light-gray-color', '#767c87');
        root.style.setProperty('--gray-color', '#484e5c');
        root.style.setProperty('--dark-gray-color', '#2c2f3a');
        root.style.setProperty('--fieldset-color', 'rgb(215, 215, 215)');
    } else {
        root.style.setProperty('--shadow-color', 'rgb(54, 57, 69)');
        root.style.setProperty('--pink-color', '#eb60af');
        root.style.setProperty('--dark-pink-color', '#bf3ca0');
        root.style.setProperty('--blue-color', '#4d75ed');
        root.style.setProperty('--dark-blue-color', '#4651cb');
        root.style.setProperty('--purple-color', '#ad5bb6');
        root.style.setProperty('--dark-purple-color', '#8241ab');
        root.style.setProperty('--light-gray-color', '#f0f2f5');
        root.style.setProperty('--gray-color', '#e8e9ee');
        root.style.setProperty('--dark-gray-color', '#59606e');
        root.style.setProperty('--fieldset-color', 'rgb(139, 139, 139)');
    }
}

const switchTheme = () => {
    const theme = localStorage.getItem('mode-selector');
    if (theme == 'dark') {
        localStorage.setItem('mode-selector', 'light');
    } else {
        localStorage.setItem('mode-selector', 'dark');
    }
    applyTheme();
}

const clearAll = () => {
    alert("All data will be cleared.");
    localStorage.clear();
    applyTheme();
    displayEntries();
}

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

    if (name == "mode-selector") {
        alert("Restricted name. Please enter another.");
        location.reload();
        return;
    }

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
        if (entryName == 'mode-selector')
            continue;
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
        details.innerHTML = `<h3>${entryName} : ${who} owe ${Math.abs(totalOwed)}</h3>`;

        const deletebtn = document.createElement('button');
        deletebtn.className = 'del-btn';
        deletebtn.setAttribute('id', i);
        deletebtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                    <path d="M576 128c0-35.3-28.7-64-64-64L205.3 64c-17 0-33.3 6.7-45.3 18.7L9.4 233.4c-6 6-9.4 14.1-9.4 22.6s3.4 16.6 9.4 22.6L160 429.3c12 12 28.3 18.7 45.3 18.7L512 448c35.3 0 64-28.7 64-64l0-256zM271 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                                </svg>`;
        details.appendChild(deletebtn);
                           
        const allLogs = document.createElement('div');
        allLogs.className = 'logs';
        entryLogs.forEach((log, j) => {
            const eachLog = document.createElement('div');
            eachLog.className = 'log';
            eachLog.innerHTML = `<p> Date: ${log.date} | You Owe: ${log.youOwe} | Owes you: ${log.owesYou} | Note: ${log.note}</p>`;

            const clearbtn = document.createElement('button');
            clearbtn.className = 'clr-btn';
            clearbtn.setAttribute('data-entry', entryName);
            clearbtn.setAttribute('data-index', j);
            clearbtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                </svg>`;
            eachLog.appendChild(clearbtn);
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

applyTheme();

themeBtn.onclick = switchTheme;

newBtn.onclick = addNewLog;

delAllBtn.onclick = clearAll;

displayEntries();


