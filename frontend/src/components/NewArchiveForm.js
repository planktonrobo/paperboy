import { useDispatch } from "react-redux";
import { addArchive } from "../actions/archives";
import { Card, Form} from "react-bootstrap";
import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import { EmojiButton } from '@joeattardi/emoji-button';
import {BsX} from 'react-icons/bs';

const NewArchiveForm = () => {
    const dispatch = useDispatch();
    
    const picker = new EmojiButton({
        position: "auto-start"
      });
    const trigger = document.querySelector('.trigger');
    
    picker.on('emoji', selection => {
      setEmo(selection.emoji);
    });
    
    const ass = () => {
      return (emo)  ? <button onClick={() => setEmo("")} className="btn btn-none p-1"><small><BsX/></small></button>  : <button className="trigger btn btn-none px-0" onClick={() => picker.togglePicker(trigger)} id="emoji-trigger"><small>Add icon</small></button>
      
    }
    
    
  
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data, e) => {
      e.target.reset()
      //const dat = JSON.stringify(data)
      dispatch(addArchive(data))
      setEmo("🗞")
      
      
  };



  const [emo, setEmo] = useState("🗞")
 
  
  return (
    <div className="col px-0 pr-lg-3 py-3">
 
      <Card style={{ width: "15rem" }}>
        <Card.Body>
        <button className="trigger btn btn-none p-0" onClick={() => picker.togglePicker(trigger)} id="emoji-trigger"><h3>{emo}</h3></button>{ass({emo})}
        
          {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
          
          <Form onSubmit={handleSubmit(onSubmit)} >
          <input type="hidden" name="emoji" value={emo} id="emoji" ref={register()}/>
        <input type="hidden" name="publisher" value="1" id="publisher" ref={register({ required: true })}/>
        <Form.Group> 
            {/* include validation with required or other standard HTML validation rules */}
            <input className='an' id="title" name="title" placeholder="New Archive" ref={register({ required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.title && <span><small>This field is required</small></span>}
           
            </Form.Group>
           
            <div className="row justify-content-end px-3">
            <button className="btn btn-outline-success" type="submit">+</button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewArchiveForm;
