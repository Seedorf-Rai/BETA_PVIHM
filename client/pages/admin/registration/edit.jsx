import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";

export default function EditRegistration() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [number, setNumber] = useState("");
  const [from, setFrom] = useState("");
  const [courses, setCourse] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentNumber, setParentNumber] = useState("");
  const [addresses, setAddresses] = useState("");

  const forms = useSelector((state) => state.forms.forms);

  const form = forms.find((f) => f._id === id);

  useEffect(() => {
    if (form) {
      setName(form.studentName);
      setAge(form.studentAge);
      setNumber(form.studentNumber);
      setFrom(form.studentFrom);
      setCourse(form.studentCourse);
      setParentName(form.parentName);
      setParentNumber(form.parentNumber);
      setAddresses(form.studentAddress);
    }
  }, []);

  return (
    <>
      <div className="py-20">
        <div className="flex justify-between">
          {form ? (
            <div>
              <div className="flex">
                <div className="flex flex-col">
                  <label className="mb-2" htmlFor="">
                    Student Name:
                  </label>
                  <input
                    className="bg-transparent"
                    type="text"
                    value={name}
                    disabled
                  />
                </div>
                <div className="flex ms-10 flex-col">
                  <label className="mb-2" htmlFor="">
                    Student Age:
                  </label>
                  <input
                    className="bg-transparent"
                    type="text"
                    value={age}
                    disabled
                  />
                </div>
                <div className="flex ms-10 flex-col">
                  <label className="mb-2" htmlFor="">
                    Student Contact Number:
                  </label>
                  <input
                    className="bg-transparent"
                    type="text"
                    value={number}
                    disabled
                  />
                </div>
              </div>
              <div className="flex mt-10">
                <div className="flex flex-col">
                    <label className="mb-2" htmlFor="">Student Address: </label>
                    <input
                    className="bg-transparent"
                    type="text"
                    value={addresses}
                    disabled
                  />
                  </div>
                  <div className="flex ms-10 flex-col">
                    <label className="mb-2" htmlFor="">Interested Course: </label>
                    <input
                    className="bg-transparent"
                    type="text"
                    value={courses}
                    disabled
                  />
                  </div>
              </div>
              <div className="mt-10">
                <div className="flex flex-col">
                    <label className="mb-2" htmlFor="">SEE From: </label>
                    <input type="text" value={from} className="bg-transparent "  />
                </div>
              </div>
              <div className="flex mt-10">
                <div className="flex flex-col">
                    <label className="mb-2" htmlFor="">Parent Name: </label>
                    <input
                    className="bg-transparent"
                    type="text"
                    value={parentName}
                    disabled
                  />
                  </div>
                  <div className="flex ms-10 flex-col">
                    <label className="mb-2" htmlFor="">Parent Number: </label>
                    <input
                    className="bg-transparent"
                    type="text"
                    value={parentNumber}
                    disabled
                  />
                  </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <Link to={'/admin/registration'} >
      <button className="p-3 bg-cyan-600 rounded " >Go Back</button>
      </Link>
    </>
  );
}
