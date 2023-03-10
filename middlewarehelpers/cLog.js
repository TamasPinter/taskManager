//using from class to log request methods
const cLog = (req, res, next) => {
    const fgCyan = '\x1b[36m';
    switch (req.method) {
        case 'GET': {
            console.info(`📗 ${fgCyan}${req.method} request to ${req.path}`);
            break;
          }
          case 'POST': {
            console.info(`📘 ${fgCyan}${req.method} request to ${req.path}`);
            break;
          }
          default:
            console.log(`📙${fgCyan}${req.method} request to ${req.path}`);
        }
      
        next();
      };
      
      exports.cLog = cLog;
