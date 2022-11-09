class TranslateClass {
    constructor(showElement, toSide) {
        if (toSide === 'bottom' || toSide === 'top') {
            this._transform = 'Y';
        } else {
            this._transform = 'X';
        }
        this._showElement = showElement;
        this._side = toSide;
    }

    getSign() {
        switch (this._side) {
            case  'top': {
                return '+'
            }
            case  'bottom': {
                return '-';
            }
            case  'right': {
                return '-';
            }
            case  'left': {
                return '+';
            }
        }
    }

    show() {
        const element = this._showElement;
        element.style.transform = `translate${this._transform}(0)`;
        element.classList.add('jsShowTranslateItem');
    }

    hide() {
        const element = this._showElement;
        element.style.transform = `translate${this._transform}(${this.getSign()}100%)`;
        element.classList.remove('jsShowTranslateItem');
    }

    toggle() {
        this._showElement.classList.contains('jsShowTranslateItem') ? this.hide() : this.show();
    }
}