
const renderHTML = ({ appString }) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>MERN Classroom</title>
    </head>
    <body>
      <div id="root">${appString}</div>
      <script src="/dist/bundle.js"></script>
    </body>
  </html>
`;

export default renderHTML;
