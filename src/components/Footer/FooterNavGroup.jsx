function FooterNavGroup() {
    return (
        <div className="footer-nav-group">
            <div className="nav-left">
                <p className="primary">Explorar</p>
                <ul>
                    <li className="nav-item secondary"><a>Receitas do Dia</a></li>
                    <li className="nav-item secondary"><a>Chefs em Destaque</a></li>
                    <li className="nav-item secondary"><a>Categorias</a></li>
                    <li className="nav-item secondary"><a>Vídeos</a></li>
                </ul>
            </div>

            <div className="nav-right">
                <p className="primary">Sobre</p>
                <ul>
                    <li className="nav-item secondary"><a>Nossa História</a></li>
                    <li className="nav-item secondary"><a>Escreva para Nós</a></li>
                    <li className="nav-item secondary"><a>Anuncie Conosco</a></li>
                    <li className="nav-item secondary"><a>Contato</a></li>
                </ul>
            </div>
        </div>
    )
}

export default FooterNavGroup;