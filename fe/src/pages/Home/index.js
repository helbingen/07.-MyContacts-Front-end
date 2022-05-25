/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Container, InputSearchContainer, Header, ListContainer, Card,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function Home() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/contacts')
      .then(async (response) => {
        const json = await response.json();
        setContacts(json);
      })
      .catch((error) => {
        console.log('erro', error);
      });
  }, []);

  // useEffect com array de dependências vazio faz a requisição ser feita só na primeira vez que o componente é renderizado em tela

  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar Contato" />
      </InputSearchContainer>
      <Header>
        <strong>
          {contacts.length}
          {contacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new">Novo contato</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>

        {contacts.map((contact) => (
          <Card key={contact.id}>
            <div className="info">
              <div className="contact-name">
                <strong>{contact.name}</strong>
                {contact.category_name && (
                  <small>{contact.category_name}</small>
                )}
                {/* renderiza a tag small somente se o valor de category_name for válido */}
              </div>
              <span>{contact.email}</span>
              <span>{contact.phone}</span>
            </div>

            <div className="actions">
              <Link to={`/edit/${contact.id}`}>
                <img src={edit} alt="Edit" />
              </Link>
              <button type="button">
                <img src={trash} alt="Delete" />
              </button>
            </div>
          </Card>
        ))}
      </ListContainer>
    </Container>
  );
}

// SOP -> Same Origin Policy -> Política de mesma origem (Só existe em navegadores e requisições feitas através do Javascript precisam ter mesma origem para destino e saída). Request do tipo basic.
// CORS -> Cross-Origins-Resource-Sharing -> Compartilhamento de recursos entre origens diferentes
// Origiem: protocolo://domínio:porta

// Saída: http://localhost:3000
// Destino: http://localhost:3001

// Preflight - Pré-voô
// method: OPTIONS http://localhost:3001/contacts
