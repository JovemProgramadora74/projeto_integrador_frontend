import "./CriaChef.css"
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

function CriaChef() {
    return (
        <>
            <Header />
            <div className="container">
                <div className="form-container">
                    <h1 className="form-titulo"> Novo chef </h1>
                    <p className={"form-subtitulo"}> Adicione as informações de um novo chef.</p>
                    <label className={"form-grupo"}>Nome
                        <input type="text" placeholder="Nome do chef"/>
                    </label>
                    <label className={"form-grupo"}>Vinculo
                        <input type="text" placeholder="Amigo"/>
                    </label>
                    <label className={"form-grupo"}>Email
                        <input type="text" placeholder="chef@email.com"/>
                    </label>
                    <label className={"form-grupo"}>Numero de celular
                        <input type="text" placeholder="(00) 00000-0000"/>
                    </label>
                    <button className={"btn-cadastrar"}>Cadastrar chef</button>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default CriaChef;
