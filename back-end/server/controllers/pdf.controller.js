const pdfCtrl = {};

const Project = require('../models/project');

const PDFDocument = require('pdfkit');

pdfCtrl.createPDF = async (req, res) => {
  const { id } = req.params;
  //const project = await Project.findById(id);
  const doc = new PDFDocument({info: {
      Title: 'Informe',
      Author: 'Virtual Assistant'
    }
  });
  doc.fontSize(25).text('Here is some vector graphics...', 100, 80);
  /*res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Access-Control-Allow-Origin': '*',
    'Content-Disposition': 'attachment; filename=Informe.pdf'
  });*/
  doc.pipe(res);
  doc.end();
  };//Testing

module.exports = pdfCtrl;