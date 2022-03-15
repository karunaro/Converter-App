const { ConversionModel } = require('../database/models');
const request = require("supertest");
const expect = require("chai").expect;
const app = require("../index");


beforeEach(async () => {
  await ConversionModel.deleteMany({});
});
describe("Conversion ✔️", () => {
 
  describe("POST /convert", () => {
    it("should return converted 1 EUR to USD", async () => {
      const res = await request(app)
        .post("/convert")
        .send({
            fromCurrency:"EUR",
            toCurrency: "USD",
            amountToConvert:1
        });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("value", 1.0942235936491262);
      
    });
    it("should return converted 1 USD to EUR", async () => {
        const res = await request(app)
          .post("/convert")
          .send({
              fromCurrency:"USD",
              toCurrency: "EUR",
              amountToConvert:1
          });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("value", 0.91389);
        
      });
      it("should return converted 1 USD to 1 USD", async () => {
        const res = await request(app)
          .post("/convert")
          .send({
              fromCurrency:"USD",
              toCurrency: "USD",
              amountToConvert:1
          });
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("value", 1);
        
      });
      
      
  });
  




  
});