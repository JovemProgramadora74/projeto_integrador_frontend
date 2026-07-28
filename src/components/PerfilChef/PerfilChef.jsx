function PerfilChef({ image, name, experience }) {
    return (
        <div className="chef-profile">
            <img src={image} alt={name} />

            <div>
                <h3>{name}</h3>
                <p>{experience}</p>
            </div>
        </div>
    );
};

export default PerfilChef;

