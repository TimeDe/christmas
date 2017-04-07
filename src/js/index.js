function changePage(ele, effect, callback){
    ele
        .addClass(effect)
        .one('animationend webkitAnimationEnd', function () {
            callback && callback();
        });
}

function HTML5Audio(url, loop) {
    var audio = new Audio(url);
    audio.autoplay = true;
    audio.loop = loop || false;
    audio.play();
    return {
        end : function (fn) {
            audio.addEventListener('ended', function () {
                fn && fn();
            },false)
        }
    }
}

var christmas = function () {
    var $pageA = $('.page-a');
    var $pageB = $('.page-b');
    var $pageC = $('.page-c');

    var observer = new Observer();

    new pageA($pageA);

    observer.subscribe('pageB', function(){
        new pageB(function () {
            observer.publish('completeB');
        })
    });

    observer.subscribe('pageC', function () {
        new pageC()
    });

    observer.subscribe('completeA', function () {
        changePage($pageA, 'effect-out', function () {
            observer.publish('pageB');
        })
    });

    observer.subscribe('completeB', function () {
        changePage($pageC, 'effect-in', function () {
            observer.publish('pageC');
        })
    })
};


$(function () {
    $('button').click(function () {
        christmas();
        var audio = HTML5Audio('http://www.sunnylinner.com/Games/Music/Media/407.mp3')
    })
});