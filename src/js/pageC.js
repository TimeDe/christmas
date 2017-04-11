function pageC(element){
    this.$window = element.find('.window');
    this.$leftWin = this.$window.find('.window-left');
    this.$rightWin = this.$window.find('.window-right');
    this.$sceneBg = this.$window.find('.window-scene-bg');
    this.$closeBg = this.$window.find('.window-close-bg');

    this.$sceneBg.transition({
        'opacity' : 0
    }, 3000);
    this.$closeBg.css('transform', 'translateZ(0deg)');
    this.$closeBg.transition({
        'opacity' : 1
    }, 5000);

    this.closeWindow();
}

pageC.prototype.closeWindow = function () {
    var count = 1;
    var complete = function () {
        ++count;
        if(count == 2){

        }
    };

    var bind = function (element) {
        element.addClass('close').one('animationend webkitAnimationEnd', function () {
            complete();
        });
    };

    bind(this.$leftWin);
    bind(this.$rightWin);
}





