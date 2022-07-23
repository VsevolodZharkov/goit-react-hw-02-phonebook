import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types'

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  onSubmit = event => {
    event.preventDefault();
    const id = nanoid();
    const user = { ...this.state, id };
    this.props.addUserData(user);
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <label>
          Name
          <input
					type="text"
					name="name"
					value={name}
          onChange={this.handleChange}
					pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
					title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
					required
          />
        </label>
        <label>
          Number
          <input
					 type="tel"
					 name="number"
					 value={number}
					 onChange={this.handleChange}
					 pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
					 title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
					 required
          />
        </label>

        <button type="submit" onClick={this.onSubmit}>Add contact</button>
      </form>
    );
  }
}
ContactForm.propTypes = {
	name: PropTypes.string.isRequired,
	number: PropTypes.string.isRequired
};
export { ContactForm };