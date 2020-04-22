import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Logo from '../../assets/icon.svg';
import iconSearch from '../../assets/icon-search.svg';
import iconCart from '../../assets/icon-car.svg';
import Api from '../../services/api';
import HeaderApi from '../../services/header';
import {removeToken, getToken} from '../Authenticate';
import SignIn from '../Modals/Signin';

export default function Header({title = "Menina Charmosa"}){
    const [openMenu, setOpenMenu] = useState('');
    const [showMenu, setShowMenu] = useState('');
    const [boxData, setBoxData] = useState('x');
    const [handleBox, setHandleBox] = useState(0);
    const [handleSearch, setHandleSearch] = useState('');
    const [dataSearch, setDataSearch] = useState([]);
    const [showResults, setShowResults] = useState('');
    const [logout, setLogout] = useState(false);
    const History = useHistory();

    document.title = title

    useEffect(() => {
        async function find(){
            try {
                const countBox = await Api.get('/box/count/', HeaderApi);
                const {success, content} = countBox.data;
                if(success)
                setBoxData(content);
            } catch (error) {
                setBoxData(error.response.data.content)
            }
        }

        if(getToken() !== null)
        find();

        setTimeout(()=>{
            let count = handleBox;
            setHandleBox(count + 1)
        }, 5000);
    }, [handleBox])

    useEffect(() => {
        async function search(){
            try {
                const searchFilter = handleSearch === '' ? '' : `?search=${handleSearch}`;
                const fieldSearch = await Api.get(`/product${searchFilter}`, HeaderApi);
                const {success, content} = fieldSearch.data;
                if(success)
                setDataSearch(content);
            } catch (error) {
                console.log(error.response.data.message)
            }
        }
        if(getToken() !== null)
        search();
    }, [handleSearch, History])

    useEffect(() => {
        openMenu === '' ? setShowMenu('') : setShowMenu('menu-links-moviment')
    }, [openMenu])

    setTimeout(() => {
        if(getToken() === null)
        setLogout(true);
    }, 1000);

    function changeHandleSearch(event){
        const valueInputSearch = event.target.value;
        setHandleSearch(valueInputSearch);
        if(valueInputSearch === '')
        History.push('/')
    }

    const desconect = () => {
        removeToken();
        setLogout(true);
    }

    return(
        <header id="header-main">
            <div className="controlHeaderNav">
                <div className="box-logo">
                    <figure>
                    <Link to="/">
                        <img src={Logo} alt="Menina Charmosa"/>
                    </Link>
                    </figure>
                </div>
                <div id="box-field-search-cart">
                    <div id="input-search">
                        <img src={iconSearch} alt=""/>
                        <input type="text" name="search" value={handleSearch} onFocus={() => setShowResults("search-results-moviment")} onChange={changeHandleSearch}/>
                    </div>
                    <div className={`search-results ${showResults}`}>
                        {
                            handleSearch === '' ? '' :
                            dataSearch.map((product) => (
                                <div className="search-results-content" key={product.id} onClick={() => {
                                    History.push(`/search/${product.product_name}`)
                                    setShowResults('')
                                }}>{product.product_name}</div>
                            ))
                        }
                    </div>
                </div>
                <div id="box-menu-links">
                    <span id="cart">
                        <Link to="/box" title="Minha caixinha">
                            <img src={iconCart} alt="Caixinha"/>
                            <div>{boxData}</div>
                        </Link>
                    </span>
                    <div className="btn-menu" onClick={() => {
                        openMenu === '' ? setOpenMenu("box-menu-nav-moviment") : setOpenMenu('')
                    }}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className={`box-menu-nav ${openMenu}`}>
                    <div className="transparent"></div>
                    <nav className={`menu-links ${showMenu}`}>
                        <span>
                            <Link to="/box">Minha caixinha</Link>
                        </span>
                        <span onClick={() => desconect()}>
                            <a href="logout" onClick={(e) => {
                                e.preventDefault()
                            }}>Sair</a>
                        </span>
                    </nav>
                </div>
            </div>
            {
                !logout ? null : 
                <SignIn onCloseModalSignIn={() => setLogout(false)}/>
            }
        </header>
    );
}