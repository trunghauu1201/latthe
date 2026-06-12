// 1. Cập nhật đường dẫn ảnh (trong thư mục 'image' và định dạng '.png')
const weatherIcons = {
    'sun': 'image/troi.png',
    'moon': 'image/trang.png',
    'cloud': 'image/may.png',
    'wind': 'image/gio.png',
    'thunder': 'image/dien.png',
    'ice': 'image/bang.png'
};

const rowsInput = document.getElementById('rowsInput');
const colsInput = document.getElementById('colsInput');
const createBoardBtn = document.getElementById('createBoardBtn');
const resetBoardBtn = document.getElementById('resetBoardBtn');
const boardGrid = document.getElementById('board');
const iconPopup = document.getElementById('iconPopup');
const closePopupBtn = document.getElementById('closePopupBtn');
const iconChoices = document.querySelectorAll('.icon-choice');

let currentCellElement = null;

function createBoard() {
    let rows = parseInt(rowsInput.value) || 4;
    let cols = parseInt(colsInput.value) || 4;

    if ((rows * cols) % 2 !== 0) {
        alert("Lỗi cấu trúc: Tổng số ô trên bàn cờ (Hàng x Cột) phải là số chẵn!");
        return;
    }

    boardGrid.innerHTML = '';
    boardGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        
        cell.onclick = (e) => handleCellClick(e);
        cell.ondblclick = (e) => handleCellDblClick(e);
        cell.oncontextmenu = (e) => handleCellContextMenu(e);

        boardGrid.appendChild(cell);
    }
}

function handleCellClick(e) {
    const cell = e.currentTarget;
    if (cell.classList.contains('hidden') || cell.classList.contains('blank')) return;

    currentCellElement = cell;
    showPopup();
}

function handleCellDblClick(e) {
    const cell = e.currentTarget;
    if (cell.classList.contains('hidden') || cell.classList.contains('blank')) return;
    if (!cell.querySelector('img')) return;

    cell.classList.add('hidden');
}

function handleCellContextMenu(e) {
    e.preventDefault(); 
    const cell = e.currentTarget;
    
    if (cell.classList.contains('hidden')) return;

    cell.classList.toggle('blank');
    if (cell.classList.contains('blank')) {
        cell.innerHTML = '';
    }
}

function showPopup() {
    iconPopup.classList.remove('popup-hidden');
}

function hidePopup() {
    iconPopup.classList.add('popup-hidden');
    currentCellElement = null;
}

function handleIconSelection(e) {
    const iconKey = e.currentTarget.getAttribute('data-icon');
    const imgFilename = weatherIcons[iconKey];

    currentCellElement.innerHTML = `<img src="${imgFilename}" alt="${iconKey}">`;
    hidePopup();
}

createBoardBtn.onclick = createBoard;
resetBoardBtn.onclick = () => createBoard(); 
closePopupBtn.onclick = hidePopup;

iconChoices.forEach(choice => {
    choice.onclick = (e) => handleIconSelection(e);
});

createBoard();