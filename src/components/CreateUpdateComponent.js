import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

const createURL = "https://springboot-adcore-api.herokuapp.com/adcore/api/add";
const getURL = "https://springboot-adcore-api.herokuapp.com/adcore/api/data/";
const updateURL =
  "https://springboot-adcore-api.herokuapp.com/adcore/api/update/";

const CreateUpdateComponent = () => {
  const [eData, setEData] = useState({});
  const [name, setName] = useState("");
  const [description, setDescirption] = useState("");
  const [parent, setParent] = useState(null);
  const [readOnly, setReadOnly] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  let extendedURL = "";

  if (id > 0) {
    extendedURL = getURL + id;
  }

  useEffect(() => {
    fetch(extendedURL)
      .then((res) => res.json())
      .then((d) => {
        setEData(d);
        setName(d.name);
        setDescirption(d.description);
        setParent(d.parent);
        setReadOnly(d.read_only);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleInputReadOnlyChange = () => {
    setReadOnly(!readOnly);
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    const date = new Date();
    const updatedData = {
      name: name,
      description: description,
      parent: parent,
      read_only: readOnly,
    };
    console.log(updatedData);

    fetch(updateURL + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      });
    history.push(`/data/${id}`);
  };

  const handleCreateSubmit = (event) => {
    event.preventDefault();
    const createdData = {
      name: name,
      description: description,
      parent: parent,
      read_only: readOnly,
    };

    fetch(createURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createdData),
    })
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      });
    setName("");
    setDescirption("");
    setParent(0);
    setReadOnly(false);
  };

  return (
    <div class="container" style={{ marginBottom: "122px" }}>
      <div class="row justify-content-center mt-3">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header text-uppercase">
              <strong>Create Data</strong>
            </div>

            <div class="card-body">
              <form
                onSubmit={eData.name ? handleUpdateSubmit : handleCreateSubmit}
              >
                <div class="form-group mb-2">
                  <label for="name">
                    <b>Name</b>
                  </label>
                  <input
                    id="name"
                    placeholder="Node Name"
                    type="text"
                    class="form-control "
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="description">
                    <b>Description</b>
                  </label>
                  <textarea
                    id="description"
                    placeholder="Node Description"
                    class="form-control"
                    name="description"
                    value={description}
                    onChange={(event) => setDescirption(event.target.value)}
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="parent">
                    <b>Parent</b>
                  </label>
                  <input
                    id="parent"
                    type="number"
                    placeholder="Node Parent"
                    class="form-control"
                    min="0"
                    name="parent"
                    value={parent}
                    onChange={(event) => setParent(event.target.value)}
                    required
                  />
                </div>

                <div class="form-check mt-4">
                  <input
                    id="read_only"
                    className="form-check-input"
                    name="read_only"
                    type="checkbox"
                    checked={readOnly}
                    onChange={handleInputReadOnlyChange}
                  />
                  <label class="form-check-label" for="exampleCheck1">
                    <b>Read Only</b>
                  </label>
                </div>

                <button type="submit" class="btn btn-primary mt-3">
                  {eData.name ? "Update" : "Create"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUpdateComponent;
