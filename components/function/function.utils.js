'use strict';

function factoryOf(Constructor) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(null);
        var BoundConstructor = Function.prototype.bind.apply(Constructor, args);
        return new BoundConstructor();
    };
}

export default {
    factoryOf: factoryOf
};