import "./Preloader.scss";

const Preloader = () => {
    return (
        <div id="loaders">
            <div className="loader-container square-split">
                <div className="loader">
                    <div className="square-1"></div>
                    <div className="square-2"></div>
                    <div className="square-3"></div>
                    <div className="square-4"></div>
                </div>
            </div>
        </div>
    );
};

export default Preloader;