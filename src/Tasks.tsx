import React, { Component } from 'react'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import DatePicker from "react-datepicker";
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { Label } from 'office-ui-fabric-react/lib/Label';
import "react-datepicker/dist/react-datepicker.css";
import { ITask } from './ITodo';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

const options: IChoiceGroupOption[] = [
    { key: 'None', text: 'None' },
    { key: 'low', text: 'low' },
    { key: 'medium', text: 'medium' },
    { key: 'high', text: 'high' },
];
export default class Tasks extends Component<any, any> {

    constructor(props: any) {
        super(props);
        let curretDate: Date = new Date();
        this.state = {
            loading: false,
            task: {
                id: curretDate.getTime(),
                currentState: "",
                title: "",
                description: "",
                createdAt: curretDate,
                dueDate: null,
                priority: "None",
            } as ITask
        }
    }

    public componentWillReceiveProps(nexProps: any) {
        let task: ITask = null;
        let curretDate: Date = new Date();
        if (!nexProps.selectedTask) {
            task = {
                id: curretDate.getTime(),
                currentState: "",
                title: "",
                description: "",
                createdAt: curretDate,
                dueDate: null,
                priority: "None",
            };
        }
        else {
            task = nexProps.selectedTask;
        }
        this.setState({
            task
        });
    }



    render(): JSX.Element {

        let { task, loading } = this.state;

        return (
            <Panel
                isOpen={this.props.isOpenTaskPanel}
                onDismiss={() => this.props.closeTaskPanel()}
                type={PanelType.custom}
                customWidth='888px'
                closeButtonAriaLabel="Close"
                headerText="Task">
                {
                    loading ?
                        <React.Fragment>
                            <Spinner label="Saving task..." ariaLive="assertive" labelPosition="top" />
                        </React.Fragment>
                        :
                        <div className="ms-Grid" dir="ltr">
                            <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                                <div className="row">

                                    <TextField
                                        label="Summary"
                                        value={task.title}
                                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                                            let tempTask: ITask = { ...task };
                                            tempTask.title = !newValue ? "" : newValue;
                                            this.setState({
                                                task: tempTask
                                            });
                                        }
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12" >
                                    <TextField
                                        label="Description"
                                        value={task.description}
                                        onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                                            let tempTask: ITask = { ...task };
                                            tempTask.description = !newValue ? "" : newValue;
                                            this.setState({
                                                task: tempTask
                                            });
                                        }
                                        }
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6" >
                                    <ChoiceGroup
                                        selectedKey={task.priority}
                                        options={options}
                                        onChange={(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => {

                                            let tempTask: ITask = { ...task };
                                            tempTask.priority = !option ? "" : option.key;
                                            this.setState({
                                                task: tempTask
                                            });
                                        }}
                                        label="Priority:"
                                    />
                                </div>
                                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6" >
                                    <Label>Due Date: *</Label>
                                    <DatePicker
                                        selected={task.dueDate}
                                        value={task.dueDate ? task.dueDate.toLocaleDateString() : null}
                                        onChange={(date: Date) => {
                                            let tempTask: ITask = { ...task };
                                            tempTask.dueDate = date;
                                            this.setState({
                                                task: tempTask
                                            });
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg9">
                                </div>
                                <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg9">
                                    <PrimaryButton
                                        disabled={
                                            !task.dueDate ||
                                            !task.title
                                        }
                                        text="Save task"
                                        menuIconProps={{ iconName: "Add" }}
                                        onClick={() => {
                                            this.setState({
                                                loading: true
                                            }, () => {
                                                setTimeout(() => {
                                                    this.setState({
                                                        loading: false
                                                    }, () => this.props.saveTask(task));
                                                }, 2500)
                                            })

                                        }
                                        }
                                    />
                                </div>
                            </div>

                        </div>
                }
            </Panel >
        )
    }
}
