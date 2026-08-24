import {useState} from 'react';
import './ListagemChefs.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BotaoChat from "../../components/BotaoChat/BotaoChat.jsx";

export default function ListagemChefs() {

    const [chefs, setChefs] = useState([{
        id: 1,
        nome: 'Chef Henrique Fogaça',
        email: 'fogaca@chef.com',
        telefone: '(11) 99999-1111'
    }, {id: 2, nome: 'Chef Helena Rizzo', email: 'helena@chef.com', telefone: '(11) 99999-2222'}, {
        id: 3,
        nome: 'Chef Erick Jacquin',
        email: 'jacquin@chef.com',
        telefone: '(11) 99999-3333'
    }]);

    return (<div className="page-container">

        <Header/>

        <main className="content-container">
            <h2>Contatos de Chefs</h2>

            {chefs.length === 0 ? (<div className="empty-state">
                <p>Nenhum contato cadastrado no momento.</p>
            </div>) : (

                <div className="chefs-list">
                    {chefs.map((chef) => (<div key={chef.id} className="chef-card">
                        <h3>{chef.nome}</h3>
                        <p><strong>E-mail:</strong> {chef.email}</p>
                        <p><strong>Telefone:</strong> {chef.telefone}</p>
                    </div>))}
                </div>)}
        </main>
        <BotaoChat />
        <Footer/>
    </div>);
}
