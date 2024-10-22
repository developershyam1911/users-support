import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import init from '../firebase';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { useUserAuth } from '../context/UserAuthContext';
import { Link } from 'react-router-dom';
import { MdDelete, MdEditSquare } from 'react-icons/md';
import DateFinder from './DateFinder';
import './blog.css'

const BlogList = () => {
    const { user } = useUserAuth()
    const merchant_id = user.uid;
    const [data, setData] = useState();
    console.log(data)
    const [loading, setLoading] = useState(false)
    const getBlog = async () => {
        setLoading(true)
        // const mycollection = collection(init.db, 'blog');
        // const data = await getDocs(mycollection);
        // setData(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        // setLoading(false);

        const mycollection = collection(init.db, 'blog');
        let q = query(mycollection, orderBy("createdAt", "desc"));
        const data = await getDocs(q);
        setData(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
    }
    useEffect(() => {
        // getSingleDocumentHandler();
        getBlog();
    }, [merchant_id])
    const deletebtnHandler = async (blog_id) => {
        const choice = window.confirm('Are you sure want to delete?');
        if (choice) {
            try {
                await deleteDoc(doc(init.db, "blog", blog_id));
                getBlog()
            } catch (err) {
                console.log(err)
            }
        } else {
            return
        }
    }
    return (
        <>
            <div className="page-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className='card-header row d-flex justify-content-between align-items-center'>
                                    <div className='col-md-4'>
                                        <Link to="/dashboard/blog" className='btn btn-primary btn-sm'> + Add Blog </Link>
                                    </div>
                                </div>
                                <div className='card-body'>
                                    <div className='table-responsive'>
                                        <table className='table  table-bordered  shadow-sm mt-3' cellPadding={5}>
                                            <thead>
                                                <tr >
                                                    <th>S.No.</th>
                                                    <th>Image</th>
                                                    <th>Keyword</th>
                                                    <th>Meta Desc.</th>
                                                    <th>Title</th>
                                                    <th>Slug</th>
                                                    <th>Cat Slug</th>
                                                    <th>Description</th>
                                                    <th>Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loading && (
                                                    <tr>
                                                        <td><Skeleton count="2" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="2" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="2" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="2" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="2" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="2" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="2" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="2" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="2" style={{ width: "100%" }} /></td>
                                                        <td><Skeleton count="2" style={{ width: "100%" }} /></td>
                                                    </tr>
                                                )}
                                                {
                                                    data ?
                                                        (
                                                            data.map((item, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{index + 1}</td>
                                                                        <td>
                                                                            <div className='d-flex align-items-center'>
                                                                                <img src={item.image} style={{ height: '60px', width: '60px', borderRadius: '10px', marginRight: '5px' }} />
                                                                            </div>
                                                                        </td>
                                                                        <td>{item.keyword}</td>
                                                                        <td>{item.meta_description}</td>
                                                                        <td>{item.title}</td>
                                                                        <td>{item.slug}</td>
                                                                        <td>{item.catSlug}</td>
                                                                        <td>
                                                                            <div
                                                                                dangerouslySetInnerHTML={{ __html: item.description }}
                                                                                className='my_custom_style'
                                                                            />
                                                                        </td>
                                                                        <td><DateFinder mydate={item.createdAt?.seconds} /></td>
                                                                        {/* <td>
                                                                        <div className='d-flex align-items-center'>
                                                                            <div className="form-check form-switch ">
                                                                                <input className="form-check-input stock_checkbox" type="checkbox" id="flexSwitchCheckDefault"
                                                                                    value={item.stock}
                                                                                    onChange={(e) => switchHandler(e, item.id, index)}
                                                                                    checked={item.stock} />
                                                                            </div>
                                                                            <span className={item.stock ? 'text-success' : 'text-danger'} style={{ fontSize: '14px' }}> {item.stock ? 'Available' : 'Not Available'}</span>
                                                                        </div>
                                                                    </td> */}
                                                                        <td>
                                                                            <Link to={`/dashboard/edit-blog/${item.id}`}><MdEditSquare color='danger' size={24} style={{ color: 'green' }} /></Link>
                                                                            <button className='btn  '><MdDelete size={24} style={{ color: 'red' }} onClick={() => deletebtnHandler(item.id)} /></button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }))
                                                        : (
                                                            <tr className='text-center text-danger'>
                                                                <td colSpan={6}>Category not found</td>
                                                            </tr>
                                                        )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default BlogList