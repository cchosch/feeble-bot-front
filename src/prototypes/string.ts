interface String { // eslint-disable-line
    replaceAt(index: number, replacement: string): string;
    splice(offset: number, text: string, removeCount?: number): string;
    finish(repeat: number, value: string): string;
    start(repeat: number, value: string): string;
    reverse(): string;
}

String.prototype.replaceAt = function(index: number, replacement: string): string {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
};

/**
 * Splices text within a string.
 * @param {int} offset The position to insert the text at (before)
 * @param {string} text The text to insert
 * @param {int} [removeCount=0] An optional number of characters to overwrite
 * @returns {string} A modified string containing the spliced text.
 */
String.prototype.splice = function(offset: number, text: string, removeCount?: number): string {
    const calculatedOffset = offset < 0 ? this.length + offset : offset;
    return this.substring(0, calculatedOffset) +
        text + this.substring(calculatedOffset + (removeCount??0));
};

String.prototype.reverse = function(): string {
    let newVal = "";
    for(let i = this.length-1; i >= 0; i--) {
        newVal += this.charAt(i);
    }
    return newVal;
};

String.prototype.finish = function(repeat: number, value: string): string {
    if(value.length === 0 || !repeat)
        return this.toString();

    const reversed = this.reverse();
    let count = 0;

    for(let i = 0; i+value.length <= reversed.length; i+=value.length) {
        if(reversed.substring(i, i+value.length) === value){
            count++;
            continue;
        }
        break;
    }

    if(count >= repeat)
        return this.toString();
    let newVal = this.toString();

    for(let i = 0; i < repeat-count; i++) {
        newVal += value;
    }

    return newVal;
};

String.prototype.start = function(repeat: number, value: string): string {
    return this.reverse().finish(repeat, value.reverse()).reverse();
};