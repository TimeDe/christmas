var Observer = (function (slice) {
    function bind(event, fn) {
        var events = this.events = this.events || {},
            parts = event.split(/\s+/),
            i = 0,
            num = parts.length,
            part;

        if (events[event] && events[event].length){
            return this;
        }

        for(;i < num;i++){
            events[(part = parts[i])] = events[part] || [];
            events[part].push(fn);
        }
        return this;
    }
    
    function one(event, fn) {
        this.bind(event, function fnc() {
            fn.apply(this, slice.call(arguments));
            this.unbind(event, fnc);
        });

        return this;
    }

    function unbind(event, fn) {
        var events = this.events,
            eventName,i,parts,num;

        if(!events){
            return ;
        }

        parts = event.split(/\s+/);
        for(i=0,num=parts.length;i < num;i++){
            if((eventName = parts[i]) in events !== false){
                events[eventName].splice(events[eventName].indexOf(fn), 1);
                if(!events[eventName].length){
                    delete events[eventName];
                }
            }
        }

        return this;
    }
    
    function trigger(event) {
        var events = this.events,
            i,args,flag;
        //console.log(events);
        if(!events || event in events === false){
            return;
        }

        args = slice.call(arguments, 1);

        for(i=events[event].length-1;i>=0;i--){
            flag = events[event][i].apply(this, args);
        }
        return flag;
    }

    return function(){
        this.on =
            this.subscribe = bind;
        this.off =
            this.unsubscribe = unbind;
        this.trigger =
            this.publish = trigger;
        this.one = one;
        return this;
    };
})([].slice);