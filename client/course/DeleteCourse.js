import React,{useState} from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export default function DeleteCourse(props) {
  const clickSubmit=()=>{
     props.onRemove()
  }
  const handleClose=()=>{
   props.setDelOpen(false)
  }
    return (
        <div>
            <Dialog open={true} >
                <DialogTitle> Delete { props.course.name}</DialogTitle>
                <DialogContent>
                  confirm to delete your course Node.js Fundamentals
                </DialogContent>
                <DialogActions>

                    <Button component={'span'} onClick={clickSubmit}>
                        Submit
                    </Button>
                    <Button component={'span'} onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

