import { useState } from 'react';
import { FormStyle, InputLabel, FormInput, FormButton } from './Form.styled';
import { getContacts } from 'redux/contacts/contactsSlice';
import { addContacts } from 'redux/contacts/contactsSlice';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';

export function Form() {
  const dispatch = useDispatch();

  const data = useSelector(getContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handelInputChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handelOnSubmit = e => {
    e.preventDefault();
    reset();
    const contactName = data.map(prevContact => prevContact.name);
    if (contactName.includes(name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    dispatch(addContacts({ id: nanoid(), name, number }));
    return;
  };
  const reset = () => {
    setName('');
    setNumber('');
  };
  return (
    <FormStyle onSubmit={handelOnSubmit}>
      <InputLabel>
        Name
        <FormInput
          type="text"
          name="name"
          value={name}
          onChange={handelInputChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </InputLabel>
      <InputLabel>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handelInputChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </InputLabel>
      <FormButton type="submit">Add contact</FormButton>
    </FormStyle>
  );
}
