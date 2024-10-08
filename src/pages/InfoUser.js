import { useContext, useState, useEffect, useRef } from "react";
import { Checkbox } from "@mui/material";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap"
import { Link, Navigate } from 'react-router-dom';
import "./../assets/css/order.css";
import userLayout from "../user/userLayout"
import axiosApiInstance from "../context/interceptor";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

import axios from "../api/axios";

const InfoUser = () => {
    const [status, setStatus] = useState(1);
    const [modalForm, setModalForm] = useState(false);
    const [profile, setProfile] = useState({});
    const [order, setOrder] = useState([]);
    const [load, setLoad] = useState(false);
    const handleClose = () => setModalForm(false);
    const [tmpGender, setTmpGender] = useState('Nam');
    const [infoChange, setChange] = useState({});
    const listST = ["Chờ Xác Nhận", "Đang Chuẩn Bị Hàng", "Đang Vận Chuyển", "Đã Thanh Toán", "Đã Hủy"];
    const [tmp, setTmp] = useState(listST.at(0));

    let total;
    let feeShip = 30000

    async function getProfile() {
        try {
            const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/user/profile`);
            setLoad(true)
            setProfile(result?.data?.data?.data)
            console.log("test :",)
            setTmpGender(result?.data?.data?.data.gender)
        } catch (error) {

        }
    }

    async function handleCancel(e) {
        try {
            const confirm = window.confirm("Ngài có chắc chắn muốn hủy đơn? ");
            if (confirm) {
                const result = await axiosApiInstance.post(axiosApiInstance.defaults.baseURL + `/api/order/cancel-order/${e.currentTarget.id}`);
                if (result?.data?.status === 200) {
                    toast.success(result?.data?.message)
                } else {
                    toast.error(result.data.message)
                }
            }
            await getOrder();
        } catch (error) {

        }
    }

    async function getOrder() {
        try {
            setLoad(false)
            const result = await axiosApiInstance.get(axiosApiInstance.defaults.baseURL + `/api/order/history/${tmp}`);
            setLoad(true)
            setOrder(result?.data?.data)
        } catch (error) {

        }
    }



    const handleChangProfile = (e) => {
        const id = e.target.id
        infoChange[id] = e.currentTarget.value
        setTmpGender(e.currentTarget.value)
    }

    useEffect(() => {
        getProfile()
        getOrder()
    }, [tmp])
    const clickInfor = (e) => {
        setStatus(1);
        setChange({})
    }
    const clickTheOrder = (e) => {
        setStatus(2);
        setChange({})

    }
    const clickStatus = (e) => {
        setTmp(e.target.id)
    }

    const updateProfile = async () => {
        try {
            console.log(infoChange)
            if (Object.keys(infoChange).length !== 0) {
                const result = await axiosApiInstance.put(axiosApiInstance.defaults.baseURL + `/api/user/profile`, infoChange)
                if (result?.data.status === 200)
                    toast.success("Thông tin đã được cập nhật")
                else
                    toast.error("Cập nhật thất bại!")
            }
        } catch (error) {

        }
    }

    return <>
        <div class="margin-left-right padding-bottom-3x marginTop marginBot row">
            <div class="table-responsive block-infor-left  ms-2">
                <button className={status == 1 ? " buttonHead active w-100" : " buttonHead w-100"}
                    onClick={clickInfor}>Hồ sơ của
                    tôi
                </button>
                <button className={status == 2 ? " buttonHead mb-3 active w-100" : " buttonHead mb-3 w-100"}
                    onClick={clickTheOrder}>Đơn đặt hàng
                </button>
            </div>
            <div class="table-responsive block-infor-right ">
                {status == 1 ?
                    load ? <div>
                        <h4 className="ms-4 mb-3 mt-3">Hồ sơ của tôi </h4>
                        <div className="row mb-3 ms-3 me-3 borderr ">
                            <div className="field field_v1 col">
                                <label htmlFor="first-name" className="ha-screen-reader">Họ & đệm</label>
                                <input id="firstName" className="field__input mt-2" onChange={handleChangProfile}
                                    defaultValue={(profile.firstName ? profile.firstName : "")}
                                    placeholder=" "></input>
                                <span className="field__label-wrap" aria-hidden="true">
                                    <span className="field__label">Họ & đệm</span>
                                </span>
                            </div>
                            <div className="field field_v1 col">
                                <label htmlFor="first-name" className="ha-screen-reader">Tên</label>
                                <input id="lastName" className="field__input mt-2" onChange={handleChangProfile}
                                    defaultValue={(profile.lastName ? profile.lastName : "")}
                                    placeholder=" "></input>
                                <span className="field__label-wrap" aria-hidden="true">
                                    <span className="field__label">Tên</span>
                                </span>
                            </div>
                            <div className="row mb-2">
                                <div className="field field_v1 col">
                                    <label htmlFor="first-name" className="ha-screen-reader">Số điện
                                        thoại</label>
                                    <input id="phone" className="field__input mt-2" required="required" onChange={handleChangProfile}
                                        defaultValue={profile?.phone}
                                        placeholder=" "></input>
                                    <span className="field__label-wrap" aria-hidden="true">
                                        <span className="field__label">Số điện thoại</span>
                                    </span>
                                </div>
                                <div className="field field_v1 col ">
                                    <label htmlFor="first-name" className="ha-screen-reader">Email</label>
                                    <input id="email" className="field__input mt-2"
                                        value={profile?.email} placeholder=" " disabled></input>
                                    <span className="field__label-wrap" aria-hidden="true">
                                        <span className="field__label">Email</span>
                                    </span>
                                </div>
                            </div>

                            <div className="display-flex">
                                <p className="mt-3 ms-2">Giới tính:</p>
                                <input type="radio" id="gender" value="Nam" name="fav_language" checked={tmpGender === 'Nam'}
                                    onChange={handleChangProfile}
                                    className="me-2 mt-3 ms-5"></input>
                                <label htmlFor="nam" className="mt-3">Nam</label>
                                <input type="radio" value="Nu" id="gender" name="fav_language" checked={tmpGender === 'Nữ'}
                                    onChange={handleChangProfile}
                                    className="me-2 ms-4 mt-3"></input>
                                <label htmlFor="nu" className="mt-3">Nữ</label>
                            </div>


                            <div className="field field_v1 mb-2">
                                <label htmlFor="first-name" className="ha-screen-reader">Địa chỉ</label>
                                <input id="address" className="field__input mt-2" onChange={handleChangProfile}
                                    defaultValue={profile?.address}
                                    placeholder=" "></input>
                                <span className="field__label-wrap" aria-hidden="true">
                                    <span className="field__label">Địa chỉ</span>
                                </span>
                            </div>
                            <div className="col-10 mt-3 mb-3 m-auto">
                                <button className="btn btn-success w-100" onClick={updateProfile}> Cập nhật thông tin </button>
                            </div>
                            <Link className="changePass" to="/change-pass"> Đổi mật khẩu</Link>


                        </div>

                    </div>

                        :
                        <div>Loading</div>
                    // thông tin khách hàng

                    :
                    // Quảng lý đơn hàng
                    <div>
                        <div className="status-order">
                            {
                                listST.map(i =>
                                    <button id={i}
                                        className={tmp === i ? " buttonHead active w-auto m-4" : " buttonHead w-auto m-4"}
                                        onClick={clickStatus}>{i}
                                    </button>
                                )
                            }
                        </div>
                        {load ?
                            (order && order.length !== 0 ?
                                order && order?.sort((a, b) => b.orderId - a.orderId).map((item) =>
                                    <table className="table status-table">
                                        <tr>
                                            <td className="text-center">Mã đơn hàng:{item?.orderId}</td>
                                            {/* <td className="text-center">Ngày đặt: {item?.createdDate}</td> */}
                                        </tr>
                                        {item?.details?.map(k =>
                                            <tr>
                                                <td>
                                                    <div className=" display-flex">
                                                        <a className="" href="#"><img className="imageInfor"
                                                            src={k?.defaultImage}
                                                            alt="Product" /></a>
                                                        <div className="ms-1 mt-1">
                                                            <p><a className=" fontSizeInfor"
                                                                href="#">{k?.productName}</a></p>
                                                            <p className=" fontSizeInfor ">Size: {k?.size}</p>
                                                            {/* <p className=" fontSizeInfor ">Color: {k.productDetail?.color}</p> */}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="text-center ">x{k?.quantityOrder}</td>
                                                <td className="text-center ">{k?.salePrice.toLocaleString('vi', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                })}</td>
                                                <td className="text-center ">{k?.amountOrder.toLocaleString('vi', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                })}</td>
                                            </tr>
                                        )
                                        }
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td className="text-center ">Phí ship:</td>
                                            <td className="text-center">{feeShip.toLocaleString('vi', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}</td>
                                        </tr>
                                        <tr>
                                            <td></td>

                                            <td></td>
                                            <td className="text-center">Tổng tiền:</td>
                                            <div style={{ display: "none" }}>
                                                {total = 0}
                                                {item?.details?.map(item => {

                                                    total += item?.salePrice * item?.quantityOrder;
                                                })
                                                }</div>
                                            <td className="text-center">{(total + feeShip).toLocaleString('vi', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}</td>

                                        </tr>
                                        {tmp === listST[0] || tmp === listST[1] ?
                                            <button id={item?.orderId} onClick={handleCancel}>Hủy Đơn</button> : null}

                                    </table>
                                )
                                :
                                <div>
                                    <h6 className="center">Bạn không có đơn đặt hàng trong trạng thái này</h6>
                                    <div class="shopping-cart-footer">
                                        <div class="buttonBackHome">
                                            <Link class="btn btn-success" to="/shop"> Tiếp tục mua sắm </Link></div>
                                    </div>
                                </div>)
                            :
                            <div className={"center loading"}>
                                <ReactLoading type={'cylon'} color='#fffff' height={'33px'} width={'9%'} />
                            </div>
                        }
                    </div>
                }

            </div>
        </div>
    </>

}

export default userLayout(InfoUser);