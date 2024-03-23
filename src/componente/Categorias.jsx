import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import defaultAvatar from './default-avatar.png';

const Categorías = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories/1/products")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  }, []);

  const handleAddCategory = () => {
    if (newCategory.trim() === "") {
      swal("Error", "Debes ingresar el nombre de la categoría", "error");
      return;
    }

    fetch("https://api.escuelajs.co/api/v1/categories/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newCategory,
        image: "/src/componente/default-avatar.png",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories([...categories, data]);
        setNewCategory("");
        swal("Éxito", "Categoría agregada correctamente", "success");
      })
      .catch((error) => console.log(error));
  };

  const handleEditCategory = () => {
    if (editCategory.trim() === "") {
      swal("Error", "Debes ingresar el nombre de la categoría", "error");
      return;
    }

    fetch(
      `https://api.escuelajs.co/api/v1/categories/${editCategoryId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editCategory,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const updatedCategories = categories.map((category) => {
          if (category.id === editCategoryId) {
            return { ...category, name: editCategory };
          }
          return category;
        });
        setCategories(updatedCategories);
        setEditCategory("");
        setEditCategoryId(null);
        swal("Éxito", "Categoría editada correctamente", "success");
      })
      .catch((error) => console.log(error));
  };

  const handleDeleteCategory = (categoryId) => {
    fetch(`https://api.escuelajs.co/api/v1/categories/${categoryId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedCategories = categories.filter(
          (category) => category.id !== categoryId
        );
        setCategories(updatedCategories);
        swal("Éxito", "Categoría eliminada correctamente", "success");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <h1 className="text-center">API Categorías</h1>

      <section>
        <h2 className="text-left">Listado de categorías</h2>
        <div className="row">
          {categories.map((category) => (
            <div key={category.id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={defaultAvatar}
                  alt={category.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{category.name}</h5>
                  <button
                    className="btn btn-outline-danger mr-2"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-outline-info"
                    onClick={() => handleEditCategory(category.id)}
                  >
                    Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="agregar" className="d-flex justify-content-end mt-3">
        <h2>Agregar categoría</h2>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleAddCategory}>
          Agregar
        </button>
      </section>

      {editCategoryId && (
        <section>
          <h2>Editar categoría</h2>
          <input
            type="text"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
          />
          <button
            className="btn btn-outline-info"
            onClick={() => {
              if (editCategory.trim() === "") {
                swal(
                  "Error",
                  "Debes ingresar el nombre de la categoría",
                  "error"
                );
                return;
              }
              handleEditCategory();
            }}
          >
            Guardar
          </button>
        </section>
      )}
    </div>
  );
};

export default Categorías;