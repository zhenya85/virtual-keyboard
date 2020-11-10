class Keyboard {
    constructor() {
        this.area = false;
        this.lang = 'eng';
        this.keyboardHide = true;
        this.shiftKey = false;
        this.shiftLongKey = false;
        this.capslock = false;
        this.indicator = false;
        this.record = false;
        this.mute=true;
        this.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.rec = new this.SpeechRecognition();

        this.keyCodes = [["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"], ["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "IntlBackslash", "Delete"], ["CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"], ["ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight"], ["ControlLeft", "Mic", "AltLeft", "EnRu", "Space", "Hide", "AltRight", "ControlRight", "ArrowLeft", "ArrowDown", "ArrowRight"]];
        this.engKeys = [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'], ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'], ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'], ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift'], ['Ctrl', 'Mic', 'Alt', 'en', ' ', 'Hide', 'Alt', 'Ctrl', '←', '↓', '→']];
        this.rusKeys = [['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'], ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del'], ['Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'], ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift'], ['Ctrl', 'Mic', 'Alt', 'ru', ' ', 'Hide', 'Alt', 'Ctrl', '←', '↓', '→']];
        this.engKeysUp = [['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'], ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del'], ['Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'], ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'Shift'], ['Ctrl', 'Mic', 'Alt', 'EN', ' ', 'Hide', 'Alt', 'Ctrl', '←', '↓', '→']];
        this.rusKeysUp = [['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'], ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Del'], ['Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter'], ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'ь', 'Б', 'Ю', '.', '↑', 'Shift'], ['Ctrl', 'Mic', 'Alt', 'RU', ' ', 'Hide', 'Alt', 'Ctrl', '←', '↓', '→']];
        this.soundFiles=['tink.wav','tom.wav','kick.wav','boom.wav'];
        this.specKey = ['Tab', 'Backspace', 'CapsLock', 'Caps Lock', 'ShiftLeft', 'ShiftRight', 'Shift', 'Enter', 'Control', 'ControlLeft', 'ControlRight', 'Alt', 'AltLeft', 'AltRight', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete', 'Del', 'EnRu', 'Hide', 'Mic'];
        this.infoTexts=['Смена языка на основной клавиатуре (не виртуальной) - Shift + Ctrl ','Смена языка при голосовом вводе данных:','Отключить микрофон -> Сменить язык -> Запустить голосовой ввод'];
    }

    init() {
        this.renderBody();
        this.initEventListeners();
    }

    initEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (this.indicator) {
                if (/[а-яa-z]/i.test(e.key) && e.key.length === 1) {
                    this.area.disabled = false;
                    this.checkSystemKeyboardLayout(e);
                    this.checkSystemKeyboardCapsLock(e);
                    this.indicator = false;
                }
            } else {
                this.area.focus();
                if (e.code === 'Tab') {
                    e.preventDefault();
                    this.area.setRangeText('    ', this.area.selectionStart, this.area.selectionEnd, 'end');
                }
                if (e.key === 'Alt' || e.code === 'Meta') {
                    e.preventDefault();
                }
                if (e.key === 'Shift') {
                    this.shiftKey = true;
                    if (!this.shiftLongKey) {
                        this.changeShiftStatus();
                    }
                    this.shiftLongKey = true;
                    e.preventDefault()
                }
                this.soundHandler(e);
                this.addButtonHighlight(e);
                this.languageSwitch(e);
                this.capslockHandler(e);
            }

        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'Shift') {
                this.shiftKey = false;
                if (this.shiftLongKey) {
                    this.changeShiftStatus();
                }
                this.shiftLongKey = false;
                e.preventDefault()
            }
            this.removeButtonHighlight(e);
        });

        document.querySelector('#area').addEventListener('mousedown', evt => {
            if (!this.keyboardHide) {
                this.keyboardHide = true
                document.querySelector('.keyboard').classList.remove('keyboard--hidden')


            }
        })

        document.querySelector('#btnSound').addEventListener('click', evt => {
            if(!this.mute){
                this.mute=true;
                evt.target.style.backgroundPositionX='-28px'
            }
            else{
                this.mute=false;
                evt.target.style.backgroundPositionX='-3px'
            }
        })



        document.querySelector('.keyboard').addEventListener('mousedown', (e) => {

            if (e.target.classList.contains('key')) {
                if (!e.target.classList.contains('key--special')) {
                    this.area.setRangeText(e.target.innerHTML, this.area.selectionStart, this.area.selectionEnd, 'end');
                    if (this.shiftKey) {
                        this.shiftKey = false;
                        this.changeShiftStatus();
                    }
                }
                if (e.target.innerText === 'Mic') {
                    e.target.classList.toggle('key--caps')
                    if (e.target.classList.contains('key--caps')) {
                        this.record = true;

                    } else {
                        this.record = false;
                    }
                    this.renderMic();
                }

                this.soundHandler(e);
                this.capslockHandler(e);
                this.backspaceClickHandler(e);
                this.deleteClickHandler(e);
                this.enterClickHandler(e);
                this.shiftClickHandler(e);
                this.enRuClickHandler(e);
                this.hideClickHandler(e);
                this.tabClickHandler(e);
                this.arrowClickHandler(e);
                e.target.classList.add('key--press');
            }
        });
        document.querySelector('.keyboard').addEventListener('mouseup', () => {

            document.querySelectorAll('.key').forEach(key =>
                key.classList.contains('key--press') ? key.classList.remove('key--press') : null);
            //e.target.classList.remove('key--press');
            document.querySelector('#area').focus();
        });
    }

    soundHandler(e) {
        if(this.mute) return;
        let audio=undefined;
        if(this.specKey.includes(e.target.getAttribute('data')) || this.specKey.includes(e.key)){
            audio = document.querySelector(`#sound-2`);
        }
        else if(this.lang==='eng'){
            audio = document.querySelector(`#sound-3`);
        }
        else {
            audio = document.querySelector(`#sound-1`);
        }
        if (!audio) return;
        audio.currentTime = 0;
        audio.play();
    }

    capslockHandler(e) {
        if (e.key === 'CapsLock' || e.target.getAttribute('data') === 'CapsLock') {
            this.capslock ? this.capslock = false : this.capslock = true;
            if (this.lang === 'rus' && this.capslock) {
                this.changeKeyboardLang(this.rusKeysUp);
                this.lang = 'rus';
            }
            if (this.lang === 'rus' && !this.capslock) {
                this.changeKeyboardLang(this.rusKeys);
                this.lang = 'rus';
            }
            if (this.lang === 'eng' && this.capslock) {
                this.changeKeyboardLang(this.engKeysUp);
                this.lang = 'eng';
            }
            if (this.lang === 'eng' && !this.capslock) {
                this.changeKeyboardLang(this.engKeys);
                this.lang = 'eng';
            }
        }
    }


    languageSwitch(e) {
        if ((e.key === 'Shift' && !!e.ctrlKey) || (e.key === 'Ctrl' && !!e.shiftKey)) {
            if (this.lang === 'rus') {
                if (this.capslock) {
                    this.changeKeyboardLang(this.engKeysUp);
                    this.lang = 'eng';
                } else {
                    this.changeKeyboardLang(this.engKeys);
                    this.lang = 'eng';
                }
            } else {
                if (this.capslock) {
                    this.changeKeyboardLang(this.rusKeysUp);
                    this.lang = 'rus';
                } else {
                    this.changeKeyboardLang(this.rusKeys);
                    this.lang = 'rus';
                }
            }
        }
    }

    tabClickHandler(e) {
        if (e.target.getAttribute('data') === 'Tab') {
            this.area.setRangeText('    ', this.area.selectionStart, this.area.selectionEnd, 'end');
        }
    }

    shiftClickHandler(e) {
        if (e.target.getAttribute('data') === 'ShiftLeft' || e.target.getAttribute('data') === 'ShiftRight') {
            this.shiftKey ? this.shiftKey = false : this.shiftKey = true;
            this.changeShiftStatus();
        }
    }

    changeShiftStatus() {
        let colSpecial = document.querySelectorAll('.key--special');
        colSpecial.forEach(item => {
            if (item.getAttribute('data') === 'ShiftLeft' || item.getAttribute('data') === 'ShiftRight') {
                if (this.shiftKey) {
                    item.classList.add('key--caps')
                } else {
                    item.classList.remove('key--caps')
                }
            }
        })
        if (this.shiftKey && !this.capslock) {
            if (this.lang === 'rus') {
                this.changeKeyboardLang(this.rusKeysUp);
                this.lang = 'rus';
            }
            if (this.lang === 'eng') {
                this.changeKeyboardLang(this.engKeysUp);
                this.lang = 'eng';
            }
        } else if (!this.shiftKey && this.capslock) {
            if (this.lang === 'rus') {
                this.changeKeyboardLang(this.rusKeysUp);
                this.lang = 'rus';
            }
            if (this.lang === 'eng') {
                this.changeKeyboardLang(this.engKeysUp);
                this.lang = 'eng';
            }
        } else {
            if (this.lang === 'rus') {
                this.changeKeyboardLang(this.rusKeys);
                this.lang = 'rus';
            }

            if (this.lang === 'eng') {
                this.changeKeyboardLang(this.engKeys);
                this.lang = 'eng';
            }
        }


    }

    enRuClickHandler(e) {
        if (e.target.getAttribute('data') === 'EnRu') {
            this.shiftKey = false;
            document.querySelectorAll('.key--caps').forEach(item => {
                if (item.getAttribute('data') === 'ShiftLeft' || item.getAttribute('data') === 'ShiftRight') {
                    item.classList.remove('key--caps');
                }
            })
            if (this.lang === 'rus') {
                if (this.capslock) {
                    this.changeKeyboardLang(this.engKeysUp);
                    this.lang = 'eng';
                } else {
                    this.changeKeyboardLang(this.engKeys);
                    this.lang = 'eng';
                }
            } else {
                if (this.capslock) {
                    this.changeKeyboardLang(this.rusKeysUp);
                    this.lang = 'rus';
                } else {
                    this.changeKeyboardLang(this.rusKeys);
                    this.lang = 'rus';
                }
            }
        }
    }

    hideClickHandler(e) {
        if (e.target.getAttribute('data') === 'Hide') {
            if (this.keyboardHide) {
                document.querySelector('.keyboard').classList.add('keyboard--hidden')
                this.keyboardHide = false
            }
        }
    }

    backspaceClickHandler(e) {
        if (e.target.getAttribute('data') === 'Backspace') {
            if (this.area.value.length === 0) {
                return;
            }
            this.area.setRangeText('', this.area.selectionStart, this.area.selectionEnd, 'end');
            if (this.area.selectionStart === this.area.selectionEnd) {
                this.area.setRangeText('', this.area.selectionStart - 1, this.area.selectionEnd, 'end');
            }
        }
    }

    deleteClickHandler(e) {
        if (e.target.getAttribute('data') === 'Delete') {
            if (this.area.selectionStart === this.area.selectionEnd) {
                this.area.setRangeText('', this.area.selectionStart, this.area.selectionEnd + 1, 'end');
            } else if (this.area.selectionStart !== this.area.selectionEnd) {
                this.area.setRangeText('', this.area.selectionStart, this.area.selectionEnd, 'end');
            }
        }
    }

    enterClickHandler(e) {
        if (e.target.getAttribute('data') === 'Enter')
            this.area.setRangeText('\n', this.area.selectionStart, this.area.selectionEnd, 'end');
    }

    arrowClickHandler(e) {
        const keyData = e.target.getAttribute('data');
        this.cursorPosition = this.area.selectionStart;
        let selectionInRow = this.area.selectionStart;
        const rowsArea = this.area.value.split('\n');
        let positionInRow = this.area.selectionStart;
        const rows = this.area.value.split('\n');
        let i = 0;
        if (keyData.includes('Arrow')) {
            switch (keyData) {
                case 'ArrowLeft':
                    this.area.selectionStart = this.cursorPosition - 1;
                    this.area.selectionEnd = this.area.selectionStart;
                    break;
                case 'ArrowRight':
                    this.area.selectionStart = this.cursorPosition + 1;
                    this.area.selectionEnd = this.area.selectionStart;
                    break;
                case 'ArrowUp':

                    if (this.area.selectionStart > rowsArea[0].length) {
                        let i = 0;
                        while (selectionInRow > rowsArea[i].length) {
                            selectionInRow -= (rowsArea[i].length + 1);
                            i += 1;
                        }
                        let newPosition = 0;
                        let j = 0;
                        while (j < i - 1) {
                            newPosition += rowsArea[j].length + 1;
                            j += 1;
                        }
                        const rowLength = (rowsArea[j].length > selectionInRow) ? selectionInRow : rowsArea[j].length;
                        newPosition += rowLength;
                        this.area.selectionStart = newPosition;
                        this.area.selectionEnd = this.area.selectionStart;
                    }
                    break;
                case 'ArrowDown':
                    while (positionInRow > rows[i].length) {
                        positionInRow -= (rows[i].length + 1);
                        i += 1;
                    }
                    if (i < rows.length - 1) {
                        let newPosition = 0;
                        let j = 0;
                        while (j < i + 1) {
                            newPosition += rows[j].length + 1;
                            j += 1;
                        }
                        const rowLength = (rows[j].length > positionInRow) ? positionInRow : rows[j].length;
                        newPosition += rowLength;
                        this.area.selectionStart = newPosition;
                        this.area.selectionEnd = this.area.selectionStart;
                    }
                    break;
                default:
                    break;
            }
        }
    }

    addButtonHighlight(e) {
        document.querySelectorAll('.key').forEach(key => {
            if (key.getAttribute('data') === e.code) {
                key.classList.add('key--press');
            }
        });
    }

    removeButtonHighlight(e) {
        document.querySelectorAll('.key').forEach(key => {
            if (key.getAttribute('data') === e.code) {
                key.classList.remove('key--press');
            }
        });
    }

    renderBody() {
        this.renderArea();
        this.renderSound();
        this.renderKeyboard();
        this.renderInfo();
        this.renderAudio();
    }

    renderArea() {
        const container = document.createElement('div');
        container.classList.add('container');
        document.querySelector('body').appendChild(container);
        this.area = document.createElement('textarea');
        this.area.setAttribute('id', 'area');
        this.area.setAttribute('name', 'area');
        container.appendChild(this.area);
    }

    renderKeyboard() {
        const keyboard = document.createElement('div');
        keyboard.classList.add('keyboard');

        this.engKeys.forEach((row, i) => {
            let fragmentRow = `<div class="row row${i}">`;
            row.forEach((key, j) => {
                let fragmentKey = '';
                fragmentKey += this.renderKeyboardKey(key, this.keyCodes[i][j]);
                fragmentRow += fragmentKey;
            });
            fragmentRow += '</div>';
            keyboard.insertAdjacentHTML('beforeend', fragmentRow);
        });
        document.querySelector('.container').appendChild(keyboard);
        this.addExtraKeyClasses();
    }

    renderSound(){
        const sound=document.createElement('div')
        sound.classList.add('sound');
        sound.id='btnSound';
        document.querySelector('.container').appendChild(sound);
    }

    renderInfo() {
        this.infoTexts.forEach(item=>{
            const info = document.createElement('p');
            info.style.textAlign = 'center'
            info.style.fontSize = '14px'
            info.style.fontWeight = '600'
            info.style.fontStyle = 'italic'
            info.style.margin = '0 auto'
            info.innerText = item;
            document.querySelector('.container').appendChild(info);
        })

    }

    renderAudio() {
        this.soundFiles.forEach((item,index)=>{
            const audio = document.createElement('audio');
            audio.id=`sound-${index+1}`
            audio.src = `sounds/${item}`;
            document.querySelector('.container').appendChild(audio);
        })

    }

    renderMic() {

        let area = document.querySelector('#area')
        let recValue = area.textContent;
        this.rec.interimResults = false;
        this.rec.lang = this.lang === 'eng' ? 'en-US' : 'ru-RU'
        if (this.record) {
            this.rec.start();
            this.rec.addEventListener('result', e => {
                this.rec.lang = this.lang === 'eng' ? 'en-US' : 'ru-RU'
                const transcript = Array.from(e.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('');

                recValue += transcript + " ";
                if (e.results[0].isFinal && this.record) {
                    area.innerText += recValue;
                }
            })
            this.rec.addEventListener('end', ()=>{
                this.rec.lang = this.lang === 'eng' ? 'en-US' : 'ru-RU'
                if(this.record){
                    this.rec.start();
                }
            });

        }
        this.rec.stop();
    }

    renderKeyboardKey(key, data) {
        return `<span class="key" data="${data}">${key}</span>`;
    }

    changeKeyboardLang(layoutArray) {
        const keyElementsArray = this.getKeyElementsArray();
        layoutArray.forEach((row, i) => {
            row.forEach((key, j) => {
                keyElementsArray[i][j].innerText = key;
            });
        });
        this.capslock ? document.querySelector('span[data="CapsLock"]').classList.add('key--caps') : document.querySelector('span[data="CapsLock"]').classList.remove('key--caps');
    }

    checkSystemKeyboardLayout(e) {

        if (/[а-я]/i.test(e.key)) {
            this.changeKeyboardLang(this.rusKeys);
            this.lang = 'rus';
        }

    }

    checkSystemKeyboardCapsLock(e) {
        if (/[А-ЯA-Z]/.test(e.key)) {
            this.changeKeyboardLang(this.lang === 'rus' ? this.rusKeysUp : this.engKeysUp);
            this.capslock = true;
            this.capslock ? document.querySelector('span[data="CapsLock"]').classList.add('key--caps') : document.querySelector('span[data="CapsLock"]').classList.remove('key--caps');
        }
    }

    addExtraKeyClasses() {
        document.querySelectorAll('.key').forEach((key, i, arr) => {
            if (key.innerText === 'Backspace' || key.innerText === 'Enter' || key.innerText === '') key.classList.add('key--wide');
            if ((key.innerText === 'Shift' && arr[i - 1].innerText === 'Enter') || key.innerText === 'Enter') key.classList.add('key--shift');
            if (key.innerText === 'Backspace' || key.innerText === 'Tab' || key.innerText === 'en' || key.innerText === 'ru' || key.innerText === 'EN' || key.innerText === 'RU'
                || key.innerText === 'Hide' || key.innerText === 'Del' || key.innerText === 'Enter' || key.innerText === 'Shift'
                || key.innerText === 'Ctrl' || key.innerText === 'Mic' || key.innerText === 'Alt' || key.innerText === 'Caps Lock' || key.getAttribute('data').includes('Arrow')) {
                key.classList.add('key--special');
            }
        });
    }

    getKeyElementsArray() {
        let arrayKeyElements = [];
        document.querySelectorAll('.row').forEach(row => {
            let rowArray = [];
            [...row.children].forEach(key => {
                rowArray.push(key);
            });
            arrayKeyElements.push(rowArray);
        });
        return arrayKeyElements;
    }
}

document.addEventListener('DOMContentLoaded', () => {
        const keyboard = new Keyboard();
        keyboard.init();
    }
);

