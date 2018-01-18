'use strict';

/**
 * Insert the text at the cursor into the active element. Note that we're
 * intentionally not appending or simply replacing the value of the editable
 * field, as we want to allow normal pasting conventions. If you paste at the
 * beginning, you shouldn't see all your text be replaced.
 * Taken from:
 * http://stackoverflow.com/questions/7404366/how-do-i-insert-some-text-where-the-cursor-is
 */
function insertTextAtCursor(text) {
    var el = document.activeElement;
    var val = el.value;
    var endIndex;
    var range;
    var doc = el.ownerDocument;
    if (typeof el.selectionStart === 'number' &&
        typeof el.selectionEnd === 'number') {
        endIndex = el.selectionEnd;
        el.value = val.slice(0, endIndex) + text + val.slice(endIndex);
        el.selectionStart = el.selectionEnd = endIndex + text.length;
    } else if (doc.selection !== 'undefined' && doc.selection.createRange) {
        el.focus();
        range = doc.selection.createRange();
        range.collapse(false);
        range.text = text;
        range.select();
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.data) {
        insertTextAtCursor(request.data);
    }
});

var boo = true;
var foo = true;
// Lets listen to mouseup DOM events.
document.addEventListener('select', function (e) {
    console.log('select!!');
    var qoutedText = window.getSelection().toString();
    console.log('qoutedText: ' + qoutedText);
    boo = true;
    foo = true;
    var el = document.activeElement;
    var val = el.value;
    console.log('val: ' + val);
    var endIndex;
    var range;
    var doc = el.ownerDocument;
     if (qoutedText.length > 2) {
        boo = false;
            document.addEventListener('keypress', myFunctionReference2);
            function myFunctionReference2(e) {
                if (foo){
                    foo = false;
                    if (typeof el.selectionStart === 'number' && typeof el.selectionEnd === 'number') {
                    var keyCode = e.keyCode;
                        if (keyCode == 34){
                            console.log('selection!!');
                            endIndex = el.selectionEnd;
                            console.log('el.selectionEnd: ' + el.selectionEnd);
                            console.log('el.selectionStart: ' + el.selectionStart); 
                            var res = val.slice(0, el.selectionStart) + '\"' + qoutedText + '\"' + val.slice(el.selectionEnd, val.length);
                            el.value = res;
                            console.log('el.value: ' + el.value);
                            }
                        }else if (doc.selection !== 'undefined' && doc.selection.createRange) {
                            console.log('Here');
                            el.focus();
                            range = doc.selection.createRange();
                            range.collapse(false);
                            range.text =  qoutedText ;
                            range.select();
                        }
                }
            }
     }else{
        boo = true;
     }

});

document.addEventListener('keypress', myFunctionReference);
function myFunctionReference(e) {
    var keyCode = e.keyCode;
    if (keyCode == 34 && boo){
        console.log('clicked paste demo');
        chrome.runtime.sendMessage({
        type: 'copy',
        text: 'some text to copy'
    
        });
    }
}


