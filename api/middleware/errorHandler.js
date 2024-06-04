export const notFound = (req, res, next) => {
    res.status(404).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>404 Page Not Found</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  text-align: center;
              }
              .container {
                  margin-top: 50px;
              }
              h1 {
                  font-size: 36px;
                  margin-bottom: 20px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>404 Page Not Found</h1>
              <p>Sorry, the page you requested could not be found.--</p>
          </div>
      </body>
      </html>
    `);
  };
  
  export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  };