const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const { app, database } = require('../server');

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return the homepage', (done) => {
    chai.request(app)
      .get('/')
      .then(response => {
        response.should.have.status(200);
        response.should.be.html;
        done()
      })
  });

  it('should return a 404 if a route does not exist', (done) => {
    chai.request(app)
      .get('/veryverysadpath')
      .then(response => {
        response.should.have.status(404);
        done()
      })  
  })
});

describe('API Routes', () => {

  beforeEach(() => {
    return database.migrate.rollback()
      .then(() => {
        return database.migrate.latest()
          .then(() => {
            return database.seed.run()
          })
      })
  })


  it('should GET all the photos', (done) => {
    chai.request(app)
      .get('/api/v1/photos')
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(200)
        response.body.should.be.an('array')
        response.body.length.should.equal(3)
        response.body[0].should.have.property('title', 'pic1')
        response.body[0].should.have.property('url', 'https://wallpaperbrowse.com/media/images/3848765-wallpaper-images-download.jpg')
        response.body[0].should.have.property('id', 1)
        response.body[2].should.have.property('title', 'pic3')
        response.body[2].should.have.property('url', 'https://www.elastic.co/assets/bltada7771f270d08f6/enhanced-buzz-1492-1379411828-15.jpg')
        response.body[2].should.have.property('id', 3)
        done()
      })
  })

  it('should POST a photo to the database', (done) => {   
    chai.request(app)
      .post('/api/v1/photos')
      .send({
        title: 'Amazing',
        url: 'https://i.imgur.com/MA2D0.jpg'
      })
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(201)
        response.body.should.be.an('object')
        response.body.should.have.property('id', 4)
        response.body.should.have.property('title', 'Amazing')
        response.body.should.have.property('url', 'https://i.imgur.com/MA2D0.jpg')
        done()
      })
  })

  it('should not POST a photo if the body does not include title and url', (done) => {
    chai.request(app)
      .post('/api/v1/photos')
      .send({ title: 'Stop playin' })
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(422)
        response.body.should.equal('Title and URL required')
        done()
      })
  })

  it('should DELETE a photo from the database', (done) => {
    chai.request(app)
      .del('/api/v1/photos/3')
      .end((error, response) => {
        response.should.have.status(200)
        response.body.should.be.an('string')
        response.body.should.equal('Deleted photo id:3')
        done()
      })
  })

  it('should return an error message if photo does not exist in database when trying to DELETE', (done) => {
    chai.request(app)
      .del('/api/v1/photos/1711')
      .end((error, response) => {
        response.should.have.status(404)
        response.body.should.be.an('string')
        response.body.should.equal('Delete failed. Photo not found')
        done()
      })
  })

});