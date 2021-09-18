import React, { useRef, useState } from "react"
import "./FileInput.css"

const FileInput = (props) => {
    const inputRef = useRef();
    const [filename, setFilename] = useState("")

    const onFileChange = (e) => {
        if (e.target.files[0]) {
            setFilename(e.target.files[0].name)
        } else {
            setFilename("")
        }
        props.onChange(e);
    };
    const activateInput = () => {
        inputRef.current.click()
    };

    return (
        <>
            <input
                type="file"
                name={props.name}
                style={{ display: "none" }}
                onChange={onFileChange}
                ref={inputRef}
            />
            <input className="FileInput__input"
                   placeholder={props.placeholder}
                   disabled
                   value={filename}
                   onClick={activateInput}
            />
            <button className="FileInput__btn" onClick={activateInput}>Choose file</button>
        </>
    );
};

export default FileInput
