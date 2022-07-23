import { Component } from 'react';
import { ContactForm  } from './components/ContactForm/ContactForm';
import { ContactList } from './components/ContactList/ContactList'
import {  Filter } from './components/Filter/Filter'
import PropTypes from 'prop-types'
import './index'
class App extends Component {
  state = {
    contacts : [],
		filter: '',
  };

  addUserData = user => {
		const { contacts } = this.state;
		const a = contacts.filter(({name}) => name === user.name)
		const b = a.map(user => user.name);
		if(user.name === b[0]) {
			alert( user.name + 'is already in contacts.' );
			return;
		}
    this.setState(prevState => ({
      contacts: [...prevState.contacts , user],
    }));
  };
	handlerFilter = ({target: {value}}) => {
		this.setState({filter: value})
	}
	getVisableUsers = () => {
		const { filter, contacts  } = this.state;
		return contacts.filter(({name}) => name.toLowerCase().includes(filter.toLowerCase()))
	}
	deleteUser = (userId) => {
		const { contacts } = this.state;
		let newMutMas = contacts.filter(({id}) => id !== userId)
		this.setState(({contacts: [...newMutMas]}))
	}

  render() {
		const { filter } = this.state;
    return (
      <>  
				<h1>Phonebook</h1>
          <ContactForm  addUserData={this.addUserData} />
				<h2>Contacts</h2>
					<Filter filter={filter} handlerFilter={this.handlerFilter}/>
					<ContactList usersList={this.getVisableUsers()} deleteUser={this.deleteUser}/>
      </>
    );
  }
}
App.propTypes = {
		state: PropTypes.shape({
			contacts: PropTypes.arrayOf(PropTypes.object),
			filter: PropTypes.string.isRequired
		})
};
export { App }