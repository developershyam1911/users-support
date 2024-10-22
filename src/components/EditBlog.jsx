import React, { useState, useRef, useMemo, useEffect } from 'react'
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import init from '../firebase';
import { setDoc, doc, serverTimestamp, getDocs, getDoc, collection } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import JoditEditor from 'jodit-react';
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios'
const EditBlog = () => {
    const [value, setValue] = useState()
    const api_url = "https://api-img.eventplanet.in/";
    const upload_endpoint = 'api/auth/upload';

    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then((file) => {
                        body.append('image', file);
                        axios.post(`${api_url}/${upload_endpoint}`, body, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        })
                            .then((response) => {
                                // handle the response
                                console.log('my res', response.data.url);
                                resolve({ default: `${response.data.url}` })
                            })
                            .catch((error) => {
                                // handle errors
                                console.log(error);
                            });
                    })
                })
            }
        }
    }
    function uploadPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new uploadAdapter(loader)
        }
    }
    const { blog_id } = useParams();
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [imgUrl, setImgUrl] = useState(null);
    const [blogCat, setBlogCat] = useState([]);
    const [progresspercent, setProgresspercent] = useState(0);
    const [data, setData] = useState({
        keyword: '',
        meta_description: '',
        title: '',
        slug: '',
        catSlug: ''
    })
    const btnHandler = async (e) => {
        e.preventDefault()
        const { keyword, meta_description, title, slug, catSlug } = data;
        if (keyword !== '' && meta_description !== '' && slug !== '' && title !== '' && catSlug !== '') {
            try {
                await setDoc(doc(init.db, "blog", blog_id), {
                    keyword,
                    meta_description,
                    title,
                    slug,
                    description: value,
                    image: imgUrl,
                    catSlug,
                    createdAt: serverTimestamp()
                });
                setData({
                    keyword: '',
                    meta_description: '',
                    title: '',
                    slug: '',
                    catSlug: ''
                })
                setImgUrl(null)
                setProgresspercent(0)
                setValue('')
            } catch (err) {
                console.log('Error' + err)
            }
            toast.success('blog updated successfully.')
        } else {
            toast.error('Please fill all the mandetary field')
        }
    }
    const getSingleBlog = async () => {
        try {
            const res = await getDoc(doc(init.db, "blog", blog_id));
            setData(res.data());
            setValue(res.data().description);
            setImgUrl(res.data().image)
        } catch (error) {
            console.log(`Error : ${error}`)
        }
    }
    useEffect(() => {
        getSingleBlog()
    }, [blog_id])
    const formHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value })
    }
    const getBlogCat = async () => {
        const mycollection = collection(init.db, "blog_category");
        const data = await getDocs(mycollection);
        setBlogCat(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    useEffect(() => {
        getBlogCat();
    }, []);
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
    return (
        <div className="page-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className='card'>
                            <div className='card-body'>
                                <form method='post' onSubmit={btnHandler}>
                                    <center> <img src={imgUrl} style={{ height: '100px' }} /></center>
                                    <div className='form-group'>
                                        <label>Add Image</label>
                                        <input type="file" name="image" className='form-control' onChange={imgHandler} />
                                        {
                                            !imgUrl && progresspercent ? `Uploading ${progresspercent}` : ''

                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="blogcat">Category Slug</label>
                                        <select className="form-control" id="blogcat" onChange={formHandler} name='catSlug'>
                                            {
                                                blogCat.map((cur, i) => {
                                                    return (
                                                        <>
                                                            <option key={i} value={cur.slug}>{cur.name}</option>
                                                        </>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label>Keyword</label>
                                        <input type="text" name="keyword" placeholder='Enter Keyword' className='form-control' value={data.keyword} onChange={formHandler} required />
                                    </div>
                                    <div className='form-group'>
                                        <label>Meta Description</label>
                                        <input type="text" name="meta_description" placeholder='Enter Meta Description' className='form-control' value={data.meta_description} onChange={formHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label>Title</label>
                                        <input type="text" name="title" placeholder='Enter Title' className='form-control' value={data.title} onChange={formHandler} />
                                    </div>
                                    <div className='form-group'>
                                        <label>Slug</label>
                                        <input type="text" name="slug" placeholder='Enter Slug' className='form-control' value={data.slug} onChange={formHandler} />
                                    </div>
                                    {/* <JoditEditor

                                        ref={editor}
                                        value={content}
                                        onChange={newContent => setContent(newContent)}
                                    /> */}
                                    <CKEditor
                                        config={{
                                            extraPlugins: [uploadPlugin]
                                        }}
                                        editor={ClassicEditor}
                                        data={value}
                                        onReady={editor => {
                                            // You can store the "editor" and use when it is needed.
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setValue(data)
                                            console.log({ event, editor, data });
                                        }}
                                        onBlur={(event, editor) => {
                                            console.log('Blur.', editor);
                                        }}
                                        onFocus={(event, editor) => {
                                            console.log('Focus.', editor);
                                        }}
                                    />
                                    <div className='form-group'>

                                        <input type="submit" value="Add Blog" className="btn btn-primary" />
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

export default EditBlog