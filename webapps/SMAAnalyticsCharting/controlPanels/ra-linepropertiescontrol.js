(function(GLOBAL, template) {
    var linePropertiesPrototype = {
        is: 'ra-linepropertiescontrol',
        behaviors: []
    };

    linePropertiesPrototype.createdCallback = function() {
        var that = this;

        var clone = document.importNode(template.content, true);
        this.appendChild(clone);

        this.defaultRequest = null;
        this.currentRequest = null;

        this.setupVisible();
        this.setupColor();
        this.setupWidth();
        this.setupStyle();
    };

    linePropertiesPrototype.setupVisible = function() {
        var that = this;

        this.visibleInput = this.querySelector('.visible');
        this.visibleInput.setLabel('Visible');

        this.visibleInput.setUpdateCallback(function(value) {
            that.setVisible(value);
            if (typeof that.updateCallback === 'function') {
                that.updateCallback();
            }
        });
    };

    linePropertiesPrototype.setupColor = function() {
        var that = this;

        this.colorInput = this.querySelector('.color');
        this.colorInput.setLabel('Color:');
        this.colorInput.setValue('#000000');

        this.colorInput.setUpdateCallback(function(value) {
            that.setColor(value);
            if (typeof that.updateCallback === 'function') {
                that.updateCallback();
            }
        });
    };

    linePropertiesPrototype.setupWidth = function() {
        var that = this;

        this.widthInput = this.querySelector('.width');
        this.widthInput.setLabel('Width:');
        this.widthInput.setMinLimit(0);
        this.widthInput.setMaxLimit(5);
        this.widthInput.setValue(1);

        this.widthInput.setUpdateCallback(function(value) {
            that.setWidth(value);
            if (typeof that.updateCallback === 'function') {
                that.updateCallback();
            }
        });
    };

    linePropertiesPrototype.setupStyle = function() {
        var that = this;

        this.styleInput = this.querySelector('.style');
        this.styleInput.setLabel('Style:');

        this.styleInput.addOption(new Option('Solid', 'solid'));
        this.styleInput.setValue('solid');
        this.styleInput.addOption(new Option('Dash', 'dash'));
        this.styleInput.addOption(new Option('Dot', 'dot'));
        this.styleInput.addOption(new Option('Dash-dot', 'dashdot'));

        this.styleInput.setUpdateCallback(function(value) {
            that.setStyle(value);
            if (typeof that.updateCallback === 'function') {
                that.updateCallback();
            }
        });
    };

    linePropertiesPrototype.setUpdateCallback = function(fn) {
        this.updateCallback = fn;
    };

    linePropertiesPrototype.getVisible = function() {
        return this.currentRequest.visible;
    };

    linePropertiesPrototype.setVisible = function(value) {
        if (this.currentRequest === null) {
            this.currentRequest = {};
        }
        this.currentRequest.visible = value;
        this.visibleInput.setCheck(value);
    };

    linePropertiesPrototype.getColor = function() {
        return this.currentRequest.color;
    };

    linePropertiesPrototype.setColor = function(value) {
        if (this.currentRequest === null) {
            this.currentRequest = {};
        }
        this.currentRequest.color = value;
        this.colorInput.setValue(value);
    };

    linePropertiesPrototype.getWidth = function() {
        return this.currentRequest.width;
    };

    linePropertiesPrototype.setWidth = function(value) {
        if (this.currentRequest === null) {
            this.currentRequest = {};
        }
        this.currentRequest.width = value;
        this.widthInput.setValue(value);
    };

    linePropertiesPrototype.getStyle = function() {
        return this.currentRequest.style;
    };

    linePropertiesPrototype.setStyle = function(value) {
        if (this.currentRequest === null) {
            this.currentRequest = {};
        }
        this.currentRequest.style = value;
        this.styleInput.setValue(value);
    };

    linePropertiesPrototype.setTitle = function(value) {
        this.querySelector('.propertiesTitle').textContent = value;
    };

    linePropertiesPrototype.setDefaultRequest = function(request) {
        this.defaultRequest = request;
        this.currentRequest = request;

        if (request !== null) {
            if (
                typeof request.visible !== 'undefined' &&
                request.visible !== null
            ) {
                this.setVisible(request.visible);
            }
            if (
                typeof request.color !== 'undefined' &&
                request.color !== null
            ) {
                this.setColor(request.color);
            }
            if (
                typeof request.width !== 'undefined' &&
                request.width !== null
            ) {
                this.setWidth(request.width);
            }
            if (
                typeof request.style !== 'undefined' &&
                request.style !== null
            ) {
                this.setStyle(request.style);
            }
        }
    };

    linePropertiesPrototype.getRequest = function() {
        return this.currentRequest;
    };

    Polymer(linePropertiesPrototype);
    GLOBAL.DS.RAComponents.linepropertiescontrol = linePropertiesPrototype;
})(this, document._currentScript.parentElement.querySelector('template'));
/*
 * document.currentScript is not fully supported in IE11 and in FF the query
 * returns null (searching the widget instead of the component html)
 * document._currentScript is the polyfilled version supported by Polymer
 */
