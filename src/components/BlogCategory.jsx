import React, { useState } from 'react'
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import init from '../firebase';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const BlogCategory = () => {
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [data, setData] = useState({
        name: '',
        slug: ''
    })
    const formHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value })
    }

    const imgUploader = (file) => {
        const storageRef = ref(init.storage, `${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (err) => {
                console.log(err);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL);
                });
            }
        );
    }
    const imgHandler = (e) => {
        const file = e.target.files[0]
        const storageRef = ref(init.storage, `${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (err) => {
                console.log(err);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL);
                });
            }
        );
    }
    const btnHandler = async (e) => {
        e.preventDefault()
        const { name, slug } = data;
        if ( name !== '' && slug !== '' ){
            try{
                await setDoc(doc(init.db, "blog_category",uuidv4()), {
                    name,
                    slug,
                    image: imgUrl,
                    createdAt: serverTimestamp()
                });
                setData({
                    name: '',
                    slug: ''
                })
                setImgUrl(null)
                setProgresspercent(0)
            } catch (err) {
                console.log('Error' + err)
            }
            toast.success('Category Added successfully.')
        }else{
            toast.error('Please fill all the mandetary field')
        }
     
    }
    return (
        <div className="page-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className='card'>
                            <div className='card-body'>
                                <form method='post' onSubmit={btnHandler}>
                                    <div className='form-group'>
                                    <label>Add Image</label>
                                        <input type="file" name="image" className='form-control'  onChange={imgHandler} />
                                        {
                                            !imgUrl && progresspercent ? `Uploading ${progresspercent}` : ''

                                        }
                                    </div>
                                    <div className='form-group'>
                                    <label>Name</label>
                                        <input type="text" name="name" placeholder='Enter Category Name' className='form-control' value={data.name} onChange={formHandler}  />
                                    </div>
                                    <div className='form-group'>
                                    <label>Slug</label>
                                        <input type="text" name="slug" placeholder='Enter Slug' className='form-control' value={data.slug} onChange={formHandler}  />
                                    </div>
                                    <div className='form-group'>
                                        <input type="submit" value="Add Category" className="btn btn-primary" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default BlogCategory