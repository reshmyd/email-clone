import './App.scss'
import { useState, useEffect, createContext } from 'react'

import { emails } from './assets/data/emails.js'
import { trash } from './assets/data/trash.js'

import Nav from './components/Nav/Nav'
import SideNav from './components/SideNav/SideNav'
import EmailContainer from './container/EmailContainer/EmailContainer'

export const AppContext = createContext()

const App = () => {
  
  const [unread, setUnread] = useState(0)
  const [inTrash, setInTrash] = useState(0)
  const [isInboxActive, setIsInboxActive] = useState(true)
  
  const [inbox, setInbox] = useState([...emails])
  const [trashMails, setTrashMails] = useState([...trash])

  const [currentEmail, setCurrentEmail] = useState(emails[0])
  const [emailList, setEmailList] = useState([...emails])
  const [isFilterHidden, setIsFilterHidden] = useState(true)
  
  const [importance, setImportance] = useState({high: false, medium: false, low: false})
  const [date, setDate] = useState({mostRecent: false, oldest: false})
  const [type, setType] = useState({personal: false, work: false})
 

  
  useEffect(() => {
    setInTrash(trashMails.length)
    setUnread(inbox.filter(elem => elem.unread).length)
  
  }, [inbox, trashMails])

  
  
  // useEffect(() => {
  //   // if (activeTab && inbox[0]) setCurrentEmail(inbox[0])
  //   // else if (!activeTab && trashMails[0]) setCurrentEmail(trashMails[0])
  //   // else 

  //   if (isInboxActive) setEmailList(inbox)
  //   else if (!isInboxActive) setEmailList(trashMails)
  //   setCurrentEmail({})
  //   setImportance({high: false, medium: false, low: false})
  //   setDate({mostRecent: false, oldest: false})
  //   setType({personal: false, work: false})
    
  // }, [isInboxActive])

  
  
  useEffect(() => {
    let tempEmailList = isInboxActive ? [...inbox] : [...trashMails]
    if (importance.high) tempEmailList = tempEmailList.filter(elem => elem.importance === 'high')
    else if (importance.medium) tempEmailList = tempEmailList.filter(elem => elem.importance === "medium")
    else if (importance.low) tempEmailList = tempEmailList.filter(elem => elem.importance === "low")

    if (date.oldest) tempEmailList = tempEmailList.reverse()

    if(type.personal) tempEmailList = tempEmailList.filter(elem => elem.type === "personal")
    else if(type.work) tempEmailList = tempEmailList.filter(elem => elem.type === "work")

    setEmailList([...tempEmailList])
    setCurrentEmail({})
    
  }, [importance, date, type])


  
  const handleTabClick = str => {
    setIsInboxActive(() => str === "inbox")
    setCurrentEmail({})
    if (isInboxActive) setEmailList(inbox)
    else if (!isInboxActive) setEmailList(trashMails)
    setCurrentEmail({})
    setImportance({high: false, medium: false, low: false})
    setDate({mostRecent: false, oldest: false})
    setType({personal: false, work: false})
  }

  
  
  const handleCheckboxClick = (e, criteria) => {
    setIsFilterHidden(true)
    if (criteria === "importance") {
      if (e.target.value === "High" && !importance.high) setImportance({high: true, medium: false, low: false})
      else if (e.target.value === "Medium" && !importance.medium) setImportance({high: false, medium: true, low: false})
      else if (e.target.value === "Low" && !importance.low) setImportance({high: false, medium: false, low: true})
      else setImportance({high: false, medium: false, low: false})

    } else if (criteria === "date") {
      if (e.target.value === "Most Recent" && !date.mostRecent) setDate({mostRecent: true, oldest: false})
      else if (e.target.value === "Oldest" && !date.oldest) setDate({mostRecent: false, oldest: true})
      else setDate({mostRecent: false, oldest: false})

    } else if (criteria === "type") {
      if (e.target.value === "Personal" && !type.personal) setType({personal: true, work: false})
      else if (e.target.value === "Work" && !type.work) setType({personal: false, work: true})
      else setType({personal: false, work: false})
    }
  }

  
  const handleFilterBtnClick = () => setIsFilterHidden(!isFilterHidden)


  const handleEmailClick = email => {
    console.log("current-email-"+email.id)
    email.unread = false
    setCurrentEmail(email)
    const tempEmailList = emailList.map(elem => {
      if (elem.id === email.id) elem.unread = false
      return elem
    })
    const tempInbox = inbox.map(elem => {
        if (elem.id === email.id) elem.unread = false
        return elem
       })
    const tempTrashMails = trashMails.map(elem => {
      if (elem.id === email.id) elem.unread = false
      return elem
    }) 
    
    setEmailList(tempEmailList)
    setInbox(tempInbox)
    setTrashMails(tempTrashMails)
  }


  
  const handleEmailCycling = str => {
    const lastIndex = emailList.length - 1
    const currIndex = emailList.indexOf(currentEmail)
    
    if (str === 'left' && currIndex > 0) {
      setCurrentEmail(emailList[currIndex - 1])
      const tempEmail = emailList[currIndex - 1]
      setEmailList(() => emailList.map(elem => {
        if (elem.id === tempEmail.id) elem.unread = false
        return elem
      }))
      setInbox(() => inbox.map(elem => {
        if (elem.id === tempEmail.id) elem.unread = false
        return elem
       }))
      setTrashMails(() => trashMails.map(elem => {
        if (elem.id === tempEmail.id) elem.unread = false
        return elem
      }))
    
    }
    
    else if (str === 'right' && lastIndex > currIndex) {
      setCurrentEmail(emailList[currIndex + 1])
      const tempEmail = emailList[currIndex + 1]
      setEmailList(() => emailList.map(elem => {
        if (elem.id === tempEmail.id) elem.unread = false
        return elem
      }))
      setInbox(() => inbox.map(elem => {
        if (elem.id === tempEmail.id) elem.unread = false
        return elem
       }))
      setTrashMails(() => trashMails.map(elem => {
        if (elem.id === tempEmail.id) elem.unread = false
        return elem
      }))
    }
  }

  const handleDelete = email => {
    const lastIndex = emailList.length - 1
    const currIndex = emailList.indexOf(email)
    setEmailList(() => emailList.filter(elem => elem.id !== email.id ))
    if (currIndex < lastIndex) setCurrentEmail(emailList[currIndex + 1])
    else if (currIndex === lastIndex) setCurrentEmail(emailList[0])
    else setCurrentEmail({})
    
    if (isInboxActive) {
      setInbox(inbox.filter(elem => elem.id !== email.id))
      let tempTrashMails = [...trashMails, email]
      tempTrashMails = tempTrashMails.sort((a,b) => b.received - a.received)
      setTrashMails(tempTrashMails)
    }
    else setTrashMails(trashMails.filter(elem => elem.id !== email.id))
  }
  
  
  
  return (
    
    <div className="App">
       
      <Nav />
      <main>
        
        <AppContext.Provider value={{unread, isInboxActive, handleTabClick, inTrash, inbox, trashMails, currentEmail, emailList, importance, date, type, isFilterHidden, handleCheckboxClick, handleFilterBtnClick, handleEmailClick, handleEmailCycling, handleDelete, setIsFilterHidden}}>
          
          <SideNav />
          <EmailContainer />

        </AppContext.Provider>
        
      </main>
    </div>
   
    
  );
}

export default App;
