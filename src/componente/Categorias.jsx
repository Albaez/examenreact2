import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

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
        image:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.123rf.com%2Fphoto_61198423_categor%25C3%25ADa-palabra-en-bloques-de-madera.html&psig=AOvVaw1BDPl2Og6jFoqbSZTiPSV6&ust=1711295670319000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIjrlabfioUDFQAAAAAdAAAAABAI",
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

    fetch(`https://api.escuelajs.co/api/v1/categories/${editCategoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editCategory,
      }),
    })
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
      <h1 className="text-center">CRUD de Categorías</h1>

      <section>
  <h2>Listado de categorías</h2>
  <ul className="list-group mb-3">
    {categories.map((category) => (
      <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
        {category.name}
        <button className="btn btn-outline-danger" onClick={() => handleDeleteCategory(category.id)}>Eliminar</button>
        <button className="btn btn-outline-info" onClick={() => handleEditCategory(category.id)}>Editar</button>
        <img src={category.image} alt={category.name} className="img-fluid" />
      </li>
    ))}
  </ul>
</section>

      <section className="d-flex justify-content-end mt-3">
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
          <button className="btn btn-outline-info" onClick={handleEditCategory}>
            Guardar
          </button>
        </section>
      )}
    </div>
  );
};

export default Categorías;
