var slice = Array.prototype.slice;

function toArray(a, i, j) {
    return slice.call(a, i || 0, j || a.length);
}

function isDefined(v) {
    return typeof v !== 'undefined';
}

function applyIf(o, c) {
    if(o){
        for(var p in c){
            if(!isDefined(o[p])){
                o[p] = c[p];
            }
        }
    }
    return o;
}

applyIf(string, {
    format : function (format) {
        var args = toArray(arguments, 1);
        return format.replace(/\{(\d+)\}/g, function (m, i) {
            return args[i];
        });
    }
});

function Carousel(carsouel, options) {
    var imgUrls = options.imgUrls;
    var $carousel = carsouel;
    var $spinner = carsouel.find('#spinner');
    var angle = 0;
}











