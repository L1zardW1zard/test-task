import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/restPOST.css";

const RestPOST = ({ dispatch }) => {
  const [radios, setRadios] = useState([]);
  const [token, setToken] = useState("");
  const [selectedFile, setSelectedFile] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position_id: 1,
  });

  const [isDirty, setIsDirty] = useState({
    name: false,
    email: false,
    phone: false,
  });

  const [inputError, setInputError] = useState({
    name: "Name lenght must be 2-60 characters",
    email: "Not valid email",
    phone: "Not valid phone (look at hint below)",
    photo: "Please upload image",
  });

  useEffect(() => {
    const getRadio = async () => {
      fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/positions`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setRadios(data.positions);
        });
    };
    getRadio();

    const getToken = () => {
      fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/token`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setToken(data.token);
        });
    };

    getToken();
  }, []);

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setIsDirty({ ...isDirty, name: true });
        break;
      case "email":
        setIsDirty({ ...isDirty, email: true });
        break;
      case "phone":
        setIsDirty({ ...isDirty, phone: true });
        break;

      default:
        break;
    }
  };

  function isEmail(email) {
    return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(
      email
    );
  }

  function isPhone(phone) {
    return /^[\+]{0,1}380([0-9]{9})$/.test(phone);
  }

  const onNameChangeHandler = (e) => {
    if (e.target.value.length < 2 || e.target.value.length > 60) {
      setInputError({
        ...inputError,
        name: "Name lenght must be 2-60 characters",
      });
    } else {
      setInputError({
        ...inputError,
        name: "",
      });
    }

    setForm({ ...form, name: e.target.value });
  };

  const onEmailChangeHandler = (e) => {
    if (!isEmail(e.target.value)) {
      setInputError({ ...inputError, email: "Not valid email" });
    } else {
      setInputError({ ...inputError, email: "" });
    }

    setForm({ ...form, email: e.target.value });
  };

  const onPhoneChangeHandler = (e) => {
    if (!isPhone(e.target.value)) {
      setInputError({
        ...inputError,
        phone: "Not valid phone (look at hint below)",
      });
    } else {
      setInputError({ ...inputError, phone: "" });
    }
    setForm({ ...form, phone: e.target.value });
  };

  const onRadioChangeHandler = (e) => {
    if (e.target.value > 0 && e.target.value <= radios.length) {
      setForm({ ...form, position_id: e.target.value });
    }
  };

  const onPhotoChangeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    let fileSize = e.target.files[0].size;

    if (fileSize < 5000000) {
      setForm({ ...form, photo: e.target.files[0] });
      setInputError({
        ...inputError,
        photo: "",
      });
    } else {
      setInputError({
        ...inputError,
        photo: "Size of file is too big (max 5MB)",
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !inputError.name &&
      !inputError.phone &&
      !inputError.email &&
      !inputError.photo
    ) {
      const data = new FormData();
      data.append("photo", selectedFile, selectedFile.name); // alternative using for
      data.append("name", form.name);
      data.append("email", form.email);
      data.append("phone", form.phone);
      data.append("position_id", form.position_id);
      axios
        .post(
          "https://frontend-test-assignment-api.abz.agency/api/v1/users",
          data,
          { headers: { token } }
        )
        .then((response) => {
          return response.data;
        })
        .then((res) => {
          dispatch({
            type: "NEW_USER",
            payload: { update: true, user_id: res.user_id },
          });
        });
    }
  };

  return (
    <section>
      <div className="content-post">
        <h1>Working with POST request</h1>
        <form onSubmit={handleFormSubmit}>
          {/* <div className="form-info"> */}
          {isDirty.name && inputError.name && (
            <p className="red">{inputError.name}</p>
          )}
          <input
            type="text"
            name="name"
            placeholder="Your name"
            onChange={onNameChangeHandler}
            value={form.name}
            onBlur={(e) => {
              blurHandler(e);
            }}
          />
          {isDirty.email && inputError.email && (
            <p className="red">{inputError.email}</p>
          )}
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={onEmailChangeHandler}
            value={form.email}
            onBlur={(e) => {
              blurHandler(e);
            }}
          />
          {/* </div> */}
          <div className="phone-wrapper">
            {isDirty.phone && inputError.phone && (
              <p className="red">{inputError.phone}</p>
            )}
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              onChange={onPhoneChangeHandler}
              value={form.phone}
              onBlur={(e) => {
                blurHandler(e);
              }}
            />
            <p className="phone-hint">+38 (XXX) XXX - XX - XX</p>
          </div>
          <div className="radio-wrapper">
            <p>Select your position</p>
            {radios &&
              radios.map((radio, i) => {
                return (
                  <div className="radio-item" key={i}>
                    <input
                      type="radio"
                      name="radio"
                      value={radio.id}
                      id={"radio-" + radio.id}
                      checked={form.position_id == radio.id}
                      onChange={onRadioChangeHandler}
                    />
                    <label htmlFor={"radio-" + radio.id}>{radio.name}</label>
                  </div>
                );
              })}
          </div>
          {inputError.photo && <p className="red">{inputError.photo}</p>}
          <div className="avatar-upload">
            <label htmlFor="file">Upload</label>
            <label className="hint">
              {selectedFile.name !== undefined && `${selectedFile.name}`}
              {selectedFile.name === undefined && "Upload your photo"}
            </label>

            <input
              type="file"
              id="file"
              accept=".jpg, .jpeg"
              onChange={onPhotoChangeHandler}
            />
          </div>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </section>
  );
};

export default RestPOST;
