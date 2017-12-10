import * as React from 'react';
import { TCurrentMembers } from '../reducers/swipeLog';
import { Table, Panel } from 'react-bootstrap';
import Moment from 'react-moment';

export interface IProps {
    currentMembers : TCurrentMembers,
}

export class Dashboard extends React.Component<IProps> {
    render() {
        const { currentMembers } = this.props;
        return (
            <div>
                {
                    currentMembers.map(team => 
                        <Panel header={team.team_name} key={team.team_name} >
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>NetID</th>
                                        <th>Entered</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        team.people.map(person =>
                                            <tr key={person.timestamp.toString()} >
                                                <td>{person.netid}</td>
                                                <td>{person.name}</td>
                                                <td>
                                                    <Moment fromNow date={person.timestamp} />
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Panel>
                    )
                }
            </div>
        );
    }
}

export default Dashboard;
