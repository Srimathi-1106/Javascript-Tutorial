const addBtn = document.getElementById('add-btn');
const cancelBtn = document.getElementById('cancel-btn');

const title = document.getElementById('title')
const content = document.getElementById('content')

const blogPosts =document.getElementById('blogs-list');

const blogs = []


addBtn.addEventListener('click',()=>{
    if(title && content){
        const newBlog ={
            title,
            content,
            id: new Date()
        }
        blogs.push(newBlog);
        renderBlogs();
    }
})

cancelBtn.addEventListener('click',()=>{
    document.getElementById('title').value='';
    document.getElementById('content').value='';

    renderBlogs();
})

function renderBlogs(){
    blogPosts.innerHTML='';

    blogs.forEach(blog => {
        const blogItem = document.createElement('div');
        blogItem.addClassList
    })
}