import nextConnect from 'next-connect';
import multer from 'multer';

const renderHTML = (obj) => {
  let tags = [];
  for (let key in obj) {
    tags.push(`<h3>${key}:</h3><p>${obj[key]}</p>`);
  }
  return tags.join('');
};

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method "${req.method}" Not Allowed` });
  },
});

apiRoute.use(multer().any());

apiRoute.post(async (req, res) => {
  let nodemailer = require('nodemailer');

  if (req.files[0].size >= 25000000) {
    res.status(552).json({
      error:
        'Upload Size of image exceeded limit. Image size must be under 25 MB.',
    });
  }
  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
      authMethod: 'PLAIN',
    },
    secure: true,
  });

  const mailData = {
    from: process.env.NODEMAILER_FROM,
    to: process.env.NODEMAILER_TO,
    subject: `Submission From Assetto Depot`,
    text: JSON.stringify(req.body),
    html: renderHTML(req.body),
    attachments: [
      {
        filename: req.files[0].originalname,
        content: new Buffer.from(req.files[0].buffer),
        contentType: req.files[0].mimetype,
      },
    ],
  };
  await transporter.sendMail(mailData);

  res.status(200).json({ data: 'success' });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
