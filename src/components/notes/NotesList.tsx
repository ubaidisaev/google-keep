import React from "react";

import NoteItem from "./NoteItem";
import { useTheme } from "@material-ui/core";

const NoteList: React.FC<{
  filteredNotes: [];
  selectedLabels: string[];
  onCloseButtonClick: () => void;
}> = ({ filteredNotes = [], selectedLabels, onCloseButtonClick }) => {
  const theme = useTheme();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        marginTop: "2rem",
      }}
    >
      {filteredNotes.map((note: any, index: number) => (
        <NoteItem
          key={note.id}
          onCloseButtonClick={onCloseButtonClick}
          selectedLabels={note.labelsID}          
          note={note}
        />
      ))}
    </div>
  );
};

export default NoteList;
