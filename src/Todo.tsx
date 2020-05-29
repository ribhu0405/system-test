import React from 'react';
import './App.scss';
import { PrimaryButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { initializeIcons } from '@uifabric/icons';
import { ITask } from './ITodo';
import Tasks from './Tasks';

initializeIcons();

class Todo extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      selectedTask: null,
      data: [
        {
          id: 0,
          currentState: "Open",
          title: "First Item",
          description: "First Item",
          createdAt: new Date(),
          dueDate: new Date(),
          priority: "high",
        } as ITask
      ] as ITask[],
      isOpenTaskPanel: false,
    }

  }

  public closeTaskPanel = (): void => {
    this.setState({
      isOpenTaskPanel: false,
      selectedTask: null
    })
  }

  public saveTask = (task: ITask): void => {
    let data: ITask[] = [...this.state.data];

    let indexOfItem: number = data.findIndex((item: ITask) => item.id === task.id);

    if (indexOfItem === -1) {
      task.currentState = "Open";
      data.push(task);
    }
    else {
      data[indexOfItem] = task;
    }

    this.setState({
      isOpenTaskPanel: false,
      selectedTask: null,
      data
    });

  }

  public deleteTask = (task: ITask): void => {
    let data: ITask[] = [...this.state.data];

    data = data.filter((item: ITask) => item.id !== task.id);

    this.setState({
      data
    });

  }

  public closeTask = (task: ITask): void => {
    let data: ITask[] = [...this.state.data];

    let indexOfItem: number = data.findIndex((item: ITask) => item.id === task.id);
    data[indexOfItem].currentState = "Done";

    this.setState({
      data
    });

  }

  render(): JSX.Element {

    let { data, isOpenTaskPanel, selectedTask } = this.state

    return (
      <div className="App">

        <div className="ms-Grid" dir="ltr">
          <div className="row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg10" />
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg2">
              <PrimaryButton
                text="Create task"
                menuIconProps={{ iconName: "Add" }}
                onClick={() => this.setState({
                  isOpenTaskPanel: true
                })}
              />
            </div>
          </div>
        </div>

        <div className="ms-Grid" dir="ltr">
          <div className="row">
            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12">
              <table className="table table-condensed table-hover table-striped">
                <thead>
                  <tr>
                    <th>State</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Created</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>

                  {data.map((d: ITask) => {
                    return (
                      <tr key={d.id}>
                        <td>{d.currentState}</td>
                        <td>{d.title}</td>
                        <td>{d.description}</td>
                        <td>{d.createdAt.toDateString()}</td>
                        <td>{d.dueDate.toDateString()}</td>
                        <td>{d.priority}</td>
                        <td>
                          <IconButton
                            iconProps={{ iconName: "Edit" }}
                            onClick={() => {
                              this.setState({
                                selectedTask: d,
                                isOpenTaskPanel: true
                              });
                            }}

                          />
                          <IconButton
                            iconProps={{ iconName: "Delete" }}
                            onClick={() => this.deleteTask(d)}
                          />
                          <IconButton
                            iconProps={{ iconName: "Cancel" }}
                            onClick={() => this.closeTask(d)}
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Tasks
          isOpenTaskPanel={isOpenTaskPanel}
          selectedTask={selectedTask}
          closeTaskPanel={this.closeTaskPanel}
          saveTask={this.saveTask}
        />

      </div>
    );
  }

}

export default Todo;
