let url='https://jsonplaceholder.typicode.com/posts';
const addingPost=document.querySelector(".submitPost");
const editPost=document.querySelector(".editPost");
const posts=document.querySelector("tbody"); 
const getPost=document.querySelector(".getPost");


// getpost
const display=async()=>{
try {
  const response=await fetch(url)
  if(response.status!=200){
    // custom error using throw
    throw new Error('Error '+response.status+" Found")
  }
  var data=await response.json();
  let webTask =localStorage.getItem("localTask");
  if(webTask==null){
      taskObj=[];
      
   }
   else{
       taskObj=JSON.parse(webTask);
   }
   taskObj=data;
   localStorage.setItem("localTask",JSON.stringify(taskObj));
   
  output();
} 
catch (error) {
  console.log(error) ;
}

}
display();


// creating a new post
const createPost=async (post)=>{
 try{ 
  const response=await fetch(url,{
  method:'POST',
  body:JSON.stringify(post),
  headers:{'Content-type':"application/json"},
  });
  if(response.status!=201){
    // custom error using throw
    throw new Error('Error '+response.status+" Found")
  }
  const data= await response.json();

  return data;
 } 
 catch (error) {
  console.log(error) ;
}}
  

// editing a post
const edit=async (post,id)=>{
 try{ 
const response=await fetch(url+"/"+id,{
method:'PUT',
body:JSON.stringify(post),
headers:{'Content-type':"application/json"},
});
if(response.status!=200){
  // custom error using throw
  throw new Error('Error '+response.status+" Found")
}
const data= await response.json();
return data;
 }
 catch(error){
  console.log(error) ;
 }
}

// editing a post using patch
const editUsingPatch=async (post,id)=>{
  try{ 
 const response=await fetch(url+"/"+id,{
 method:'PATCH',
 body:JSON.stringify(post),
 headers:{'Content-type':"application/json"},
 });
 if(response.status!=200){
   // custom error using throw
   throw new Error('Error '+response.status+" Found")
 }
 const data= await response.json();
 return data;
  }
  catch(error){
   console.log(error) ;
  }
 }
 

// deleting the post
const deleting= async (id)=>{
try{
    const response=await fetch(url+"/"+id,{
method:"DELETE",});
if(response.status!=200){
  // custom error using throw
  throw new Error('Error '+response.status+" Found")
}

    }
catch(error){
  console.log(error) ;
 }
}



// MAIN DISPLAYING PART
const output=()=>{ 
      let webTask =localStorage.getItem("localTask");
      if(webTask==null){
          taskObj=[];
      }
      else{
          taskObj=JSON.parse(webTask);
      }
    var html='';

localStorage.setItem("localTask",JSON.stringify(taskObj));

      console.log(taskObj);
        taskObj.forEach((x,index)=>{
          html+=`
          <center>
    
          <tr>
          <th scope="row">${index+1}</th>
          <td class="title">${x.title}
          <br>
          <button class="btn btn-secondary  btn-sm" onclick=editTitle(${index})>Edit</button>
          </td>
          <td class="body">${x.body}
          <br>
          <button class="btn btn-secondary  btn-sm" onclick=editBody(${index})>Edit</button>
          </td>
          <td><button class="btn  btn-lg btn-outline-danger " onclick=deleteThePost(${index})><i class="fas fa-trash"></i></button>
          <button class="btn  btn-lg btn-outline-primary " onclick=editpost(${index})><i class="far fa-edit"></i></button> 
          </td>
        </tr>
        
          </center>
          
          `
          })
          posts.innerHTML=html;
        }

        
                 // onClick events


// new post
addingPost.addEventListener("click",async ()=>{
  var title=prompt("title:");
  var body=prompt("body:");
  
  if(title=='' || body==''){
    swal({
      title: "Insufficent Data",
      icon:"error",
    });
  }
  else{
  let webTask =localStorage.getItem("localTask");
      if(webTask==null){
          taskObj=[];
          
       }
       else{
           taskObj=JSON.parse(webTask);
       }
       const post={
      
        
         title:title,
         body:body,
        };
        const createdPost=await createPost();
        taskObj.unshift(post);
        
        localStorage.setItem("localTask",JSON.stringify(taskObj));
  output(); 
      }
  });




  
// delete post
const deleteThePost=async(index)=>{
  let webTask =localStorage.getItem("localTask");
  let taskObj=JSON.parse(webTask);
swal({
  title:"Are you sure??",
  icon:"warning",
  buttons: [true, "Do it!"],
  dangerMode:true,
})
.then(async (willDelete) => {
  if (willDelete) {
    taskObj.splice(index,1);
    localStorage.setItem("localTask",JSON.stringify(taskObj));
    output();
    const post=await deleting(index);
    
    swal("Deleted sucessfully!", {
      icon: "success",
    });
  } else {
    swal("Your data is safe!");

  }

});

}




// edit post
const editpost=async (index)=>{
  console.log(index);
  let webTask =localStorage.getItem("localTask");
  if(webTask==null){
      taskObj=[];
  }
  else{
      taskObj=JSON.parse(webTask);
  }
var title=prompt("title:");
var body=prompt("body:");

if(title=='' || body==''){
  swal({
    title: "Insufficent Data",
    icon:"error",
  });
}
else{
    const post={
      userId:0,
        id:0,
        title:title,
        body:body,
        };
        taskObj[index]=post;
         
        const editedPost=await edit(post,index);
        console.log(editedPost);
  localStorage.setItem("localTask",JSON.stringify(taskObj));
        output();
 } }



//  editing using patch
 const editTitle=async (index)=>{
  
  let webTask =localStorage.getItem("localTask");
  if(webTask==null){
      taskObj=[];
  }
  else{
      taskObj=JSON.parse(webTask);
  }
  console.log(taskObj);

var title=prompt("title:");
if(title==''){
  swal({
    title: "Insufficent Data",
    icon:"error",
  });
}
else{
  const post={
      userId:taskObj[index].userId,
      id:taskObj[index].id,
      title:title,
      body:taskObj[index].body,
      };
      taskObj[index]=post;
     
      const editedPost=await editUsingPatch(post,index);
      
  localStorage.setItem("localTask",JSON.stringify(taskObj));
  output();
      
      
    }
  }

  const editBody=async (index)=>{
    
    let webTask =localStorage.getItem("localTask");
    if(webTask==null){
        taskObj=[];
    }
    else{
        taskObj=JSON.parse(webTask);
    }
    
  
  var body=prompt("body:");
  if(body==''){
    swal({
      title: "Insufficent Data",
      icon:"error",
    });
  }
  else{
    const post={
        userId:taskObj[index].userId,
        id:taskObj[index].id,
        title:taskObj[index].title,
        body:body,
        };
        taskObj[index]=post;
        
        const editedPost=await editUsingPatch(post,index);
        console.log(editedPost);
    localStorage.setItem("localTask",JSON.stringify(taskObj));
    output();
        
        
      }
    }
