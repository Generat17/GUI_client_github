import "./Preloader.scss";

const Preloader = () => {
    return (
        <div id="loaders">
            <div className="loader-container arc-rotate2">
                <div className="loader">
                    <div className="arc"></div>
                </div>
            </div>
        </div>
    );
};

export default Preloader;