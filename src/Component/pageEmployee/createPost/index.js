import classNames from "classnames/bind";
import styles from './createPost.module.scss'
import Input from "~/Input";
import Button from "~/button";
import {useState,useRef} from 'react'
import {create} from '~/api-server/news.js'

const cx = classNames.bind(styles)

function CreatePost() {
    const [title,setTitle] = useState('')
    const [info,setInfo] = useState('')
    const [file,setFile] = useState([])
    const [titleImage,setTitleImage] = useState('')
    const imageRef = useRef()

    const handleCreate = async()=>{
        try {
            const formData = new FormData()
            formData.append('image',file)
            formData.append('title',title)
            formData.append('information',info)
            formData.append('titleImage',titleImage)
            const data = await create(formData,{
                headers:{'Content-Type': 'multipart/form-data'}
            })
            if(data.success) {
                setFile('')
                setTitle('')
                setInfo('')
                setTitleImage('')
                imageRef.current.src=''
            }
        
        } catch (error) {
            console.log(error);
        }
    }

    return (<div className={cx('wrapper')}>
        <label htmlFor={cx('title')}> Tiêu đề</label>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} id={cx('title')} placeholder='nhập tiêu đề' />
        <label htmlFor={cx('information')}>Nhập thông tin</label>
        <textarea value={info} onChange={(e)=>setInfo(e.target.value)}  placeholder="Nhập thông tin..." id={'information'}></textarea>
        <label className={cx('file-image')} htmlFor={cx('image')}>Chọn ảnh</label>
        <input onChange={(e)=>{
            setFile(e.target.files[0])
            imageRef.current.src = URL.createObjectURL(e.target.files[0])
        }}  type="file" accept="image/*" id="image" />
        <img ref={imageRef}/>
        <input value={titleImage} onChange={(e)=>{
            setTitleImage(e.target.value)
        }}  placeholder="Nhập tiêu đề của ảnh" />
        <Button onClick={handleCreate}>Tạo</Button>
    </div>);
}

export default CreatePost;