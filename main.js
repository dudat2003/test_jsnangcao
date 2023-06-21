const listProduct = () => {
    axios.get(`http://localhost:3000/products`).then(({ data }) => {
        document.querySelector("tbody").innerHTML = data
            .map((product, index) => {
                return `
        <tr>
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td><img src="${product.image}" alt="image"></td>
            <td>
                <button class="btn btn-danger btn-delete"  data-id="${product.id}">Delete</button>
                <button class="btn btn-warning btn-update" data-id="${product.id}">Update</button>
            </td>
        </tr>`
            }).join("");

        /*DELETE */
        const btnDelete = document.querySelectorAll('.btn-delete')
        for (const btn of btnDelete) {
            const id = btn.dataset.id;
            btn.addEventListener("click", () => {
                const notification = window.confirm("Delete this product?")
                if (notification) {
                    axios.delete(`http://localhost:3000/products/${id}`).then(() => {
                        alert("Delete complete!")
                        location.reload()
                    })
                }
            })
        }
        /*DELETE */

        /*Btn Update */
        const btnUpdate = document.querySelectorAll(".btn-update")
        for (const btn of btnUpdate) {
            const id = btn.dataset.id
            btn.addEventListener("click", () => {
                return updateProduct(id);
            })
        }
        /*Btn Update */


    })
}

/* ADD */
const addProduct = () => {
    document.querySelector(".container").innerHTML = `
    <div class="container">
    <h1>Add new Product </h1>
    <form action="" id="form">
      <div class="mb-3"><input type="text" placeholder="name" id="name" class="form-control"></div>
      <div class="mb-3"><input type="text" placeholder="image" id="image" class="form-control"></div>
      <div class="mb-3"><button type="submit" class="btn btn-primary">Submit</button></div>
    </form>
  </div> 
    `

    document.querySelector("#form").addEventListener("submit", (e) => {
        e.preventDefault()
        const product = {
            name: document.querySelector("#name").value.trim(),
            image: document.querySelector("#image").value.trim(),
        }

        //validate
        if (product.name == "" || product.image == "") {
            alert("Please enter full data!")
        } else {
            axios.post(`http://localhost:3000/products`, product).then(() => {
                alert("Successful")
                location.reload()
            })
        }
    })
}
document.getElementById("btn-add").addEventListener("click", addProduct)
/* ADD */

/*UPDATE */
const updateProduct = (id) => {
    axios.get(`http://localhost:3000/products/${id}`).then(({ data }) => {
        document.querySelector(".container").innerHTML = `
        <div class="container">
            <h1>Update Product </h1>
            <form action="" id="form">
            <div class="mb-3"><input type="text" placeholder="name" id="name" value ="${data.name}" class="form-control"></div>
            <div class="mb-3"><input type="text" placeholder="image" id="image" value ="${data.image}"class="form-control"></div>
            <div class="mb-3"><button type="submit" class="btn btn-primary">Submit</button></div>
            </form>
        </div> 
        `

        document.querySelector("#form").addEventListener("submit", (e) => {
            e.preventDefault()
            const product = {
                name: document.querySelector("#name").value.trim(),
                image: document.querySelector("#image").value.trim(),
            }

            //validate
            if (product.name == "" || product.image == "") {
                alert("Please enter full data!")
            } else {
                axios.put(`http://localhost:3000/products/${id}`, product).then(() => {
                    alert("Successful")
                    location.reload()
                })
            }
        })
    })
}

/*UPDATE */


/*Log In */
const logIn = () => {
    document.querySelector(".container").innerHTML = `
    <div class="container">
        <h1>Sign In</h1>
        <form action="" id="form">
            <div class="mb-3"><input type="text" placeholder="Username" name="" id="username" class="form-control"></div>
            <div class="mb-3"><input type="password" placeholder="Password" name="" id="password" class="form-control"></div>
            <button class="btn btn-info" type="submit">Log In</button>
        </form>
    </div>`


    document.querySelector("#form").addEventListener("submit", (e) => {
        e.preventDefault();
        const user = {
            username: document.querySelector("#username").value.trim(),
            password: document.querySelector("#password").value.trim(),
        }
        if (user.username == "" || user.password == "") {
            alert("Please enter full data!")
        } else {
            axios.get(`http://localhost:3000/users`).then((response) => {
                const users = response.data
                const username = user.username
                const password = user.password
                const currentUser = users.find((user) => user.username === username && user.password === password)
                if (currentUser) {
                    alert("Sign in complete!")
                    return listProduct();
                } else {
                    alert("Username or Password is incorrect!")
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    })
}
document.getElementById("btn-login").addEventListener("click", logIn)
/*Log In */




listProduct();