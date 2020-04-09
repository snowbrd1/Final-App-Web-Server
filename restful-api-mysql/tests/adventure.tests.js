const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Adventure API Service', function () {
  it('should GET all adventure', function (done) {
    chai
      .request('http://localhost:4000')
      .get('/api/adventure')
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.not.be.eql(0);
        done();
      });
  });

  it('should GET a single adventure', function (done) {
    const expected = [
      {
        user_id: 1,
        location: "Doe",
        adventure: '0001-01-18',
        sport: 'sales',
      },
    ];

    chai
      .request('http://localhost:4000')
      .get('/api/adventure/1')
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.not.be.eql(0);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });

  it.skip('should POST a single adventure', function (done) {
    const newAdventure = {
      name: 'New final adventure!',
    };
    const expected = { message: 'Add adventure successfully!' };

    chai
      .request('http://localhost:4000')
      .post('/api/adventure')
      .send(newAdventure)
      .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.eql(expected);
        done();
      });
  });
});