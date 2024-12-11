
const renderHTML = ({ appString,css }) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>MERN Classroom</title>
      <style id="jss-server-side">${css}</style>
    </head>
    <body>
      <div id="root">${appString}</div>
      <script src="/dist/bundle.js"></script>
    </body>
  </html>
`;

export default renderHTML;
