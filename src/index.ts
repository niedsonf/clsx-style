function toVal(mix: any) {
    var k, y, str = '';

    if (typeof mix === 'string' || typeof mix === 'number') {
        str += mix;
    } else if (typeof mix === 'object') {
        if (Array.isArray(mix)) {
            for (k = 0; k < mix.length; k++) {
                if (mix[k]) {
                    if (y = toVal(mix[k])) {
                        str && (str += ' ');
                        str += y;
                    }
                }
            }
        } else {
            if (typeof mix.prefix === 'string' && mix.style) {
                if (typeof mix.style === 'string' || typeof mix.style === 'number') {
                    y = mix.style
                        .replaceAll(' ', (' ' + mix.prefix))
                    y = mix.prefix + y
                    str && (str += ' ');
                    str += y;
                } else if (typeof mix.style === 'object') {
                    y = toVal(mix.style)
                        .replace(' ', (' ' + mix.prefix))
                    y = mix.prefix + y
                    str && (str += ' ');
                    str += y;
                }
            } else {
                for (k in mix) {
                    if (mix[k]) {
                        str && (str += ' ');
                        str += k;
                    }
                }
            }
        }
    }

    return str;
}

export function cs() {
    var i = 0, tmp, x, str = '';
    while (i < arguments.length) {
        if (tmp = arguments[i++]) {
            if (x = toVal(tmp)) {
                str && (str += ' ');
                str += x
            }
        }
    }
    return str;
}

export default cs;