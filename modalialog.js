(function (g) {

    var Selectors = {
        MODAL_BACKGROUND: 'modal-background'
    }

    var ModalDialog = function (options) {
        this.options = options || {};
        this.initialize();
    }

    ModalDialog.prototype.initialize = function () {
        this.background = new ModalBackground(this.options.background);
        this.frame = new ModalFrame(this.background, new FrameElement(), this.options.frame);
        g.addEventListener('resize', function () {
            this.background.resize();
        }.bind(this));
    }

    ModalDialog.prototype.open = function () {
        this.frame.generate(function () {
            this.background.show();
        }.bind(this));
    }

    ModalDialog.prototype.close = function () {
        this.background.hide();
        this.frame.dispose();
    }

    var ModalFrame = function (wrapper, element, option) {
        this.wrapper = wrapper;
        this.element = element;
    }

    ModalFrame.prototype.generate = function (generated) {
        // タイトルの生成

        // ボディの生成
        this.element.update(function () {
            generated.call();
        });
    }

    ModalFrame.prototype.dispose = function () {
        // タイトルの削除

        // ボディの削除
        this.element.dispose();
    }

    var FrameElement = function () {

    }

    FrameElement.prototype.generate = function (generated) {
        generated.call();
    }

    FrameElement.prototype.update = function (updated) {
        updated.call();
    }

    FrameElement.prototype.dispose = function () {

    }

    var ModalBackground = function (option) {
        this.option = option || {};
        this.width = this.option.width || g.innerWidth;
        this.height = this.option.height || g.innerHeight;
        this.body = this.find();
        this.initialize();
    }

    ModalBackground.prototype.initialize = function () {
        var wrapper = g.document.getElementsByTagName('BODY')[0];
        if (!this.body) {
            this.generate();
            wrapper.appendChild(this.body);
        }
        this.setStyles();
        this.setClickHandler(this.option.clickHandler);
    }

    ModalBackground.prototype.find = function () {
        return g.document.getElementsByClassName(Selectors.MODAL_BACKGROUND)[0];
    }

    ModalBackground.prototype.generate = function () {
        this.body = g.document.createElement('div');
        this.hide();
    }

    ModalBackground.prototype.show = function () {
        this.body.setAttribute('class', Selectors.MODAL_BACKGROUND + ' show');
    }

    ModalBackground.prototype.hide = function () {
        this.body.setAttribute('class', Selectors.MODAL_BACKGROUND + ' hide');
    }

    ModalBackground.prototype.resize = function (x, y) {
        this.width = x === undefined ? g.innerWidth : x;
        this.height = x === undefined ? g.innerHeight : y;
        this.setStyles();
    }

    /**
     * 動的なスタイルを設定する
     * （静的なスタイルはクラスとCSSで実現する）
     */
    ModalBackground.prototype.setStyles = function () {
        this.body.setAttribute('style',
            'width:' + this.width + 'px;' +
            'height:' + this.height + 'px;');
    }

    ModalBackground.prototype.setClickHandler = function (handler) {
        if (handler && typeof handler == 'function') {
            this.body.addEventListener('click', handler.bind(this));
        } else {
            this.body.addEventListener('click', function () { this.hide() }.bind(this));
        }
    }
})(window);