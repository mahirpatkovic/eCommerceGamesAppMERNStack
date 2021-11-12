import './style.css';
import logo from '../../assets/logo4.png';
import letterLogo from '../../assets/logo3.png';
export default function Loader() {
    return (
        <div>
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <img src={logo} alt="logo" className="logo" />
                <img src={letterLogo} alt="letterLogo" className="letterLogo" />
            </div>
        </div>
    );
}
