class ItcCollapse {
    constructor(target, duration = 350) {
        this._target = target;
        this._duration = duration;
    }

    show() {
        const el = this._target;
        if (el.classList.contains('collapsing') || el.classList.contains('collapse_show')) {
            return;
        }
        el.classList.remove('collapse');
        const height = el.offsetHeight;
        el.style.height = 0;
        el.style.overflow = 'hidden';
        el.style.transition = `height ${this._duration}ms ease`;
        el.classList.add('collapsing');
        el.offsetHeight;
        el.style.height = `${height}px`;
        this.collapsing('show');
    }

    collapsing(type) {
        window.setTimeout(() => {
            const el = this._target;
            el.classList.remove('collapsing');
            el.classList.add('collapse');
            el.style.height = '';
            el.style.transition = '';
            el.style.overflow = '';
            switch (type) {
                case 'show': {
                    el.classList.add('collapse_show');
                }
            }

        }, this._duration);
    }

    hide() {
        const el = this._target;
        if (el.classList.contains('collapsing') || !el.classList.contains('collapse_show')) {
            return;
        }
        el.style.height = `${el.offsetHeight}px`;
        el.offsetHeight;
        el.style.height = 0;
        el.style.overflow = 'hidden';
        el.style.transition = `height ${this._duration}ms ease`;
        el.classList.remove('collapse');
        el.classList.remove('collapse_show');
        el.classList.add('collapsing');
        this.collapsing();
    }

    toggle() {
        this._target.classList.contains('collapse_show') ? this.hide() : this.show();
    }
}