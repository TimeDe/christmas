function pageB(element, pageComplete) {
    var $boy = element.find('.christmas-boy');
    var $girl = element.find('.girl');
    var $boyHead = element.find('.christmas-boy-head');
    var $carousel = element.find('#carousel');
    var animationEnd = 'animationend webkitAnimationEnd';
    var carousel = new Carousel($carousel, {
        imgUrls: [
            "../src/images/carousel/1.png",
            "../src/images/carousel/2.png",
            "../src/images/carousel/3.png"
        ],
        videoUrls: [
            "../src/images/carousel/1.mp4",
            "../src/images/carousel/2.mp4",
            "../src/images/carousel/3.mp4"
        ]
    });
    var i = 1;

    var boyAction = {
        walk: function () {
            var dfd = $.Deferred();
            $boy.transition({
                'right': '4.5rem'
            }, 4000, 'linear', function () {
                dfd.resolve();
            });
            return dfd;
        },
        stopWalk: function () {
            $boy.removeClass('boy-walk');
            $boy.addClass('boy-stand');
        },
        runWalk: function () {
            $boy.addClass('walk-run')
        },
        unwrapp: function () {
            var dfd = $.Deferred();
            $boy.addClass('boy-unwrapp');
            $boy.removeClass('boy-stand');
            $carousel.addClass('show');
            $boy.one(animationEnd, function () {
                dfd.resolve();
            });
            return dfd;
        },
        strip: function (count) {
            $boy.addClass('boy-strip-' + count).removeClass('boy-unwrapp')
        },
        hug: function () {
            $boy.addClass('boy-hug').one(animationEnd, function () {
                $('.christmas-boy-head').show();
            })
        }
    };

    var girlAction = {
        standUp: function () {
            var dfd = $.Deferred();
            setTimeout(function () {
                $girl.addClass('girl-standUp');
            }, 200);
            setTimeout(function () {
                $girl.addClass('girl-throwBook');
                dfd.resolve();
            }, 500);
            return dfd;
        },
        walk: function (callback) {
            var dfd = $.Deferred();
            $girl.addClass('girl-walk');
            $girl.transition({
                'left': '4.5rem'
            }, 4000, 'linear', function () {
                dfd.resolve();
            });
            return dfd;
        },
        stopWalk: function () {
            $girl.addClass('walk-stop')
                .removeClass('girl-standUp')
                .removeClass('girl-walk')
                .removeClass('girl-throwBook')
                .addClass('girl-stand')
        },
        chooseFirst: function (count) {
            var dfd = $.Deferred();
            setTimeout(function () {
                $girl.removeClass('walk-stop').addClass('girl-choose').one(animationEnd, function () {
                    $girl.removeClass('girl-choose').addClass('walk-stop');
                    carousel.run(count, function () {
                        carousel.playVideo();
                    }).then(function () {
                        dfd.resolve();
                    });
                });
            }, 0);
            return dfd;
        },
        choose: function (count) {
            var dfd = $.Deferred();
            setTimeout(function () {
                $girl.removeClass('walk-stop').addClass('girl-choose').one(animationEnd, function () {
                    $girl.removeClass('girl-choose').addClass('walk-stop');
                    carousel.run(count, function () {
                        carousel.playVideo();
                    }).then(function () {
                        dfd.resolve();
                    });
                });
            }, 10000);
            return dfd;
        },
        weepWalk: function (callback) {
            var dfd = $.Deferred();
            $girl.addClass('girl-weep');
            $girl.transition({
                'left': '7rem'
            }, 1000, 'linear', function () {
                $girl.addClass('walk-stop')
                    .removeClass('girl-weep');
                callback && callback();
                dfd.resolve();
            });
            return dfd;
        },
        hug: function (fn) {
            $girl.addClass('girl-hug').addClass('walk-run');
            boyAction.hug();
            fn && fn();
        }
    };

    boyAction.walk()
        .then(function () {
            boyAction.stopWalk();
            return girlAction.standUp()
        })
        .then(function () {
            girlAction.stopWalk();
            return girlAction.walk()
        })
        .then(function () {
            girlAction.stopWalk();
            return boyAction.unwrapp();
        })
        // .then(function () {
        //     setTimeout(function () {
        //         return girlAction.choose(1)
        //     }, 0)
        // })
        .then(function () {
            return girlAction.chooseFirst(1);
        })
        .then(function () {
            return girlAction.choose(2);
        })
        .then(function () {
            return girlAction.choose(3);
        })
        .then(function () {
            //return boyAction.strip(1);
            setTimeout(function () {
                boyAction.strip(1)
            }, 11000);
            setTimeout(function () {
                boyAction.strip(2)
            }, 12000);
            setTimeout(function () {
                boyAction.strip(3)
            }, 13000);
        })
        .then(function () {
            setTimeout(function () {
                return girlAction.weepWalk()
            }, 16000);
            setTimeout(function () {
                return girlAction.hug(function () {
                    pageComplete && pageComplete();
                })
            }, 18000);
        })

    // boyAction.walk().then(function () {
    //     boyAction.stopWalk();
    //     return girlAction.standUp();
    // }).then(function () {
    //     girlAction.stopWalk();
    //     return girlAction.walk();
    // }).then(function () {
    //     girlAction.stopWalk();
    // }).then(function () {
    //     return boyAction.unwrapp();
    // }).then(function () {
    //     //boyAction.stopWalk();
    //     girlAction.choose(1);
    //     setTimeout(function () {
    //         girlAction.choose(2)
    //     }, 16000)
    // })
    //     .then(function () {
    //     return girlAction.choose(2)
    // })

}









