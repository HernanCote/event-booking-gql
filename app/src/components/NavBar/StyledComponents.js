import styled from 'styled-components';
import { NavLink as BaseNavLink } from 'react-router-dom';

import { H1 } from '../Foundation';

const Root = styled.header`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 3.5rem;
    background: #172839;
    padding: 0 1rem;
    display: flex;
    align-items: center;
`;

const Logo = styled.div`
    ${H1} {
        color: #fff;
    }
`;

const NavItems = styled.nav`
    margin: 0 1rem 0 auto;
`;

const ItemsList = styled.ul`
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
`;

const ListItem = styled.li`
    margin: 0 1rem;
`;

const NavLink = styled(BaseNavLink)`
    text-decoration: none;
    color: #EDE387;

    :active, :hover, &.active {
        color: #7C8C68;
    }
`;

export {
    Root,
    Logo,
    NavItems,
    ItemsList,
    ListItem,
    NavLink
};