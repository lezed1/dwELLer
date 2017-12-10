import * as React from 'react';
import { TSwipeLog } from '../reducers/swipeLog';
import { Table } from 'react-bootstrap';
import Moment from 'react-moment';

export interface IProps {
    swipes : TSwipeLog,
}

export class LogViewer extends React.Component<IProps> {
    render() {
        const { swipes } = this.props;
        return (
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NetID</th>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Timestamp</th>
                        <th>Direction</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        swipes.map(swipe =>
                            <tr key={swipe.timestamp.toString()} >
                                <td>{swipe.id}</td>
                                <td>{swipe.netid}</td>
                                <td>{swipe.name}</td>
                                <td>{swipe.team}</td>
                                <td>
                                    <Moment fromNow date={swipe.timestamp} />
                                </td>
                                <td>{swipe.direction}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        );
    }
}

export default LogViewer;
