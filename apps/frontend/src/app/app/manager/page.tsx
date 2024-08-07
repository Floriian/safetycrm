"use client";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Input,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import RuleHeader from "./_components/RuleHeader";
import { ClientCard } from "../client/_components/ClientCard";
import { Client } from "../client/_components/client.schema";
import { Search } from "@mui/icons-material";
import { ClientsGrid } from "./_components/ClientsGrid";
import { AppliedRulesGrid } from "./_components/AppliedRulesGrid";
import { OtherRulesGrid } from "./_components/OtherRulesGrid";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function Page() {
  const theme = useTheme();
  return (
    <Box>
      <RuleHeader />
      <Grid container spacing={0} sx={{ maxHeight: "calc(100vh - 11rem)" }}>
        <ClientsGrid />
        <DragDropContext onDragEnd={console.log}>
          <Droppable droppableId="applied-rules">
            {(provided) => (
              <Draggable
                {...provided.droppableProps}
                draggableId="aaa"
                index={1}
                key={1}
              >
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    id="aaa"
                  >
                    aaa
                  </div>
                )}
              </Draggable>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
    </Box>
  );
}
