import React, { useState } from 'react';
import LeftNavbar from 'components/LeftNavbar';
import AddNoteForm from 'components/notes/AddNoteForm';

import {
 makeStyles,
} from "@material-ui/core";
import { connect } from 'react-redux';
import NotesArea from './notes/NotesArea';

const useStyles = makeStyles(theme => ({
 mainArea: {
  display: 'flex'
 }
}))



const Main:React.FC<{
 isNavBarOpen: boolean;
 labels?: object[];
}> = ({ isNavBarOpen, labels }) => {
 const classes = useStyles();
 const [currentLabel, setLabel] = useState<string>('all');

 
 
 return(
  <>
  <div style={{height: '100px'}}></div>
  <main className={
   classes.mainArea
  }>   
   <LeftNavbar labels={labels}  setLabel={setLabel} isNavBarOpen={isNavBarOpen} />
   <NotesArea currentLabel={currentLabel} isNavBarOpen={isNavBarOpen}  />
  </main>
  </>
 )
}

const mapStateToProps = (state: any) => ({
 labels: state.labels
})

export default connect(mapStateToProps, null)(Main);

