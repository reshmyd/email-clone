// //page loads successfully and displays content on load
describe("page loads successfully and displays content on load", () => {
  it("page loads successfully and displays content on load", () => {
    
    cy.visit("http://localhost:3000/")
    
    cy.contains("Relay.io")
    cy.contains("Inbox")
    cy.contains("Trash")
    cy.get("button[data-cy=compose-btn]")
    cy.get("button[data-cy=filter-btn]")
    cy.contains("Random Email 1 H-P")
    cy.contains("Select an item to read")
    cy.contains("Nothing is selected")

  })
})



//on clicking trash tab should show trash mails
describe("on clicking trash tab should show trash mails", () => {
  it("on clicking trash tab should show trash mails", () => {
    cy.visit("http://localhost:3000/")
    cy.get("[data-cy=trash-tab]").click()
    cy.contains("Random Email 11 H-P")
    
  })
})



//on email selection selected email is shown on right hand side
describe("on email selection selected email is shown on right hand side", () => {
  it("on email selection selected email is shown on right hand side", () => {
    cy.visit("http://localhost:3000/")
    
    cy.get("[data-cy*=email-id-4]").click()
    cy.contains("Nothing is selected").should("not.exist")
    cy.contains("lavinia_dare65@yahoo.com")

    //cy.get("[data-cy=current-email-4]")

  })
})



//on clicking inbox tab or trash tab nothing should be shown on the right hand side as no mail is selected
describe("on clicking inbox tab or trash tab nothing should be shown on the right hand side as no mail is selected", () => {
  it("on clicking inbox tab or trash tab nothing should be shown on the right hand side as no mail is selected", () => {
    
    cy.visit("http://localhost:3000/")
    
    cy.get("[data-cy*=email-id-4]").click()
    cy.contains("Nothing is selected").should("not.exist")
    
    cy.get("[data-cy=inbox-tab]").click()
    cy.contains("Nothing is selected")

    cy.get("[data-cy=trash-tab]").click()
    cy.contains("Nothing is selected")

  })
})



//on selection of unread email number unread state should change
describe("on selection of unread email number unread state should change", () => {
  it("on selection of unread email number unread state should change", () => {
    cy.visit("http://localhost:3000/")
    cy.get("[data-cy*=email-id-1]").click()
    cy.contains("2")
    })
})



//on deleting an email from inbox it should go to trash
describe("on deleting an email from inbox it should go to trash", () => {
  it("on deleting an email from inbox it should go to trash", () => {
    cy.visit("http://localhost:3000/")
    cy.get("[data-cy*=email-id-1]").click()
    cy.get("[data-cy=delete-btn]").click()
    cy.contains("9")
  })
})



//on deleting an email from trash it should go be deleted forever
describe("on deleting an email from trash it should go be deleted forever", () => {
  it("on deleting an email from trash it should go be deleted forever", () => {
    cy.visit("http://localhost:3000/")
    cy.get("[data-cy=trash-tab]").click()
    cy.get("[data-cy*=email-id-14]").click()
    cy.get("[data-cy=delete-btn]").click()
    cy.contains("7")
  })
})




//should be able to cycle through emails
describe("should be able to cycle through emails", () => {
  it("should be able to cycle through emails", () => {
    cy.visit("http://localhost:3000/")
    cy.get("[data-cy*=email-id-2]").click()
    
    cy.get("[data-cy=left-chevron]").click()
    cy.contains("leland_weissnat89@hotmail.com")
    
    cy.get("[data-cy=right-chevron]").click()
    cy.contains("sabryna_corwin@yahoo.com")
  })
})


//when on the last mail clicking the right chevron should do nothing
describe("when on the last mail clicking the right chevron should do nothing", () => {
  it("when on the last mail clicking the right chevron should do nothing", () => {
    cy.visit("http://localhost:3000/")
    cy.get("[data-cy*=email-id-8]").click()
    cy.contains("green12@yahoo.com")
    cy.get("[data-cy=right-chevron]").click()
    cy.contains("green12@yahoo.com")
    })
})



//when on the first mail clicking the left chevron should do nothing
describe("when on the first mail clicking the left chevron should do nothing", () => {
  it("when on the first mail clicking the left chevron should do nothing", () => {
    cy.visit("http://localhost:3000/")
    cy.get("[data-cy*=email-id-1]").click()
    cy.contains("leland_weissnat89@hotmail.com")
    cy.get("[data-cy=left-chevron]").click()
    cy.contains("leland_weissnat89@hotmail.com")
    
  })
})



//should be able to filter through emails
describe("should be able to filter through emails", () => {
  it("should be able to filter through emails and get emails of high importance and on deselecting the high checkbox should give the whole list of emails", () => {
    
    cy.visit("http://localhost:3000/")
    cy.get("button[data-cy=filter-btn]").click()
    cy.get("#High").click()
    cy.get("[data-cy*=high]").each((elem, i, list) => {
      expect(list).to.have.length(3)
    })
    
    cy.get("button[data-cy=filter-btn]").click()
    cy.get("#High").click()
    cy.get("[data-cy*=email-id]").each((elem, i, list) => {
      expect(list).to.have.length(8)
    })
  })

  it("should be able to filter through emails using multiple filters and list emails of low importance and type work", () => {
    
    cy.visit("http://localhost:3000/")
    cy.get("button[data-cy=filter-btn]").click()
    cy.get("#Low").click()
    cy.get("button[data-cy=filter-btn]").click()
    cy.get("#Work").click()
    cy.get("[data-cy*=low-work]").each((elem, i, list) => {
      expect(list).to.have.length(2)
    })
  })
})

