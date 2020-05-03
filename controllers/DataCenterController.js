const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class DrawsController {
    constructor() {
        console.log('Draws Controller Initialized!');
    }
    
    // Fetches all entries in Draws
    async draws(ctx) {
        console.log('Controller HIT: DrawsControllers:Draws');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Draws';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying CHP.Draws: ${err}`);
                }
                
                ctx.body = res;
                ctx.status = 200;
                
                resolve();
            });
        })
         .catch(err => {
            ctx.status = 500;
            ctx.body = err;
        });
    }

    // Fetches a single Artist in Draws
    async draw(ctx) {
        console.log('Controller HIT: DrawsController::draw');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Draws WHERE Artist = ?;';
            const dc = ctx.params.draw;
            
            chpConnection.query({
                sql: query,
                values: [dc]
            }, (err, res) => {
                if(err) {
                    reject(err);
                } 

                ctx.body = res;
                ctx.status = 200;
                resolve();
            });
        })
         .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }

    // Add a new Draw Data Point
    async addDraw(ctx, next) {
        console.log('Controller HIT: DrawsController::addDraw');
       return new Promise((resolve, reject) => {
           const newDC = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO Draws(Artist, Comic_Book) VALUES (?, ?);',
               values: [newDC.Artist, newDC.Comic_Book]
           }, (err, res) => {
               if(err) {
                   reject(err);
               }
               
               resolve();
           });
           
       })
        .then(await next)
        .catch(err => {
           ctx.status = 500;
           ctx.body = {
               error: `Internal Server Error: ${err}`,
               status: 500
           };
       });
    }

    // Update a Data Point
    async updateDraws(ctx, next) {
        console.log('Controller HIT: DrawsController::updateDraws');
        return new Promise((resolve, reject) => {
            const dc = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE Draws 
                    SET 
                        Comic_Book = ?
                    WHERE Artist = ?
                    `,
                values: [dc.Comic_Book, dc.Artist, ctx.params.Draws]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }

                resolve();
            });
        })
         .then(await next)
         .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }

    async deleteDataCenter(ctx, next) {
        console.log('Controller HIT: DataCenterController::deleteDataCenter');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Draws WHERE name = ?;`,
                values: [ctx.params.dataCenter]
            }, (err, res) => {
                if(err) {
                    reject(err);
                }
                resolve();
            });
        })
        .then(await next)
        .catch(err => {
            ctx.status = 500;
            ctx.body = {
                error: `Internal Server Error: ${err}`,
                status: 500
            };
        });
    }
}

module.exports = DataCenterController;