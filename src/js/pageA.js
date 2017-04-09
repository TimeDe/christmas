function pageA(element, pageComplete){
    this.$root = element;
    this.$boy = element.find('.chs-boy');
    this.$window = element.find('.window');
    this.$leftWin = this.$window.find('.window-left');
    this.$rightWin = this.$window.find('.window-right');
    this.callback = pageComplete;
    this.run();
}

pageA.prototype.next = function (options) {
    var dfd = $.Deferred();
    this.$boy.transition(options.style, options.time, "linear",function() {
        dfd.resolve()
    });
    return dfd;
};

pageA.prototype.stopWalk = function () {
    this.$boy.removeClass('chs-boy-deer');
};

pageA.prototype.run = function (fn) {
    var that = this;
    var next = function () {
        return this.next.apply(this, arguments)
    }.bind(this);

    next({
        'time': 10000,
        'style': {
            'top': '4rem',
            'right': '15rem',
            'scale': '1.2'
        }
    })
        .then(function () {
            return next({
                'time': 500,
                'style': {
                    'rotateY': '-180',
                    'scale': '1.5'
                }
            })
        })
        .then(function () {
            return next({
                'time': 7000,
                'style': {
                    'top': '7.8rem',
                    'right': '1.2rem'
                }
            })
        })
        .then(function () {
            that.stopWalk();
        })
        .then(function () {
            that.openWindow(function () {
                that.callback && that.callback();
            })
        })
};

pageA.prototype.openWindow = function (fn) {
    var count = 1;
    var complete = function () {
        ++count;
        if(count === 2){
            fn && fn();
        }
    };
    var bind = function (data) {
        data.one('transitionend webkitTransitionEnd', function (ev) {
            data.removeClass('window-transition');
            complete()
        });
    };
    bind(this.$leftWin.addClass('window-transition').addClass('hover'));
    bind(this.$rightWin.addClass('window-transition').addClass('hover'));
};

