import * as React from 'react';
import {} from 'react';

import Lotto from '../../lotto-generator/src/App';
import NumberBaseball from '../../number-baseball/src/App';
import RockScissorsPaper from '../../rock-scissors-paper/src/App';
import { RouteComponentProps, useRouteMatch, useLocation, useHistory } from 'react-router';

const GameMatcher: React.FC<RouteComponentProps> = () => {
    const match = useRouteMatch<{ name: string }>();
    const location = useLocation();
    const history = useHistory();

    if (!match) return <div>일치하는 게임이 없습니다.</div>;

    let urlSearchParams = new URLSearchParams(location.search.slice(1));

    if (match.params.name === 'number-baseball') return <NumberBaseball />;
    else if (match.params.name === 'rock-scissors-paper') return <RockScissorsPaper />;
    else if (match.params.name === 'lotto-generator') return <Lotto />;
    else return <div>일치하는 게임이 없습니다.</div>;
};

export default GameMatcher;
