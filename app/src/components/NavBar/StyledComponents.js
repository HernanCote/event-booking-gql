import styled, { css } from 'styled-components';
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
    align-items: center;
`;

const ListItem = styled.li`
    margin: 0 0.5rem;
`;

const commonStyles = css`
    background: #172839;
    text-decoration: none;
    border: none;
    color: #fff;
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    font-size: inherit;
    cursor: pointer;

    :active, :hover, &.active {
        color: #172839;
        background: #fff;
    }
`;

const NavLink = styled(BaseNavLink)`
    ${commonStyles}
`;

const NavButton = styled.button`
    ${commonStyles}
`;

export {
    Root,
    Logo,
    NavItems,
    ItemsList,
    ListItem,
    NavLink,
    NavButton,
};