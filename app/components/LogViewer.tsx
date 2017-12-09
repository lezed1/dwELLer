import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { TState } from '../reducers/swipeLog';
import { Table } from 'react-bootstrap';
import Moment from 'react-moment';

export interface IProps extends RouteComponentProps<any> {
    swipes : TState,
}

export class LogViewer extends React.Component<IProps> {
    render() {
        const { swipes } = this.props;
        return (
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Timestamp</th>
                        <th>Direction</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        swipes.map((swipe) =>
                            <tr key={swipe.timestamp.toString()} >
                                <td>{swipe.id}</td>
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
