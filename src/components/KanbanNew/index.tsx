/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { styled } from 'styled-components';
import initialData from './data/initial-data';
import Column from './components/column';

function Kanban() {
  const [stateData, setStateData] = useState(initialData);
  useEffect(() => {
    setStateData(initialData);
  }, []);
  const { tasks, columns, columnOrder } = stateData;
  console.log(stateData);
  const onDragEnd = (result: any) => {
    console.log(result);
    // structure
    //   {
    //     "draggableId": "task-1",
    //     "type": "DEFAULT",
    //     "source": {
    //         "index": 0,
    //         "droppableId": "column-1"
    //     },
    //     "reason": "DROP",
    //     "mode": "FLUID",
    //     "destination": {
    //         "droppableId": "column-1",
    //         "index": 1
    //     },
    //     "combine": null
    // }
    // let { destination, source, draggableId } = result;
    // if (!destination) {
    //   return;
    // }
    // if (
    //   destination.droppableId === source.droppableId &&
    //   destination.index === source.index
    // ) {
    //   return;
    // }
    // let { columns } = stateData;
    // let column = columns[source.droppableId];
    // const newTaskIds = Array.from(column.taskIds);
    // newTaskIds.splice(source.index, 1);
    // newTaskIds.splice(destination.index, 0, draggableId);
    // const newColumn = {
    //   ...column,
    //   taskIds: newTaskIds,
    // };
    // const newDragState = {
    //   ...stateData,
    //   columns: {
    //     ...stateData.columns,
    //     [newColumn.id]: newColumn,
    //   },
    // };
    // setStateData(newDragState);
  };
  const Container = styled.div`
    display: flex;
    flex-direction: row;
  `;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {columnOrder.map((columnId, index) => {
              const column = columns[`${columnId}`];
              const taskFiltered = column.taskIds.map(
                (taskId: string) => tasks[`${taskId}`]
              );
              return (
                <Column
                  key={columnId}
                  title={column.title}
                  tasks={taskFiltered}
                  id={columnId}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Kanban;
