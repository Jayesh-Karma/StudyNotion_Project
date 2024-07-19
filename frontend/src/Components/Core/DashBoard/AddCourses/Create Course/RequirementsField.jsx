import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useSelector } from 'react-redux';

const RequirementsField = ({ id, label, name, register, setValue, getValues, errors, placeholder }) => {
    const { course, editCourse } = useSelector((state) => state.course);

    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    const handleAddReq = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    };

    const handleRemoveReq = (idx) => {
        const updatedReq = [...requirementList  ];
        updatedReq.splice(idx, 1);
        setRequirementList(updatedReq);
    };

    useEffect(()=>{
        register(name, 
            {required:true, 
            validate:(value) => value.length > 0
        })
    }, [])

    useEffect(()=>{
        setValue(name, requirementList)
    },[requirementList])



    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <div>
                <input
                    type="text"
                    name={name}
                    id={id}
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="w-full text-richblack-5 bg-richblack-700 p-2 rounded-md"
                    placeholder={placeholder}
                />
                <button
                    type="button"
                    onClick={handleAddReq}
                    className="font-semibold bg-transparent text-yellow-50"
                >
                    Add
                </button>
            </div>

            {requirementList.length > 0 && (
                <ul>
                    {requirementList.map((req, idx) => (
                        <li key={idx}>
                            <span>{req}</span>
                            <button type="button" onClick={() => handleRemoveReq(idx)}>
                                <MdClose />
                            </button>
                        </li>
                    ))}
                </ul>
            )}{
                errors[name] && (<span> {name} is required</span>)
            }
        </div>
    );
};

export default RequirementsField;
