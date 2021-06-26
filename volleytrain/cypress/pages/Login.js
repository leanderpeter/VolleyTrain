const BASE_URL = 'http://localhost:3000';

export default class Login {

  static visit() {

    // google login via cypress-firebase library using the google-UID from our Testing-Google-Account set in cypress.env.json
    cy.login();  
    
    cy.intercept("http://localhost:3000/volleyTrain/userbygoogle/*",{
      fixture: 'user.json',
    })
    cy.intercept("https://www.googleapis.com/identitytoolkit/v3/relyingparty/getProjectConfig*",{
      fixture: 'projectConfig.json',
    })

    cy.visit(BASE_URL);
  }
}
