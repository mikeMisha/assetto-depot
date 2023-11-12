import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';
import nodemailer from 'nodemailer';

// Extend the NextApiRequest to include the file(s) property added by multer
interface NextApiRequestWithFiles extends NextApiRequest {
  files: Express.Multer.File[];
}

// Helper function to generate HTML content
const renderHTML = (obj: { [key: string]: string }): string => {
  let tags = [];
  for (let key in obj) {
    tags.push(`<h3>${key}:</h3><p>${obj[key]}</p>`);
  }
  return tags.join('');
};

// Set up the multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25000000, // Limit file size to 25MB
  },
});

// Create a handler for our API route
const apiRoute = nextConnect<NextApiRequestWithFiles, NextApiResponse>({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Apply the middleware
apiRoute.use(upload.any());

apiRoute.post(async (req, res) => {
  if (
    !req.files ||
    req.files.length === 0 ||
    Array.isArray(req.files[0]) ||
    req.files[0].size >= 25000000
  ) {
    res.status(552).json({
      error:
        'Upload Size of image exceeded limit. Image size must be under 25 MB.',
    });
    return;
  }

  const file = req.files[0];

  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
    secure: true,
  });

  // Mail data with the attachment
  const mailData = {
    from: process.env.NODEMAILER_FROM,
    to: process.env.NODEMAILER_TO,
    subject: `Submission From Assetto Depot`,
    text: JSON.stringify(req.body),
    html: renderHTML(req.body as { [key: string]: string }),
    attachments: [
      {
        filename: file.originalname,
        content: Buffer.from(file.buffer),
        contentType: file.mimetype,
      },
    ],
  };

  // Send mail with defined transport object
  await transporter.sendMail(mailData);

  res.status(200).json({ data: 'success' });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
