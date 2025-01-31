const addBtn = document.getElementById('add-btn');
const cancelBtn = document.getElementById('cancel-btn');

const blogPosts =document.getElementById('blogs-list');

const blogs = JSON.parse(localStorage.getItem('blogs')) || []

let add = true; // to change add button to edit button and vice-versa

renderBlogs();

console.log("hello")

// Add or Edit Button in forms
addBtn.addEventListener('click',()=>{
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value
    const titleExists = blogs.some(blog => blog.title === title);

    if (titleExists) {
        alert("The title already exists. Please choose another title.");
        return;
    }
    console.log(title,content);
    if(title && content){
        const newBlog ={
            title,
            content,
            id: new Date().getTime(),
            views:0
        }
        blogs.push(newBlog);

        localStorage.setItem('blogs',JSON.stringify(blogs));
        renderBlogs();
    }
    console.log(add)
    if(!add){
        console.log(add+" Inside");
        document.getElementById('title').value='';
        document.getElementById('content').value='';
        document.getElementById('add-btn').innerHTML='Add Blog';
        document.getElementById('heading').innerHTML='Add Blog';

    }
})


// Cancel Button in Forms
cancelBtn.addEventListener('click',()=>{
    if(!add)
    {
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        console.log(title,content);
        if(title && content){
            const newBlog ={
                title,
                content,
                id: new Date().getTime(),
                views:blogs[blogs.findIndex(blog => blog.title === title && blog.content === content)].views 
            }
            blogs.push(newBlog);

            localStorage.setItem('blogs',JSON.stringify(blogs));
            renderBlogs();
        }
        add=true;
        document.getElementById('add-btn').innerHTML='Add Blog';
    }
    document.getElementById('title').value='';
    document.getElementById('content').value='';
    document.getElementById('heading').innerHTML='Add Blog';
    renderBlogs();
    document.getElementById('view-title').innerHTML='';
    document.getElementById('view-content').innerHTML='';

})


// Rendering the Blogs
function renderBlogs() {
    blogPosts.innerHTML = '';
    
    blogs.forEach((blog, index) => {
        const blogItem = document.createElement('div');
        blogItem.className = "p-4 bg-black rounded shadow-md text-white h-fit";

        blogItem.innerHTML = `
            <div class="py-2 flex justify-between">
                <span class="text-xl text-center font-bold">${blog.title}</span>
                <div>
                    <span style="display: inline-block; font-size: 15px; color: #000000;">👁</span>
                    <span>${blog.views}</span>
                </div>
            </div>
            <p>${blog.content.slice(0, 20)}...</p>
            <div class="flex justify-between">
                <button onclick="editBlog(${index})" class="text-gray-500">Edit</button>
                <a onclick="viewBlog(${index})" href="#view-blog" class="text-green-500"> View</a>
                <button onclick="deleteBlog(${index})" class="text-red-500">Delete</button>
            </div>`;

        blogPosts.appendChild(blogItem);
    });
    
}

// Edit Button
function editBlog(index){
    const blog= blogs[index];
    document.getElementById('heading').innerHTML='Edit Blog';
    document.getElementById('add-btn').innerHTML = "Edit Blog";
    document.getElementById('title').value= blog.title;
    document.getElementById('content').value=blog.content;
    blogs.splice(index,1);
    renderBlogs();
    add= false;
    document.getElementById('view-title').innerHTML='';
    document.getElementById('view-content').innerHTML='';

}

// Delete Buton
function deleteBlog(index){
    blogs.splice(index,1);
    localStorage.setItem('blogs',JSON.stringify(blogs));
    renderBlogs();
    document.getElementById('view-title').innerHTML='';
    document.getElementById('view-content').innerHTML='';

}

// View Button
function viewBlog(index){
    const blog=blogs[index];
    const viewTitle = document.getElementById('view-title');
    const viewContent = document.getElementById('view-content');
    viewTitle.innerHTML=blog.title;
    viewContent.innerHTML=blog.content;
    
    blog.views+=1;
    localStorage.setItem('blogs',JSON.stringify(blogs));
    renderBlogs();
}
