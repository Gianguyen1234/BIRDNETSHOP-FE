import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import AuthContext from "../context/AuthProvider";

const UserHeader = () => {
    const navigate = useNavigate()
    const { logout } = useContext(AuthContext);
    const [query, setQuery] = useState("");
    const [isOpen, setOpen] = useState(false);
    const handleChange = (e) => {
        setQuery(e.currentTarget.value)
    }
    const handleBlur = (e) => {
        setOpen(!isOpen)
    }

    const handleSubmit = (e) => {
        if (e.key == "Enter")
            window.location.href = `/search?p=${query}`

    }


    return <nav class="navbar header nav-light navbar-expand-lg navbar-light shadow fixed-top">
        <div class="container container-navbar my-nav d-flex justify-content-between align-items-center">
            <div className="nav-header">
                <NavLink class="navbar-brand text-success logo-size h2 align-self-center " to="/home">
                    LVG
                </NavLink>
                <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
                    data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>


            <div
                class="align-self-center mgt-16 user-header mgd-16 collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between"
                id="templatemo_main_nav">
                <div class="flex-fill">
                    <ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                        <li class="nav-item">
                            <NavLink class="nav-link" to="/">Trang Chủ</NavLink>
                        </li>
                        <li class="nav-item nav-parent">
                            <NavLink class="nav-link" to="/shop">
                                Sản Phẩm
                            </NavLink>

                        </li>
                        <li class="nav-item">
                            <NavLink class="nav-link" to="/a">Thông tin</NavLink>
                        </li>
                        <li class="nav-item">
                            <NavLink class="nav-link" to="/a">Liên hệ</NavLink>
                        </li>
                    </ul>
                </div>


                <div class="navbar align-self-center d-flex ">
                    {isOpen ? <input type="text" className="form-control w-140 me-2" autoFocus={true} onBlur={handleBlur} onChange={handleChange} onKeyDown={handleSubmit}
                        id="inputMobileSearch" placeholder="Search ..." /> :
                        <a class="nav-icon d-none d-lg-inline" href="#" data-bs-toggle="modal"
                            data-bs-target="#templatemo_search">
                            <i class="fa fa-fw fa-search text-dark mr-2" onClick={() => {
                                setOpen(true)
                            }}></i>
                        </a>
                    }
                    {(JSON.parse(localStorage.getItem('tokens'))) ?
                        <>
                            <a class="nav-icon position-relative text-decoration-none padding-cart" href="/cart">
                                <i class="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
                                <span
                                    class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-cart-light text-dark">7</span>
                            </a>

                            <span class="nav-icon position-relative text-decoration-none padding-notify" href="#">
                                <span id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false"><i class="fa fa-fw fa-user text-dark mr-3"></i><i
                                        class="fa fa-angle-down text-dark"></i></span>
                                <ul class="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
                                    <li><a class="dropdown-item" href="/profile">Thông tin tài khoản</a></li>
                                    <li><a class="dropdown-item" href="/change-pass">Đổi mật khẩu</a></li>
                                    <li><a class="dropdown-item" onClick={() => {
                                        logout();
                                    }}>Đăng xuất</a></li>
                                </ul>
                            </span>
                        </>
                        :
                        <form method="get" action="/login">
                            <Button className="header-login" type="submit">Đăng nhập</Button>
                        </form>
                    }
                </div>
            </div>

        </div>
    </nav>

}

export default UserHeader;