/// <reference types="cypress" />;

const CUSOTMER_NUMBER = "7202788969";
const CUSOTMER_NAME = "BRONYER TOZATTI FERREIRA";
const DEBOUNCE_DELAY = 500;
const FILES_URL = "**/files/*.pdf";

const currentYear = new Date().getFullYear();
const lastYear = currentYear - 1;

describe("Dashboard", () => {
  beforeEach(() => {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    cy.intercept("GET", "**/invoices/overview*", (req) => {
      delete req.headers["if-none-match"];
    }).as("overview");

    cy.visit("/");
  });

  it("should make the invoice overview request correctly", () => {
    cy.wait("@overview").its("response.statusCode").should("eq", 200);
  });

  it("should show the invoice overview for a given customer", () => {
    cy.wait("@overview").its("response.statusCode").should("eq", 200);

    cy.get("input[data-testid=search-field]").type(CUSOTMER_NUMBER);

    cy.wait(DEBOUNCE_DELAY);

    cy.wait("@overview").its("response.statusCode").should("eq", 200);
    cy.wait("@overview")
      .its("response.url")
      .should("contain", `customerNumber=${CUSOTMER_NUMBER}`);
  });
});

describe("History", () => {
  beforeEach(() => {
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    cy.intercept("GET", "**/customers*", (req) => {
      delete req.headers["if-none-match"];
    }).as("customerWithInvoices");

    cy.intercept("POST", "**/invoices/upload").as("importInvoices");

    cy.visit("/history");
  });

  it("should make the request to get customers and their invoices correctly", () => {
    cy.wait("@customerWithInvoices")
      .its("response.statusCode")
      .should("eq", 200);
  });

  it("should import invoices correctly", () => {
    cy.get("button").contains(lastYear).click();

    const invoices: Cypress.FileReference[] = [];

    cy.fixture("invoice_1.pdf", "binary")
      .then(Cypress.Buffer.from)
      .then((contents) => {
        invoices.push({
          contents,
          fileName: "invoice_1.pdf",
        });
      });

    cy.fixture("invoice_2.pdf", "binary")
      .then(Cypress.Buffer.from)
      .then((contents) => {
        invoices.push({
          contents,
          fileName: "invoice_2.pdf",
        });
      });

    cy.get("input[type=file]#invoicesUpload").selectFile(invoices, {
      force: true,
    });

    cy.wait("@importInvoices").its("response.statusCode").should("eq", 201);

    cy.wait("@customerWithInvoices")
      .its("response.statusCode")
      .should("eq", 200);

    cy.get("td").contains(CUSOTMER_NUMBER);
    cy.get("td").contains(CUSOTMER_NAME);
    cy.get("td")
      .children("a")
      .children("button")
      .children("[aria-label=invoice]")
      .should("have.length", 2);
  });

  it("should make the request to get customers from another year", () => {
    cy.wait("@customerWithInvoices")
      .its("response.statusCode")
      .should("eq", 200);

    cy.get("button").contains(lastYear).click();

    cy.wait("@customerWithInvoices");

    cy.get("@customerWithInvoices")
      .its("response.statusCode")
      .should("eq", 200);
    cy.get("@customerWithInvoices")
      .its("response.url")
      .should("contain", `year=${lastYear}`);
  });

  it("should make the request to get customers by using customer number", () => {
    cy.wait("@customerWithInvoices")
      .its("response.statusCode")
      .should("eq", 200);

    cy.get("input[data-testid=search-field]").type(CUSOTMER_NUMBER);

    cy.wait(DEBOUNCE_DELAY);

    cy.get("@customerWithInvoices")
      .its("response.statusCode")
      .should("eq", 200);
    cy.get("@customerWithInvoices")
      .its("response.url")
      .should("contain", `customer=${CUSOTMER_NUMBER}`);
  });
});
